import { Field, FieldType } from "./action";
import { flatMapAsync, map, mapAsync, Transform, compose, first } from "@space48/json-pipe";
import { camelCase, hyphenate, underscore, flatten } from "./util";

export type ResourceCollection = Record<string, ResourceConfig | Falsy>;

export type ResourceConfig = SingletonResourceConfig | DocumentCollectionConfig<any>;

export namespace ResourceConfig {
    export function merge<T extends ResourceConfig>(config: T, update: Partial<T>): T {
        const children = {...config.children} as ResourceCollection;
        Object.entries(update.children ?? {}).forEach(([childName, childUpdate]) => {
            if (!childUpdate) {
                delete children[childName];
            } else if (children[childName]) {
                children[childName] = merge(
                    children[childName] as ResourceConfig,
                    childUpdate as ResourceConfig
                );
            } else {
                children[childName] = childUpdate as ResourceConfig;
            }
        });
        return {
            ...config,
            ...update,
            endpoints: {
                ...config.endpoints,
                ...update.endpoints,
            },
            children,
        };
    }
}

export type SingletonResourceConfig = {
    docKey?: Falsy;
    listDocKeys?: Falsy;
    endpoints?: Record<string, EndpointConfig<never, any>|Falsy>;
    children?: ResourceCollection;
};

export type DocumentCollectionConfig<Key extends FieldType> = {
    docKey: DocumentKeyDefinition<Key>;
    listDocKeys?: ((keys: string[]) => AsyncIterable<string>) | Falsy;
    endpoints?: Record<string, EndpointConfig<Key, Cardinality>|Falsy>;
    children?: ResourceCollection;
}

export type EndpointConfig<Key extends FieldType, C extends Cardinality> = {
    scope: [Key] extends [never] ? EndpointScope.Resource : EndpointScope,
    cardinality: C,
    fn: C extends Cardinality.One ? MapEndpointFn : FlatMapEndpointFn,
};
export type MapEndpointFn = (input: EndpointPayload) => Promise<any>;
export type FlatMapEndpointFn = (input: EndpointPayload) => AsyncIterable<any>;

export type DocumentKeyDefinition<Type extends FieldType = FieldType> = {name: string, type: Field<Type>};

export type EndpointFn<Key extends FieldType|never, C extends Cardinality> =
    C extends Cardinality.One ? (input: EndpointPayload) => Promise<any>
    : C extends Cardinality.Many ? (input: EndpointPayload) => AsyncIterable<any>
    : never;
export type EndpointPayload = {
    docKeys: string[],
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

export type Command = Readonly<{
    name: string,
    path: string,
}>;

export function executeCommand(resources: ResourceCollection, command: Command, input?: AsyncIterable<any>): AsyncIterable<any> {
    const commandPath = ResourcePath.of(command.path);
    
    const {resource, payloadTransform} = resolveResourceAndPayloads(resources, commandPath);

    const endpointKey = Object.keys(resource!.endpoints || {}).find(matching(command.name));
    if (!(endpointKey && nonFalsy(resource!.endpoints)[endpointKey])) {
        throw new Error(`No such command '${command.name}'.`);
    }

    const endpoint = nonFalsy(resource!.endpoints![endpointKey]);

    const processor = commandPath.includesWildcard()
        ? (async function* (payload: EndpointPayloadInternal) {
            const result = endpoint.fn(payload);
            if (typeof result === 'object' && (result as any).then) {
                yield addPathToOutput(payload.path, await result as Promise<any>);
            } else {
                yield addPathToOutput(payload.path, await collectArray(result as AsyncIterable<any>));
            }
        }) : (async function* (payload: EndpointPayloadInternal) {
            const result = endpoint.fn(payload);
            if (typeof result === 'object' && (result as any).then) {
                yield await result as Promise<any>;
            } else {
                yield* result as AsyncIterable<any>;
            }
        });

    const generateOutput = compose(
        async function* (data: any) { yield {path: [], docKeys: [], data} },
        payloadTransform,
        flatMapAsync({concurrency: 50}, processor),
    );

    if (input) {
        const isSingleton = endpoint.cardinality === Cardinality.One && !commandPath.includesWildcard();
        const inputHandler = isSingleton ? compose(generateOutput, first()) : compose(generateOutput, collectArray);
        return mapAsync({concurrency: 50}, async _input => {
            const startTime = new Date();
            try {
                return {
                    timestamp: startTime.toISOString(),
                    input: _input,
                    duration: Date.now() - startTime.getTime(),
                    success: true,
                    output: await inputHandler(_input),
                };
            } catch (error) {
                return {
                    timestamp: startTime.toISOString(),
                    input: _input,
                    duration: Date.now() - startTime.getTime(),
                    success: false,
                    error: error.detail || error.message,
                };
            }
        })(input);
    } else {
        return generateOutput(null);
    }
}

function resolveResourceAndPayloads(resources: ResourceCollection, path: ResourcePath) {
    const payloadTransforms: Transform<EndpointPayloadInternal, EndpointPayloadInternal>[] = [];
    let resource: ResourceConfig;

    for (
        let resourcePath: ResourcePath|undefined = path, _resources = resources;
        resourcePath !== undefined;
        resourcePath = resourcePath.child(resource.docKey !== null), _resources = resource.children || {}
    ) {
        const resourceKey = Object.keys(_resources).find(matching(resourcePath!.name()));
        if (!(resourceKey && _resources[resourceKey])) {
            throw new Error(`The resource '${resourcePath.name()}' does not exist.`);
        }

        const resourcePathSegment = ResourcePath.formatStaticSegment(resourceKey);
        payloadTransforms.push(map(({path, ...rest}) => ({path: [...path, resourcePathSegment], ...rest})));
        
        resource = nonFalsy(_resources[resourceKey]);

        if (resource.docKey === null) {
            continue;
        }

        const documentKeySegment = resourcePath.key();

        if (!documentKeySegment) {
            // todo: check the command does not require a key ?
            break;
        }

        switch (documentKeySegment.type) {
            case 'constant': {
                const docKey = documentKeySegment.value;
                payloadTransforms.push(map(({docKeys, ...rest}) => ({docKeys: [...docKeys, docKey], ...rest})));
                break;
            }

            case 'wildcard': {
                if (!(resource.docKey && resource.listDocKeys)) {
                    throw new Error();
                }
                const {listDocKeys} = resource;
                payloadTransforms.push(flatMapAsync({concurrency: 50}, ({docKeys, ...rest}) => (
                    compose(
                        listDocKeys,
                        map(docKey => ({docKeys: [...docKeys, docKey], ...rest}))
                    )(docKeys)
                )));
                break;
            }
            
            case 'parameter': {
                const paramName = documentKeySegment.name;
                payloadTransforms.push(map(({docKeys, data, ...rest}) => ({docKeys: [...docKeys, data[paramName]], data, ...rest})));
                break;
            }
        }

        payloadTransforms.push(map(({path, docKeys, ...rest}) => ({
            path: [...path, docKeys[docKeys.length - 1]],
            docKeys,
            ...rest
        })));
    }

    return {
        resource: resource!,
        payloadTransform: compose(...payloadTransforms),
    };
}

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

async function collectArray<T>(input: AsyncIterable<T>): Promise<T[]> {
    const result: T[] = [];
    for await (const el of input) {
        result.push(el);
    }
    return result;
}

const addPathToOutput = (path: string[], output: any) => ({path: path.join(ResourcePath.separator), output});

type Falsy = false | 0 | "" | null | undefined;

export function getAvailableCommands(resources: ResourceCollection): Command[] {
    return Object.entries(resources)
        .map(([name, config]) => config ? getResourceCommands([ResourcePath.formatStaticSegment(name)], config) : [])
        .reduce(flatten, []);
}

function getResourceCommands(resourcePath: string[], resource: ResourceConfig): Command[] {
    const keyParam = resource.docKey && ResourcePath.formatParameterName(resource.docKey.name);
    const keyPart = resource.docKey ? (resource.listDocKeys ? `{${keyParam}|${ResourcePath.wildcard}}` : `{${keyParam}}`) : null;
    const childPath = keyPart ? [...resourcePath, keyPart] : resourcePath;

    return [
        ...Object.entries(resource.endpoints || {})
            .filter(([, config]) => config)
            .map(([name, config]) => ({
                name,
                path: resourcePath.join('/') + (config && (config as any).scope === EndpointScope.Document ? `/${keyPart}` : ''),
            })),

        ...Object.entries(resource.children || {})
            .map(([name, config]) => config ? getResourceCommands([...childPath, ResourcePath.formatStaticSegment(name)], config) : [])
            .reduce(flatten, []),
    ];
}
