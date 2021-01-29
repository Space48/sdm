import { ScopeConfig } from "../../framework";
import * as t from 'io-ts';
export declare type Config = t.TypeOf<typeof configSchema>;
export declare const configSchema: t.IntersectionC<[t.TypeC<{
    baseUrl: t.StringC;
}>, t.PartialC<{
    credentials: t.TypeC<{
        username: t.StringC;
        password: t.StringC;
    }>;
    insecure: t.BooleanC;
    token: t.TypeC<{
        value: t.StringC;
        expiration: t.StringC;
    }>;
}>]>;
export default class Magento2 {
    private readonly config;
    constructor(config: ScopeConfig<Config>);
    private configUsedForAgent?;
    private agent?;
    get<T>(uri: string, params?: QueryParams): Promise<T>;
    search<T extends Record<string, any> = any>(uri: string, { sortKey, filters }: {
        sortKey: SortKey;
        filters?: Filter[];
    }): AsyncIterable<T>;
    post<T>(uri: string, content: any): Promise<T>;
    put<T>(uri: string, content: any): Promise<T>;
    patch<T>(uri: string, content: any): Promise<T>;
    delete<T>(uri: string, content?: any): Promise<T>;
    private fetchSearchResultsPage;
    private fetch;
    private getAgent;
    private refreshToken;
    private getToken;
}
export declare type QueryParams = {
    [param: string]: QueryParam;
};
declare type QueryParam = QueryParams | string | number | QueryParam[];
export declare type Filter = [string, FilterCondition, string | number | string[] | number[]];
declare type FilterCondition = 'eq' | 'gt' | 'in';
export declare type SortKey = {
    query: string;
    response: string;
};
export {};
