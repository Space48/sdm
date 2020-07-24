import { ConfigStore } from "../config-store";
import { Field, Action } from "../action";
import BigCommerce from "./client";

export type ConfigSchema = {[storeAlias: string]: Credentials};

export type Credentials = {
    storeAlias: string,
    storeHash: string,
    clientId: string,
    accessToken: string,
};

export function getBigCommerceClient(configStore: ConfigStore<ConfigSchema>, storeAlias: string) {
    const credentials = configStore.get(storeAlias);
    if (!credentials)  {
        const allAliases = Object.keys(configStore.select('credentials').getAll() || {});
        throw new Error(`No credentials found for store ${storeAlias}. Available stores: ${allAliases.join(', ')}`);
    }
    return new BigCommerce(credentials);
}

export function getActions(config: ConfigStore<ConfigSchema>) {
    return [
        Action.source({
            name: 'set',
            params: {
                storeAlias: Field.string().required(),
                storeHash: Field.string().required(),
                accessToken: Field.string().required(),
                clientId: Field.string().required(),
            },
            fn: () => async ({params: {storeAlias, storeHash, accessToken, clientId}}) => {
                config.set(storeAlias, {storeAlias, storeHash, accessToken, clientId});
            },
        }),

        Action.source({
            name: 'get',
            params: {
                storeAlias: Field.string().required(),
            },
            fn: () => async ({params: {storeAlias}}) => config.get(storeAlias) ?? null,
        }),

        Action.source({
            name: 'list',
            fn: () => async function* () { yield* Object.values(config.getAll() || {}) },
        }),

        Action.source({
            name: 'list-stores',
            fn: () => async function* () { yield* Object.keys(config.getAll() || {}) },
        }),

        Action.source({
            name: 'delete',
            params: {
                storeAlias: Field.string().required(),
            },
            fn: () => async ({params: {storeAlias}}) => config.delete(storeAlias),
        }),
    ];
}

export function getStoreAliases(config: ConfigStore<ConfigSchema>): string[] {
    return Object.keys(config.getAll() || {});
}
