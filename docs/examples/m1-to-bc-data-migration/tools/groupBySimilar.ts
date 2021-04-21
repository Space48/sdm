export type Transform<I = any, O = any> = (input: AsyncIterable<I>) => AsyncIterable<O>;

export function groupBySimilar<T, K>(getKeyFn: (element: T) => K): Transform<T, T[]> {
    return async function* (input) {
        let currentKey: K|undefined = undefined;
        let buffer: T[] = [];

        for await (const element of input) {
            const key = getKeyFn(element);
            // @ts-ignore
            if (key?.toString()?.includes(currentKey?.toString())) {
                buffer.push(element);
            } else {
                currentKey = key;
                if (buffer.length) {
                    yield buffer;
                }
                buffer = [element];
            }
        }

        if (buffer.length) {
            yield buffer;
            currentKey = undefined;
            buffer = [];
        }
    };
}
