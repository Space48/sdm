import * as t from "io-ts";
import pRetry from "p-retry";
import Shopify from "shopify-api-node";
import { EndpointError } from "../../framework";
export const configSchema = t.type({
    shopName: t.string,
    credentials: t.type({
        apiKey: t.string,
        password: t.string,
    }),
});
export class Scope {
    constructor(config) {
        this.config = config;
        this.clientConfig = undefined;
        this._client = undefined;
    }
    client() {
        var _a, _b, _c;
        const currentConfig = this.config.get();
        if (!(currentConfig.shopName === ((_a = this.clientConfig) === null || _a === void 0 ? void 0 : _a.shopName) &&
            currentConfig.credentials.apiKey === ((_b = this.clientConfig) === null || _b === void 0 ? void 0 : _b.credentials.apiKey) &&
            currentConfig.credentials.password === ((_c = this.clientConfig) === null || _c === void 0 ? void 0 : _c.credentials.password))) {
            const client = new Shopify({
                shopName: currentConfig.shopName,
                ...currentConfig.credentials,
                apiVersion: "2020-10",
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
const backoff = (fn) => (...args) => {
    const run = async () => {
        var _a, _b, _c;
        try {
            return await fn(...args);
        }
        catch (e) {
            const actionError = new EndpointError(e.message, {
                detail: typeof ((_a = e.response) === null || _a === void 0 ? void 0 : _a.body) === "object" ? (_b = e.response.body.errors) !== null && _b !== void 0 ? _b : e.response.body : null,
            });
            throw ((_c = e.response) === null || _c === void 0 ? void 0 : _c.statusCode) == 429 ? actionError : new pRetry.AbortError(actionError);
        }
    };
    return pRetry(run, { retries: 50 });
};
