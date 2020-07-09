import { ConfigStore } from "../config-store";
import { getClientCredentials, ConfigSchema } from './config';
import Shopify from "shopify-api-node";
import pRetry from "p-retry";
import { Field, ActionError } from "../action";
import { EndpointPayload, ResourceConfig, EndpointConfig, EndpointScope, Cardinality, MapEndpointFn, FlatMapEndpointFn, ResourceCollection } from "../resource";
import { mapProperties } from '../util';
import { compose, map } from "@space48/json-pipe";

export type ConfiguredResource = {
    clientKey?: keyof Shopify,
    hasId?: boolean,
    endpoints?: Record<string, ShopifyVanillaEndpoint>,
    customEndpoints?: Record<string, ShopifyCustomEndpoint>,
    children?: Record<string, ConfiguredResource>,
};

export type ShopifyVanillaEndpoint = Omit<ShopifyCustomEndpoint, 'fn'>;
export type ShopifyCustomEndpoint = MapEndpoint | FlatMapEndpoint;

type MapEndpoint = {
    scope: EndpointScope,
    cardinality: Cardinality.One,
    fn: (shopify: Shopify, input: EndpointPayload) => Promise<any>,
};
type FlatMapEndpoint = {
    scope: EndpointScope,
    cardinality: Cardinality.Many,
    fn: (shopify: Shopify, input: EndpointPayload) => AsyncIterable<any>,
};

export class ShopifyResourceFactory {
    constructor(
        private configStore: ConfigStore<ConfigSchema>,
        private config: Record<string, ConfiguredResource>
    ) {}

    getResources(shopName: string): ResourceCollection {
        return new Shop(shopName, this.configStore, this.config).getResources();
    }
}

class Shop {
    constructor(
        private shop: string,
        private configStore: ConfigStore<ConfigSchema>,
        private config: Record<string, ConfiguredResource>
    ) {}

    getResources(): ResourceCollection {
        return mapProperties(this.config, resource => this.resource(resource));
    }

    private resource(resource: ConfiguredResource): ResourceConfig {
        return (resource.hasId !== false)
            ? {
                docKey: {name: 'id', type: Field.integer()},
                listDocKeys: resource.clientKey && resource.endpoints?.list && compose(
                    keys => ({docKeys: keys}),
                    this.flatMap((client, {docKeys}) => (client[resource.clientKey!] as any).list(...docKeys)),
                    map(doc => doc.id)
                ),
                children: this.children(resource),
                endpoints: this.endpoints(resource),
            } : {
                children: this.children(resource),
                endpoints: this.endpoints(resource),
            };
    }

    private endpoints(resource: ConfiguredResource): Record<string, EndpointConfig<any, any>> {
        return {
            ...mapProperties(resource.endpoints || {}, (config, name) => {
                switch (config.cardinality) {
                    case Cardinality.One:
                        return {
                            ...config,
                            cardinality: Cardinality.One,
                            fn: this.map((client, {docKeys, data}) => (client[resource.clientKey!] as any)[name](...docKeys, data))
                        };
                    case Cardinality.Many:
                        return {
                            ...config,
                            cardinality: Cardinality.Many,
                            fn: this.flatMap((client, {docKeys, data}) => (client[resource.clientKey!] as any)[name](...docKeys, data))
                        };
                }
            }),

            ...mapProperties(resource.customEndpoints || {}, config => ({
                ...config,
                fn: config.cardinality === Cardinality.One
                    ? input => config.fn(this.getClient(), input)
                    : input => config.fn(this.getClient(), input),
            })),
        };
    }

    private children(resource: ConfiguredResource): ResourceCollection {
        return mapProperties(resource.children || {}, child => this.resource(child));
    }

    private map(fn: (client: Shopify, input: EndpointPayload) => Promise<any>): MapEndpointFn {
        const that = this;
        return input => fn(that.getClient(), input);
    }

    private flatMap(fn: (client: Shopify, input: EndpointPayload) => Promise<any>): FlatMapEndpointFn {
        const that = this;
        return async function* ({docKeys, data: _, ...rest}) {
            let _params = { limit: 250 };
            do {
                const result = await fn(that.getClient(), {docKeys, data: _params, ...rest});
                yield* result;
                _params = (result as any).nextPageParameters;
            } while (_params);
        };
    }

    private client: Shopify|undefined;

    private getClient(): Shopify {
        if (!this.client) {
            const clientCredentials = getClientCredentials(this.configStore, this.shop);
            const client = new Shopify({...clientCredentials, apiVersion: '2019-10'});
            const requestFn = (client as any).request.bind(client);
            (client as any).request = backoff(requestFn);
            this.client = client;
        }
        return this.client;
    }
}

type Fn = (...args: any[]) => Promise<any>;
const backoff = <F extends Fn>(fn: F) => (...args: Parameters<F>) => {
    const run = async () => {
        try {
            return await fn(...args);
        } catch (e) {
            const actionError = new ActionError({
                message: e.message,
                detail: typeof e.response?.body === 'object' ? (e.response.body.errors ?? e.response.body) : null,
            })
            throw e.response?.statusCode == 429 ? actionError : new pRetry.AbortError(actionError);
        }
    };
    return pRetry(run, {retries: 50});
};
