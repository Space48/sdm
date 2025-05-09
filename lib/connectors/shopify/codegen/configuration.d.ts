/**
 * Here we configure endpoints which we have automatically inferred
 * from the API of shopify-api-node. Most endpoints are standard,
 * e.g. get, list, create, delete, etc., and do not need to be
 * configured. We only configure endpoints which are non-standard.
 *
 * `false` disables a resource or endpoint. In all cases, the disabled
 * endpoints can be enabled if they are needed -- just configure the
 * endpoint you need in the same way that other endpoints are
 * configured below.
 */
export declare const resourceDefinitions: {
    product: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProduct>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProduct>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        resources: {
            productImage: import("../../..").ResourceDefinition<import("../client").Scope, {
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProductImage>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProductImage>;
                delete: import("../../..").EndpointDefinition<import("../client").Scope, number, void>;
                get: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IProductImage>;
                count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
                update: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IProductImage>;
            }, Record<string, never>, {
                endpoints: {
                    create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IProductImage>;
                    list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IProductImage>;
                    delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
                    get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProductImage>;
                    count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
                    update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProductImage>;
                };
            }>;
            productVariant: import("../../..").ResourceDefinition<import("../client").Scope, {
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProductVariant>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProductVariant>;
                delete: import("../../..").EndpointDefinition<import("../client").Scope, number, void>;
                get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProductVariant>;
                count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
                update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProductVariant>;
            }, Record<string, never>, {
                endpoints: {
                    create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IProductVariant>;
                    list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IProductVariant>;
                    delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
                    get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IProductVariant>;
                    count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
                    update: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IProductVariant>;
                };
            }>;
            productResourceFeedback: import("../../..").ResourceDefinition<import("../client").Scope, {
                create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IResourceFeedback>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IResourceFeedback>;
            }, Record<string, never>, {
                endpoints: {
                    create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IResourceFeedback>;
                    list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IResourceFeedback>;
                };
            }>;
        };
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProduct>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProduct>;
        };
    }>;
    accessScope: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IAccessScope>;
    }, Record<string, never>, {}>;
    apiPermission: import("../../..").ResourceDefinition<import("../client").Scope, {}, Record<string, never>, {
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
        };
    }>;
    applicationCharge: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateApplicationCharge, import("shopify-api-node").IApplicationCharge>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IApplicationCharge>;
        activate: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IApplicationCharge>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IApplicationCharge>;
            activate: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IApplicationCharge>;
        };
    }>;
    applicationCredit: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateApplicationCredit, import("shopify-api-node").IApplicationCredit>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IApplicationCredit>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IApplicationCredit>;
        };
    }>;
    balance: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IBalance>;
        transactions: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IBalanceTransaction>;
    }, Record<string, never>, {
        endpoints: {
            transactions: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IBalanceTransaction>;
        };
    }>;
    blog: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateBlog, import("shopify-api-node").IBlog>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IBlog>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
    }, Record<string, never>, {
        resources: {
            article: import("../../..").ResourceDefinition<import("../client").Scope, {
                create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateArticle, import("shopify-api-node").IArticle>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IArticle>;
                count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
                authors: import("../../..").EndpointDefinition<import("../client").Scope, undefined, string>;
            }, Record<string, never>, {
                endpoints: {
                    delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
                    get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IArticle>;
                    update: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").IUpdateArticle, import("shopify-api-node").IArticle>;
                    authors: import("../../..").EndpointDefinition<import("../client").Scope, undefined, string>;
                    tags: import("../../..").EndpointDefinition<import("../client").Scope, undefined, string>;
                };
            }>;
        };
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IBlog>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IBlog>;
        };
    }>;
    carrierService: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateCarrierService, import("shopify-api-node").ICarrierService>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").ICarrierService>;
    }, Record<string, never>, {
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").ICarrierService>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").IUpdateCarrierService, import("shopify-api-node").ICarrierService>;
        };
    }>;
    checkout: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICheckout>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICheckout>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
        complete: import("../../..").EndpointDefinition<import("../client").Scope, string, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, string, any>;
        shippingRates: import("../../..").EndpointDefinition<import("../client").Scope, string, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, string, any>;
    }, Record<string, never>, {
        resources: {
            payment: import("../../..").ResourceDefinition<import("../client").Scope, {
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, any> | import("../../..").EndpointDefinition<import("../client").Scope, any, unknown>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
                get: import("../../..").EndpointDefinition<import("../client").Scope, number, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, number, any>;
                count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
            }, Record<string, never>, {
                endpoints: {
                    create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
                    list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
                    get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
                    count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
                };
            }>;
        };
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").ICheckout>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICheckout>;
            complete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
            shippingRates: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
        };
    }>;
    collect: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateCollect, import("shopify-api-node").ICollect>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICollect>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICollect>;
        };
    }>;
    collectionListing: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICollectionListing>;
        productIds: import("../../..").EndpointDefinition<import("../client").Scope, number, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, number, any>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICollectionListing>;
            productIds: import("../../..").EndpointDefinition<import("../client").Scope, any, any> | import("../../..").EndpointDefinition<import("../client").Scope, any, unknown>;
        };
    }>;
    collection: import("../../..").ResourceDefinition<import("../client").Scope, {}, Record<string, never>, {
        endpoints: {
            products: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProduct>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICollection>;
        };
    }>;
    comment: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateComment, import("shopify-api-node").IComment>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IComment>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
        spam: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IComment>;
        notSpam: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IComment>;
        approve: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IComment>;
        remove: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IComment>;
        restore: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IComment>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IComment>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").IUpdateComment, import("shopify-api-node").IComment>;
            spam: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IComment>;
            notSpam: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IComment>;
            approve: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IComment>;
            remove: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IComment>;
            restore: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IComment>;
        };
    }>;
    country: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateCountry, import("shopify-api-node").ICountry>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICountry>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
    }, Record<string, never>, {
        resources: {
            province: import("../../..").ResourceDefinition<import("../client").Scope, {
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProvince>;
                get: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IProvince>;
                count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
                update: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IProvince>;
            }, Record<string, never>, {
                endpoints: {
                    list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IProvince>;
                    get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProvince>;
                    count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
                    update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProvince>;
                };
            }>;
        };
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICountry>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").IUpdateCountry, import("shopify-api-node").ICountry>;
        };
    }>;
    currency: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").ICurrency>;
    }, Record<string, never>, {}>;
    customCollection: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomCollection>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomCollection>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomCollection>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomCollection>;
        };
    }>;
    customerSavedSearch: import("../../..").ResourceDefinition<import("../client").Scope, {
        customers: import("../../..").EndpointDefinition<import("../client").Scope, number, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, number, any>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomerSavedSearch>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomerSavedSearch>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            customers: import("../../..").EndpointDefinition<import("../client").Scope, any, any> | import("../../..").EndpointDefinition<import("../client").Scope, any, unknown>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomerSavedSearch>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomerSavedSearch>;
        };
    }>;
    customer: import("../../..").ResourceDefinition<import("../client").Scope, {
        search: import("../../..").EndpointDefinition<import("../client").Scope, any, any> | import("../../..").EndpointDefinition<import("../client").Scope, any, unknown>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomer>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomer>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
        accountActivationUrl: import("../../..").EndpointDefinition<import("../client").Scope, number, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, number, any>;
    }, Record<string, never>, {
        resources: {
            customerAddress: import("../../..").ResourceDefinition<import("../client").Scope, {
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomerAddress>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomerAddress>;
                set: import("../../..").EndpointDefinition<import("../client").Scope, any, any> | import("../../..").EndpointDefinition<import("../client").Scope, any, unknown>;
            }, Record<string, never>, {
                endpoints: {
                    default: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").ICustomerAddress>;
                    delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
                    get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").ICustomerAddress>;
                    update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomerAddress>;
                };
            }>;
        };
        endpoints: {
            search: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
            orders: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IOrder>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomer>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomer>;
            accountActivationUrl: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
        };
    }>;
    dispute: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IDispute>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IDispute>;
        };
    }>;
    draftOrder: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IDraftOrder>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IDraftOrder>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
    }, Record<string, never>, {
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IDraftOrder>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IDraftOrder>;
            complete: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IDraftOrder>;
            sendInvoice: import("../../..").EndpointDefinition<import("../client").Scope, any, any> | import("../../..").EndpointDefinition<import("../client").Scope, any, unknown>;
        };
    }>;
    fulfillmentEvent: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentEvent>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentEvent>;
    }, Record<string, never>, {
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, number, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentEvent>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentEvent>;
        };
    }>;
    fulfillmentOrder: import("../../..").ResourceDefinition<import("../client").Scope, {
        close: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentOrder>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillmentOrder>;
        cancel: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentOrder>;
        move: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentOrder>;
        locationsForMove: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").ILocationForMove>;
    }, Record<string, never>, {
        resources: {
            cancellationRequest: import("../../..").ResourceDefinition<import("../client").Scope, {
                create: import("../../..").EndpointDefinition<import("../client").Scope, string | undefined, import("shopify-api-node").IFulfillmentOrder>;
                accept: import("../../..").EndpointDefinition<import("../client").Scope, string | undefined, import("shopify-api-node").IFulfillmentOrder>;
                reject: import("../../..").EndpointDefinition<import("../client").Scope, string | undefined, import("shopify-api-node").IFulfillmentOrder>;
            }, Record<string, never>, {
                endpoints: {
                    create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
                    accept: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
                    reject: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
                };
            }>;
            fulfillmentRequest: import("../../..").ResourceDefinition<import("../client").Scope, {
                create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateFulfillmentRequest, import("shopify-api-node").IFulfillmentOrder>;
                accept: import("../../..").EndpointDefinition<import("../client").Scope, string | undefined, import("shopify-api-node").IFulfillmentOrder>;
                reject: import("../../..").EndpointDefinition<import("../client").Scope, string | undefined, import("shopify-api-node").IFulfillmentOrder>;
            }, Record<string, never>, {
                endpoints: {
                    create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
                    accept: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
                    reject: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
                };
            }>;
        };
        endpoints: {
            close: import("../../..").EndpointDefinition<import("../client").Scope, string | undefined, import("shopify-api-node").IFulfillmentOrder>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
            cancel: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").IFulfillmentOrder, import("shopify-api-node").IFulfillmentOrder>;
            move: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentOrder>;
            locationsForMove: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").ILocationForMove>;
        };
    }>;
    fulfillmentService: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillmentService>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillmentService>;
    }, Record<string, never>, {
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentService>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillmentService>;
        };
    }>;
    giftCard: import("../../..").ResourceDefinition<import("../client").Scope, {
        search: import("../../..").EndpointDefinition<import("../client").Scope, any, any> | import("../../..").EndpointDefinition<import("../client").Scope, any, unknown>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IGiftCard>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IGiftCard>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        resources: {
            giftCardAdjustment: import("../../..").ResourceDefinition<import("../client").Scope, {
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IGiftCardAdjustment>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IGiftCardAdjustment>;
                get: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IGiftCardAdjustment>;
            }, Record<string, never>, {
                endpoints: {
                    create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IGiftCardAdjustment>;
                    list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IGiftCardAdjustment>;
                    get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IGiftCardAdjustment>;
                };
            }>;
        };
        endpoints: {
            search: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IGiftCard>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IGiftCard>;
            disable: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
        };
    }>;
    inventoryItem: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IInventoryItem>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IInventoryItem>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IInventoryItem>;
        };
    }>;
    inventoryLevel: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IInventoryLevel>;
        set: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IInventoryLevel>;
        adjust: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IInventoryLevel>;
        connect: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IInventoryLevel>;
    }, Record<string, never>, {
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            adjust: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IInventoryLevel>;
            connect: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IInventoryLevel>;
        };
    }>;
    location: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").ILocation>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").ILocation>;
            inventoryLevels: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IInventoryLevel>;
        };
    }>;
    marketingEvent: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IMarketingEvent>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IMarketingEvent>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
        engagements: import("../../..").EndpointDefinition<import("../client").Scope, number, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, number, any>;
    }, Record<string, never>, {
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IMarketingEvent>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IMarketingEvent>;
            engagements: import("../../..").EndpointDefinition<import("../client").Scope, any, any> | import("../../..").EndpointDefinition<import("../client").Scope, any, unknown>;
        };
    }>;
    metafield: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IMetafield>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IMetafield>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IMetafield>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IMetafield>;
        };
    }>;
    order: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IOrder>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IOrder>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        resources: {
            fulfillment: import("../../..").ResourceDefinition<import("../client").Scope, {
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillment>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillment>;
                count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
                updateTracking: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillment>;
            }, Record<string, never>, {
                resources: {
                    fulfillmentEvent: import("../../..").ResourceDefinition<import("../client").Scope, {
                        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillmentEvent>;
                        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillmentEvent>;
                        delete: import("../../..").EndpointDefinition<import("../client").Scope, number, void>;
                        get: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentEvent>;
                        update: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentEvent>;
                    }, Record<string, never>, {
                        endpoints: {
                            create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentEvent>;
                            list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentEvent>;
                            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
                            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentEvent>;
                            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillmentEvent>;
                        };
                    }>;
                };
                endpoints: {
                    get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillment>;
                    update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillment>;
                    complete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillment>;
                    cancel: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillment>;
                    open: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillment>;
                    createV2: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillment>;
                    updateTracking: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillment>;
                };
            }>;
            orderRisk: import("../../..").ResourceDefinition<import("../client").Scope, {
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IOrderRisk>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IOrderRisk>;
            }, Record<string, never>, {
                endpoints: {
                    delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
                    get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IOrderRisk>;
                    update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IOrderRisk>;
                };
            }>;
            refund: import("../../..").ResourceDefinition<import("../client").Scope, {
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IRefund>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IRefund>;
                calculate: import("../../..").EndpointDefinition<import("../client").Scope, any, any> | import("../../..").EndpointDefinition<import("../client").Scope, any, unknown>;
            }, Record<string, never>, {
                endpoints: {
                    get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IRefund>;
                };
            }>;
            transaction: import("../../..").ResourceDefinition<import("../client").Scope, {
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ITransaction>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ITransaction>;
                count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
            }, Record<string, never>, {
                endpoints: {
                    get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ITransaction>;
                };
            }>;
        };
        endpoints: {
            close: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IOrder>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IOrder>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IOrder>;
            cancel: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IOrder>;
            open: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IOrder>;
            fulfillmentOrders: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
        };
    }>;
    page: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPage>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPage>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPage>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPage>;
        };
    }>;
    payout: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPayout>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IPayout>;
        };
    }>;
    policy: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPolicy>;
    }, Record<string, never>, {}>;
    priceRule: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPriceRule>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPriceRule>;
    }, Record<string, never>, {
        resources: {
            discountCodeCreationJob: import("../../..").ResourceDefinition<import("../client").Scope, {
                create: import("../../..").EndpointDefinition<import("../client").Scope, any[], import("shopify-api-node").IDiscountCodeCreation>;
                discountCodes: import("../../..").EndpointDefinition<import("../client").Scope, number, any>;
            }, Record<string, never>, {
                endpoints: {
                    get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IDiscountCodeCreation>;
                    discountCodes: import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
                };
            }>;
            discountCode: import("../../..").ResourceDefinition<import("../client").Scope, {
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IDiscountCode>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IDiscountCode>;
                lookup: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IDiscountCode>;
            }, Record<string, never>, {
                endpoints: {
                    delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
                    get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IDiscountCode>;
                    update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IDiscountCode>;
                };
            }>;
        };
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPriceRule>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPriceRule>;
        };
    }>;
    productListing: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IProductListing>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProductListing>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
        productIds: import("../../..").EndpointDefinition<import("../client").Scope, any, any> | import("../../..").EndpointDefinition<import("../client").Scope, any, unknown>;
    }, Record<string, never>, {
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IProductListing>;
            productIds: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
        };
    }>;
    resourceFeedback: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IResourceFeedback>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IResourceFeedback>;
    }, Record<string, never>, {}>;
    recurringApplicationCharge: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateRecurringApplicationCharge, import("shopify-api-node").IRecurringApplicationCharge>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IRecurringApplicationCharge>;
        activate: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IRecurringApplicationCharge>;
        customize: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IRecurringApplicationCharge>;
    }, Record<string, never>, {
        resources: {
            usageCharge: import("../../..").ResourceDefinition<import("../client").Scope, {
                create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateUsageCharge, import("shopify-api-node").IUsageCharge>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IUsageCharge>;
                get: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IUsageCharge>;
            }, Record<string, never>, {
                endpoints: {
                    create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IUsageCharge>;
                    list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IUsageCharge>;
                    get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IUsageCharge>;
                };
            }>;
        };
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IRecurringApplicationCharge>;
            activate: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IRecurringApplicationCharge>;
            customize: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IRecurringApplicationCharge>;
        };
    }>;
    redirect: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateRedirect, import("shopify-api-node").IRedirect>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IRedirect>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IRedirect>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").IUpdateRedirect, import("shopify-api-node").IRedirect>;
        };
    }>;
    report: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IReport>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IReport>;
    }, Record<string, never>, {
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IReport>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IReport>;
        };
    }>;
    scriptTag: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateScriptTag, import("shopify-api-node").IScriptTag>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IScriptTag>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IScriptTag>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").IUpdateScriptTag, import("shopify-api-node").IScriptTag>;
        };
    }>;
    shippingZone: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IShippingZone>;
    }, Record<string, never>, {}>;
    shop: import("../../..").ResourceDefinition<import("../client").Scope, {}, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IShop>;
        };
    }>;
    smartCollection: import("../../..").ResourceDefinition<import("../client").Scope, {
        products: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IProduct>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ISmartCollection>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ISmartCollection>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
        order: import("../../..").EndpointDefinition<import("../client").Scope, number, void>;
    }, Record<string, never>, {
        endpoints: {
            products: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProduct>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ISmartCollection>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ISmartCollection>;
            order: import("../../..").EndpointDefinition<import("../client").Scope, any, void>;
        };
    }>;
    storefrontAccessToken: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IStorefrontAccessToken>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IStorefrontAccessToken>;
    }, Record<string, never>, {
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
        };
    }>;
    tenderTransaction: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ITenderTransaction>;
    }, Record<string, never>, {}>;
    theme: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ITheme>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ITheme>;
    }, Record<string, never>, {
        resources: {
            asset: import("../../..").ResourceDefinition<import("../client").Scope, {
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IAsset>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IAsset>;
                delete: import("../../..").EndpointDefinition<import("../client").Scope, any, void>;
                get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IAsset>;
                update: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").IUpdateAsset, import("shopify-api-node").IAsset>;
            }, Record<string, never>, {
                endpoints: {
                    create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IAsset>;
                    list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IAsset>;
                    delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
                    get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IAsset>;
                    update: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IAsset>;
                };
            }>;
        };
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ITheme>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ITheme>;
        };
    }>;
    user: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IUser>;
        current: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IUser>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IUser>;
        };
    }>;
    webhook: import("../../..").ResourceDefinition<import("../client").Scope, {
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateWebhook, import("shopify-api-node").IWebhook>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IWebhook>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IWebhook>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").IUpdateWebhook, import("shopify-api-node").IWebhook>;
        };
    }>;
};
