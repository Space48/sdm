import * as config from './config';
import { ConfigStore } from '../config-store';
import { Connector } from '../connector';
import { BigCommerceResourceFactory } from './resource-factory';
import { Cardinality, ResourceCollection, EndpointScope } from '../resource';
import { Field } from '../action';

export type ConfigSchema = {
    credentials: config.ConfigSchema,
};

export default class BigCommerceConnector implements Connector {
    constructor(private configStore: ConfigStore<ConfigSchema>) {}

    getConfigActions() {
        return config.getActions(this.configStore.select('credentials'));
    }

    getScopes() {
        return config.getStoreAliases(this.configStore.select('credentials'));
    }

    getTypicalResources() {
        return {};
    }

    getScopeResources(baseUrl: string) {
        return getResources(baseUrl, this.configStore.select('credentials'));
    }
};

function getResources(storeAlias: string, configStore: ConfigStore<ConfigSchema['credentials']>): ResourceCollection {
    const client = config.getBigCommerceClient(configStore, storeAlias);
    const resource = new BigCommerceResourceFactory(client);

    return {
        blogPosts: resource.documentCollection('v2/blog/post'),

        blogTags: resource.documentCollection('v2/blog/tag'),
        
        categories: {
            ...resource.documentCollection('v3/catalog/categories'),

            children: {
                image: resource.singletonResource('v3/catalog/categories/{id}/image', {create: true, delete: true}),
                metafields: resource.documentCollection('v3/catalog/categories/{id}/metafields'),
            },
        },

        categoryTree: resource.singletonResource('v3/catalog/categories/tree', {get: true}),

        brands: {
            ...resource.documentCollection('v3/catalog/brands'),

            children: {
                image: resource.singletonResource('v3/catalog/brands/{id}/image', {create: true, delete: true}),
                metafields: resource.documentCollection('v3/catalog/brands/{id}/metafields'),
            },
        },

        channels: resource.documentCollection('v3/channel', {create: true, update: true, list: true, listDocKeys: true, get: true}),

        customers: resource.documentCollection('v3/customers'),

        customerAddresses: resource.documentCollection('v3/customers/addresses'),

        customerAttributes: resource.documentCollection('v3/customers/attributes', {
            list: true,

            customEndpoints: {
                create: {
                    scope: EndpointScope.Resource,
                    cardinality: Cardinality.One,
                    fn: ({data}) => client.post('v3/customers/attributes', [data]).then(results => results[0]),
                },
                delete: {
                    scope: EndpointScope.Document,
                    cardinality: Cardinality.One,
                    fn: ({docKeys: [id]}) => client.delete('v3/customers/attributes', {'id:in': id}),
                },
                update: {
                    scope: EndpointScope.Document,
                    cardinality: Cardinality.One,
                    fn: ({docKeys: [id], data}) => client.put('v3/customers/attributes', [{...data, id}]).then(result => result[0]),
                },
            },

            children: {
                values: {
                    endpoints: {
                        list: {
                            scope: EndpointScope.Resource,
                            cardinality: Cardinality.Many,
                            fn: ({docKeys: [attributeId], data}) => client.list('v3/customers/attribute-values', {
                                ...data,
                                'attribute_id:in': attributeId,
                            }),
                        },
                    },
                },
            },
        }),

        customerAttributeValues: resource.documentCollection('v3/customers/attribute-values', {
            list: true,

            customEndpoints: {
                delete: {
                    scope: EndpointScope.Document,
                    cardinality: Cardinality.One,
                    fn: ({docKeys: [id]}) => client.delete('v3/customers/attribute-values', {'id:in': id}),
                },
                set: {
                    scope: EndpointScope.Resource,
                    cardinality: Cardinality.One,
                    fn: ({data}) => client.put('v3/customers/attribute-values', [data]).then(result => result[0]),
                },
            },
        }),

        giftCertificates: resource.documentCollection('v3/gift_certificates'),
        
        orders: {
            ...resource.documentCollection('v2/orders'),

            children: {
                refunds: resource.singletonResource('v3/orders/{id}/payment_actions/refunds', {get: true}),
            },
        },

        paymentMethods: resource.documentCollection('v3/payments/methods', {list: true, listDocKeys: true}),

        products: {
            ...resource.documentCollection('v3/catalog/products'),

            children: {
                bulkPricingRules: resource.documentCollection('v3/catalog/products/{id}/bulk-pricing-rules'),
                complexRules: resource.documentCollection('v3/catalog/products/{id}/complex-rules'),
                customFields: resource.documentCollection('v3/catalog/products/{id}/custom-fields'),
                images: resource.documentCollection('v3/catalog/products/{id}/images'),
                metafields: resource.documentCollection('v3/catalog/products/{id}/metafields'),
                modifiers: {
                    ...resource.documentCollection('v3/catalog/products/{id}/modifiers'),

                    children: {
                        values: {
                            ...resource.documentCollection('v3/catalog/products/{id}/modifiers/{id}/values'),

                            children: {
                                image: resource.documentCollection('v3/catalog/products/{id}/modifiers/{id}/values/{id}/image', {create: true, delete: true}),
                            },
                        },
                    },
                },
                options: {
                    ...resource.documentCollection('v3/catalog/products/{id}/options'),

                    children: {
                        values: resource.documentCollection('v3/catalog/products/{id}/options/{id}/values'),
                    },
                },
            },
        },

        // 'price-list-record': todo: this would be useful, but it requires bespoke sources and sinks
    };
}
