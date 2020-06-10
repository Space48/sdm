import { Config } from "../config";
import action, { Field } from "../action";

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
        action({
            name: 'set',
            params: {
                storeAlias: Field.string().required(),
                storeHash: Field.string().required(),
                accessToken: Field.string().required(),
                clientId: Field.string().required(),
            },
            source: () => async ({storeAlias, storeHash, accessToken, clientId}) => {
                config.set(storeAlias, {storeAlias, storeHash, accessToken, clientId});
            },
        }),

        action({
            name: 'get',
            params: {
                storeAlias: Field.string().required(),
            },
            source: () => async ({storeAlias}) => config.get(storeAlias) ?? null,
        }),

        action({
            name: 'list',
            source: () => async function* () { yield* Object.values(config.getAll() || {}) },
        }),

        action({
            name: 'list-stores',
            source: () => async function* () { yield* Object.keys(config.getAll() || {}) },
        }),

        action({
            name: 'delete',
            params: {
                storeAlias: Field.string().required(),
            },
            source: () => async ({storeAlias}) => config.delete(storeAlias),
        }),
    ];
}
