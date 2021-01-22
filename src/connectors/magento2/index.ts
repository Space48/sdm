import Magento2, { Config, configSchema } from './client';
import { connector, resourceMerger } from '../../framework';
import { endpoint } from './functions';
import { parse as parseUrl } from "url";
import { omit } from 'ramda';

export type Magento2Config = Config;

const mergeResources = resourceMerger<Magento2>();

export const magento2 = connector({
  configSchema,
  
  getScopeName: config => {
    const {host, path} = parseUrl(config.baseUrl);
    return `${host || ''}${path}`.replace(/\/$/, '').toLowerCase();
  },

  getScope: config => new Magento2(config),

  getWarningMessage: async (client: Magento2) => {},
  
  resources: {
    categories: mergeResources(
      endpoint.crud('categories', {
        idField: 'id',
        list: {
          uri: 'categories/list',
          sortKey: { query: 'entity_id', response: 'id' },
        }
      }),
      {
        resources: {
          tree: {
            endpoints: {
              get: endpoint.get('categories?rootCategoryId=1'),
            },
          },
        }
      },
    ),

    customers: endpoint.crud('customers', {
      idField: 'id',
      list: {
        uri: 'customers/search',
        sortKey: { query: 'entity_id', response: 'id' },
      },
    }),

    orders: {
      endpoints: {
        list: endpoint.list('orders', { query: 'entity_id', response: 'entity_id' }),
      },

      documents: omit(['create'], endpoint.crud('orders', {
        idField: 'id',
        list: {
          idField: 'entity_id',
          sortKey: { query: 'entity_id', response: 'entity_id' },
        },
      }).documents!),
    },

    products: mergeResources(
      endpoint.crud('products', {
        idField: 'sku',
        list: {
          sortKey: { query: 'entity_id', response: 'id' },
        },
      }),
      {
        documents: {
          resources: {
            links: {
              documents: {
                idField: 'type',
                endpoints: {
                  get: endpoint.get('products/{sku}/links/{type}'),
                },
              },
            },
          },  
        },

        resources: {
          attributes: {
            endpoints: {
              list: endpoint.list('products/attributes', { query: 'attribute_id', response: 'attribute_id' }),
            },

            documents: {
              idField: 'attribute_code',

              resources: {
                options: {
                  endpoints: {
                    get: endpoint.get('products/attributes/{attributeCode}/options'),
                  },
                },
              },
            },
          },

          configurables: {
            documents: {
              idField: 'sku',
              resources: {
                children: {
                  endpoints: {
                    get: endpoint.get('configurable-products/{sku}/children'),
                  },
                },
                options: {
                  endpoints: {
                    get: endpoint.get('configurable-products/{sku}/options/all'),
                  },
                },
              }
            },
          }
        },
      },
    ),
  },
});
