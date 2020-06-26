import { Config } from "../config";
import { ConfigSchema, getClientCredentials } from "./credentials";
import BigCommerce from "./client";
import { map, compose } from "@space48/json-pipe";
import { ResourceConfig, DocumentCollectionConfig, SingletonResourceConfig, EndpointScope, Cardinality } from "../resource";
import { FieldValues, Field } from "../action";

type ReadOptions = {
    get?: boolean,
    list?: boolean,
    listKeys?: boolean,
};
type WriteOptions = {
    create?: boolean,
    update?: boolean,
    delete?: boolean,
};

const defaultOptions: ReadOptions & WriteOptions = {
    get: true,
    list: true,
    listKeys: true,
    create: true,
    update: true,
    delete: true,
};

type BigCommerceContext = typeof BigCommerceResourceFactory.context;

export class BigCommerceResourceFactory {
    static readonly context = {};

    constructor(
        private storeAlias: string,
        private config: Config<ConfigSchema>
    ) {}

    documentCollection(uriTemplate: string, options: ReadOptions & WriteOptions = defaultOptions): DocumentCollectionConfig<BigCommerceContext, any> {
        return {
            key: {name: 'id', type: Field.integer()},

            endpoints: {
                ...this.read(EndpointScope.Document, uriTemplate, options),
                ...this.write(EndpointScope.Document, uriTemplate, options),
            },

            listKeys: options.list && (context => {
                const client = this.getClient(context);
                return compose(
                    keys => client.list(UriTemplate.uri(uriTemplate, keys)),
                    map(doc => doc.id),
                );
            }),
        };
    }

    singletonResource(uriTemplate: string, options: ReadOptions & WriteOptions = defaultOptions): SingletonResourceConfig<BigCommerceContext> {
        return {
            endpoints: {
                ...this.read(EndpointScope.Resource, uriTemplate, options),
                ...this.write(EndpointScope.Resource, uriTemplate, options),
            }
        };
    }

    private read(scope: EndpointScope, uriTemplate: string, options: ReadOptions): ResourceConfig<BigCommerceContext>['endpoints'] {
        return {
            ...(options?.get ? this.get(scope, `${uriTemplate}/{id}`) : {}),
            ...(options?.list ? this.list(uriTemplate) : {}),
        };
    }

    private write(scope: EndpointScope, uriTemplate: string, options?: WriteOptions): ResourceConfig<BigCommerceContext>['endpoints'] {
        return {
            ...(options?.create ? this._create(uriTemplate) : {}),
            ...(options?.update ? this.update(scope, `${uriTemplate}/{id}`) : {}),
            ...(options?.delete ? this.delete(scope, `${uriTemplate}/{id}`) : {}),
        };
    }

    private _create(uriTemplate: string): ResourceConfig<BigCommerceContext>['endpoints'] {
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

    private get(scope: EndpointScope, uriTemplate: string, requestParams?: Record<string, any>): ResourceConfig<BigCommerceContext>['endpoints'] {
        return {
            get: {
                scope,
                cardinality: Cardinality.One,
                fn: context => {
                    const client = this.getClient(context);
                    return ({keys}) => client.get(UriTemplate.uri(uriTemplate, keys), requestParams);
                }
            }
        };
    }

    private list(uriTemplate: string, requestParams?: Record<string, any>): ResourceConfig<BigCommerceContext>['endpoints'] {
        return {
            list: {
                scope: EndpointScope.Resource,
                cardinality: Cardinality.Many,
                fn: context => {
                    const client = this.getClient(context);
                    return ({keys}) => client.list(UriTemplate.uri(uriTemplate, keys), requestParams);
                }
            }
        };
    }

    private update(scope: EndpointScope, uriTemplate: string): ResourceConfig<BigCommerceContext>['endpoints'] {
        return {
            update: {
                scope,
                cardinality: Cardinality.One,
                fn: context => {
                    const client = this.getClient(context);
                    return ({keys, data}) => client.put(UriTemplate.uri(uriTemplate, keys), data);
                }
            }
        };
    }

    private delete(scope: EndpointScope, uriTemplate: string): ResourceConfig<BigCommerceContext>['endpoints'] {
        return {
            delete: {
                scope,
                cardinality: Cardinality.One,
                fn: context => {
                    const client = this.getClient(context);
                    return ({keys}) => client.delete(UriTemplate.uri(uriTemplate, keys));
                }
            }
        };
    }

    private client: BigCommerce|undefined;

    private getClient(_: FieldValues<BigCommerceContext>): BigCommerce {
        if (!this.client) {
            const credentials = getClientCredentials(this.config, this.storeAlias);
            if (!credentials)  {
                const allAliases = Object.keys(this.config.select('credentials').getAll() || {});
                throw new Error(`No credentials found for store ${this.storeAlias}. Available stores: ${allAliases.join(', ')}`);
            }
            this.client = new BigCommerce(credentials);
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
            .filter((field, index) => (fieldValues[index] ?? null) !== null)
            .reduce((uri, field, index) => uri.replace(`{${field}}`, fieldValues[index]), uriTemplate);
    }

    static fields(uriTemplate: string): string[] {
        // todo: convert to matchAll once we support ES2020
        return uriTemplate.match(/\{[^}]+\}/g)?.map(match => match.substring(1, match.length - 1)) || [];
    }
}
