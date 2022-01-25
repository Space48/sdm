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
exports.magento2 = void 0;
const client_1 = __importStar(require("./client"));
const framework_1 = require("../../framework");
const functions_1 = require("./functions");
const url_1 = require("url");
const ramda_1 = require("ramda");
const mergeResources = framework_1.resourceMerger();
exports.magento2 = framework_1.connector({
    configSchema: client_1.configSchema,
    scopeNameExample: getScopeName('www.my-shop.com'),
    getScopeName: config => getScopeName(config.baseUrl),
    getScope: config => new client_1.default(config),
    getWarningMessage: async (client) => { },
    resources: {
        categories: mergeResources(functions_1.endpoint.crud('categories', {
            idField: 'id',
            list: {
                uri: 'categories/list',
                sortKey: { query: 'entity_id', response: 'id' },
            }
        }), {
            resources: {
                tree: {
                    endpoints: {
                        get: functions_1.endpoint.get('categories?rootCategoryId=1'),
                    },
                },
            }
        }),
        customers: functions_1.endpoint.crud('customers', {
            idField: 'id',
            list: {
                uri: 'customers/search',
                sortKey: { query: 'entity_id', response: 'id' },
            },
        }),
        orders: {
            endpoints: {
                list: functions_1.endpoint.list('orders', { query: 'entity_id', response: 'entity_id' }),
            },
            documents: ramda_1.omit(['create'], functions_1.endpoint.crud('orders', {
                idField: 'id',
                list: {
                    idField: 'entity_id',
                    sortKey: { query: 'entity_id', response: 'entity_id' },
                },
            }).documents),
        },
        products: mergeResources(functions_1.endpoint.crud('products', {
            idField: 'sku',
            list: {
                sortKey: { query: 'entity_id', response: 'id' },
            },
        }), {
            documents: {
                resources: {
                    links: {
                        documents: {
                            idField: 'type',
                            endpoints: {
                                get: functions_1.endpoint.get('products/{sku}/links/{type}'),
                            },
                        },
                    },
                },
            },
            resources: {
                attributes: mergeResources(functions_1.endpoint.crud('products/attributes', {
                    idField: 'attribute_id',
                    list: {
                        sortKey: { query: 'attribute_id', response: 'attribute_id' },
                    },
                }), {
                    documents: {
                        idField: 'attribute_code',
                        resources: {
                            options: {
                                endpoints: {
                                    get: functions_1.endpoint.get('products/attributes/{attributeCode}/options'),
                                },
                            },
                        },
                    },
                }),
                attributeGroups: functions_1.endpoint.crud('products/attribute-sets/groups', {
                    idField: 'group_id',
                    list: {
                        uri: 'products/attribute-sets/groups/list',
                        sortKey: { query: 'attribute_set_id', response: 'attribute_set_id' }
                    }
                }),
                attributeSets: mergeResources(functions_1.endpoint.crud('products/attribute-sets', {
                    idField: 'attribute_set_id',
                    list: {
                        uri: 'products/attribute-sets/sets/list',
                        sortKey: { query: 'attribute_set_id', response: 'attribute_set_id' },
                    },
                }), {
                    documents: {
                        resources: {
                            attributes: {
                                documents: {
                                    idField: 'attribute_code',
                                    endpoints: {
                                        get: functions_1.endpoint.get('products/attribute-sets/{attributeSetId}/attributes/{attributeCode}'),
                                        delete: functions_1.endpoint.del('products/attribute-sets/{attributeSetId}/attributes/{attributeCode}'),
                                    },
                                },
                            },
                            groups: {
                                endpoints: {
                                    put: functions_1.endpoint.update('products/attribute-sets/{attributeSetId}/groups')
                                }
                            }
                        },
                    },
                }),
                configurables: {
                    documents: {
                        idField: 'sku',
                        resources: {
                            children: {
                                endpoints: {
                                    get: functions_1.endpoint.get('configurable-products/{sku}/children'),
                                },
                            },
                            options: {
                                endpoints: {
                                    get: functions_1.endpoint.get('configurable-products/{sku}/options/all'),
                                },
                            },
                        }
                    },
                }
            },
        }),
    },
});
function getScopeName(storeBaseUrl) {
    const { host, path } = url_1.parse(storeBaseUrl);
    return `${host || ''}${path}`.replace(/\/$/, '').toLowerCase();
}
