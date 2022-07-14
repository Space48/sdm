import { ConfigRepository, Connector, Path, ScopeRef, DocId } from "../../framework";
import * as f from "../../framework";
export declare const configManagementConnector: (connectors: Readonly<Record<string, Connector>>, repository: ConfigRepository) => Connector<null, Context, {
    blob: {
        endpoints: {
            import: () => ({ input }: f.EndpointPayload<any>) => Promise<void>;
            export: () => () => Promise<any>;
        };
    };
    connectors: {
        endpoints: {
            list: () => () => AsyncGenerator<string, void, undefined>;
        };
        documents: {
            idField: string;
            listIds: () => () => AsyncGenerator<string, void, undefined>;
            resources: {
                scopes: {
                    endpoints: {
                        add: (context: Context) => ({ docId: [connectorName], input: scopeConfig }: f.EndpointPayload<any>) => Promise<void>;
                        save: (context: Context) => ({ docId: [connectorName], input: scopeConfig }: f.EndpointPayload<any>) => Promise<void>;
                        list: () => ({ docId: [connectorName] }: f.EndpointPayload<any>) => AsyncGenerator<string | null, void, undefined>;
                    };
                    documents: {
                        idField: string;
                        listIds: () => (path: Path) => AsyncGenerator<string, void, undefined>;
                        endpoints: {
                            delete: (context: Context) => ({ docId: [connector, scope] }: f.EndpointPayload<any>) => Promise<void>;
                            get: (context: Context) => ({ docId: [connector, scope] }: f.EndpointPayload<any>) => Promise<any>;
                            update: (context: Context) => ({ docId: [connector, scope], input }: f.EndpointPayload<any>) => Promise<any>;
                        };
                        resources: {
                            fields: {
                                documents: {
                                    idField: string;
                                    endpoints: {
                                        delete: (context: Context) => ({ docId: [connector, scope, field] }: f.EndpointPayload<any>) => Promise<unknown>;
                                        get: (context: Context) => ({ docId: [connector, scope, field] }: f.EndpointPayload<any>) => Promise<any>;
                                        set: (context: Context) => ({ docId: [connector, scope, field], input }: f.EndpointPayload<any>) => Promise<unknown>;
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
}>;
declare class Context {
    private readonly connectors;
    private readonly repository;
    constructor(connectors: Readonly<Record<string, Connector>>, repository: ConfigRepository);
    validateConnectorName(name: DocId): void;
    connector(name: DocId): Connector;
    scope(connector: DocId, scope: DocId): ScopeRef;
    getConfig(connectorName: DocId, scope: DocId): Promise<any>;
    addConfig<T>(connectorName: DocId, config: T): Promise<void>;
    setConfig<T>(connectorName: DocId, config: T): Promise<void>;
    updateConfig<T>(connectorName: DocId, scope: DocId, fn: (existingConfig: T) => T): Promise<T>;
    updateConfig<T>(connectorName: DocId, scope: DocId, config: T): Promise<T>;
    removeConfig(connectorName: DocId, scope: DocId): Promise<void>;
}
export {};
