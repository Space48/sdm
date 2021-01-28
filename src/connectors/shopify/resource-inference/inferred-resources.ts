export default {
  "accessScope": {
    "endpoints": [
      "list"
    ],
    "children": {}
  },
  "apiPermission": {
    "endpoints": [
      "delete"
    ],
    "children": {}
  },
  "applicationCharge": {
    "endpoints": [
      "create",
      "get",
      "list",
      "activate"
    ],
    "children": {}
  },
  "applicationCredit": {
    "endpoints": [
      "create",
      "get",
      "list"
    ],
    "children": {}
  },
  "balance": {
    "endpoints": [
      "list",
      "transactions"
    ],
    "children": {}
  },
  "blog": {
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
    "endpoints": [
      "get",
      "list",
      "productIds"
    ],
    "children": {}
  },
  "collection": {
    "endpoints": [
      "get",
      "products"
    ],
    "children": {}
  },
  "comment": {
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
    "endpoints": [
      "list"
    ],
    "children": {}
  },
  "customCollection": {
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
    "endpoints": [
      "get",
      "list"
    ],
    "children": {}
  },
  "draftOrder": {
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
  "event": {
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
        "endpoints": [
          "create",
          "accept",
          "reject"
        ],
        "children": {}
      },
      "fulfillmentRequest": {
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
    "endpoints": [
      "get",
      "list",
      "update"
    ],
    "children": {}
  },
  "inventoryLevel": {
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
    "endpoints": [
      "count",
      "get",
      "list",
      "inventoryLevels"
    ],
    "children": {}
  },
  "marketingEvent": {
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
        "endpoints": [
          "count",
          "create",
          "get",
          "list",
          "update",
          "complete",
          "open",
          "cancel"
        ],
        "children": {
          "fulfillmentEvent": {
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
        "endpoints": [
          "create",
          "get",
          "list",
          "calculate"
        ],
        "children": {}
      },
      "transaction": {
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
    "endpoints": [
      "get",
      "list"
    ],
    "children": {}
  },
  "policy": {
    "endpoints": [
      "list"
    ],
    "children": {}
  },
  "priceRule": {
    "endpoints": [
      "create",
      "delete",
      "get",
      "list",
      "update"
    ],
    "children": {
      "discountCodeCreationJob": {
        "endpoints": [
          "get",
          "create",
          "discountCodes"
        ],
        "children": {}
      },
      "discountCode": {
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
        "endpoints": [
          "create",
          "list"
        ],
        "children": {}
      },
      "productVariant": {
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
    "endpoints": [
      "create",
      "list"
    ],
    "children": {}
  },
  "scriptTag": {
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
    "endpoints": [
      "list"
    ],
    "children": {}
  },
  "shop": {
    "endpoints": [
      "get"
    ],
    "children": {}
  },
  "smartCollection": {
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
    "endpoints": [
      "create",
      "delete",
      "list"
    ],
    "children": {}
  },
  "tenderTransaction": {
    "endpoints": [
      "list"
    ],
    "children": {}
  },
  "theme": {
    "endpoints": [
      "create",
      "delete",
      "get",
      "list",
      "update"
    ],
    "children": {
      "asset": {
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
    "endpoints": [
      "get",
      "list",
      "current"
    ],
    "children": {}
  },
  "webhook": {
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
} as const;