import Conf from "conf";
import { ConnectorRef, ConnectorScope, ScopeConfig } from ".";
import R from "ramda";
import { pipe } from "@space48/json-pipe";

export function scopeLocator<Connectors extends Record<string, ConnectorRef>>(
  connectors: Connectors,
  repository: ConfigRepository<Connectors>,
): <N extends keyof Connectors&string>(
  scope: ScopeReference<N>
) => Promise<ConnectorScope|undefined> {
  return async (scope: ScopeReference) => {
    const config = await repository.getConfig(scope);
    if (!config) {
      return undefined;
    }
    const connector = connectors[scope.connector];
    const configSchema = connector.$configSchema;
    const scopeConfig = new ScopeConfig(
      configSchema as any,
      config,
      newConfig => repository.setConfig(scope, newConfig),
    );
    return connector(scopeConfig as any);
  };
}

export interface ConfigRepository<
  Connectors extends Record<string, ConnectorRef> = Record<string, ConnectorRef>
> {
  getScopes(): Promise<ScopeReference[]>

  getConfig<N extends keyof Connectors&string>(scope: ScopeReference<N>): Promise<InferConfigT<Connectors, N>|undefined>

  setConfig<N extends keyof Connectors&string>(scope: ScopeReference<N>, config: InferConfigT<Connectors, N>): Promise<void>

  export(): Promise<Config<Connectors>>

  import(config: Config<Connectors>): Promise<void>
}

export class ConfConfigRepository implements ConfigRepository {
  constructor(
    private conf: Conf,
  ) {}

  async getScopes(): Promise<ScopeReference[]> {
    return pipe(
      await this.export(),
      R.toPairs,
      R.map(([connectorName, scopeConfigs]) => R.keys(scopeConfigs).map((scopeName): ScopeReference => ({
        connector: connectorName,
        scope: scopeName,
      }))),
      R.flatten,
    )
  }

  async getConfig(scope: ScopeReference) {
    const configKey = this.computeAbsoluteKey([scope.connector, scope.scope]);
    return this.conf.get(configKey as any, undefined);
  }

  async setConfig(scope: ScopeReference, config: any): Promise<void> {
    const configKey = this.computeAbsoluteKey([scope.connector, scope.scope]);
    return this.conf.set(configKey as any, config);
  }

  async export(): Promise<any> {
    return this.conf.store;
  }

  async import(config: any): Promise<void> {
    throw new Error('Not implemented');
  }

  private computeAbsoluteKey(keys: string[]): string {
    return keys.map(rawKey => rawKey.replace(/\./g, '\\.')).join('.')
  }
}

export type Config<Connectors extends Record<string, ConnectorRef>> = {
  [N in keyof Connectors]?: { [scope: string]: InferConfigT<Connectors, N> }
}

type ScopeReference<N extends string = string> = {
  connector: N   // e.g. magento2
  scope: string  // e.g. www.bobstshirts.com
};

type InferConfigT<
  Connectors extends Record<string, ConnectorRef>,
  N extends keyof Connectors
> = Connectors[N] extends ConnectorRef<infer ScopeConfig> ? ScopeConfig : never;
