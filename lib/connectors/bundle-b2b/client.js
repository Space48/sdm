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
const query_string_1 = require("query-string");
const p_retry_1 = __importDefault(require("p-retry"));
const t = __importStar(require("io-ts"));
const framework_1 = require("../../framework");
const https_1 = require("https");
const ramda_1 = __importDefault(require("ramda"));
// dynamically import node-fetch to avoid issues with ESM and CommonJS
const fetch = (...args) => Promise.resolve().then(() => __importStar(require("node-fetch"))).then(mod => mod.default(...args));
const listConcurrency = 50;
exports.configSchema = t.intersection([
    t.type({
        storeAlias: t.string,
        storeHash: t.string,
        credentials: t.type({
            email: t.string,
            password: t.string,
        }),
    }),
    t.partial({
        token: t.type({
            value: t.string,
            expiration: t.number,
        }),
    }),
]);
class BundleB2b {
    constructor(config) {
        this.config = config;
        this.readAgent = new https_1.Agent({
            keepAlive: true,
            maxSockets: 100,
        });
        this.writeAgent = new https_1.Agent({
            keepAlive: true,
            maxSockets: 10,
        });
    }
    async get(uri, params) {
        return unwrap(await this.doGet(uri, params));
    }
    async *list(uri, params) {
        var _a, _b;
        // a lot of list reqs involve a single page or don't support pagination, only do one req in those cases
        const firstPage = await this.doGet(uri, { offset: 0, ...(params || {}) });
        if (!firstPage) {
            return;
        }
        yield* unwrap(firstPage);
        const totalPages = uri.startsWith("v3")
            ? ((_a = firstPage.meta) === null || _a === void 0 ? void 0 : _a.pagination) ? computeNumPages(firstPage.meta.pagination)
                : 1
            : Number.MAX_SAFE_INTEGER;
        const concurrency = Math.min(totalPages, listConcurrency);
        const limit = (_b = firstPage.meta) === null || _b === void 0 ? void 0 : _b.pagination.limit;
        const threads = [...new Array(concurrency).keys()];
        for (let page = 2; page <= totalPages; page += concurrency) {
            const pages = await Promise.all(threads.map(threadId => this.get(uri, {
                offset: (page + threadId) * limit - limit,
                ...(params || {}),
            })));
            const nonNullPages = pages.filter(Boolean);
            yield* ramda_1.default.flatten(nonNullPages);
            const lastPage = pages.slice(-1)[0];
            if (!(lastPage === null || lastPage === void 0 ? void 0 : lastPage.length)) {
                break;
            }
        }
    }
    async post(uri, content) {
        return this.makeRequestWithContent("POST", uri, content);
    }
    async put(uri, content) {
        return this.makeRequestWithContent("PUT", uri, content);
    }
    async patch(uri, content) {
        return this.makeRequestWithContent("PATCH", uri, content);
    }
    async delete(uri, params) {
        const paramsString = params ? `?${query_string_1.stringify(params, { arrayFormat: "comma" })}` : "";
        return unwrap(await this.fetch(this.writeAgent, uri + paramsString, {
            ...params,
            method: "DELETE",
        }));
    }
    async doGet(uri, params) {
        const paramsString = params ? `?${query_string_1.stringify(params, { arrayFormat: "comma" })}` : "";
        return await this.fetch(this.readAgent, uri + paramsString);
    }
    async makeRequestWithContent(method, uri, content) {
        return unwrap(await this.fetch(this.writeAgent, uri, {
            method,
            headers: content && {
                "Content-Type": "application/json",
            },
            body: content && JSON.stringify(content),
        }));
    }
    async fetch(agent, relativeUri, init) {
        var _a;
        const config = this.config.get();
        const absoluteUri = `https://api.bundleb2b.net/api/${relativeUri}`;
        const initResolved = this.init(agent, (_a = config.token) !== null && _a !== void 0 ? _a : (await this.refreshToken()).token, init);
        // response body may only be consumed once, so we have to memoize the result here
        let responseText;
        const response = await p_retry_1.default(async () => {
            const response = await fetch(absoluteUri, initResolved);
            responseText = response.text();
            if (response.status === 422) {
                if ((await responseText).includes("saving error")) {
                    throw new Error(); // this will trigger a retry
                }
            }
            if (response.status === 429 || (response.status >= 500 && response.status < 600)) {
                throw new Error(); // this will trigger a retry
            }
            return response;
        }, { retries: 50, minTimeout: 2500 });
        if (!response.ok) {
            throw new framework_1.EndpointError(`${response.status} ${response.statusText}`, {
                detail: await responseText
                    .then(JSON.parse)
                    .then(data => (data.errors && JSON.stringify(data.errors) !== "{}" ? data.errors : data.title) ||
                    data)
                    .catch(),
            });
        }
        if (response.status === 204) {
            return null;
        }
        return await responseText.then(JSON.parse);
    }
    init(agent, token, init) {
        const headers = {
            ...init === null || init === void 0 ? void 0 : init.headers,
            "Content-Type": "application/json",
            Accept: "application/json",
            authToken: token.value,
        };
        return {
            ...init,
            headers,
            agent,
        };
    }
    async refreshToken() {
        const config = this.config.get();
        const token = await this.getToken(config);
        const updatedConfig = { ...config, token };
        return updatedConfig;
    }
    async getToken(config) {
        const now = Math.floor(Date.now() / 1000);
        const fourHoursFromNow = now + 4 * 3600;
        const tokenResponse = await fetch("https://api.bundleb2b.net/api/io/auth/backend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                storeHash: config.storeHash,
                ...config.credentials,
                name: `sdm-${fourHoursFromNow}`,
                channelId: 1,
                beginAt: now,
                endAt: fourHoursFromNow,
            }),
        });
        if (!tokenResponse.ok) {
            throw new Error(`Cannot refresh BundleB2B token for ${config.storeHash}`);
        }
        const token = (await tokenResponse.json());
        if (token.code === 422) {
            throw new Error(`Cannot refresh BundleB2B token for ${config.storeHash}`);
        }
        return {
            value: token.data.token,
            expiration: fourHoursFromNow,
        };
    }
}
exports.default = BundleB2b;
function unwrap(content) {
    return (content === null || content === void 0 ? void 0 : content.data) === undefined ? content : content.data;
}
function computeNumPages(pagination) {
    // This differs to BC pagination
    return pagination.totalCount === 0 ? 0 : Math.ceil(pagination.totalCount / pagination.limit);
}
