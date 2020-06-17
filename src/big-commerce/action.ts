import { Config } from "../config";
import { ConfigSchema } from ".";
import { Field, ActionConfig, Fields, Action } from "../action";
import BigCommerce from "./client";
import { objectFromEntries } from "../util";
import { compose, flatMapAsync } from "@space48/json-pipe";

type ReadOptions = {
    get?: boolean,
    list?: boolean,
};
type WriteOptions = {
    create?: boolean,
    update?: boolean,
    delete?: boolean,
};

export class BigCommerceActionFactory {
    constructor(private config: Config<ConfigSchema>) {}

    // CRUD convenience methods

    crud(uriTemplate: string, options?: ReadOptions & WriteOptions): Action[] {
        return [
            ...this.read(uriTemplate, options),
            ...this.write(uriTemplate, options),
        ];
    }

    read(uriTemplate: string, options?: ReadOptions): Action[] {
        return [
            (options?.get || true) && this.get(`${uriTemplate}/{id}`),
            (options?.list || true) && this.list(uriTemplate),
        ].filter(Boolean);
    }

    write(uriTemplate: string, options?: WriteOptions): Action[] {
        return [
            (options?.create || true) && this.create(uriTemplate),
            (options?.update || true) && this.update(`${uriTemplate}/{id}`),
            (options?.delete || true) && this.delete(`${uriTemplate}/{id}`),
        ].filter(Boolean);
    }

    create(uriTemplate: string) {
        return this.sink({
            name: 'create',
            params: getIdFields(uriTemplate),
            fn: bc => (data, ids) => bc.post(UriTemplate.uri(uriTemplate, ids), data),
        });
    }

    get(uriTemplate: string, requestParams?: Record<string, any>) {
        return this.source({
            name: 'get',
            params: getIdFields(uriTemplate),
            fn: bc => ids => bc.get(UriTemplate.uri(uriTemplate, ids), requestParams),
        });
    }

    list(uriTemplate: string, requestParams?: Record<string, any>) {
        const that = this;
        return this.source({
            name: 'list',
            params: getIdFields(uriTemplate, false),
            fn: bc => async function* (partialIds) {
                const idsStream = that.resolveIds(bc, uriTemplate, partialIds);
                yield* flatMapAsync(50, (ids: any) => bc.list(UriTemplate.uri(uriTemplate, ids), requestParams))(idsStream);
            },
        });
    }

    update(uriTemplate: string) {
        return this.sink({
            name: 'update',
            params: getIdFields(uriTemplate),
            fn: m2 => (data, ids) => m2.put(UriTemplate.uri(uriTemplate, ids), data),
        });
    }

    delete(uriTemplate: string) {
        return this.source({
            name: 'delete',
            params: getIdFields(uriTemplate),
            fn: bc => ids => bc.delete(UriTemplate.uri(uriTemplate, ids)),
        });
    }

    // advanced methods

    source<P extends Fields = {}>({name, params, fn}: SourceConfig<P>) {
        return Action.source({
            name,
            context: BigCommerceActionFactory.clientContext,
            params,
            concurrency: {default: 100},
            fn: context => {
                const client = this.getClient(context);
                return fn(client);
            },
        });
    }

    sink<P extends Fields = {}>({name, params, fn}: SinkConfig<P>) {
        return Action.sink({
            name,
            context: BigCommerceActionFactory.clientContext,
            params,
            concurrency: {default: 100},
            fn: context => {
                const client = this.getClient(context);
                return fn(client);
            },
        });
    }

    private static clientContext = {
        storeAlias: Field.string().required(),
    };

    private getClient({storeAlias}: {storeAlias: string}): BigCommerce {
        const credentials = this.config.select('credentials').get(storeAlias);
        if (!credentials)  {
            const allAliases = Object.keys(this.config.select('credentials').getAll() || {});
            throw new Error(`No credentials found for store ${storeAlias}. Available stores: ${allAliases.join(', ')}`);
        }
        return new BigCommerce(credentials);
    }

    private resolveIds(client: BigCommerce, uriTemplate: string, partialIds: Record<string, any>): AsyncIterable<Record<string, any>> {
        const maybeUri = UriTemplate.applyValues(uriTemplate, partialIds);
        const missingIds = UriTemplate.fields(maybeUri);
        const transform = compose(
            ...missingIds.map(missingId => {
                const [_uriTemplate] = UriTemplate.split(maybeUri, missingId);
                return flatMapAsync(10, async function* (ids: Record<string, any>) {
                    const uri = UriTemplate.uri(_uriTemplate, ids);
                    for await (const entity of client.list(uri)) {
                        yield { ...ids, [missingId]: entity.id };
                    }
                });
            })
        );
        return transform((async function* () { yield partialIds })());
    }
}

type SourceConfig<P extends Fields = {}> = {
    name: string,
    params?: P,
    fn: (client: BigCommerce) => ReturnType<NonNullable<ActionConfig<any, P>['source']>>,
};

type SinkConfig<P extends Fields = {}> = {
    name: string,
    params?: P,
    fn: (client: BigCommerce) => ReturnType<NonNullable<ActionConfig<any, P>['sink']>>,
};

function getIdFields(uriTemplate: string, required: boolean = true) {
    return objectFromEntries(
        UriTemplate.fields(uriTemplate).map(fieldName => [fieldName, Field.integer().required(required)])
    );
}

class UriTemplate {
    static uri(uriTemplate: string, fieldValues: Record<string, any>): string {
        const uri = UriTemplate.applyValues(uriTemplate, fieldValues);
        const missingValues = UriTemplate.fields(uri);
        if (UriTemplate.fields(uri).length > 0) {
            throw new Error(`Missing URI fields ${missingValues.join(', ')}`);
        }
        return uri;
    }

    static split(uriTemplate: string, field: string): [string, string] {
        const parts = uriTemplate.split(`{${field}}`);
        return [parts[0], parts[1] ?? ''];
    }

    static applyValues(uriTemplate: string, fieldValues: Record<string, any>): string {
        return UriTemplate.fields(uriTemplate)
            .filter(field => (fieldValues[field] ?? null) !== null)
            .reduce((uri, field) => uri.replace(`{${field}}`, String(fieldValues[field])), uriTemplate);
    }

    static fields(uriTemplate: string): string[] {
        // todo: convert to matchAll once we support ES2020
        return uriTemplate.match(/\{[^}]+\}/g)?.map(match => match.substring(1, match.length - 1)) || [];
    }
}
