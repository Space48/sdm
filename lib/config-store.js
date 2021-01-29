"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigStore = void 0;
class ConfigStore {
    constructor(config, context = []) {
        this.config = config;
        this.context = context;
    }
    getAll() {
        return this.context.length
            ? this.config.get(computeAbsoluteKey(this.context))
            : this.config.store;
    }
    get(key) {
        const absoluteKey = computeAbsoluteKey(this.context.concat(key));
        return this.config.get(absoluteKey);
    }
    set(key, value) {
        const absoluteKey = computeAbsoluteKey(this.context.concat(key));
        this.config.set(absoluteKey, value);
        return this;
    }
    has(key) {
        const absoluteKey = computeAbsoluteKey(this.context.concat(key));
        return this.config.has(absoluteKey);
    }
    delete(key) {
        const absoluteKey = computeAbsoluteKey(this.context.concat(key));
        this.config.delete(absoluteKey);
        return this;
    }
    clear() {
        if (this.context.length) {
            const absoluteKey = computeAbsoluteKey(this.context);
            this.config.delete(absoluteKey);
        }
        else {
            this.config.clear();
        }
        return this;
    }
    select(key) {
        return new ConfigStore(this.config, this.context.concat(key));
    }
}
exports.ConfigStore = ConfigStore;
const computeAbsoluteKey = (keys) => (keys.map(rawKey => rawKey.replace(/\./g, '\\.'))
    .join('.'));
