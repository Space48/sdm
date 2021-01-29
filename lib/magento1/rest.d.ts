/// <reference types="node" />
import { Agent } from "http";
import { InstanceConfig } from "./config";
export declare function createMagento1RestClient(instanceConfig: InstanceConfig): Magento1RestClient | undefined;
declare type AuthResolver = (method: string, url: string) => string;
export declare class Magento1RestClient {
    private baseUrl;
    private agent;
    private auth;
    constructor(baseUrl: string, agent: Agent, auth: AuthResolver);
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
}
export declare type QueryParams = {
    [param: string]: QueryParam;
};
declare type QueryParam = QueryParams | string | number | QueryParam[];
declare type FilterCondition = 'eq' | 'gt' | 'in';
declare type Filter = [string, FilterCondition, string | number | string[] | number[]];
export interface RestConfig {
    readonly credentials: RestCredentials;
    readonly accessToken: RestTokenPair;
}
export interface RestCredentials {
    readonly key: string;
    readonly secret: string;
}
export interface RestTokenPair {
    readonly token: string;
    readonly tokenSecret: string;
}
export declare function getAccessToken(baseUrl: string, credentials: RestCredentials): Promise<RestTokenPair>;
export {};
