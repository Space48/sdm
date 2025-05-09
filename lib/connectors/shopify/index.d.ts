import * as client from "./client";
import * as f from "../../framework";
import Shopify from "shopify-api-node";
export declare const shopify: f.Connector<{
    shopName: string;
    credentials: {
        apiKey: string;
        password: string;
    };
}, client.Scope, {
    product: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, any, Shopify.IProduct>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IProduct>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, Record<string, never>, {
        resources: {
            productImage: f.ResourceDefinition<client.Scope, {
                create: f.EndpointDefinition<client.Scope, any, Shopify.IProductImage>;
                list: f.EndpointDefinition<client.Scope, any, Shopify.IProductImage>;
                delete: f.EndpointDefinition<client.Scope, number, void>;
                get: f.EndpointDefinition<client.Scope, number, Shopify.IProductImage>;
                count: f.EndpointDefinition<client.Scope, any, number>;
                update: f.EndpointDefinition<client.Scope, number, Shopify.IProductImage>;
            }, Record<string, never>, {
                endpoints: {
                    create: f.EndpointDefinition<client.Scope, undefined, Shopify.IProductImage>;
                    list: f.EndpointDefinition<client.Scope, undefined, Shopify.IProductImage>;
                    delete: f.EndpointDefinition<client.Scope, undefined, void>;
                    get: f.EndpointDefinition<client.Scope, any, Shopify.IProductImage>;
                    count: f.EndpointDefinition<client.Scope, undefined, number>;
                    update: f.EndpointDefinition<client.Scope, any, Shopify.IProductImage>;
                };
            }>;
            productVariant: f.ResourceDefinition<client.Scope, {
                create: f.EndpointDefinition<client.Scope, any, Shopify.IProductVariant>;
                list: f.EndpointDefinition<client.Scope, any, Shopify.IProductVariant>;
                delete: f.EndpointDefinition<client.Scope, number, void>;
                get: f.EndpointDefinition<client.Scope, any, Shopify.IProductVariant>;
                count: f.EndpointDefinition<client.Scope, undefined, number>;
                update: f.EndpointDefinition<client.Scope, any, Shopify.IProductVariant>;
            }, Record<string, never>, {
                endpoints: {
                    create: f.EndpointDefinition<client.Scope, undefined, Shopify.IProductVariant>;
                    list: f.EndpointDefinition<client.Scope, undefined, Shopify.IProductVariant>;
                    delete: f.EndpointDefinition<client.Scope, undefined, void>;
                    get: f.EndpointDefinition<client.Scope, undefined, Shopify.IProductVariant>;
                    count: f.EndpointDefinition<client.Scope, undefined, number>;
                    update: f.EndpointDefinition<client.Scope, undefined, Shopify.IProductVariant>;
                };
            }>;
            productResourceFeedback: f.ResourceDefinition<client.Scope, {
                create: f.EndpointDefinition<client.Scope, undefined, Shopify.IResourceFeedback>;
                list: f.EndpointDefinition<client.Scope, undefined, Shopify.IResourceFeedback>;
            }, Record<string, never>, {
                endpoints: {
                    create: f.EndpointDefinition<client.Scope, undefined, Shopify.IResourceFeedback>;
                    list: f.EndpointDefinition<client.Scope, undefined, Shopify.IResourceFeedback>;
                };
            }>;
        };
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.IProduct>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IProduct>;
        };
    }>;
    accessScope: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.IAccessScope>;
    }, Record<string, never>, {}>;
    apiPermission: f.ResourceDefinition<client.Scope, {}, Record<string, never>, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
        };
    }>;
    applicationCharge: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateApplicationCharge, Shopify.IApplicationCharge>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IApplicationCharge>;
        activate: f.EndpointDefinition<client.Scope, number, Shopify.IApplicationCharge>;
    }, Record<string, never>, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IApplicationCharge>;
            activate: f.EndpointDefinition<client.Scope, any, Shopify.IApplicationCharge>;
        };
    }>;
    applicationCredit: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateApplicationCredit, Shopify.IApplicationCredit>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IApplicationCredit>;
    }, Record<string, never>, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IApplicationCredit>;
        };
    }>;
    balance: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.IBalance>;
        transactions: f.EndpointDefinition<client.Scope, undefined, Shopify.IBalanceTransaction>;
    }, Record<string, never>, {
        endpoints: {
            transactions: f.EndpointDefinition<client.Scope, undefined, Shopify.IBalanceTransaction>;
        };
    }>;
    blog: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateBlog, Shopify.IBlog>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IBlog>;
        count: f.EndpointDefinition<client.Scope, undefined, number>;
    }, Record<string, never>, {
        resources: {
            article: f.ResourceDefinition<client.Scope, {
                create: f.EndpointDefinition<client.Scope, Shopify.ICreateArticle, Shopify.IArticle>;
                list: f.EndpointDefinition<client.Scope, any, Shopify.IArticle>;
                count: f.EndpointDefinition<client.Scope, any, number>;
                authors: f.EndpointDefinition<client.Scope, undefined, string>;
            }, Record<string, never>, {
                endpoints: {
                    delete: f.EndpointDefinition<client.Scope, undefined, void>;
                    get: f.EndpointDefinition<client.Scope, any, Shopify.IArticle>;
                    update: f.EndpointDefinition<client.Scope, Shopify.IUpdateArticle, Shopify.IArticle>;
                    authors: f.EndpointDefinition<client.Scope, undefined, string>;
                    tags: f.EndpointDefinition<client.Scope, undefined, string>;
                };
            }>;
        };
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.IBlog>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IBlog>;
        };
    }>;
    carrierService: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateCarrierService, Shopify.ICarrierService>;
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.ICarrierService>;
    }, Record<string, never>, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.ICarrierService>;
            update: f.EndpointDefinition<client.Scope, Shopify.IUpdateCarrierService, Shopify.ICarrierService>;
        };
    }>;
    checkout: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, any, Shopify.ICheckout>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.ICheckout>;
        count: f.EndpointDefinition<client.Scope, any, number>;
        complete: f.EndpointDefinition<client.Scope, string, unknown> | f.EndpointDefinition<client.Scope, string, any>;
        shippingRates: f.EndpointDefinition<client.Scope, string, unknown> | f.EndpointDefinition<client.Scope, string, any>;
    }, Record<string, never>, {
        resources: {
            payment: f.ResourceDefinition<client.Scope, {
                create: f.EndpointDefinition<client.Scope, any, any> | f.EndpointDefinition<client.Scope, any, unknown>;
                list: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
                get: f.EndpointDefinition<client.Scope, number, unknown> | f.EndpointDefinition<client.Scope, number, any>;
                count: f.EndpointDefinition<client.Scope, undefined, number>;
            }, Record<string, never>, {
                endpoints: {
                    create: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
                    list: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
                    get: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
                    count: f.EndpointDefinition<client.Scope, undefined, number>;
                };
            }>;
        };
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.ICheckout>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.ICheckout>;
            complete: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
            shippingRates: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
        };
    }>;
    collect: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateCollect, Shopify.ICollect>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.ICollect>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.ICollect>;
        };
    }>;
    collectionListing: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.ICollectionListing>;
        productIds: f.EndpointDefinition<client.Scope, number, unknown> | f.EndpointDefinition<client.Scope, number, any>;
    }, Record<string, never>, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.ICollectionListing>;
            productIds: f.EndpointDefinition<client.Scope, any, any> | f.EndpointDefinition<client.Scope, any, unknown>;
        };
    }>;
    collection: f.ResourceDefinition<client.Scope, {}, Record<string, never>, {
        endpoints: {
            products: f.EndpointDefinition<client.Scope, any, Shopify.IProduct>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.ICollection>;
        };
    }>;
    comment: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateComment, Shopify.IComment>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IComment>;
        count: f.EndpointDefinition<client.Scope, any, number>;
        spam: f.EndpointDefinition<client.Scope, number, Shopify.IComment>;
        notSpam: f.EndpointDefinition<client.Scope, number, Shopify.IComment>;
        approve: f.EndpointDefinition<client.Scope, number, Shopify.IComment>;
        remove: f.EndpointDefinition<client.Scope, number, Shopify.IComment>;
        restore: f.EndpointDefinition<client.Scope, number, Shopify.IComment>;
    }, Record<string, never>, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, any, Shopify.IComment>;
            update: f.EndpointDefinition<client.Scope, Shopify.IUpdateComment, Shopify.IComment>;
            spam: f.EndpointDefinition<client.Scope, undefined, Shopify.IComment>;
            notSpam: f.EndpointDefinition<client.Scope, undefined, Shopify.IComment>;
            approve: f.EndpointDefinition<client.Scope, undefined, Shopify.IComment>;
            remove: f.EndpointDefinition<client.Scope, undefined, Shopify.IComment>;
            restore: f.EndpointDefinition<client.Scope, undefined, Shopify.IComment>;
        };
    }>;
    country: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateCountry, Shopify.ICountry>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.ICountry>;
        count: f.EndpointDefinition<client.Scope, undefined, number>;
    }, Record<string, never>, {
        resources: {
            province: f.ResourceDefinition<client.Scope, {
                list: f.EndpointDefinition<client.Scope, any, Shopify.IProvince>;
                get: f.EndpointDefinition<client.Scope, number, Shopify.IProvince>;
                count: f.EndpointDefinition<client.Scope, any, number>;
                update: f.EndpointDefinition<client.Scope, number, Shopify.IProvince>;
            }, Record<string, never>, {
                endpoints: {
                    list: f.EndpointDefinition<client.Scope, undefined, Shopify.IProvince>;
                    get: f.EndpointDefinition<client.Scope, any, Shopify.IProvince>;
                    count: f.EndpointDefinition<client.Scope, undefined, number>;
                    update: f.EndpointDefinition<client.Scope, any, Shopify.IProvince>;
                };
            }>;
        };
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.ICountry>;
            update: f.EndpointDefinition<client.Scope, Shopify.IUpdateCountry, Shopify.ICountry>;
        };
    }>;
    currency: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.ICurrency>;
    }, Record<string, never>, {}>;
    customCollection: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, any, Shopify.ICustomCollection>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.ICustomCollection>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.ICustomCollection>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.ICustomCollection>;
        };
    }>;
    customerSavedSearch: f.ResourceDefinition<client.Scope, {
        customers: f.EndpointDefinition<client.Scope, number, unknown> | f.EndpointDefinition<client.Scope, number, any>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerSavedSearch>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerSavedSearch>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            customers: f.EndpointDefinition<client.Scope, any, any> | f.EndpointDefinition<client.Scope, any, unknown>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerSavedSearch>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerSavedSearch>;
        };
    }>;
    customer: f.ResourceDefinition<client.Scope, {
        search: f.EndpointDefinition<client.Scope, any, any> | f.EndpointDefinition<client.Scope, any, unknown>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.ICustomer>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.ICustomer>;
        count: f.EndpointDefinition<client.Scope, any, number>;
        accountActivationUrl: f.EndpointDefinition<client.Scope, number, unknown> | f.EndpointDefinition<client.Scope, number, any>;
    }, Record<string, never>, {
        resources: {
            customerAddress: f.ResourceDefinition<client.Scope, {
                create: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerAddress>;
                list: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerAddress>;
                set: f.EndpointDefinition<client.Scope, any, any> | f.EndpointDefinition<client.Scope, any, unknown>;
            }, Record<string, never>, {
                endpoints: {
                    default: f.EndpointDefinition<client.Scope, undefined, Shopify.ICustomerAddress>;
                    delete: f.EndpointDefinition<client.Scope, undefined, void>;
                    get: f.EndpointDefinition<client.Scope, undefined, Shopify.ICustomerAddress>;
                    update: f.EndpointDefinition<client.Scope, any, Shopify.ICustomerAddress>;
                };
            }>;
        };
        endpoints: {
            search: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
            orders: f.EndpointDefinition<client.Scope, any, Shopify.IOrder>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.ICustomer>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.ICustomer>;
            accountActivationUrl: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
        };
    }>;
    dispute: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IDispute>;
    }, Record<string, never>, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IDispute>;
        };
    }>;
    draftOrder: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, any, Shopify.IDraftOrder>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IDraftOrder>;
        count: f.EndpointDefinition<client.Scope, undefined, number>;
    }, Record<string, never>, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IDraftOrder>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IDraftOrder>;
            complete: f.EndpointDefinition<client.Scope, any, Shopify.IDraftOrder>;
            sendInvoice: f.EndpointDefinition<client.Scope, any, any> | f.EndpointDefinition<client.Scope, any, unknown>;
        };
    }>;
    fulfillmentEvent: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentEvent>;
        list: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentEvent>;
    }, Record<string, never>, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, number, void>;
            get: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentEvent>;
            update: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentEvent>;
        };
    }>;
    fulfillmentOrder: f.ResourceDefinition<client.Scope, {
        close: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentOrder>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentOrder>;
        cancel: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentOrder>;
        move: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentOrder>;
        locationsForMove: f.EndpointDefinition<client.Scope, number, Shopify.ILocationForMove>;
    }, Record<string, never>, {
        resources: {
            cancellationRequest: f.ResourceDefinition<client.Scope, {
                create: f.EndpointDefinition<client.Scope, string | undefined, Shopify.IFulfillmentOrder>;
                accept: f.EndpointDefinition<client.Scope, string | undefined, Shopify.IFulfillmentOrder>;
                reject: f.EndpointDefinition<client.Scope, string | undefined, Shopify.IFulfillmentOrder>;
            }, Record<string, never>, {
                endpoints: {
                    create: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentOrder>;
                    accept: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentOrder>;
                    reject: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentOrder>;
                };
            }>;
            fulfillmentRequest: f.ResourceDefinition<client.Scope, {
                create: f.EndpointDefinition<client.Scope, Shopify.ICreateFulfillmentRequest, Shopify.IFulfillmentOrder>;
                accept: f.EndpointDefinition<client.Scope, string | undefined, Shopify.IFulfillmentOrder>;
                reject: f.EndpointDefinition<client.Scope, string | undefined, Shopify.IFulfillmentOrder>;
            }, Record<string, never>, {
                endpoints: {
                    create: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentOrder>;
                    accept: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentOrder>;
                    reject: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentOrder>;
                };
            }>;
        };
        endpoints: {
            close: f.EndpointDefinition<client.Scope, string | undefined, Shopify.IFulfillmentOrder>;
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentOrder>;
            cancel: f.EndpointDefinition<client.Scope, Shopify.IFulfillmentOrder, Shopify.IFulfillmentOrder>;
            move: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentOrder>;
            locationsForMove: f.EndpointDefinition<client.Scope, undefined, Shopify.ILocationForMove>;
        };
    }>;
    fulfillmentService: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentService>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentService>;
    }, Record<string, never>, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentService>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentService>;
        };
    }>;
    giftCard: f.ResourceDefinition<client.Scope, {
        search: f.EndpointDefinition<client.Scope, any, any> | f.EndpointDefinition<client.Scope, any, unknown>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.IGiftCard>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IGiftCard>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, Record<string, never>, {
        resources: {
            giftCardAdjustment: f.ResourceDefinition<client.Scope, {
                create: f.EndpointDefinition<client.Scope, any, Shopify.IGiftCardAdjustment>;
                list: f.EndpointDefinition<client.Scope, undefined, Shopify.IGiftCardAdjustment>;
                get: f.EndpointDefinition<client.Scope, number, Shopify.IGiftCardAdjustment>;
            }, Record<string, never>, {
                endpoints: {
                    create: f.EndpointDefinition<client.Scope, undefined, Shopify.IGiftCardAdjustment>;
                    list: f.EndpointDefinition<client.Scope, undefined, Shopify.IGiftCardAdjustment>;
                    get: f.EndpointDefinition<client.Scope, undefined, Shopify.IGiftCardAdjustment>;
                };
            }>;
        };
        endpoints: {
            search: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IGiftCard>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IGiftCard>;
            disable: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
        };
    }>;
    inventoryItem: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IInventoryItem>;
    }, Record<string, never>, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IInventoryItem>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IInventoryItem>;
        };
    }>;
    inventoryLevel: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IInventoryLevel>;
        set: f.EndpointDefinition<client.Scope, any, Shopify.IInventoryLevel>;
        adjust: f.EndpointDefinition<client.Scope, any, Shopify.IInventoryLevel>;
        connect: f.EndpointDefinition<client.Scope, any, Shopify.IInventoryLevel>;
    }, Record<string, never>, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            adjust: f.EndpointDefinition<client.Scope, undefined, Shopify.IInventoryLevel>;
            connect: f.EndpointDefinition<client.Scope, undefined, Shopify.IInventoryLevel>;
        };
    }>;
    location: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.ILocation>;
        count: f.EndpointDefinition<client.Scope, undefined, number>;
    }, Record<string, never>, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.ILocation>;
            inventoryLevels: f.EndpointDefinition<client.Scope, any, Shopify.IInventoryLevel>;
        };
    }>;
    marketingEvent: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, any, Shopify.IMarketingEvent>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IMarketingEvent>;
        count: f.EndpointDefinition<client.Scope, any, number>;
        engagements: f.EndpointDefinition<client.Scope, number, unknown> | f.EndpointDefinition<client.Scope, number, any>;
    }, Record<string, never>, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.IMarketingEvent>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IMarketingEvent>;
            engagements: f.EndpointDefinition<client.Scope, any, any> | f.EndpointDefinition<client.Scope, any, unknown>;
        };
    }>;
    metafield: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, any, Shopify.IMetafield>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IMetafield>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.IMetafield>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IMetafield>;
        };
    }>;
    order: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, any, Shopify.IOrder>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IOrder>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, Record<string, never>, {
        resources: {
            fulfillment: f.ResourceDefinition<client.Scope, {
                create: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillment>;
                list: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillment>;
                count: f.EndpointDefinition<client.Scope, any, number>;
                updateTracking: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillment>;
            }, Record<string, never>, {
                resources: {
                    fulfillmentEvent: f.ResourceDefinition<client.Scope, {
                        create: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentEvent>;
                        list: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentEvent>;
                        delete: f.EndpointDefinition<client.Scope, number, void>;
                        get: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentEvent>;
                        update: f.EndpointDefinition<client.Scope, number, Shopify.IFulfillmentEvent>;
                    }, Record<string, never>, {
                        endpoints: {
                            create: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentEvent>;
                            list: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentEvent>;
                            delete: f.EndpointDefinition<client.Scope, undefined, void>;
                            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentEvent>;
                            update: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillmentEvent>;
                        };
                    }>;
                };
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillment>;
                    update: f.EndpointDefinition<client.Scope, any, Shopify.IFulfillment>;
                    complete: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillment>;
                    cancel: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillment>;
                    open: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillment>;
                    createV2: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillment>;
                    updateTracking: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillment>;
                };
            }>;
            orderRisk: f.ResourceDefinition<client.Scope, {
                create: f.EndpointDefinition<client.Scope, any, Shopify.IOrderRisk>;
                list: f.EndpointDefinition<client.Scope, undefined, Shopify.IOrderRisk>;
            }, Record<string, never>, {
                endpoints: {
                    delete: f.EndpointDefinition<client.Scope, undefined, void>;
                    get: f.EndpointDefinition<client.Scope, undefined, Shopify.IOrderRisk>;
                    update: f.EndpointDefinition<client.Scope, any, Shopify.IOrderRisk>;
                };
            }>;
            refund: f.ResourceDefinition<client.Scope, {
                create: f.EndpointDefinition<client.Scope, any, Shopify.IRefund>;
                list: f.EndpointDefinition<client.Scope, any, Shopify.IRefund>;
                calculate: f.EndpointDefinition<client.Scope, any, any> | f.EndpointDefinition<client.Scope, any, unknown>;
            }, Record<string, never>, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, any, Shopify.IRefund>;
                };
            }>;
            transaction: f.ResourceDefinition<client.Scope, {
                create: f.EndpointDefinition<client.Scope, any, Shopify.ITransaction>;
                list: f.EndpointDefinition<client.Scope, any, Shopify.ITransaction>;
                count: f.EndpointDefinition<client.Scope, undefined, number>;
            }, Record<string, never>, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, any, Shopify.ITransaction>;
                };
            }>;
        };
        endpoints: {
            close: f.EndpointDefinition<client.Scope, undefined, Shopify.IOrder>;
            delete: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.IOrder>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IOrder>;
            cancel: f.EndpointDefinition<client.Scope, any, Shopify.IOrder>;
            open: f.EndpointDefinition<client.Scope, undefined, Shopify.IOrder>;
            fulfillmentOrders: f.EndpointDefinition<client.Scope, undefined, Shopify.IFulfillmentOrder>;
        };
    }>;
    page: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, any, Shopify.IPage>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IPage>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.IPage>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IPage>;
        };
    }>;
    payout: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IPayout>;
    }, Record<string, never>, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IPayout>;
        };
    }>;
    policy: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IPolicy>;
    }, Record<string, never>, {}>;
    priceRule: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, any, Shopify.IPriceRule>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IPriceRule>;
    }, Record<string, never>, {
        resources: {
            discountCodeCreationJob: f.ResourceDefinition<client.Scope, {
                create: f.EndpointDefinition<client.Scope, any[], Shopify.IDiscountCodeCreation>;
                discountCodes: f.EndpointDefinition<client.Scope, number, any>;
            }, Record<string, never>, {
                endpoints: {
                    get: f.EndpointDefinition<client.Scope, undefined, Shopify.IDiscountCodeCreation>;
                    discountCodes: f.EndpointDefinition<client.Scope, undefined, any>;
                };
            }>;
            discountCode: f.ResourceDefinition<client.Scope, {
                create: f.EndpointDefinition<client.Scope, any, Shopify.IDiscountCode>;
                list: f.EndpointDefinition<client.Scope, any, Shopify.IDiscountCode>;
                lookup: f.EndpointDefinition<client.Scope, undefined, Shopify.IDiscountCode>;
            }, Record<string, never>, {
                endpoints: {
                    delete: f.EndpointDefinition<client.Scope, undefined, void>;
                    get: f.EndpointDefinition<client.Scope, undefined, Shopify.IDiscountCode>;
                    update: f.EndpointDefinition<client.Scope, any, Shopify.IDiscountCode>;
                };
            }>;
        };
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.IPriceRule>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IPriceRule>;
        };
    }>;
    productListing: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, number, Shopify.IProductListing>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IProductListing>;
        count: f.EndpointDefinition<client.Scope, undefined, number>;
        productIds: f.EndpointDefinition<client.Scope, any, any> | f.EndpointDefinition<client.Scope, any, unknown>;
    }, Record<string, never>, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IProductListing>;
            productIds: f.EndpointDefinition<client.Scope, undefined, unknown> | f.EndpointDefinition<client.Scope, undefined, any>;
        };
    }>;
    resourceFeedback: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, any, Shopify.IResourceFeedback>;
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.IResourceFeedback>;
    }, Record<string, never>, {}>;
    recurringApplicationCharge: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateRecurringApplicationCharge, Shopify.IRecurringApplicationCharge>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IRecurringApplicationCharge>;
        activate: f.EndpointDefinition<client.Scope, number, Shopify.IRecurringApplicationCharge>;
        customize: f.EndpointDefinition<client.Scope, number, Shopify.IRecurringApplicationCharge>;
    }, Record<string, never>, {
        resources: {
            usageCharge: f.ResourceDefinition<client.Scope, {
                create: f.EndpointDefinition<client.Scope, Shopify.ICreateUsageCharge, Shopify.IUsageCharge>;
                list: f.EndpointDefinition<client.Scope, any, Shopify.IUsageCharge>;
                get: f.EndpointDefinition<client.Scope, number, Shopify.IUsageCharge>;
            }, Record<string, never>, {
                endpoints: {
                    create: f.EndpointDefinition<client.Scope, undefined, Shopify.IUsageCharge>;
                    list: f.EndpointDefinition<client.Scope, undefined, Shopify.IUsageCharge>;
                    get: f.EndpointDefinition<client.Scope, any, Shopify.IUsageCharge>;
                };
            }>;
        };
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.IRecurringApplicationCharge>;
            activate: f.EndpointDefinition<client.Scope, any, Shopify.IRecurringApplicationCharge>;
            customize: f.EndpointDefinition<client.Scope, any, Shopify.IRecurringApplicationCharge>;
        };
    }>;
    redirect: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateRedirect, Shopify.IRedirect>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IRedirect>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.IRedirect>;
            update: f.EndpointDefinition<client.Scope, Shopify.IUpdateRedirect, Shopify.IRedirect>;
        };
    }>;
    report: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, any, Shopify.IReport>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IReport>;
    }, Record<string, never>, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.IReport>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.IReport>;
        };
    }>;
    scriptTag: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateScriptTag, Shopify.IScriptTag>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IScriptTag>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.IScriptTag>;
            update: f.EndpointDefinition<client.Scope, Shopify.IUpdateScriptTag, Shopify.IScriptTag>;
        };
    }>;
    shippingZone: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.IShippingZone>;
    }, Record<string, never>, {}>;
    shop: f.ResourceDefinition<client.Scope, {}, Record<string, never>, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IShop>;
        };
    }>;
    smartCollection: f.ResourceDefinition<client.Scope, {
        products: f.EndpointDefinition<client.Scope, number, Shopify.IProduct>;
        create: f.EndpointDefinition<client.Scope, any, Shopify.ISmartCollection>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.ISmartCollection>;
        count: f.EndpointDefinition<client.Scope, any, number>;
        order: f.EndpointDefinition<client.Scope, number, void>;
    }, Record<string, never>, {
        endpoints: {
            products: f.EndpointDefinition<client.Scope, any, Shopify.IProduct>;
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.ISmartCollection>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.ISmartCollection>;
            order: f.EndpointDefinition<client.Scope, any, void>;
        };
    }>;
    storefrontAccessToken: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, any, Shopify.IStorefrontAccessToken>;
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.IStorefrontAccessToken>;
    }, Record<string, never>, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
        };
    }>;
    tenderTransaction: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, any, Shopify.ITenderTransaction>;
    }, Record<string, never>, {}>;
    theme: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, any, Shopify.ITheme>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.ITheme>;
    }, Record<string, never>, {
        resources: {
            asset: f.ResourceDefinition<client.Scope, {
                create: f.EndpointDefinition<client.Scope, any, Shopify.IAsset>;
                list: f.EndpointDefinition<client.Scope, any, Shopify.IAsset>;
                delete: f.EndpointDefinition<client.Scope, any, void>;
                get: f.EndpointDefinition<client.Scope, any, Shopify.IAsset>;
                update: f.EndpointDefinition<client.Scope, Shopify.IUpdateAsset, Shopify.IAsset>;
            }, Record<string, never>, {
                endpoints: {
                    create: f.EndpointDefinition<client.Scope, undefined, Shopify.IAsset>;
                    list: f.EndpointDefinition<client.Scope, undefined, Shopify.IAsset>;
                    delete: f.EndpointDefinition<client.Scope, undefined, void>;
                    get: f.EndpointDefinition<client.Scope, undefined, Shopify.IAsset>;
                    update: f.EndpointDefinition<client.Scope, undefined, Shopify.IAsset>;
                };
            }>;
        };
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.ITheme>;
            update: f.EndpointDefinition<client.Scope, any, Shopify.ITheme>;
        };
    }>;
    user: f.ResourceDefinition<client.Scope, {
        list: f.EndpointDefinition<client.Scope, undefined, Shopify.IUser>;
        current: f.EndpointDefinition<client.Scope, undefined, Shopify.IUser>;
    }, Record<string, never>, {
        endpoints: {
            get: f.EndpointDefinition<client.Scope, undefined, Shopify.IUser>;
        };
    }>;
    webhook: f.ResourceDefinition<client.Scope, {
        create: f.EndpointDefinition<client.Scope, Shopify.ICreateWebhook, Shopify.IWebhook>;
        list: f.EndpointDefinition<client.Scope, any, Shopify.IWebhook>;
        count: f.EndpointDefinition<client.Scope, any, number>;
    }, Record<string, never>, {
        endpoints: {
            delete: f.EndpointDefinition<client.Scope, undefined, void>;
            get: f.EndpointDefinition<client.Scope, any, Shopify.IWebhook>;
            update: f.EndpointDefinition<client.Scope, Shopify.IUpdateWebhook, Shopify.IWebhook>;
        };
    }>;
}>;
