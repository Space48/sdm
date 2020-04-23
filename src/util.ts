export function objectFromEntries<K extends keyof any, V>(entries: ReadonlyArray<readonly [K, V]>): { [key: string]: V } {
    const result: {[k in PropertyKey]: V} = {};
    entries.forEach(([key, value]) => result[key] = value);
    return result;
}

// use with Array.reduce()
export const flatten = <T>(result: T[], el: T[]) => [...result, ...el];

// use with Array.filter()
export const distinct = <T>(el: T, index: number, array: T[]) => array.indexOf(el) === index;
