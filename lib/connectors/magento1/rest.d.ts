/// <reference types="node" />
import { Agent } from "http";
import { Reference } from "../../framework";
import * as t from 'io-ts';
export declare type Magento1RestConfig = t.TypeOf<typeof magento1RestConfigSchema>;
export declare const magento1RestConfigSchema: t.TypeC<{
    credentials: t.TypeC<{
        key: t.StringC;
        secret: t.StringC;
    }>;
    accessToken: t.TypeC<{
        token: t.StringC;
        tokenSecret: t.StringC;
    }>;
}>;
export declare class Magento1RestClient {
    private baseUrl;
    private agent;
    private config;
    constructor(baseUrl: Reference<string>, agent: Reference<Agent>, config: Reference<Magento1RestConfig | undefined>);
    get<T>(uri: string, params?: QueryParams): Promise<T>;
    search<T extends Record<string, any> = any>(uri: string, { sortKey, filters }: {
        sortKey: string;
        filters?: Filter[];
    }): AsyncIterable<T>;
    post<T>(uri: string, content: any): Promise<T>;
    put<T>(uri: string, content: any): Promise<T>;
    patch<T>(uri: string, content: any): Promise<T>;
    delete<T>(uri: string, content?: any): Promise<T>;
    private makeUnsafeRequest;
    private fetch;
    private init;
    private authHeaderFn;
}
export declare type QueryParams = {
    [param: string]: QueryParam;
};
declare type QueryParam = QueryParams | string | number | QueryParam[];
declare type FilterCondition = 'eq' | 'gt' | 'in';
declare type Filter = [string, FilterCondition, string | number | string[] | number[]];
export declare function getAccessToken(baseUrl: string, credentials: Magento1RestConfig['credentials']): Promise<Magento1RestConfig['accessToken']>;
export {};
