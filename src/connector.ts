import { ResourceCollection } from "./resource";
import { Action } from "./action";

export interface Connector {
  getConfigActions(): ActionCollection
  getScopes(): string[]
  getScope(name: string): ConnectorScope|undefined
  getTypicalResources(): ResourceCollection
};

export interface ConnectorScope {
  name: string
  getWarningMessage(): Promise<string|undefined>
  getResources(): ResourceCollection
}

export type ActionCollection = Action[] | {[namespace: string]: ActionCollection};
