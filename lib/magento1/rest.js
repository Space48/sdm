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
exports.getAccessToken = exports.Magento1RestClient = exports.createMagento1RestClient = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const query_string_1 = require("query-string");
const util_1 = require("../util");
const open_1 = __importDefault(require("open"));
const oauth_1 = require("oauth");
const rl = __importStar(require("readline"));
const http_1 = require("http");
const https_1 = require("https");
const url_1 = require("url");
function createMagento1RestClient(instanceConfig) {
    var _a;
    if (!(instanceConfig === null || instanceConfig === void 0 ? void 0 : instanceConfig.rest)) {
        return undefined;
    }
    const accessToken = instanceConfig.rest.accessToken;
    const oauth = getOauthClient(instanceConfig.baseUrl, instanceConfig.rest.credentials);
    return new Magento1RestClient(instanceConfig.baseUrl, getHttpAgent(instanceConfig.baseUrl, (_a = instanceConfig.insecure) !== null && _a !== void 0 ? _a : false), (method, url) => oauth.authHeader(url, accessToken.token, accessToken.tokenSecret, method));
}
exports.createMagento1RestClient = createMagento1RestClient;
class Magento1RestClient {
    constructor(baseUrl, agent, auth) {
        this.baseUrl = baseUrl;
        this.agent = agent;
        this.auth = auth;
    }
    async get(uri, params) {
        const paramsFlattened = params && flattenParams(params);
        const paramsString = paramsFlattened ? `?${query_string_1.stringify(paramsFlattened)}` : '';
        return await this.fetch(uri + paramsString);
    }
    async *search(uri, { sortKey, filters = [] }) {
        let additionalFilters = [];
        while (1) {
            const content = await this.get(uri, {
                filter: [...filters, ...additionalFilters]
                    .map(([attribute, conditionType, value]) => ({ attribute, [conditionType]: value })),
                order: sortKey,
                dir: 'asc',
                limit: 100,
            });
            const items = Object.values(content);
            if (items.length === 0) {
                break;
            }
            yield* items;
            const lastId = items.slice(-1)[0][sortKey];
            additionalFilters = [[
                    sortKey,
                    'gt',
                    lastId,
                ]];
        }
    }
    async post(uri, content) {
        return this.makeUnsafeRequest('POST', uri, content);
    }
    async put(uri, content) {
        return this.makeUnsafeRequest('PUT', uri, content);
    }
    async patch(uri, content) {
        return this.makeUnsafeRequest('PATCH', uri, content);
    }
    async delete(uri, content) {
        return this.makeUnsafeRequest('DELETE', uri, content);
    }
    async makeUnsafeRequest(method, uri, content) {
        return await this.fetch(uri, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        });
    }
    async fetch(relativeUri, init) {
        const url = `${this.baseUrl.replace(/\/+$/, '')}/api/rest/${relativeUri}`;
        const auth = this.auth((init === null || init === void 0 ? void 0 : init.method) || 'GET', url);
        const response = await node_fetch_1.default(url, this.init({ auth, init }));
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}\n\n${await response.text()}`);
        }
        return await response.json();
    }
    init({ auth, init }) {
        const headers = {
            ...((init === null || init === void 0 ? void 0 : init.headers) || {}),
            Authorization: auth,
            Accept: 'application/json',
        };
        return {
            ...(init || {}),
            headers,
            agent: this.agent,
        };
    }
}
exports.Magento1RestClient = Magento1RestClient;
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
                    ? value.map((_value, index) => [index + 1, _value])
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
async function getAccessToken(baseUrl, credentials) {
    const oauth = getOauthClient(baseUrl, credentials);
    const { token, tokenSecret } = await new Promise((resolve, reject) => {
        oauth.getOAuthRequestToken({ oauth_callback: 'oob' }, (error, token, tokenSecret) => {
            if (error) {
                reject(error);
            }
            else {
                resolve({ token, tokenSecret });
            }
        });
    });
    await open_1.default(`${baseUrl}/admin/oauth_authorize?oauth_token=${token}`);
    const readLine = rl.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const verifierCode = await new Promise(resolve => readLine.question('Verifier code: ', resolve));
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
exports.getAccessToken = getAccessToken;
function getHttpAgent(baseUrl, insecure) {
    return url_1.parse(baseUrl).protocol === 'https:'
        ? new https_1.Agent({
            keepAlive: true,
            rejectUnauthorized: !insecure,
        })
        : new http_1.Agent({
            keepAlive: true,
        });
}
function getOauthClient(baseUrl, credentials) {
    return new oauth_1.OAuth(`${baseUrl}/oauth/initiate`, `${baseUrl}/oauth/token`, credentials.key, credentials.secret, '1.0', null, 'HMAC-SHA1');
}
