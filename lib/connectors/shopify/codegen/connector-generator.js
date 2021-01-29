"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeResourceDefinitions = void 0;
const resource_inference_1 = require("../resource-inference");
const framework_1 = require("../../../framework");
const ramda_1 = __importDefault(require("ramda"));
function computeResourceDefinitions(config) {
    return resourceDefinitions(resource_inference_1.inferredResources, config);
}
exports.computeResourceDefinitions = computeResourceDefinitions;
function resourceDefinitions(inferred, config) {
    return ramda_1.default.filter(Boolean, ramda_1.default.mapObjIndexed((inferredResource) => resourceDefinition(inferredResource, config === null || config === void 0 ? void 0 : config[inferredResource.key]), inferred));
}
function resourceDefinition(inferred, config) {
    if (config === false) {
        return {};
    }
    const endpoints = endpointDefinitions(inferred.key, inferred.endpoints, config === null || config === void 0 ? void 0 : config['endpoints'], 'resource');
    return {
        endpoints,
        documents: {
            ...documentDefinition(inferred, config),
            listIds: endpoints.list && (scope => path => {
                var _a, _b;
                return scope.listIds(inferred.key, 'list', framework_1.Path.getDocIds(path), (_b = (_a = config === null || config === void 0 ? void 0 : config['endpoints']) === null || _a === void 0 ? void 0 : _a.list) === null || _b === void 0 ? void 0 : _b.params);
            }),
        },
    };
}
function documentDefinition(inferred, config) {
    if (config === false) {
        return {};
    }
    return {
        endpoints: endpointDefinitions(inferred.key, inferred.endpoints, config === null || config === void 0 ? void 0 : config['endpoints'], 'document'),
        resources: resourceDefinitions(inferred.children, config === null || config === void 0 ? void 0 : config['resources']),
    };
}
function endpointDefinitions(resourceKey, keys, config, target) {
    try {
        return ramda_1.default.filter(Boolean, ramda_1.default.fromPairs(keys.map(endpointKey => [endpointKey, endpointDefinition(resourceKey, endpointKey, config === null || config === void 0 ? void 0 : config[endpointKey], target)])));
    }
    catch (e) {
        console.error({ resourceKey, keys, config, target });
        throw e;
    }
}
function endpointDefinition(resourceKey, endpointKey, config, target) {
    if (config === false) {
        return undefined;
    }
    const resolvedConfig = {
        ...standardEndpoints[endpointKey],
        ...config,
    };
    if (!resolvedConfig.type) {
        throw new Error(`Shopify: Could not resolve config for ${resourceKey}.${endpointKey}().`);
    }
    if (resolvedConfig.target !== target) {
        return undefined;
    }
    if (resolvedConfig.type === 'flatMap') {
        return scope => ({ path, input }) => scope.flatMap(resourceKey, endpointKey, framework_1.Path.getDocIds(path), { ...resolvedConfig.params, input });
    }
    return scope => ({ path, input }) => scope.map(resourceKey, endpointKey, framework_1.Path.getDocIds(path), { ...resolvedConfig.params, input });
}
const standardEndpoints = {
    count: {
        target: 'resource',
        type: 'map',
    },
    create: {
        target: 'resource',
        type: 'map',
    },
    delete: {
        target: 'document',
        type: 'map',
    },
    get: {
        target: 'document',
        type: 'map',
    },
    update: {
        target: 'document',
        type: 'map',
    },
    list: {
        target: 'resource',
        type: 'flatMap',
    },
};
