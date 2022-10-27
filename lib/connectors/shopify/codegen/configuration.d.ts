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
    location: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").ILocation>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").ILocation>;
            inventoryLevels: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IInventoryLevel>;
        };
    }>;
    comment: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IComment>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateComment, import("shopify-api-node").IComment>;
        spam: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IComment>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
        notSpam: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IComment>;
        approve: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IComment>;
        remove: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IComment>;
        restore: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IComment>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IComment>;
            spam: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IComment>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").IUpdateComment, import("shopify-api-node").IComment>;
            notSpam: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IComment>;
            approve: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IComment>;
            remove: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IComment>;
            restore: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IComment>;
        };
    }>;
    product: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProduct>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProduct>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        resources: {
            productImage: import("../../..").ResourceDefinition<import("../client").Scope, {
                get: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IProductImage>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProductImage>;
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProductImage>;
                delete: import("../../..").EndpointDefinition<import("../client").Scope, number, void>;
                count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
                update: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IProductImage>;
            }, Record<string, never>, {
                endpoints: {
                    get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProductImage>;
                    list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IProductImage>;
                    create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IProductImage>;
                    delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
                    count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
                    update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProductImage>;
                };
            }>;
            productVariant: import("../../..").ResourceDefinition<import("../client").Scope, {
                get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProductVariant>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProductVariant>;
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProductVariant>;
                delete: import("../../..").EndpointDefinition<import("../client").Scope, number, void>;
                count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
                update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProductVariant>;
            }, Record<string, never>, {
                endpoints: {
                    get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IProductVariant>;
                    list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IProductVariant>;
                    create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IProductVariant>;
                    delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
                    count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
                    update: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IProductVariant>;
                };
            }>;
            productResourceFeedback: import("../../..").ResourceDefinition<import("../client").Scope, {
                list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IResourceFeedback>;
                create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IResourceFeedback>;
            }, Record<string, never>, {
                endpoints: {
                    list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IResourceFeedback>;
                    create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IResourceFeedback>;
                };
            }>;
        };
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProduct>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProduct>;
        };
    }>;
    customer: import("../../..").ResourceDefinition<import("../client").Scope, {
        search: import("../../..").EndpointDefinition<import("../client").Scope, any, any> | import("../../..").EndpointDefinition<import("../client").Scope, any, unknown>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomer>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomer>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
        accountActivationUrl: import("../../..").EndpointDefinition<import("../client").Scope, number, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, number, any>;
    }, Record<string, never>, {
        resources: {
            customerAddress: import("../../..").ResourceDefinition<import("../client").Scope, {
                set: import("../../..").EndpointDefinition<import("../client").Scope, any, any> | import("../../..").EndpointDefinition<import("../client").Scope, any, unknown>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomerAddress>;
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomerAddress>;
            }, Record<string, never>, {
                endpoints: {
                    get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").ICustomerAddress>;
                    default: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").ICustomerAddress>;
                    delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
                    update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomerAddress>;
                };
            }>;
        };
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomer>;
            search: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
            orders: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IOrder>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
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
    payout: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPayout>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IPayout>;
        };
    }>;
    collection: import("../../..").ResourceDefinition<import("../client").Scope, {}, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICollection>;
            products: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProduct>;
        };
    }>;
    page: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPage>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPage>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPage>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPage>;
        };
    }>;
    shop: import("../../..").ResourceDefinition<import("../client").Scope, {}, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IShop>;
        };
    }>;
    checkout: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICheckout>;
        complete: import("../../..").EndpointDefinition<import("../client").Scope, string, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, string, any>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICheckout>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
        shippingRates: import("../../..").EndpointDefinition<import("../client").Scope, string, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, string, any>;
    }, Record<string, never>, {
        resources: {
            payment: import("../../..").ResourceDefinition<import("../client").Scope, {
                get: import("../../..").EndpointDefinition<import("../client").Scope, number, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, number, any>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, any> | import("../../..").EndpointDefinition<import("../client").Scope, any, unknown>;
                count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
            }, Record<string, never>, {
                endpoints: {
                    get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
                    list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
                    create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
                    count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
                };
            }>;
        };
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").ICheckout>;
            complete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICheckout>;
            shippingRates: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
        };
    }>;
    order: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IOrder>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IOrder>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        resources: {
            refund: import("../../..").ResourceDefinition<import("../client").Scope, {
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IRefund>;
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IRefund>;
                calculate: import("../../..").EndpointDefinition<import("../client").Scope, any, any> | import("../../..").EndpointDefinition<import("../client").Scope, any, unknown>;
            }, Record<string, never>, {
                endpoints: {
                    get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IRefund>;
                };
            }>;
            fulfillment: import("../../..").ResourceDefinition<import("../client").Scope, {
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillment>;
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillment>;
                count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
                updateTracking: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillment>;
            }, Record<string, never>, {
                resources: {
                    fulfillmentEvent: import("../../..").ResourceDefinition<import("../client").Scope, {
                        get: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentEvent>;
                        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillmentEvent>;
                        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillmentEvent>;
                        delete: import("../../..").EndpointDefinition<import("../client").Scope, number, void>;
                        update: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentEvent>;
                    }, Record<string, never>, {
                        endpoints: {
                            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentEvent>;
                            list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentEvent>;
                            create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentEvent>;
                            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
                            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillmentEvent>;
                        };
                    }>;
                };
                endpoints: {
                    get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillment>;
                    open: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillment>;
                    complete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillment>;
                    cancel: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillment>;
                    update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillment>;
                    createV2: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillment>;
                    updateTracking: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillment>;
                };
            }>;
            orderRisk: import("../../..").ResourceDefinition<import("../client").Scope, {
                list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IOrderRisk>;
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IOrderRisk>;
            }, Record<string, never>, {
                endpoints: {
                    get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IOrderRisk>;
                    delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
                    update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IOrderRisk>;
                };
            }>;
            transaction: import("../../..").ResourceDefinition<import("../client").Scope, {
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ITransaction>;
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ITransaction>;
                count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
            }, Record<string, never>, {
                endpoints: {
                    get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ITransaction>;
                };
            }>;
        };
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IOrder>;
            close: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IOrder>;
            open: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IOrder>;
            cancel: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IOrder>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IOrder>;
            fulfillmentOrders: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
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
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IApplicationCharge>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateApplicationCharge, import("shopify-api-node").IApplicationCharge>;
        activate: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IApplicationCharge>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IApplicationCharge>;
            activate: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IApplicationCharge>;
        };
    }>;
    applicationCredit: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IApplicationCredit>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateApplicationCredit, import("shopify-api-node").IApplicationCredit>;
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
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IBlog>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateBlog, import("shopify-api-node").IBlog>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
    }, Record<string, never>, {
        resources: {
            article: import("../../..").ResourceDefinition<import("../client").Scope, {
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IArticle>;
                create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateArticle, import("shopify-api-node").IArticle>;
                count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
                authors: import("../../..").EndpointDefinition<import("../client").Scope, undefined, string>;
            }, Record<string, never>, {
                endpoints: {
                    get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IArticle>;
                    delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
                    update: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").IUpdateArticle, import("shopify-api-node").IArticle>;
                    authors: import("../../..").EndpointDefinition<import("../client").Scope, undefined, string>;
                    tags: import("../../..").EndpointDefinition<import("../client").Scope, undefined, string>;
                };
            }>;
        };
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IBlog>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IBlog>;
        };
    }>;
    carrierService: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").ICarrierService>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateCarrierService, import("shopify-api-node").ICarrierService>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").ICarrierService>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").IUpdateCarrierService, import("shopify-api-node").ICarrierService>;
        };
    }>;
    collect: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICollect>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateCollect, import("shopify-api-node").ICollect>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICollect>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
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
    country: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICountry>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateCountry, import("shopify-api-node").ICountry>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
    }, Record<string, never>, {
        resources: {
            province: import("../../..").ResourceDefinition<import("../client").Scope, {
                get: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IProvince>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProvince>;
                count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
                update: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IProvince>;
            }, Record<string, never>, {
                endpoints: {
                    get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProvince>;
                    list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IProvince>;
                    count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
                    update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProvince>;
                };
            }>;
        };
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICountry>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").IUpdateCountry, import("shopify-api-node").ICountry>;
        };
    }>;
    currency: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").ICurrency>;
    }, Record<string, never>, {}>;
    customCollection: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomCollection>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomCollection>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomCollection>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomCollection>;
        };
    }>;
    customerSavedSearch: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomerSavedSearch>;
        customers: import("../../..").EndpointDefinition<import("../client").Scope, number, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, number, any>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomerSavedSearch>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomerSavedSearch>;
            customers: import("../../..").EndpointDefinition<import("../client").Scope, any, any> | import("../../..").EndpointDefinition<import("../client").Scope, any, unknown>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ICustomerSavedSearch>;
        };
    }>;
    draftOrder: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IDraftOrder>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IDraftOrder>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IDraftOrder>;
            complete: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IDraftOrder>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IDraftOrder>;
            sendInvoice: import("../../..").EndpointDefinition<import("../client").Scope, any, any> | import("../../..").EndpointDefinition<import("../client").Scope, any, unknown>;
        };
    }>;
    fulfillmentEvent: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentEvent>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentEvent>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentEvent>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, number, void>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentEvent>;
        };
    }>;
    fulfillmentOrder: import("../../..").ResourceDefinition<import("../client").Scope, {
        close: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentOrder>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillmentOrder>;
        move: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentOrder>;
        cancel: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentOrder>;
        locationsForMove: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").ILocationForMove>;
    }, Record<string, never>, {
        resources: {
            cancellationRequest: import("../../..").ResourceDefinition<import("../client").Scope, {
                reject: import("../../..").EndpointDefinition<import("../client").Scope, string | undefined, import("shopify-api-node").IFulfillmentOrder>;
                create: import("../../..").EndpointDefinition<import("../client").Scope, string | undefined, import("shopify-api-node").IFulfillmentOrder>;
                accept: import("../../..").EndpointDefinition<import("../client").Scope, string | undefined, import("shopify-api-node").IFulfillmentOrder>;
            }, Record<string, never>, {
                endpoints: {
                    reject: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
                    create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
                    accept: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
                };
            }>;
            fulfillmentRequest: import("../../..").ResourceDefinition<import("../client").Scope, {
                reject: import("../../..").EndpointDefinition<import("../client").Scope, string | undefined, import("shopify-api-node").IFulfillmentOrder>;
                create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateFulfillmentRequest, import("shopify-api-node").IFulfillmentOrder>;
                accept: import("../../..").EndpointDefinition<import("../client").Scope, string | undefined, import("shopify-api-node").IFulfillmentOrder>;
            }, Record<string, never>, {
                endpoints: {
                    reject: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
                    create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
                    accept: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
                };
            }>;
        };
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentOrder>;
            close: import("../../..").EndpointDefinition<import("../client").Scope, string | undefined, import("shopify-api-node").IFulfillmentOrder>;
            move: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IFulfillmentOrder>;
            cancel: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").IFulfillmentOrder, import("shopify-api-node").IFulfillmentOrder>;
            locationsForMove: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").ILocationForMove>;
        };
    }>;
    fulfillmentService: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillmentService>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillmentService>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IFulfillmentService>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IFulfillmentService>;
        };
    }>;
    giftCard: import("../../..").ResourceDefinition<import("../client").Scope, {
        search: import("../../..").EndpointDefinition<import("../client").Scope, any, any> | import("../../..").EndpointDefinition<import("../client").Scope, any, unknown>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IGiftCard>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IGiftCard>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        resources: {
            giftCardAdjustment: import("../../..").ResourceDefinition<import("../client").Scope, {
                get: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IGiftCardAdjustment>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IGiftCardAdjustment>;
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IGiftCardAdjustment>;
            }, Record<string, never>, {
                endpoints: {
                    get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IGiftCardAdjustment>;
                    list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IGiftCardAdjustment>;
                    create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IGiftCardAdjustment>;
                };
            }>;
        };
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IGiftCard>;
            search: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
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
        set: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IInventoryLevel>;
        connect: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IInventoryLevel>;
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IInventoryLevel>;
        adjust: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IInventoryLevel>;
    }, Record<string, never>, {
        endpoints: {
            connect: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IInventoryLevel>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            adjust: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IInventoryLevel>;
        };
    }>;
    marketingEvent: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IMarketingEvent>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IMarketingEvent>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
        engagements: import("../../..").EndpointDefinition<import("../client").Scope, number, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, number, any>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IMarketingEvent>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IMarketingEvent>;
            engagements: import("../../..").EndpointDefinition<import("../client").Scope, any, any> | import("../../..").EndpointDefinition<import("../client").Scope, any, unknown>;
        };
    }>;
    metafield: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IMetafield>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IMetafield>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IMetafield>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IMetafield>;
        };
    }>;
    policy: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPolicy>;
    }, Record<string, never>, {}>;
    priceRule: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPriceRule>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPriceRule>;
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
                lookup: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IDiscountCode>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IDiscountCode>;
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IDiscountCode>;
            }, Record<string, never>, {
                endpoints: {
                    get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IDiscountCode>;
                    delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
                    update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IDiscountCode>;
                };
            }>;
        };
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPriceRule>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IPriceRule>;
        };
    }>;
    productListing: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProductListing>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IProductListing>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, undefined, number>;
        productIds: import("../../..").EndpointDefinition<import("../client").Scope, any, any> | import("../../..").EndpointDefinition<import("../client").Scope, any, unknown>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IProductListing>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            productIds: import("../../..").EndpointDefinition<import("../client").Scope, undefined, unknown> | import("../../..").EndpointDefinition<import("../client").Scope, undefined, any>;
        };
    }>;
    resourceFeedback: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IResourceFeedback>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IResourceFeedback>;
    }, Record<string, never>, {}>;
    recurringApplicationCharge: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IRecurringApplicationCharge>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateRecurringApplicationCharge, import("shopify-api-node").IRecurringApplicationCharge>;
        activate: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IRecurringApplicationCharge>;
        customize: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IRecurringApplicationCharge>;
    }, Record<string, never>, {
        resources: {
            usageCharge: import("../../..").ResourceDefinition<import("../client").Scope, {
                get: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IUsageCharge>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IUsageCharge>;
                create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateUsageCharge, import("shopify-api-node").IUsageCharge>;
            }, Record<string, never>, {
                endpoints: {
                    get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IUsageCharge>;
                    list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IUsageCharge>;
                    create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IUsageCharge>;
                };
            }>;
        };
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IRecurringApplicationCharge>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            activate: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IRecurringApplicationCharge>;
            customize: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IRecurringApplicationCharge>;
        };
    }>;
    redirect: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IRedirect>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateRedirect, import("shopify-api-node").IRedirect>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IRedirect>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").IUpdateRedirect, import("shopify-api-node").IRedirect>;
        };
    }>;
    report: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IReport>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IReport>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IReport>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IReport>;
        };
    }>;
    scriptTag: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IScriptTag>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateScriptTag, import("shopify-api-node").IScriptTag>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IScriptTag>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").IUpdateScriptTag, import("shopify-api-node").IScriptTag>;
        };
    }>;
    shippingZone: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IShippingZone>;
    }, Record<string, never>, {}>;
    smartCollection: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ISmartCollection>;
        products: import("../../..").EndpointDefinition<import("../client").Scope, number, import("shopify-api-node").IProduct>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ISmartCollection>;
        order: import("../../..").EndpointDefinition<import("../client").Scope, number, void>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ISmartCollection>;
            products: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IProduct>;
            order: import("../../..").EndpointDefinition<import("../client").Scope, any, void>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ISmartCollection>;
        };
    }>;
    storefrontAccessToken: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IStorefrontAccessToken>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IStorefrontAccessToken>;
    }, Record<string, never>, {
        endpoints: {
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
        };
    }>;
    tenderTransaction: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ITenderTransaction>;
    }, Record<string, never>, {}>;
    theme: import("../../..").ResourceDefinition<import("../client").Scope, {
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ITheme>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ITheme>;
    }, Record<string, never>, {
        resources: {
            asset: import("../../..").ResourceDefinition<import("../client").Scope, {
                get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IAsset>;
                list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IAsset>;
                create: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IAsset>;
                delete: import("../../..").EndpointDefinition<import("../client").Scope, any, void>;
                update: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").IUpdateAsset, import("shopify-api-node").IAsset>;
            }, Record<string, never>, {
                endpoints: {
                    get: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IAsset>;
                    list: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IAsset>;
                    create: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IAsset>;
                    delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
                    update: import("../../..").EndpointDefinition<import("../client").Scope, undefined, import("shopify-api-node").IAsset>;
                };
            }>;
        };
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").ITheme>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
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
        list: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IWebhook>;
        create: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").ICreateWebhook, import("shopify-api-node").IWebhook>;
        count: import("../../..").EndpointDefinition<import("../client").Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            get: import("../../..").EndpointDefinition<import("../client").Scope, any, import("shopify-api-node").IWebhook>;
            delete: import("../../..").EndpointDefinition<import("../client").Scope, undefined, void>;
            update: import("../../..").EndpointDefinition<import("../client").Scope, import("shopify-api-node").IUpdateWebhook, import("shopify-api-node").IWebhook>;
        };
    }>;
};
