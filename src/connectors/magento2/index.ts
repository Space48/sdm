import Magento2, { Config, configSchema } from './client';
import { connector, resourceMerger } from '../../framework';
import { endpoint } from './functions';
import { parse as parseUrl } from "url";
import { omit } from 'ramda';

// do not remove the following imports -- they are intended to tidy up the generated declaration files
import * as f from '../../framework';

export type Magento2Config = Config;

const mergeResources = resourceMerger<Magento2>();

export const magento2 = connector({
  configSchema,

  scopeNameExample: getScopeName('www.my-shop.com'),

  getScopeName: config => getScopeName(config.baseUrl, config.storeView) ,

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
          attributes: mergeResources(
            endpoint.crud('products/attributes', {
              idField: 'attribute_id',
              list: {
                sortKey: { query: 'attribute_id', response: 'attribute_id' },
              },
            }),
            {
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
            }
          ),

          attributeGroups: endpoint.crud('products/attribute-sets/groups', {
            idField: 'group_id',
            list: {
              uri: 'products/attribute-sets/groups/list',
              sortKey: { query: 'attribute_set_id', response: 'attribute_set_id' }
            }
          }),

          attributeSets: mergeResources(
            endpoint.crud('products/attribute-sets', {
              idField: 'attribute_set_id',
              list: {
                uri: 'products/attribute-sets/sets/list',
                sortKey: { query: 'attribute_set_id', response: 'attribute_set_id' },
              },
            }),
            {
              documents: {
                resources: {
                  attributes: {
                    documents: {
                      idField: 'attribute_code',
                      endpoints: {
                        get: endpoint.get('products/attribute-sets/{attributeSetId}/attributes/{attributeCode}'),
                        delete: endpoint.del('products/attribute-sets/{attributeSetId}/attributes/{attributeCode}'),
                      },
                    },
                  },

                  groups: {
                    endpoints: {
                      put: endpoint.update('products/attribute-sets/{attributeSetId}/groups')
                    }
                  }
                },
              },
            }
          ),

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

function getScopeName(storeBaseUrl: string, storeView?: string): string {
  const {host, path} = parseUrl(storeBaseUrl);
  return `${host || ''}${path}`.replace(/\/$/, '').toLowerCase()
    + `/${storeView || "default"}`; 
}