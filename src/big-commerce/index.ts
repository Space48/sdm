import * as config from './config';
import { ConfigStore } from '../config-store';
import { Connector, ConnectorScope } from '../connector';
import { BigCommerceResourceFactory } from './resource-factory';
import { Cardinality, ResourceCollection, EndpointScope } from '../resource';
import BigCommerce from './client';
import { Field } from '../action';

export type ConfigSchema = {
  credentials: config.ConfigSchema,
};

export default class BigCommerceConnector implements Connector {
  constructor(private configStore: ConfigStore<ConfigSchema>) {}

  getConfigActions() {
    return config.getActions(this.configStore.select('credentials'));
  }

  getScopes() {
    const credentialsConfig = this.configStore.select('credentials');
    return config.getStoreAliases(credentialsConfig);
  }

  getScope(storeAlias: string) {
    const credentialsConfig = this.configStore.select('credentials');
    return new BigCommerceScope(storeAlias, credentialsConfig);
  }

  getTypicalResources() {
    return {};
  }
}

class BigCommerceScope implements ConnectorScope {
  constructor(
    private storeAlias: string,
    private configStore: ConfigStore<ConfigSchema['credentials']>,
  ) {}

  get name() {
    return this.storeAlias;
  }

  async getWarningMessage() {
    try {
      const store = await this.client.get('v2/store');
      if (store.status === 'live') {
        return `Store is LIVE at ${store.domain}`;
      }
      if (!store.domain.endsWith('.mybigcommerce.com')) {
        return `Store is using custom domain ${store.domain}`
      }
    } catch {
      return 'Failed to fetch store data from BigCommerce API. This could be a live store.';
    }
  }

  getResources() {
    return getResources(this.client);
  }

  private _client: BigCommerce|undefined;

  private get client() {
    if (!this._client) {
      this._client = config.createBigCommerceClient(this.configStore, this.storeAlias);
    }
    return this._client;
  }
}

function getResources(client: BigCommerce): ResourceCollection {
  const resource = new BigCommerceResourceFactory(client);

  return {
    blogPosts: resource.documentCollection('v2/blog/post'),

    blogTags: resource.documentCollection('v2/blog/tag'),
    
    carts: {
      ...resource.documentCollection('v3/carts', {
        create: true,
        get: true,
        update: true,
        delete: true,
      }),

      docKey: {name: 'id', type: Field.string()},

      children: {
        items: {
          ...resource.documentCollection('v3/carts/{id}/items', {
            create: true,
            update: true,
            delete: true,
          }),

          docKey: {name: 'id', type: Field.string()},
        },
      },
    },

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

    customers: resource.documentCollectionWithBatchEndpoints('v3/customers'),

    customerAddresses: resource.documentCollectionWithBatchEndpoints('v3/customers/addresses'),

    customerAttributes: resource.documentCollectionWithBatchEndpoints('v3/customers/attributes', {
      children: {
        values: {
          endpoints: {
            list: {
              scope: EndpointScope.Resource,
              cardinality: Cardinality.Many,
              fn: ({docKeys: [attributeId], data}) => client.list('v3/customers/attribute-values', {
                ...data,
                'attribute_id:in': attributeId,
              }),
            },
          },
        },
      },
    }),

    customerAttributeValues: resource.documentCollection('v3/customers/attribute-values', {
      list: true,

      customEndpoints: {
        delete: {
          scope: EndpointScope.Document,
          cardinality: Cardinality.One,
          fn: ({docKeys: [id]}) => client.delete('v3/customers/attribute-values', {'id:in': id}),
        },
        set: {
          scope: EndpointScope.Resource,
          cardinality: Cardinality.One,
          fn: ({data}) => client.put('v3/customers/attribute-values', [data]).then(result => result[0]),
        },
      },
    }),

    giftCertificates: resource.documentCollection('v2/gift_certificates'),
    
    orders: {
      ...resource.documentCollection('v2/orders'),

      children: {
        refunds: resource.singletonResource('v3/orders/{id}/payment_actions/refunds', {get: true}),
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
        variants: {
          ...resource.documentCollection('v3/catalog/products/{id}/variants'),

          children: {
            metafields: resource.documentCollection('v3/catalog/products/{id}/variants/{id}/metafields'),
          },
        },
        videos: resource.documentCollection('v3/catalog/products/{id}/videos'),
      },
    },

    // 'price-list-record': todo: this would be useful, but it requires bespoke sources and sinks

    store: resource.singletonResource('v2/store', {
      get: true,
    }),
  };
}
