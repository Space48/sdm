"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceDefinitions = void 0;
const connector_generator_1 = require("./connector-generator");
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
exports.resourceDefinitions = connector_generator_1.computeResourceDefinitions({
    applicationCharge: false,
    blog: {
        resources: {
            article: {
                endpoints: {
                    authors: false,
                    tags: {
                        target: 'document',
                        type: 'map',
                    },
                },
            },
        },
    },
    balance: false,
    checkout: false,
    collection: {
        endpoints: {
            products: {
                target: 'document',
                type: 'flatMap',
            },
        },
    },
    collectionListing: {
        endpoints: {
            productIds: false,
        }
    },
    comment: false,
    customer: {
        endpoints: {
            accountActivationUrl: false,
            orders: {
                target: 'document',
                type: 'map',
            },
            search: false,
            sendInvite: {
                target: 'document',
                type: 'map',
            },
        },
        resources: {
            customerAddress: {
                endpoints: {
                    default: {
                        target: 'document',
                        type: 'map',
                    },
                    set: {
                        target: 'resource',
                        type: 'map',
                    },
                },
            },
        },
    },
    customerSavedSearch: false,
    draftOrder: {
        endpoints: {
            complete: {
                target: 'document',
                type: 'map',
            },
            sendInvoice: {
                target: 'document',
                type: 'map',
            },
        },
    },
    fulfillmentOrder: false,
    giftCard: {
        endpoints: {
            disable: {
                target: 'document',
                type: 'map',
            },
            search: false,
        }
    },
    inventoryLevel: {
        endpoints: {
            adjust: false,
            connect: false,
            set: false,
        },
    },
    location: {
        endpoints: {
            inventoryLevels: {
                target: 'document',
                type: 'flatMap',
            },
        },
    },
    marketingEvent: false,
    order: {
        endpoints: {
            cancel: {
                target: 'document',
                type: 'map',
            },
            close: {
                target: 'document',
                type: 'map',
            },
            fulfillmentOrders: {
                target: 'document',
                type: 'map',
            },
            list: {
                params: { status: "any" },
            },
            open: {
                target: 'document',
                type: 'map',
            },
        },
        resources: {
            fulfillment: {
                endpoints: {
                    cancel: {
                        target: 'document',
                        type: 'map',
                    },
                    createV2: {
                        target: 'document',
                        type: 'map',
                    },
                    complete: {
                        target: 'document',
                        type: 'map',
                    },
                    open: {
                        target: 'document',
                        type: 'map',
                    },
                    updateTracking: false,
                },
            },
            refund: {
                endpoints: {
                    calculate: {
                        target: 'resource',
                        type: 'map',
                    },
                },
            },
        },
    },
    priceRule: {
        resources: {
            discountCode: {
                endpoints: {
                    lookup: {
                        target: 'resource',
                        type: 'map',
                    },
                },
            },
            discountCodeCreationJob: false,
        },
    },
    productListing: {
        endpoints: {
            productIds: false,
        },
    },
    recurringApplicationCharge: false,
    shop: {
        endpoints: {
            get: {
                target: 'resource',
            },
        },
    },
    smartCollection: {
        endpoints: {
            order: false,
            products: false,
        },
    },
    user: {
        endpoints: {
            current: {
                target: 'resource',
                type: 'map',
            },
        },
    },
});
