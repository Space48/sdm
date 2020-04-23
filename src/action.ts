import * as readline from 'readline';

type Stream<T> = Iterable<T> | Promise<Iterable<T>> | AsyncIterable<T>;

export async function source<T>(items: Stream<T>): Promise<void> {
    for await (const item of await items) {
        if (!await writeData(item)) {
            return;
        }
    }
}

export type Transform<I, O> = (input: AsyncIterable<I>) => Stream<O>;
export async function transform<I, O>(transform: Transform<I, O>) {
    await runTransform(transform);
}

export type Sink<I, O> = ((input: I) => O) | ((input: I) => Promise<O>);
export type SinkOptions = {
    concurrency?: number,   // max number of concurrent executions of sink fn; defaults to 1
};
type SinkArgs<I, O> = [SinkOptions, Sink<I, O>] | [Sink<I, O>];
export async function sink<I, O = any>(...args: SinkArgs<I, O>) {
    const fn = args.length === 1 ? args[0] : args[1];
    const processItem = gracefulSink(fn);
    const {concurrency: concurrencyLimit=1} = args.length === 1 ? {} : args[0];
    let numInFlight = 0;
    let writeMore = true;
    let proceed = () => {};
    for await (const input of readData<I>()) {
        if (numInFlight === concurrencyLimit) {
            await new Promise(resolve => {proceed = resolve});
        }
        if (!writeMore) {
            return;
        }
        numInFlight++;
        processItem(input)
            .then(writeData)
            .then(_writeMore => {
                writeMore = _writeMore;
                numInFlight--;
                proceed();
            });
    }
}

const gracefulSink = <I, R>(fn: Sink<I, R>) => async (input: I): Promise<string> => {
    try {
        return JSON.stringify({success: true, input, result: await fn(input)});
    } catch (error) {
        try {
            return JSON.stringify({success: false, input, error});
        } catch {
            return JSON.stringify({success: false, input, error: error.message});
        }
    }
}

export type Mapper<I, O> = ((input: I) => O) | ((input: I) => Promise<O>);
export async function map<I, O = any>(mapper: Mapper<I, O>) {
    const transform: Transform<I, O> = async function* (input) {
        for await (const inputItem of input) {
            yield mapper(inputItem);
        }
    };
    await runTransform(transform);
}

export async function concurrentMap<I, O = any>(concurrencyLimit: number, mapper: Mapper<I, O>) {
    const transform: Transform<I, O> = async function* (input) {
        const chunks = chunk(concurrencyLimit, input);
        for await (const chunk of chunks) {
            const results = await Promise.all(chunk.map(inputItem => mapper(inputItem)));
            yield* results;
        }
    };
    await runTransform(transform);
}

export type FlatMapper<I, O> = (input: I) => Stream<O>;
export async function flatMap<I, O>(mapper: FlatMapper<I, O>) {
    const transform: Transform<I, O> = async function* (input) {
        for await (const inputItem of input) {
            for await (const outputItem of await mapper(inputItem)) {
                yield outputItem;
            }
        }
    };
    await runTransform(transform);
}

export async function* chunk<T>(size: number, items: Stream<T>): AsyncIterable<T[]> {
    if (size < 1) {
        throw new Error();
    }
    let currentChunk: T[] = [];
    for await (const item of await items) {
        currentChunk.push(item);
        if (currentChunk.length === size) {
            yield currentChunk;
            currentChunk = [];
        }
    }
    if (currentChunk.length > 0) {
        yield currentChunk;
    }
}

export async function collect<T>(items: Stream<T>): Promise<T[]> {
    const result: T[] = [];
    for await (const item of await items) {
        result.push(item);
    }
    return result;
}

async function runTransform<I, O>(transform: Transform<I, O>) {
    try {
        for await (const outputItem of await transform(readData<I>())) {
            if (!await writeData(outputItem)) {
                return;
            }
        }
    } catch (e) {
        process.stderr.write((e.message || JSON.stringify(e)) + '\n');
    }
}

let pipeClosed = false;
process.stdout.on('error', (e: any) => pipeClosed = pipeClosed || e?.code === 'EPIPE');
const writeData = async (data: any): Promise<boolean> => {
    if (pipeClosed) {
        return false;
    }
    const output = typeof data === 'string' ? data : JSON.stringify(data);
    const writeMore = process.stdout.write(`${output}\n`);
    if (writeMore) {
        return true;
    }
    await new Promise<void>((resolve, reject) => {
        const drainListener = () => {
            process.stdout.removeListener('error', errorListener);
            resolve()
        };
        process.stdout.once('drain', drainListener);

        const errorListener = (e: any) => {
            process.stdout.removeListener('drain', drainListener);
            if (!pipeClosed) {
                reject(e);
            }
        };
        process.stdout.once('error', errorListener);
    });
    return !pipeClosed;
};

async function* readData<T>(): AsyncGenerator<T> {
    if (process.stdin.isTTY) {
        return;
    }
    const rl = readline.createInterface({input: process.stdin, crlfDelay: Infinity});
    for await (const line of rl) {
        const lineTrimmed = line.trim();
        if (lineTrimmed.length === 0) {
            continue;
        }
        yield JSON.parse(lineTrimmed);
    }
}
