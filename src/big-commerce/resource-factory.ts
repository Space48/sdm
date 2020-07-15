import { ConfigStore } from "../config-store";
import { ConfigSchema, getClientCredentials } from "./config";
import BigCommerce from "./client";
import { map, compose } from "@space48/json-pipe";
import { ResourceConfig, DocumentCollectionConfig, SingletonResourceConfig, EndpointScope, Cardinality } from "../resource";
import { Field } from "../action";

type ReadOptions = {
    get?: boolean,
    list?: boolean,
    listDocKeys?: boolean,
};
type WriteOptions = {
    create?: boolean,
    update?: boolean,
    delete?: boolean,
};

const defaultOptions: ReadOptions & WriteOptions = {
    get: true,
    list: true,
    listDocKeys: true,
    create: true,
    update: true,
    delete: true,
};

export class BigCommerceResourceFactory {
    static readonly context = {};

    constructor(
        private storeAlias: string,
        private config: ConfigStore<ConfigSchema>
    ) {}

    documentCollection(uriTemplate: string, options: ReadOptions & WriteOptions = defaultOptions): DocumentCollectionConfig<any> {
        return {
            docKey: {name: 'id', type: Field.integer()},

            endpoints: {
                ...this.read(EndpointScope.Document, uriTemplate, options),
                ...this.write(EndpointScope.Document, uriTemplate, options),
            },

            listDocKeys: options.list && compose(
                docKeys => this.getClient().list(UriTemplate.uri(uriTemplate, docKeys)),
                map(doc => doc.id),
            ),
        };
    }

    singletonResource(uriTemplate: string, options: ReadOptions & WriteOptions = defaultOptions): SingletonResourceConfig {
        return {
            endpoints: {
                ...this.read(EndpointScope.Resource, uriTemplate, options),
                ...this.write(EndpointScope.Resource, uriTemplate, options),
            }
        };
    }

    private read(scope: EndpointScope, uriTemplate: string, options: ReadOptions): ResourceConfig['endpoints'] {
        return {
            ...(options?.get ? this.get(scope, scope === EndpointScope.Resource ? uriTemplate : `${uriTemplate}/{id}`) : {}),
            ...(options?.list ? this.list(uriTemplate) : {}),
        };
    }

    private write(scope: EndpointScope, uriTemplate: string, options?: WriteOptions): ResourceConfig['endpoints'] {
        return {
            ...(options?.create ? this._create(uriTemplate) : {}),
            ...(options?.update ? this.update(scope, scope === EndpointScope.Resource ? uriTemplate : `${uriTemplate}/{id}`) : {}),
            ...(options?.delete ? this.delete(scope, scope === EndpointScope.Resource ? uriTemplate : `${uriTemplate}/{id}`) : {}),
        };
    }

    private _create(uriTemplate: string): ResourceConfig['endpoints'] {
        return {
            create: {
                scope: EndpointScope.Resource,
                cardinality: Cardinality.One,
                fn: ({docKeys: docKeys, data}) => this.getClient().post(UriTemplate.uri(uriTemplate, docKeys), data),
            }
        };
    }

    private get(scope: EndpointScope, uriTemplate: string, requestParams?: Record<string, any>): ResourceConfig['endpoints'] {
        return {
            get: {
                scope,
                cardinality: Cardinality.One,
                fn: ({docKeys: docKeys}) => this.getClient().get(UriTemplate.uri(uriTemplate, docKeys), requestParams),
            }
        };
    }

    private list(uriTemplate: string, requestParams?: Record<string, any>): ResourceConfig['endpoints'] {
        return {
            list: {
                scope: EndpointScope.Resource,
                cardinality: Cardinality.Many,
                fn: ({docKeys: docKeys}) => this.getClient().list(UriTemplate.uri(uriTemplate, docKeys), requestParams),
            }
        };
    }

    private update(scope: EndpointScope, uriTemplate: string): ResourceConfig['endpoints'] {
        return {
            update: {
                scope,
                cardinality: Cardinality.One,
                fn: ({docKeys: docKeys, data}) => this.getClient().put(UriTemplate.uri(uriTemplate, docKeys), data),
            }
        };
    }

    private delete(scope: EndpointScope, uriTemplate: string): ResourceConfig['endpoints'] {
        return {
            delete: {
                scope,
                cardinality: Cardinality.One,
                fn: ({docKeys: docKeys}) => this.getClient().delete(UriTemplate.uri(uriTemplate, docKeys)),
            }
        };
    }

    private client: BigCommerce|undefined;

    private getClient(): BigCommerce {
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
