"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceDefinitions = void 0;
const connector_generator_1 = require("./connector-generator");
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
                    complete: {
                        target: 'document',
                        type: 'map',
                    },
                    open: {
                        target: 'document',
                        type: 'map',
                    },
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
