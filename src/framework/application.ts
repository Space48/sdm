import { ConnectorScope } from "./connector";
import { ConfigRepository } from "./config-repository";
import { Connector, ScopeConfig, ScopeRef } from "./connector";

export type ApplicationConfig = {
  readonly configRepository: ConfigRepository,
  readonly connectors: Readonly<Record<string, Connector>>,
};

export class Application {
  constructor({configRepository, connectors}: ApplicationConfig) {
    this.configRepository = configRepository;
    this.connectors = connectors;
  }

  readonly configRepository: ConfigRepository;
  readonly connectors: Readonly<Record<string, Connector>>;

  async listScopes(): Promise<ScopeRef[]> {
    const singletonScopes =
      Object.entries(this.connectors)
        .filter(([, connector]) => !connectorRequiresScopeConfig(connector))
        .map(([name]): ScopeRef => ({connector: name, scope: null}));

    const configuredScopes = await this.configRepository.getScopes();

    return [
      ...singletonScopes,
      ...configuredScopes,
    ];
  }

  async requireScope(scopeRef: ScopeRef): Promise<ConnectorScope> {
    const maybeScope = await this.getScope(scopeRef);
    if (!maybeScope) {
      throw new Error(`Scope '${scopeRef.scope}' not found for connector '${scopeRef.connector}'`);
    }
    return maybeScope;
  }

  async getScope(scopeRef: ScopeRef): Promise<ConnectorScope|undefined> {
    const connector = this.connectors[scopeRef.connector];
    if (!connector) {
      throw new Error(`Connector '${scopeRef.connector}' was not found.`);
    }
    const config = (await this.configRepository.getConfig(scopeRef)) ?? null;
    if (!config) {
      if (connectorRequiresScopeConfig(connector)) {
        // config is required, but none was found
        return undefined;
      }
      // config is not required for this connector
    }
    const configSchema = connector.$definition.configSchema;
    const scopeConfig = new ScopeConfig(
      configSchema,
      config,
      newConfig => this.configRepository.setConfig(scopeRef, newConfig),
    );
    return connector(scopeConfig);
  }
}

function connectorRequiresScopeConfig(connector: Connector) {
  return !connector.$definition.configSchema.is(null);
}
