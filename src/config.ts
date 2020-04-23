import * as Conf from "conf";

export class Config<T extends Record<string, any>> {
    constructor(
        private config: Conf,
        private context: string[] = [],
    ) {}

    getAll(): T | undefined {
        return this.context.length
            ? this.config.get(computeAbsoluteKey(this.context))
            : this.config.store;
    }

    get<K extends keyof T>(key: K): T[K] | undefined {
        const absoluteKey = computeAbsoluteKey(this.context.concat(key as string));
        return this.config.get(absoluteKey);
    }

    set<K extends keyof T>(key: K, value: T[K]) {
        const absoluteKey = computeAbsoluteKey(this.context.concat(key as string));
        return this.config.set(absoluteKey, value);
    }

    has<K extends keyof T>(key: K): boolean {
        const absoluteKey = computeAbsoluteKey(this.context.concat(key as string));
        return this.config.has(absoluteKey);
    }

    delete<K extends keyof T>(key: K): void {
        const absoluteKey = computeAbsoluteKey(this.context.concat(key as string));
        this.config.delete(absoluteKey);
    }

    clear(): void {
        if (this.context.length) {
            const absoluteKey = computeAbsoluteKey(this.context);
            this.config.delete(absoluteKey);
        } else {
            this.config.clear();
        }
    }

    select<K extends keyof SubConfigs<T>>(key: K): Config<T[K]> {
        return new Config<T[K]>(this.config, this.context.concat(key as string));
    }
}

type Schema = Record<string, any>;
type SubConfigs<T extends Schema> = {[K in keyof T]: T[K] extends Schema ? T[K] : never};

const computeAbsoluteKey = (keys: string[]) => (
    keys.map(rawKey => rawKey.replace(/\./g, '\\.'))
        .join('.')
);
