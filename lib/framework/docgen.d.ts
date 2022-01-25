import { ConnectorDefinition, ScopeRef } from "./connector";
export declare namespace Shell {
    function explainInteractiveCliUsage(connector: ConnectorDefinition): string;
    function explainCliUsageOnCli(connector: ConnectorDefinition, scopeRef: ScopeRef): string;
}
export declare namespace Markdown {
    function explainUsage(connector: ConnectorDefinition, connectorName: string): string;
}
