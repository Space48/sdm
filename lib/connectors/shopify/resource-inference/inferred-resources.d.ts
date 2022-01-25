declare const _default: {
    readonly accessScope: {
        readonly key: "accessScope";
        readonly endpoints: readonly ["list"];
        readonly children: {};
    };
    readonly apiPermission: {
        readonly key: "apiPermission";
        readonly endpoints: readonly ["delete"];
        readonly children: {};
    };
    readonly applicationCharge: {
        readonly key: "applicationCharge";
        readonly endpoints: readonly ["create", "get", "list", "activate"];
        readonly children: {};
    };
    readonly applicationCredit: {
        readonly key: "applicationCredit";
        readonly endpoints: readonly ["create", "get", "list"];
        readonly children: {};
    };
    readonly balance: {
        readonly key: "balance";
        readonly endpoints: readonly ["list", "transactions"];
        readonly children: {};
    };
    readonly blog: {
        readonly key: "blog";
        readonly endpoints: readonly ["count", "create", "delete", "get", "list", "update"];
        readonly children: {
            readonly article: {
                readonly key: "article";
                readonly endpoints: readonly ["count", "create", "delete", "get", "list", "update", "authors", "tags"];
                readonly children: {};
            };
        };
    };
    readonly carrierService: {
        readonly key: "carrierService";
        readonly endpoints: readonly ["create", "delete", "get", "list", "update"];
        readonly children: {};
    };
    readonly checkout: {
        readonly key: "checkout";
        readonly endpoints: readonly ["count", "create", "get", "list", "update", "complete", "shippingRates"];
        readonly children: {
            readonly payment: {
                readonly key: "payment";
                readonly endpoints: readonly ["count", "create", "get", "list"];
                readonly children: {};
            };
        };
    };
    readonly collect: {
        readonly key: "collect";
        readonly endpoints: readonly ["count", "create", "delete", "get", "list"];
        readonly children: {};
    };
    readonly collectionListing: {
        readonly key: "collectionListing";
        readonly endpoints: readonly ["get", "list", "productIds"];
        readonly children: {};
    };
    readonly collection: {
        readonly key: "collection";
        readonly endpoints: readonly ["get", "products"];
        readonly children: {};
    };
    readonly comment: {
        readonly key: "comment";
        readonly endpoints: readonly ["count", "create", "get", "list", "update", "spam", "notSpam", "approve", "remove", "restore"];
        readonly children: {};
    };
    readonly country: {
        readonly key: "country";
        readonly endpoints: readonly ["count", "create", "delete", "get", "list", "update"];
        readonly children: {
            readonly province: {
                readonly key: "province";
                readonly endpoints: readonly ["count", "get", "list", "update"];
                readonly children: {};
            };
        };
    };
    readonly currency: {
        readonly key: "currency";
        readonly endpoints: readonly ["list"];
        readonly children: {};
    };
    readonly customCollection: {
        readonly key: "customCollection";
        readonly endpoints: readonly ["count", "create", "delete", "get", "list", "update"];
        readonly children: {};
    };
    readonly customerSavedSearch: {
        readonly key: "customerSavedSearch";
        readonly endpoints: readonly ["count", "create", "delete", "get", "list", "update", "customers"];
        readonly children: {};
    };
    readonly customer: {
        readonly key: "customer";
        readonly endpoints: readonly ["count", "create", "delete", "get", "list", "update", "search", "accountActivationUrl", "sendInvite", "orders"];
        readonly children: {
            readonly customerAddress: {
                readonly key: "customerAddress";
                readonly endpoints: readonly ["delete", "get", "list", "create", "update", "set", "default"];
                readonly children: {};
            };
        };
    };
    readonly dispute: {
        readonly key: "dispute";
        readonly endpoints: readonly ["get", "list"];
        readonly children: {};
    };
    readonly draftOrder: {
        readonly key: "draftOrder";
        readonly endpoints: readonly ["count", "create", "delete", "get", "list", "update", "complete", "sendInvoice"];
        readonly children: {};
    };
    readonly fulfillmentEvent: {
        readonly key: "fulfillmentEvent";
        readonly endpoints: readonly ["list", "get", "create", "update", "delete"];
        readonly children: {};
    };
    readonly fulfillmentOrder: {
        readonly key: "fulfillmentOrder";
        readonly endpoints: readonly ["get", "list", "cancel", "close", "move", "locationsForMove"];
        readonly children: {
            readonly cancellationRequest: {
                readonly key: "cancellationRequest";
                readonly endpoints: readonly ["create", "accept", "reject"];
                readonly children: {};
            };
            readonly fulfillmentRequest: {
                readonly key: "fulfillmentRequest";
                readonly endpoints: readonly ["create", "accept", "reject"];
                readonly children: {};
            };
        };
    };
    readonly fulfillmentService: {
        readonly key: "fulfillmentService";
        readonly endpoints: readonly ["create", "delete", "get", "list", "update"];
        readonly children: {};
    };
    readonly giftCard: {
        readonly key: "giftCard";
        readonly endpoints: readonly ["count", "create", "get", "list", "update", "disable", "search"];
        readonly children: {
            readonly giftCardAdjustment: {
                readonly key: "giftCardAdjustment";
                readonly endpoints: readonly ["create", "get", "list"];
                readonly children: {};
            };
        };
    };
    readonly inventoryItem: {
        readonly key: "inventoryItem";
        readonly endpoints: readonly ["get", "list", "update"];
        readonly children: {};
    };
    readonly inventoryLevel: {
        readonly key: "inventoryLevel";
        readonly endpoints: readonly ["list", "adjust", "connect", "delete", "set"];
        readonly children: {};
    };
    readonly location: {
        readonly key: "location";
        readonly endpoints: readonly ["count", "get", "list", "inventoryLevels"];
        readonly children: {};
    };
    readonly marketingEvent: {
        readonly key: "marketingEvent";
        readonly endpoints: readonly ["count", "create", "delete", "get", "list", "update", "engagements"];
        readonly children: {};
    };
    readonly metafield: {
        readonly key: "metafield";
        readonly endpoints: readonly ["count", "create", "delete", "get", "list", "update"];
        readonly children: {};
    };
    readonly order: {
        readonly key: "order";
        readonly endpoints: readonly ["count", "create", "delete", "get", "list", "update", "close", "open", "cancel", "fulfillmentOrders"];
        readonly children: {
            readonly fulfillment: {
                readonly key: "fulfillment";
                readonly endpoints: readonly ["count", "create", "get", "list", "update", "complete", "open", "cancel", "createV2", "updateTracking"];
                readonly children: {
                    readonly fulfillmentEvent: {
                        readonly key: "fulfillmentEvent";
                        readonly endpoints: readonly ["list", "get", "create", "update", "delete"];
                        readonly children: {};
                    };
                };
            };
            readonly orderRisk: {
                readonly key: "orderRisk";
                readonly endpoints: readonly ["create", "delete", "get", "list", "update"];
                readonly children: {};
            };
            readonly refund: {
                readonly key: "refund";
                readonly endpoints: readonly ["create", "get", "list", "calculate"];
                readonly children: {};
            };
            readonly transaction: {
                readonly key: "transaction";
                readonly endpoints: readonly ["count", "create", "get", "list"];
                readonly children: {};
            };
        };
    };
    readonly page: {
        readonly key: "page";
        readonly endpoints: readonly ["count", "create", "delete", "get", "list", "update"];
        readonly children: {};
    };
    readonly payout: {
        readonly key: "payout";
        readonly endpoints: readonly ["get", "list"];
        readonly children: {};
    };
    readonly policy: {
        readonly key: "policy";
        readonly endpoints: readonly ["list"];
        readonly children: {};
    };
    readonly priceRule: {
        readonly key: "priceRule";
        readonly endpoints: readonly ["create", "delete", "get", "list", "update"];
        readonly children: {
            readonly discountCodeCreationJob: {
                readonly key: "discountCodeCreationJob";
                readonly endpoints: readonly ["get", "create", "discountCodes"];
                readonly children: {};
            };
            readonly discountCode: {
                readonly key: "discountCode";
                readonly endpoints: readonly ["create", "delete", "get", "list", "update", "lookup"];
                readonly children: {};
            };
        };
    };
    readonly productListing: {
        readonly key: "productListing";
        readonly endpoints: readonly ["count", "delete", "get", "list", "create", "productIds"];
        readonly children: {};
    };
    readonly product: {
        readonly key: "product";
        readonly endpoints: readonly ["delete", "count", "get", "create", "list", "update"];
        readonly children: {
            readonly productImage: {
                readonly key: "productImage";
                readonly endpoints: readonly ["count", "create", "delete", "get", "list", "update"];
                readonly children: {};
            };
            readonly productResourceFeedback: {
                readonly key: "resourceFeedback";
                readonly endpoints: readonly ["create", "list"];
                readonly children: {};
            };
            readonly productVariant: {
                readonly key: "productVariant";
                readonly endpoints: readonly ["count", "delete", "get", "create", "list", "update"];
                readonly children: {};
            };
        };
    };
    readonly recurringApplicationCharge: {
        readonly key: "recurringApplicationCharge";
        readonly endpoints: readonly ["create", "delete", "get", "list", "activate", "customize"];
        readonly children: {
            readonly usageCharge: {
                readonly key: "usageCharge";
                readonly endpoints: readonly ["create", "get", "list"];
                readonly children: {};
            };
        };
    };
    readonly redirect: {
        readonly key: "redirect";
        readonly endpoints: readonly ["count", "create", "delete", "get", "list", "update"];
        readonly children: {};
    };
    readonly report: {
        readonly key: "report";
        readonly endpoints: readonly ["create", "delete", "get", "list", "update"];
        readonly children: {};
    };
    readonly resourceFeedback: {
        readonly key: "resourceFeedback";
        readonly endpoints: readonly ["create", "list"];
        readonly children: {};
    };
    readonly scriptTag: {
        readonly key: "scriptTag";
        readonly endpoints: readonly ["count", "create", "delete", "get", "list", "update"];
        readonly children: {};
    };
    readonly shippingZone: {
        readonly key: "shippingZone";
        readonly endpoints: readonly ["list"];
        readonly children: {};
    };
    readonly shop: {
        readonly key: "shop";
        readonly endpoints: readonly ["get"];
        readonly children: {};
    };
    readonly smartCollection: {
        readonly key: "smartCollection";
        readonly endpoints: readonly ["count", "create", "delete", "get", "list", "update", "order", "products"];
        readonly children: {};
    };
    readonly storefrontAccessToken: {
        readonly key: "storefrontAccessToken";
        readonly endpoints: readonly ["create", "delete", "list"];
        readonly children: {};
    };
    readonly tenderTransaction: {
        readonly key: "tenderTransaction";
        readonly endpoints: readonly ["list"];
        readonly children: {};
    };
    readonly theme: {
        readonly key: "theme";
        readonly endpoints: readonly ["create", "delete", "get", "list", "update"];
        readonly children: {
            readonly asset: {
                readonly key: "asset";
                readonly endpoints: readonly ["list", "get", "create", "update", "delete"];
                readonly children: {};
            };
        };
    };
    readonly user: {
        readonly key: "user";
        readonly endpoints: readonly ["get", "list", "current"];
        readonly children: {};
    };
    readonly webhook: {
        readonly key: "webhook";
        readonly endpoints: readonly ["count", "create", "delete", "get", "list", "update"];
        readonly children: {};
    };
};
export default _default;
