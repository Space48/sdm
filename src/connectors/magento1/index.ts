import { connector, resourceMerger } from '../../framework';
import { Magento1Scope, Rest } from './functions';
import { parse as parseUrl } from "url";
import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";
import * as t from 'io-ts'
import { Magento1SoapClient, magento1SoapConfigSchema } from './soap';
import { Magento1RestClient, magento1RestConfigSchema } from './rest';
import { batch, compose, distinct, flatMap, flatMapAsync, map, mapAsync } from '@space48/json-pipe';

// do not remove the following imports -- they are intended to tidy up the generated declaration files
import * as f from '../../framework';

export type Magento1Config = t.TypeOf<typeof configSchema>;

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

const mergeResources = resourceMerger<Magento1Scope>();

const defaultConcurrency = 3;

export const magento1 = connector({
  configSchema,

  scopeNameExample: getScopeName('www.my-shop.com'),
  
  getScopeName: config => getScopeName(config.baseUrl),

  getScope: configRef => {
    const agent =
      configRef
        .map(config => ({
          protocol: parseUrl(config.baseUrl).protocol,
          insecure: config.insecure,
          concurrency: config.concurrency ?? defaultConcurrency,
        }))
        .map(({protocol, insecure, concurrency}) => 
          protocol === 'https:'
            ? new HttpsAgent({
              rejectUnauthorized: !insecure,
              keepAlive: true,
              maxSockets: concurrency,
            })
            : new HttpAgent({
              keepAlive: true,
              maxSockets: concurrency,
            })
        );

    const baseUrlRef = configRef.map(config => config.baseUrl);
    
    const rest = new Magento1RestClient(
      baseUrlRef,
      agent,
      configRef.map(config => config.rest)
    );

    const soap = new Magento1SoapClient(
      baseUrlRef,
      agent,
      configRef.map(config => config.soap)
    );

    return { rest, soap };
  },

  getWarningMessage: async (scope: Magento1Scope) => {},
  
  resources: {
    categories: {
      documents: {
        idField: 'entity_id',

        listIds: ({ soap }) => async function* () {
          function* getCategoryIds(category: any): Iterable<any> {
            const {category_id, children} = category;
            yield category_id;
            for (const child of children ?? []) {
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
          function* getCategories(category: any): Iterable<any> {
            const {children, ...rest} = category;
            yield rest;
            for (const child of children ?? []) {
              yield* getCategories(child);
            }
          }
          const root = await soap.execute('catalogCategoryTree');
          yield* getCategories(root);
        },
      },
    },

    customers: mergeResources(
      Rest.crud('customers', ['addresses']),
      {
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
          listSoap: ({ soap }) => ({ input: filters }) => soap.execute('customerCustomerList', { filters }),
        },
      },
    ),

    orders: Rest.read('orders', ['addresses', 'comments', 'items'] as const),

    products: mergeResources(
      Rest.crud('products', ['categories', 'images', 'websites'] as const),
      {
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
              listSoap: ({ soap }) => compose(
                async function* () {
                  const result = await soap.execute<any[]>('catalogProductAttributeSetList');
                  yield* result ?? [];
                },
                map(attributeSet => attributeSet.set_id as number),
                flatMapAsync(async function* (setId) {
                  const result = await soap.execute<any[]>('catalogProductAttributeList', { setId });
                  yield* result ?? [];
                }),
                batch(Number.MAX_SAFE_INTEGER),
                flatMap(attributes => attributes.sort((attr1, attr2) => attr1.attribute_id - attr2.attribute_id)),
                distinct((attr1, attr2) => attr1.attribute_id === attr2.attribute_id),
              ),
            },

            documents: {
              idField: 'attribute_id',

              listIds: ({ soap }) => compose(
                async function* () {
                  const result = await soap.execute<any[]>('catalogProductAttributeSetList');
                  yield* result ?? [];
                },
                map(attributeSet => attributeSet.set_id as number),
                flatMapAsync(async function* (setId) {
                  const result = await soap.execute<any[]>('catalogProductAttributeList', { setId });
                  yield* result ?? [];
                }),
                map(attribute => attribute.attribute_id as number),
                batch(Number.MAX_SAFE_INTEGER),
                flatMap(attributes => attributes.sort()),
                distinct(),
              ),
              
              endpoints: {
                getSoap: ({ soap }) => ({ docId: [attribute]}) => soap.execute('catalogProductAttributeInfo', { attribute }),
              },
            },
          },

          attributeSets: {
            endpoints: {
              listSoap: ({ soap }) => async function* () {
                const result = await soap.execute<any[]>('catalogProductAttributeSetList');
                yield* result ?? [];
              },
            },

            documents: {
              idField: 'attribute_set_id',

              listIds: ({ soap }) => async function* () {
                const result = await soap.execute<any[]>('catalogProductAttributeSetList');
                const attributeSets = result ?? [];
                yield* attributeSets.map(set => set.set_id);
              },

              resources: {
                attributes: {
                  endpoints: {
                    listSoap: ({ soap }) => async function* ({ docId: [setId] }) {
                      const result = await soap.execute<any[]>('catalogProductAttributeList', { setId });
                      yield* result ?? [];
                    }
                  },
                },
              },
            },
          },
        },
      },
    ),
  }
});

function getScopeName(storeBaseUrl: string): string {
  const {host, path} = parseUrl(storeBaseUrl);
  return `${host || ''}${path}`.replace(/\/$/, '').toLowerCase(); 
}
