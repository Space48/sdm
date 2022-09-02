/// <reference types="node" />
import * as t from "io-ts";
import { Reference } from "../../framework";
import { Agent } from "http";
export declare type Magento1SoapConfig = t.TypeOf<typeof magento1SoapConfigSchema>;
export declare const magento1SoapConfigSchema: t.TypeC<{
    credentials: t.TypeC<{
        username: t.StringC;
        apiKey: t.StringC;
    }>;
}>;
export declare class Magento1SoapClient {
    private baseUrl;
    private agent;
    private soapConfig;
    constructor(baseUrl: Reference<string>, agent: Reference<Agent>, soapConfig: Reference<Magento1SoapConfig | undefined>);
    execute<R = unknown>(method: string, args?: Record<string, any>): Promise<R>;
    private client;
    private state;
}
