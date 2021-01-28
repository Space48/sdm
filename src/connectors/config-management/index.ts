import { ConfigRepository, Connector, connector, Path, ScopeRef } from "../../framework";
import * as t from 'io-ts'
import R from "ramda";

// do not remove the following imports -- they are intended to tidy up the generated declaration files
import * as f from '../../framework';

export const configManagement = (
  connectors: Readonly<Record<string, Connector>>,
  repository: ConfigRepository,
) => connector({
  getScope: () => null,

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
              add: () => async ({path, input: scopeConfig}) => {
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

              save: () => async ({path, input: scopeConfig}) => {
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

              list: () => async function* ({path}) {
                const [connectorName] = Path.getDocIds(path);
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
                delete: () => async ({path}) => {
                  const scopeRef = getScopeRef(connectors, path);
                  return await repository.removeConfig(scopeRef);
                },

                get: () => async ({path}) => {
                  const scopeRef = getScopeRef(connectors, path);
                  return (await repository.getConfig(scopeRef)) ?? null;
                },

                update: () => async ({path, input: configUpdate}) => {
                  const scopeRef = getScopeRef(connectors, path);
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

function getScopeRef(connectors: Record<string, Connector>, path: Path): ScopeRef {
  const [connectorName, scopeName] = Path.getDocIds(path);
  if (!(connectorName in connectors)) {
    throw new Error(`No such connector ${connectorName}. Available connectors: ${R.keys(connectors).join(', ')}`)
  }
  return {
    connector: connectorName as string,
    scope: scopeName as string,
  };
}
