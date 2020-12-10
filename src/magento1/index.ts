import * as config from './config';
import { ConfigStore } from '../config-store';
import { Magento1ResourceFactory } from './resource-factory';
import { Connector, ConnectorScope } from '../connector';
import { Cardinality, EndpointScope, ResourceCollection, ResourceConfig } from '../resource';
import { Field } from '../action';
import { compose, flatMapAsync, map, batch, flatMap, distinct } from '@space48/json-pipe';
import { createMagento1RestClient } from './rest';
import { createMagento1SoapClient } from './soap';

export type ConfigSchema = {
  credentials: config.ConfigSchema,
};

export default class Magento1Connector implements Connector {
  constructor(private configStore: ConfigStore<ConfigSchema>) {}

  getConfigActions() {
    return config.getActions(this.configStore.select('credentials'));
  }

  getScopes() {
    const credentialsConfig = this.configStore.select('credentials');
    return config.getBaseUrls(credentialsConfig);
  }

  getScope(baseUrl: string) {
    const credentialsConfig = this.configStore.select('credentials');
    return new Magento1Scope(baseUrl, credentialsConfig);
  }

  getTypicalResources() {
    return {};
  }
}

class Magento1Scope implements ConnectorScope {
  constructor(
    private baseUrl: string,
    private configStore: ConfigStore<ConfigSchema['credentials']>,
  ) {}

  get name() {
    return this.baseUrl;
  }

  async getWarningMessage() {
    return undefined;
  }

  getResources(): ResourceCollection {
    const instanceConfig = config.getInstanceConfig(this.configStore, this.baseUrl);
    const restClient = instanceConfig && createMagento1RestClient(instanceConfig);
    const restResource = restClient && new Magento1ResourceFactory(restClient);
    const soapClient = instanceConfig && createMagento1SoapClient(instanceConfig);
  
    return {
      categories: soapClient && {
        docKey: {name: 'entity_id', type: Field.integer()},
        listDocKeys: async function* () {
          function* getCategoryIds(category: any): Iterable<any> {
            const {category_id, children} = category;
            yield category_id;
            for (const child of children ?? []) {
              yield* getCategoryIds(child);
            }
          }
          const root = await soapClient('catalogCategoryTree');
          yield* getCategoryIds(root);
        },
        endpoints: {
          get: {
            scope: EndpointScope.Document,
            cardinality: Cardinality.One,
            fn: ({docKeys: [categoryId]}) => (
              soapClient('catalogCategoryInfo', {categoryId, storeView: 'default'})
            ),
          },
          list: {
            scope: EndpointScope.Resource,
            cardinality: Cardinality.Many,
            fn: async function* () {
              function* getCategories(category: any): Iterable<any> {
                const {children, ...rest} = category;
                yield rest;
                for (const child of children ?? []) {
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
        docKey: {name: 'entity_id', type: Field.integer()},
        endpoints: {
          get: {
            scope: EndpointScope.Resource,
            cardinality: Cardinality.One,
            fn: () => (
              soapClient('catalogCategoryTree')
            ),
          },
        },
      },

      customers: ResourceConfig.merge(
        {
          docKey: {name: 'entity_id', type: Field.integer()},
        },
        restResource?.crud('customers', ['addresses']),
        soapClient && {
          children: {
            addressesSoap: {
              endpoints: {
                get: {
                  scope: EndpointScope.Resource,
                  cardinality: Cardinality.One,
                  fn: ({docKeys: [customerId]}) => soapClient('customerAddressList', {customerId}),
                },
              },
            },
            info: {
              endpoints: {
                get: {
                  scope: EndpointScope.Resource,
                  cardinality: Cardinality.One,
                  fn: ({docKeys: [customerId]}) => soapClient('customerCustomerInfo', {customerId}),
                },
              },
            },
          },
        },
      ),
  
      orders: restResource?.read('orders', ['addresses', 'comments', 'items']),
  
      products: ResourceConfig.merge(
        {
          docKey: {name: 'entity_id', type: Field.integer()},
        },
        restResource?.crud('products', ['categories', 'images', 'websites']),
        soapClient && {
          children: {
            info: {
              endpoints: {
                get: {
                  scope: EndpointScope.Resource,
                  cardinality: Cardinality.One,
                  fn: ({docKeys: [productId]}) => soapClient('catalogProductInfo', {productId}),
                },
              },
            },
            links: {
              docKey: {name: 'type', type: Field.string()},
              endpoints: {
                get: {
                  scope: EndpointScope.Document,
                  cardinality: Cardinality.One,
                  fn: ({docKeys: [product, type]}) => soapClient('catalogProductLinkList', {product, type}),
                },
              },
            },
            media: {
              endpoints: {
                get: {
                  scope: EndpointScope.Resource,
                  cardinality: Cardinality.One,
                  fn: ({docKeys: [productId]}) => soapClient('catalogProductAttributeMediaList', {productId}),
                },
              },
            },
          },
        },
      ),

      productAttributes: soapClient && {
        docKey: {name: 'attribute_id', type: Field.integer()},
        listDocKeys: compose(
          async function* () {
            const result = await soapClient('catalogProductAttributeSetList');
            yield* result ?? [];
          },
          map(attributeSet => attributeSet.set_id as number),
          flatMapAsync(async function* (setId) {
            const result = await soapClient('catalogProductAttributeList', {setId});
            yield* result ?? [];
          }),
          map(attribute => attribute.attribute_id),
          batch(Number.MAX_SAFE_INTEGER),
          flatMap(attributes => attributes.sort()),
          distinct(),
        ),
        endpoints: {
          get: {
            scope: EndpointScope.Document,
            cardinality: Cardinality.One,
            fn: ({docKeys: [attributeId]}) => (
              soapClient('catalogProductAttributeInfo', {attribute: attributeId})
            ),
          },
          list: {
            scope: EndpointScope.Resource,
            cardinality: Cardinality.Many,
            fn: compose(
              async function* () {
                const result = await soapClient('catalogProductAttributeSetList');
                yield* result ?? [];
              },
              map(attributeSet => attributeSet.set_id as number),
              flatMapAsync(async function* (setId) {
                const result = await soapClient('catalogProductAttributeList', {setId});
                yield* result ?? [];
              }),
              batch(Number.MAX_SAFE_INTEGER),
              flatMap(attributes => attributes.sort((attr1, attr2) => attr1.attribute_id - attr2.attribute_id)),
              distinct((attr1, attr2) => attr1.attribute_id === attr2.attribute_id),
            ),
          },
        },
      },

      productAttributeSets: soapClient && {
        docKey: {name: 'set_id', type: Field.integer()},
        listDocKeys: async function* () {
          const result = await soapClient('catalogProductAttributeSetList');
          const attributeSets: any[] = result ?? [];
          yield* attributeSets.map(set => set.set_id);
        },
        endpoints: {
          list: {
            scope: EndpointScope.Resource,
            cardinality: Cardinality.Many,
            fn: async function* () {
              const result = await soapClient('catalogProductAttributeSetList');
              yield* result ?? [];
            }
          },
        },
        children: {
          attributes: {
            docKey: {name: 'attribute_id', type: Field.integer()},
            endpoints: {
              list: {
                scope: EndpointScope.Resource,
                cardinality: Cardinality.Many,
                fn: async function* ({docKeys: [setId]}) {
                  const result = await soapClient('catalogProductAttributeList', {setId});
                  yield* result ?? [];
                }
              },
            },
          },
        },
      },
    };
  }
}
