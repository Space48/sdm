import Conf from "conf";
import { Connector, ConnectorScope, ScopeConfig, ScopeRef } from "./connector";
import R from "ramda";
import { pipe } from "@space48/json-pipe";

export function scopeLocator(
  connectors: Record<string, Connector>,
  repository: ConfigRepository,
): (
  scope: ScopeRef
) => Promise<ConnectorScope|undefined> {
  return async (scope: ScopeRef) => {
    const config = await repository.getConfig(scope);
    if (!config) {
      return undefined;
    }
    const connector = connectors[scope.connector];
    const configSchema = connector.$definition.configSchema;
    const scopeConfig = new ScopeConfig(
      configSchema as any,
      config,
      newConfig => repository.setConfig(scope, newConfig),
    );
    return connector(scopeConfig as any);
  };
}

export interface ConfigRepository {
  getScopes(): Promise<ScopeRef[]>

  getConfig<T = any>(scope: ScopeRef): Promise<T|undefined>

  setConfig<T = any>(scope: ScopeRef, config: T): Promise<void>

  removeConfig(scope: ScopeRef): Promise<boolean>

  export(): Promise<any>

  import(config: Config): Promise<void>
}

export class LocalConfigRepository implements ConfigRepository {
  constructor(
    private conf: Conf,
  ) {}

  async getScopes(): Promise<ScopeRef[]> {
    const key = this.computeKey(this.connectorsPath);
    return pipe(
      key.length ? this.conf.get(key) : this.conf.store,
      R.toPairs,
      R.map(([connectorName, scopeConfigs]) => R.keys(scopeConfigs).map((scopeName): ScopeRef => ({
        connector: connectorName,
        scope: scopeName,
      }))),
      R.flatten,
    )
  }

  async getConfig(scope: ScopeRef) {
    const key = this.scopeKey(scope);
    return this.conf.get(key, undefined);
  }

  async setConfig(scope: ScopeRef, config: any) {
    const key = this.scopeKey(scope);
    this.conf.set(key, config);
  }

  async removeConfig(scope: ScopeRef) {
    const key = this.scopeKey(scope);
    const exists = this.conf.has(key);
    if (exists) {
      this.conf.delete(key as any);
    }
    return exists;
  }

  async export() {
    return this.conf.store;
  }

  async import(config: any) {
    
  }

  private scopeKey(scopeRef: ScopeRef) {
    return this.computeKey([...this.connectorsPath, scopeRef.connector, scopeRef.scope]);
  }

  private computeKey(path: string[]) {
    return path.map(rawKey => rawKey.replace(/\./g, '\\.')).join('.')
  }

  private readonly connectorsPath = ['connectors'];
}

export type Config = {
  [connector: string]: {
    [scope: string]: any
  }
}
