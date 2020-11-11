import Shopify from "shopify-api-node";
import { Field } from "../action";
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
    params?: Record<string, string>,
    fn: (shopify: Shopify, input: EndpointPayload) => Promise<any>,
};
type FlatMapEndpoint = {
    scope: EndpointScope,
    cardinality: Cardinality.Many,
    params?: Record<string, string>,
    fn: (shopify: Shopify, input: EndpointPayload) => AsyncIterable<any>,
};

export function getResources(config: Record<string, ConfiguredResource>, client: Shopify): ResourceCollection {
    return new Shop(config, client).getResources();
}

class Shop {
    constructor(
        private config: Record<string, ConfiguredResource>,
        private client: Shopify,
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
                    this.flatMap(
                        resource.endpoints.list.params,
                        (client, {docKeys, data}) => (client[resource.clientKey!] as any).list(...docKeys, data)
                    ),
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
                            fn: this.map(
                                config.params,
                                (client, {docKeys, data}) => (client[resource.clientKey!] as any)[name](...docKeys, data)
                            ),
                        };
                    case Cardinality.Many:
                        return {
                            ...config,
                            cardinality: Cardinality.Many,
                            fn: this.flatMap(
                                config.params,
                                (client, {docKeys, data}) => (client[resource.clientKey!] as any)[name](...docKeys, data)
                            ),
                        };
                }
            }),

            ...mapProperties(resource.customEndpoints || {}, config => ({
                ...config,
                fn: config.cardinality === Cardinality.One
                    ? input => config.fn(this.client, input)
                    : input => config.fn(this.client, input),
            })),
        };
    }

    private children(resource: ConfiguredResource): ResourceCollection {
        return mapProperties(resource.children || {}, child => this.resource(child));
    }

    private map(params: any, fn: (client: Shopify, input: EndpointPayload) => Promise<any>): MapEndpointFn {
        const that = this;
        return input => fn(that.client, {...params, ...input});
    }

    private flatMap(params: any, fn: (client: Shopify, input: EndpointPayload) => Promise<any>): FlatMapEndpointFn {
        const that = this;
        return async function* ({docKeys, data, ...rest}) {
            let _params = { ...params, ...data, limit: 250 };
            do {
                const result = await fn(that.client, {docKeys, data: _params, ...rest});
                yield* result;
                _params = (result as any).nextPageParameters;
            } while (_params);
        };
    }
}
