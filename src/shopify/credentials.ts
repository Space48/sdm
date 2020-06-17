import { Config } from "../config";
import { Field, Action } from "../action";

export type ConfigSchema = {[shopName: string]: Credentials};

type Credentials = {
    shopName: string,
    apiKey: string,
    password: string,
};

export const getClientCredentials = (config: Config<ConfigSchema>, shopName: string): Credentials => {
    const credentials = config.get(shopName);
    if (!credentials) {
        throw new Error(`Shopify: No credentials available for shop ${shopName}.`);
    }
    return credentials;
}

export function getActions(config: Config<ConfigSchema>) {
    return [
        Action.source({
            name: 'set',
            params: {
                shopName: Field.string().required(),
                apiKey: Field.string().required(),
                password: Field.string().required(),
            },
            fn: () => async ({shopName, apiKey, password}) => config.set(shopName, {shopName, apiKey, password}),
        }),

        Action.source({
            name: 'get',
            params: {
                shopName: Field.string().required(),
            },
            fn: () => async ({shopName}) => config.get(shopName) ?? null,
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
            fn: () => async ({shopName}) => config.delete(shopName),
        }),
    ];
}
