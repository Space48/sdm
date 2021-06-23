import { Magento1RestClient } from "./rest";
import { EndpointDefinition, Path, ResourceDefinition } from "../../framework";
import { Magento1SoapClient } from "./soap";
export declare type Magento1Scope = {
    rest: Magento1RestClient;
    soap: Magento1SoapClient;
};
export declare namespace Rest {
    export function crud<ChildName extends string>(uriPattern: string, childNames?: readonly ChildName[]): {
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
    export function read<ChildName extends string>(uriPattern: string, childNames?: readonly ChildName[]): {
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
    type Children<Name extends string> = {
        [K in Name]: ResourceDefinition<Magento1Scope, {
            getRest: EndpointDefinition<Magento1Scope>;
        }>;
    };
    export const create: (uriPattern: string) => EndpointDefinition<Magento1Scope, object, object>;
    export const del: (uriPattern: string) => EndpointDefinition<Magento1Scope, any, unknown>;
    export const get: (uriPattern: string) => EndpointDefinition<Magento1Scope, any, object>;
    export const list: (uriPattern: string) => EndpointDefinition<Magento1Scope, any, object>;
    export const update: (uriPattern: string) => EndpointDefinition<Magento1Scope, object, object>;
    export {};
}
export declare function useAgent<T>(fn: () => Promise<T>): Promise<T>;
