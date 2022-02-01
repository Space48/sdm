"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigCommerce = void 0;
const client_1 = __importStar(require("./client"));
const framework_1 = require("../../framework");
const functions_1 = require("./functions");
const mergeResources = framework_1.resourceMerger();
exports.bigCommerce = framework_1.connector({
    configSchema: client_1.configSchema,
    scopeNameExample: 'some-store-alias',
    getScopeName: config => config.storeAlias,
    getScope: config => new client_1.default(config),
    getWarningMessage: async (client) => {
        try {
            const store = await client.get('v2/store');
            if (store.status === 'live') {
                return `Store is LIVE at ${store.domain}`;
            }
            if (!store.domain.endsWith('.mybigcommerce.com')) {
                return `Store is using custom domain ${store.domain}`;
            }
        }
        catch (_a) {
            return 'Failed to fetch store data from BigCommerce API. This could be a live store.';
        }
    },
    resources: {
        blog: {
            resources: {
                posts: functions_1.endpoint.crud('v2/blog/posts'),
                tags: {
                    endpoints: {
                        list: functions_1.endpoint.list('v2/blog/tags')
                    },
                },
            },
        },
        brands: mergeResources(functions_1.endpoint.crud('v3/catalog/brands'), {
            documents: {
                resources: {
                    image: {
                        endpoints: {
                            create: functions_1.endpoint.create('v3/catalog/brands/{id}/image'),
                            delete: functions_1.endpoint.del('v3/catalog/brands/{id}/image'),
                        },
                    },
                    metafields: functions_1.endpoint.crud('v3/catalog/brands/{id}/metafields'),
                },
            },
        }),
        carts: {
            endpoints: {
                create: functions_1.endpoint.create('v3/carts'),
            },
            documents: {
                endpoints: {
                    delete: functions_1.endpoint.del('v3/carts/{id}'),
                    get: functions_1.endpoint.get('v3/carts/{id}'),
                    update: functions_1.endpoint.update('v3/carts/{id}'),
                },
                resources: {
                    items: {
                        endpoints: {
                            create: functions_1.endpoint.create('v3/carts/{id}/items'),
                        },
                        documents: {
                            endpoints: {
                                delete: functions_1.endpoint.del('v3/carts/{id}'),
                                update: functions_1.endpoint.update('v3/carts/{id}'),
                            },
                        },
                    },
                },
            },
        },
        categories: mergeResources(functions_1.endpoint.crud('v3/catalog/categories'), {
            resources: {
                tree: {
                    endpoints: {
                        get: functions_1.endpoint.get('v3/catalog/categories/tree'),
                    }
                },
            },
            documents: {
                resources: {
                    image: {
                        endpoints: {
                            create: functions_1.endpoint.create('v3/catalog/categories/{id}/image'),
                            delete: functions_1.endpoint.del('v3/catalog/categories/{id}/image'),
                        },
                    },
                    metafields: functions_1.endpoint.crud('v3/catalog/categories/{id}/metafields'),
                },
            },
        }),
        channels: {
            endpoints: {
                create: functions_1.endpoint.create('v3/channel'),
                list: functions_1.endpoint.list('v3/channel'),
            },
            documents: {
                listIds: functions_1.listIds('v3/channel'),
                endpoints: {
                    get: functions_1.endpoint.get('v3/channel/{id}'),
                    update: functions_1.endpoint.update('v3/channel/{id}'),
                },
            },
        },
        customers: mergeResources(functions_1.batch.crud('v3/customers'), {
            resources: {
                addresses: functions_1.batch.crud('v3/customers/addresses'),
                attributes: mergeResources(functions_1.batch.crud('v3/customers/attributes'), {
                    documents: {
                        resources: {
                            values: {
                                endpoints: {
                                    list: functions_1.endpoint.fn('v3/customers/attribute-values', (bcClient, uri, query, [attributeId]) => bcClient.list(uri, {
                                        ...query,
                                        'attribute_id:in': attributeId,
                                    })),
                                },
                            },
                        },
                    },
                    resources: {
                        values: {
                            endpoints: {
                                delete: functions_1.batch.deleteMany('v3/customers/attribute-values'),
                                list: functions_1.endpoint.list('v3/customers/attribute-values'),
                                upsert: functions_1.batch.updateMany('v3/customers/attribute-values'),
                            },
                            documents: {
                                endpoints: {
                                    delete: functions_1.batch.deleteOne('v3/customers/attribute-values'),
                                },
                            },
                        },
                    },
                }),
                formFieldValues: {
                    endpoints: {
                        list: functions_1.endpoint.list('v3/customers/form-field-values'),
                        upsert: functions_1.batch.updateMany('v3/customers/form-field-values')
                    }
                }
            },
        }),
        giftCertificates: functions_1.endpoint.crud('v2/gift_certificates'),
        orders: mergeResources(functions_1.endpoint.crud('v2/orders'), {
            documents: {
                resources: {
                    refunds: {
                        endpoints: {
                            get: functions_1.endpoint.get('v3/orders/{id}/payment_actions/refunds'),
                        },
                    },
                    shippingAddresses: {
                        documents: {
                            endpoints: {
                                get: functions_1.endpoint.get('v2/orders/{id}/shipping_addresses/{shipping_address_id}'),
                                update: functions_1.endpoint.update('v2/orders/{id}/shipping_addresses/{shipping_address_id}'),
                            },
                        },
                        endpoints: {
                            list: functions_1.endpoint.list('v2/orders/{id}/shipping_addresses'),
                        },
                    },
                    products: {
                        endpoints: {
                            list: functions_1.endpoint.list('v2/orders/{id}/products'),
                        },
                        documents: {
                            endpoints: {
                                get: functions_1.endpoint.get('v2/orders/{id}/products/{product_id}'),
                            },
                        },
                    },
                    coupons: {
                        endpoints: {
                            list: functions_1.endpoint.list('v2/orders/{id}/coupons'),
                        }
                    },
                    shipments: {
                        endpoints: {
                            list: functions_1.endpoint.list('v2/orders/{id}/shipments'),
                            create: functions_1.endpoint.create('v2/orders/{id}/shipments'),
                            delete: functions_1.endpoint.del('v2/orders/{id}/shipments'),
                        },
                        documents: {
                            endpoints: {
                                get: functions_1.endpoint.get('v2/orders/{id}/shipments/{shipment_id}'),
                                update: functions_1.endpoint.update('v2/orders/{id}/shipments/{shipment_id}'),
                                delete: functions_1.endpoint.del('v2/orders/{id}/shipments/{shipment_id}'),
                            },
                        },
                    },
                },
            },
            resources: {
                statuses: {
                    endpoints: {
                        list: functions_1.endpoint.fn('v2/order_statuses', async function* (bcClient, uri) {
                            yield* await bcClient.get(uri);
                        }),
                    },
                    documents: {
                        endpoints: {
                            get: functions_1.endpoint.get('v2/order_statuses/{id}'),
                        },
                    },
                },
            },
        }),
        pages: functions_1.endpoint.crud('v2/pages'),
        paymentMethods: {
            endpoints: {
                list: functions_1.endpoint.list('v3/payments/methods'),
            },
        },
        priceLists: mergeResources(functions_1.endpoint.crud('v3/pricelists'), {
            resources: {
                assignments: {
                    endpoints: {
                        create: functions_1.endpoint.create('v3/pricelists/assignments'),
                        list: functions_1.endpoint.list('v3/pricelists/assignments'),
                        delete: functions_1.endpoint.del('v3/pricelists/assignments'),
                    },
                },
            },
            documents: {
                resources: {
                    records: {
                        endpoints: {
                            list: functions_1.endpoint.list('v3/pricelists/{id}/records'),
                            upsert: functions_1.endpoint.update('v3/pricelists/{id}/records'),
                            delete: functions_1.endpoint.del('v3/pricelists/{id}/records'),
                        },
                    },
                },
            },
        }),
        products: mergeResources(functions_1.endpoint.crud('v3/catalog/products'), {
            endpoints: {
                update: functions_1.batch.updateMany('v3/catalog/products'),
            },
            resources: {
                variants: {
                    endpoints: {
                        list: functions_1.endpoint.list('v3/catalog/variants'),
                        update: functions_1.batch.updateMany('v3/catalog/variants'),
                    },
                }
            },
            documents: {
                resources: {
                    bulkPricingRules: functions_1.endpoint.crud('v3/catalog/products/{id}/bulk-pricing-rules'),
                    complexRules: functions_1.endpoint.crud('v3/catalog/products/{id}/complex-rules'),
                    customFields: functions_1.endpoint.crud('v3/catalog/products/{id}/custom-fields'),
                    images: functions_1.endpoint.crud('v3/catalog/products/{id}/images'),
                    metafields: functions_1.endpoint.crud('v3/catalog/products/{id}/metafields'),
                    modifiers: mergeResources(functions_1.endpoint.crud('v3/catalog/products/{id}/modifiers'), {
                        documents: {
                            resources: {
                                values: mergeResources(functions_1.endpoint.crud('v3/catalog/products/{id}/modifiers/{id}/values'), {
                                    documents: {
                                        resources: {
                                            image: {
                                                endpoints: {
                                                    create: functions_1.endpoint.create('v3/catalog/products/{id}/modifiers/{id}/values/{id}/image'),
                                                },
                                                documents: {
                                                    endpoints: {
                                                        delete: functions_1.endpoint.del('v3/catalog/products/{id}/modifiers/{id}/values/{id}/image/{id}'),
                                                    },
                                                },
                                            },
                                        },
                                    },
                                }),
                            }
                        },
                    }),
                    options: mergeResources(functions_1.endpoint.crud('v3/catalog/products/{id}/options'), {
                        documents: {
                            resources: {
                                values: functions_1.endpoint.crud('v3/catalog/products/{id}/options/{id}/values'),
                            }
                        },
                    }),
                    reviews: functions_1.endpoint.crud('v3/catalog/products/{id}/reviews'),
                    variants: mergeResources(functions_1.endpoint.crud('v3/catalog/products/{id}/variants'), {
                        documents: {
                            resources: {
                                metafields: functions_1.endpoint.crud('v3/catalog/products/{id}/variants/{id}/metafields'),
                            },
                        },
                    }),
                    videos: functions_1.endpoint.crud('v3/catalog/products/{id}/videos'),
                },
            },
        }),
        store: {
            endpoints: {
                get: functions_1.endpoint.get('v2/store'),
            },
        },
    },
});
