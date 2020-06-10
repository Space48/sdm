import { Config } from "../config";
import Magento1, { Magento1ClientOptions } from "./client";
import { OAuth } from "oauth";
import open from "open";
import * as rl from "readline";
import action, { Field } from "../action";

export type ConfigSchema = {[baseUrl: string]: Instance};

export const createClient = (config: Config<ConfigSchema>, baseUrl: string, options: Omit<Magento1ClientOptions, 'auth'> = {}): Magento1 => {
    const instanceConfig = config.get(baseUrl);
    if (!(instanceConfig?.credentials && instanceConfig?.accessToken)) {
        throw new Error(`Magento1: No access token available for instance ${baseUrl}.`);
    }
    const accessToken = instanceConfig.accessToken;
    const oauth = getOauthClient(baseUrl, instanceConfig.credentials);
    return new Magento1(baseUrl, {
        ...options,
        auth: (method, url) => oauth.authHeader(url, accessToken.token, accessToken.tokenSecret, method),
    });
}

export function getActions(config: Config<ConfigSchema>) {
    return [
        action({
            name: 'set',
            params: {
                baseUrl: Field.string().required(),
                key: Field.string().required(),
                secret: Field.string().required(),
            },
            source: () => async ({baseUrl, key, secret}) => {
                const credentials = {key, secret};
                const accessToken = await getAccessToken(baseUrl, credentials)
                config.set(baseUrl, {baseUrl, credentials, accessToken});
            },
        }),

        action({
            name: 'get',
            params: {
                baseUrl: Field.string().required(),
            },
            source: () => async ({baseUrl}) => config.get(baseUrl) ?? null,
        }),

        action({
            name: 'list',
            source: () => async function* () { yield* Object.values(config.getAll() || {}) },
        }),

        action({
            name: 'list-base-urls',
            source: () => async function* () { yield* Object.keys(config.getAll() || {}) },
        }),

        action({
            name: 'delete',
            params: {
                baseUrl: Field.string().required(),
            },
            source: () => async ({baseUrl}) => config.delete(baseUrl),
        }),
    ];
}

type Instance = {
    baseUrl: string,
    credentials?: Credentials,
    accessToken?: TokenPair,
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
    await open(`${baseUrl}/admin/oAuth_authorize?oauth_token=${token}`);
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
