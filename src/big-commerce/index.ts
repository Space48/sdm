import * as config from './config';
import { ConfigStore } from '../config-store';
import { Connector } from '../connector';
import { BigCommerceResourceFactory } from './resource-factory';
import { ResourceCollection } from '../resource';

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

function getResources(storeAlias: string, config: ConfigStore<ConfigSchema['credentials']>): ResourceCollection {
    const resource = new BigCommerceResourceFactory(storeAlias, config);

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

        giftCertificates: resource.documentCollection('v3/gift_certificates'),
        
        orders: {
            ...resource.documentCollection('v2/orders'),

            children: {
                transactions: resource.singletonResource('v3/orders/{id}/payment_actions/refunds', {get: true}),
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
