import fetch from "node-fetch";
import { stringify } from "query-string";
import open from "open";
import { OAuth } from "oauth";
import * as rl from "readline";
import { Reference } from "../../framework";
import * as t from "io-ts";
import R from "ramda";
import { useAgent } from "./functions";
import { mergeUnordered } from "@space48/json-pipe";
export const magento1RestConfigSchema = t.type({
    credentials: t.type({
        key: t.string,
        secret: t.string,
    }),
    accessToken: t.type({
        token: t.string,
        tokenSecret: t.string,
    }),
});
export class Magento1RestClient {
    constructor(baseUrl, agent, config) {
        this.baseUrl = baseUrl;
        this.agent = agent;
        this.config = config;
        this.authHeaderFn = Reference.combine({ baseUrl: this.baseUrl, rest: this.config }).map(({ baseUrl, rest }) => {
            if (!rest) {
                throw new Error("REST has not been configured.");
            }
            const client = getOauthClient(baseUrl, rest.credentials);
            return (method, url) => client.authHeader(url, rest.accessToken.token, rest.accessToken.tokenSecret, method);
        });
    }
    async get(uri, params) {
        const paramsFlattened = params && flattenParams(params);
        const paramsString = paramsFlattened ? `?${stringify(paramsFlattened)}` : "";
        return await this.fetch(uri + paramsString);
    }
    async *search(uri, { sortKey, filters = [] }) {
        const [minId, maxId] = await Promise.all([
            this.getFirstItemId(uri, { sortKey, filters }, "asc"),
            this.getFirstItemId(uri, { sortKey, filters }, "desc"),
        ]);
        if (minId === null || maxId === null) {
            return;
        }
        const maxNumShards = 100;
        const pageSize = 100;
        const maxPossibleNumItems = Number(maxId) - Number(minId) + 1;
        const maxPossibleNumPages = Math.ceil(maxPossibleNumItems / pageSize);
        const numShards = Math.min(maxNumShards, maxPossibleNumPages);
        const idsPerShard = Math.ceil(maxPossibleNumItems / numShards);
        const shardFilters = range(numShards).map(n => [
            [sortKey, "gteq", Number(minId) + idsPerShard * n],
            [sortKey, "lt", Number(minId) + idsPerShard * (n + 1)],
        ]);
        const shards = shardFilters.map(filters => this.searchRange(uri, { sortKey, filters }));
        yield* mergeUnordered(...shards);
    }
    async getFirstItemId(uri, { sortKey, filters = [] }, dir) {
        const content = await this.get(uri, {
            filter: filters.map(([attribute, conditionType, value]) => ({
                attribute,
                [conditionType]: value,
            })),
            order: sortKey,
            dir,
            limit: 1,
        });
        const items = Object.values(content);
        if (items.length === 0) {
            return null;
        }
        return items.slice(-1)[0][sortKey];
    }
    async *searchRange(uri, { sortKey, filters = [] }) {
        let additionalFilters = [];
        while (1) {
            const content = await this.get(uri, {
                filter: [...filters, ...additionalFilters].map(([attribute, conditionType, value]) => ({
                    attribute,
                    [conditionType]: value,
                })),
                order: sortKey,
                dir: "asc",
                limit: 100,
            });
            const items = Object.values(content);
            if (items.length === 0) {
                break;
            }
            yield* items;
            const lastId = items.slice(-1)[0][sortKey];
            additionalFilters = [[sortKey, "gt", lastId]];
        }
    }
    async post(uri, content) {
        return this.makeUnsafeRequest("POST", uri, content);
    }
    async put(uri, content) {
        return this.makeUnsafeRequest("PUT", uri, content);
    }
    async patch(uri, content) {
        return this.makeUnsafeRequest("PATCH", uri, content);
    }
    async delete(uri, content) {
        return this.makeUnsafeRequest("DELETE", uri, content);
    }
    async makeUnsafeRequest(method, uri, content) {
        return await this.fetch(uri, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(content),
        });
    }
    async fetch(relativeUri, init) {
        return await useAgent(async () => {
            const url = `${this.baseUrl.get().replace(/\/+$/, "")}/api/rest/${relativeUri}`;
            const auth = this.authHeaderFn.get()((init === null || init === void 0 ? void 0 : init.method) || "GET", url);
            const response = await fetch(url, this.init({ auth, init }));
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}\n\n${await response.text()}`);
            }
            return await response.json();
        });
    }
    init({ auth, init }) {
        const headers = {
            ...((init === null || init === void 0 ? void 0 : init.headers) || {}),
            Authorization: auth,
            Accept: "application/json",
        };
        return {
            ...(init || {}),
            headers,
            agent: this.agent.get(),
        };
    }
}
const flattenParams = R.pipe((params) => R.toPairs(params), R.chain(([name, value]) => flattenParam(name, value)), pairs => R.fromPairs(pairs));
function flattenParam(name, value) {
    switch (typeof value) {
        case "string":
            return [[name, value]];
        case "number":
            return [[name, value.toString()]];
        case "object": {
            const entries = Array.isArray(value)
                ? value.map((_value, index) => [index + 1, _value])
                : Object.entries(value);
            return R.chain(([_name, _value]) => flattenParam(`${name}[${_name}]`, _value), entries);
        }
        case "undefined":
            return [];
    }
}
export async function getAccessToken(baseUrl, credentials) {
    const oauth = getOauthClient(baseUrl, credentials);
    const { token, tokenSecret } = await new Promise((resolve, reject) => {
        oauth.getOAuthRequestToken({ oauth_callback: "oob" }, (error, token, tokenSecret) => {
            if (error) {
                reject(error);
            }
            else {
                resolve({ token, tokenSecret });
            }
        });
    });
    await open(`${baseUrl}/admin/oauth_authorize?oauth_token=${token}`);
    const readLine = rl.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const verifierCode = await new Promise(resolve => readLine.question("Verifier code: ", resolve));
    readLine.close();
    return await new Promise((resolve, reject) => {
        oauth.getOAuthAccessToken(token, tokenSecret, verifierCode, (error, token, tokenSecret) => {
            if (error) {
                reject(error);
            }
            else {
                resolve({ token, tokenSecret });
            }
        });
    });
}
function getOauthClient(baseUrl, credentials) {
    return new OAuth(`${baseUrl}/oauth/initiate`, `${baseUrl}/oauth/token`, credentials.key, credentials.secret, "1.0", // not 1.0a as per Magento docs
    null, "HMAC-SHA1");
}
const range = (n) => Array.from(Array(n).keys());
