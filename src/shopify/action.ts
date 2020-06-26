import { Config } from "../config";
import { getClientCredentials, ConfigSchema } from './credentials';
import Shopify from "shopify-api-node";
import pRetry from "p-retry";
import { FieldValues, Action, Field, ActionError } from "../action";
import { EndpointArgs, ResourceCollection, ResourceConfig, resourceAction, EndpointConfig, EndpointScope, Cardinality, SingletonResourceConfig, DocumentCollectionConfig, MapEndpointFn, FlatMapEndpointFn } from "../resource";
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
    fn: (shopify: Shopify) => (input: EndpointArgs) => Promise<any>,
};
type FlatMapEndpoint = {
    scope: EndpointScope,
    cardinality: Cardinality.Many,
    fn: (shopify: Shopify) => (input: EndpointArgs) => AsyncIterable<any>,
};

export type ShopifyContext = typeof ShopifyActionFactory.context;

export class ShopifyActionFactory {
    static readonly context = {};

    constructor(private config: Config<ConfigSchema>) {}

    getAction(shop: string, resources: Record<string, ConfiguredResource>): Action {
        const resourceCollection = ResourceCollection.configure({
            context: ShopifyActionFactory.context,
            resources: mapProperties(resources, resource => this.resource(shop, resource)),
        });
        return resourceAction(shop, resourceCollection);
    }

    private resource(shop: string, resource: ConfiguredResource): ResourceConfig<ShopifyContext> {
        return (resource.hasId !== false)
            ? {
                key: {name: 'id', type: Field.integer()},
                listKeys: resource.clientKey && resource.endpoints?.list && (context => {
                    const listDocs = this.flatMap(shop, (client, {path, data}) => (client[resource.clientKey!] as any).list(...path, data))(context);
                    return compose(
                        path => ({path}),
                        listDocs,
                        map(doc => doc.id)
                    );
                }),
                children: this.children(shop, resource),
                endpoints: this.endpoints(shop, resource),
            } : {
                children: this.children(shop, resource),
                endpoints: this.endpoints(shop, resource),
            };
    }

    private endpoints(shop: string, resource: ConfiguredResource): Record<string, EndpointConfig<ShopifyContext, any>> {
        return {
            ...mapProperties(resource.endpoints || {}, (config, name) => {
                switch (config.cardinality) {
                    case Cardinality.One:
                        return {
                            ...config,
                            cardinality: Cardinality.One,
                            fn: this.map(shop, (client, {path, data}) => (client[resource.clientKey!] as any)[name](...path, data))
                        };
                    case Cardinality.Many:
                        return {
                            ...config,
                            cardinality: Cardinality.Many,
                            fn: this.flatMap(shop, (client, {path, data}) => (client[resource.clientKey!] as any)[name](...path, data))
                        };
                }
            }),

            ...mapProperties(resource.customEndpoints || {}, (config) => ({
                ...config,
                fn: context => {
                    const client = this.getClient(shop, context);
                    return config.fn(client) as any;
                },
            })),
        };
    }

    private children(shop: string, resource: ConfiguredResource): Pick<ResourceConfig<ShopifyContext>, 'children'> {
        return mapProperties(resource.children || {}, (child, name) => this.resource(shop, child));
    }

    private map(shop: string, fn: (client: Shopify, input: EndpointArgs) => Promise<any>): MapEndpointFn<ShopifyContext> {
        return context => {
            const client = this.getClient(shop, context);
            return input => {
                return fn(client, input);
            }
        };
    }

    private flatMap(shop: string, fn: (client: Shopify, input: EndpointArgs) => Promise<any>): FlatMapEndpointFn<ShopifyContext> {
        return context => {
            const client = this.getClient(shop, context);
            return async function* ({path}) {
                let _params = { limit: 250 };
                do {
                    const result = await fn(client, {path, data: _params});
                    yield* result;
                    _params = (result as any).nextPageParameters;
                } while (_params);
            };
        };
    }

    private client: Shopify|undefined;

    private getClient(shop: string, {}: FieldValues<ShopifyContext>): Shopify {
        if (!this.client) {
            const clientCredentials = getClientCredentials(this.config, shop);
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
                detail: typeof e.response.body === 'object' ? e.response.body.errors : null,
            })
            throw e.response?.statusCode == 429 ? actionError : new pRetry.AbortError(actionError);
        }
    };
    return pRetry(run, {retries: 50});
};
