import { Config } from "../config";
import action, { Field } from "../action";

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
        action({
            name: 'set',
            params: {
                shopName: Field.string().required(),
                apiKey: Field.string().required(),
                password: Field.string().required(),
            },
            source: () => async ({shopName, apiKey, password}) => config.set(shopName, {shopName, apiKey, password}),
        }),

        action({
            name: 'get',
            params: {
                shopName: Field.string().required(),
            },
            source: () => async ({shopName}) => config.get(shopName) ?? null,
        }),

        action({
            name: 'list',
            source: () => async function* () { yield* Object.values(config.getAll() || {}) },
        }),

        action({
            name: 'list-shops',
            source: () => async function* () { yield* Object.keys(config.getAll() || {}) },
        }),

        action({
            name: 'delete',
            params: {
                shopName: Field.string().required(),
            },
            source: () => async ({shopName}) => config.delete(shopName),
        }),
    ];
}
