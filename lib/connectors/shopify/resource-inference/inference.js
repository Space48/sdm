"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshInferredResources = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const ramda_1 = __importDefault(require("ramda"));
function refreshInferredResources() {
    const resources = inferResourcesFromShopifyModule();
    const output = `${__dirname}/inferred-resources.ts`;
    fs_1.writeFileSync(output, `export default ${JSON.stringify(resources, null, 2)} as const;`);
}
exports.refreshInferredResources = refreshInferredResources;
function inferResourcesFromShopifyModule() {
    const pathToShopifyIndexDotJs = require.resolve("shopify-api-node");
    const pathToResources = `${path_1.dirname(pathToShopifyIndexDotJs)}/resources`;
    const inferredResourcesFlat = fs_1.readdirSync(pathToResources)
        .filter(filename => filename.endsWith(".js") && filename !== "index.js")
        .map((filename) => {
        var _a;
        //eslint-disable-next-line @typescript-eslint/no-var-requires
        const resourceConstructor = require(`${pathToResources}/${filename}`);
        const resource = new resourceConstructor(null);
        return {
            key: hyphenatedToCamelCase(path_1.basename(filename, ".js")),
            name: resource.name,
            parentName: (_a = resource.parentName) !== null && _a !== void 0 ? _a : null,
            endpoints: Object.keys(resourceConstructor.prototype).filter(prop => prop !== "buildUrl"),
        };
    });
    return buildTree(inferredResourcesFlat);
}
function buildTree(flatData) {
    const resourcesByName = ramda_1.default.fromPairs(flatData.map((resource) => [
        resource.name,
        {
            key: resource.key,
            endpoints: resource.endpoints,
            children: {},
        },
    ]));
    flatData
        .filter(resource => resource.parentName)
        .forEach(resource => {
        resourcesByName[resource.parentName].children[resource.key] = resourcesByName[resource.name];
    });
    const rootResources = flatData
        .filter(resource => !resource.parentName)
        .map(resource => resourcesByName[resource.name]);
    return ramda_1.default.fromPairs(rootResources.map(resource => [resource.key, resource]));
}
function hyphenatedToCamelCase(value) {
    return value.replace(/-[a-z]/g, g => `${g[1].toUpperCase()}`);
}
