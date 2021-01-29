import { InstanceConfig } from "./config";
export declare function createMagento1SoapClient(instanceConfig: InstanceConfig): Magento1SoapClient | undefined;
export declare type Magento1SoapClient = <T = any>(method: string, args?: Record<string, any>) => Promise<T>;
export interface SoapConfig {
    readonly credentials: SoapCredentials;
}
export interface SoapCredentials {
    username: string;
    apiKey: string;
}
