export function objectFromEntries<K extends keyof any, V>(entries: ReadonlyArray<readonly [K, V]>): { [key: string]: V } {
    const result: {[k in PropertyKey]: V} = {};
    entries.forEach(([key, value]) => result[key] = value);
    return result;
}

// use with Array.reduce()
export const flatten = <T>(result: T[], el: T[]) => [...result, ...el];

// use with Array.filter()
export const distinct = <T>(el: T, index: number, array: T[]) => array.indexOf(el) === index;

export function filterProperties<T extends Record<any, any>>(object: T, predicate: (v: T[keyof T], k: keyof T) => any): Partial<T> {
    return objectFromEntries(Object.entries(object).filter(([k, v]) => predicate(v, k))) as any;
}

export const hyphenate = (value: string): string => (
    value
        .replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
        .replace(/_/g, '-')
);
