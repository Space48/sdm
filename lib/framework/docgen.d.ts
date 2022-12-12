import { ConnectorDefinition, ScopeRef } from "./connector";
export declare class Shell {
    private constructor();
    static explainInteractiveCliUsage(connector: ConnectorDefinition): string;
    static explainCliUsageOnCli(connector: ConnectorDefinition, scopeRef: ScopeRef): string;
    private static describeCommandsOnCli;
}
export declare class Markdown {
    private constructor();
    static explainSummary(connector: ConnectorDefinition, connectorName: string): string;
    static explainUsage(connector: ConnectorDefinition, connectorName: string): string;
    private static describeCommands;
    private static describeResourceUsage;
    private static describeEndpointUsage;
    private static encodeJsCommands;
    private static encodeResourcePathJs;
    private static getPathExcludingDocId;
    private static pathTitle;
    private static title;
    private static contents;
    private static linkToSection;
}
