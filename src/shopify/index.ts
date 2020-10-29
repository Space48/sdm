import * as config from './config';
import { ConfigStore } from '../config-store';
import { ConfiguredResource, ShopifyCustomEndpoint, ShopifyVanillaEndpoint, getResources } from './resource-factory';
import { ResourceKey, resources, Resource } from './resource';
import Shopify from 'shopify-api-node';
import { objectFromEntries } from '../util';
import { EndpointScope, Cardinality } from '../resource';
import { Connector, ConnectorScope } from '../connector';

export default class ShopifyConnector implements Connector {
    constructor(private configStore: ConfigStore<ConfigSchema>) {}

    getConfigActions() {
        return config.getActions(this.configStore.select('credentials'));
    }

    getScopes() {
        const credentialsConfig = this.configStore.select('credentials');
        return config.getShops(credentialsConfig);
    }

    getScope(shop: string) {
        const credentialsConfig = this.configStore.select('credentials');
        return new ShopifyScope(shop, credentialsConfig)
    }

    getTypicalResources() {
        return {};
    }
}

class ShopifyScope implements ConnectorScope {
    constructor(
        private shop: string,
        private configStore: ConfigStore<ConfigSchema['credentials']>,
    ) {}

    get name() {
        return this.shop;
    }

    async getWarningMessage() {
        try {
            const shop = await this.client.shop.get();
            if (!shop.password_enabled) {
                return `Shop is LIVE at ${shop.domain}`;
            }
            if (shop.domain !== shop.myshopify_domain) {
                return `Shop is using custom domain ${shop.domain}`
            }
        } catch {
            return 'Failed to fetch shop data from Shopify API. This could be a live shop.';
        }
    }

    async getResources() {
        return getResources(buildConfig(), this.client);
    }

    private _client: Shopify|undefined;

    private get client() {
        if (!this._client) {
            this._client = config.createShopifyClient(this.configStore, this.shop);
        }
        return this._client;
    }
}

// all of the disabled endpoints can potentially be enabled -- JDF
const resourceConfigs: ResourceConfigs = {
    applicationCharge: false,
    article: {
        endpoints: {
            authors: false,
            tags: {
                scope: EndpointScope.Document,
                cardinality: Cardinality.One,
            },
        }
    },
    balance: false,
    cancellationRequest: false,
    checkout: false,
    collection: {
        endpoints: {
            products: {
                scope: EndpointScope.Document,
                cardinality: Cardinality.Many,
            },
        }
    },
    collectionListing: {
        endpoints: {
            productIds: false,
        }
    },
    comment: false,
    customer: {
        endpoints: {
            accountActivationUrl: false,
            orders: {
                scope: EndpointScope.Document,
                cardinality: Cardinality.One,
            },
            search: false,
            sendInvite: {
                scope: EndpointScope.Document,
                cardinality: Cardinality.One,
            },
        }
    },
    customerAddress: {
        endpoints: {
            default: {
                scope: EndpointScope.Document,
                cardinality: Cardinality.One,
            },
            set: {
                scope: EndpointScope.Resource,
                cardinality: Cardinality.One,
            },
        }
    },
    customerSavedSearch: false,
    discountCode: {
        endpoints: {
            lookup: {
                scope: EndpointScope.Resource,
                cardinality: Cardinality.One,
            },
        }
    },
    discountCodeCreationJob: false,
    draftOrder: {
        endpoints: {
            complete: {
                scope: EndpointScope.Document,
                cardinality: Cardinality.One,
            },
            sendInvoice: {
                scope: EndpointScope.Document,
                cardinality: Cardinality.One,
            },
        }
    },
    fulfillment: {
        endpoints: {
            cancel: {
                scope: EndpointScope.Document,
                cardinality: Cardinality.One,
            },
            complete: {
                scope: EndpointScope.Document,
                cardinality: Cardinality.One,
            },
            open: {
                scope: EndpointScope.Document,
                cardinality: Cardinality.One,
            },
        }
    },
    fulfillmentOrder: false,
    fulfillmentRequest: false,
    giftCard: {
        endpoints: {
            disable: {
                scope: EndpointScope.Document,
                cardinality: Cardinality.One,
            },
            search: false,
        }
    },
    inventoryLevel: {
        endpoints: {
            adjust: false,
            connect: false,
            set: false,
        }
    },
    location: {
        endpoints: {
            inventoryLevels: {
                scope: EndpointScope.Document,
                cardinality: Cardinality.Many,
            },
        }
    },
    marketingEvent: false,
    order: {
        endpoints: {
            cancel: {
                scope: EndpointScope.Document,
                cardinality: Cardinality.One,
            },
            close: {
                scope: EndpointScope.Document,
                cardinality: Cardinality.One,
            },
            fulfillmentOrders: {
                scope: EndpointScope.Document,
                cardinality: Cardinality.One,
            },
            open: {
                scope: EndpointScope.Document,
                cardinality: Cardinality.One,
            },
        }
    },
    product: {
        endpoints: {},
        children: {
            metafields: {
                hasId: false,
                customEndpoints: {
                    get: {
                        scope: EndpointScope.Resource,
                        cardinality: Cardinality.One,
                        fn: (shopify, {docKeys: [productId]}) => shopify.metafield.list({
                            metafield: { owner_resource: 'product', owner_id: productId }
                        }),
                    }
                },
            },
        },
    },
    productListing: {
        endpoints: {
            productIds: false,
        }
    },
    recurringApplicationCharge: false,
    refund: {
        endpoints: {
            calculate: false,
        }
    },
    shop: {
        hasId: false,
        endpoints: {},
    },
    smartCollection: {
        endpoints: {
            order: false,
            products: false,
        }
    },
    user: {
        endpoints: {
            current: {
                scope: EndpointScope.Resource,
                cardinality: Cardinality.One,
            },
        }
    },
};

export type ConfigSchema = {
    credentials: config.ConfigSchema,
};

let _config: Record<string, ConfiguredResource>|undefined = undefined;
function buildConfig(): Record<string, ConfiguredResource> {
    if (_config) {
        return _config;
    }

    const resourcesByParentName: Map<string, Resource[]> = new Map();
    const enabledResources = Object.values(resources).filter(resource => resourceConfigs[resource.key] !== false);
    
    enabledResources
        .filter(resource => resource.parentName)
        .forEach(resource => {
            if (!resourcesByParentName.has(resource.parentName!)) {
                resourcesByParentName.set(resource.parentName!, []);
            }
            resourcesByParentName.get(resource.parentName!)!.push(resource)
        });
    
    function processResource(resource: Resource): ConfiguredResource {
        return getConfiguredResource(resource, resourceConfigs[resource.key] as ResourceConfig<any>|undefined);
    }
    
    function getConfiguredResource(resource: Resource|undefined, config: ResourceConfig<any>|undefined): ConfiguredResource {
        const childResources = resource && resourcesByParentName.get(resource.name) || [];
        return {
            clientKey: resource?.key,
            endpoints: objectFromEntries(
                (resource?.endpoints || [])
                    .filter(endpointName => config?.endpoints[endpointName] !== false)
                    .map(endpointName => [endpointName, config?.endpoints[endpointName] || standardEndpoints[endpointName as StandardEndpoint]])
            ),
            customEndpoints: config?.customEndpoints,
            children: {
                ...objectFromEntries(childResources.map(child => [child.name, processResource(child)])),
                ...config?.children
            },
        };
    }
    
    return _config = objectFromEntries(
        enabledResources
            .filter(resource => !resource.parentName)
            .map(resource => [resource.name, processResource(resource)])
    );
}

type ResourceConfigs =
    {[R in ResourcesRequiringConfig]: ResourceConfig<R>|false}
    & Partial<{[R in ResourcesNotRequiringConfig]: ResourceConfig<R>|false}>;
type ResourcesRequiringConfig = {[R in ResourceKey]: keyof NonStandardEndpointsConfig<R> extends never ? never : R}[ResourceKey];
type ResourcesNotRequiringConfig = Exclude<ResourceKey, ResourcesRequiringConfig>;
type ResourceConfig<R extends ResourceKey> = {
    hasId?: false;
    endpoints: (StandardEndpointsConfig<R> & NonStandardEndpointsConfig<R>);
    customEndpoints?: Record<string, ShopifyCustomEndpoint>;
    children?: ConfiguredResource['children'];
};

type StandardEndpointsConfig<R extends keyof ShopifyAugmented> = {
    [K in keyof Pick<Endpoints<R>, Extract<keyof Endpoints<R>, StandardEndpoint>>]?: ShopifyVanillaEndpoint|false
};
type NonStandardEndpointsConfig<R extends keyof ShopifyAugmented> = {
    [K in keyof Pick<Endpoints<R>, Exclude<keyof Endpoints<R>, StandardEndpoint>>]: ShopifyVanillaEndpoint|false
};
type Endpoints<R extends keyof ShopifyAugmented> = ShopifyAugmented[R] extends Record<string, any>
    ? {[K in keyof ShopifyAugmented[R]]: ShopifyAugmented[R][K] extends Function ? ShopifyAugmented[R][K] : never}
    : never;

// at the time of writing, the following endpoints are missing from the shopify-api-node type declarations
declare class ShopifyAugmented extends Shopify {
    customer: Shopify['customer'] & {
        orders: (id: number, params?: any) => Promise<any>,
        sendInvite: (id: number, params?: any) => Promise<any>,
    }
}

type StandardEndpoint = keyof typeof standardEndpoints;

const standardEndpoints = {
    count: {
        scope: EndpointScope.Resource,
        cardinality: Cardinality.One,
    },
    create: {
        scope: EndpointScope.Resource,
        cardinality: Cardinality.One,
    },
    delete: {
        scope: EndpointScope.Document,
        cardinality: Cardinality.One,
    },
    get: {
        scope: EndpointScope.Document,
        cardinality: Cardinality.One,
    },
    update: {
        scope: EndpointScope.Document,
        cardinality: Cardinality.One,
    },
    list: {
        scope: EndpointScope.Resource,
        cardinality: Cardinality.Many,
    },
};
