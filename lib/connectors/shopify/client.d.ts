import * as t from "io-ts";
import Shopify from "shopify-api-node";
import { MutableReference } from "../../framework";
export declare type Config = t.TypeOf<typeof configSchema>;
export declare const configSchema: t.TypeC<{
    shopName: t.StringC;
    credentials: t.TypeC<{
        apiKey: t.StringC;
        password: t.StringC;
    }>;
}>;
export declare class Scope {
    private readonly config;
    constructor(config: MutableReference<Config>);
    private clientConfig?;
    private _client?;
    client(): Shopify;
    map(resourceKey: string, endpointKey: string, ids: any[], input?: any): Promise<any>;
    flatMap(resourceKey: string, endpointKey: string, ids: any[], input?: any): AsyncIterable<any>;
    listIds(resourceKey: string, endpointKey: string, ids: any[], input?: any): AsyncIterable<number>;
}
