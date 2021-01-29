import * as client from "./client";
import * as f from '../../framework';
import Shopify from 'shopify-api-node';
export declare const shopify: f.Connector<{
    shopName: string;
    credentials: {
        apiKey: string;
        password: string;
    };
}, client.Scope, {
    user: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.IUser>;
        current: f.EndpointDefinition<client.Scope, undefined, Shopify.IUser>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, number, Shopify.IUser>;
        };
    }>;
    location: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.ILocation>;
        count: f.EndpointDefinition<client.Scope, undefined, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, number, Shopify.ILocation>;
            inventoryLevels: f.EndpointDefinition<client.Scope, any, Shopify.IInventoryLevel>;
        };
    }>;
    customer: f.ResourceDefinition<client.Scope, {
        search: f.EndpointDefinition<client.Scope, any, unknown> | f.EndpointDefinition<client.Scope, any, any>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.ICustomer>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.ICustomer>;
        count: f.EndpointDefinition<client.Scope, any, number>;
        accountActivationUrl: f.EndpointDefinition<client.Scope, number, unknown> | f.EndpointDefinition<client.Scope, number, any>;
    }, {}, {
        endpoints: {
            search: f.EndpointDefinition<client.Scope, any, unknown> | f.EndpointDefinition<client.Scope, any, any>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.ICustomer>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.ICustomer>;
            accountActivationUrl: f.EndpointDefinition<client.Scope, number, unknown> | f.EndpointDefinition<client.Scope, number, any>;
        };
        resources: {
            customerAddress: f.ResourceDefinition<client.Scope, {
                set: f.EndpointDefinition<client.Scope, any, unknown> | f.EndpointDefinition<client.Scope, any, any>;
                list: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerAddress>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerAddress>;
            }, {}, {
                endpoints: {
                    default: f.EndpointDefinition<client.Scope, number, Shopify.ICustomerAddress>;
                    get: f.EndpointDefinition<client.Scope, number, Shopify.ICustomerAddress>;
                    delete: f.EndpointDefinition<client.Scope, number, void>;
                    update: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerAddress>;
                };
            }>;
        };
    }>;
    dispute: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IDispute>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, number, Shopify.IDispute>;
        };
    }>;
    payout: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IPayout>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, number, Shopify.IPayout>;
        };
    }>;
    product: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IProduct>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IProduct>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IProduct>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IProduct>;
        };
        resources: {
            productImage: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, any, Shopify.IProductImage>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.IProductImage>;
                count: f.EndpointDefinition<client.Scope, any, number>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, any, Shopify.IProductImage>;
                    delete: f.EndpointDefinition<client.Scope, number, void>;
                    update: f.EndpointDefinition<client.Scope, any, Shopify.IProductImage>;
                };
            }>;
            productVariant: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, any, Shopify.IProductVariant>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.IProductVariant>;
                count: f.EndpointDefinition<client.Scope, number, number>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, any, Shopify.IProductVariant>;
                    delete: f.EndpointDefinition<client.Scope, number, void>;
                    update: f.EndpointDefinition<client.Scope, any, Shopify.IProductVariant>;
                };
            }>;
            productResourceFeedback: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, undefined, Shopify.IResourceFeedback>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.IResourceFeedback>;
            }, {}, {}>;
        };
    }>;
    collection: f.ResourceDefinition<client.Scope, {}, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.ICollection>;
            products: f.EndpointDefinition<client.Scope, any, Shopify.IProduct>;
        };
    }>;
    page: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IPage>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IPage>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IPage>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IPage>;
        };
    }>;
    shop: f.ResourceDefinition<client.Scope, {}, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IShop>;
        };
    }>;
    checkout: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.ICheckout>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.ICheckout>;
        count: f.EndpointDefinition<client.Scope, any, number>;
        complete: f.EndpointDefinition<client.Scope, string, unknown> | f.EndpointDefinition<client.Scope, string, any>;
        shippingRates: f.EndpointDefinition<client.Scope, string, unknown> | f.EndpointDefinition<client.Scope, string, any>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, string, Shopify.ICheckout>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.ICheckout>;
            complete: f.EndpointDefinition<client.Scope, string, unknown> | f.EndpointDefinition<client.Scope, string, any>;
            shippingRates: f.EndpointDefinition<client.Scope, string, unknown> | f.EndpointDefinition<client.Scope, string, any>;
        };
        resources: {
            payment: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, string | undefined, unknown> | f.EndpointDefinition<client.Scope, string | undefined, any>;
                create: f.EndpointDefinition<client.Scope, any, unknown> | f.EndpointDefinition<client.Scope, any, any>;
                count: f.EndpointDefinition<client.Scope, string, number>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, number, unknown> | f.EndpointDefinition<client.Scope, number, any>;
                };
            }>;
        };
    }>;
    order: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IOrder>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IOrder>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IOrder>;
            close: f.EndpointDefinition<client.Scope, number, Shopify.IOrder>;
            open: f.EndpointDefinition<client.Scope, number, Shopify.IOrder>;
            cancel: f.EndpointDefinition<client.Scope, any, Shopify.IOrder>;
            delete: f.EndpointDefinition<client.Scope, number, unknown> | f.EndpointDefinition<client.Scope, number, any>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IOrder>;
            fulfillmentOrders: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentOrder>;
        };
        resources: {
            refund: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, any, Shopify.IRefund>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.IRefund>;
                calculate: f.EndpointDefinition<client.Scope, any, unknown> | f.EndpointDefinition<client.Scope, any, any>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, any, Shopify.IRefund>;
                };
            }>;
            fulfillment: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillment>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillment>;
                count: f.EndpointDefinition<client.Scope, any, number>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillment>;
                    open: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillment>;
                    cancel: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillment>;
                    update: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillment>;
                    complete: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillment>;
                };
                resources: {
                    fulfillmentEvent: f.ResourceDefinition<client.Scope, {
                        list: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentEvent>;
                        create: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentEvent>;
                    }, {}, {
                        endpoints: {
                            get: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentEvent>;
                            delete: f.EndpointDefinition<client.Scope, number, void>;
                            update: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentEvent>;
                        };
                    }>;
                };
            }>;
            orderRisk: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, number, Shopify.IOrderRisk>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.IOrderRisk>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, number, Shopify.IOrderRisk>;
                    delete: f.EndpointDefinition<client.Scope, number, void>;
                    update: f.EndpointDefinition<client.Scope, any, Shopify.IOrderRisk>;
                };
            }>;
            transaction: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, any, Shopify.ITransaction>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.ITransaction>;
                count: f.EndpointDefinition<client.Scope, number, number>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, any, Shopify.ITransaction>;
                };
            }>;
        };
    }>;
    accessScope: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.IAccessScope>;
    }, {}, {}>;
    apiPermission: f.ResourceDefinition<client.Scope, {}, {}, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
        };
    }>;
    applicationCharge: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IApplicationCharge>;
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateApplicationCharge, Shopify.IApplicationCharge>;
        activate: f.EndpointDefinition<client.Scope, any, Shopify.IApplicationCharge>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IApplicationCharge>;
            activate: f.EndpointDefinition<client.Scope, any, Shopify.IApplicationCharge>;
        };
    }>;
    applicationCredit: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IApplicationCredit>;
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateApplicationCredit, Shopify.IApplicationCredit>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IApplicationCredit>;
        };
    }>;
    balance: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.IBalance>;
        transactions: f.EndpointDefinition<client.Scope, undefined, Shopify.IBalanceTransaction>;
    }, {}, {
        endpoints: {
            transactions: f.EndpointDefinition<client.Scope, undefined, Shopify.IBalanceTransaction>;
        };
    }>;
    blog: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IBlog>;
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateBlog, Shopify.IBlog>;
        count: f.EndpointDefinition<client.Scope, undefined, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IBlog>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IBlog>;
        };
        resources: {
            article: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, any, Shopify.IArticle>;
                create: f.EndpointDefinition<client.Scope, Shopify.ICreateArticle, Shopify.IArticle>;
                count: f.EndpointDefinition<client.Scope, any, number>;
                authors: f.EndpointDefinition<client.Scope, undefined, string>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, any, Shopify.IArticle>;
                    delete: f.EndpointDefinition<client.Scope, number, void>;
                    update: f.EndpointDefinition<client.Scope, Shopify.IUpdateArticle, Shopify.IArticle>;
                    authors: f.EndpointDefinition<client.Scope, undefined, string>;
                    tags: f.EndpointDefinition<client.Scope, any, string>;
                };
            }>;
        };
    }>;
    carrierService: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.ICarrierService>;
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateCarrierService, Shopify.ICarrierService>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, number, Shopify.ICarrierService>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, Shopify.IUpdateCarrierService, Shopify.ICarrierService>;
        };
    }>;
    collect: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.ICollect>;
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateCollect, Shopify.ICollect>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.ICollect>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
        };
    }>;
    collectionListing: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.ICollectionListing>;
        productIds: f.EndpointDefinition<client.Scope, any, unknown> | f.EndpointDefinition<client.Scope, any, any>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.ICollectionListing>;
            productIds: f.EndpointDefinition<client.Scope, any, unknown> | f.EndpointDefinition<client.Scope, any, any>;
        };
    }>;
    comment: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IComment>;
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateComment, Shopify.IComment>;
        spam: f.EndpointDefinition<client.Scope, number, Shopify.IComment>;
        count: f.EndpointDefinition<client.Scope, any, number>;
        notSpam: f.EndpointDefinition<client.Scope, number, Shopify.IComment>;
        approve: f.EndpointDefinition<client.Scope, number, Shopify.IComment>;
        remove: f.EndpointDefinition<client.Scope, number, Shopify.IComment>;
        restore: f.EndpointDefinition<client.Scope, number, Shopify.IComment>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IComment>;
            spam: f.EndpointDefinition<client.Scope, number, Shopify.IComment>;
            update: f.EndpointDefinition<client.Scope, Shopify.IUpdateComment, Shopify.IComment>;
            notSpam: f.EndpointDefinition<client.Scope, number, Shopify.IComment>;
            approve: f.EndpointDefinition<client.Scope, number, Shopify.IComment>;
            remove: f.EndpointDefinition<client.Scope, number, Shopify.IComment>;
            restore: f.EndpointDefinition<client.Scope, number, Shopify.IComment>;
        };
    }>;
    country: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.ICountry>;
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateCountry, Shopify.ICountry>;
        count: f.EndpointDefinition<client.Scope, undefined, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.ICountry>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, Shopify.IUpdateCountry, Shopify.ICountry>;
        };
        resources: {
            province: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, any, Shopify.IProvince>;
                count: f.EndpointDefinition<client.Scope, any, number>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, any, Shopify.IProvince>;
                    update: f.EndpointDefinition<client.Scope, any, Shopify.IProvince>;
                };
            }>;
        };
    }>;
    currency: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.ICurrency>;
    }, {}, {}>;
    customCollection: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.ICustomCollection>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.ICustomCollection>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.ICustomCollection>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.ICustomCollection>;
        };
    }>;
    customerSavedSearch: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerSavedSearch>;
        customers: f.EndpointDefinition<client.Scope, any, unknown> | f.EndpointDefinition<client.Scope, any, any>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerSavedSearch>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerSavedSearch>;
            customers: f.EndpointDefinition<client.Scope, any, unknown> | f.EndpointDefinition<client.Scope, any, any>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerSavedSearch>;
        };
    }>;
    draftOrder: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IDraftOrder>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IDraftOrder>;
        count: f.EndpointDefinition<client.Scope, undefined, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, number, Shopify.IDraftOrder>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IDraftOrder>;
            complete: f.EndpointDefinition<client.Scope, any, Shopify.IDraftOrder>;
            sendInvoice: f.EndpointDefinition<client.Scope, any, unknown> | f.EndpointDefinition<client.Scope, any, any>;
        };
    }>;
    fulfillmentEvent: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentEvent>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentEvent>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentEvent>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentEvent>;
        };
    }>;
    fulfillmentOrder: f.ResourceDefinition<client.Scope, {
        close: f.EndpointDefinition<client.Scope, string | number | undefined, Shopify.IFulfillmentOrder>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentOrder>;
        move: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentOrder>;
        cancel: f.EndpointDefinition<client.Scope, Shopify.IFulfillmentOrder, Shopify.IFulfillmentOrder>;
        locationsForMove: f.EndpointDefinition<client.Scope, number, Shopify.ILocationForMove>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentOrder>;
            close: f.EndpointDefinition<client.Scope, string | number | undefined, Shopify.IFulfillmentOrder>;
            move: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentOrder>;
            cancel: f.EndpointDefinition<client.Scope, Shopify.IFulfillmentOrder, Shopify.IFulfillmentOrder>;
            locationsForMove: f.EndpointDefinition<client.Scope, number, Shopify.ILocationForMove>;
        };
        resources: {
            cancellationRequest: f.ResourceDefinition<client.Scope, {
                reject: f.EndpointDefinition<client.Scope, string | number | undefined, Shopify.IFulfillmentOrder>;
                create: f.EndpointDefinition<client.Scope, string | number | undefined, Shopify.IFulfillmentOrder>;
                accept: f.EndpointDefinition<client.Scope, string | number | undefined, Shopify.IFulfillmentOrder>;
            }, {}, {
                endpoints: {
                    reject: f.EndpointDefinition<client.Scope, string | number | undefined, Shopify.IFulfillmentOrder>;
                    accept: f.EndpointDefinition<client.Scope, string | number | undefined, Shopify.IFulfillmentOrder>;
                };
            }>;
            fulfillmentRequest: f.ResourceDefinition<client.Scope, {
                reject: f.EndpointDefinition<client.Scope, string | number | undefined, Shopify.IFulfillmentOrder>;
                create: f.EndpointDefinition<client.Scope, Shopify.ICreateFulfillmentRequest, Shopify.IFulfillmentOrder>;
                accept: f.EndpointDefinition<client.Scope, string | number | undefined, Shopify.IFulfillmentOrder>;
            }, {}, {
                endpoints: {
                    reject: f.EndpointDefinition<client.Scope, string | number | undefined, Shopify.IFulfillmentOrder>;
                    accept: f.EndpointDefinition<client.Scope, string | number | undefined, Shopify.IFulfillmentOrder>;
                };
            }>;
        };
    }>;
    fulfillmentService: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentService>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentService>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentService>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentService>;
        };
    }>;
    giftCard: f.ResourceDefinition<client.Scope, {
        search: f.EndpointDefinition<client.Scope, any, unknown> | f.EndpointDefinition<client.Scope, any, any>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IGiftCard>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IGiftCard>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        endpoints: {
            search: f.EndpointDefinition<client.Scope, any, unknown> | f.EndpointDefinition<client.Scope, any, any>;
            get: f.EndpointDefinition<client.Scope, number, Shopify.IGiftCard>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IGiftCard>;
            disable: f.EndpointDefinition<client.Scope, number, unknown> | f.EndpointDefinition<client.Scope, number, any>;
        };
        resources: {
            giftCardAdjustment: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, number, Shopify.IGiftCardAdjustment>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.IGiftCardAdjustment>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, number, Shopify.IGiftCardAdjustment>;
                };
            }>;
        };
    }>;
    inventoryItem: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IInventoryItem>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, number, Shopify.IInventoryItem>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IInventoryItem>;
        };
    }>;
    inventoryLevel: f.ResourceDefinition<client.Scope, {
        set: f.EndpointDefinition<client.Scope, any, Shopify.IInventoryLevel>;
        connect: f.EndpointDefinition<client.Scope, any, Shopify.IInventoryLevel>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IInventoryLevel>;
        adjust: f.EndpointDefinition<client.Scope, any, Shopify.IInventoryLevel>;
    }, {}, {
        endpoints: {
            set: f.EndpointDefinition<client.Scope, any, Shopify.IInventoryLevel>;
            connect: f.EndpointDefinition<client.Scope, any, Shopify.IInventoryLevel>;
            delete: f.EndpointDefinition<client.Scope, any, void>;
            adjust: f.EndpointDefinition<client.Scope, any, Shopify.IInventoryLevel>;
        };
    }>;
    marketingEvent: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IMarketingEvent>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IMarketingEvent>;
        count: f.EndpointDefinition<client.Scope, any, number>;
        engagements: f.EndpointDefinition<client.Scope, any, unknown> | f.EndpointDefinition<client.Scope, any, any>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IMarketingEvent>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IMarketingEvent>;
            engagements: f.EndpointDefinition<client.Scope, any, unknown> | f.EndpointDefinition<client.Scope, any, any>;
        };
    }>;
    metafield: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IMetafield>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IMetafield>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IMetafield>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IMetafield>;
        };
    }>;
    policy: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IPolicy>;
    }, {}, {}>;
    priceRule: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IPriceRule>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IPriceRule>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IPriceRule>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IPriceRule>;
        };
        resources: {
            discountCodeCreationJob: f.ResourceDefinition<client.Scope, {
                create: f.EndpointDefinition<client.Scope, any[], Shopify.IDiscountCodeCreation>;
                discountCodes: f.EndpointDefinition<client.Scope, number, any>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, number, Shopify.IDiscountCodeCreation>;
                    discountCodes: f.EndpointDefinition<client.Scope, number, any>;
                };
            }>;
            discountCode: f.ResourceDefinition<client.Scope, {
                lookup: f.EndpointDefinition<client.Scope, any, Shopify.IDiscountCode>;
                list: f.EndpointDefinition<client.Scope, any, Shopify.IDiscountCode>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.IDiscountCode>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, number, Shopify.IDiscountCode>;
                    delete: f.EndpointDefinition<client.Scope, number, void>;
                    update: f.EndpointDefinition<client.Scope, any, Shopify.IDiscountCode>;
                };
            }>;
        };
    }>;
    productListing: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IProductListing>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IProductListing>;
        count: f.EndpointDefinition<client.Scope, undefined, number>;
        productIds: f.EndpointDefinition<client.Scope, any, unknown> | f.EndpointDefinition<client.Scope, any, any>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, number, Shopify.IProductListing>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            productIds: f.EndpointDefinition<client.Scope, any, unknown> | f.EndpointDefinition<client.Scope, any, any>;
        };
    }>;
    resourceFeedback: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.IResourceFeedback>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IResourceFeedback>;
    }, {}, {}>;
    recurringApplicationCharge: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IRecurringApplicationCharge>;
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateRecurringApplicationCharge, Shopify.IRecurringApplicationCharge>;
        activate: f.EndpointDefinition<client.Scope, any, Shopify.IRecurringApplicationCharge>;
        customize: f.EndpointDefinition<client.Scope, any, Shopify.IRecurringApplicationCharge>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IRecurringApplicationCharge>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            activate: f.EndpointDefinition<client.Scope, any, Shopify.IRecurringApplicationCharge>;
            customize: f.EndpointDefinition<client.Scope, any, Shopify.IRecurringApplicationCharge>;
        };
        resources: {
            usageCharge: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, any, Shopify.IUsageCharge>;
                create: f.EndpointDefinition<client.Scope, Shopify.ICreateUsageCharge, Shopify.IUsageCharge>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, any, Shopify.IUsageCharge>;
                };
            }>;
        };
    }>;
    redirect: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IRedirect>;
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateRedirect, Shopify.IRedirect>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IRedirect>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, Shopify.IUpdateRedirect, Shopify.IRedirect>;
        };
    }>;
    report: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IReport>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IReport>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IReport>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IReport>;
        };
    }>;
    scriptTag: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IScriptTag>;
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateScriptTag, Shopify.IScriptTag>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IScriptTag>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, Shopify.IUpdateScriptTag, Shopify.IScriptTag>;
        };
    }>;
    shippingZone: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IShippingZone>;
    }, {}, {}>;
    smartCollection: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.ISmartCollection>;
        products: f.EndpointDefinition<client.Scope, any, Shopify.IProduct>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.ISmartCollection>;
        order: f.EndpointDefinition<client.Scope, any, void>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.ISmartCollection>;
            products: f.EndpointDefinition<client.Scope, any, Shopify.IProduct>;
            order: f.EndpointDefinition<client.Scope, any, void>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.ISmartCollection>;
        };
    }>;
    storefrontAccessToken: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.IStorefrontAccessToken>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IStorefrontAccessToken>;
    }, {}, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, number, void>;
        };
    }>;
    tenderTransaction: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.ITenderTransaction>;
    }, {}, {}>;
    theme: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.ITheme>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.ITheme>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.ITheme>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.ITheme>;
        };
        resources: {
            asset: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, any, Shopify.IAsset>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.IAsset>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, any, Shopify.IAsset>;
                    delete: f.EndpointDefinition<client.Scope, any, void>;
                    update: f.EndpointDefinition<client.Scope, Shopify.IUpdateAsset, Shopify.IAsset>;
                };
            }>;
        };
    }>;
    webhook: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IWebhook>;
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateWebhook, Shopify.IWebhook>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IWebhook>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, Shopify.IUpdateWebhook, Shopify.IWebhook>;
        };
    }>;
}>;
