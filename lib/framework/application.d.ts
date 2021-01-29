import { ConnectorScope } from "./connector";
import { ConfigRepository } from "./config-repository";
import { Connector, ScopeRef } from "./connector";
export declare type ApplicationConfig = {
    readonly configRepository: ConfigRepository;
    readonly connectors: Readonly<Record<string, Connector>>;
};
export declare class Application {
    constructor({ configRepository, connectors }: ApplicationConfig);
    readonly configRepository: ConfigRepository;
    readonly connectors: Readonly<Record<string, Connector>>;
    listScopes(): Promise<ScopeRef[]>;
    requireScope(scopeRef: ScopeRef): Promise<ConnectorScope>;
    getScope(scopeRef: ScopeRef): Promise<ConnectorScope | undefined>;
}
