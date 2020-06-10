import Shopify from 'shopify-api-node';
import { ResourceKey, Resource, resources } from './resource';
import { ActionType, ShopifyActionFactory } from './action';
import { ActionConfig, Action } from '../action';
import { objectFromEntries } from '../util';

export const getAllResourceActions = (factory: ShopifyActionFactory): Record<string, Action[]> => (
    objectFromEntries(Object.values(resources).map(resource => [resource.key, getResourceActions(resource, factory)]))
);

function getResourceActions(resource: Resource, factory: ShopifyActionFactory) {
    const config = resourceConfigs[resource.key];
    if (config === false) {
        return [];
    }
    return resource.endpoints
        .filter(endpointName => config?.[endpointName as keyof typeof config] !== false)
        .map(endpointName => factory.create(
            resource.key,
            endpointName,
            config?.[endpointName as keyof typeof config] ?? standardEndpoints[endpointName as StandardEndpoint]
        ));
}

// all of the disabled endpoints can potentially be enabled -- JDF
const resourceConfigs: ResourceConfigs = {
    applicationCharge: false,
    article: false,
    balance: false,
    cancellationRequest: false,
    checkout: false,
    collection: {
        products: ActionType.List,
    },
    collectionListing: {
        productIds: false,
    },
    comment: false,
    customer: {
        accountActivationUrl: false,
        orders: ActionType.List,
        search: false,
        sendInvite: false,
    },
    customerAddress: {
        default: false,
        set: ActionType.Sink,
    },
    customerSavedSearch: false,
    discountCode: {
        lookup: ActionType.Source,
    },
    discountCodeCreationJob: false,
    draftOrder: {
        complete: ActionType.Sink,
        sendInvoice: ActionType.Sink,
    },
    fulfillment: {
        cancel: ActionType.Sink,
        complete: ActionType.Sink,
        open: ActionType.Sink,
    },
    fulfillmentOrder: false,
    fulfillmentRequest: false,
    giftCard: {
        disable: ActionType.Sink,
        search: false,
    },
    inventoryLevel: {
        adjust: false,
        connect: false,
        set: false,
    },
    location: {
        inventoryLevels: ActionType.List,
    },
    marketingEvent: false,
    order: {
        cancel: ActionType.Sink,
        close: ActionType.Sink,
        fulfillmentOrders: ActionType.List,
        open: ActionType.Sink,
    },
    productListing: {
        productIds: false,
    },
    recurringApplicationCharge: false,
    refund: {
        calculate: false,
    },
    smartCollection: {
        order: false,
        products: false,
    },
    user: {
        current: ActionType.NoIdSource,
    },
};

const standardEndpoints = {
    count: ActionType.NoIdSource,
    create: ActionType.NoIdSink,
    delete: ActionType.Source,
    get: ActionType.Source,
    list: ActionType.NoIdList,
    update: ActionType.Sink,
};
type StandardEndpoint = keyof typeof standardEndpoints;

type ResourceConfigs =
    {[R in ResourcesRequiringConfig]: ResourceConfig<R>}
    & Partial<{[R in ResourcesNotRequiringConfig]: ResourceConfig<R>}>;
type ResourcesRequiringConfig = {[R in ResourceKey]: keyof NonStandardEndpointsConfig<R> extends never ? never : R}[ResourceKey];
type ResourcesNotRequiringConfig = Exclude<ResourceKey, ResourcesRequiringConfig>;
type ResourceConfig<R extends ResourceKey> = (StandardEndpointsConfig<R> & NonStandardEndpointsConfig<R>) | false;
type EndpointConfig = ActionType|false;
type StandardEndpointsConfig<R extends keyof ShopifyAugmented> = {
    [K in keyof Pick<Endpoints<R>, Extract<keyof Endpoints<R>, StandardEndpoint>>]?: EndpointConfig
};
type NonStandardEndpointsConfig<R extends keyof ShopifyAugmented> = {
    [K in keyof Pick<Endpoints<R>, Exclude<keyof Endpoints<R>, StandardEndpoint>>]: EndpointConfig
};

type Endpoints<R extends keyof ShopifyAugmented> = ShopifyAugmented[R] extends Record<string, any>
    ? {[K in keyof ShopifyAugmented[R]]: ShopifyAugmented[R][K] extends Function ? ShopifyAugmented[R][K] : never}
    : never;

// at the time of writing, he following endpoints are missing from the shopify-api-node type declarations
declare class ShopifyAugmented extends Shopify {
    customer: Shopify['customer'] & {
        orders: (id: number, params?: any) => Promise<any>,
        sendInvite: (id: number, params?: any) => Promise<any>,
    }
}
