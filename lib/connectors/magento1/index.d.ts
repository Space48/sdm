import { Magento1Scope } from './functions';
import * as t from 'io-ts';
import { Magento1SoapClient } from './soap';
import { Magento1RestClient } from './rest';
import * as f from '../../framework';
export declare type Magento1Config = t.TypeOf<typeof configSchema>;
declare const configSchema: t.IntersectionC<[t.TypeC<{
    baseUrl: t.StringC;
}>, t.PartialC<{
    concurrency: t.NumberC;
    insecure: t.BooleanC;
}>, t.PartialC<{
    rest: t.TypeC<{
        credentials: t.TypeC<{
            key: t.StringC;
            secret: t.StringC;
        }>;
        accessToken: t.TypeC<{
            token: t.StringC;
            tokenSecret: t.StringC;
        }>;
    }>;
    soap: t.TypeC<{
        credentials: t.TypeC<{
            username: t.StringC;
            apiKey: t.StringC;
        }>;
    }>;
}>]>;
export declare const magento1: f.Connector<{
    baseUrl: string;
} & {
    concurrency?: number | undefined;
    insecure?: boolean | undefined;
} & {
    rest?: {
        credentials: {
            key: string;
            secret: string;
        };
        accessToken: {
            token: string;
            tokenSecret: string;
        };
    } | undefined;
    soap?: {
        credentials: {
            username: string;
            apiKey: string;
        };
    } | undefined;
}, {
    rest: Magento1RestClient;
    soap: Magento1SoapClient;
}, {
    categories: {
        documents: {
            idField: string;
            listIds: ({ soap }: Magento1Scope) => () => AsyncGenerator<any, void, undefined>;
            endpoints: {
                get: ({ soap }: Magento1Scope) => ({ docId: [categoryId] }: f.EndpointPayload<any>) => Promise<any>;
            };
        };
        endpoints: {
            list: ({ soap }: Magento1Scope) => () => AsyncGenerator<any, void, undefined>;
        };
    };
    categoryTree: {
        endpoints: {
            get: ({ soap }: Magento1Scope) => () => Promise<any>;
        };
    };
    customers: f.ResourceDefinition<Magento1Scope, {
        create: f.EndpointDefinition<Magento1Scope, object, object>;
        list: f.EndpointDefinition<Magento1Scope, any, object>;
    } & f.EndpointDefinitionMap<Magento1Scope>, f.ResourceDefinitionMap<Magento1Scope>, {
        idField: string;
        listIds: (scope: Magento1Scope) => (path: f.Path) => AsyncIterable<string | number>;
        endpoints: {
            delete: f.EndpointDefinition<Magento1Scope, any, unknown>;
            get: f.EndpointDefinition<Magento1Scope, any, object>;
            update: f.EndpointDefinition<Magento1Scope, object, object>;
        };
        resources: {
            addresses: f.ResourceDefinition<Magento1Scope, {
                get: f.EndpointDefinition<Magento1Scope, any, any>;
            }, f.ResourceDefinitionMap<Magento1Scope>, f.DocumentDefinition<Magento1Scope>>;
        };
    } & {
        resources: {
            addressesSoap: {
                endpoints: {
                    get: ({ soap }: Magento1Scope) => ({ docId: [customerId] }: f.EndpointPayload<any>) => Promise<any>;
                };
            };
            info: {
                endpoints: {
                    get: ({ soap }: Magento1Scope) => ({ docId: [customerId] }: f.EndpointPayload<any>) => Promise<any>;
                };
            };
        };
    }>;
    orders: {
        endpoints: {
            list: f.EndpointDefinition<Magento1Scope, any, object>;
        };
        documents: {
            idField: string;
            listIds: (scope: Magento1Scope) => (path: f.Path) => AsyncIterable<string | number>;
            endpoints: {
                get: f.EndpointDefinition<Magento1Scope, any, object>;
            };
            resources: {
                items: f.ResourceDefinition<Magento1Scope, {
                    get: f.EndpointDefinition<Magento1Scope, any, any>;
                }, f.ResourceDefinitionMap<Magento1Scope>, f.DocumentDefinition<Magento1Scope>>;
                addresses: f.ResourceDefinition<Magento1Scope, {
                    get: f.EndpointDefinition<Magento1Scope, any, any>;
                }, f.ResourceDefinitionMap<Magento1Scope>, f.DocumentDefinition<Magento1Scope>>;
                comments: f.ResourceDefinition<Magento1Scope, {
                    get: f.EndpointDefinition<Magento1Scope, any, any>;
                }, f.ResourceDefinitionMap<Magento1Scope>, f.DocumentDefinition<Magento1Scope>>;
            };
        };
    };
    products: f.ResourceDefinition<Magento1Scope, {
        create: f.EndpointDefinition<Magento1Scope, object, object>;
        list: f.EndpointDefinition<Magento1Scope, any, object>;
    } & f.EndpointDefinitionMap<Magento1Scope>, f.ResourceDefinitionMap<Magento1Scope> & {
        attributes: {
            endpoints: {
                list: ({ soap }: Magento1Scope) => (arg: f.EndpointPayload<any>) => AsyncIterable<any>;
            };
            documents: {
                idField: string;
                listIds: ({ soap }: Magento1Scope) => (arg: f.Path) => AsyncIterable<number>;
                endpoints: {
                    get: ({ soap }: Magento1Scope) => ({ docId: [attribute] }: f.EndpointPayload<any>) => Promise<any>;
                };
            };
        };
        attributeSets: {
            endpoints: {
                list: ({ soap }: Magento1Scope) => () => AsyncGenerator<any, void, undefined>;
            };
            documents: {
                idField: string;
                listIds: ({ soap }: Magento1Scope) => () => AsyncGenerator<any, void, undefined>;
                resources: {
                    attributes: {
                        endpoints: {
                            list: ({ soap }: Magento1Scope) => ({ docId: [setId] }: f.EndpointPayload<any>) => AsyncGenerator<any, void, undefined>;
                        };
                    };
                };
            };
        };
    }, {
        idField: string;
        listIds: (scope: Magento1Scope) => (path: f.Path) => AsyncIterable<string | number>;
        endpoints: {
            delete: f.EndpointDefinition<Magento1Scope, any, unknown>;
            get: f.EndpointDefinition<Magento1Scope, any, object>;
            update: f.EndpointDefinition<Magento1Scope, object, object>;
        };
        resources: {
            categories: f.ResourceDefinition<Magento1Scope, {
                get: f.EndpointDefinition<Magento1Scope, any, any>;
            }, f.ResourceDefinitionMap<Magento1Scope>, f.DocumentDefinition<Magento1Scope>>;
            images: f.ResourceDefinition<Magento1Scope, {
                get: f.EndpointDefinition<Magento1Scope, any, any>;
            }, f.ResourceDefinitionMap<Magento1Scope>, f.DocumentDefinition<Magento1Scope>>;
            websites: f.ResourceDefinition<Magento1Scope, {
                get: f.EndpointDefinition<Magento1Scope, any, any>;
            }, f.ResourceDefinitionMap<Magento1Scope>, f.DocumentDefinition<Magento1Scope>>;
        };
    } & {
        resources: {
            info: {
                endpoints: {
                    get: ({ soap }: Magento1Scope) => ({ docId: [productId] }: f.EndpointPayload<any>) => Promise<any>;
                };
            };
            links: {
                documents: {
                    idField: string;
                    endpoints: {
                        get: ({ soap }: Magento1Scope) => ({ docId: [product, type] }: f.EndpointPayload<any>) => Promise<any>;
                    };
                };
            };
            media: {
                endpoints: {
                    get: ({ soap }: Magento1Scope) => ({ docId: [productId] }: f.EndpointPayload<any>) => Promise<any>;
                };
            };
        };
    }>;
}>;
export {};
