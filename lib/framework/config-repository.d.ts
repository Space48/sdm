import Conf from "conf";
import { ScopeRef } from "./connector";
export interface ConfigRepository {
    getScopes(): Promise<ScopeRef[]>;
    getConfig<T = any>(scope: ScopeRef): Promise<T | undefined>;
    setConfig<T = any>(scope: ScopeRef, config: T): Promise<void>;
    removeConfig(scope: ScopeRef): Promise<boolean>;
    export(): Promise<any>;
    import(config: Config): Promise<void>;
}
export declare class LocalConfigRepository implements ConfigRepository {
    private conf;
    constructor(conf: Conf);
    getScopes(): Promise<ScopeRef[]>;
    getConfig(scope: ScopeRef): Promise<any>;
    setConfig(scope: ScopeRef, config: any): Promise<void>;
    removeConfig(scope: ScopeRef): Promise<boolean>;
    export(): Promise<any>;
    import(config: any): Promise<void>;
    private scopeKey;
    private computeKey;
    private readonly connectorsPath;
}
export declare type Config = {
    [connector: string]: {
        [scope: string]: any;
    };
};
