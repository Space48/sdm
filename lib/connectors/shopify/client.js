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
exports.Scope = exports.configSchema = void 0;
const t = __importStar(require("io-ts"));
const p_retry_1 = __importDefault(require("p-retry"));
const shopify_api_node_1 = __importDefault(require("shopify-api-node"));
const framework_1 = require("../../framework");
exports.configSchema = t.type({
    shopName: t.string,
    credentials: t.type({
        apiKey: t.string,
        password: t.string,
    }),
});
class Scope {
    constructor(config) {
        this.config = config;
        this.clientConfig = undefined;
        this._client = undefined;
    }
    client() {
        var _a, _b, _c;
        const currentConfig = this.config.get();
        if (!(currentConfig.shopName === ((_a = this.clientConfig) === null || _a === void 0 ? void 0 : _a.shopName)
            && currentConfig.credentials.apiKey === ((_b = this.clientConfig) === null || _b === void 0 ? void 0 : _b.credentials.apiKey)
            && currentConfig.credentials.password === ((_c = this.clientConfig) === null || _c === void 0 ? void 0 : _c.credentials.password))) {
            const client = new shopify_api_node_1.default({
                shopName: currentConfig.shopName,
                ...currentConfig.credentials,
                apiVersion: '2020-10',
            });
            const requestFn = client.request.bind(client);
            client.request = backoff(requestFn);
            this._client = client;
        }
        return this._client;
    }
    async map(resourceKey, endpointKey, ids, input) {
        const client = this.client();
        return client[resourceKey][endpointKey](...ids, input);
    }
    async *flatMap(resourceKey, endpointKey, ids, input) {
        let _params = { ...input, limit: 250 };
        do {
            const result = await this.map(resourceKey, endpointKey, ids, _params);
            yield* result;
            _params = result.nextPageParameters;
        } while (_params);
    }
    async *listIds(resourceKey, endpointKey, ids, input) {
        for await (const item of this.flatMap(resourceKey, endpointKey, ids, input)) {
            yield item.id;
        }
    }
}
exports.Scope = Scope;
const backoff = (fn) => (...args) => {
    const run = async () => {
        var _a, _b, _c;
        try {
            return await fn(...args);
        }
        catch (e) {
            const actionError = new framework_1.EndpointError(e.message, {
                detail: typeof ((_a = e.response) === null || _a === void 0 ? void 0 : _a.body) === 'object' ? ((_b = e.response.body.errors) !== null && _b !== void 0 ? _b : e.response.body) : null,
            });
            throw ((_c = e.response) === null || _c === void 0 ? void 0 : _c.statusCode) == 429 ? actionError : new p_retry_1.default.AbortError(actionError);
        }
    };
    return p_retry_1.default(run, { retries: 50 });
};
//# sourceMappingURL=client.js.map