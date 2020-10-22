import { ConfigStore } from "../config-store";
import Magento1, { Magento1ClientOptions } from "./client";
import { Field, Action } from "../action";
import { OAuth } from "oauth";
import open from "open";
import * as rl from "readline";
import { parse as parseUrl } from "url";
import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";
import { parse } from "url";

export function getBaseUrls(config: ConfigStore<ConfigSchema>): string[] {
    return Object.keys(config.getAll() || {}).map(computeUrlForComparison);
}

export type ConfigSchema = {[baseUrl: string]: Instance};

export const createMagento1Client = (config: ConfigStore<ConfigSchema>, baseUrl: string): Magento1 => {
    const urlExcludingScheme = computeUrlForComparison(baseUrl);
    const instanceConfig = config.get(baseUrl)
        || Object.values(config.getAll() || {}).find(candidate => urlExcludingScheme === computeUrlForComparison(candidate.baseUrl));
    if (!(instanceConfig?.credentials && instanceConfig?.accessToken)) {
        throw new Error(`Magento1: No access token available for instance ${baseUrl}.`);
    }
    const accessToken = instanceConfig.accessToken;
    const oauth = getOauthClient(instanceConfig.baseUrl, instanceConfig.credentials);
    return new Magento1(
        instanceConfig.baseUrl,
        getHttpAgent(instanceConfig.baseUrl, instanceConfig.insecure ?? false),
        (method, url) => oauth.authHeader(url, accessToken.token, accessToken.tokenSecret, method),
    );
}

export function getActions(config: ConfigStore<ConfigSchema>) {
    return [
        Action.source({
            name: 'set',
            params: {
                baseUrl: Field.string().required(),
                key: Field.string().required(),
                secret: Field.string().required(),
                insecure: Field.boolean().optional(),
            },
            fn: () => async ({params: {baseUrl, key, secret, insecure}}) => {
                const credentials = {key, secret};
                try {
                    const accessToken = await getAccessToken(baseUrl, credentials)
                    config.set(computeUrlForComparison(baseUrl), {baseUrl, credentials, accessToken, insecure});
                } catch (e) {
                    console.error(e);
                }
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

type Instance = {
    baseUrl: string,
    credentials?: Credentials,
    accessToken?: TokenPair,
    insecure?: boolean,
};

type Credentials = {
    key: string,
    secret: string,
};

type TokenPair = {
    token: string,
    tokenSecret: string,
};

function getOauthClient(baseUrl: string, credentials: Credentials): OAuth {
    return new OAuth(
        `${baseUrl}/oauth/initiate`,
        `${baseUrl}/oauth/token`,
        credentials.key,
        credentials.secret,
        '1.0', // not 1.0a as per Magento docs
        null,
        'HMAC-SHA1'
    );
}

async function getAccessToken(baseUrl: string, credentials: Credentials): Promise<TokenPair> {
    console.log({baseUrl})
    const oauth = getOauthClient(baseUrl, credentials);
    const {token, tokenSecret} = await new Promise<TokenPair>((resolve, reject) => {
        oauth.getOAuthRequestToken({oauth_callback: 'oob'}, (error, token, tokenSecret) => {
            if (error) {
                reject(error);
            } else {
                resolve({token, tokenSecret});
            }
        });
    });
    console.log({token, tokenSecret});
    await open(`${baseUrl}/admin/oauth_authorize?oauth_token=${token}`);
    const readLine = rl.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const verifierCode = await new Promise<string>(resolve => readLine.question('Verifier code: ', resolve));
    readLine.close();
    return await new Promise<TokenPair>((resolve, reject) => {
        oauth.getOAuthAccessToken(token, tokenSecret, verifierCode, (error, token, tokenSecret) => {
            if (error) {
                reject(error);
            } else {
                resolve({token, tokenSecret});
            }
        });
    });
}

const computeUrlForComparison = (urlish: string) => {
    const {host, path} = parseUrl(urlish);
    return `${host || ''}${path}`.replace(/\/$/, '');
}

function getHttpAgent(baseUrl: string, insecure: boolean): HttpAgent {
    return parse(baseUrl).protocol === 'https:'
        ? new HttpsAgent({rejectUnauthorized: !insecure})
        : new HttpAgent();
}
