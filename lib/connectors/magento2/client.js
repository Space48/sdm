"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSchema = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const query_string_1 = require("query-string");
const util_1 = require("../../util");
const framework_1 = require("../../framework");
const t = __importStar(require("io-ts"));
const http_1 = require("http");
const https_1 = require("https");
const url_1 = require("url");
exports.configSchema = t.intersection([
    t.type({
        baseUrl: t.string,
    }),
    t.partial({
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
class Magento2 {
    constructor(config) {
        this.config = config;
        this.configUsedForAgent = undefined;
        this.agent = undefined;
    }
    async get(uri, params) {
        const paramsFlattened = params && flattenParams(params);
        const paramsString = paramsFlattened ? `?${query_string_1.stringify(paramsFlattened)}` : '';
        return await this.fetch({ method: 'GET', uri: uri + paramsString, auth: true });
    }
    async *search(uri, { sortKey, filters = [] }) {
        let additionalFilters = [];
        while (1) {
            const items = await this.fetchSearchResultsPage(uri, {
                filters: [...filters, ...additionalFilters],
                sortOrders: [[sortKey.query, 'asc']],
                pageSize: 100,
                currentPage: 1,
            });
            if (items.length === 0) {
                break;
            }
            yield* items;
            const lastId = items.slice(-1)[0][sortKey.response];
            additionalFilters = [[
                    sortKey.query,
                    'gt',
                    lastId,
                ]];
        }
    }
    async post(uri, content) {
        return this.fetch({ method: 'POST', uri, content, auth: true });
    }
    async put(uri, content) {
        return this.fetch({ method: 'PUT', uri, content, auth: true });
    }
    async patch(uri, content) {
        return this.fetch({ method: 'PATCH', uri, content, auth: true });
    }
    async delete(uri, content) {
        return this.fetch({ method: 'DELETE', uri, content, auth: true });
    }
    async fetchSearchResultsPage(uri, options) {
        const { filters = [], pageSize, currentPage = 1, sortOrders = [] } = options;
        const { items } = await this.get(uri, {
            searchCriteria: {
                filterGroups: filters.map(([field, conditionType, value]) => ({ filters: [{ field, conditionType, value }] })),
                sortOrders: sortOrders.map(([field, direction]) => ({ field, direction })),
                pageSize,
                currentPage,
            }
        });
        return items;
    }
    async fetch(options) {
        const doFetch = (config) => {
            return node_fetch_1.default(`${config.baseUrl}/rest/V1/${options.uri}`, {
                headers: {
                    Accept: 'application/json',
                    ...(options.content ? { 'Content-Type': 'application/json' } : {}),
                    ...(options.auth ? { Authorization: `Bearer ${config.token.value}` } : {}),
                },
                method: options.method,
                body: options.content && JSON.stringify(options.content),
                agent: this.getAgent(config),
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
                let detail = await response.text();
                try {
                    detail = JSON.parse(detail);
                }
                catch (_a) { }
            }
            catch (_b) { }
            throw new framework_1.EndpointError(`${response.status} ${response.statusText}`, { detail });
        }
        return await response.json();
    }
    getAgent(config) {
        if (config !== this.configUsedForAgent) {
            this.agent = url_1.parse(config.baseUrl).protocol === 'https:'
                ? new https_1.Agent({
                    rejectUnauthorized: !(config === null || config === void 0 ? void 0 : config.insecure),
                    keepAlive: true,
                })
                : new http_1.Agent({
                    keepAlive: true,
                });
            this.configUsedForAgent = config;
        }
        return this.agent;
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
            method: 'POST',
            uri: 'integration/admin/token',
            content: credentials,
            auth: false,
        });
        return {
            value: tokenValue,
            expiration: fourHoursFromNow.toISOString(),
        };
    }
}
exports.default = Magento2;
function flattenParams(params) {
    const entries = Object.entries(params)
        .map(([name, value]) => flattenParam(name, value))
        .reduce(util_1.flatten, []);
    return util_1.objectFromEntries(entries);
}
function flattenParam(name, value) {
    switch (typeof value) {
        case 'string':
            return [[name, value]];
        case 'number':
            return [[name, value.toString()]];
        case 'object':
            {
                const entries = Array.isArray(value)
                    ? value.map((_value, index) => [index, _value])
                    : Object.entries(value);
                return entries
                    .map(([_name, _value]) => flattenParam(`${name}[${_name}]`, _value))
                    .reduce(util_1.flatten, []);
            }
            ;
        case 'undefined':
            return [];
    }
}
