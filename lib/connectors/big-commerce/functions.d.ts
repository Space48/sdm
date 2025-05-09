import BigCommerce from "./client";
import { DocId, EndpointDefinition, Path } from "../../framework";
export interface Query {
    [key: string]: any;
}
export declare class endpoint {
    private constructor();
    static crud(uriPattern: string, idField?: string): {
        endpoints: {
            create: EndpointDefinition<BigCommerce, object, object>;
            list: EndpointDefinition<BigCommerce, Query | undefined, object>;
        };
        documents: {
            idField: string;
            listIds: (client: BigCommerce) => (path: Path) => AsyncIterable<DocId>;
            endpoints: {
                delete: EndpointDefinition<BigCommerce, any, void>;
                get: EndpointDefinition<BigCommerce, Query | undefined, object>;
                update: EndpointDefinition<BigCommerce, object, object>;
            };
        };
    };
    static fn<I = any, O = any>(uriPattern: string, _fn: (client: BigCommerce, uri: string, data: I, path: ReadonlyArray<DocId>) => Promise<O> | AsyncIterable<O>): EndpointDefinition<BigCommerce, I, O>;
    static create: (uriPattern: string) => EndpointDefinition<BigCommerce, object, object>;
    static del: (uriPattern: string) => EndpointDefinition<BigCommerce, any, void>;
    static get: (uriPattern: string) => EndpointDefinition<BigCommerce, Query | undefined, object>;
    static list: (uriPattern: string) => EndpointDefinition<BigCommerce, Query | undefined, object>;
    static update: (uriPattern: string) => EndpointDefinition<BigCommerce, object, object>;
}
export declare class batch {
    private constructor();
    static crud(uriPattern: string, idField?: string): {
        endpoints: {
            create: EndpointDefinition<BigCommerce, object, object>;
            delete: EndpointDefinition<BigCommerce, object, void>;
            list: EndpointDefinition<BigCommerce, Query | undefined, object>;
            update: EndpointDefinition<BigCommerce, object, object>;
        };
        documents: {
            idField: string;
            listIds: (client: BigCommerce) => (path: Path) => AsyncIterable<DocId>;
            endpoints: {
                delete: EndpointDefinition<BigCommerce, any, void>;
                get: EndpointDefinition<BigCommerce, any, any>;
            };
        };
    };
    static createOneOrMany: (uriPattern: string) => EndpointDefinition<BigCommerce, object, object>;
    static deleteOne: (uriPattern: string) => EndpointDefinition<BigCommerce, any, void>;
    static deleteMany: (uriPattern: string) => EndpointDefinition<BigCommerce, object, void>;
    static getOne: (uriPattern: string) => EndpointDefinition<BigCommerce, any, any>;
    static updateMany: (uriPattern: string) => EndpointDefinition<BigCommerce, object, object>;
}
export declare class UriTemplate {
    static uri(uriTemplate: string, fieldValues: ReadonlyArray<DocId>): string;
    static applyValues(uriTemplate: string, fieldValues: ReadonlyArray<DocId>): string;
    static fields(uriTemplate: string): string[];
}
export declare function listIds(uriPattern: string, idField?: string): (client: BigCommerce) => (path: Path) => AsyncIterable<DocId>;
