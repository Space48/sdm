export * from "./big-commerce";
export * from "./config-management";
export * from "./magento1";
export * from "./magento2";
export * from "./shopify";
export * from "./bundle-b2b";
export declare const regularConnectors: {
    bigCommerce: import("..").Connector<{
        storeAlias: string;
        storeHash: string;
        credentials: {
            clientId: string;
            accessToken: string;
        };
    }, import("./big-commerce/client").default, {
        blog: {
            resources: {
                posts: {
                    endpoints: {
                        create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    };
                    documents: {
                        idField: string;
                        listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                        endpoints: {
                            delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                            get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                            update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        };
                    };
                };
                tags: {
                    endpoints: {
                        list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    };
                };
            };
        };
        brands: import("..").ResourceDefinition<import("./big-commerce/client").default, {
            create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
            list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
        } & import("..").EndpointDefinitionMap<import("./big-commerce/client").default>, import("..").ResourceDefinitionMap<import("./big-commerce/client").default>, {
            idField: string;
            listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
            };
        } & {
            resources: {
                image: {
                    endpoints: {
                        create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                    };
                };
                metafields: {
                    endpoints: {
                        create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    };
                    documents: {
                        idField: string;
                        listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                        endpoints: {
                            delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                            get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                            update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        };
                    };
                };
            };
        }>;
        carts: {
            endpoints: {
                create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
            };
            documents: {
                endpoints: {
                    delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                    get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                };
                resources: {
                    items: {
                        endpoints: {
                            create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        };
                        documents: {
                            endpoints: {
                                delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                                update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                            };
                        };
                    };
                };
            };
        };
        categories: import("..").ResourceDefinition<import("./big-commerce/client").default, {
            create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
            list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
        } & import("..").EndpointDefinitionMap<import("./big-commerce/client").default>, import("..").ResourceDefinitionMap<import("./big-commerce/client").default> & {
            tree: {
                endpoints: {
                    get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                };
            };
        }, {
            idField: string;
            listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
            };
        } & {
            resources: {
                image: {
                    endpoints: {
                        create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                    };
                };
                metafields: {
                    endpoints: {
                        create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    };
                    documents: {
                        idField: string;
                        listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                        endpoints: {
                            delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                            get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                            update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        };
                    };
                };
            };
        }>;
        channels: {
            endpoints: {
                create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
            };
            documents: {
                listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                endpoints: {
                    get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                };
            };
        };
        customers: import("..").ResourceDefinition<import("./big-commerce/client").default, {
            create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
            delete: import("..").EndpointDefinition<import("./big-commerce/client").default, object, void>;
            list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
            update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
        } & import("..").EndpointDefinitionMap<import("./big-commerce/client").default>, import("..").ResourceDefinitionMap<import("./big-commerce/client").default> & {
            addresses: {
                endpoints: {
                    create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                    delete: import("..").EndpointDefinition<import("./big-commerce/client").default, object, void>;
                    list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                };
                documents: {
                    idField: string;
                    listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                    endpoints: {
                        delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                        get: import("..").EndpointDefinition<import("./big-commerce/client").default, any, any>;
                    };
                };
            };
            attributes: import("..").ResourceDefinition<import("./big-commerce/client").default, {
                create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                delete: import("..").EndpointDefinition<import("./big-commerce/client").default, object, void>;
                list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
            } & import("..").EndpointDefinitionMap<import("./big-commerce/client").default>, import("..").ResourceDefinitionMap<import("./big-commerce/client").default> & {
                values: {
                    endpoints: {
                        delete: import("..").EndpointDefinition<import("./big-commerce/client").default, object, void>;
                        list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                        upsert: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                    };
                    documents: {
                        endpoints: {
                            delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                        };
                    };
                };
            }, {
                idField: string;
                listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                endpoints: {
                    delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                    get: import("..").EndpointDefinition<import("./big-commerce/client").default, any, any>;
                };
            } & {
                resources: {
                    values: {
                        endpoints: {
                            list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                        };
                    };
                };
            }>;
            formFieldValues: {
                endpoints: {
                    list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    upsert: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                };
            };
            customerGroups: {
                endpoints: {
                    list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                };
            };
            subscribers: {
                endpoints: {
                    create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                    list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                };
                documents: {
                    idField: string;
                    listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                    endpoints: {
                        delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                        get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                        update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                    };
                };
            };
        }, {
            idField: string;
            listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                get: import("..").EndpointDefinition<import("./big-commerce/client").default, any, any>;
            };
        } & import("..").DocumentDefinition<import("./big-commerce/client").default>>;
        giftCertificates: {
            endpoints: {
                create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
            };
            documents: {
                idField: string;
                listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                endpoints: {
                    delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                    get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                };
            };
        };
        orders: import("..").ResourceDefinition<import("./big-commerce/client").default, {
            create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
            list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
        } & import("..").EndpointDefinitionMap<import("./big-commerce/client").default>, import("..").ResourceDefinitionMap<import("./big-commerce/client").default> & {
            statuses: {
                endpoints: {
                    list: import("..").EndpointDefinition<import("./big-commerce/client").default, any, object>;
                };
                documents: {
                    endpoints: {
                        get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    };
                };
            };
        }, {
            idField: string;
            listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
            };
        } & {
            resources: {
                refunds: {
                    endpoints: {
                        get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    };
                };
                shippingAddresses: {
                    documents: {
                        endpoints: {
                            get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                            update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        };
                    };
                    endpoints: {
                        list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    };
                };
                products: {
                    endpoints: {
                        list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    };
                    documents: {
                        endpoints: {
                            get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                        };
                    };
                };
                coupons: {
                    endpoints: {
                        list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    };
                };
                shipments: {
                    endpoints: {
                        list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                        create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                    };
                    documents: {
                        endpoints: {
                            get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                            update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                            delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                        };
                    };
                };
            };
        }>;
        pages: {
            endpoints: {
                create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
            };
            documents: {
                idField: string;
                listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                endpoints: {
                    delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                    get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                };
            };
        };
        paymentMethods: {
            endpoints: {
                list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
            };
        };
        priceLists: import("..").ResourceDefinition<import("./big-commerce/client").default, {
            create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
            list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
        } & import("..").EndpointDefinitionMap<import("./big-commerce/client").default>, import("..").ResourceDefinitionMap<import("./big-commerce/client").default> & {
            assignments: {
                endpoints: {
                    create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                    list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                };
            };
        }, {
            idField: string;
            listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
            };
        } & {
            resources: {
                records: {
                    endpoints: {
                        list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                        upsert: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                    };
                };
            };
        }>;
        products: import("..").ResourceDefinition<import("./big-commerce/client").default, {
            create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
            list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
        } & {
            update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
        }, import("..").ResourceDefinitionMap<import("./big-commerce/client").default> & {
            variants: {
                endpoints: {
                    list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                };
            };
        }, {
            idField: string;
            listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
            };
        } & {
            resources: {
                bulkPricingRules: {
                    endpoints: {
                        create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    };
                    documents: {
                        idField: string;
                        listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                        endpoints: {
                            delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                            get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                            update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        };
                    };
                };
                complexRules: {
                    endpoints: {
                        create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    };
                    documents: {
                        idField: string;
                        listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                        endpoints: {
                            delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                            get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                            update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        };
                    };
                };
                customFields: {
                    endpoints: {
                        create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    };
                    documents: {
                        idField: string;
                        listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                        endpoints: {
                            delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                            get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                            update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        };
                    };
                };
                images: {
                    endpoints: {
                        create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    };
                    documents: {
                        idField: string;
                        listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                        endpoints: {
                            delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                            get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                            update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        };
                    };
                };
                metafields: {
                    endpoints: {
                        create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    };
                    documents: {
                        idField: string;
                        listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                        endpoints: {
                            delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                            get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                            update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        };
                    };
                };
                modifiers: import("..").ResourceDefinition<import("./big-commerce/client").default, {
                    create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                    list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                } & import("..").EndpointDefinitionMap<import("./big-commerce/client").default>, import("..").ResourceDefinitionMap<import("./big-commerce/client").default>, {
                    idField: string;
                    listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                    endpoints: {
                        delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                        get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                        update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                    };
                } & {
                    resources: {
                        values: import("..").ResourceDefinition<import("./big-commerce/client").default, {
                            create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                            list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                        } & import("..").EndpointDefinitionMap<import("./big-commerce/client").default>, import("..").ResourceDefinitionMap<import("./big-commerce/client").default>, {
                            idField: string;
                            listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                            endpoints: {
                                delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                                get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                                update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                            };
                        } & {
                            resources: {
                                image: {
                                    endpoints: {
                                        create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                                    };
                                    documents: {
                                        endpoints: {
                                            delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                                        };
                                    };
                                };
                            };
                        }>;
                    };
                }>;
                options: import("..").ResourceDefinition<import("./big-commerce/client").default, {
                    create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                    list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                } & import("..").EndpointDefinitionMap<import("./big-commerce/client").default>, import("..").ResourceDefinitionMap<import("./big-commerce/client").default>, {
                    idField: string;
                    listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                    endpoints: {
                        delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                        get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                        update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                    };
                } & {
                    resources: {
                        values: {
                            endpoints: {
                                create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                                list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                            };
                            documents: {
                                idField: string;
                                listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                                endpoints: {
                                    delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                                    get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                                    update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                                };
                            };
                        };
                    };
                }>;
                reviews: {
                    endpoints: {
                        create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    };
                    documents: {
                        idField: string;
                        listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                        endpoints: {
                            delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                            get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                            update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        };
                    };
                };
                variants: import("..").ResourceDefinition<import("./big-commerce/client").default, {
                    create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                    list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                } & import("..").EndpointDefinitionMap<import("./big-commerce/client").default>, import("..").ResourceDefinitionMap<import("./big-commerce/client").default>, {
                    idField: string;
                    listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                    endpoints: {
                        delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                        get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                        update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                    };
                } & {
                    resources: {
                        metafields: {
                            endpoints: {
                                create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                                list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                            };
                            documents: {
                                idField: string;
                                listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                                endpoints: {
                                    delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                                    get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                                    update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                                };
                            };
                        };
                    };
                }>;
                videos: {
                    endpoints: {
                        create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    };
                    documents: {
                        idField: string;
                        listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                        endpoints: {
                            delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                            get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                            update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                        };
                    };
                };
            };
        }>;
        promotions: {
            endpoints: {
                create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
            };
            documents: {
                idField: string;
                listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                endpoints: {
                    delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                    get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                    update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                };
            };
        };
        store: {
            endpoints: {
                get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
            };
        };
        wishlists: import("..").ResourceDefinition<import("./big-commerce/client").default, {
            create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
            list: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
        } & import("..").EndpointDefinitionMap<import("./big-commerce/client").default>, import("..").ResourceDefinitionMap<import("./big-commerce/client").default>, {
            idField: string;
            listIds: (client: import("./big-commerce/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                get: import("..").EndpointDefinition<import("./big-commerce/client").default, import("./big-commerce/functions").Query | undefined, object>;
                update: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
            };
        } & {
            resources: {
                items: {
                    endpoints: {
                        create: import("..").EndpointDefinition<import("./big-commerce/client").default, object, object>;
                    };
                    documents: {
                        endpoints: {
                            delete: import("..").EndpointDefinition<import("./big-commerce/client").default, any, void>;
                        };
                    };
                };
            };
        }>;
    }>;
    magento1: import("..").Connector<{
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
        rest: import("./magento1/rest").Magento1RestClient;
        soap: import("./magento1/soap").Magento1SoapClient;
    }, {
        categories: {
            documents: {
                idField: string;
                listIds: ({ soap }: import("./magento1/functions").Magento1Scope) => () => AsyncGenerator<any, void, undefined>;
                endpoints: {
                    getSoap: ({ soap }: import("./magento1/functions").Magento1Scope) => ({ docId: [categoryId] }: import("..").EndpointPayload<any>) => Promise<any>;
                };
            };
            resources: {
                tree: {
                    endpoints: {
                        getSoap: ({ soap }: import("./magento1/functions").Magento1Scope) => () => Promise<any>;
                    };
                };
            };
            endpoints: {
                listSoap: ({ soap }: import("./magento1/functions").Magento1Scope) => () => AsyncGenerator<any, void, undefined>;
            };
        };
        customers: import("..").ResourceDefinition<import("./magento1/functions").Magento1Scope, {
            createRest: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, object, object>;
            listRest: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, any, object>;
        } & {
            listSoap: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, any, any>;
        }, import("..").ResourceDefinitionMap<import("./magento1/functions").Magento1Scope>, {
            idField: string;
            listIds: (scope: import("./magento1/functions").Magento1Scope) => (path: import("..").Path) => AsyncIterable<string | number>;
            endpoints: {
                deleteRest: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, any, unknown>;
                getRest: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, any, object>;
                updateRest: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, object, object>;
            };
            resources: {
                addresses: import("..").ResourceDefinition<import("./magento1/functions").Magento1Scope, {
                    getRest: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, any, any>;
                }, import("..").ResourceDefinitionMap<import("./magento1/functions").Magento1Scope>, import("..").DocumentDefinition<import("./magento1/functions").Magento1Scope>>;
            };
        } & {
            resources: {
                addresses: {
                    endpoints: {
                        getSoap: ({ soap }: import("./magento1/functions").Magento1Scope) => ({ docId: [customerId] }: import("..").EndpointPayload<any>) => Promise<any>;
                    };
                };
            };
            endpoints: {
                getSoap: ({ soap }: import("./magento1/functions").Magento1Scope) => ({ docId: [customerId] }: import("..").EndpointPayload<any>) => Promise<any>;
            };
        }>;
        orders: import("..").ResourceDefinition<import("./magento1/functions").Magento1Scope, {
            listRest: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, any, object>;
        } & {
            listSoap: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, any, any>;
        }, import("..").ResourceDefinitionMap<import("./magento1/functions").Magento1Scope>, {
            idField: string;
            listIds: (scope: import("./magento1/functions").Magento1Scope) => (path: import("..").Path) => AsyncIterable<string | number>;
            endpoints: {
                getRest: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, any, object>;
            };
            resources: {
                items: import("..").ResourceDefinition<import("./magento1/functions").Magento1Scope, {
                    getRest: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, any, any>;
                }, import("..").ResourceDefinitionMap<import("./magento1/functions").Magento1Scope>, import("..").DocumentDefinition<import("./magento1/functions").Magento1Scope>>;
                addresses: import("..").ResourceDefinition<import("./magento1/functions").Magento1Scope, {
                    getRest: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, any, any>;
                }, import("..").ResourceDefinitionMap<import("./magento1/functions").Magento1Scope>, import("..").DocumentDefinition<import("./magento1/functions").Magento1Scope>>;
                comments: import("..").ResourceDefinition<import("./magento1/functions").Magento1Scope, {
                    getRest: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, any, any>;
                }, import("..").ResourceDefinitionMap<import("./magento1/functions").Magento1Scope>, import("..").DocumentDefinition<import("./magento1/functions").Magento1Scope>>;
            };
        } & import("..").DocumentDefinition<import("./magento1/functions").Magento1Scope>>;
        products: import("..").ResourceDefinition<import("./magento1/functions").Magento1Scope, {
            createRest: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, object, object>;
            listRest: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, any, object>;
        } & import("..").EndpointDefinitionMap<import("./magento1/functions").Magento1Scope>, import("..").ResourceDefinitionMap<import("./magento1/functions").Magento1Scope> & {
            attributes: {
                endpoints: {
                    listSoap: ({ soap }: import("./magento1/functions").Magento1Scope) => (arg: import("..").EndpointPayload<any>) => AsyncIterable<any>;
                };
                documents: {
                    idField: string;
                    listIds: ({ soap }: import("./magento1/functions").Magento1Scope) => (arg: import("..").Path) => AsyncIterable<number>;
                    endpoints: {
                        getSoap: ({ soap }: import("./magento1/functions").Magento1Scope) => ({ docId: [attribute] }: import("..").EndpointPayload<any>) => Promise<any>;
                    };
                };
            };
            attributeSets: {
                endpoints: {
                    listSoap: ({ soap }: import("./magento1/functions").Magento1Scope) => () => AsyncGenerator<any, void, undefined>;
                };
                documents: {
                    idField: string;
                    listIds: ({ soap }: import("./magento1/functions").Magento1Scope) => () => AsyncGenerator<any, void, undefined>;
                    resources: {
                        attributes: {
                            endpoints: {
                                listSoap: ({ soap }: import("./magento1/functions").Magento1Scope) => ({ docId: [setId] }: import("..").EndpointPayload<any>) => AsyncGenerator<any, void, undefined>;
                            };
                        };
                    };
                };
            };
        }, {
            idField: string;
            listIds: (scope: import("./magento1/functions").Magento1Scope) => (path: import("..").Path) => AsyncIterable<string | number>;
            endpoints: {
                deleteRest: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, any, unknown>;
                getRest: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, any, object>;
                updateRest: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, object, object>;
            };
            resources: {
                categories: import("..").ResourceDefinition<import("./magento1/functions").Magento1Scope, {
                    getRest: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, any, any>;
                }, import("..").ResourceDefinitionMap<import("./magento1/functions").Magento1Scope>, import("..").DocumentDefinition<import("./magento1/functions").Magento1Scope>>;
                images: import("..").ResourceDefinition<import("./magento1/functions").Magento1Scope, {
                    getRest: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, any, any>;
                }, import("..").ResourceDefinitionMap<import("./magento1/functions").Magento1Scope>, import("..").DocumentDefinition<import("./magento1/functions").Magento1Scope>>;
                websites: import("..").ResourceDefinition<import("./magento1/functions").Magento1Scope, {
                    getRest: import("..").EndpointDefinition<import("./magento1/functions").Magento1Scope, any, any>;
                }, import("..").ResourceDefinitionMap<import("./magento1/functions").Magento1Scope>, import("..").DocumentDefinition<import("./magento1/functions").Magento1Scope>>;
            };
        } & {
            resources: {
                links: {
                    documents: {
                        idField: string;
                        endpoints: {
                            getSoap: ({ soap }: import("./magento1/functions").Magento1Scope) => ({ docId: [product, type] }: import("..").EndpointPayload<any>) => Promise<any>;
                        };
                    };
                };
                media: {
                    endpoints: {
                        getSoap: ({ soap }: import("./magento1/functions").Magento1Scope) => ({ docId: [productId] }: import("..").EndpointPayload<any>) => Promise<any>;
                    };
                };
            };
            endpoints: {
                getSoap: ({ soap }: import("./magento1/functions").Magento1Scope) => ({ docId: [productId] }: import("..").EndpointPayload<any>) => Promise<any>;
            };
        }>;
    }>;
    magento2: import("..").Connector<{
        baseUrl: string;
    } & {
        storeView?: string | undefined;
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
    }, import("./magento2/client").default, {
        categories: import("..").ResourceDefinition<import("./magento2/client").default, {
            create: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
            createAsync: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
            list: import("..").EndpointDefinition<import("./magento2/client").default, import("./magento2/client").Filter[] | undefined, object>;
        } & import("..").EndpointDefinitionMap<import("./magento2/client").default>, import("..").ResourceDefinitionMap<import("./magento2/client").default> & {
            tree: {
                endpoints: {
                    get: import("..").EndpointDefinition<import("./magento2/client").default, any, object>;
                };
            };
        }, {
            idField: string;
            listIds: (client: import("./magento2/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: import("..").EndpointDefinition<import("./magento2/client").default, any, unknown>;
                get: import("..").EndpointDefinition<import("./magento2/client").default, any, object>;
                update: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
            };
        } & import("..").DocumentDefinition<import("./magento2/client").default>>;
        customers: {
            endpoints: {
                create: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
                createAsync: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
                list: import("..").EndpointDefinition<import("./magento2/client").default, import("./magento2/client").Filter[] | undefined, object>;
            };
            documents: {
                idField: string;
                listIds: (client: import("./magento2/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                endpoints: {
                    delete: import("..").EndpointDefinition<import("./magento2/client").default, any, unknown>;
                    get: import("..").EndpointDefinition<import("./magento2/client").default, any, object>;
                    update: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
                };
            };
        };
        orders: {
            endpoints: {
                list: import("..").EndpointDefinition<import("./magento2/client").default, import("./magento2/client").Filter[] | undefined, object>;
            };
            documents: Pick<{
                idField: string;
                listIds: (client: import("./magento2/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                endpoints: {
                    delete: import("..").EndpointDefinition<import("./magento2/client").default, any, unknown>;
                    get: import("..").EndpointDefinition<import("./magento2/client").default, any, object>;
                    update: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
                };
            }, "endpoints" | "idField" | "listIds">;
        };
        products: import("..").ResourceDefinition<import("./magento2/client").default, {
            create: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
            createAsync: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
            list: import("..").EndpointDefinition<import("./magento2/client").default, import("./magento2/client").Filter[] | undefined, object>;
        } & import("..").EndpointDefinitionMap<import("./magento2/client").default>, import("..").ResourceDefinitionMap<import("./magento2/client").default> & {
            attributes: import("..").ResourceDefinition<import("./magento2/client").default, {
                create: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
                createAsync: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
                list: import("..").EndpointDefinition<import("./magento2/client").default, import("./magento2/client").Filter[] | undefined, object>;
            } & import("..").EndpointDefinitionMap<import("./magento2/client").default>, import("..").ResourceDefinitionMap<import("./magento2/client").default>, {
                idField: string;
                listIds: (client: import("./magento2/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                endpoints: {
                    delete: import("..").EndpointDefinition<import("./magento2/client").default, any, unknown>;
                    get: import("..").EndpointDefinition<import("./magento2/client").default, any, object>;
                    update: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
                };
            } & {
                idField: string;
                resources: {
                    options: {
                        endpoints: {
                            get: import("..").EndpointDefinition<import("./magento2/client").default, any, object>;
                        };
                    };
                };
            }>;
            attributeGroups: {
                endpoints: {
                    create: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
                    createAsync: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
                    list: import("..").EndpointDefinition<import("./magento2/client").default, import("./magento2/client").Filter[] | undefined, object>;
                };
                documents: {
                    idField: string;
                    listIds: (client: import("./magento2/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                    endpoints: {
                        delete: import("..").EndpointDefinition<import("./magento2/client").default, any, unknown>;
                        get: import("..").EndpointDefinition<import("./magento2/client").default, any, object>;
                        update: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
                    };
                };
            };
            attributeSets: import("..").ResourceDefinition<import("./magento2/client").default, {
                create: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
                createAsync: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
                list: import("..").EndpointDefinition<import("./magento2/client").default, import("./magento2/client").Filter[] | undefined, object>;
            } & import("..").EndpointDefinitionMap<import("./magento2/client").default>, import("..").ResourceDefinitionMap<import("./magento2/client").default>, {
                idField: string;
                listIds: (client: import("./magento2/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                endpoints: {
                    delete: import("..").EndpointDefinition<import("./magento2/client").default, any, unknown>;
                    get: import("..").EndpointDefinition<import("./magento2/client").default, any, object>;
                    update: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
                };
            } & {
                resources: {
                    attributes: {
                        documents: {
                            idField: string;
                            endpoints: {
                                get: import("..").EndpointDefinition<import("./magento2/client").default, any, object>;
                                delete: import("..").EndpointDefinition<import("./magento2/client").default, any, unknown>;
                            };
                        };
                    };
                    groups: {
                        endpoints: {
                            put: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
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
                                get: import("..").EndpointDefinition<import("./magento2/client").default, any, object>;
                            };
                        };
                        options: {
                            endpoints: {
                                get: import("..").EndpointDefinition<import("./magento2/client").default, any, object>;
                            };
                        };
                    };
                };
            };
        }, {
            idField: string;
            listIds: (client: import("./magento2/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: import("..").EndpointDefinition<import("./magento2/client").default, any, unknown>;
                get: import("..").EndpointDefinition<import("./magento2/client").default, any, object>;
                update: import("..").EndpointDefinition<import("./magento2/client").default, object, object>;
            };
        } & {
            resources: {
                links: {
                    documents: {
                        idField: string;
                        endpoints: {
                            get: import("..").EndpointDefinition<import("./magento2/client").default, any, object>;
                        };
                    };
                };
            };
        }>;
    }>;
    shopify: import("..").Connector<{
        shopName: string;
        credentials: {
            apiKey: string;
            password: string;
        };
    }, import("./shopify/client").Scope, {
        location: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").ILocation>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, number>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").ILocation>;
                inventoryLevels: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IInventoryLevel>;
            };
        }>;
        comment: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IComment>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").ICreateComment, import("shopify-api-node").IComment>;
            spam: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IComment>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
            notSpam: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IComment>;
            approve: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IComment>;
            remove: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IComment>;
            restore: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IComment>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IComment>;
                spam: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IComment>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").IUpdateComment, import("shopify-api-node").IComment>;
                notSpam: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IComment>;
                approve: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IComment>;
                remove: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IComment>;
                restore: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IComment>;
            };
        }>;
        product: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IProduct>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IProduct>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
        }, Record<string, never>, {
            resources: {
                productImage: import("..").ResourceDefinition<import("./shopify/client").Scope, {
                    get: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IProductImage>;
                    list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IProductImage>;
                    create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IProductImage>;
                    delete: import("..").EndpointDefinition<import("./shopify/client").Scope, number, void>;
                    count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
                    update: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IProductImage>;
                }, Record<string, never>, {
                    endpoints: {
                        get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IProductImage>;
                        list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IProductImage>;
                        create: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IProductImage>;
                        delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                        count: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, number>;
                        update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IProductImage>;
                    };
                }>;
                productVariant: import("..").ResourceDefinition<import("./shopify/client").Scope, {
                    get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IProductVariant>;
                    list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IProductVariant>;
                    create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IProductVariant>;
                    delete: import("..").EndpointDefinition<import("./shopify/client").Scope, number, void>;
                    count: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, number>;
                    update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IProductVariant>;
                }, Record<string, never>, {
                    endpoints: {
                        get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IProductVariant>;
                        list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IProductVariant>;
                        create: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IProductVariant>;
                        delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                        count: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, number>;
                        update: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IProductVariant>;
                    };
                }>;
                productResourceFeedback: import("..").ResourceDefinition<import("./shopify/client").Scope, {
                    list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IResourceFeedback>;
                    create: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IResourceFeedback>;
                }, Record<string, never>, {
                    endpoints: {
                        list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IResourceFeedback>;
                        create: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IResourceFeedback>;
                    };
                }>;
            };
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IProduct>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IProduct>;
            };
        }>;
        customer: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            search: import("..").EndpointDefinition<import("./shopify/client").Scope, any, any> | import("..").EndpointDefinition<import("./shopify/client").Scope, any, unknown>;
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICustomer>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICustomer>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
            accountActivationUrl: import("..").EndpointDefinition<import("./shopify/client").Scope, number, unknown> | import("..").EndpointDefinition<import("./shopify/client").Scope, number, any>;
        }, Record<string, never>, {
            resources: {
                customerAddress: import("..").ResourceDefinition<import("./shopify/client").Scope, {
                    set: import("..").EndpointDefinition<import("./shopify/client").Scope, any, any> | import("..").EndpointDefinition<import("./shopify/client").Scope, any, unknown>;
                    list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICustomerAddress>;
                    create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICustomerAddress>;
                }, Record<string, never>, {
                    endpoints: {
                        get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").ICustomerAddress>;
                        default: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").ICustomerAddress>;
                        delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                        update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICustomerAddress>;
                    };
                }>;
            };
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICustomer>;
                search: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, unknown> | import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, any>;
                orders: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IOrder>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICustomer>;
                accountActivationUrl: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, unknown> | import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, any>;
            };
        }>;
        dispute: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IDispute>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IDispute>;
            };
        }>;
        payout: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IPayout>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IPayout>;
            };
        }>;
        collection: import("..").ResourceDefinition<import("./shopify/client").Scope, {}, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICollection>;
                products: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IProduct>;
            };
        }>;
        page: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IPage>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IPage>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IPage>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IPage>;
            };
        }>;
        shop: import("..").ResourceDefinition<import("./shopify/client").Scope, {}, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IShop>;
            };
        }>;
        checkout: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICheckout>;
            complete: import("..").EndpointDefinition<import("./shopify/client").Scope, string, unknown> | import("..").EndpointDefinition<import("./shopify/client").Scope, string, any>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICheckout>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
            shippingRates: import("..").EndpointDefinition<import("./shopify/client").Scope, string, unknown> | import("..").EndpointDefinition<import("./shopify/client").Scope, string, any>;
        }, Record<string, never>, {
            resources: {
                payment: import("..").ResourceDefinition<import("./shopify/client").Scope, {
                    get: import("..").EndpointDefinition<import("./shopify/client").Scope, number, unknown> | import("..").EndpointDefinition<import("./shopify/client").Scope, number, any>;
                    list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, unknown> | import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, any>;
                    create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, any> | import("..").EndpointDefinition<import("./shopify/client").Scope, any, unknown>;
                    count: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, number>;
                }, Record<string, never>, {
                    endpoints: {
                        get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, unknown> | import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, any>;
                        list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, unknown> | import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, any>;
                        create: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, unknown> | import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, any>;
                        count: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, number>;
                    };
                }>;
            };
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").ICheckout>;
                complete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, unknown> | import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, any>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICheckout>;
                shippingRates: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, unknown> | import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, any>;
            };
        }>;
        order: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IOrder>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IOrder>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
        }, Record<string, never>, {
            resources: {
                refund: import("..").ResourceDefinition<import("./shopify/client").Scope, {
                    list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IRefund>;
                    create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IRefund>;
                    calculate: import("..").EndpointDefinition<import("./shopify/client").Scope, any, any> | import("..").EndpointDefinition<import("./shopify/client").Scope, any, unknown>;
                }, Record<string, never>, {
                    endpoints: {
                        get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IRefund>;
                    };
                }>;
                fulfillment: import("..").ResourceDefinition<import("./shopify/client").Scope, {
                    list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IFulfillment>;
                    create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IFulfillment>;
                    count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
                    updateTracking: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IFulfillment>;
                }, Record<string, never>, {
                    resources: {
                        fulfillmentEvent: import("..").ResourceDefinition<import("./shopify/client").Scope, {
                            get: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IFulfillmentEvent>;
                            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IFulfillmentEvent>;
                            create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IFulfillmentEvent>;
                            delete: import("..").EndpointDefinition<import("./shopify/client").Scope, number, void>;
                            update: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IFulfillmentEvent>;
                        }, Record<string, never>, {
                            endpoints: {
                                get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IFulfillmentEvent>;
                                list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IFulfillmentEvent>;
                                create: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IFulfillmentEvent>;
                                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                                update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IFulfillmentEvent>;
                            };
                        }>;
                    };
                    endpoints: {
                        get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IFulfillment>;
                        open: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IFulfillment>;
                        complete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IFulfillment>;
                        cancel: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IFulfillment>;
                        update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IFulfillment>;
                        createV2: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IFulfillment>;
                        updateTracking: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IFulfillment>;
                    };
                }>;
                orderRisk: import("..").ResourceDefinition<import("./shopify/client").Scope, {
                    list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IOrderRisk>;
                    create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IOrderRisk>;
                }, Record<string, never>, {
                    endpoints: {
                        get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IOrderRisk>;
                        delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                        update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IOrderRisk>;
                    };
                }>;
                transaction: import("..").ResourceDefinition<import("./shopify/client").Scope, {
                    list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ITransaction>;
                    create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ITransaction>;
                    count: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, number>;
                }, Record<string, never>, {
                    endpoints: {
                        get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ITransaction>;
                    };
                }>;
            };
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IOrder>;
                close: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IOrder>;
                open: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IOrder>;
                cancel: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IOrder>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, unknown> | import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, any>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IOrder>;
                fulfillmentOrders: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
            };
        }>;
        accessScope: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IAccessScope>;
        }, Record<string, never>, {}>;
        apiPermission: import("..").ResourceDefinition<import("./shopify/client").Scope, {}, Record<string, never>, {
            endpoints: {
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
            };
        }>;
        applicationCharge: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IApplicationCharge>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").ICreateApplicationCharge, import("shopify-api-node").IApplicationCharge>;
            activate: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IApplicationCharge>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IApplicationCharge>;
                activate: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IApplicationCharge>;
            };
        }>;
        applicationCredit: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IApplicationCredit>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").ICreateApplicationCredit, import("shopify-api-node").IApplicationCredit>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IApplicationCredit>;
            };
        }>;
        balance: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IBalance>;
            transactions: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IBalanceTransaction>;
        }, Record<string, never>, {
            endpoints: {
                transactions: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IBalanceTransaction>;
            };
        }>;
        blog: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IBlog>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").ICreateBlog, import("shopify-api-node").IBlog>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, number>;
        }, Record<string, never>, {
            resources: {
                article: import("..").ResourceDefinition<import("./shopify/client").Scope, {
                    list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IArticle>;
                    create: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").ICreateArticle, import("shopify-api-node").IArticle>;
                    count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
                    authors: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, string>;
                }, Record<string, never>, {
                    endpoints: {
                        get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IArticle>;
                        delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                        update: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").IUpdateArticle, import("shopify-api-node").IArticle>;
                        authors: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, string>;
                        tags: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, string>;
                    };
                }>;
            };
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IBlog>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IBlog>;
            };
        }>;
        carrierService: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").ICarrierService>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").ICreateCarrierService, import("shopify-api-node").ICarrierService>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").ICarrierService>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").IUpdateCarrierService, import("shopify-api-node").ICarrierService>;
            };
        }>;
        collect: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICollect>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").ICreateCollect, import("shopify-api-node").ICollect>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICollect>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
            };
        }>;
        collectionListing: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICollectionListing>;
            productIds: import("..").EndpointDefinition<import("./shopify/client").Scope, number, unknown> | import("..").EndpointDefinition<import("./shopify/client").Scope, number, any>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICollectionListing>;
                productIds: import("..").EndpointDefinition<import("./shopify/client").Scope, any, any> | import("..").EndpointDefinition<import("./shopify/client").Scope, any, unknown>;
            };
        }>;
        country: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICountry>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").ICreateCountry, import("shopify-api-node").ICountry>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, number>;
        }, Record<string, never>, {
            resources: {
                province: import("..").ResourceDefinition<import("./shopify/client").Scope, {
                    get: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IProvince>;
                    list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IProvince>;
                    count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
                    update: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IProvince>;
                }, Record<string, never>, {
                    endpoints: {
                        get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IProvince>;
                        list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IProvince>;
                        count: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, number>;
                        update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IProvince>;
                    };
                }>;
            };
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICountry>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").IUpdateCountry, import("shopify-api-node").ICountry>;
            };
        }>;
        currency: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").ICurrency>;
        }, Record<string, never>, {}>;
        customCollection: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICustomCollection>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICustomCollection>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICustomCollection>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICustomCollection>;
            };
        }>;
        customerSavedSearch: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICustomerSavedSearch>;
            customers: import("..").EndpointDefinition<import("./shopify/client").Scope, number, unknown> | import("..").EndpointDefinition<import("./shopify/client").Scope, number, any>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICustomerSavedSearch>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICustomerSavedSearch>;
                customers: import("..").EndpointDefinition<import("./shopify/client").Scope, any, any> | import("..").EndpointDefinition<import("./shopify/client").Scope, any, unknown>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ICustomerSavedSearch>;
            };
        }>;
        draftOrder: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IDraftOrder>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IDraftOrder>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, number>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IDraftOrder>;
                complete: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IDraftOrder>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IDraftOrder>;
                sendInvoice: import("..").EndpointDefinition<import("./shopify/client").Scope, any, any> | import("..").EndpointDefinition<import("./shopify/client").Scope, any, unknown>;
            };
        }>;
        fulfillmentEvent: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IFulfillmentEvent>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IFulfillmentEvent>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IFulfillmentEvent>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, number, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IFulfillmentEvent>;
            };
        }>;
        fulfillmentOrder: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            close: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IFulfillmentOrder>;
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IFulfillmentOrder>;
            move: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IFulfillmentOrder>;
            cancel: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IFulfillmentOrder>;
            locationsForMove: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").ILocationForMove>;
        }, Record<string, never>, {
            resources: {
                cancellationRequest: import("..").ResourceDefinition<import("./shopify/client").Scope, {
                    reject: import("..").EndpointDefinition<import("./shopify/client").Scope, string | undefined, import("shopify-api-node").IFulfillmentOrder>;
                    create: import("..").EndpointDefinition<import("./shopify/client").Scope, string | undefined, import("shopify-api-node").IFulfillmentOrder>;
                    accept: import("..").EndpointDefinition<import("./shopify/client").Scope, string | undefined, import("shopify-api-node").IFulfillmentOrder>;
                }, Record<string, never>, {
                    endpoints: {
                        reject: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
                        create: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
                        accept: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
                    };
                }>;
                fulfillmentRequest: import("..").ResourceDefinition<import("./shopify/client").Scope, {
                    reject: import("..").EndpointDefinition<import("./shopify/client").Scope, string | undefined, import("shopify-api-node").IFulfillmentOrder>;
                    create: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").ICreateFulfillmentRequest, import("shopify-api-node").IFulfillmentOrder>;
                    accept: import("..").EndpointDefinition<import("./shopify/client").Scope, string | undefined, import("shopify-api-node").IFulfillmentOrder>;
                }, Record<string, never>, {
                    endpoints: {
                        reject: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
                        create: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
                        accept: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
                    };
                }>;
            };
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
                close: import("..").EndpointDefinition<import("./shopify/client").Scope, string | undefined, import("shopify-api-node").IFulfillmentOrder>;
                move: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IFulfillmentOrder>;
                cancel: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").IFulfillmentOrder, import("shopify-api-node").IFulfillmentOrder>;
                locationsForMove: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").ILocationForMove>;
            };
        }>;
        fulfillmentService: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IFulfillmentService>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IFulfillmentService>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IFulfillmentService>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IFulfillmentService>;
            };
        }>;
        giftCard: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            search: import("..").EndpointDefinition<import("./shopify/client").Scope, any, any> | import("..").EndpointDefinition<import("./shopify/client").Scope, any, unknown>;
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IGiftCard>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IGiftCard>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
        }, Record<string, never>, {
            resources: {
                giftCardAdjustment: import("..").ResourceDefinition<import("./shopify/client").Scope, {
                    get: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IGiftCardAdjustment>;
                    list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IGiftCardAdjustment>;
                    create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IGiftCardAdjustment>;
                }, Record<string, never>, {
                    endpoints: {
                        get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IGiftCardAdjustment>;
                        list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IGiftCardAdjustment>;
                        create: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IGiftCardAdjustment>;
                    };
                }>;
            };
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IGiftCard>;
                search: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, unknown> | import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, any>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IGiftCard>;
                disable: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, unknown> | import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, any>;
            };
        }>;
        inventoryItem: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IInventoryItem>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IInventoryItem>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IInventoryItem>;
            };
        }>;
        inventoryLevel: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            set: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IInventoryLevel>;
            connect: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IInventoryLevel>;
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IInventoryLevel>;
            adjust: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IInventoryLevel>;
        }, Record<string, never>, {
            endpoints: {
                connect: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IInventoryLevel>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                adjust: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IInventoryLevel>;
            };
        }>;
        marketingEvent: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IMarketingEvent>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IMarketingEvent>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
            engagements: import("..").EndpointDefinition<import("./shopify/client").Scope, number, unknown> | import("..").EndpointDefinition<import("./shopify/client").Scope, number, any>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IMarketingEvent>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IMarketingEvent>;
                engagements: import("..").EndpointDefinition<import("./shopify/client").Scope, any, any> | import("..").EndpointDefinition<import("./shopify/client").Scope, any, unknown>;
            };
        }>;
        metafield: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IMetafield>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IMetafield>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IMetafield>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IMetafield>;
            };
        }>;
        policy: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IPolicy>;
        }, Record<string, never>, {}>;
        priceRule: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IPriceRule>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IPriceRule>;
        }, Record<string, never>, {
            resources: {
                discountCodeCreationJob: import("..").ResourceDefinition<import("./shopify/client").Scope, {
                    create: import("..").EndpointDefinition<import("./shopify/client").Scope, any[], import("shopify-api-node").IDiscountCodeCreation>;
                    discountCodes: import("..").EndpointDefinition<import("./shopify/client").Scope, number, any>;
                }, Record<string, never>, {
                    endpoints: {
                        get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IDiscountCodeCreation>;
                        discountCodes: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, any>;
                    };
                }>;
                discountCode: import("..").ResourceDefinition<import("./shopify/client").Scope, {
                    lookup: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IDiscountCode>;
                    list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IDiscountCode>;
                    create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IDiscountCode>;
                }, Record<string, never>, {
                    endpoints: {
                        get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IDiscountCode>;
                        delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                        update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IDiscountCode>;
                    };
                }>;
            };
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IPriceRule>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IPriceRule>;
            };
        }>;
        productListing: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IProductListing>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IProductListing>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, number>;
            productIds: import("..").EndpointDefinition<import("./shopify/client").Scope, any, any> | import("..").EndpointDefinition<import("./shopify/client").Scope, any, unknown>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IProductListing>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                productIds: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, unknown> | import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, any>;
            };
        }>;
        resourceFeedback: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IResourceFeedback>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IResourceFeedback>;
        }, Record<string, never>, {}>;
        recurringApplicationCharge: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IRecurringApplicationCharge>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").ICreateRecurringApplicationCharge, import("shopify-api-node").IRecurringApplicationCharge>;
            activate: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IRecurringApplicationCharge>;
            customize: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IRecurringApplicationCharge>;
        }, Record<string, never>, {
            resources: {
                usageCharge: import("..").ResourceDefinition<import("./shopify/client").Scope, {
                    get: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IUsageCharge>;
                    list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IUsageCharge>;
                    create: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").ICreateUsageCharge, import("shopify-api-node").IUsageCharge>;
                }, Record<string, never>, {
                    endpoints: {
                        get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IUsageCharge>;
                        list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IUsageCharge>;
                        create: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IUsageCharge>;
                    };
                }>;
            };
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IRecurringApplicationCharge>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                activate: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IRecurringApplicationCharge>;
                customize: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IRecurringApplicationCharge>;
            };
        }>;
        redirect: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IRedirect>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").ICreateRedirect, import("shopify-api-node").IRedirect>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IRedirect>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").IUpdateRedirect, import("shopify-api-node").IRedirect>;
            };
        }>;
        report: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IReport>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IReport>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IReport>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IReport>;
            };
        }>;
        scriptTag: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IScriptTag>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").ICreateScriptTag, import("shopify-api-node").IScriptTag>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IScriptTag>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").IUpdateScriptTag, import("shopify-api-node").IScriptTag>;
            };
        }>;
        shippingZone: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IShippingZone>;
        }, Record<string, never>, {}>;
        smartCollection: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ISmartCollection>;
            products: import("..").EndpointDefinition<import("./shopify/client").Scope, number, import("shopify-api-node").IProduct>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ISmartCollection>;
            order: import("..").EndpointDefinition<import("./shopify/client").Scope, number, void>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ISmartCollection>;
                products: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IProduct>;
                order: import("..").EndpointDefinition<import("./shopify/client").Scope, any, void>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ISmartCollection>;
            };
        }>;
        storefrontAccessToken: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IStorefrontAccessToken>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IStorefrontAccessToken>;
        }, Record<string, never>, {
            endpoints: {
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
            };
        }>;
        tenderTransaction: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ITenderTransaction>;
        }, Record<string, never>, {}>;
        theme: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ITheme>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ITheme>;
        }, Record<string, never>, {
            resources: {
                asset: import("..").ResourceDefinition<import("./shopify/client").Scope, {
                    get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IAsset>;
                    list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IAsset>;
                    create: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IAsset>;
                    delete: import("..").EndpointDefinition<import("./shopify/client").Scope, any, void>;
                    update: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").IUpdateAsset, import("shopify-api-node").IAsset>;
                }, Record<string, never>, {
                    endpoints: {
                        get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IAsset>;
                        list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IAsset>;
                        create: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IAsset>;
                        delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                        update: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IAsset>;
                    };
                }>;
            };
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ITheme>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").ITheme>;
            };
        }>;
        user: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IUser>;
            current: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IUser>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, import("shopify-api-node").IUser>;
            };
        }>;
        webhook: import("..").ResourceDefinition<import("./shopify/client").Scope, {
            list: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IWebhook>;
            create: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").ICreateWebhook, import("shopify-api-node").IWebhook>;
            count: import("..").EndpointDefinition<import("./shopify/client").Scope, any, number>;
        }, Record<string, never>, {
            endpoints: {
                get: import("..").EndpointDefinition<import("./shopify/client").Scope, any, import("shopify-api-node").IWebhook>;
                delete: import("..").EndpointDefinition<import("./shopify/client").Scope, undefined, void>;
                update: import("..").EndpointDefinition<import("./shopify/client").Scope, import("shopify-api-node").IUpdateWebhook, import("shopify-api-node").IWebhook>;
            };
        }>;
    }>;
    bundleB2b: import("..").Connector<{
        storeAlias: string;
        storeHash: string;
        credentials: {
            email: string;
            password: string;
        };
    } & {
        token?: {
            value: string;
            expiration: number;
        } | undefined;
    }, import("./bundle-b2b/client").default, {
        companies: {
            endpoints: {
                create: import("..").EndpointDefinition<import("./bundle-b2b/client").default, object, object>;
                list: import("..").EndpointDefinition<import("./bundle-b2b/client").default, import("./bundle-b2b/functions").Query | undefined, object>;
            };
            documents: {
                idField: string;
                listIds: (client: import("./bundle-b2b/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                endpoints: {
                    delete: import("..").EndpointDefinition<import("./bundle-b2b/client").default, any, void>;
                    get: import("..").EndpointDefinition<import("./bundle-b2b/client").default, import("./bundle-b2b/functions").Query | undefined, object>;
                    update: import("..").EndpointDefinition<import("./bundle-b2b/client").default, object, object>;
                };
            };
        };
        users: {
            endpoints: {
                create: import("..").EndpointDefinition<import("./bundle-b2b/client").default, object, object>;
                list: import("..").EndpointDefinition<import("./bundle-b2b/client").default, import("./bundle-b2b/functions").Query | undefined, object>;
            };
            documents: {
                idField: string;
                listIds: (client: import("./bundle-b2b/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                endpoints: {
                    delete: import("..").EndpointDefinition<import("./bundle-b2b/client").default, any, void>;
                    get: import("..").EndpointDefinition<import("./bundle-b2b/client").default, import("./bundle-b2b/functions").Query | undefined, object>;
                    update: import("..").EndpointDefinition<import("./bundle-b2b/client").default, object, object>;
                };
            };
        };
        addresses: {
            endpoints: {
                create: import("..").EndpointDefinition<import("./bundle-b2b/client").default, object, object>;
                list: import("..").EndpointDefinition<import("./bundle-b2b/client").default, import("./bundle-b2b/functions").Query | undefined, object>;
            };
            documents: {
                idField: string;
                listIds: (client: import("./bundle-b2b/client").default) => (path: import("..").Path) => AsyncIterable<string | number>;
                endpoints: {
                    delete: import("..").EndpointDefinition<import("./bundle-b2b/client").default, any, void>;
                    get: import("..").EndpointDefinition<import("./bundle-b2b/client").default, import("./bundle-b2b/functions").Query | undefined, object>;
                    update: import("..").EndpointDefinition<import("./bundle-b2b/client").default, object, object>;
                };
            };
        };
    }>;
};
