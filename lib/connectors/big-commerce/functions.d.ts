import BigCommerce from './client';
import { DocId, EndpointDefinition, Path } from '../../framework';
export interface Query {
    [key: string]: any;
}
export declare namespace endpoint {
    function crud(uriPattern: string, idField?: string): {
        endpoints: {
            create: EndpointDefinition<BigCommerce, object, object>;
            list: EndpointDefinition<BigCommerce, Query | undefined, object>;
        };
        documents: {
            idField: string;
            listIds: (client: BigCommerce) => (path: Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: EndpointDefinition<BigCommerce, any, void>;
                get: EndpointDefinition<BigCommerce, Query | undefined, object>;
                update: EndpointDefinition<BigCommerce, object, object>;
            };
        };
    };
    function fn<I = any, O = any>(uriPattern: string, _fn: (client: BigCommerce, uri: string, data: I, path: ReadonlyArray<DocId>) => Promise<O> | AsyncIterable<O>): EndpointDefinition<BigCommerce, I, O>;
    const create: (uriPattern: string) => EndpointDefinition<BigCommerce, object, object>;
    const del: (uriPattern: string) => EndpointDefinition<BigCommerce, any, void>;
    const get: (uriPattern: string) => EndpointDefinition<BigCommerce, Query | undefined, object>;
    const list: (uriPattern: string) => EndpointDefinition<BigCommerce, Query | undefined, object>;
    const update: (uriPattern: string) => EndpointDefinition<BigCommerce, object, object>;
}
export declare namespace batch {
    function crud(uriPattern: string, idField?: string): {
        endpoints: {
            create: EndpointDefinition<BigCommerce, object, object>;
            list: EndpointDefinition<BigCommerce, Query | undefined, object>;
        };
        documents: {
            idField: string;
            listIds: (client: BigCommerce) => (path: Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: EndpointDefinition<BigCommerce, any, void>;
                get: EndpointDefinition<BigCommerce, any, any>;
                update: EndpointDefinition<BigCommerce, object, object>;
            };
        };
    };
    const createOne: (uriPattern: string) => EndpointDefinition<BigCommerce, object, object>;
    const deleteOne: (uriPattern: string) => EndpointDefinition<BigCommerce, any, void>;
    const getOne: (uriPattern: string) => EndpointDefinition<BigCommerce, any, any>;
    const updateOne: (uriPattern: string) => EndpointDefinition<BigCommerce, object, object>;
}
export declare class UriTemplate {
    static uri(uriTemplate: string, fieldValues: ReadonlyArray<DocId>): string;
    static applyValues(uriTemplate: string, fieldValues: ReadonlyArray<DocId>): string;
    static fields(uriTemplate: string): string[];
}
export declare function listIds(uriPattern: string, idField?: string): (client: BigCommerce) => (path: Path) => AsyncIterable<string | number>;
