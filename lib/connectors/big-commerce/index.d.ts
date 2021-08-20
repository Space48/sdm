import BigCommerce, { Config } from './client';
import { Query } from './functions';
import * as f from '../../framework';
export declare type BigCommerceConfig = Config;
export declare const bigCommerce: f.Connector<{
    storeAlias: string;
    storeHash: string;
    credentials: {
        clientId: string;
        accessToken: string;
    };
}, BigCommerce, {
    blog: {
        resources: {
            posts: {
                endpoints: {
                    create: f.EndpointDefinition<BigCommerce, object, object>;
                    list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                };
                documents: {
                    idField: string;
                    listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
                    endpoints: {
                        delete: f.EndpointDefinition<BigCommerce, any, void>;
                        get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                        update: f.EndpointDefinition<BigCommerce, object, object>;
                    };
                };
            };
            tags: {
                endpoints: {
                    list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                };
            };
        };
    };
    brands: f.ResourceDefinition<BigCommerce, {
        create: f.EndpointDefinition<BigCommerce, object, object>;
        list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
    } & f.EndpointDefinitionMap<BigCommerce>, f.ResourceDefinitionMap<BigCommerce>, {
        idField: string;
        listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
        endpoints: {
            delete: f.EndpointDefinition<BigCommerce, any, void>;
            get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
            update: f.EndpointDefinition<BigCommerce, object, object>;
        };
    } & {
        resources: {
            image: {
                endpoints: {
                    create: f.EndpointDefinition<BigCommerce, object, object>;
                    delete: f.EndpointDefinition<BigCommerce, any, void>;
                };
            };
            metafields: {
                endpoints: {
                    create: f.EndpointDefinition<BigCommerce, object, object>;
                    list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                };
                documents: {
                    idField: string;
                    listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
                    endpoints: {
                        delete: f.EndpointDefinition<BigCommerce, any, void>;
                        get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                        update: f.EndpointDefinition<BigCommerce, object, object>;
                    };
                };
            };
        };
    }>;
    carts: {
        endpoints: {
            create: f.EndpointDefinition<BigCommerce, object, object>;
        };
        documents: {
            endpoints: {
                delete: f.EndpointDefinition<BigCommerce, any, void>;
                get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                update: f.EndpointDefinition<BigCommerce, object, object>;
            };
            resources: {
                items: {
                    endpoints: {
                        create: f.EndpointDefinition<BigCommerce, object, object>;
                    };
                    documents: {
                        endpoints: {
                            delete: f.EndpointDefinition<BigCommerce, any, void>;
                            update: f.EndpointDefinition<BigCommerce, object, object>;
                        };
                    };
                };
            };
        };
    };
    categories: f.ResourceDefinition<BigCommerce, {
        create: f.EndpointDefinition<BigCommerce, object, object>;
        list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
    } & f.EndpointDefinitionMap<BigCommerce>, f.ResourceDefinitionMap<BigCommerce> & {
        tree: {
            endpoints: {
                get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
            };
        };
    }, {
        idField: string;
        listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
        endpoints: {
            delete: f.EndpointDefinition<BigCommerce, any, void>;
            get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
            update: f.EndpointDefinition<BigCommerce, object, object>;
        };
    } & {
        resources: {
            image: {
                endpoints: {
                    create: f.EndpointDefinition<BigCommerce, object, object>;
                    delete: f.EndpointDefinition<BigCommerce, any, void>;
                };
            };
            metafields: {
                endpoints: {
                    create: f.EndpointDefinition<BigCommerce, object, object>;
                    list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                };
                documents: {
                    idField: string;
                    listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
                    endpoints: {
                        delete: f.EndpointDefinition<BigCommerce, any, void>;
                        get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                        update: f.EndpointDefinition<BigCommerce, object, object>;
                    };
                };
            };
        };
    }>;
    channels: {
        endpoints: {
            create: f.EndpointDefinition<BigCommerce, object, object>;
            list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
        };
        documents: {
            listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
            endpoints: {
                get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                update: f.EndpointDefinition<BigCommerce, object, object>;
            };
        };
    };
    customers: f.ResourceDefinition<BigCommerce, {
        create: f.EndpointDefinition<BigCommerce, object, object>;
        delete: f.EndpointDefinition<BigCommerce, object, void>;
        list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
        update: f.EndpointDefinition<BigCommerce, object, object>;
    } & f.EndpointDefinitionMap<BigCommerce>, f.ResourceDefinitionMap<BigCommerce> & {
        addresses: {
            endpoints: {
                create: f.EndpointDefinition<BigCommerce, object, object>;
                delete: f.EndpointDefinition<BigCommerce, object, void>;
                list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                update: f.EndpointDefinition<BigCommerce, object, object>;
            };
            documents: {
                idField: string;
                listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
                endpoints: {
                    delete: f.EndpointDefinition<BigCommerce, any, void>;
                    get: f.EndpointDefinition<BigCommerce, any, any>;
                };
            };
        };
        attributes: f.ResourceDefinition<BigCommerce, {
            create: f.EndpointDefinition<BigCommerce, object, object>;
            delete: f.EndpointDefinition<BigCommerce, object, void>;
            list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
            update: f.EndpointDefinition<BigCommerce, object, object>;
        } & f.EndpointDefinitionMap<BigCommerce>, f.ResourceDefinitionMap<BigCommerce> & {
            values: {
                endpoints: {
                    delete: f.EndpointDefinition<BigCommerce, object, void>;
                    list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                    upsert: f.EndpointDefinition<BigCommerce, object, object>;
                };
                documents: {
                    endpoints: {
                        delete: f.EndpointDefinition<BigCommerce, any, void>;
                    };
                };
            };
        }, {
            idField: string;
            listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: f.EndpointDefinition<BigCommerce, any, void>;
                get: f.EndpointDefinition<BigCommerce, any, any>;
            };
        } & {
            resources: {
                values: {
                    endpoints: {
                        list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                    };
                };
            };
        }>;
    }, {
        idField: string;
        listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
        endpoints: {
            delete: f.EndpointDefinition<BigCommerce, any, void>;
            get: f.EndpointDefinition<BigCommerce, any, any>;
        };
    } & f.DocumentDefinition<BigCommerce>>;
    giftCertificates: {
        endpoints: {
            create: f.EndpointDefinition<BigCommerce, object, object>;
            list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
        };
        documents: {
            idField: string;
            listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: f.EndpointDefinition<BigCommerce, any, void>;
                get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                update: f.EndpointDefinition<BigCommerce, object, object>;
            };
        };
    };
    orders: f.ResourceDefinition<BigCommerce, {
        create: f.EndpointDefinition<BigCommerce, object, object>;
        list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
    } & f.EndpointDefinitionMap<BigCommerce>, f.ResourceDefinitionMap<BigCommerce> & {
        statuses: {
            endpoints: {
                list: f.EndpointDefinition<BigCommerce, any, object>;
            };
            documents: {
                endpoints: {
                    get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                };
            };
        };
    }, {
        idField: string;
        listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
        endpoints: {
            delete: f.EndpointDefinition<BigCommerce, any, void>;
            get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
            update: f.EndpointDefinition<BigCommerce, object, object>;
        };
    } & {
        resources: {
            refunds: {
                endpoints: {
                    get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                };
            };
            shippingAddresses: {
                documents: {
                    endpoints: {
                        get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                        update: f.EndpointDefinition<BigCommerce, object, object>;
                    };
                };
                endpoints: {
                    list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                };
            };
            products: {
                endpoints: {
                    list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                };
                documents: {
                    endpoints: {
                        get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                    };
                };
            };
        };
    }>;
    pages: {
        endpoints: {
            create: f.EndpointDefinition<BigCommerce, object, object>;
            list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
        };
        documents: {
            idField: string;
            listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: f.EndpointDefinition<BigCommerce, any, void>;
                get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                update: f.EndpointDefinition<BigCommerce, object, object>;
            };
        };
    };
    paymentMethods: {
        endpoints: {
            list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
        };
    };
    products: f.ResourceDefinition<BigCommerce, {
        create: f.EndpointDefinition<BigCommerce, object, object>;
        list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
    } & {
        update: f.EndpointDefinition<BigCommerce, object, object>;
    }, f.ResourceDefinitionMap<BigCommerce> & {
        variants: {
            endpoints: {
                list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                update: f.EndpointDefinition<BigCommerce, object, object>;
            };
        };
    }, {
        idField: string;
        listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
        endpoints: {
            delete: f.EndpointDefinition<BigCommerce, any, void>;
            get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
            update: f.EndpointDefinition<BigCommerce, object, object>;
        };
    } & {
        resources: {
            bulkPricingRules: {
                endpoints: {
                    create: f.EndpointDefinition<BigCommerce, object, object>;
                    list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                };
                documents: {
                    idField: string;
                    listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
                    endpoints: {
                        delete: f.EndpointDefinition<BigCommerce, any, void>;
                        get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                        update: f.EndpointDefinition<BigCommerce, object, object>;
                    };
                };
            };
            complexRules: {
                endpoints: {
                    create: f.EndpointDefinition<BigCommerce, object, object>;
                    list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                };
                documents: {
                    idField: string;
                    listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
                    endpoints: {
                        delete: f.EndpointDefinition<BigCommerce, any, void>;
                        get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                        update: f.EndpointDefinition<BigCommerce, object, object>;
                    };
                };
            };
            customFields: {
                endpoints: {
                    create: f.EndpointDefinition<BigCommerce, object, object>;
                    list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                };
                documents: {
                    idField: string;
                    listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
                    endpoints: {
                        delete: f.EndpointDefinition<BigCommerce, any, void>;
                        get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                        update: f.EndpointDefinition<BigCommerce, object, object>;
                    };
                };
            };
            images: {
                endpoints: {
                    create: f.EndpointDefinition<BigCommerce, object, object>;
                    list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                };
                documents: {
                    idField: string;
                    listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
                    endpoints: {
                        delete: f.EndpointDefinition<BigCommerce, any, void>;
                        get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                        update: f.EndpointDefinition<BigCommerce, object, object>;
                    };
                };
            };
            metafields: {
                endpoints: {
                    create: f.EndpointDefinition<BigCommerce, object, object>;
                    list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                };
                documents: {
                    idField: string;
                    listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
                    endpoints: {
                        delete: f.EndpointDefinition<BigCommerce, any, void>;
                        get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                        update: f.EndpointDefinition<BigCommerce, object, object>;
                    };
                };
            };
            modifiers: f.ResourceDefinition<BigCommerce, {
                create: f.EndpointDefinition<BigCommerce, object, object>;
                list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
            } & f.EndpointDefinitionMap<BigCommerce>, f.ResourceDefinitionMap<BigCommerce>, {
                idField: string;
                listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
                endpoints: {
                    delete: f.EndpointDefinition<BigCommerce, any, void>;
                    get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                    update: f.EndpointDefinition<BigCommerce, object, object>;
                };
            } & {
                resources: {
                    values: f.ResourceDefinition<BigCommerce, {
                        create: f.EndpointDefinition<BigCommerce, object, object>;
                        list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                    } & f.EndpointDefinitionMap<BigCommerce>, f.ResourceDefinitionMap<BigCommerce>, {
                        idField: string;
                        listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
                        endpoints: {
                            delete: f.EndpointDefinition<BigCommerce, any, void>;
                            get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                            update: f.EndpointDefinition<BigCommerce, object, object>;
                        };
                    } & {
                        resources: {
                            image: {
                                endpoints: {
                                    create: f.EndpointDefinition<BigCommerce, object, object>;
                                };
                                documents: {
                                    endpoints: {
                                        delete: f.EndpointDefinition<BigCommerce, any, void>;
                                    };
                                };
                            };
                        };
                    }>;
                };
            }>;
            options: f.ResourceDefinition<BigCommerce, {
                create: f.EndpointDefinition<BigCommerce, object, object>;
                list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
            } & f.EndpointDefinitionMap<BigCommerce>, f.ResourceDefinitionMap<BigCommerce>, {
                idField: string;
                listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
                endpoints: {
                    delete: f.EndpointDefinition<BigCommerce, any, void>;
                    get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                    update: f.EndpointDefinition<BigCommerce, object, object>;
                };
            } & {
                resources: {
                    values: {
                        endpoints: {
                            create: f.EndpointDefinition<BigCommerce, object, object>;
                            list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                        };
                        documents: {
                            idField: string;
                            listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
                            endpoints: {
                                delete: f.EndpointDefinition<BigCommerce, any, void>;
                                get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                                update: f.EndpointDefinition<BigCommerce, object, object>;
                            };
                        };
                    };
                };
            }>;
            reviews: {
                endpoints: {
                    create: f.EndpointDefinition<BigCommerce, object, object>;
                    list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                };
                documents: {
                    idField: string;
                    listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
                    endpoints: {
                        delete: f.EndpointDefinition<BigCommerce, any, void>;
                        get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                        update: f.EndpointDefinition<BigCommerce, object, object>;
                    };
                };
            };
            variants: f.ResourceDefinition<BigCommerce, {
                create: f.EndpointDefinition<BigCommerce, object, object>;
                list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
            } & f.EndpointDefinitionMap<BigCommerce>, f.ResourceDefinitionMap<BigCommerce>, {
                idField: string;
                listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
                endpoints: {
                    delete: f.EndpointDefinition<BigCommerce, any, void>;
                    get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                    update: f.EndpointDefinition<BigCommerce, object, object>;
                };
            } & {
                resources: {
                    metafields: {
                        endpoints: {
                            create: f.EndpointDefinition<BigCommerce, object, object>;
                            list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                        };
                        documents: {
                            idField: string;
                            listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
                            endpoints: {
                                delete: f.EndpointDefinition<BigCommerce, any, void>;
                                get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                                update: f.EndpointDefinition<BigCommerce, object, object>;
                            };
                        };
                    };
                };
            }>;
            videos: {
                endpoints: {
                    create: f.EndpointDefinition<BigCommerce, object, object>;
                    list: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                };
                documents: {
                    idField: string;
                    listIds: (client: BigCommerce) => (path: f.Path) => AsyncIterable<string | number>;
                    endpoints: {
                        delete: f.EndpointDefinition<BigCommerce, any, void>;
                        get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
                        update: f.EndpointDefinition<BigCommerce, object, object>;
                    };
                };
            };
        };
    }>;
    store: {
        endpoints: {
            get: f.EndpointDefinition<BigCommerce, Query | undefined, object>;
        };
    };
}>;
