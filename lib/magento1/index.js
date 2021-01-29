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
const config = __importStar(require("./config"));
const resource_factory_1 = require("./resource-factory");
const resource_1 = require("../resource");
const action_1 = require("../action");
const json_pipe_1 = require("@space48/json-pipe");
const rest_1 = require("./rest");
const soap_1 = require("./soap");
class Magento1Connector {
    constructor(configStore) {
        this.configStore = configStore;
    }
    getConfigActions() {
        return config.getActions(this.configStore.select('credentials'));
    }
    getScopes() {
        const credentialsConfig = this.configStore.select('credentials');
        return config.getBaseUrls(credentialsConfig);
    }
    getScope(baseUrl) {
        const credentialsConfig = this.configStore.select('credentials');
        return new Magento1Scope(baseUrl, credentialsConfig);
    }
    getTypicalResources() {
        return {};
    }
}
exports.default = Magento1Connector;
class Magento1Scope {
    constructor(baseUrl, configStore) {
        this.baseUrl = baseUrl;
        this.configStore = configStore;
    }
    get name() {
        return this.baseUrl;
    }
    async getWarningMessage() {
        return undefined;
    }
    getResources() {
        const instanceConfig = config.getInstanceConfig(this.configStore, this.baseUrl);
        const restClient = instanceConfig && rest_1.createMagento1RestClient(instanceConfig);
        const restResource = restClient && new resource_factory_1.Magento1ResourceFactory(restClient);
        const soapClient = instanceConfig && soap_1.createMagento1SoapClient(instanceConfig);
        return {
            categories: soapClient && {
                docKey: { name: 'entity_id', type: action_1.Field.integer() },
                listDocKeys: async function* () {
                    function* getCategoryIds(category) {
                        const { category_id, children } = category;
                        yield category_id;
                        for (const child of children !== null && children !== void 0 ? children : []) {
                            yield* getCategoryIds(child);
                        }
                    }
                    const root = await soapClient('catalogCategoryTree');
                    yield* getCategoryIds(root);
                },
                endpoints: {
                    get: {
                        scope: resource_1.EndpointScope.Document,
                        cardinality: resource_1.Cardinality.One,
                        fn: ({ docKeys: [categoryId] }) => (soapClient('catalogCategoryInfo', { categoryId, storeView: 'default' })),
                    },
                    list: {
                        scope: resource_1.EndpointScope.Resource,
                        cardinality: resource_1.Cardinality.Many,
                        fn: async function* () {
                            function* getCategories(category) {
                                const { children, ...rest } = category;
                                yield rest;
                                for (const child of children !== null && children !== void 0 ? children : []) {
                                    yield* getCategories(child);
                                }
                            }
                            const root = await soapClient('catalogCategoryTree');
                            yield* getCategories(root);
                        },
                    },
                },
            },
            categoryTree: soapClient && {
                docKey: { name: 'entity_id', type: action_1.Field.integer() },
                endpoints: {
                    get: {
                        scope: resource_1.EndpointScope.Resource,
                        cardinality: resource_1.Cardinality.One,
                        fn: () => (soapClient('catalogCategoryTree')),
                    },
                },
            },
            customers: resource_1.ResourceConfig.merge({
                docKey: { name: 'entity_id', type: action_1.Field.integer() },
            }, restResource === null || restResource === void 0 ? void 0 : restResource.crud('customers', ['addresses']), soapClient && {
                children: {
                    addressesSoap: {
                        endpoints: {
                            get: {
                                scope: resource_1.EndpointScope.Resource,
                                cardinality: resource_1.Cardinality.One,
                                fn: ({ docKeys: [customerId] }) => soapClient('customerAddressList', { customerId }),
                            },
                        },
                    },
                    info: {
                        endpoints: {
                            get: {
                                scope: resource_1.EndpointScope.Resource,
                                cardinality: resource_1.Cardinality.One,
                                fn: ({ docKeys: [customerId] }) => soapClient('customerCustomerInfo', { customerId }),
                            },
                        },
                    },
                },
            }),
            orders: restResource === null || restResource === void 0 ? void 0 : restResource.read('orders', ['addresses', 'comments', 'items']),
            products: resource_1.ResourceConfig.merge({
                docKey: { name: 'entity_id', type: action_1.Field.integer() },
            }, restResource === null || restResource === void 0 ? void 0 : restResource.crud('products', ['categories', 'images', 'websites']), soapClient && {
                children: {
                    info: {
                        endpoints: {
                            get: {
                                scope: resource_1.EndpointScope.Resource,
                                cardinality: resource_1.Cardinality.One,
                                fn: ({ docKeys: [productId] }) => soapClient('catalogProductInfo', { productId }),
                            },
                        },
                    },
                    links: {
                        docKey: { name: 'type', type: action_1.Field.string() },
                        endpoints: {
                            get: {
                                scope: resource_1.EndpointScope.Document,
                                cardinality: resource_1.Cardinality.One,
                                fn: ({ docKeys: [product, type] }) => soapClient('catalogProductLinkList', { product, type }),
                            },
                        },
                    },
                    media: {
                        endpoints: {
                            get: {
                                scope: resource_1.EndpointScope.Resource,
                                cardinality: resource_1.Cardinality.One,
                                fn: ({ docKeys: [productId] }) => soapClient('catalogProductAttributeMediaList', { productId }),
                            },
                        },
                    },
                },
            }),
            productAttributes: soapClient && {
                docKey: { name: 'attribute_id', type: action_1.Field.integer() },
                listDocKeys: json_pipe_1.compose(async function* () {
                    const result = await soapClient('catalogProductAttributeSetList');
                    yield* result !== null && result !== void 0 ? result : [];
                }, json_pipe_1.map(attributeSet => attributeSet.set_id), json_pipe_1.flatMapAsync(async function* (setId) {
                    const result = await soapClient('catalogProductAttributeList', { setId });
                    yield* result !== null && result !== void 0 ? result : [];
                }), json_pipe_1.map(attribute => attribute.attribute_id), json_pipe_1.batch(Number.MAX_SAFE_INTEGER), json_pipe_1.flatMap(attributes => attributes.sort()), json_pipe_1.distinct()),
                endpoints: {
                    get: {
                        scope: resource_1.EndpointScope.Document,
                        cardinality: resource_1.Cardinality.One,
                        fn: ({ docKeys: [attributeId] }) => (soapClient('catalogProductAttributeInfo', { attribute: attributeId })),
                    },
                    list: {
                        scope: resource_1.EndpointScope.Resource,
                        cardinality: resource_1.Cardinality.Many,
                        fn: json_pipe_1.compose(async function* () {
                            const result = await soapClient('catalogProductAttributeSetList');
                            yield* result !== null && result !== void 0 ? result : [];
                        }, json_pipe_1.map(attributeSet => attributeSet.set_id), json_pipe_1.flatMapAsync(async function* (setId) {
                            const result = await soapClient('catalogProductAttributeList', { setId });
                            yield* result !== null && result !== void 0 ? result : [];
                        }), json_pipe_1.batch(Number.MAX_SAFE_INTEGER), json_pipe_1.flatMap(attributes => attributes.sort((attr1, attr2) => attr1.attribute_id - attr2.attribute_id)), json_pipe_1.distinct((attr1, attr2) => attr1.attribute_id === attr2.attribute_id)),
                    },
                },
            },
            productAttributeSets: soapClient && {
                docKey: { name: 'set_id', type: action_1.Field.integer() },
                listDocKeys: async function* () {
                    const result = await soapClient('catalogProductAttributeSetList');
                    const attributeSets = result !== null && result !== void 0 ? result : [];
                    yield* attributeSets.map(set => set.set_id);
                },
                endpoints: {
                    list: {
                        scope: resource_1.EndpointScope.Resource,
                        cardinality: resource_1.Cardinality.Many,
                        fn: async function* () {
                            const result = await soapClient('catalogProductAttributeSetList');
                            yield* result !== null && result !== void 0 ? result : [];
                        }
                    },
                },
                children: {
                    attributes: {
                        docKey: { name: 'attribute_id', type: action_1.Field.integer() },
                        endpoints: {
                            list: {
                                scope: resource_1.EndpointScope.Resource,
                                cardinality: resource_1.Cardinality.Many,
                                fn: async function* ({ docKeys: [setId] }) {
                                    const result = await soapClient('catalogProductAttributeList', { setId });
                                    yield* result !== null && result !== void 0 ? result : [];
                                }
                            },
                        },
                    },
                },
            },
        };
    }
}
