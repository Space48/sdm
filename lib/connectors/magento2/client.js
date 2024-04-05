import fetch from "node-fetch";
import { stringify } from "query-string";
import { EndpointError } from "../../framework";
import * as t from "io-ts";
import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";
import { parse as parseUrl } from "url";
import R from "ramda";
export const configSchema = t.intersection([
    t.type({
        baseUrl: t.string,
    }),
    t.partial({
        storeView: t.string,
        concurrency: t.number,
        credentials: t.type({
            username: t.string,
            password: t.string,
        }),
        insecure: t.boolean,
        token: t.type({
            value: t.string,
            expiration: t.string,
        }),
    }),
]);
const defaultConcurrency = 3;
export default class Magento2 {
    constructor(config) {
        this.config = config;
        this.agent = this.config
            .map(config => {
            var _a;
            return ({
                protocol: parseUrl(config.baseUrl).protocol,
                agentOptions: {
                    keepAlive: true,
                    maxSockets: (_a = config.concurrency) !== null && _a !== void 0 ? _a : defaultConcurrency,
                },
                httpsOptions: {
                    rejectUnauthorized: !config.insecure,
                },
            });
        })
            .map(({ protocol, agentOptions, httpsOptions }) => protocol === "https:"
            ? new HttpsAgent({ ...agentOptions, ...httpsOptions })
            : new HttpAgent(agentOptions));
    }
    async get(uri, params) {
        const paramsFlattened = params && flattenParams(params);
        const paramsString = paramsFlattened ? `?${stringify(paramsFlattened)}` : "";
        return await this.fetch({ method: "GET", uri: uri + paramsString, auth: true });
    }
    async *search(uri, { sortKey, filters = [] }) {
        let additionalFilters = [];
        while (1) {
            const items = await this.fetchSearchResultsPage(uri, {
                filters: [...filters, ...additionalFilters],
                sortOrders: [[sortKey.query, "asc"]],
                pageSize: 100,
                currentPage: 1,
            });
            if (items.length === 0) {
                break;
            }
            yield* items;
            const lastId = items.slice(-1)[0][sortKey.response];
            additionalFilters = [[sortKey.query, "gt", lastId]];
        }
    }
    async post(uri, content, fetchAsynchronously) {
        return this.fetch({ method: "POST", uri, content, auth: true, fetchAsynchronously });
    }
    async put(uri, content, fetchAsynchronously) {
        return this.fetch({ method: "PUT", uri, content, auth: true, fetchAsynchronously });
    }
    async patch(uri, content) {
        return this.fetch({ method: "PATCH", uri, content, auth: true });
    }
    async delete(uri, content) {
        return this.fetch({ method: "DELETE", uri, content, auth: true });
    }
    async fetchSearchResultsPage(uri, options) {
        const { filters = [], pageSize, currentPage = 1, sortOrders = [] } = options;
        const { items } = await this.get(uri, {
            searchCriteria: {
                filterGroups: filters.map(([field, conditionType, value]) => {
                    if (Array.isArray(value)) {
                        return {
                            filters: value.map((orValue) => ({
                                field,
                                conditionType,
                                value: orValue,
                            })),
                        };
                    }
                    return { filters: [{ field, conditionType, value }] };
                }),
                sortOrders: sortOrders.map(([field, direction]) => ({ field, direction })),
                pageSize,
                currentPage,
            },
        });
        return items;
    }
    async fetch(options) {
        const async = options.fetchAsynchronously ? "/async" : "";
        const doFetch = (config) => {
            const storeView = config.storeView ? `/${config.storeView}` : "";
            return fetch(`${config.baseUrl}/rest${storeView}${async}/V1/${options.uri}`, {
                headers: {
                    Accept: "application/json",
                    ...(options.content ? { "Content-Type": "application/json" } : {}),
                    ...(options.auth ? { Authorization: `Bearer ${config.token.value}` } : {}),
                },
                method: options.method,
                body: options.content && JSON.stringify(options.content),
                agent: this.agent.get(),
            });
        };
        const currentConfig = this.config.get();
        const config = options.auth && !currentConfig.token ? await this.refreshToken() : currentConfig;
        let response = await doFetch(config);
        if (response.status === 401) {
            const updatedConfig = await this.refreshToken();
            response = await doFetch(updatedConfig);
        }
        if (!response.ok) {
            let detail = undefined;
            try {
                detail = await response.json();
            }
            catch (_a) {
                detail = undefined;
            }
            throw new EndpointError(`${response.status} ${response.statusText}`, { detail });
        }
        return await response.json();
    }
    async refreshToken() {
        const config = this.config.get();
        if (!config.credentials) {
            throw new Error(`No Magento 2 credentials available for ${config.baseUrl}`);
        }
        const token = await this.getToken(config.credentials);
        const updatedConfig = { ...config, token };
        this.config.set(updatedConfig);
        return updatedConfig;
    }
    async getToken(credentials) {
        const fourHoursFromNow = new Date(Date.now() + 4 * 3600000);
        const tokenValue = await this.fetch({
            method: "POST",
            uri: "integration/admin/token",
            content: credentials,
            auth: false,
        });
        return {
            value: tokenValue,
            expiration: fourHoursFromNow.toISOString(),
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
