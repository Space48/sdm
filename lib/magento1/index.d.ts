import * as config from './config';
import { ConfigStore } from '../config-store';
import { Connector, ConnectorScope } from '../connector';
import { ResourceCollection } from '../resource';
export declare type ConfigSchema = {
    credentials: config.ConfigSchema;
};
export default class Magento1Connector implements Connector {
    private configStore;
    constructor(configStore: ConfigStore<ConfigSchema>);
    getConfigActions(): import("../action").Action[];
    getScopes(): string[];
    getScope(baseUrl: string): Magento1Scope;
    getTypicalResources(): {};
}
declare class Magento1Scope implements ConnectorScope {
    private baseUrl;
    private configStore;
    constructor(baseUrl: string, configStore: ConfigStore<ConfigSchema['credentials']>);
    get name(): string;
    getWarningMessage(): Promise<undefined>;
    getResources(): ResourceCollection;
}
export {};
