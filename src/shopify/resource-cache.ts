import { readdirSync, writeFileSync } from "fs";
import { dirname, basename } from "path";
import { objectFromEntries } from "../util";

export default function cacheResources() {
    const resources = loadResourcesFromShopifyModule();
    const output = `${__dirname}/resources.json`;
    writeFileSync(output, JSON.stringify(resources, null, 2));
}

function loadResourcesFromShopifyModule() {
    const pathToShopifyIndexDotJs = require.resolve('shopify-api-node');
    const pathToResources = `${dirname(pathToShopifyIndexDotJs)}/resources`;
    const resources = readdirSync(pathToResources)
        .filter(filename => filename.endsWith('.js') && filename !== 'index.js')
        .map(filename => {
            const resourceConstructor = require(`${pathToResources}/${filename}`);
            const resource = new resourceConstructor(null);
            return {
                key: hyphenatedToCamelCase(basename(filename, '.js')),
                name: resource.name,
                parentName: resource.parentName ?? null,
                endpoints: Object.keys(resourceConstructor.prototype).filter(prop => prop !== 'buildUrl'),
            }
        });
    return objectFromEntries(resources.map(resource => [resource.key, resource]));
}

function hyphenatedToCamelCase(value: string): string {
    return value.replace(/-[a-z]/g, g => `${g[1].toUpperCase()}`);
}
