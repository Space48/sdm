import { flatMapAsync, pipe, compose, map, tap, groupWhile, } from "@space48/json-pipe";
import { PathReporter } from "io-ts/lib/PathReporter";
import R from "ramda";
export function connector(definition) {
    try {
        const resources = resourceMap(definition.resources, []);
        //eslint-disable-next-line no-inner-declarations
        function scopeFactory(configArg) {
            const config = configArg instanceof MutableReference
                ? configArg
                : MutableReference.of(configArg, definition.configSchema);
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
                        yield* pipe(executeCommands(commandOrCommands), State.map(result => ({
                            ...result,
                            error: result.error instanceof EndpointError
                                ? result.error.normalize()
                                : result.error instanceof Error
                                    ? result.error.message
                                    : result.error,
                        })));
                    }
                    else {
                        const pathContainsWildcard = Path.containsWildcard(commandOrCommands.path);
                        const outputElements = executeCommands([commandOrCommands]);
                        if (pathContainsWildcard) {
                            yield* pipe(outputElements, State.tap(({ success, error }) => {
                                if (!success) {
                                    if (error instanceof Error) {
                                        throw error;
                                    }
                                    throw Error(error);
                                }
                            }), State.map((outputElement) => ({
                                path: outputElement.path,
                                output: outputElement.output,
                            })));
                        }
                        else {
                            yield* pipe(outputElements, State.tap(({ success, error }) => {
                                if (!success) {
                                    if (error instanceof Error) {
                                        throw error;
                                    }
                                    throw Error(error);
                                }
                            }), State.map(({ output }) => output));
                        }
                    }
                },
            };
        }
        const connector = addPropertiesToFunction(scopeFactory, {
            ...resources,
            $definition: definition,
        });
        return connector;
    }
    catch (e) {
        throw new InvalidConnectorDefinition(e);
    }
}
/**
 * this function can help with type inference in connectors -- don't use unless necessary for type inference
 */
export function resource(resource) {
    return resource;
}
export function resourceMerger() {
    return (r1, r2) => {
        return R.mergeDeepRight(r1, r2);
    };
}
function resourceMap(resources, path) {
    return R.mapObjIndexed((resource, name) => _resource(resource, path, name), resources);
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
    return R.mapObjIndexed((_, name) => endpoint(path, name), endpoints);
}
function endpoint(path, endpoint) {
    return input => ({ path, endpoint, input: input });
}
function createValidator(schema) {
    return value => {
        const result = schema.decode(value);
        if ("left" in result) {
            throw new Error(PathReporter.report(result).join("\n"));
        }
    };
}
/**
 * A deep merge which will merge functions with objects where necessary
 */
function deepMerge(x, y) {
    if (typeof x === "function" && typeof y === "function") {
        throw new Error("Cannot merge two functions.");
    }
    if (typeof x === "function" && typeof y === "object") {
        return addPropertiesToFunction(x, y);
    }
    if (typeof y === "function" && typeof x === "object") {
        return addPropertiesToFunction(y, x);
    }
    if (typeof x === "object" && typeof y === "object") {
        const keys = new Set(Object.keys(x).concat(Object.keys(y)));
        const entries = [...keys].map(key => R.pair(key, deepMergeProperty(key, x, y)));
        return R.fromPairs(entries);
    }
    throw new Error();
}
function deepMergeProperty(property, x, y) {
    if (property in x) {
        return property in y ? deepMerge(x, y) : x[property];
    }
    return y[property];
}
//eslint-disable-next-line @typescript-eslint/ban-types
function addPropertiesToFunction(fn, properties) {
    const result = (...args) => fn(...args);
    Object.entries(properties).forEach(([key, value]) => (result[key] = value));
    return result;
}
//eslint-disable-next-line @typescript-eslint/no-namespace
export var Path;
(function (Path) {
    Path.WILDCARD = "*";
    function pop(path) {
        const head = path.slice(0, -1);
        const tail = path.slice(-1)[0];
        return [head, tail];
    }
    Path.pop = pop;
    //eslint-disable-next-line no-inner-declarations
    function popResourceName(path) {
        const [head, tail] = pop(path);
        if (typeof tail !== "string") {
            throw new InvalidPathError(path);
        }
        return [head, tail];
    }
    function computeAllHeaders(host, path = []) {
        var _a, _b, _c, _d, _e, _f;
        const endpointNames = "endpoints" in host ? Object.keys((_a = host.endpoints) !== null && _a !== void 0 ? _a : {}) : [];
        const headers = endpointNames.map(endpoint => ({ path, endpoint }));
        const resources = "resources" in host ? Object.entries((_b = host.resources) !== null && _b !== void 0 ? _b : {}) : [];
        let documentPaths;
        if ("documents" in host) {
            const supportsDocIdWildcard = ((_c = host.documents) === null || _c === void 0 ? void 0 : _c.listIds) ? true : false;
            const docIdField = (_e = (_d = host.documents) === null || _d === void 0 ? void 0 : _d.idField) !== null && _e !== void 0 ? _e : "id";
            const docIdPattern = `${docIdField}${supportsDocIdWildcard ? `|${Path.WILDCARD}` : ""}`;
            const [prevPath, resourceName] = popResourceName(path);
            const documentsPath = [...prevPath, [resourceName, docIdPattern]];
            documentPaths = Path.computeAllHeaders((_f = host.documents) !== null && _f !== void 0 ? _f : {}, documentsPath);
        }
        else {
            documentPaths = [];
        }
        return [
            ...headers,
            ...documentPaths,
            ...R.chain(([resourceName, resource]) => Path.computeAllHeaders(resource, [...path, resourceName]), resources),
        ];
    }
    Path.computeAllHeaders = computeAllHeaders;
    function containsWildcard(path) {
        return path.some(element => Array.isArray(element) && element[1] === Path.WILDCARD);
    }
    Path.containsWildcard = containsWildcard;
    class InvalidPathError extends Error {
        constructor(path, message = "") {
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
                const resourceName = typeof element === "string" ? element : element[0];
                const resource = (_a = host.resources) === null || _a === void 0 ? void 0 : _a[resourceName];
                const _host = typeof element === "string" ? resource : resource === null || resource === void 0 ? void 0 : resource.documents;
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
        return (resourcePath, endpointName) => {
            var _a;
            const endpointHost = hostSelector(resourcePath);
            if (!((_a = endpointHost.endpoints) === null || _a === void 0 ? void 0 : _a[endpointName])) {
                throw new InvalidPathError(resourcePath, `Endpoint '${endpointName}' does not exist on this resource.`);
            }
            const endpoint = endpointHost.endpoints[endpointName];
            return endpoint(scope);
        };
    }
    Path.endpointFnSelector = endpointFnSelector;
    function endpointNamesSelector(resources) {
        const hostSelector = selector(resources);
        return path => { var _a; return Object.keys((_a = hostSelector(path).endpoints) !== null && _a !== void 0 ? _a : {}); };
    }
    Path.endpointNamesSelector = endpointNamesSelector;
    function getDocIds(path) {
        return path.filter(element => Array.isArray(element)).map(([, docId]) => docId);
    }
    Path.getDocIds = getDocIds;
    /**
     * Expand a path so that a path containing document ID wildcards is mapped to n paths containing document IDs only
     */
    function expander(resources, scope) {
        return async function* (path) {
            var _a, _b, _c;
            let _resources = resources;
            for (let i = 0; i < path.length; i++) {
                const pathElement = path[i];
                if (typeof pathElement === "string") {
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
                        throw new InvalidPathError(path.slice(0, i + 1), "Wildcards are not supported for this resource.");
                    }
                    const listIdsPath = [...path.slice(0, i), resourceName];
                    const expandPath = expander(resources, scope);
                    yield* pipe(documents.listIds(scope)(listIdsPath), map(docId => R.update(i, [resourceName, docId], path)), flatMapAsync({ concurrency: 10 }, expandPath));
                    return;
                }
                _resources = (_c = documents.resources) !== null && _c !== void 0 ? _c : {};
            }
            yield path;
        };
    }
    Path.expander = expander;
})(Path || (Path = {}));
function commandExecutor(resources, scope) {
    const selectEndpointFn = Path.endpointFnSelector(resources, scope);
    const expandPaths = Path.expander(resources, scope);
    return compose(ensureIterableIsAsync, State.flatMapAsync({ concurrency: 10 }, command => pipe(expandPaths(command.path), map(path => ({ ...command, path })))), State.flatMapAsync({ concurrency: 100 }, async function* (command) {
        const endpointFn = selectEndpointFn(command.path, command.endpoint);
        try {
            const endpointReturnValue = endpointFn({
                input: command.input,
                path: command.path,
                docId: Path.getDocIds(command.path),
            });
            if (isAsyncIterable(endpointReturnValue)) {
                for await (const output of endpointReturnValue) {
                    yield {
                        input: command.input,
                        path: command.path,
                        endpoint: command.endpoint,
                        output,
                        success: true,
                    };
                }
            }
            else {
                yield {
                    input: command.input,
                    path: command.path,
                    endpoint: command.endpoint,
                    output: await endpointReturnValue,
                    success: true,
                };
            }
        }
        catch (e) {
            yield {
                input: command.input,
                path: command.path,
                endpoint: command.endpoint,
                success: false,
                error: e,
            };
        }
    }));
}
export class Reference {
    constructor(get) {
        this.get = get;
    }
    static combine(refs) {
        const unstablRef = new Reference(() => R.mapObjIndexed(ref => ref.get(), refs));
        // map will do equality checking; i.e. if the new computed value is equal to the previous one, we return the previous one
        const stableRef = unstablRef.map(v => v);
        return stableRef;
    }
    map(mapper) {
        let previousInput = this.get();
        let output = mapper(previousInput);
        return new Reference(() => {
            const currentInput = this.get();
            if (!R.equals(previousInput, currentInput)) {
                output = mapper(currentInput);
                previousInput = currentInput;
            }
            return output;
        });
    }
}
export class MutableReference extends Reference {
    constructor(get, set) {
        super(get);
        this.get = get;
        this.set = set;
    }
    static of(initialValue, schema) {
        let current = initialValue;
        const ref = new MutableReference(() => current, value => {
            current = value;
        });
        return schema ? ref.withSchema(schema) : ref;
    }
    withSchema(schema) {
        const validate = createValidator(schema);
        validate(this.get());
        return new MutableReference(() => this.get(), value => {
            if (R.equals(this.get(), value)) {
                return;
            }
            validate(value);
            this.set(value);
        });
    }
}
export class InvalidConnectorDefinition extends Error {
}
export class InvalidCommand extends Error {
}
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
export class EndpointError extends Error {
    constructor(message, options) {
        super(message);
        this.detail = options === null || options === void 0 ? void 0 : options.detail;
    }
    normalize() {
        return {
            message: this.message,
            detail: this.detail || undefined,
        };
    }
}
/**
 * Pipeline functions which pass State directly through, unmodified, but *in order*
 *
 * I.e. when input is [Input<A> State<B> Input<C>], output is [Output<A> State<B> Output<C>]
 */
export class State {
    constructor() {
        return;
    }
    static of(value) {
        return { state: value };
    }
    static isState(value) {
        return "state" in value;
    }
    static map(mapper) {
        return map(element => (State.isState(element) ? element : mapper(element)));
    }
    static tap(fn) {
        return tap(element => {
            if (!State.isState(element)) {
                fn(element);
            }
        });
    }
    static flatMapAsync(options, mapper) {
        return flatMapAsync(options, async function* (element) {
            if (State.isState(element)) {
                yield element;
            }
            else {
                yield* mapper(element);
            }
        });
    }
    static collectOutputs(outputs) {
        if (!outputs) {
            return State.collectOutputs;
        }
        return pipe(outputs, groupWhile(element => !State.isState(element)), map(([stateElement, ...elements]) => {
            if (!State.isState(stateElement)) {
                throw new Error("Stream must start with a `State` element in order to use `groupByState()`");
            }
            return [stateElement.state, ...elements];
        }));
    }
}
