import fetch, { RequestInit } from "node-fetch";
import { Agent } from "http";
import { stringify } from 'query-string'
import { objectFromEntries, flatten } from "../util";
import open from "open";
import { OAuth } from "oauth";
import * as rl from "readline";
import { InstanceConfig } from "./config";
import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";
import { parse } from "url";

export function createMagento1RestClient(instanceConfig: InstanceConfig): Magento1RestClient|undefined {
    if (!instanceConfig?.rest) {
        return undefined;
    }
    const accessToken = instanceConfig.rest.accessToken;
    const oauth = getOauthClient(instanceConfig.baseUrl, instanceConfig.rest.credentials);
    return new Magento1RestClient(
        instanceConfig.baseUrl,
        getHttpAgent(instanceConfig.baseUrl, instanceConfig.insecure ?? false),
        (method, url) => oauth.authHeader(url, accessToken.token, accessToken.tokenSecret, method),
    );
}

type AuthResolver = (method: string, url: string) => string;

export class Magento1RestClient {
    constructor(
        private baseUrl: string,
        private agent: Agent,
        private auth: AuthResolver,
    ) {}

    async get<T>(uri: string, params?: QueryParams): Promise<T> {
        const paramsFlattened = params && flattenParams(params);
        const paramsString = paramsFlattened ? `?${stringify(paramsFlattened)}` : '';
        return await this.fetch(uri + paramsString);
    }

    async* search<T extends Record<string, any> = any>(
        uri: string,
        {sortKey, filters=[]}: {sortKey: string, filters?: Filter[]}
    ): AsyncIterable<T> {
        let additionalFilters: Filter[] = [];
        while (1) {
            const content = await this.get<Record<string, T>>(uri, {
                filter: [...filters, ...additionalFilters]
                    .map(([attribute, conditionType, value]) => ({attribute, [conditionType]: value})),
                order: sortKey,
                dir: 'asc',
                limit: 100,
            });
            const items = Object.values(content);
            if (items.length === 0) {
                break;
            }
            yield* items;
            const lastId = items.slice(-1)[0][sortKey] as string|number;
            additionalFilters = [[
                sortKey,
                'gt',
                lastId,
            ]];
        }
    }

    async post<T>(uri: string, content: any): Promise<T> {
        return this.makeUnsafeRequest('POST', uri, content);
    }

    async put<T>(uri: string, content: any): Promise<T> {
        return this.makeUnsafeRequest('PUT', uri, content);
    }

    async patch<T>(uri: string, content: any): Promise<T> {
        return this.makeUnsafeRequest('PATCH', uri, content);
    }

    async delete<T>(uri: string, content?: any): Promise<T> {
        return this.makeUnsafeRequest('DELETE', uri, content);
    }

    private async makeUnsafeRequest<T>(method: string, uri: string, content: any): Promise<T> {
        return await this.fetch(uri, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        });
    }

    private async fetch<T>(relativeUri: string, init?: RequestInit): Promise<T> {
        const url = `${this.baseUrl.replace(/\/+$/, '')}/api/rest/${relativeUri}`;
        const auth = this.auth(init?.method || 'GET', url);
        const response = await fetch(url, this.init({auth, init}));
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}\n\n${await response.text()}`);
        }
        return await response.json();
    }

    private init({auth, init}: {auth: string, init?: RequestInit}): RequestInit {
        const headers = {
            ...(init?.headers || {}),
            Authorization: auth,
            Accept: 'application/json',
        }
        return {
            ...(init || {}),
            headers,
            agent: this.agent,
        };
    }
}

export type QueryParams = {[param: string]: QueryParam};
type QueryParam = QueryParams | string | number | QueryParam[];

function flattenParams(params: QueryParams): Record<string, string> {
    const entries = Object.entries(params)
        .map(([name, value]) => flattenParam(name, value))
        .reduce(flatten, []) as [string, string][];
    return objectFromEntries(entries);
}

function flattenParam(name: string, value: QueryParam): string[][] {
    switch (typeof value) {
        case 'string':
            return [[name, value]];

        case 'number':
            return [[name, value.toString()]];

        case 'object': {
            const entries = Array.isArray(value)
                ? value.map((_value, index) => [index + 1, _value])
                : Object.entries(value);
            return entries
                .map(([_name, _value]) => flattenParam(`${name}[${_name}]`, _value))
                .reduce(flatten, []);
        };

        case 'undefined':
            return [];
    }
}

type FilterCondition = 'eq' | 'gt' | 'in';
type Filter = [string, FilterCondition, string|number|string[]|number[]];

export interface RestConfig {
    readonly credentials: RestCredentials
    readonly accessToken: RestTokenPair
}

export interface RestCredentials {
    readonly key: string
    readonly secret: string
}

export interface RestTokenPair {
    readonly token: string
    readonly tokenSecret: string
}

export async function getAccessToken(baseUrl: string, credentials: RestCredentials): Promise<RestTokenPair> {
    const oauth = getOauthClient(baseUrl, credentials);
    const {token, tokenSecret} = await new Promise<RestTokenPair>((resolve, reject) => {
        oauth.getOAuthRequestToken({oauth_callback: 'oob'}, (error, token, tokenSecret) => {
            if (error) {
                reject(error);
            } else {
                resolve({token, tokenSecret});
            }
        });
    });
    await open(`${baseUrl}/admin/oauth_authorize?oauth_token=${token}`);
    const readLine = rl.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const verifierCode = await new Promise<string>(resolve => readLine.question('Verifier code: ', resolve));
    readLine.close();
    return await new Promise<RestTokenPair>((resolve, reject) => {
        oauth.getOAuthAccessToken(token, tokenSecret, verifierCode, (error, token, tokenSecret) => {
            if (error) {
                reject(error);
            } else {
                resolve({token, tokenSecret});
            }
        });
    });
}

function getHttpAgent(baseUrl: string, insecure: boolean): HttpAgent {
    return parse(baseUrl).protocol === 'https:'
        ? new HttpsAgent({rejectUnauthorized: !insecure})
        : new HttpAgent();
}

function getOauthClient(baseUrl: string, credentials: RestCredentials): OAuth {
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
