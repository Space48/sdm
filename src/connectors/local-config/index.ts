import { ConfigRepository, connector, Path, ScopeRef } from "../../framework";
import * as t from 'io-ts'
import { connectors } from "..";
import R from "ramda";
import { defaultConfigRepository } from "../..";

export const localConfigConnector = connector({
  getScope: () => defaultConfigRepository(),

  getScopeName: () => '',

  getWarningMessage: async (repository: ConfigRepository) => {},

  configSchema: t.type({}),

  resources: {
    blob: {
      endpoints: {
        import: repository => ({input}) => repository.import(input),
        export: repository => () => repository.export(),
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
              add: repository => async ({path, input: scopeConfig}) => {
                const [connectorName] = Path.getDocIds(path);
                if (!(connectorName in connectors)) {
                  throw new Error(`No such connector ${connectorName}. Available connectors: ${R.keys(connectors).join(', ')}`)
                }
                const connector = connectors[connectorName];
                const scopeRef = {
                  connector: connectorName as string,
                  scope: connector(scopeConfig).scopeName,
                };
                const existingConfig = await repository.getConfig(scopeRef);
                if (existingConfig) {
                  throw new Error();
                }
                await repository.setConfig(scopeRef, scopeConfig);
              },

              save: repository => async ({path, input: scopeConfig}) => {
                const [connectorName] = Path.getDocIds(path);
                if (!(connectorName in connectors)) {
                  throw new Error(`No such connector ${connectorName}. Available connectors: ${R.keys(connectors).join(', ')}`)
                }
                const connector = connectors[connectorName];
                const scopeRef: ScopeRef = {
                  connector: connectorName as string,
                  scope: connector(scopeConfig).scopeName,
                };
                const existingConfig = await repository.getConfig(scopeRef);
                if (!existingConfig) {
                  throw new Error();
                }
                await repository.setConfig(scopeRef, scopeConfig);
              },

              list: repository => async function* ({path}) {
                const [connectorName] = Path.getDocIds(path);
                const allScopes = await repository.getScopes();
                yield* allScopes
                  .filter(({connector}) => connector === connectorName)
                  .map(({scope}) => scope);
              },
            },

            documents: {
              idField: 'name',

              listIds: repository => async function* (path) {
                const [connectorName] = Path.getDocIds(path)
                yield* (await repository.getScopes())
                  .filter(scope => scope.connector === connectorName)
                  .map(scope => scope.scope);
              },
      
              endpoints: {
                delete: repository => async ({path}) => {
                  const scopeRef = getScopeRef(path);
                  return await repository.removeConfig(scopeRef);
                },

                get: repository => async ({path}) => {
                  const scopeRef = getScopeRef(path);
                  return (await repository.getConfig(scopeRef)) ?? null;
                },

                update: repository => async ({path, input: configUpdate}) => {
                  const scopeRef = getScopeRef(path);
                  const existingConfig = await repository.getConfig(scopeRef);
                  if (!existingConfig) {
                    throw new Error();
                  }
                  const updatedConfig = {...existingConfig, ...configUpdate};
                  const connector = connectors[scopeRef.connector];
                  const newScopeName = connector(updatedConfig).scopeName;
                  if (newScopeName === scopeRef.scope) {
                    await repository.setConfig(scopeRef, updatedConfig); 
                  } else {
                    const newScopeRef = {
                      connector: scopeRef.connector,
                      scope: newScopeName,
                    };
                    await repository.setConfig(newScopeRef, updatedConfig);
                    await repository.removeConfig(scopeRef);
                  }
                },
              },
            },
          },
        },
      },
    },
  },
});

function getScopeRef(path: Path): ScopeRef {
  const [connectorName, scopeName] = Path.getDocIds(path);
  if (!(connectorName in connectors)) {
    throw new Error(`No such connector ${connectorName}. Available connectors: ${R.keys(connectors).join(', ')}`)
  }
  return {
    connector: connectorName as string,
    scope: scopeName as string,
  };
}
