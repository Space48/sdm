import * as t from "io-ts";
import { MutableReference } from "../../framework";
export declare type Config = t.TypeOf<typeof configSchema>;
export declare const configSchema: t.IntersectionC<[t.TypeC<{
    storeAlias: t.StringC;
    storeHash: t.StringC;
    credentials: t.TypeC<{
        email: t.StringC;
        password: t.StringC;
    }>;
}>, t.PartialC<{
    token: t.TypeC<{
        value: t.StringC;
        expiration: t.NumberC;
    }>;
}>]>;
export default class BundleB2b {
    private readonly config;
    constructor(config: MutableReference<Config>);
    private readonly readAgent;
    private readonly writeAgent;
    get<T = any>(uri: string, params?: Record<string, any>): Promise<T>;
    list<T = any>(uri: string, params?: Record<string, any>): AsyncIterable<T>;
    post<T = any>(uri: string, content: any): Promise<T>;
    put<T = any>(uri: string, content: any): Promise<T>;
    patch<T = any>(uri: string, content: any): Promise<T>;
    delete(uri: string, params?: Record<string, any>): Promise<void>;
    private doGet;
    private makeRequestWithContent;
    private fetch;
    private init;
    private refreshToken;
    private getToken;
}
