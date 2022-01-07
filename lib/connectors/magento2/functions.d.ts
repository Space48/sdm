import Magento2, { Filter, SortKey } from './client';
import { DocId, EndpointDefinition, Path } from '../../framework';
export declare namespace endpoint {
    type CrudOptions = {
        idField: string;
        list: {
            uri?: string;
            sortKey: SortKey;
            idField?: string;
        };
    };
    export function crud<T extends CrudOptions>(uriPattern: string, options: T): {
        endpoints: {
            create: EndpointDefinition<Magento2, object, object>;
            createAsync: EndpointDefinition<Magento2, object, object>;
            list: EndpointDefinition<Magento2, Filter[] | undefined, object>;
        };
        documents: {
            idField: string;
            listIds: (client: Magento2) => (path: Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: EndpointDefinition<Magento2, any, unknown>;
                get: EndpointDefinition<Magento2, any, object>;
                update: EndpointDefinition<Magento2, object, object>;
            };
        };
    };
    export function fn<I = any, O = any>(uriPattern: string, _fn: (client: Magento2, uri: string, data: I, path: ReadonlyArray<DocId>) => Promise<O> | AsyncIterable<O>): EndpointDefinition<Magento2, I, O>;
    export const create: (uriPattern: string) => EndpointDefinition<Magento2, object, object>;
    export const createAsync: (uriPattern: string) => EndpointDefinition<Magento2, object, object>;
    export const del: (uriPattern: string) => EndpointDefinition<Magento2, any, unknown>;
    export const get: (uriPattern: string) => EndpointDefinition<Magento2, any, object>;
    export const list: (uriPattern: string, sortKey: SortKey) => EndpointDefinition<Magento2, Filter[] | undefined, object>;
    export const update: (uriPattern: string) => EndpointDefinition<Magento2, object, object>;
    export const updateAsync: (uriPattern: string) => EndpointDefinition<Magento2, object, object>;
    export {};
}
