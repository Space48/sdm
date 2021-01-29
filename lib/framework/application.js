"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const connector_1 = require("./connector");
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
        const config = (_a = (await this.configRepository.getConfig(scopeRef))) !== null && _a !== void 0 ? _a : null;
        if (!config) {
            if (connectorRequiresScopeConfig(connector)) {
                return undefined;
            }
        }
        const configSchema = connector.$definition.configSchema;
        const scopeConfig = new connector_1.ScopeConfig(configSchema, config, newConfig => this.configRepository.setConfig(scopeRef, newConfig));
        return connector(scopeConfig);
    }
}
exports.Application = Application;
function connectorRequiresScopeConfig(connector) {
    return !connector.$definition.configSchema.is(null);
}
