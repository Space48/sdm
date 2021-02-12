"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const connector_1 = require("./connector");
const ramda_1 = __importDefault(require("ramda"));
class Application {
    constructor({ configRepository, connectors }) {
        this.configRepository = configRepository;
        this.connectors = connectors;
    }
    async listScopes() {
        const singletonScopes = Object.entries(this.connectors)
            .filter(([, connector]) => !connectorRequiresScopeConfig(connector))
            .map(([name]) => ({ connector: name, scope: null }));
        const configuredScopes = await this.configRepository.getScopes();
        return [
            ...singletonScopes,
            ...configuredScopes,
        ];
    }
    async requireScope(scopeRef) {
        const maybeScope = await this.getScope(scopeRef);
        if (!maybeScope) {
            throw new Error(`Scope '${scopeRef.scope}' not found for connector '${scopeRef.connector}'`);
        }
        return maybeScope;
    }
    async getScope(scopeRef) {
        var _a;
        const connector = this.connectors[scopeRef.connector];
        if (!connector) {
            throw new Error(`Connector '${scopeRef.connector}' was not found.`);
        }
        let config = (_a = (await this.configRepository.getConfig(scopeRef))) !== null && _a !== void 0 ? _a : null;
        const configIsRequired = connectorRequiresScopeConfig(connector);
        if (!config) {
            if (configIsRequired) {
                return undefined;
            }
        }
        let configTimestamp = Date.now();
        let refreshing = false;
        const configRef = new connector_1.MutableReference(() => {
            if (!refreshing) {
                const configAge = Date.now() - configTimestamp;
                if (configAge > configTtl) {
                    refreshing = true;
                    this.configRepository.getConfig(scopeRef)
                        .then(latestConfig => {
                        if (!ramda_1.default.equals(config, latestConfig)) {
                            config = latestConfig;
                        }
                        configTimestamp = Date.now();
                    })
                        .finally(() => refreshing = false);
                }
            }
            if (configIsRequired && !config) {
                throw new Error(`Connector '${scopeRef.connector}' scope '${scopeRef.scope}' has been disabled.`);
            }
            return config;
        }, newConfig => {
            this.configRepository.setConfig(scopeRef, newConfig);
            config = newConfig;
            configTimestamp = Date.now();
        });
        const configSchema = connector.$definition.configSchema;
        return connector(configRef.withSchema(configSchema));
    }
}
exports.Application = Application;
function connectorRequiresScopeConfig(connector) {
    return !connector.$definition.configSchema.is(null);
}
const configTtl = 1000;
