"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableCommands = exports.executeCommand = exports.Cardinality = exports.EndpointScope = exports.ResourceConfig = void 0;
const json_pipe_1 = require("@space48/json-pipe");
const util_1 = require("./util");
var ResourceConfig;
(function (ResourceConfig) {
    function merge(config, ...updates) {
        return updates.reduce((result, update) => update ? merge2(result, update) : result, config);
    }
    ResourceConfig.merge = merge;
    function merge2(config, update) {
        var _a;
        const children = { ...config.children };
        Object.entries((_a = update.children) !== null && _a !== void 0 ? _a : {}).forEach(([childName, childUpdate]) => {
            if (!childUpdate) {
                delete children[childName];
            }
            else if (children[childName]) {
                children[childName] = merge(children[childName], childUpdate);
            }
            else {
                children[childName] = childUpdate;
            }
        });
        return {
            ...config,
            ...update,
            endpoints: {
                ...config.endpoints,
                ...update.endpoints,
            },
            children,
        };
    }
})(ResourceConfig = exports.ResourceConfig || (exports.ResourceConfig = {}));
var EndpointScope;
(function (EndpointScope) {
    EndpointScope[EndpointScope["Resource"] = 0] = "Resource";
    EndpointScope[EndpointScope["Document"] = 1] = "Document";
})(EndpointScope = exports.EndpointScope || (exports.EndpointScope = {}));
;
var Cardinality;
(function (Cardinality) {
    Cardinality[Cardinality["One"] = 0] = "One";
    Cardinality[Cardinality["Many"] = 1] = "Many";
})(Cardinality = exports.Cardinality || (exports.Cardinality = {}));
;
function executeCommand(resources, command, input) {
    const commandPath = ResourcePath.of(command.path);
    const { resource, payloadTransform } = resolveResourceAndPayloads(resources, commandPath);
    const endpointKey = Object.keys(resource.endpoints || {}).find(matching(command.name));
    if (!(endpointKey && nonFalsy(resource.endpoints)[endpointKey])) {
        throw new Error(`No such command '${command.name}'.`);
    }
    const endpoint = nonFalsy(resource.endpoints[endpointKey]);
    const processor = commandPath.includesWildcard()
        ? (async function* (payload) {
            const result = endpoint.fn(payload);
            if (typeof result === 'object' && result.then) {
                yield addPathToOutput(payload.path, await result);
            }
            else {
                yield addPathToOutput(payload.path, await collectArray(result));
            }
        }) : (async function* (payload) {
        const result = endpoint.fn(payload);
        if (typeof result === 'object' && result.then) {
            yield await result;
        }
        else {
            yield* result;
        }
    });
    const generateOutput = json_pipe_1.compose(async function* (data) { yield { path: [], docKeys: [], data }; }, payloadTransform, json_pipe_1.flatMapAsync({ concurrency: 50 }, processor));
    if (input) {
        const isSingleton = endpoint.cardinality === Cardinality.One && !commandPath.includesWildcard();
        const inputHandler = isSingleton ? json_pipe_1.compose(generateOutput, json_pipe_1.first()) : json_pipe_1.compose(generateOutput, collectArray);
        return json_pipe_1.mapAsync({ concurrency: 50 }, async (_input) => {
            const startTime = new Date();
            try {
                return {
                    timestamp: startTime.toISOString(),
                    input: _input,
                    duration: Date.now() - startTime.getTime(),
                    success: true,
                    output: await inputHandler(_input),
                };
            }
            catch (error) {
                return {
                    timestamp: startTime.toISOString(),
                    input: _input,
                    duration: Date.now() - startTime.getTime(),
                    success: false,
                    error: error.detail || error.message,
                };
            }
        })(input);
    }
    else {
        return generateOutput(null);
    }
}
exports.executeCommand = executeCommand;
function resolveResourceAndPayloads(resources, path) {
    const payloadTransforms = [];
    let resource;
    for (let resourcePath = path, _resources = resources; resourcePath !== undefined; resourcePath = resourcePath.child(resource.docKey !== null), _resources = resource.children || {}) {
        const resourceKey = Object.keys(_resources).find(matching(resourcePath.name()));
        if (!(resourceKey && _resources[resourceKey])) {
            throw new Error(`The resource '${resourcePath.name()}' does not exist.`);
        }
        const resourcePathSegment = ResourcePath.formatStaticSegment(resourceKey);
        payloadTransforms.push(json_pipe_1.map(({ path, ...rest }) => ({ path: [...path, resourcePathSegment], ...rest })));
        resource = nonFalsy(_resources[resourceKey]);
        if (resource.docKey === null) {
            continue;
        }
        const documentKeySegment = resourcePath.key();
        if (!documentKeySegment) {
            break;
        }
        switch (documentKeySegment.type) {
            case 'constant': {
                const docKey = documentKeySegment.value;
                payloadTransforms.push(json_pipe_1.map(({ docKeys, ...rest }) => ({ docKeys: [...docKeys, docKey], ...rest })));
                break;
            }
            case 'wildcard': {
                if (!(resource.docKey && resource.listDocKeys)) {
                    throw new Error();
                }
                const { listDocKeys } = resource;
                payloadTransforms.push(json_pipe_1.flatMapAsync({ concurrency: 50 }, ({ docKeys, ...rest }) => (json_pipe_1.compose(listDocKeys, json_pipe_1.map(docKey => ({ docKeys: [...docKeys, docKey], ...rest })))(docKeys))));
                break;
            }
            case 'parameter': {
                const paramName = documentKeySegment.name;
                payloadTransforms.push(json_pipe_1.map(({ docKeys, data, ...rest }) => ({ docKeys: [...docKeys, data[paramName]], data, ...rest })));
                break;
            }
        }
        payloadTransforms.push(json_pipe_1.map(({ path, docKeys, ...rest }) => ({
            path: [...path, docKeys[docKeys.length - 1]],
            docKeys,
            ...rest
        })));
    }
    return {
        resource: resource,
        payloadTransform: json_pipe_1.compose(...payloadTransforms),
    };
}
class ResourcePath {
    constructor(value) {
        this.value = value;
    }
    static of(value) {
        if (value.trim().length === 0) {
            throw new Error();
        }
        return new ResourcePath(value.trim());
    }
    static ofSegments(segments) {
        return ResourcePath.of(segments.join(ResourcePath.separator));
    }
    key() {
        const segments = this.segments();
        if (segments.length < 2) {
            return undefined;
        }
        const segment = segments[1];
        if (segment === ResourcePath.wildcard) {
            return { type: 'wildcard' };
        }
        const parameterMatch = segment.match(/^{([^}]+)}$/);
        if (parameterMatch) {
            return { type: 'parameter', name: parameterMatch[1] };
        }
        return { type: 'constant', value: segment };
    }
    name() {
        return this.value.split(ResourcePath.separator)[0];
    }
    child(hasKey) {
        const childPath = this.segments().slice(hasKey ? 2 : 1).join(ResourcePath.separator);
        return childPath.length ? ResourcePath.of(childPath) : undefined;
    }
    segments() {
        return this.value.split(ResourcePath.separator);
    }
    includesWildcard() {
        return this.segments().includes(ResourcePath.wildcard);
    }
    static formatStaticSegment(name) {
        return util_1.hyphenate(name);
    }
    static formatParameterName(name) {
        return util_1.underscore(name);
    }
}
ResourcePath.wildcard = '*';
ResourcePath.separator = '/';
function matching(searchTerm) {
    const normalizedSearchTerm = util_1.camelCase(searchTerm);
    return candidate => util_1.camelCase(candidate) === normalizedSearchTerm;
}
function nonFalsy(value) {
    if (!value) {
        throw new Error();
    }
    return value;
}
async function collectArray(input) {
    const result = [];
    for await (const el of input) {
        result.push(el);
    }
    return result;
}
const addPathToOutput = (path, output) => ({ path: path.join(ResourcePath.separator), output });
function getAvailableCommands(resources) {
    return Object.entries(resources)
        .map(([name, config]) => config ? getResourceCommands([ResourcePath.formatStaticSegment(name)], config) : [])
        .reduce(util_1.flatten, []);
}
exports.getAvailableCommands = getAvailableCommands;
function getResourceCommands(resourcePath, resource) {
    const keyParam = resource.docKey && ResourcePath.formatParameterName(resource.docKey.name);
    const keyPart = resource.docKey ? (resource.listDocKeys ? `{${keyParam}|${ResourcePath.wildcard}}` : `{${keyParam}}`) : null;
    const childPath = keyPart ? [...resourcePath, keyPart] : resourcePath;
    return [
        ...Object.entries(resource.endpoints || {})
            .filter(([, config]) => config)
            .map(([name, config]) => ({
            name,
            path: resourcePath.join('/') + (config && config.scope === EndpointScope.Document ? `/${keyPart}` : ''),
        })),
        ...Object.entries(resource.children || {})
            .map(([name, config]) => config ? getResourceCommands([...childPath, ResourcePath.formatStaticSegment(name)], config) : [])
            .reduce(util_1.flatten, []),
    ];
}
