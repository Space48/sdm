"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandError = exports.InvalidCommand = exports.InvalidConnectorDefinition = exports.ScopeConfig = exports.Path = exports.resourceMerger = exports.resource = exports.connector = void 0;
const json_pipe_1 = require("@space48/json-pipe");
const PathReporter_1 = require("io-ts/lib/PathReporter");
const ramda_1 = __importDefault(require("ramda"));
function connector(definition) {
    try {
        const resources = resourceMap(definition.resources, []);
        function scopeFactory(configArg) {
            const config = ScopeConfig.resolve(definition.configSchema, configArg);
            const _scope = definition.getScope(config);
            const executeCommands = commandExecutor(definition.resources, _scope);
            return {
                scopeName: definition.getScopeName(config.get()),
                connector,
                async getWarningMessage() {
                    var _a;
                    return await ((_a = definition.getWarningMessage) === null || _a === void 0 ? void 0 : _a.call(definition, _scope));
                },
                async *execute(commandOrCommands) {
                    if (isIterable(commandOrCommands)) {
                        yield* executeCommands(commandOrCommands);
                    }
                    else {
                        const pathContainsWildcard = Path.containsWildcard(commandOrCommands.path);
                        const outputElements = executeCommands([commandOrCommands]);
                        if (pathContainsWildcard) {
                            yield* json_pipe_1.pipe(outputElements, json_pipe_1.tap(({ success, error }) => {
                                if (!success) {
                                    if (error instanceof Error) {
                                        throw error;
                                    }
                                    throw Error(error);
                                }
                            }), json_pipe_1.map((outputElement) => ({
                                path: outputElement.command.path,
                                output: outputElement.output,
                            })));
                        }
                        else {
                            yield* json_pipe_1.pipe(outputElements, json_pipe_1.tap(({ success, error }) => {
                                if (!success) {
                                    if (error instanceof Error) {
                                        throw error;
                                    }
                                    throw Error(error);
                                }
                            }), json_pipe_1.map(({ output }) => output));
                        }
                    }
                },
            };
        }
        const connector = addPropertiesToFunction(scopeFactory, { ...resources, $definition: definition });
        return connector;
    }
    catch (e) {
        throw new InvalidConnectorDefinition(e);
    }
}
exports.connector = connector;
function resource(resource) {
    return resource;
}
exports.resource = resource;
function resourceMerger() {
    return (r1, r2) => {
        return ramda_1.default.mergeDeepRight(r1, r2);
    };
}
exports.resourceMerger = resourceMerger;
function resourceMap(resources, path) {
    return ramda_1.default.mapObjIndexed((resource, name) => _resource(resource, path, name), resources);
}
function _resource(resource, path, name) {
    var _a, _b, _c;
    return deepMerge(deepMerge(resourceMap((_a = resource.resources) !== null && _a !== void 0 ? _a : {}, [...path, name]), endpointMap((_b = resource.endpoints) !== null && _b !== void 0 ? _b : {}, [...path, name])), {
        $all: document((_c = resource.documents) !== null && _c !== void 0 ? _c : {}, [...path, [name, Path.WILDCARD]]),
        $doc: (id) => { var _a; return document((_a = resource.documents) !== null && _a !== void 0 ? _a : {}, [...path, [name, id]]); },
    });
}
function document(document, path) {
    var _a, _b;
    return deepMerge(resourceMap((_a = document.resources) !== null && _a !== void 0 ? _a : {}, path), endpointMap((_b = document.endpoints) !== null && _b !== void 0 ? _b : {}, path));
}
function endpointMap(endpoints, path) {
    return ramda_1.default.mapObjIndexed((_, name) => endpoint(path, name), endpoints);
}
function endpoint(path, endpoint) {
    return input => ({ path: [...path, endpoint], input });
}
function configValidator(configSchema) {
    return config => {
        const result = configSchema.decode(config);
        if ('left' in result) {
            throw new Error(PathReporter_1.PathReporter.report(result).join('\n'));
        }
    };
}
function deepMerge(x, y) {
    if (typeof x === 'function' && typeof y === 'function') {
        throw new Error('Cannot merge two functions.');
    }
    if (typeof x === 'function' && typeof y === 'object') {
        return addPropertiesToFunction(x, y);
    }
    if (typeof y === 'function' && typeof x === 'object') {
        return addPropertiesToFunction(y, x);
    }
    if (typeof x === 'object' && typeof y === 'object') {
        const keys = new Set(Object.keys(x).concat(Object.keys(y)));
        const entries = [...keys].map(key => ramda_1.default.pair(key, deepMergeProperty(key, x, y)));
        return ramda_1.default.fromPairs(entries);
    }
    throw new Error();
}
function deepMergeProperty(property, x, y) {
    if (property in x) {
        return property in y ? deepMerge(x, y) : x[property];
    }
    return y[property];
}
function addPropertiesToFunction(fn, properties) {
    const result = (...args) => fn(...args);
    Object.entries(properties).forEach(([key, value]) => result[key] = value);
    return result;
}
var Path;
(function (Path) {
    Path.WILDCARD = '*';
    function pop(path) {
        const head = path.slice(0, -1);
        const tail = path.slice(-1)[0];
        return [head, tail];
    }
    Path.pop = pop;
    function popResourceName(path) {
        const [head, tail] = pop(path);
        if (typeof tail !== 'string') {
            throw new InvalidPathError(path);
        }
        return [head, tail];
    }
    Path.popResourceName = popResourceName;
    function popEndpointName(path) {
        const [head, tail] = pop(path);
        if (head.length === 0 || typeof tail !== 'string') {
            throw new InvalidPathError(path);
        }
        return [head, tail];
    }
    Path.popEndpointName = popEndpointName;
    function computeAll(host, path = []) {
        var _a, _b, _c, _d, _e, _f;
        const endpointNames = 'endpoints' in host ? Object.keys((_a = host.endpoints) !== null && _a !== void 0 ? _a : {}) : [];
        const resources = 'resources' in host ? Object.entries((_b = host.resources) !== null && _b !== void 0 ? _b : {}) : [];
        let documentPaths;
        if ('documents' in host) {
            const supportsDocIdWildcard = ((_c = host.documents) === null || _c === void 0 ? void 0 : _c.listIds) ? true : false;
            const docIdField = (_e = (_d = host.documents) === null || _d === void 0 ? void 0 : _d.idField) !== null && _e !== void 0 ? _e : 'id';
            const docIdPattern = `${docIdField}${supportsDocIdWildcard ? `|${Path.WILDCARD}` : ''}`;
            const [prevPath, resourceName] = Path.popResourceName(path);
            const documentsPath = [...prevPath, [resourceName, docIdPattern]];
            documentPaths = Path.computeAll((_f = host.documents) !== null && _f !== void 0 ? _f : {}, documentsPath);
        }
        else {
            documentPaths = [];
        }
        return [
            ...endpointNames.map(endpointName => [...path, endpointName]),
            ...documentPaths,
            ...ramda_1.default.chain(([resourceName, resource]) => Path.computeAll(resource, [...path, resourceName]), resources),
        ];
    }
    Path.computeAll = computeAll;
    function containsWildcard(path) {
        return path.some(element => Array.isArray(element) && element[1] === Path.WILDCARD);
    }
    Path.containsWildcard = containsWildcard;
    class InvalidPathError extends Error {
        constructor(path, message = '') {
            super(`Invalid path ${JSON.stringify(path)}. ${message}`);
        }
    }
    Path.InvalidPathError = InvalidPathError;
    function selector(resources) {
        return path => {
            if (path.length === 0) {
                throw new InvalidPathError(path);
            }
            return path.reduce((host, element) => {
                var _a;
                const resourceName = typeof element === 'string' ? element : element[0];
                const resource = (_a = host.resources) === null || _a === void 0 ? void 0 : _a[resourceName];
                const _host = typeof element === 'string' ? resource : resource === null || resource === void 0 ? void 0 : resource.documents;
                if (!_host) {
                    throw new InvalidPathError(path);
                }
                return _host;
            }, { resources });
        };
    }
    Path.selector = selector;
    function endpointFnSelector(resources, scope) {
        const hostSelector = selector(resources);
        return (path) => {
            var _a;
            const [resourcePath, endpointName] = Path.popEndpointName(path);
            const endpointHost = hostSelector(resourcePath);
            if (!((_a = endpointHost.endpoints) === null || _a === void 0 ? void 0 : _a[endpointName])) {
                throw new InvalidPathError(path, `Endpoint '${endpointName}' does not exist on this resource.`);
            }
            const endpoint = endpointHost.endpoints[endpointName];
            return endpoint(scope);
        };
    }
    Path.endpointFnSelector = endpointFnSelector;
    function getDocIds(path) {
        return path
            .filter(element => Array.isArray(element))
            .map(([, docId]) => docId);
    }
    Path.getDocIds = getDocIds;
    function expander(resources, scope) {
        return async function* (path) {
            var _a, _b, _c;
            let _resources = resources;
            for (let i = 0; i < path.length - 1; i++) {
                const pathElement = path[i];
                if (typeof pathElement === 'string') {
                    if (!_resources[pathElement]) {
                        throw new InvalidPathError(path.slice(0, i + 1), `Resource '${pathElement}' does not exist.`);
                    }
                    _resources = (_a = _resources[pathElement].resources) !== null && _a !== void 0 ? _a : {};
                    continue;
                }
                const [resourceName, docId] = pathElement;
                if (!_resources[resourceName]) {
                    throw new InvalidPathError(path.slice(0, i + 1), `Resource '${resourceName}' does not exist.`);
                }
                const documents = (_b = _resources[resourceName].documents) !== null && _b !== void 0 ? _b : {};
                if (docId === Path.WILDCARD) {
                    if (!documents.listIds) {
                        throw new InvalidPathError(path.slice(0, i + 1), 'Wildcards are not supported for this resource.');
                    }
                    const listIdsPath = [...path.slice(0, i), resourceName];
                    const expandPath = expander(resources, scope);
                    yield* json_pipe_1.pipe(documents.listIds(scope)(listIdsPath), json_pipe_1.map(docId => ramda_1.default.update(i, [resourceName, docId], path)), json_pipe_1.flatMapAsync({ concurrency: 10 }, expandPath));
                    return;
                }
                _resources = (_c = documents.resources) !== null && _c !== void 0 ? _c : {};
            }
            yield path;
        };
    }
    Path.expander = expander;
    ;
})(Path = exports.Path || (exports.Path = {}));
function commandExecutor(resources, scope) {
    const selectEndpointFn = Path.endpointFnSelector(resources, scope);
    const expandPaths = Path.expander(resources, scope);
    return json_pipe_1.compose(ensureIterableIsAsync, json_pipe_1.flatMapAsync({ concurrency: 10 }, command => json_pipe_1.pipe(expandPaths(command.path), json_pipe_1.map(path => ({ ...command, path })))), json_pipe_1.flatMapAsync({ concurrency: 100 }, async function* (command) {
        const endpointFn = selectEndpointFn(command.path);
        try {
            const endpointReturnValue = endpointFn({
                input: command.input,
                path: command.path,
            });
            if (isAsyncIterable(endpointReturnValue)) {
                for await (const output of endpointReturnValue) {
                    yield {
                        command,
                        output,
                        success: true,
                    };
                }
            }
            else {
                yield {
                    command,
                    output: await endpointReturnValue,
                    success: true,
                };
            }
        }
        catch (e) {
            yield {
                command,
                success: false,
                error: e,
            };
        }
    }));
}
class ScopeConfig {
    constructor(schema, value, onChange) {
        this.value = value;
        this.onChange = onChange;
        this.validate = configValidator(schema);
        this.validate(value);
    }
    static resolve(configSchema, config) {
        return config instanceof ScopeConfig
            ? config
            : new ScopeConfig(configSchema, config);
    }
    get() {
        return this.value;
    }
    set(value) {
        var _a;
        this.validate(value);
        this.value = value;
        (_a = this.onChange) === null || _a === void 0 ? void 0 : _a.call(this, value);
    }
}
exports.ScopeConfig = ScopeConfig;
class InvalidConnectorDefinition extends Error {
}
exports.InvalidConnectorDefinition = InvalidConnectorDefinition;
class InvalidCommand extends Error {
}
exports.InvalidCommand = InvalidCommand;
function ensureIterableIsAsync(iterable) {
    if (isSyncIterable(iterable)) {
        return (async function* () {
            yield* iterable;
        })();
    }
    return iterable;
}
function isIterable(value) {
    return isSyncIterable(value) || isAsyncIterable(value);
}
function isSyncIterable(value) {
    return Symbol.iterator in value;
}
function isAsyncIterable(value) {
    return Symbol.asyncIterator in value;
}
class CommandError extends Error {
    constructor({ message, detail }) {
        super(message);
        this.detail = detail;
    }
}
exports.CommandError = CommandError;
