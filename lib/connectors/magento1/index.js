import { connector, resourceMerger } from "../../framework";
import { Rest, Soap } from "./functions";
import { parse as parseUrl } from "url";
import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";
import * as t from "io-ts";
import { Magento1SoapClient, magento1SoapConfigSchema } from "./soap";
import { Magento1RestClient, magento1RestConfigSchema } from "./rest";
import { batch, compose, distinct, flatMap, flatMapAsync, map } from "@space48/json-pipe";
const configSchema = t.intersection([
    t.type({
        baseUrl: t.string,
    }),
    t.partial({
        concurrency: t.number,
        insecure: t.boolean,
    }),
    t.partial({
        rest: magento1RestConfigSchema,
        soap: magento1SoapConfigSchema,
    }),
]);
const mergeResources = resourceMerger();
const defaultConcurrency = 3;
export const magento1 = connector({
    configSchema,
    scopeNameExample: getScopeName("www.my-shop.com"),
    getScopeName: config => getScopeName(config.baseUrl),
    getScope: configRef => {
        const agent = configRef
            .map(config => {
            var _a;
            return ({
                protocol: parseUrl(config.baseUrl).protocol,
                insecure: config.insecure,
                concurrency: (_a = config.concurrency) !== null && _a !== void 0 ? _a : defaultConcurrency,
            });
        })
            .map(({ protocol, insecure, concurrency }) => protocol === "https:"
            ? new HttpsAgent({
                rejectUnauthorized: !insecure,
                keepAlive: true,
                maxSockets: concurrency,
            })
            : new HttpAgent({
                keepAlive: true,
                maxSockets: concurrency,
            }));
        const baseUrlRef = configRef.map(config => config.baseUrl);
        const rest = new Magento1RestClient(baseUrlRef, agent, configRef.map(config => config.rest));
        const soap = new Magento1SoapClient(baseUrlRef, agent, configRef.map(config => config.soap));
        return { rest, soap };
    },
    getWarningMessage: async (scope) => Promise.resolve(),
    resources: {
        categories: {
            documents: {
                idField: "entity_id",
                listIds: ({ soap }) => async function* () {
                    function* getCategoryIds(category) {
                        const { category_id, children } = category;
                        yield category_id;
                        for (const child of children !== null && children !== void 0 ? children : []) {
                            yield* getCategoryIds(child);
                        }
                    }
                    const root = await soap.execute("catalogCategoryTree");
                    yield* getCategoryIds(root);
                },
                endpoints: {
                    getSoap: ({ soap }) => ({ docId: [categoryId] }) => soap.execute("catalogCategoryInfo", {
                        categoryId,
                        storeView: "default",
                    }),
                },
            },
            resources: {
                tree: {
                    endpoints: {
                        getSoap: ({ soap }) => () => soap.execute("catalogCategoryTree"),
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
                    const root = await soap.execute("catalogCategoryTree");
                    yield* getCategories(root);
                },
            },
        },
        customers: mergeResources(Rest.crud("customers", ["addresses"]), {
            documents: {
                resources: {
                    addresses: {
                        endpoints: {
                            getSoap: ({ soap }) => ({ docId: [customerId] }) => soap.execute("customerAddressList", { customerId }),
                        },
                    },
                },
                endpoints: {
                    getSoap: ({ soap }) => ({ docId: [customerId] }) => soap.execute("customerCustomerInfo", { customerId }),
                },
            },
            endpoints: {
                listSoap: Soap.list("customerCustomerList"),
            },
        }),
        orders: mergeResources(Rest.read("orders", ["addresses", "comments", "items"]), {
            endpoints: {
                listSoap: Soap.list("salesOrderList"),
            },
        }),
        products: mergeResources(Rest.crud("products", ["categories", "images", "websites"]), {
            documents: {
                resources: {
                    links: {
                        documents: {
                            idField: "type",
                            endpoints: {
                                getSoap: ({ soap }) => ({ docId: [product, type] }) => soap.execute("catalogProductLinkList", { product, type }),
                            },
                        },
                    },
                    media: {
                        endpoints: {
                            getSoap: ({ soap }) => ({ docId: [productId] }) => soap.execute("catalogProductAttributeMediaList", { productId }),
                        },
                    },
                },
                endpoints: {
                    getSoap: ({ soap }) => ({ docId: [productId] }) => soap.execute("catalogProductInfo", { productId }),
                },
            },
            resources: {
                attributes: {
                    endpoints: {
                        listSoap: ({ soap }) => compose(async function* () {
                            const result = await soap.execute("catalogProductAttributeSetList");
                            yield* result !== null && result !== void 0 ? result : [];
                        }, map(attributeSet => attributeSet.set_id), flatMapAsync(async function* (setId) {
                            const result = await soap.execute("catalogProductAttributeList", {
                                setId,
                            });
                            yield* result !== null && result !== void 0 ? result : [];
                        }), batch(Number.MAX_SAFE_INTEGER), flatMap(attributes => attributes.sort((attr1, attr2) => attr1.attribute_id - attr2.attribute_id)), distinct((attr1, attr2) => attr1.attribute_id === attr2.attribute_id)),
                    },
                    documents: {
                        idField: "attribute_id",
                        listIds: ({ soap }) => compose(async function* () {
                            const result = await soap.execute("catalogProductAttributeSetList");
                            yield* result !== null && result !== void 0 ? result : [];
                        }, map(attributeSet => attributeSet.set_id), flatMapAsync(async function* (setId) {
                            const result = await soap.execute("catalogProductAttributeList", {
                                setId,
                            });
                            yield* result !== null && result !== void 0 ? result : [];
                        }), map(attribute => attribute.attribute_id), batch(Number.MAX_SAFE_INTEGER), flatMap(attributes => attributes.sort()), distinct()),
                        endpoints: {
                            getSoap: ({ soap }) => ({ docId: [attribute] }) => soap.execute("catalogProductAttributeInfo", { attribute }),
                        },
                    },
                },
                attributeSets: {
                    endpoints: {
                        listSoap: ({ soap }) => async function* () {
                            const result = await soap.execute("catalogProductAttributeSetList");
                            yield* result !== null && result !== void 0 ? result : [];
                        },
                    },
                    documents: {
                        idField: "attribute_set_id",
                        listIds: ({ soap }) => async function* () {
                            const result = await soap.execute("catalogProductAttributeSetList");
                            const attributeSets = result !== null && result !== void 0 ? result : [];
                            yield* attributeSets.map(set => set.set_id);
                        },
                        resources: {
                            attributes: {
                                endpoints: {
                                    listSoap: ({ soap }) => async function* ({ docId: [setId] }) {
                                        const result = await soap.execute("catalogProductAttributeList", {
                                            setId,
                                        });
                                        yield* result !== null && result !== void 0 ? result : [];
                                    },
                                },
                            },
                        },
                    },
                },
            },
        }),
    },
});
function getScopeName(storeBaseUrl) {
    const { host, path } = parseUrl(storeBaseUrl);
    return `${host || ""}${path}`.replace(/\/$/, "").toLowerCase();
}
