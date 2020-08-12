import * as config from './config';
import { ConfigStore } from '../config-store';
import { Field } from '../action';
import { Magento2ResourceFactory } from './resource-factory';
import { Connector } from '../connector';
import { ResourceCollection, EndpointScope, Cardinality } from '../resource';
import { compose, flatMap, map, mapAsync, batch, collectArray } from "@space48/json-pipe";
import { flatten } from '../util';
import { SortKey } from './client';

export type ConfigSchema = {
    credentials: config.ConfigSchema,
};

export default class Magento2Connector implements Connector {
    constructor(private configStore: ConfigStore<ConfigSchema>) {}

    getConfigActions() {
        return config.getActions(this.configStore.select('credentials'));
    }

    getScopes() {
        return config.getBaseUrls(this.configStore.select('credentials'));
    }

    getTypicalResources() {
        return {};
    }

    getScopeResources(baseUrl: string) {
        return getResources(baseUrl, this.configStore.select('credentials'));
    }
}

function getResources(baseUrl: string, configStore: ConfigStore<ConfigSchema['credentials']>): ResourceCollection {
    const client = config.createMagentoClient(configStore, baseUrl);
    const resource = new Magento2ResourceFactory(client);

    return {
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
                list: { sortKey: productSortKey },
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
    };
}

const productSortKey: SortKey = { query: 'entity_id', response: 'id' };
