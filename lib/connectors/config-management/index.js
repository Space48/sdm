"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configManagementConnector = void 0;
const framework_1 = require("../../framework");
const t = __importStar(require("io-ts"));
const ramda_1 = __importDefault(require("ramda"));
const configManagementConnector = (connectors, repository) => framework_1.connector({
    getScope: () => null,
    scopeNameExample: null,
    getScopeName: () => '',
    getWarningMessage: async () => { },
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
                idField: 'name',
                listIds: () => async function* () {
                    yield* ramda_1.default.keys(connectors);
                },
                resources: {
                    scopes: {
                        endpoints: {
                            add: () => async ({ path, input: scopeConfig }) => {
                                const [connectorName] = framework_1.Path.getDocIds(path);
                                const connector = getConnector(connectors, connectorName);
                                const scopeRef = {
                                    connector: connectorName,
                                    scope: connector(scopeConfig).scopeName,
                                };
                                const existingConfig = await repository.getConfig(scopeRef);
                                if (existingConfig) {
                                    throw new framework_1.EndpointError(`Connector ${connectorName} already has a scope named ${scopeRef.scope}.`);
                                }
                                await repository.setConfig(scopeRef, scopeConfig);
                            },
                            save: () => async ({ path, input: scopeConfig }) => {
                                const [connectorName] = framework_1.Path.getDocIds(path);
                                const connector = getConnector(connectors, connectorName);
                                const scopeRef = {
                                    connector: connectorName,
                                    scope: connector(scopeConfig).scopeName,
                                };
                                await repository.setConfig(scopeRef, scopeConfig);
                            },
                            list: () => async function* ({ path }) {
                                const [connectorName] = framework_1.Path.getDocIds(path);
                                const allScopes = await repository.getScopes();
                                yield* allScopes
                                    .filter(({ connector }) => connector === connectorName)
                                    .map(({ scope }) => scope);
                            },
                        },
                        documents: {
                            idField: 'name',
                            listIds: () => async function* (path) {
                                const [connectorName] = framework_1.Path.getDocIds(path);
                                yield* (await repository.getScopes())
                                    .filter(scope => scope.connector === connectorName && scope.scope !== null)
                                    .map(scope => scope.scope);
                            },
                            endpoints: {
                                delete: () => async ({ path }) => {
                                    const scopeRef = getScopeRef(connectors, path);
                                    return await repository.removeConfig(scopeRef);
                                },
                                get: () => async ({ path }) => {
                                    var _a;
                                    const scopeRef = getScopeRef(connectors, path);
                                    return (_a = (await repository.getConfig(scopeRef))) !== null && _a !== void 0 ? _a : null;
                                },
                                update: () => async ({ path, input: configUpdate }) => {
                                    const scopeRef = getScopeRef(connectors, path);
                                    const existingConfig = await repository.getConfig(scopeRef);
                                    if (!existingConfig) {
                                        throw new framework_1.EndpointError(`Connector ${scopeRef.connector} does not have any scope named ${scopeRef.scope}.`);
                                    }
                                    const updatedConfig = { ...existingConfig, ...configUpdate };
                                    const connector = connectors[scopeRef.connector];
                                    const newScopeName = connector(updatedConfig).scopeName;
                                    if (newScopeName === scopeRef.scope) {
                                        await repository.setConfig(scopeRef, updatedConfig);
                                    }
                                    else {
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
exports.configManagementConnector = configManagementConnector;
function getConnector(connectors, connectorName) {
    if (!(connectorName in connectors)) {
        throw new framework_1.EndpointError(`No such connector ${connectorName}. Available connectors: ${ramda_1.default.keys(connectors).join(', ')}`);
    }
    return connectors[connectorName];
}
function getScopeRef(connectors, path) {
    const [connectorName, scopeName] = framework_1.Path.getDocIds(path);
    getConnector(connectors, connectorName);
    return {
        connector: connectorName,
        scope: scopeName,
    };
}
