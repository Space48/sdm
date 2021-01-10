import BigCommerce, {credentialsSchema, Credentials} from './client';
import { connector, resource, DocId, Endpoint, mergeResources } from '../resource-v2';
import { map, pipe } from '@space48/json-pipe';

const configSchema = credentialsSchema;

export type BigCommerceConfig = Credentials;

const bigCommerceConnector = connector(configSchema, {
  getWarningMessage: async config => {
    try {
      const store = await BigCommerce.client(config).get('v2/store');
      if (store.status === 'live') {
        return `Store is LIVE at ${store.domain}`;
      }
      if (!store.domain.endsWith('.mybigcommerce.com')) {
        return `Store is using custom domain ${store.domain}`
      }
    } catch {
      return 'Failed to fetch store data from BigCommerce API. This could be a live store.';
    }
  },

  resources: {
    blog: {
      resources: {
        posts: endpoint.crud('v2/blog/post'),
        tags: endpoint.crud('v2/blog/tag'),
      },
    },

    brands: mergeResources(
      endpoint.crud('v3/catalog/brands'),
      {
        documents: {
          resources: {
            image: {
              endpoints: {
                create: endpoint.create('v3/catalog/brands/{id}/image'),
                delete: endpoint.del('v3/catalog/brands/{id}/image'),
              },
            },
            metafields: endpoint.crud('v3/catalog/brands/{id}/metafields'),
          },
        },
      }
    ),

    carts: {
      endpoints: {
        create: endpoint.create('v3/carts'),
      },

      documents: {
        endpoints: {
          delete: endpoint.del('v3/carts/{id}'),
          get: endpoint.get('v3/carts/{id}'),
          update: endpoint.update('v3/carts/{id}'),
        },

        resources: {
          items: {
            endpoints: {
              create: endpoint.create('v3/carts/{id}/items'),
            },

            documents: {
              endpoints: {
                delete: endpoint.del('v3/carts/{id}'),
                update: endpoint.update('v3/carts/{id}'),
              },
            },
          },
        },
      },
    },

    categories: mergeResources(
      endpoint.crud('v3/catalog/categories'),
      {
        resources: {
          tree: {
            endpoints: {
              get: endpoint.get('v3/catalog/categories/tree'),
            }
          },
        },
        documents: {
          resources: {
            image: {
              endpoints: {
                create: endpoint.create('v3/catalog/categories/{id}/image'),
                delete: endpoint.del('v3/catalog/categories/{id}/image'),
              },
            },
            metafields: endpoint.crud('v3/catalog/categories/{id}/metafields'),
          },
        },
      },
    ),

    channels: {
      endpoints: {
        create: endpoint.create('v3/channel'),
        list: endpoint.list('v3/channel'),
      },
      documents: {
        listIds: listIds('v3/channel'),
        endpoints: {
          get: endpoint.get('v3/channel/{id}'),
          update: endpoint.update('v3/channel/{id}'),
        },
      },
    },

    customers: mergeResources(
      batch.crud('v3/customers'),
      {
        resources: {
          addresses: batch.crud('v3/customers/addresses'),

          attributes: mergeResources(
            batch.crud('v3/customers/attributes'),
            {
              documents: {
                resources: {
                  values: {
                    endpoints: {
                      list: endpoint.fn(
                        'v3/customers/attribute-values',
                        (bcClient, uri, query: Query|undefined, [attributeId]) => bcClient.list<object>(uri, {
                          ...query,
                          'attribute_id:in': attributeId,
                        })
                      ),
                    },
                  },
                },
              },

              resources: {
                values: {
                  endpoints: {
                    list: endpoint.list('v3/customers/attribute-values'),
                  },
      
                  documents: {
                    endpoints: {
                      delete: batch.deleteOne('v3/customers/attribute-values'),
                      set: batch.updateOne('v3/customers/attribute-values'),
                    },
                  },
                },
              },
            },
          ),
        },
      },
    ),

    giftCertificates: endpoint.crud('v2/gift_certificates'),
    
    orders: mergeResources(
      endpoint.crud('v2/orders'),
      {
        documents: {
          resources: {
            refunds: {
              endpoints: {
                get: endpoint.get('v3/orders/{id}/payment_actions/refunds'),
              },
            },
          },
        },
      },
    ),

    paymentMethods: {
      endpoints: {
        list: endpoint.list('v3/payments/methods'),
      },
    },

    products: mergeResources(
      endpoint.crud('v3/catalog/products/{id}'),
      {
        endpoints: {
          update: batch.updateOne('v3/catalog/products'),
        },

        documents: {
          resources: {
            bulkPricingRules: endpoint.crud('v3/catalog/products/{id}/bulk-pricing-rules'),
            complexRules: endpoint.crud('v3/catalog/products/{id}/complex-rules'),
            customFields: endpoint.crud('v3/catalog/products/{id}/custom-fields'),
            images: endpoint.crud('v3/catalog/products/{id}/images'),
            metafields: endpoint.crud('v3/catalog/products/{id}/metafields'),
            modifiers: mergeResources(
              endpoint.crud('v3/catalog/products/{id}/modifiers'),
              {
                documents: {
                  resources: {
                    values: mergeResources(
                      endpoint.crud('v3/catalog/products/{id}/modifiers/{id}/values'),
                      {
                        resources: {
                          image: {
                            endpoints: {
                              create: endpoint.create('v3/catalog/products/{id}/modifiers/{id}/values/{id}/image'),
                            },
                            documents: {
                              endpoints: {
                                delete: endpoint.del('v3/catalog/products/{id}/modifiers/{id}/values/{id}/image/{id}'),
                              },
                            },
                          },
                        },
                      },
                    ),
                  }
                },
              },
            ),
            options: mergeResources(
              endpoint.crud('v3/catalog/products/{id}/options'),
              {
                documents: {
                  resources: {
                    values: endpoint.crud('v3/catalog/products/{id}/options/{id}/values'),
                  }
                },
              }
            ),
            videos: endpoint.crud('v3/catalog/products/{id}/videos'),
          },
        },
      },
    ),

    store: {
      endpoints: {
        get: endpoint.get('v2/store'),
      },
    },
  },
});

export default bigCommerceConnector;

interface Query {
  [key: string]: any
}

function listIds(uriPattern: string, idField: string = 'id') {
  return (config: BigCommerceConfig) => {
    const client = BigCommerce.client(config);
    return (path: ReadonlyArray<DocId>) => {
      const docs = client.list<Record<string, DocId>>(UriTemplate.uri(uriPattern, path), {include_fields: []});
      return pipe(docs, map(doc => doc[idField]));
    };
  };
}

namespace endpoint {
  export function crud(uriPattern: string, idField: string = 'id') {
    const docUriPattern = `${uriPattern}/{id}`;

    return resource(configSchema, {
      endpoints: {
        create: endpoint.create(uriPattern),
        list: endpoint.list(uriPattern),
      },

      documents: {
        idField,

        listIds: listIds(uriPattern, idField),

        endpoints: {
          delete: endpoint.del(docUriPattern),
          get: endpoint.get(docUriPattern),
          update: endpoint.update(docUriPattern),
        },
      },
    });
  }

  export function fn<I = any, O = any>(
    uriPattern: string,
    _fn: (client: BigCommerce, uri: string, data: I, path: ReadonlyArray<DocId>) => Promise<O> | AsyncIterable<O>
  ): Endpoint<BigCommerceConfig, I, O> {
    return config => {
      const client = BigCommerce.client(config);
      return ({path, data}) => {
        const uri = UriTemplate.uri(uriPattern, path);
        return _fn(client, uri, data, path);
      };
    };
  }

  export const create = (uriPattern: string) =>
    fn(uriPattern, (bcClient, uri, data: object) => bcClient.post<object>(uri, data));

  export const del = (uriPattern: string) =>
    fn(uriPattern, (bcClient, uri, data) => bcClient.delete(uri, data));
  
  export const get = (uriPattern: string) =>
    fn(uriPattern, (bcClient, uri, data: Query|undefined) => bcClient.get<object>(uri, data));

  export const list = (uriPattern: string) =>
    fn(uriPattern, (bcClient, uri, query: Query|undefined) => bcClient.list<object>(uri, query));

  export const update = (uriPattern: string) =>
    fn(uriPattern, (bcClient, uri, data: object) => bcClient.put<object>(uri, data));
}

// Following functions are for compatibility with batch endpoints
namespace batch {
  export function crud(uriPattern: string, idField: string = 'id') {
    return resource(configSchema, {
      endpoints: {
        create: batch.createOne(uriPattern),
        list: endpoint.list(uriPattern),
      },

      documents: {
        idField,

        listIds: listIds(uriPattern, idField),

        endpoints: {
          delete: batch.deleteOne(uriPattern),
          get: batch.getOne(uriPattern),
          update: batch.updateOne(uriPattern),
        },
      },
    });
  }

  export const createOne = (uriPattern: string) =>
    endpoint.fn(uriPattern, (bcClient, uri, data: object) => bcClient.post<object>(uri, [data]));

  export const deleteOne = (uriPattern: string) => endpoint.fn(
    uriPattern,
    async (bcClient, uri, data, path) => {
      await bcClient.delete(uri, {...data, 'id:in': path[path.length - 1]});
    }
  );

  export const getOne = (uriPattern: string) => endpoint.fn(
    uriPattern,
    async (bcClient, uri, data, path) => {
      const result = await bcClient.get(uri, {...data, 'id:in': path[path.length - 1]});
      return result[0];
    }
  );

  export const updateOne = (uriPattern: string) =>
    endpoint.fn(uriPattern, (bcClient, uri, data: object) => bcClient.put<object>(uri, [data]));
}

class UriTemplate {
  static uri(uriTemplate: string, fieldValues: ReadonlyArray<DocId>): string {
    const uri = UriTemplate.applyValues(uriTemplate, fieldValues);
    const missingValues = UriTemplate.fields(uri);
    if (UriTemplate.fields(uri).length > 0) {
      throw new Error(`Missing URI fields ${missingValues.join(', ')}`);
    }
    return uri;
  }

  static applyValues(uriTemplate: string, fieldValues: ReadonlyArray<DocId>): string {
    return UriTemplate.fields(uriTemplate)
      .filter((field, index) => (fieldValues[index] ?? null) !== null)
      .reduce((uri, field, index) => uri.replace(`{${field}}`, String(fieldValues[index])), uriTemplate);
  }

  static fields(uriTemplate: string): string[] {
    // todo: convert to matchAll once we support ES2020
    return uriTemplate.match(/\{[^}]+\}/g)?.map(match => match.substring(1, match.length - 1)) || [];
  }
}
