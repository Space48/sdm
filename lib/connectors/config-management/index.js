import { EndpointError, connector, Path, } from "../../framework";
import * as t from "io-ts";
import R from "ramda";
export const configManagementConnector = (connectors, repository) => connector({
    getScope: () => new Context(connectors, repository),
    scopeNameExample: null,
    getScopeName: () => "",
    getWarningMessage: async () => Promise.resolve(),
    configSchema: t.null,
    resources: {
        blob: {
            endpoints: {
                import: () => ({ input }) => repository.import(input),
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
                idField: "name",
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
                                    .filter(({ connector }) => connector === connectorName)
                                    .map(({ scope }) => scope);
                            },
                        },
                        documents: {
                            idField: "name",
                            listIds: () => async function* (path) {
                                const [connectorName] = Path.getDocIds(path);
                                yield* (await repository.getScopes())
                                    .filter(scope => scope.connector === connectorName && scope.scope !== null)
                                    .map(scope => scope.scope);
                            },
                            endpoints: {
                                delete: context => async ({ docId: [connector, scope] }) => {
                                    return await context.removeConfig(connector, scope);
                                },
                                get: context => async ({ docId: [connector, scope] }) => {
                                    var _a;
                                    return (_a = (await context.getConfig(connector, scope))) !== null && _a !== void 0 ? _a : null;
                                },
                                update: context => async ({ docId: [connector, scope], input }) => {
                                    return await context.updateConfig(connector, scope, input);
                                },
                            },
                            resources: {
                                fields: {
                                    documents: {
                                        idField: "path",
                                        endpoints: {
                                            delete: context => async ({ docId: [connector, scope, field] }) => {
                                                return await context.updateConfig(connector, scope, existingConfig => {
                                                    return R.dissocPath(String(field).split("."), existingConfig);
                                                });
                                            },
                                            get: context => async ({ docId: [connector, scope, field] }) => {
                                                const config = await context.getConfig(connector, scope);
                                                return R.path(String(field).split("."), config);
                                            },
                                            set: context => async ({ docId: [connector, scope, field], input }) => {
                                                return await context.updateConfig(connector, scope, existingConfig => {
                                                    return R.assocPath(String(field).split("."), input, existingConfig);
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
    constructor(connectors, repository) {
        this.connectors = connectors;
        this.repository = repository;
    }
    validateConnectorName(name) {
        this.connector(name);
    }
    connector(name) {
        if (!(name in this.connectors)) {
            throw new EndpointError(`No such connector ${name}. Available connectors: ${R.keys(this.connectors).join(", ")}`);
        }
        return this.connectors[name];
    }
    scope(connector, scope) {
        this.validateConnectorName(connector);
        return { connector: connector, scope: scope };
    }
    async getConfig(connectorName, scope) {
        this.validateConnectorName(connectorName);
        return await this.repository.getConfig({
            connector: connectorName,
            scope: scope,
        });
    }
    async addConfig(connectorName, config) {
        const connector = this.connector(connectorName);
        const scope = connector(config).scopeName;
        const existingConfig = await this.getConfig(connectorName, scope);
        if (existingConfig) {
            throw new EndpointError(`Connector ${connectorName} already has a scope named ${scope}.`);
        }
        await this.repository.setConfig({ connector: connectorName, scope }, config);
    }
    async setConfig(connectorName, config) {
        const connector = this.connector(connectorName);
        const scope = connector(config).scopeName;
        await this.repository.setConfig({ connector: connectorName, scope }, config);
    }
    async updateConfig(connectorName, scope, fnOrConfig) {
        const connector = this.connector(connectorName);
        const existingConfig = await this.repository.getConfig({
            connector: connectorName,
            scope: scope,
        });
        if (!existingConfig) {
            throw new EndpointError(`Connector ${connector} does not have any scope named ${scope}.`);
        }
        const updatedConfig = typeof fnOrConfig === "function" ? fnOrConfig(existingConfig) : fnOrConfig;
        const newScope = connector(updatedConfig).scopeName;
        await this.repository.setConfig({ connector: connectorName, scope: newScope }, updatedConfig);
        if (newScope !== scope) {
            this.repository.removeConfig({ connector: connectorName, scope: scope });
        }
        return updatedConfig;
    }
    async removeConfig(connectorName, scope) {
        this.validateConnectorName(connectorName);
        await this.repository.removeConfig({
            connector: connectorName,
            scope: scope,
        });
    }
}
