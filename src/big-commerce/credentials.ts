import { Config } from "../config";
import { Field, Action } from "../action";

export type ConfigSchema = {[storeAlias: string]: Credentials};

export type Credentials = {
    storeAlias: string,
    storeHash: string,
    clientId: string,
    accessToken: string,
};

export const getClientCredentials = (config: Config<ConfigSchema>, storeHash: string): Credentials => {
    const credentials = config.get(storeHash);
    if (!credentials) {
        throw new Error(`BigCommerce: No credentials available for store ${storeHash}.`);
    }
    return credentials;
}

export function getActions(config: Config<ConfigSchema>) {
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

export function getStoreAliases(config: Config<ConfigSchema>): string[] {
    return Object.keys(config.getAll() || {});
}
