import R from "ramda";
import { pipe } from "@space48/json-pipe";
export class LocalConfigRepository {
    constructor(conf) {
        this.conf = conf;
        this.connectorsPath = ["connectors"];
    }
    async getScopes() {
        const key = this.computeKey(this.connectorsPath);
        return pipe(key.length ? this.conf.get(key) : this.conf.store, R.toPairs, R.map(([connectorName, scopeConfigs]) => R.keys(scopeConfigs).map((scopeName) => ({
            connector: connectorName,
            scope: scopeName,
        }))), R.flatten);
    }
    async getConfig(scope) {
        const key = this.scopeKey(scope);
        return this.conf.get(key, undefined);
    }
    async setConfig(scope, config) {
        const key = this.scopeKey(scope);
        this.conf.set(key, config);
    }
    async removeConfig(scope) {
        const key = this.scopeKey(scope);
        const exists = this.conf.has(key);
        if (exists) {
            this.conf.delete(key);
        }
        return exists;
    }
    async export() {
        return this.conf.store;
    }
    async import(config) {
        return Promise.resolve();
    }
    scopeKey(scopeRef) {
        var _a;
        return this.computeKey([...this.connectorsPath, scopeRef.connector, (_a = scopeRef.scope) !== null && _a !== void 0 ? _a : ""]);
    }
    computeKey(path) {
        return path.map(rawKey => rawKey.replace(/\./g, "\\.")).join(".");
    }
}
