import { EndpointError, ConfigRepository, Connector, connector, Path, ScopeRef, DocId } from "../../framework";
import * as t from 'io-ts'
import R from "ramda";

// do not remove the following imports -- they are intended to tidy up the generated declaration files
import * as f from '../../framework';

export const configManagementConnector = (
  connectors: Readonly<Record<string, Connector>>,
  repository: ConfigRepository,
) => connector({
  getScope: () => new Context(connectors, repository),

  scopeNameExample: null,

  getScopeName: () => '',

  getWarningMessage: async () => {},

  configSchema: t.null,

  resources: {
    blob: {
      endpoints: {
        import: () => ({input}) => repository.import(input),
        export: () => () => repository.export(),
      },
    },

    connectors: {
      endpoints: {
        list: () => async function* () {
          yield* Object.keys(connectors);
        },
      },

      documents: {
        idField: 'name',

        listIds: () => async function* () {
          yield* R.keys(connectors);
        },

        resources: {
          scopes: {
            endpoints: {
              add: context => async ({ docId: [connectorName], input: scopeConfig }) => {
                await context.addConfig(connectorName, scopeConfig);
              },

              save: context => async ({ docId: [connectorName], input: scopeConfig }) => {
                await context.setConfig(connectorName, scopeConfig);
              },

              list: () => async function* ({ docId: [connectorName] }) {
                const allScopes = await repository.getScopes();
                yield* allScopes
                  .filter(({connector}) => connector === connectorName)
                  .map(({scope}) => scope);
              },
            },

            documents: {
              idField: 'name',

              listIds: () => async function* (path) {
                const [connectorName] = Path.getDocIds(path)
                yield* (await repository.getScopes())
                  .filter(scope => scope.connector === connectorName && scope.scope !== null)
                  .map(scope => scope.scope as string);
              },
      
              endpoints: {
                delete: context => async ({ docId: [connector, scope] }) => {
                  return await context.removeConfig(connector, scope);
                },

                get: context => async ({ docId: [connector, scope] }) => {
                  return (await context.getConfig(connector, scope)) ?? null;
                },

                update: context => async ({ docId: [connector, scope], input }) => {
                  return await context.updateConfig(connector, scope, input);
                },
              },

              resources: {
                fields: {
                  documents: {
                    idField: 'path',

                    endpoints: {
                      delete: context => async ({ docId: [connector, scope, field] }) => {
                        return await context.updateConfig(connector, scope, existingConfig => {
                          return R.dissocPath(String(field).split('.'), existingConfig);
                        });
                      },

                      get: context => async ({ docId: [connector, scope, field] }) => {
                        const config = await context.getConfig(connector, scope);
                        return R.path(String(field).split('.'), config);
                      },

                      set: context => async ({ docId: [connector, scope, field], input }) => {
                        return await context.updateConfig(connector, scope, existingConfig => {
                          return R.assocPath(String(field).split('.'), input, existingConfig);
                        });
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});

class Context {
  constructor(
    private readonly connectors: Readonly<Record<string, Connector>>,
    private readonly repository: ConfigRepository,
  ) {}

  validateConnectorName(name: DocId): void {
    this.connector(name);
  }

  connector(name: DocId): Connector {
    if (!(name in this.connectors)) {
      throw new EndpointError(`No such connector ${name}. Available connectors: ${R.keys(this.connectors).join(', ')}`)
    }
    return this.connectors[name];
  }

  scope(connector: DocId, scope: DocId): ScopeRef {
    this.validateConnectorName(connector as string);
    return { connector: connector as string, scope: scope as string };
  }

  async getConfig(connectorName: DocId, scope: DocId): Promise<any> {
    this.validateConnectorName(connectorName);
    return await this.repository.getConfig({
      connector: connectorName as string,
      scope: scope as string,
    });
  }

  async addConfig<T>(connectorName: DocId, config: T): Promise<void> {
    const connector = this.connector(connectorName);
    const scope = connector(config).scopeName;
    const existingConfig = await this.getConfig(connectorName, scope);
    if (existingConfig) {
      throw new EndpointError(`Connector ${connectorName} already has a scope named ${scope}.`);
    }
    await this.repository.setConfig({ connector: connectorName as string, scope }, config);
  }

  async setConfig<T>(connectorName: DocId, config: T): Promise<void> {
    const connector = this.connector(connectorName);
    const scope = connector(config).scopeName;
    await this.repository.setConfig({ connector: connectorName as string, scope }, config);
  }

  async updateConfig<T>(connectorName: DocId, scope: DocId, fn: (existingConfig: T) => T): Promise<T>
  async updateConfig<T>(connectorName: DocId, scope: DocId, config: T): Promise<T>
  async updateConfig<T>(connectorName: DocId, scope: DocId, fnOrConfig: any): Promise<T> {
    const connector = this.connector(connectorName);
    const existingConfig = await this.repository.getConfig({ connector: connectorName as string, scope: scope as string });
    if (!existingConfig) {
      throw new EndpointError(`Connector ${connector} does not have any scope named ${scope}.`);
    }
    const updatedConfig = typeof fnOrConfig === 'function' ? fnOrConfig(existingConfig) : fnOrConfig;
    const newScope = connector(updatedConfig).scopeName;
    await this.repository.setConfig({ connector: connectorName as string, scope: newScope }, updatedConfig);
    if (newScope !== scope) {
      this.repository.removeConfig({ connector: connectorName as string, scope: scope as string });
    }
    return updatedConfig;
  }

  async removeConfig(connectorName: DocId, scope: DocId): Promise<void> {
    this.validateConnectorName(connectorName);
    await this.repository.removeConfig({ connector: connectorName as string, scope: scope as string });
  }
}
