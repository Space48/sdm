"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalConfigRepository = void 0;
const ramda_1 = __importDefault(require("ramda"));
const json_pipe_1 = require("@space48/json-pipe");
class LocalConfigRepository {
    constructor(conf) {
        this.conf = conf;
        this.connectorsPath = ['connectors'];
    }
    async getScopes() {
        const key = this.computeKey(this.connectorsPath);
        return json_pipe_1.pipe(key.length ? this.conf.get(key) : this.conf.store, ramda_1.default.toPairs, ramda_1.default.map(([connectorName, scopeConfigs]) => ramda_1.default.keys(scopeConfigs).map((scopeName) => ({
            connector: connectorName,
            scope: scopeName,
        }))), ramda_1.default.flatten);
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
    }
    scopeKey(scopeRef) {
        var _a;
        return this.computeKey([
            ...this.connectorsPath,
            scopeRef.connector,
            (_a = scopeRef.scope) !== null && _a !== void 0 ? _a : '',
        ]);
    }
    computeKey(path) {
        return path.map(rawKey => rawKey.replace(/\./g, '\\.')).join('.');
    }
}
exports.LocalConfigRepository = LocalConfigRepository;
//# sourceMappingURL=config-repository.js.map