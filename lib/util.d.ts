export declare function objectFromEntries<K extends keyof any, V>(entries: ReadonlyArray<readonly [K, V]>): {
    [key: string]: V;
};
export declare const flatten: <T>(result: T[], el: T[]) => T[];
export declare const distinct: <T>(el: T, index: number, array: T[]) => boolean;
export declare function mapProperties<K extends keyof any, V, R>(object: Record<K, V>, mapper: (value: V, key: K) => R): Record<K, R>;
export declare function filterProperties<T extends Record<any, any>>(object: T, predicate: (v: T[keyof T], k: keyof T) => any): Partial<T>;
export declare const hyphenate: (value: string) => string;
export declare const camelCase: (value: string) => string;
export declare const underscore: (value: string) => string;
