import { Config } from "../config";
import { ConfigSchema, createClient } from "./credentials";
import Magento2, { SortKey } from "./client";
import { ResourceConfig, DocumentCollectionKey, EndpointScope, Cardinality } from "../resource";
import { FieldValues, Field, FieldType } from "../action";
import { compose, map } from "@space48/json-pipe";

type Options = {
    key?: DocumentCollectionKey,
    list?: ListOptions,
    create?: string|true,
    get?: string|true,
    update?: string|true,
    delete?: string|true,
};
type ListOptions = {
    uri?: string,
    sortKey: SortKey,
};

type Magento2Context = typeof Magento2ResourceFactory.context;

export class Magento2ResourceFactory {
    static readonly context = {
        insecure: Field.boolean(),
    };

    constructor(
        private baseUrl: string,
        private config: Config<ConfigSchema>
    ) {}

    create(uriTemplate: string, options: Options): ResourceConfig<Magento2Context> {
        const keySuffix = options.key ? '/{key}' : '';
        const scope = options.key ? EndpointScope.Document : EndpointScope.Resource;
        
        const endpoints = {
            ...(options?.get && this.get(scope, typeof options.get === 'string' ? options.get : uriTemplate + keySuffix)),
            ...(options?.list && this.list(options.list.uri || uriTemplate, options.list.sortKey)),
            ...(options?.create && this._create(typeof options.create === 'string' ? options.create : uriTemplate)),
            ...(options?.update && this.update(scope, typeof options.update === 'string' ? options.update : uriTemplate + keySuffix)),
            ...(options?.delete && this.delete(scope, typeof options.delete === 'string' ? options.delete : uriTemplate + keySuffix)),
        };

        if (!options.key) {
            return {endpoints};
        }

        return {
            key: options.key,
            endpoints,
            listKeys: options?.list && options.key && (context => {
                const client = this.getClient(context);
                return compose(
                    keys => client.search(UriTemplate.uri(uriTemplate, keys), {sortKey: options!.list!.sortKey}),
                    map(doc => doc[options.key!.name]),
                );
            }),
        };
    }

    private _create(uriTemplate: string): ResourceConfig<Magento2Context>['endpoints'] {
        return {
            create: {
                scope: EndpointScope.Resource,
                cardinality: Cardinality.One,
                fn: context => {
                    const client = this.getClient(context);
                    return ({keys, data}) => client.post(UriTemplate.uri(uriTemplate, keys), data);
                }
            }
        };
    }

    private get(scope: EndpointScope, uriTemplate: string): ResourceConfig<Magento2Context>['endpoints'] {
        return {
            get: {
                scope,
                cardinality: Cardinality.One,
                fn: context => {
                    const client = this.getClient(context);
                    return ({keys}) => client.get(UriTemplate.uri(uriTemplate, keys));
                }
            },
        };
    }

    private list(uriTemplate: string, sortKey: SortKey): ResourceConfig<Magento2Context>['endpoints'] {
        return {
            list: {
                scope: EndpointScope.Resource,
                cardinality: Cardinality.Many,
                fn: context => {
                    const client = this.getClient(context);
                    return ({keys}) => client.search(UriTemplate.uri(uriTemplate, keys), {sortKey});
                },
            },
        };
    }

    private update(scope: EndpointScope, uriTemplate: string): ResourceConfig<Magento2Context>['endpoints'] {
        return {
            update: {
                scope,
                cardinality: Cardinality.One,
                fn: context => {
                    const client = this.getClient(context);
                    return ({keys, data}) => client.put(UriTemplate.uri(uriTemplate, keys), data);
                },
            },
        };
    }

    private delete(scope: EndpointScope, uriTemplate: string): ResourceConfig<Magento2Context>['endpoints'] {
        return {
            delete: {
                scope,
                cardinality: Cardinality.One,
                fn: context => {
                    const client = this.getClient(context);
                    return ({keys}) => client.delete(UriTemplate.uri(uriTemplate, keys));
                },
            },
        };
    }

    private client: Magento2|undefined;

    private getClient({insecure}: FieldValues<Magento2Context>): Magento2 {
        if (!this.client) {
            this.client = createClient(this.config, this.baseUrl, {insecure});
        }
        return this.client;
    }
}

class UriTemplate {
    static uri(uriTemplate: string, fieldValues: string[]): string {
        const uri = UriTemplate.applyValues(uriTemplate, fieldValues);
        const missingValues = UriTemplate.fields(uri);
        if (UriTemplate.fields(uri).length > 0) {
            throw new Error(`Missing URI fields ${missingValues.join(', ')}`);
        }
        return uri;
    }

    static applyValues(uriTemplate: string, fieldValues: string[]): string {
        return UriTemplate.fields(uriTemplate)
            .filter((_, index) => (fieldValues[index] ?? null) !== null)
            .reduce((uri, field, index) => uri.replace(`{${field}}`, fieldValues[index]), uriTemplate);
    }

    static fields(uriTemplate: string): string[] {
        // todo: convert to matchAll once we support ES2020
        return uriTemplate.match(/\{[^}]+\}/g)?.map(match => match.substring(1, match.length - 1)) || [];
    }
}
