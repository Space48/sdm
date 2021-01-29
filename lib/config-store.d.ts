import * as Conf from "conf";
export declare class ConfigStore<T extends Record<string, any>> {
    private config;
    private context;
    constructor(config: Conf, context?: string[]);
    getAll(): T | undefined;
    get<K extends keyof T>(key: K): T[K] | undefined;
    set<K extends keyof T>(key: K, value: T[K]): this;
    has<K extends keyof T>(key: K): boolean;
    delete<K extends keyof T>(key: K): this;
    clear(): this;
    select<K extends keyof SubConfigs<T>>(key: K): ConfigStore<T[K]>;
}
declare type Schema = Record<string, any>;
declare type SubConfigs<T extends Schema> = {
    [K in keyof T]: T[K] extends Schema ? T[K] : never;
};
export {};
