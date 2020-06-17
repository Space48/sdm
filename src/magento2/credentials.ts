import { Config } from "../config";
import Magento2, { Magento2ClientOptions } from "./client";
import { parse as parseUrl } from "url";
import { Field, Action } from "../action";

export type ConfigSchema = {[baseUrl: string]: Instance};

export const createClient = (config: Config<ConfigSchema>, baseUrl: string, options: Omit<Magento2ClientOptions, 'auth'> = {}): Magento2 => {
    const urlExcludingScheme = computeUrlForComparison(baseUrl);
    const instanceConfig = config.get(baseUrl)
        || Object.values(config.getAll() || {}).find(candidate => urlExcludingScheme === computeUrlForComparison(candidate.baseUrl));
    if (!(instanceConfig?.credentials || instanceConfig?.token)) {
        throw new Error(`Magento2: No credentials available for instance ${baseUrl}.`);
    }
    let token = instanceConfig?.token;
    const tokenResolver = async ({refresh}: {refresh: boolean}) => {
        if (refresh || !token) {
            if (!instanceConfig?.credentials) {
                throw new Error();
            }
            token = await getToken(instanceConfig.baseUrl, instanceConfig.credentials);
            config.set(instanceConfig.baseUrl, {...instanceConfig, token});
        }
        return token.value;
    };
    return new Magento2(instanceConfig.baseUrl, {...options, auth: tokenResolver});
}

export function getActions(config: Config<ConfigSchema>) {
    return [
        Action.source({
            name: 'set',
            params: {
                baseUrl: Field.string().required(),
                username: Field.string().required(),
                password: Field.string().required(),
            },
            fn: () => async ({baseUrl, username, password}) => config.set(baseUrl, {baseUrl, credentials: {username, password}}),
        }),

        Action.source({
            name: 'get',
            params: {
                baseUrl: Field.string().required(),
            },
            fn: () => async ({baseUrl}) => config.get(baseUrl) ?? null,
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
            fn: () => async ({baseUrl}) => config.delete(baseUrl),
        }),
    ];
}

type Instance = {
    baseUrl: string,
    credentials?: Credentials,
    token?: Token,
};

type Credentials = {
    username: string,
    password: string,
};

type Token = {
    value: string,
    expiration: string,
};

async function getToken(baseUrl: string, credentials: Credentials): Promise<Token> {
    const client = new Magento2(baseUrl);
    const fourHoursFromNow = new Date(Date.now() + 4 * 3_600_000);
    const tokenValue = await client.post<string>('integration/admin/token', credentials);
    return {
        value: tokenValue,
        expiration: fourHoursFromNow.toISOString(),
    }
}

const computeUrlForComparison = (urlish: string) => {
    const {host, path} = parseUrl(urlish);
    return `${host || ''}${path}`.replace(/\/$/, '');
}
