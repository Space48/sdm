import { ConfigStore } from "../config-store";
import { Field, Action, ActionError } from "../action";
import Shopify from "shopify-api-node";
import pRetry from "p-retry";

export type ConfigSchema = {[shopName: string]: Credentials};

type Credentials = {
    shopName: string,
    apiKey: string,
    password: string,
};

export function createShopifyClient(config: ConfigStore<ConfigSchema>, shopName: string): Shopify {
    const credentials = config.get(shopName);
    if (!credentials) {
        throw new Error(`Shopify: No credentials available for shop ${shopName}.`);
    }
    const client = new Shopify({...credentials, apiVersion: '2020-10'});
    const requestFn = (client as any).request.bind(client);
    (client as any).request = backoff(requestFn);
    return client;
}

export function getActions(config: ConfigStore<ConfigSchema>) {
    return [
        Action.source({
            name: 'set',
            params: {
                shopName: Field.string().required(),
                apiKey: Field.string().required(),
                password: Field.string().required(),
            },
            fn: () => async ({params: {shopName, apiKey, password}}) => config.set(shopName, {shopName, apiKey, password}),
        }),

        Action.source({
            name: 'get',
            params: {
                shopName: Field.string().required(),
            },
            fn: () => async ({params: {shopName}}) => config.get(shopName) ?? null,
        }),

        Action.source({
            name: 'list',
            fn: () => async function* () { yield* Object.values(config.getAll() || {}) },
        }),

        Action.source({
            name: 'list-shops',
            fn: () => async function* () { yield* Object.keys(config.getAll() || {}) },
        }),

        Action.source({
            name: 'delete',
            params: {
                shopName: Field.string().required(),
            },
            fn: () => async ({params: {shopName}}) => config.delete(shopName),
        }),
    ];
}

export function getShops(config: ConfigStore<ConfigSchema>): string[] {
    return Object.keys(config.getAll() || {});
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
