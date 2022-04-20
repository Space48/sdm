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
    location: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.ILocation>;
        count: f.EndpointDefinition<client.Scope, undefined, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.ILocation>;
            inventoryLevels: f.EndpointDefinition<client.Scope, any, Shopify.IInventoryLevel>;
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
            spam: f.EndpointDefinition<client.Scope, undefined, Shopify.IComment>;
            update: f.EndpointDefinition<client.Scope, Shopify.IUpdateComment, Shopify.IComment>;
            notSpam: f.EndpointDefinition<client.Scope, undefined, Shopify.IComment>;
            approve: f.EndpointDefinition<client.Scope, undefined, Shopify.IComment>;
            remove: f.EndpointDefinition<client.Scope, undefined, Shopify.IComment>;
            restore: f.EndpointDefinition<client.Scope, undefined, Shopify.IComment>;
        };
    }>;
    product: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IProduct>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IProduct>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        resources: {
            productImage: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, any, Shopify.IProductImage>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.IProductImage>;
                count: f.EndpointDefinition<client.Scope, any, number>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, any, Shopify.IProductImage>;
                    delete: f.EndpointDefinition<client.Scope, undefined, void>;
                    update: f.EndpointDefinition<client.Scope, any, Shopify.IProductImage>;
                };
            }>;
            productVariant: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, any, Shopify.IProductVariant>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.IProductVariant>;
                count: f.EndpointDefinition<client.Scope, undefined, number>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, undefined, Shopify.IProductVariant>;
                    delete: f.EndpointDefinition<client.Scope, undefined, void>;
                    update: f.EndpointDefinition<client.Scope, undefined, Shopify.IProductVariant>;
                };
            }>;
            productResourceFeedback: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, undefined, Shopify.IResourceFeedback>;
                create: f.EndpointDefinition<client.Scope, undefined, Shopify.IResourceFeedback>;
            }, {}, {}>;
        };
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IProduct>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IProduct>;
        };
    }>;
    customer: f.ResourceDefinition<client.Scope, {
        search: f.EndpointDefinition<client.Scope, any, Shopify.ICustomer>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.ICustomer>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.ICustomer>;
        count: f.EndpointDefinition<client.Scope, any, number>;
        accountActivationUrl: f.EndpointDefinition<client.Scope, number, unknown> | f.EndpointDefinition<client.Scope, number, any>;
    }, {}, {
        resources: {
            customerAddress: f.ResourceDefinition<client.Scope, {
                set: f.EndpointDefinition<client.Scope, any, any> | f.EndpointDefinition<client.Scope, any, unknown>;
                list: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerAddress>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerAddress>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, undefined, Shopify.ICustomerAddress>;
                    default: f.EndpointDefinition<client.Scope, undefined, Shopify.ICustomerAddress>;
                    delete: f.EndpointDefinition<client.Scope, undefined, void>;
                    update: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerAddress>;
                };
            }>;
        };
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.ICustomer>;
            search: f.EndpointDefinition<client.Scope, undefined, Shopify.ICustomer>;
            orders: f.EndpointDefinition<client.Scope, any, Shopify.IOrder>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.ICustomer>;
            accountActivationUrl: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
            sendInvite: f.EndpointDefinition<client.Scope, Shopify.ICustomerSendInvite | undefined, Shopify.ICustomerSendInvite>;
        };
    }>;
    dispute: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IDispute>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IDispute>;
        };
    }>;
    payout: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IPayout>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IPayout>;
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
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IPage>;
        };
    }>;
    shop: f.ResourceDefinition<client.Scope, {}, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IShop>;
        };
    }>;
    checkout: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.ICheckout>;
        complete: f.EndpointDefinition<client.Scope, string, unknown> | f.EndpointDefinition<client.Scope, string, any>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.ICheckout>;
        count: f.EndpointDefinition<client.Scope, any, number>;
        shippingRates: f.EndpointDefinition<client.Scope, string, unknown> | f.EndpointDefinition<client.Scope, string, any>;
    }, {}, {
        resources: {
            payment: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
                create: f.EndpointDefinition<client.Scope, any, any> | f.EndpointDefinition<client.Scope, any, unknown>;
                count: f.EndpointDefinition<client.Scope, undefined, number>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
                };
            }>;
        };
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.ICheckout>;
            complete: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.ICheckout>;
            shippingRates: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
        };
    }>;
    order: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IOrder>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IOrder>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        resources: {
            refund: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, any, Shopify.IRefund>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.IRefund>;
                calculate: f.EndpointDefinition<client.Scope, any, any> | f.EndpointDefinition<client.Scope, any, unknown>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, any, Shopify.IRefund>;
                };
            }>;
            fulfillment: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillment>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillment>;
                count: f.EndpointDefinition<client.Scope, any, number>;
                updateTracking: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillment>;
            }, {}, {
                resources: {
                    fulfillmentEvent: f.ResourceDefinition<client.Scope, {
                        list: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentEvent>;
                        create: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentEvent>;
                    }, {}, {
                        endpoints: {
                            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentEvent>;
                            delete: f.EndpointDefinition<client.Scope, undefined, void>;
                            update: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentEvent>;
                        };
                    }>;
                };
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillment>;
                    open: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillment>;
                    complete: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillment>;
                    cancel: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillment>;
                    update: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillment>;
                    createV2: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillment>;
                    updateTracking: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillment>;
                };
            }>;
            orderRisk: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, undefined, Shopify.IOrderRisk>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.IOrderRisk>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, undefined, Shopify.IOrderRisk>;
                    delete: f.EndpointDefinition<client.Scope, undefined, void>;
                    update: f.EndpointDefinition<client.Scope, any, Shopify.IOrderRisk>;
                };
            }>;
            transaction: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, any, Shopify.ITransaction>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.ITransaction>;
                count: f.EndpointDefinition<client.Scope, undefined, number>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, any, Shopify.ITransaction>;
                };
            }>;
        };
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IOrder>;
            close: f.EndpointDefinition<client.Scope, undefined, Shopify.IOrder>;
            open: f.EndpointDefinition<client.Scope, undefined, Shopify.IOrder>;
            cancel: f.EndpointDefinition<client.Scope, any, Shopify.IOrder>;
            delete: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IOrder>;
            fulfillmentOrders: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentOrder>;
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
        activate: f.EndpointDefinition<client.Scope, number, Shopify.IApplicationCharge>;
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
        transactions: f.EndpointDefinition<client.Scope, any, Shopify.IBalanceTransaction>;
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
        resources: {
            article: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, any, Shopify.IArticle>;
                create: f.EndpointDefinition<client.Scope, Shopify.ICreateArticle, Shopify.IArticle>;
                count: f.EndpointDefinition<client.Scope, any, number>;
                authors: f.EndpointDefinition<client.Scope, undefined, string>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, any, Shopify.IArticle>;
                    delete: f.EndpointDefinition<client.Scope, undefined, void>;
                    update: f.EndpointDefinition<client.Scope, Shopify.IUpdateArticle, Shopify.IArticle>;
                    authors: f.EndpointDefinition<client.Scope, undefined, string>;
                    tags: f.EndpointDefinition<client.Scope, undefined, string>;
                };
            }>;
        };
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IBlog>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IBlog>;
        };
    }>;
    carrierService: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.ICarrierService>;
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateCarrierService, Shopify.ICarrierService>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.ICarrierService>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
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
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
        };
    }>;
    collectionListing: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.ICollectionListing>;
        productIds: f.EndpointDefinition<client.Scope, number, unknown> | f.EndpointDefinition<client.Scope, number, any>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.ICollectionListing>;
            productIds: f.EndpointDefinition<client.Scope, any, any> | f.EndpointDefinition<client.Scope, any, unknown>;
        };
    }>;
    country: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.ICountry>;
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateCountry, Shopify.ICountry>;
        count: f.EndpointDefinition<client.Scope, undefined, number>;
    }, {}, {
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
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.ICountry>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            update: f.EndpointDefinition<client.Scope, Shopify.IUpdateCountry, Shopify.ICountry>;
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
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.ICustomCollection>;
        };
    }>;
    customerSavedSearch: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerSavedSearch>;
        customers: f.EndpointDefinition<client.Scope, number, unknown> | f.EndpointDefinition<client.Scope, number, any>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerSavedSearch>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerSavedSearch>;
            customers: f.EndpointDefinition<client.Scope, any, any> | f.EndpointDefinition<client.Scope, any, unknown>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerSavedSearch>;
        };
    }>;
    draftOrder: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IDraftOrder>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IDraftOrder>;
        count: f.EndpointDefinition<client.Scope, undefined, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IDraftOrder>;
            complete: f.EndpointDefinition<client.Scope, any, Shopify.IDraftOrder>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IDraftOrder>;
            sendInvoice: f.EndpointDefinition<client.Scope, any, any> | f.EndpointDefinition<client.Scope, any, unknown>;
        };
    }>;
    fulfillmentEvent: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentEvent>;
        create: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentEvent>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentEvent>;
            delete: f.EndpointDefinition<client.Scope, number, void>;
            update: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentEvent>;
        };
    }>;
    fulfillmentOrder: f.ResourceDefinition<client.Scope, {
        close: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentOrder>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentOrder>;
        move: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentOrder>;
        cancel: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentOrder>;
        locationsForMove: f.EndpointDefinition<client.Scope, number, Shopify.ILocationForMove>;
    }, {}, {
        resources: {
            cancellationRequest: f.ResourceDefinition<client.Scope, {
                reject: f.EndpointDefinition<client.Scope, string | undefined, Shopify.IFulfillmentOrder>;
                create: f.EndpointDefinition<client.Scope, string | undefined, Shopify.IFulfillmentOrder>;
                accept: f.EndpointDefinition<client.Scope, string | undefined, Shopify.IFulfillmentOrder>;
            }, {}, {
                endpoints: {
                    reject: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentOrder>;
                    accept: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentOrder>;
                };
            }>;
            fulfillmentRequest: f.ResourceDefinition<client.Scope, {
                reject: f.EndpointDefinition<client.Scope, string | undefined, Shopify.IFulfillmentOrder>;
                create: f.EndpointDefinition<client.Scope, Shopify.ICreateFulfillmentRequest, Shopify.IFulfillmentOrder>;
                accept: f.EndpointDefinition<client.Scope, string | undefined, Shopify.IFulfillmentOrder>;
            }, {}, {
                endpoints: {
                    reject: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentOrder>;
                    accept: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentOrder>;
                };
            }>;
        };
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentOrder>;
            close: f.EndpointDefinition<client.Scope, string | undefined, Shopify.IFulfillmentOrder>;
            move: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentOrder>;
            cancel: f.EndpointDefinition<client.Scope, Shopify.IFulfillmentOrder, Shopify.IFulfillmentOrder>;
            locationsForMove: f.EndpointDefinition<client.Scope, undefined, Shopify.ILocationForMove>;
        };
    }>;
    fulfillmentService: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentService>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentService>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentService>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentService>;
        };
    }>;
    giftCard: f.ResourceDefinition<client.Scope, {
        search: f.EndpointDefinition<client.Scope, any, Shopify.IGiftCard>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IGiftCard>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IGiftCard>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        resources: {
            giftCardAdjustment: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, undefined, Shopify.IGiftCardAdjustment>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.IGiftCardAdjustment>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, undefined, Shopify.IGiftCardAdjustment>;
                };
            }>;
        };
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IGiftCard>;
            search: f.EndpointDefinition<client.Scope, undefined, Shopify.IGiftCard>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IGiftCard>;
            disable: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
        };
    }>;
    inventoryItem: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IInventoryItem>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IInventoryItem>;
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
            connect: f.EndpointDefinition<client.Scope, undefined, Shopify.IInventoryLevel>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            adjust: f.EndpointDefinition<client.Scope, undefined, Shopify.IInventoryLevel>;
        };
    }>;
    marketingEvent: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IMarketingEvent>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IMarketingEvent>;
        count: f.EndpointDefinition<client.Scope, any, number>;
        engagements: f.EndpointDefinition<client.Scope, number, unknown> | f.EndpointDefinition<client.Scope, number, any>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IMarketingEvent>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IMarketingEvent>;
            engagements: f.EndpointDefinition<client.Scope, any, any> | f.EndpointDefinition<client.Scope, any, unknown>;
        };
    }>;
    metafield: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IMetafield>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IMetafield>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IMetafield>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
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
        resources: {
            discountCodeCreationJob: f.ResourceDefinition<client.Scope, {
                create: f.EndpointDefinition<client.Scope, any[], Shopify.IDiscountCodeCreation>;
                discountCodes: f.EndpointDefinition<client.Scope, number, any>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, undefined, Shopify.IDiscountCodeCreation>;
                    discountCodes: f.EndpointDefinition<client.Scope, undefined, any>;
                };
            }>;
            discountCode: f.ResourceDefinition<client.Scope, {
                lookup: f.EndpointDefinition<client.Scope, undefined, Shopify.IDiscountCode>;
                list: f.EndpointDefinition<client.Scope, any, Shopify.IDiscountCode>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.IDiscountCode>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, undefined, Shopify.IDiscountCode>;
                    delete: f.EndpointDefinition<client.Scope, undefined, void>;
                    update: f.EndpointDefinition<client.Scope, any, Shopify.IDiscountCode>;
                };
            }>;
        };
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IPriceRule>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IPriceRule>;
        };
    }>;
    productListing: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IProductListing>;
        create: f.EndpointDefinition<client.Scope, number, Shopify.IProductListing>;
        count: f.EndpointDefinition<client.Scope, undefined, number>;
        productIds: f.EndpointDefinition<client.Scope, any, any> | f.EndpointDefinition<client.Scope, any, unknown>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IProductListing>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            productIds: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
        };
    }>;
    resourceFeedback: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.IResourceFeedback>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IResourceFeedback>;
    }, {}, {}>;
    recurringApplicationCharge: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IRecurringApplicationCharge>;
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateRecurringApplicationCharge, Shopify.IRecurringApplicationCharge>;
        activate: f.EndpointDefinition<client.Scope, number, Shopify.IRecurringApplicationCharge>;
        customize: f.EndpointDefinition<client.Scope, number, Shopify.IRecurringApplicationCharge>;
    }, {}, {
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
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IRecurringApplicationCharge>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            activate: f.EndpointDefinition<client.Scope, any, Shopify.IRecurringApplicationCharge>;
            customize: f.EndpointDefinition<client.Scope, any, Shopify.IRecurringApplicationCharge>;
        };
    }>;
    redirect: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IRedirect>;
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateRedirect, Shopify.IRedirect>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IRedirect>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            update: f.EndpointDefinition<client.Scope, Shopify.IUpdateRedirect, Shopify.IRedirect>;
        };
    }>;
    report: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IReport>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IReport>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IReport>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
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
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            update: f.EndpointDefinition<client.Scope, Shopify.IUpdateScriptTag, Shopify.IScriptTag>;
        };
    }>;
    shippingZone: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IShippingZone>;
    }, {}, {}>;
    smartCollection: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.ISmartCollection>;
        products: f.EndpointDefinition<client.Scope, number, Shopify.IProduct>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.ISmartCollection>;
        order: f.EndpointDefinition<client.Scope, number, void>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.ISmartCollection>;
            products: f.EndpointDefinition<client.Scope, any, Shopify.IProduct>;
            order: f.EndpointDefinition<client.Scope, any, void>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.ISmartCollection>;
        };
    }>;
    storefrontAccessToken: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.IStorefrontAccessToken>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IStorefrontAccessToken>;
    }, {}, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
        };
    }>;
    tenderTransaction: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.ITenderTransaction>;
    }, {}, {}>;
    theme: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.ITheme>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.ITheme>;
    }, {}, {
        resources: {
            asset: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, any, Shopify.IAsset>;
                create: f.EndpointDefinition<client.Scope, any, Shopify.IAsset>;
            }, {}, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, undefined, Shopify.IAsset>;
                    delete: f.EndpointDefinition<client.Scope, undefined, void>;
                    update: f.EndpointDefinition<client.Scope, undefined, Shopify.IAsset>;
                };
            }>;
        };
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.ITheme>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.ITheme>;
        };
    }>;
    user: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.IUser>;
        current: f.EndpointDefinition<client.Scope, undefined, Shopify.IUser>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IUser>;
        };
    }>;
    webhook: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IWebhook>;
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateWebhook, Shopify.IWebhook>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, {}, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IWebhook>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            update: f.EndpointDefinition<client.Scope, Shopify.IUpdateWebhook, Shopify.IWebhook>;
        };
    }>;
}>;
