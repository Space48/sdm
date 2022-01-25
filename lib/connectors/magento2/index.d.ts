import Magento2, { Config } from './client';
import * as f from '../../framework';
export declare type Magento2Config = Config;
export declare const magento2: f.Connector<{
    baseUrl: string;
} & {
    concurrency?: number | undefined;
    credentials?: {
        username: string;
        password: string;
    } | undefined;
    insecure?: boolean | undefined;
    token?: {
        value: string;
        expiration: string;
    } | undefined;
}, Magento2, {
    categories: f.ResourceDefinition<Magento2, {
        create: f.EndpointDefinition<Magento2, object, object>;
        createAsync: f.EndpointDefinition<Magento2, object, object>;
        list: f.EndpointDefinition<Magento2, import("./client").Filter[] | undefined, object>;
    } & f.EndpointDefinitionMap<Magento2>, f.ResourceDefinitionMap<Magento2> & {
        tree: {
            endpoints: {
                get: f.EndpointDefinition<Magento2, any, object>;
            };
        };
    }, {
        idField: string;
        listIds: (client: Magento2) => (path: f.Path) => AsyncIterable<string | number>;
        endpoints: {
            delete: f.EndpointDefinition<Magento2, any, unknown>;
            get: f.EndpointDefinition<Magento2, any, object>;
            update: f.EndpointDefinition<Magento2, object, object>;
        };
    } & f.DocumentDefinition<Magento2>>;
    customers: {
        endpoints: {
            create: f.EndpointDefinition<Magento2, object, object>;
            createAsync: f.EndpointDefinition<Magento2, object, object>;
            list: f.EndpointDefinition<Magento2, import("./client").Filter[] | undefined, object>;
        };
        documents: {
            idField: string;
            listIds: (client: Magento2) => (path: f.Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: f.EndpointDefinition<Magento2, any, unknown>;
                get: f.EndpointDefinition<Magento2, any, object>;
                update: f.EndpointDefinition<Magento2, object, object>;
            };
        };
    };
    orders: {
        endpoints: {
            list: f.EndpointDefinition<Magento2, import("./client").Filter[] | undefined, object>;
        };
        documents: Pick<{
            idField: string;
            listIds: (client: Magento2) => (path: f.Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: f.EndpointDefinition<Magento2, any, unknown>;
                get: f.EndpointDefinition<Magento2, any, object>;
                update: f.EndpointDefinition<Magento2, object, object>;
            };
        }, "endpoints" | "idField" | "listIds">;
    };
    products: f.ResourceDefinition<Magento2, {
        create: f.EndpointDefinition<Magento2, object, object>;
        createAsync: f.EndpointDefinition<Magento2, object, object>;
        list: f.EndpointDefinition<Magento2, import("./client").Filter[] | undefined, object>;
    } & f.EndpointDefinitionMap<Magento2>, f.ResourceDefinitionMap<Magento2> & {
        attributes: f.ResourceDefinition<Magento2, {
            create: f.EndpointDefinition<Magento2, object, object>;
            createAsync: f.EndpointDefinition<Magento2, object, object>;
            list: f.EndpointDefinition<Magento2, import("./client").Filter[] | undefined, object>;
        } & f.EndpointDefinitionMap<Magento2>, f.ResourceDefinitionMap<Magento2>, {
            idField: string;
            listIds: (client: Magento2) => (path: f.Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: f.EndpointDefinition<Magento2, any, unknown>;
                get: f.EndpointDefinition<Magento2, any, object>;
                update: f.EndpointDefinition<Magento2, object, object>;
            };
        } & {
            idField: string;
            resources: {
                options: {
                    endpoints: {
                        get: f.EndpointDefinition<Magento2, any, object>;
                    };
                };
            };
        }>;
        attributeGroups: {
            endpoints: {
                create: f.EndpointDefinition<Magento2, object, object>;
                createAsync: f.EndpointDefinition<Magento2, object, object>;
                list: f.EndpointDefinition<Magento2, import("./client").Filter[] | undefined, object>;
            };
            documents: {
                idField: string;
                listIds: (client: Magento2) => (path: f.Path) => AsyncIterable<string | number>;
                endpoints: {
                    delete: f.EndpointDefinition<Magento2, any, unknown>;
                    get: f.EndpointDefinition<Magento2, any, object>;
                    update: f.EndpointDefinition<Magento2, object, object>;
                };
            };
        };
        attributeSets: f.ResourceDefinition<Magento2, {
            create: f.EndpointDefinition<Magento2, object, object>;
            createAsync: f.EndpointDefinition<Magento2, object, object>;
            list: f.EndpointDefinition<Magento2, import("./client").Filter[] | undefined, object>;
        } & f.EndpointDefinitionMap<Magento2>, f.ResourceDefinitionMap<Magento2>, {
            idField: string;
            listIds: (client: Magento2) => (path: f.Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: f.EndpointDefinition<Magento2, any, unknown>;
                get: f.EndpointDefinition<Magento2, any, object>;
                update: f.EndpointDefinition<Magento2, object, object>;
            };
        } & {
            resources: {
                attributes: {
                    documents: {
                        idField: string;
                        endpoints: {
                            get: f.EndpointDefinition<Magento2, any, object>;
                            delete: f.EndpointDefinition<Magento2, any, unknown>;
                        };
                    };
                };
                groups: {
                    endpoints: {
                        put: f.EndpointDefinition<Magento2, object, object>;
                    };
                };
            };
        }>;
        configurables: {
            documents: {
                idField: string;
                resources: {
                    children: {
                        endpoints: {
                            get: f.EndpointDefinition<Magento2, any, object>;
                        };
                    };
                    options: {
                        endpoints: {
                            get: f.EndpointDefinition<Magento2, any, object>;
                        };
                    };
                };
            };
        };
    }, {
        idField: string;
        listIds: (client: Magento2) => (path: f.Path) => AsyncIterable<string | number>;
        endpoints: {
            delete: f.EndpointDefinition<Magento2, any, unknown>;
            get: f.EndpointDefinition<Magento2, any, object>;
            update: f.EndpointDefinition<Magento2, object, object>;
        };
    } & {
        resources: {
            links: {
                documents: {
                    idField: string;
                    endpoints: {
                        get: f.EndpointDefinition<Magento2, any, object>;
                    };
                };
            };
        };
    }>;
}>;
