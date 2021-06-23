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
exports.magento1 = void 0;
const framework_1 = require("../../framework");
const functions_1 = require("./functions");
const url_1 = require("url");
const http_1 = require("http");
const https_1 = require("https");
const t = __importStar(require("io-ts"));
const soap_1 = require("./soap");
const rest_1 = require("./rest");
const json_pipe_1 = require("@space48/json-pipe");
const configSchema = t.intersection([
    t.type({
        baseUrl: t.string,
    }),
    t.partial({
        concurrency: t.number,
        insecure: t.boolean,
    }),
    t.partial({
        rest: rest_1.magento1RestConfigSchema,
        soap: soap_1.magento1SoapConfigSchema,
    }),
]);
const mergeResources = framework_1.resourceMerger();
const defaultConcurrency = 3;
exports.magento1 = framework_1.connector({
    configSchema,
    scopeNameExample: getScopeName('www.my-shop.com'),
    getScopeName: config => getScopeName(config.baseUrl),
    getScope: configRef => {
        const agent = configRef
            .map(config => {
            var _a;
            return ({
                protocol: url_1.parse(config.baseUrl).protocol,
                insecure: config.insecure,
                concurrency: (_a = config.concurrency) !== null && _a !== void 0 ? _a : defaultConcurrency,
            });
        })
            .map(({ protocol, insecure, concurrency }) => protocol === 'https:'
            ? new https_1.Agent({
                rejectUnauthorized: !insecure,
                keepAlive: true,
                maxSockets: concurrency,
            })
            : new http_1.Agent({
                keepAlive: true,
                maxSockets: concurrency,
            }));
        const baseUrlRef = configRef.map(config => config.baseUrl);
        const rest = new rest_1.Magento1RestClient(baseUrlRef, agent, configRef.map(config => config.rest));
        const soap = new soap_1.Magento1SoapClient(baseUrlRef, agent, configRef.map(config => config.soap));
        return { rest, soap };
    },
    getWarningMessage: async (scope) => { },
    resources: {
        categories: {
            documents: {
                idField: 'entity_id',
                listIds: ({ soap }) => async function* () {
                    function* getCategoryIds(category) {
                        const { category_id, children } = category;
                        yield category_id;
                        for (const child of children !== null && children !== void 0 ? children : []) {
                            yield* getCategoryIds(child);
                        }
                    }
                    const root = await soap.execute('catalogCategoryTree');
                    yield* getCategoryIds(root);
                },
                endpoints: {
                    getSoap: ({ soap }) => ({ docId: [categoryId] }) => soap.execute('catalogCategoryInfo', {
                        categoryId,
                        storeView: 'default',
                    })
                },
            },
            resources: {
                tree: {
                    endpoints: {
                        getSoap: ({ soap }) => () => soap.execute('catalogCategoryTree'),
                    },
                },
            },
            endpoints: {
                listSoap: ({ soap }) => async function* () {
                    function* getCategories(category) {
                        const { children, ...rest } = category;
                        yield rest;
                        for (const child of children !== null && children !== void 0 ? children : []) {
                            yield* getCategories(child);
                        }
                    }
                    const root = await soap.execute('catalogCategoryTree');
                    yield* getCategories(root);
                },
            },
        },
        customers: mergeResources(functions_1.Rest.crud('customers', ['addresses']), {
            documents: {
                resources: {
                    addresses: {
                        endpoints: {
                            getSoap: ({ soap }) => ({ docId: [customerId] }) => soap.execute('customerAddressList', { customerId }),
                        },
                    },
                },
                endpoints: {
                    getSoap: ({ soap }) => ({ docId: [customerId] }) => soap.execute('customerCustomerInfo', { customerId }),
                },
            },
            endpoints: {
                listSoap: functions_1.Soap.list('customerCustomerList'),
            },
        }),
        orders: mergeResources(functions_1.Rest.read('orders', ['addresses', 'comments', 'items']), {
            endpoints: {
                listSoap: functions_1.Soap.list('salesOrderList'),
            },
        }),
        products: mergeResources(functions_1.Rest.crud('products', ['categories', 'images', 'websites']), {
            documents: {
                resources: {
                    links: {
                        documents: {
                            idField: 'type',
                            endpoints: {
                                getSoap: ({ soap }) => ({ docId: [product, type] }) => soap.execute('catalogProductLinkList', { product, type }),
                            },
                        },
                    },
                    media: {
                        endpoints: {
                            getSoap: ({ soap }) => ({ docId: [productId] }) => soap.execute('catalogProductAttributeMediaList', { productId }),
                        },
                    },
                },
                endpoints: {
                    getSoap: ({ soap }) => ({ docId: [productId] }) => soap.execute('catalogProductInfo', { productId }),
                },
            },
            resources: {
                attributes: {
                    endpoints: {
                        listSoap: ({ soap }) => json_pipe_1.compose(async function* () {
                            const result = await soap.execute('catalogProductAttributeSetList');
                            yield* result !== null && result !== void 0 ? result : [];
                        }, json_pipe_1.map(attributeSet => attributeSet.set_id), json_pipe_1.flatMapAsync(async function* (setId) {
                            const result = await soap.execute('catalogProductAttributeList', { setId });
                            yield* result !== null && result !== void 0 ? result : [];
                        }), json_pipe_1.batch(Number.MAX_SAFE_INTEGER), json_pipe_1.flatMap(attributes => attributes.sort((attr1, attr2) => attr1.attribute_id - attr2.attribute_id)), json_pipe_1.distinct((attr1, attr2) => attr1.attribute_id === attr2.attribute_id)),
                    },
                    documents: {
                        idField: 'attribute_id',
                        listIds: ({ soap }) => json_pipe_1.compose(async function* () {
                            const result = await soap.execute('catalogProductAttributeSetList');
                            yield* result !== null && result !== void 0 ? result : [];
                        }, json_pipe_1.map(attributeSet => attributeSet.set_id), json_pipe_1.flatMapAsync(async function* (setId) {
                            const result = await soap.execute('catalogProductAttributeList', { setId });
                            yield* result !== null && result !== void 0 ? result : [];
                        }), json_pipe_1.map(attribute => attribute.attribute_id), json_pipe_1.batch(Number.MAX_SAFE_INTEGER), json_pipe_1.flatMap(attributes => attributes.sort()), json_pipe_1.distinct()),
                        endpoints: {
                            getSoap: ({ soap }) => ({ docId: [attribute] }) => soap.execute('catalogProductAttributeInfo', { attribute }),
                        },
                    },
                },
                attributeSets: {
                    endpoints: {
                        listSoap: ({ soap }) => async function* () {
                            const result = await soap.execute('catalogProductAttributeSetList');
                            yield* result !== null && result !== void 0 ? result : [];
                        },
                    },
                    documents: {
                        idField: 'attribute_set_id',
                        listIds: ({ soap }) => async function* () {
                            const result = await soap.execute('catalogProductAttributeSetList');
                            const attributeSets = result !== null && result !== void 0 ? result : [];
                            yield* attributeSets.map(set => set.set_id);
                        },
                        resources: {
                            attributes: {
                                endpoints: {
                                    listSoap: ({ soap }) => async function* ({ docId: [setId] }) {
                                        const result = await soap.execute('catalogProductAttributeList', { setId });
                                        yield* result !== null && result !== void 0 ? result : [];
                                    }
                                },
                            },
                        },
                    },
                },
            },
        }),
    }
});
function getScopeName(storeBaseUrl) {
    const { host, path } = url_1.parse(storeBaseUrl);
    return `${host || ''}${path}`.replace(/\/$/, '').toLowerCase();
}
