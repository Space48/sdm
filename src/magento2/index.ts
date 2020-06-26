import * as credentials from './credentials';
import { Config } from '../config';
import { FieldType, Action, Field } from '../action';
import { Magento2ResourceFactory } from './resource';
import { ResourceCollection, resourceAction } from '../resource';

export type ConfigSchema = {
    credentials: credentials.ConfigSchema,
};

export function getActions(config: Config<ConfigSchema>): Record<string, Action[]> {
    const credentialsConfig = config.select('credentials');
    const getResourceAction = (baseUrl: string) => resourceAction(baseUrl, getResources(baseUrl, credentialsConfig));
    return {
        creds: credentials.getActions(credentialsConfig),
        _: credentials.getBaseUrls(credentialsConfig).map(getResourceAction),
    };
}

function getResources(baseUrl: string, config: Config<ConfigSchema['credentials']>) {
    const resource = new Magento2ResourceFactory(baseUrl, config);

    return ResourceCollection.configure({
        context: Magento2ResourceFactory.context,

        resources: {
            categories: resource.create('categories', {
                docKey: { name: 'id', type: Field.integer() },
                create: true,
                get: true,
                list: {
                    uri: 'categories/list',
                    sortKey: { query: 'entity_id', response: 'id' },
                },
                update: true,
                delete: true,
            }),

            categoryTree: resource.create('categories?rootCategoryId=1', {
                get: true,
            }),

            configurableProducts: {
                ...resource.create('configurable-products', {
                    docKey: { name: 'sku', type: Field.string() },
                }),

                children: {
                    children: resource.create('configurable-products/{sku}/children', {
                        get: true,
                    }),

                    options: resource.create('configurable-products/{sku}/options/all', {
                        get: true,
                    }),
                },
            },

            customers: resource.create('customers', {
                docKey: { name: 'id', type: Field.integer() },
                create: true,
                get: true,
                list: {
                    uri: 'customers/search',
                    sortKey: { query: 'entity_id', response: 'id' },
                },
                update: true,
                delete: true,
            }),

            orders: resource.create('orders', {
                docKey: { name: 'entity_id', type: Field.integer() },
                get: true,
                list: { sortKey: { query: 'entity_id', response: 'entity_id' } },
                update: true,
                delete: true,
            }),
    
            products: {
                ...resource.create('products', {
                    docKey: { name: 'sku', type: Field.string() },
                    create: true,
                    get: true,
                    list: { sortKey: { query: 'entity_id', response: 'id' } },
                    update: true,
                    delete: true,
                }),

                children: {
                    links: resource.create('products/{sku}/links', {
                        docKey: { name: 'type', type: Field.string() },
                        get: true,
                    }),
                },
            },

            productAttributes: {
                ...resource.create('products/attributes', {
                    docKey: { name: 'attribute_code', type: Field.string() },
                    list: { sortKey: { query: 'attribute_id', response: 'attribute_id' } },
                }),

                children: {
                    options: resource.create('products/attributes/{attributeCode}/options', {
                        get: true,
                    }),
                },
            },
        }
    });
}
