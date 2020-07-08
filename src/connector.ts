import { ResourceCollection } from "./resource";
import { Action } from "./action";

export interface Connector {
    getConfigActions(): ActionCollection;
    getScopes(): string[];
    getTypicalResources(): ResourceCollection;
    getScopeResources(scope: string): ResourceCollection;
};

export type ActionCollection = Action[] | {[namespace: string]: ActionCollection};
