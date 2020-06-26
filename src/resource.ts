import { Fields, FieldValues, Field, FieldType, Action } from "./action";
import { flatMapAsync, map, Transform, compose, first, reduce } from "@space48/json-pipe";
import { camelCase, flatten, hyphenate, underscore } from "./util";

export type ResourceCollectionConfig<Context extends Fields> = {
    context: Context,
    resources: Record<string, ResourceConfig<Context> | Falsy>,
};

export type ResourceConfig<Context extends Fields> = SingletonResourceConfig<Context> | DocumentCollectionConfig<Context, any>;

export type SingletonResourceConfig<Context extends Fields> = {
    key?: Falsy;
    listKeys?: Falsy;
    endpoints?: Record<string, EndpointConfig<Context, never>|Falsy>;
    children?: Record<string, ResourceConfig<any>|Falsy>;
};

export type DocumentCollectionConfig<Context extends Fields, Key extends FieldType> = {
    key: DocumentCollectionKey<Key>;
    listKeys?: ((context: FieldValues<Context>) => (keys: string[]) => AsyncIterable<string>) | Falsy;
    endpoints?: Record<string, EndpointConfig<Context, Key>|Falsy>;
    children?: Record<string, ResourceConfig<any>|Falsy>;
}

export type EndpointConfig<Context extends Fields, Key extends FieldType> =
    MapEndpointConfig<Context, Key> | FlatMapEndpointConfig<Context, Key>;

export type MapEndpointConfig<Context extends Fields, Key extends FieldType> = {
    scope: [Key] extends [never] ? EndpointScope.Resource : EndpointScope,
    cardinality: Cardinality.One,
    fn: MapEndpointFn<Context>,
}
export type MapEndpointFn<Context extends Fields> = (context: FieldValues<Context>) => (input: EndpointPayload) => Promise<any>;

export type FlatMapEndpointConfig<Context extends Fields, Key extends FieldType> = {
    scope: [Key] extends [never] ? EndpointScope.Resource : EndpointScope,
    cardinality: Cardinality.Many,
    fn: FlatMapEndpointFn<Context>,
};
export type FlatMapEndpointFn<Context extends Fields> = (context: FieldValues<Context>) => (input: EndpointPayload) => AsyncIterable<any>;

export type DocumentCollectionKey<Type extends FieldType = FieldType> = {name: string, type: Field<Type>};

export type EndpointFn<Context extends Fields, Key extends FieldType|never, C extends Cardinality> =
    C extends Cardinality.One ? (context: FieldValues<Context>) => (input: EndpointPayload) => Promise<any>
    : C extends Cardinality.Many ? (context: FieldValues<Context>) => (input: EndpointPayload) => AsyncIterable<any>
    : never;
export type EndpointPayload = {
    keys: string[],
    data?: any,
};
type EndpointPayloadInternal = EndpointPayload & {
    path: string[],
};

export enum EndpointScope {
    Resource,
    Document,
};

export enum Cardinality {
    One,
    Many,
};

type Falsy = false | 0 | "" | null | undefined;

export class ResourceCollection<Context extends Fields> {
    private constructor(
        public readonly context: Context,
        private resources: Record<string, ResourceConfig<Context>|Falsy>
    ) {}

    static configure<Context extends Fields>({context, resources}: ResourceCollectionConfig<Context>): ResourceCollection<Context> {
        return new ResourceCollection(context, resources);
    }

    execute(command: Command<Context>) {
        const payloadTransforms: Transform<EndpointPayloadInternal, EndpointPayloadInternal>[] = [];
        let resource: ResourceConfig<any>;

        for (
            let resourcePath: ResourcePath|undefined = command.path, resources = this.resources;
            resourcePath !== undefined;
            resourcePath = resourcePath.child(resource.key !== null), resources = resource.children || {}
        ) {
            const resourceKey = Object.keys(resources).find(matching(resourcePath!.name()));
            if (!(resourceKey && resources[resourceKey])) {
                throw new Error(`The resource '${resourcePath.name()}' does not exist.`);
            }

            payloadTransforms.push(map(({path, ...rest}) => ({path: [...path, resourceKey], ...rest})));
            
            resource = nonFalsy(resources[resourceKey]);

            if (resource.key === null) {
                continue;
            }
    
            const documentKeySegment = resourcePath.key();

            if (!documentKeySegment) {
                // todo: check the command does not require a key ?
                break;
            }

            switch (documentKeySegment.type) {
                case 'constant': {
                    const key = documentKeySegment.value;
                    payloadTransforms.push(map(({keys, ...rest}) => ({keys: [...keys, key], ...rest})));
                    break;
                }
    
                case 'wildcard': {
                    if (!(resource.key && resource.listKeys)) {
                        throw new Error();
                    }
                    const listKeys = resource.listKeys(command.context);
                    payloadTransforms.push(flatMapAsync({concurrency: 50}, ({keys, ...rest}) => (
                        compose(listKeys, map(key => ({keys: [...keys, key], ...rest})))(keys)
                    )));
                    break;
                }
                
                case 'parameter': {
                    const paramName = documentKeySegment.name;
                    payloadTransforms.push(map(({keys, data, ...rest}) => ({keys: [...keys, data[paramName]], data, ...rest})));
                    break;
                }
            }

            payloadTransforms.push(map(({path, keys, ...rest}) => ({
                path: [...path, keys[keys.length - 1]],
                keys,
                ...rest
            })));
        }

        const endpointKey = Object.keys(resource!.endpoints || {}).find(matching(command.name));
        if (!(endpointKey && nonFalsy(resource!.endpoints)[endpointKey])) {
            throw new Error(`No such command '${command.name}'.`);
        }

        const endpointConfig = nonFalsy(nonFalsy(resource!.endpoints!)[endpointKey]);
        const endpointFn = endpointConfig.fn(command.context);

        const pathIncludesWildcard = command.path.includesWildcard();
        const wrapOutput = (path: string[], output: any) => ({path: path.join(ResourcePath.separator), output});
        const processor = pathIncludesWildcard
            ? (async function* (payload: EndpointPayloadInternal) {
                const result = endpointFn(payload);
                if (typeof result === 'object' && (result as any).then) {
                    yield wrapOutput(payload.path, await result as Promise<any>);
                } else {
                    yield wrapOutput(payload.path, await collectArray(result as AsyncIterable<any>));
                }
            }) : (async function* (payload: EndpointPayloadInternal) {
                const result = endpointFn(payload);
                if (typeof result === 'object' && (result as any).then) {
                    yield await result as Promise<any>;
                } else {
                    yield* result as AsyncIterable<any>;
                }
            });
        const generateOutput = compose(
            async function* (data: any) { yield {path: [], keys: [], data} },
            compose(...payloadTransforms),
            flatMapAsync({concurrency: 50}, processor),
        );
        const isSingleton = endpointConfig.cardinality === Cardinality.One && !pathIncludesWildcard;
        return isSingleton ? compose(generateOutput, first()) : generateOutput;
    }

    help(): string {
        return `Resources\n---------\n\n${this.resourcesHelp([], this.resources).join('\n\n')}`;
    }

    private resourcesHelp(path: string[], resources: Record<string, ResourceConfig<Context> | Falsy>): string[] {
        return Object.entries(resources)
            .filter(([, config]) => Boolean(config))
            .map(([name, _config]) => {
                const config = nonFalsy(_config);
                const keyParam = config.key && ResourcePath.formatParameterName(config.key.name);
                const keyPart = config.key ? (config.listKeys ? `{${keyParam}|${ResourcePath.wildcard}}` : `{${keyParam}}`) : null;
                const endpoints = Object.entries(config.endpoints || {})
                    .filter(([, endpoint]) => Boolean(endpoint)) as [string, EndpointConfig<any, any>][];
                const resourceEndpointsHelp = endpoints
                    .filter(([, endpoint]) => endpoint.scope === EndpointScope.Resource)
                    .map(this.endpointHelp)
                    .join(', ');
                const documentEndpoints = endpoints
                    .filter(([, endpoint]) => endpoint.scope === EndpointScope.Document)
                    .map(this.endpointHelp)
                    .join(', ');
                const resourcePath = [...path, ResourcePath.formatStaticSegment(name)];
                return [
                    resourceEndpointsHelp ? `${resourcePath.join(ResourcePath.separator)}\n  ${resourceEndpointsHelp}` : '',
                    documentEndpoints.length ? `${[...resourcePath, keyPart].join(ResourcePath.separator)}\n  ${documentEndpoints}` : '',
                    ...this.resourcesHelp(keyPart ? [...resourcePath, keyPart] : resourcePath, config.children || {}),
                ];
            })
            .reduce(flatten, [] as string[])
            .filter(str => str.length > 0);
    }

    private endpointHelp([name, config]: [string, EndpointConfig<any, any>]): string {
        return `${name}${config.cardinality === Cardinality.Many ? '[]' : ''}`;
    }
}

export type Command<Context extends Fields> = Readonly<{
    name: string,
    path: ResourcePath,
    context: FieldValues<Context>,
}>;

class ResourcePath {
    static readonly wildcard = '*';
    static readonly separator = '/';

    static of(value: string): ResourcePath {
        if (value.trim().length === 0) {
            throw new Error();
        }
        return new ResourcePath(value.trim());
    }

    static ofSegments(segments: string[]): ResourcePath {
        return ResourcePath.of(segments.join(ResourcePath.separator));
    }

    private constructor(readonly value: string) {}

    key(): PathKeySegment|undefined {
        const segments = this.segments();
        if (segments.length < 2) {
            return undefined;
        }
        const segment = segments[1];
        if (segment === ResourcePath.wildcard) {
            return {type: 'wildcard'};
        }
        const parameterMatch = segment.match(/^{([^}]+)}$/);
        if (parameterMatch) {
            return {type: 'parameter', name: parameterMatch[1]};
        }
        return {type: 'constant', value: segment};
    }

    name(): string {
        return this.value.split(ResourcePath.separator)[0];
    }

    child(hasKey: boolean): ResourcePath|undefined {
        const childPath = this.segments().slice(hasKey ? 2 : 1).join(ResourcePath.separator);
        return childPath.length ? ResourcePath.of(childPath) : undefined;
    }

    segments(): string[] {
        return this.value.split(ResourcePath.separator);
    }

    endsWithWildcard(): boolean {
        return this.segments().slice(-1)[0] === ResourcePath.wildcard;
    }

    withoutTrailingWildcard(): ResourcePath {
        return this.endsWithWildcard() ? ResourcePath.ofSegments(this.segments().slice(0, -1)) : this;
    }

    includesWildcard(): boolean {
        return this.segments().includes(ResourcePath.wildcard);
    }

    static formatStaticSegment(name: string): string {
        return hyphenate(name);
    }

    static formatParameterName(name: string): string {
        return underscore(name);
    }
}

type PathKeySegment = {type: 'constant', value: string} | {type: 'wildcard'} | {type: 'parameter', name: string};

function matching(searchTerm: string): (candidate: string) => boolean {
    const normalizedSearchTerm = camelCase(searchTerm);
    return candidate => camelCase(candidate) === normalizedSearchTerm;
}

function nonFalsy<T>(value: T): Exclude<T, Falsy> {
    if (!value) {
        throw new Error();
    }
    return value as Exclude<T, Falsy>;
}

export function resourceAction<Context extends Fields>(name: string, resources: ResourceCollection<Context>): Action {
    return Action.source({
        name,
        context: {
            command: Field.string().required(),
            resourcePath: Field.string().required(),
            ...resources.context,
        },
        fn: ({command: commandName, resourcePath, ...context}) => {
            const command: Command<Context> = {
                name: commandName as string,
                context: context as FieldValues<Context>,
                path: ResourcePath.of(resourcePath as string),
            };
            const inputHandler = resources.execute(command);
            return ({input}) => inputHandler(input);
        },
        help: resources.help(),
    });
}

async function collectArray<T>(input: AsyncIterable<T>): Promise<T[]> {
    const result: T[] = [];
    for await (const el of input) {
        result.push(el);
    }
    return result;
}
