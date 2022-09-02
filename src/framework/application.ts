import { ConnectorScope, MutableReference } from "./connector";
import { ConfigRepository } from "./config-repository";
import { Connector, ScopeRef } from "./connector";
import { watchScope } from "./watch";
import R from "ramda";

export type ApplicationConfig = {
  readonly configRepository: ConfigRepository;
  readonly connectors: Readonly<Record<string, Connector>>;
};

export class Application {
  constructor({ configRepository, connectors }: ApplicationConfig) {
    this.configRepository = configRepository;
    this.connectors = connectors;
  }

  readonly configRepository: ConfigRepository;
  readonly connectors: Readonly<Record<string, Connector>>;

  async listScopes(): Promise<ScopeRef[]> {
    const singletonScopes = Object.entries(this.connectors)
      .filter(([, connector]) => !connectorRequiresScopeConfig(connector))
      .map(([name]): ScopeRef => ({ connector: name, scope: null }));

    const configuredScopes = await this.configRepository.getScopes();

    return [...singletonScopes, ...configuredScopes];
  }

  async requireScope(scopeRef: ScopeRef): Promise<ConnectorScope> {
    const maybeScope = await this.getScope(scopeRef);
    if (!maybeScope) {
      throw new Error(`Scope '${scopeRef.scope}' not found for connector '${scopeRef.connector}'`);
    }
    return maybeScope;
  }

  async getScope(scopeRef: ScopeRef): Promise<ConnectorScope | undefined> {
    const connector = this.connectors[scopeRef.connector];
    if (!connector) {
      throw new Error(`Connector '${scopeRef.connector}' was not found.`);
    }

    let config = (await this.configRepository.getConfig(scopeRef)) ?? null;
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

    const configRef = new MutableReference(
      () => {
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
          throw new Error(
            `Connector '${scopeRef.connector}' scope '${scopeRef.scope}' has been disabled.`,
          );
        }
        return config;
      },

      newConfig => {
        this.configRepository.setConfig(scopeRef, newConfig);
        config = newConfig;
        configTimestamp = Date.now();
      },
    );

    const configSchema = connector.$definition.configSchema;

    const scope = connector(configRef.withSchema(configSchema));

    return watchScope(scope);
  }
}

function connectorRequiresScopeConfig(connector: Connector) {
  return !connector.$definition.configSchema.is(null);
}

const configTtl = 1000;
