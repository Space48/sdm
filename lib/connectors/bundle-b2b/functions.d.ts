import BundleB2b from "./client";
import { DocId, EndpointDefinition, Path } from "../../framework";
export interface Query {
    [key: string]: any;
}
export declare class endpoint {
    private constructor();
    static crud(uriPattern: string, idField?: string): {
        endpoints: {
            create: EndpointDefinition<BundleB2b, object, object>;
            list: EndpointDefinition<BundleB2b, Query | undefined, object>;
        };
        documents: {
            idField: string;
            listIds: (client: BundleB2b) => (path: Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: EndpointDefinition<BundleB2b, any, void>;
                get: EndpointDefinition<BundleB2b, Query | undefined, object>;
                update: EndpointDefinition<BundleB2b, object, object>;
            };
        };
    };
    static fn<I = any, O = any>(uriPattern: string, _fn: (client: BundleB2b, uri: string, data: I, path: ReadonlyArray<DocId>) => Promise<O> | AsyncIterable<O>): EndpointDefinition<BundleB2b, I, O>;
    static create: (uriPattern: string) => EndpointDefinition<BundleB2b, object, object>;
    static del: (uriPattern: string) => EndpointDefinition<BundleB2b, any, void>;
    static get: (uriPattern: string) => EndpointDefinition<BundleB2b, Query | undefined, object>;
    static list: (uriPattern: string) => EndpointDefinition<BundleB2b, Query | undefined, object>;
    static update: (uriPattern: string) => EndpointDefinition<BundleB2b, object, object>;
}
export declare class UriTemplate {
    static uri(uriTemplate: string, fieldValues: ReadonlyArray<DocId>): string;
    static applyValues(uriTemplate: string, fieldValues: ReadonlyArray<DocId>): string;
    static fields(uriTemplate: string): string[];
}
export declare function listIds(uriPattern: string, idField?: string): (client: BundleB2b) => (path: Path) => AsyncIterable<string | number>;
