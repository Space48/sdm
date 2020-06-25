import * as credentials from './credentials';
import { Config } from '../config';
import { Action } from '../action';
import { ResourceCollection, resourceAction } from '../resource';
import { BigCommerceResourceFactory } from './resource';

export type ConfigSchema = {
    credentials: credentials.ConfigSchema,
};

export const getActions = (config: Config<ConfigSchema>): Record<string, Action[]> => {
    const credentialsConfig = config.select('credentials');
    const getResourceAction = (storeAlias: string) => resourceAction(storeAlias, getResources(storeAlias, credentialsConfig));
    return {
        creds: credentials.getActions(credentialsConfig),
        _: credentials.getStoreAliases(credentialsConfig).map(getResourceAction),
    };
};

function getResources(storeAlias: string, config: Config<ConfigSchema['credentials']>) {
    const resource = new BigCommerceResourceFactory(storeAlias, config);

    return ResourceCollection.configure({
        context: BigCommerceResourceFactory.context,

        resources: {
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

            channels: resource.documentCollection('v3/channel', {create: true, update: true, list: true, listKeys: true, get: true}),

            customers: resource.documentCollection('v3/customers'),

            customerAddresses: resource.documentCollection('v3/customers/addresses'),

            giftCertificates: resource.documentCollection('v3/gift_certificates'),

            paymentMethods: resource.documentCollection('v3/payments/methods', {list: true, listKeys: true}),

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
        },
    });
}
