import { Magento1Scope } from "./functions";
import * as t from "io-ts";
import { Magento1SoapClient } from "./soap";
import { Magento1RestClient } from "./rest";
import * as f from "../../framework";
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
                getSoap: ({ soap }: Magento1Scope) => ({ docId: [categoryId] }: f.EndpointPayload<any>) => Promise<any>;
            };
        };
        resources: {
            tree: {
                endpoints: {
                    getSoap: ({ soap }: Magento1Scope) => () => Promise<any>;
                };
            };
        };
        endpoints: {
            listSoap: ({ soap }: Magento1Scope) => () => AsyncGenerator<any, void, undefined>;
        };
    };
    customers: f.ResourceDefinition<Magento1Scope, {
        createRest: f.EndpointDefinition<Magento1Scope, object, object>;
        listRest: f.EndpointDefinition<Magento1Scope, any, object>;
    } & {
        listSoap: f.EndpointDefinition<Magento1Scope, any, any>;
    }, f.ResourceDefinitionMap<Magento1Scope>, {
        idField: string;
        listIds: (scope: Magento1Scope) => (path: f.Path) => AsyncIterable<f.DocId>;
        endpoints: {
            deleteRest: f.EndpointDefinition<Magento1Scope, any, unknown>;
            getRest: f.EndpointDefinition<Magento1Scope, any, object>;
            updateRest: f.EndpointDefinition<Magento1Scope, object, object>;
        };
        resources: {
            addresses: f.ResourceDefinition<Magento1Scope, {
                getRest: f.EndpointDefinition<Magento1Scope, any, any>;
            }, f.ResourceDefinitionMap<Magento1Scope>, f.DocumentDefinition<Magento1Scope>>;
        };
    } & {
        resources: {
            addresses: {
                endpoints: {
                    getSoap: ({ soap }: Magento1Scope) => ({ docId: [customerId] }: f.EndpointPayload<any>) => Promise<any>;
                };
            };
        };
        endpoints: {
            getSoap: ({ soap }: Magento1Scope) => ({ docId: [customerId] }: f.EndpointPayload<any>) => Promise<any>;
        };
    }>;
    orders: f.ResourceDefinition<Magento1Scope, {
        listRest: f.EndpointDefinition<Magento1Scope, any, object>;
    } & {
        listSoap: f.EndpointDefinition<Magento1Scope, any, any>;
    }, f.ResourceDefinitionMap<Magento1Scope>, {
        idField: string;
        listIds: (scope: Magento1Scope) => (path: f.Path) => AsyncIterable<f.DocId>;
        endpoints: {
            getRest: f.EndpointDefinition<Magento1Scope, any, object>;
        };
        resources: {
            addresses: f.ResourceDefinition<Magento1Scope, {
                getRest: f.EndpointDefinition<Magento1Scope, any, any>;
            }, f.ResourceDefinitionMap<Magento1Scope>, f.DocumentDefinition<Magento1Scope>>;
            comments: f.ResourceDefinition<Magento1Scope, {
                getRest: f.EndpointDefinition<Magento1Scope, any, any>;
            }, f.ResourceDefinitionMap<Magento1Scope>, f.DocumentDefinition<Magento1Scope>>;
            items: f.ResourceDefinition<Magento1Scope, {
                getRest: f.EndpointDefinition<Magento1Scope, any, any>;
            }, f.ResourceDefinitionMap<Magento1Scope>, f.DocumentDefinition<Magento1Scope>>;
        };
    } & f.DocumentDefinition<Magento1Scope>>;
    products: f.ResourceDefinition<Magento1Scope, {
        createRest: f.EndpointDefinition<Magento1Scope, object, object>;
        listRest: f.EndpointDefinition<Magento1Scope, any, object>;
    } & f.EndpointDefinitionMap<Magento1Scope>, f.ResourceDefinitionMap<Magento1Scope> & {
        attributes: {
            endpoints: {
                listSoap: ({ soap }: Magento1Scope) => (arg: f.EndpointPayload<any>) => AsyncIterable<any>;
            };
            documents: {
                idField: string;
                listIds: ({ soap }: Magento1Scope) => (arg: f.Path) => AsyncIterable<number>;
                endpoints: {
                    getSoap: ({ soap }: Magento1Scope) => ({ docId: [attribute] }: f.EndpointPayload<any>) => Promise<any>;
                };
            };
        };
        attributeSets: {
            endpoints: {
                listSoap: ({ soap }: Magento1Scope) => () => AsyncGenerator<any, void, undefined>;
            };
            documents: {
                idField: string;
                listIds: ({ soap }: Magento1Scope) => () => AsyncGenerator<any, void, undefined>;
                resources: {
                    attributes: {
                        endpoints: {
                            listSoap: ({ soap }: Magento1Scope) => ({ docId: [setId] }: f.EndpointPayload<any>) => AsyncGenerator<any, void, undefined>;
                        };
                    };
                };
            };
        };
    }, {
        idField: string;
        listIds: (scope: Magento1Scope) => (path: f.Path) => AsyncIterable<f.DocId>;
        endpoints: {
            deleteRest: f.EndpointDefinition<Magento1Scope, any, unknown>;
            getRest: f.EndpointDefinition<Magento1Scope, any, object>;
            updateRest: f.EndpointDefinition<Magento1Scope, object, object>;
        };
        resources: {
            categories: f.ResourceDefinition<Magento1Scope, {
                getRest: f.EndpointDefinition<Magento1Scope, any, any>;
            }, f.ResourceDefinitionMap<Magento1Scope>, f.DocumentDefinition<Magento1Scope>>;
            images: f.ResourceDefinition<Magento1Scope, {
                getRest: f.EndpointDefinition<Magento1Scope, any, any>;
            }, f.ResourceDefinitionMap<Magento1Scope>, f.DocumentDefinition<Magento1Scope>>;
            websites: f.ResourceDefinition<Magento1Scope, {
                getRest: f.EndpointDefinition<Magento1Scope, any, any>;
            }, f.ResourceDefinitionMap<Magento1Scope>, f.DocumentDefinition<Magento1Scope>>;
        };
    } & {
        resources: {
            links: {
                documents: {
                    idField: string;
                    endpoints: {
                        getSoap: ({ soap }: Magento1Scope) => ({ docId: [product, type] }: f.EndpointPayload<any>) => Promise<any>;
                    };
                };
            };
            media: {
                endpoints: {
                    getSoap: ({ soap }: Magento1Scope) => ({ docId: [productId] }: f.EndpointPayload<any>) => Promise<any>;
                };
            };
        };
        endpoints: {
            getSoap: ({ soap }: Magento1Scope) => ({ docId: [productId] }: f.EndpointPayload<any>) => Promise<any>;
        };
    }>;
}>;
export {};
