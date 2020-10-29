import { ConfigStore } from "../config-store";
import { Field, Action } from "../action";
import { parse as parseUrl } from "url";
import { SoapConfig, SoapCredentials } from "./soap";
import { getAccessToken, RestConfig, RestCredentials, RestTokenPair } from "./rest";

export function getBaseUrls(config: ConfigStore<ConfigSchema>): string[] {
    return Object.keys(config.getAll() || {}).map(computeUrlForComparison);
}

export type ConfigSchema = {[baseUrl: string]: InstanceConfig};

export function getInstanceConfig(configStore: ConfigStore<ConfigSchema>, baseUrl: string): InstanceConfig|undefined {
    const urlExcludingScheme = computeUrlForComparison(baseUrl);
    return configStore.get(baseUrl) || Object.values(configStore.getAll() || {}).find(candidate => urlExcludingScheme === computeUrlForComparison(candidate.baseUrl));
}

export function getActions(config: ConfigStore<ConfigSchema>) {
    return [
        Action.source({
            name: 'set',
            params: {
                baseUrl: Field.string().required(),
                insecure: Field.boolean().default(false),
            },
            fn: () => async ({params: {baseUrl, insecure}}) => {
                const urlForComparison = computeUrlForComparison(baseUrl);
                config.select(urlForComparison)
                    .set('baseUrl', baseUrl)
                    .set('insecure', insecure);
            },
        }),

        Action.source({
            name: 'set:rest',
            params: {
                baseUrl: Field.string().required(),
                key: Field.string().required(),
                secret: Field.string().required(),
                token: Field.string().optional(),
                tokenSecret: Field.string().optional(),
            },
            fn: () => async ({params: {baseUrl, key, secret, token, tokenSecret}}) => {
                const credentials: RestCredentials = {key, secret};
                const accessToken: RestTokenPair = token && tokenSecret ? {token, tokenSecret} : await getAccessToken(baseUrl, credentials);
                const urlForComparison = computeUrlForComparison(baseUrl);
                config.select(urlForComparison)
                    .set('baseUrl', baseUrl)
                    .set('rest', {credentials, accessToken});
            },
        }),

        Action.source({
            name: 'set:soap',
            params: {
                baseUrl: Field.string().required(),
                username: Field.string().required(),
                apiKey: Field.string().required(),
            },
            fn: () => async ({params: {baseUrl, username, apiKey}}) => {
                const credentials: SoapCredentials = {username, apiKey};
                const urlForComparison = computeUrlForComparison(baseUrl);
                config.select(urlForComparison)
                    .set('baseUrl', baseUrl)
                    .set('soap', {credentials});
            },
        }),

        Action.source({
            name: 'get',
            params: {
                baseUrl: Field.string().required(),
            },
            fn: () => async ({params: {baseUrl}}) => config.get(computeUrlForComparison(baseUrl)) ?? null,
        }),

        Action.source({
            name: 'list',
            fn: () => async function* () { yield* Object.values(config.getAll() || {}) },
        }),

        Action.source({
            name: 'list-base-urls',
            fn: () => async function* () { yield* Object.keys(config.getAll() || {}) },
        }),

        Action.source({
            name: 'delete',
            params: {
                baseUrl: Field.string().required(),
            },
            fn: () => async ({params: {baseUrl}}) => (
                config.delete(baseUrl),
                config.delete(computeUrlForComparison(baseUrl))
            ),
        }),
    ];
}

export interface InstanceConfig {
    readonly baseUrl: string
    readonly rest?: RestConfig
    readonly soap?: SoapConfig
    readonly insecure?: boolean
}

const computeUrlForComparison = (urlish: string) => {
    const {host, path} = parseUrl(urlish);
    return `${host || ''}${path}`.replace(/\/$/, '');
}
