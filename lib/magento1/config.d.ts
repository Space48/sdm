import { ConfigStore } from "../config-store";
import { Action } from "../action";
import { SoapConfig } from "./soap";
import { RestConfig } from "./rest";
export declare function getBaseUrls(config: ConfigStore<ConfigSchema>): string[];
export declare type ConfigSchema = {
    [baseUrl: string]: InstanceConfig;
};
export declare function getInstanceConfig(configStore: ConfigStore<ConfigSchema>, baseUrl: string): InstanceConfig | undefined;
export declare function getActions(config: ConfigStore<ConfigSchema>): Action[];
export interface InstanceConfig {
    readonly baseUrl: string;
    readonly rest?: RestConfig;
    readonly soap?: SoapConfig;
    readonly insecure?: boolean;
}
