import { Magento1RestClient } from "./rest";
import { EndpointDefinition, Path, ResourceDefinition } from "../../framework";
import { Magento1SoapClient } from "./soap";
export declare type Magento1Scope = {
    rest: Magento1RestClient;
    soap: Magento1SoapClient;
};
export declare class Soap {
    private constructor();
    static list<T = any>(method: string): EndpointDefinition<Magento1Scope, any, T>;
    private static prepareFilters;
}
declare type Children<Name extends string> = {
    [K in Name]: ResourceDefinition<Magento1Scope, {
        getRest: EndpointDefinition<Magento1Scope>;
    }>;
};
export declare class Rest {
    private constructor();
    static crud<ChildName extends string>(uriPattern: string, childNames?: readonly ChildName[]): {
        endpoints: {
            createRest: EndpointDefinition<Magento1Scope, object, object>;
            listRest: EndpointDefinition<Magento1Scope, any, object>;
        };
        documents: {
            idField: string;
            listIds: (scope: Magento1Scope) => (path: Path) => AsyncIterable<string | number>;
            endpoints: {
                deleteRest: EndpointDefinition<Magento1Scope, any, unknown>;
                getRest: EndpointDefinition<Magento1Scope, any, object>;
                updateRest: EndpointDefinition<Magento1Scope, object, object>;
            };
            resources: Children<ChildName>;
        };
    };
    static read<ChildName extends string>(uriPattern: string, childNames?: readonly ChildName[]): {
        endpoints: {
            listRest: EndpointDefinition<Magento1Scope, any, object>;
        };
        documents: {
            idField: string;
            listIds: (scope: Magento1Scope) => (path: Path) => AsyncIterable<string | number>;
            endpoints: {
                getRest: EndpointDefinition<Magento1Scope, any, object>;
            };
            resources: Children<ChildName>;
        };
    };
    private static children;
    private static fn;
    static create: (uriPattern: string) => EndpointDefinition<Magento1Scope, object, object>;
    static del: (uriPattern: string) => EndpointDefinition<Magento1Scope, any, unknown>;
    static get: (uriPattern: string) => EndpointDefinition<Magento1Scope, any, object>;
    static list: (uriPattern: string) => EndpointDefinition<Magento1Scope, any, object>;
    static update: (uriPattern: string) => EndpointDefinition<Magento1Scope, object, object>;
    private static listIds;
}
export declare function useAgent<T>(fn: () => Promise<T>): Promise<T>;
export {};
