import { MutableReference } from "./connector";
import { watchScope } from "./watch";
import R from "ramda";
export class Application {
    constructor({ configRepository, connectors }) {
        this.configRepository = configRepository;
        this.connectors = connectors;
    }
    async listScopes() {
        const singletonScopes = Object.entries(this.connectors)
            .filter(([, connector]) => !connectorRequiresScopeConfig(connector))
            .map(([name]) => ({ connector: name, scope: null }));
        const configuredScopes = await this.configRepository.getScopes();
        return [...singletonScopes, ...configuredScopes];
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
                // config is required, but none was found
                return undefined;
            }
            // config is not required for this connector
        }
        let configTimestamp = Date.now();
        let refreshing = false;
        const configRef = new MutableReference(() => {
            if (!refreshing) {
                const configAge = Date.now() - configTimestamp;
                if (configAge > configTtl) {
                    refreshing = true;
                    this.configRepository
                        .getConfig(scopeRef)
                        .then(latestConfig => {
                        if (!R.equals(config, latestConfig)) {
                            config = latestConfig;
                        }
                        configTimestamp = Date.now();
                    })
                        .finally(() => (refreshing = false));
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
        const scope = connector(configRef.withSchema(configSchema));
        return watchScope(scope);
    }
}
function connectorRequiresScopeConfig(connector) {
    return !connector.$definition.configSchema.is(null);
}
const configTtl = 1000;
