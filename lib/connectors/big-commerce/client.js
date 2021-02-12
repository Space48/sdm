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
const p_retry_1 = __importDefault(require("p-retry"));
const t = __importStar(require("io-ts"));
const framework_1 = require("../../framework");
const https_1 = require("https");
const ramda_1 = __importDefault(require("ramda"));
const listConcurrency = 50;
exports.configSchema = t.type({
    storeAlias: t.string,
    storeHash: t.string,
    credentials: t.type({
        clientId: t.string,
        accessToken: t.string,
    }),
});
class BigCommerce {
    constructor(config) {
        this.config = config;
    }
    async get(uri, params) {
        return unwrap(await this.doGet(uri, params));
    }
    async *list(uri, params) {
        var _a;
        const firstPage = await this.doGet(uri, { page: 1, ...(params || {}) });
        yield* unwrap(firstPage);
        const totalPages = uri.startsWith('v3')
            ? (((_a = firstPage.meta) === null || _a === void 0 ? void 0 : _a.pagination) ? computeNumPages(firstPage.meta.pagination) : 1)
            : Number.MAX_SAFE_INTEGER;
        const concurrency = Math.min(totalPages, listConcurrency);
        const threads = [...new Array(concurrency).keys()];
        for (let page = 2; page <= totalPages; page += concurrency) {
            const pages = await Promise.all(threads.map(threadId => this.get(uri, { page: page + threadId, ...(params || {}) })));
            const nonNullPages = pages.filter(Boolean);
            yield* ramda_1.default.flatten(nonNullPages);
            const lastPage = pages.slice(-1)[0];
            if (!(lastPage === null || lastPage === void 0 ? void 0 : lastPage.length)) {
                break;
            }
        }
    }
    async post(uri, content) {
        return this.makeRequestWithContent('POST', uri, content);
    }
    async put(uri, content) {
        return this.makeRequestWithContent('PUT', uri, content);
    }
    async patch(uri, content) {
        return this.makeRequestWithContent('PATCH', uri, content);
    }
    async delete(uri, params) {
        const paramsString = params ? `?${query_string_1.stringify(params)}` : '';
        return unwrap(await this.fetch(uri + paramsString, {
            ...params,
            method: 'DELETE',
        }));
    }
    async doGet(uri, params) {
        const paramsString = params ? `?${query_string_1.stringify(params)}` : '';
        return await this.fetch(uri + paramsString);
    }
    async makeRequestWithContent(method, uri, content) {
        return unwrap(await this.fetch(uri, {
            method,
            headers: content && {
                'Content-Type': 'application/json',
            },
            body: content && JSON.stringify(content),
        }));
    }
    async fetch(relativeUri, init) {
        const config = this.config.get();
        const absoluteUri = `https://api.bigcommerce.com/stores/${config.storeHash}/${relativeUri}`;
        const initResolved = this.init(config, init);
        const response = await p_retry_1.default(async () => {
            const response = await node_fetch_1.default(absoluteUri, initResolved);
            if (response.status === 429) {
                throw new Error;
            }
            return response;
        }, { retries: 50 });
        if (!response.ok) {
            throw new framework_1.EndpointError(`${response.status} ${response.statusText}`, {
                detail: await response.text()
                    .then(JSON.parse)
                    .then(data => (data.errors && JSON.stringify(data.errors) !== '{}' ? data.errors : data.title) || data)
                    .catch(),
            });
        }
        if (response.status === 204) {
            return null;
        }
        return await response.json();
    }
    init(config, init) {
        const headers = {
            ...init === null || init === void 0 ? void 0 : init.headers,
            Accept: 'application/json',
            'X-Auth-Token': config.credentials.accessToken,
            'X-Auth-Client': config.credentials.clientId,
        };
        return {
            ...init,
            headers,
            agent: BigCommerce.agent,
        };
    }
}
exports.default = BigCommerce;
BigCommerce.agent = new https_1.Agent({
    keepAlive: true,
    maxSockets: Number.POSITIVE_INFINITY,
});
function unwrap(content) {
    return (content === null || content === void 0 ? void 0 : content.data) === undefined ? content : content.data;
}
function computeNumPages(pagination) {
    return Math.ceil(pagination.total / pagination.count);
}
