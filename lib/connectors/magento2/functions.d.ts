import Magento2, { Filter, SortKey } from "./client";
import { DocId, EndpointDefinition, Path } from "../../framework";
declare type CrudOptions = {
    idField: string;
    list: {
        uri?: string;
        sortKey: SortKey;
        idField?: string;
    };
};
export declare class endpoint {
    private constructor();
    static crud<T extends CrudOptions>(uriPattern: string, options: T): {
        endpoints: {
            create: EndpointDefinition<Magento2, object, object>;
            createAsync: EndpointDefinition<Magento2, object, object>;
            list: EndpointDefinition<Magento2, Filter[] | undefined, object>;
        };
        documents: {
            idField: string;
            listIds: (client: Magento2) => (path: Path) => AsyncIterable<DocId>;
            endpoints: {
                delete: EndpointDefinition<Magento2, any, unknown>;
                get: EndpointDefinition<Magento2, any, object>;
                update: EndpointDefinition<Magento2, object, object>;
            };
        };
    };
    static fn<I = any, O = any>(uriPattern: string, _fn: (client: Magento2, uri: string, data: I, path: ReadonlyArray<DocId>) => Promise<O> | AsyncIterable<O>): EndpointDefinition<Magento2, I, O>;
    static create: (uriPattern: string) => EndpointDefinition<Magento2, object, object>;
    static createAsync: (uriPattern: string) => EndpointDefinition<Magento2, object, object>;
    static del: (uriPattern: string) => EndpointDefinition<Magento2, any, unknown>;
    static get: (uriPattern: string) => EndpointDefinition<Magento2, any, object>;
    static list: (uriPattern: string, sortKey: SortKey) => EndpointDefinition<Magento2, Filter[] | undefined, object>;
    static update: (uriPattern: string) => EndpointDefinition<Magento2, object, object>;
    static updateAsync: (uriPattern: string) => EndpointDefinition<Magento2, object, object>;
    static updateAsyncTEST: (uriPattern: string) => EndpointDefinition<Magento2, object, object>;
}
export {};
