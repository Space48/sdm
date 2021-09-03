"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "accessScope": {
        "key": "accessScope",
        "endpoints": [
            "list"
        ],
        "children": {}
    },
    "apiPermission": {
        "key": "apiPermission",
        "endpoints": [
            "delete"
        ],
        "children": {}
    },
    "applicationCharge": {
        "key": "applicationCharge",
        "endpoints": [
            "create",
            "get",
            "list",
            "activate"
        ],
        "children": {}
    },
    "applicationCredit": {
        "key": "applicationCredit",
        "endpoints": [
            "create",
            "get",
            "list"
        ],
        "children": {}
    },
    "balance": {
        "key": "balance",
        "endpoints": [
            "list",
            "transactions"
        ],
        "children": {}
    },
    "blog": {
        "key": "blog",
        "endpoints": [
            "count",
            "create",
            "delete",
            "get",
            "list",
            "update"
        ],
        "children": {
            "article": {
                "key": "article",
                "endpoints": [
                    "count",
                    "create",
                    "delete",
                    "get",
                    "list",
                    "update",
                    "authors",
                    "tags"
                ],
                "children": {}
            }
        }
    },
    "carrierService": {
        "key": "carrierService",
        "endpoints": [
            "create",
            "delete",
            "get",
            "list",
            "update"
        ],
        "children": {}
    },
    "checkout": {
        "key": "checkout",
        "endpoints": [
            "count",
            "create",
            "get",
            "list",
            "update",
            "complete",
            "shippingRates"
        ],
        "children": {
            "payment": {
                "key": "payment",
                "endpoints": [
                    "count",
                    "create",
                    "get",
                    "list"
                ],
                "children": {}
            }
        }
    },
    "collect": {
        "key": "collect",
        "endpoints": [
            "count",
            "create",
            "delete",
            "get",
            "list"
        ],
        "children": {}
    },
    "collectionListing": {
        "key": "collectionListing",
        "endpoints": [
            "get",
            "list",
            "productIds"
        ],
        "children": {}
    },
    "collection": {
        "key": "collection",
        "endpoints": [
            "get",
            "products"
        ],
        "children": {}
    },
    "comment": {
        "key": "comment",
        "endpoints": [
            "count",
            "create",
            "get",
            "list",
            "update",
            "spam",
            "notSpam",
            "approve",
            "remove",
            "restore"
        ],
        "children": {}
    },
    "country": {
        "key": "country",
        "endpoints": [
            "count",
            "create",
            "delete",
            "get",
            "list",
            "update"
        ],
        "children": {
            "province": {
                "key": "province",
                "endpoints": [
                    "count",
                    "get",
                    "list",
                    "update"
                ],
                "children": {}
            }
        }
    },
    "currency": {
        "key": "currency",
        "endpoints": [
            "list"
        ],
        "children": {}
    },
    "customCollection": {
        "key": "customCollection",
        "endpoints": [
            "count",
            "create",
            "delete",
            "get",
            "list",
            "update"
        ],
        "children": {}
    },
    "customerSavedSearch": {
        "key": "customerSavedSearch",
        "endpoints": [
            "count",
            "create",
            "delete",
            "get",
            "list",
            "update",
            "customers"
        ],
        "children": {}
    },
    "customer": {
        "key": "customer",
        "endpoints": [
            "count",
            "create",
            "delete",
            "get",
            "list",
            "update",
            "search",
            "accountActivationUrl",
            "sendInvite",
            "orders"
        ],
        "children": {
            "customerAddress": {
                "key": "customerAddress",
                "endpoints": [
                    "delete",
                    "get",
                    "list",
                    "create",
                    "update",
                    "set",
                    "default"
                ],
                "children": {}
            }
        }
    },
    "dispute": {
        "key": "dispute",
        "endpoints": [
            "get",
            "list"
        ],
        "children": {}
    },
    "draftOrder": {
        "key": "draftOrder",
        "endpoints": [
            "count",
            "create",
            "delete",
            "get",
            "list",
            "update",
            "complete",
            "sendInvoice"
        ],
        "children": {}
    },
    "fulfillmentEvent": {
        "key": "fulfillmentEvent",
        "endpoints": [
            "list",
            "get",
            "create",
            "update",
            "delete"
        ],
        "children": {}
    },
    "fulfillmentOrder": {
        "key": "fulfillmentOrder",
        "endpoints": [
            "get",
            "list",
            "cancel",
            "close",
            "move",
            "locationsForMove"
        ],
        "children": {
            "cancellationRequest": {
                "key": "cancellationRequest",
                "endpoints": [
                    "create",
                    "accept",
                    "reject"
                ],
                "children": {}
            },
            "fulfillmentRequest": {
                "key": "fulfillmentRequest",
                "endpoints": [
                    "create",
                    "accept",
                    "reject"
                ],
                "children": {}
            }
        }
    },
    "fulfillmentService": {
        "key": "fulfillmentService",
        "endpoints": [
            "create",
            "delete",
            "get",
            "list",
            "update"
        ],
        "children": {}
    },
    "giftCard": {
        "key": "giftCard",
        "endpoints": [
            "count",
            "create",
            "get",
            "list",
            "update",
            "disable",
            "search"
        ],
        "children": {
            "giftCardAdjustment": {
                "key": "giftCardAdjustment",
                "endpoints": [
                    "create",
                    "get",
                    "list"
                ],
                "children": {}
            }
        }
    },
    "inventoryItem": {
        "key": "inventoryItem",
        "endpoints": [
            "get",
            "list",
            "update"
        ],
        "children": {}
    },
    "inventoryLevel": {
        "key": "inventoryLevel",
        "endpoints": [
            "list",
            "adjust",
            "connect",
            "delete",
            "set"
        ],
        "children": {}
    },
    "location": {
        "key": "location",
        "endpoints": [
            "count",
            "get",
            "list",
            "inventoryLevels"
        ],
        "children": {}
    },
    "marketingEvent": {
        "key": "marketingEvent",
        "endpoints": [
            "count",
            "create",
            "delete",
            "get",
            "list",
            "update",
            "engagements"
        ],
        "children": {}
    },
    "metafield": {
        "key": "metafield",
        "endpoints": [
            "count",
            "create",
            "delete",
            "get",
            "list",
            "update"
        ],
        "children": {}
    },
    "order": {
        "key": "order",
        "endpoints": [
            "count",
            "create",
            "delete",
            "get",
            "list",
            "update",
            "close",
            "open",
            "cancel",
            "fulfillmentOrders"
        ],
        "children": {
            "fulfillment": {
                "key": "fulfillment",
                "endpoints": [
                    "count",
                    "create",
                    "get",
                    "list",
                    "update",
                    "complete",
                    "open",
                    "cancel",
                    "createV2",
                    "updateTracking"
                ],
                "children": {
                    "fulfillmentEvent": {
                        "key": "fulfillmentEvent",
                        "endpoints": [
                            "list",
                            "get",
                            "create",
                            "update",
                            "delete"
                        ],
                        "children": {}
                    }
                }
            },
            "orderRisk": {
                "key": "orderRisk",
                "endpoints": [
                    "create",
                    "delete",
                    "get",
                    "list",
                    "update"
                ],
                "children": {}
            },
            "refund": {
                "key": "refund",
                "endpoints": [
                    "create",
                    "get",
                    "list",
                    "calculate"
                ],
                "children": {}
            },
            "transaction": {
                "key": "transaction",
                "endpoints": [
                    "count",
                    "create",
                    "get",
                    "list"
                ],
                "children": {}
            }
        }
    },
    "page": {
        "key": "page",
        "endpoints": [
            "count",
            "create",
            "delete",
            "get",
            "list",
            "update"
        ],
        "children": {}
    },
    "payout": {
        "key": "payout",
        "endpoints": [
            "get",
            "list"
        ],
        "children": {}
    },
    "policy": {
        "key": "policy",
        "endpoints": [
            "list"
        ],
        "children": {}
    },
    "priceRule": {
        "key": "priceRule",
        "endpoints": [
            "create",
            "delete",
            "get",
            "list",
            "update"
        ],
        "children": {
            "discountCodeCreationJob": {
                "key": "discountCodeCreationJob",
                "endpoints": [
                    "get",
                    "create",
                    "discountCodes"
                ],
                "children": {}
            },
            "discountCode": {
                "key": "discountCode",
                "endpoints": [
                    "create",
                    "delete",
                    "get",
                    "list",
                    "update",
                    "lookup"
                ],
                "children": {}
            }
        }
    },
    "productListing": {
        "key": "productListing",
        "endpoints": [
            "count",
            "delete",
            "get",
            "list",
            "create",
            "productIds"
        ],
        "children": {}
    },
    "product": {
        "key": "product",
        "endpoints": [
            "delete",
            "count",
            "get",
            "create",
            "list",
            "update"
        ],
        "children": {
            "productImage": {
                "key": "productImage",
                "endpoints": [
                    "count",
                    "create",
                    "delete",
                    "get",
                    "list",
                    "update"
                ],
                "children": {}
            },
            "productResourceFeedback": {
                "key": "resourceFeedback",
                "endpoints": [
                    "create",
                    "list"
                ],
                "children": {}
            },
            "productVariant": {
                "key": "productVariant",
                "endpoints": [
                    "count",
                    "delete",
                    "get",
                    "create",
                    "list",
                    "update"
                ],
                "children": {}
            }
        }
    },
    "recurringApplicationCharge": {
        "key": "recurringApplicationCharge",
        "endpoints": [
            "create",
            "delete",
            "get",
            "list",
            "activate",
            "customize"
        ],
        "children": {
            "usageCharge": {
                "key": "usageCharge",
                "endpoints": [
                    "create",
                    "get",
                    "list"
                ],
                "children": {}
            }
        }
    },
    "redirect": {
        "key": "redirect",
        "endpoints": [
            "count",
            "create",
            "delete",
            "get",
            "list",
            "update"
        ],
        "children": {}
    },
    "report": {
        "key": "report",
        "endpoints": [
            "create",
            "delete",
            "get",
            "list",
            "update"
        ],
        "children": {}
    },
    "resourceFeedback": {
        "key": "resourceFeedback",
        "endpoints": [
            "create",
            "list"
        ],
        "children": {}
    },
    "scriptTag": {
        "key": "scriptTag",
        "endpoints": [
            "count",
            "create",
            "delete",
            "get",
            "list",
            "update"
        ],
        "children": {}
    },
    "shippingZone": {
        "key": "shippingZone",
        "endpoints": [
            "list"
        ],
        "children": {}
    },
    "shop": {
        "key": "shop",
        "endpoints": [
            "get"
        ],
        "children": {}
    },
    "smartCollection": {
        "key": "smartCollection",
        "endpoints": [
            "count",
            "create",
            "delete",
            "get",
            "list",
            "update",
            "order",
            "products"
        ],
        "children": {}
    },
    "storefrontAccessToken": {
        "key": "storefrontAccessToken",
        "endpoints": [
            "create",
            "delete",
            "list"
        ],
        "children": {}
    },
    "tenderTransaction": {
        "key": "tenderTransaction",
        "endpoints": [
            "list"
        ],
        "children": {}
    },
    "theme": {
        "key": "theme",
        "endpoints": [
            "create",
            "delete",
            "get",
            "list",
            "update"
        ],
        "children": {
            "asset": {
                "key": "asset",
                "endpoints": [
                    "list",
                    "get",
                    "create",
                    "update",
                    "delete"
                ],
                "children": {}
            }
        }
    },
    "user": {
        "key": "user",
        "endpoints": [
            "get",
            "list",
            "current"
        ],
        "children": {}
    },
    "webhook": {
        "key": "webhook",
        "endpoints": [
            "count",
            "create",
            "delete",
            "get",
            "list",
            "update"
        ],
        "children": {}
    }
};
