import BigCommerce, { Config, configSchema } from './client';
import { connector, resourceMerger } from '../../framework';
import { batch, endpoint, listIds, Query } from './functions';

// do not remove the following imports -- they are intended to tidy up the generated declaration files
import * as f from '../../framework';

export type BigCommerceConfig = Config;

const mergeResources = resourceMerger<BigCommerce>();

export const bigCommerce = connector({
  configSchema,
  
  scopeNameExample: 'some-store-alias',
  
  getScopeName: config => config.storeAlias,

  getScope: config => new BigCommerce(config),
  
  getWarningMessage: async (client: BigCommerce) => {
    try {
      const store = await client.get('v2/store');
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

    pages: endpoint.crud('v2/pages'),

    paymentMethods: {
      endpoints: {
        list: endpoint.list('v3/payments/methods'),
      },
    },

    products: mergeResources(
      endpoint.crud('v3/catalog/products'),
      {
        endpoints: {
          update: batch.updateOne('v3/catalog/products'),
        },

        resources: {
          variants: {
            endpoints: {
              list: endpoint.list('v3/catalog/variants'),
              update: batch.updateOne('v3/catalog/variants'),
            },
          }
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
                        documents: {
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
            reviews: endpoint.crud('v3/catalog/products/{id}/reviews'),
            variants: mergeResources(
              endpoint.crud('v3/catalog/products/{id}/variants'),
              {
                documents: {
                  resources: {
                    metafields: endpoint.crud('v3/catalog/products/{id}/variants/{id}/metafields'),
                  },
                },
              },
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
