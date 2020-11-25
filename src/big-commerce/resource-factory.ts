import BigCommerce from "./client";
import { map, compose } from "@space48/json-pipe";
import { ResourceConfig, DocumentCollectionConfig, SingletonResourceConfig, EndpointScope, Cardinality, EndpointConfig, ResourceCollection, MapEndpointFn } from "../resource";
import { Field, FieldType } from "../action";
import { mapProperties } from "../util";

type ReadOptions<Key extends FieldType = any> = {
    get?: boolean,
    list?: boolean,
    listDocKeys?: boolean,
    customEndpoints?: Record<string, EndpointConfig<Key, Cardinality>>,
    children?: ResourceCollection;
};
type WriteOptions<Key extends FieldType = any> = {
    create?: boolean,
    update?: boolean,
    delete?: boolean,
    customEndpoints?: Record<string, EndpointConfig<Key, Cardinality>>,
    children?: ResourceCollection;
};

const defaultOptions = {
    get: true,
    list: true,
    listDocKeys: true,
    create: true,
    update: true,
    delete: true,
};

export class BigCommerceResourceFactory {
    constructor( private client: BigCommerce ) {}

    documentCollection(uriTemplate: string, options: ReadOptions & WriteOptions = defaultOptions): DocumentCollectionConfig<any> {
        return {
            docKey: {name: 'id', type: Field.integer()},

            endpoints: {
                ...this.read(EndpointScope.Document, uriTemplate, options),
                ...this.write(EndpointScope.Document, uriTemplate, options),
                ...options.customEndpoints,
            },

            children: options.children,

            listDocKeys: options.list && (options.listDocKeys !== false) && compose(
                docKeys => this.client.list(UriTemplate.uri(uriTemplate, docKeys)),
                map(doc => doc.id),
            ),
        };
    }

    singletonResource(uriTemplate: string, options: ReadOptions<never> & WriteOptions<never> = defaultOptions): SingletonResourceConfig {
        return {
            endpoints: {
                ...this.read(EndpointScope.Resource, uriTemplate, options),
                ...this.write(EndpointScope.Resource, uriTemplate, options),
                ...options.customEndpoints,
            },

            children: options.children,
        };
    }

    documentCollectionWithBatchEndpoints(uriTemplate: string, options: ReadOptions & WriteOptions = defaultOptions): DocumentCollectionConfig<any> {
        const readConfig = this.documentCollection(uriTemplate, {list: options.list, listDocKeys: options.listDocKeys});

        const {
            create,
            // `delete` is reserved in JS
            delete: _delete,
            update,
        } = this.write(EndpointScope.Resource, uriTemplate, options)!;

        return {
            ...readConfig,

            endpoints: {
                ...readConfig.endpoints,

                get: options.list && {
                    cardinality: Cardinality.One,
                    fn: async ({docKeys}) => {
                        const result = await this.client.get(UriTemplate.uri(uriTemplate, docKeys), {'id:in': docKeys[docKeys.length - 1]});
                        return result[0];
                    },
                    scope: EndpointScope.Document,
                },

                create: create && {
                    cardinality: Cardinality.One,
                    fn: async ({docKeys, data}) => {
                        const result = await create.fn({docKeys, data: [data]});
                        return result[0];
                    },
                    scope: EndpointScope.Document,
                },

                delete: _delete && {
                    cardinality: Cardinality.One,
                    fn: async ({docKeys}) => {
                        await _delete.fn({docKeys, data: {'id:in': docKeys[docKeys.length - 1]}});
                        return null;
                    },
                    scope: EndpointScope.Document,
                },

                update: update && {
                    cardinality: Cardinality.One,
                    fn: async ({docKeys, data}) => {
                        const result = await update.fn({docKeys, data: [data]});
                        return result[0];
                    },
                    scope: EndpointScope.Document,
                },
            },
        };
    }

    private read(scope: EndpointScope, uriTemplate: string, options: ReadOptions): NonNullable<ResourceConfig['endpoints']> {
        return {
            ...(options?.get ? this.get(scope, scope === EndpointScope.Resource ? uriTemplate : `${uriTemplate}/{id}`) : {}),
            ...(options?.list ? this.list(uriTemplate) : {}),
        };
    }

    private write(scope: EndpointScope, uriTemplate: string, options?: WriteOptions): NonNullable<ResourceConfig['endpoints']> {
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
                fn: ({docKeys, data}) => this.client.post(UriTemplate.uri(uriTemplate, docKeys), data),
            }
        };
    }

    private get(scope: EndpointScope, uriTemplate: string): ResourceConfig['endpoints'] {
        return {
            get: {
                scope,
                cardinality: Cardinality.One,
                fn: ({docKeys, data}) => this.client.get(UriTemplate.uri(uriTemplate, docKeys), data),
            }
        };
    }

    private list(uriTemplate: string): ResourceConfig['endpoints'] {
        return {
            list: {
                scope: EndpointScope.Resource,
                cardinality: Cardinality.Many,
                fn: ({docKeys, data}) => this.client.list(UriTemplate.uri(uriTemplate, docKeys), data),
            }
        };
    }

    private update(scope: EndpointScope, uriTemplate: string): ResourceConfig['endpoints'] {
        return {
            update: {
                scope,
                cardinality: Cardinality.One,
                fn: ({docKeys, data}) => this.client.put(UriTemplate.uri(uriTemplate, docKeys), data),
            }
        };
    }

    private delete(scope: EndpointScope, uriTemplate: string): ResourceConfig['endpoints'] {
        return {
            delete: {
                scope,
                cardinality: Cardinality.One,
                fn: ({docKeys, data}) => this.client.delete(UriTemplate.uri(uriTemplate, docKeys), data),
            }
        };
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
