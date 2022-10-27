import { readdirSync, writeFileSync } from "fs";
import { dirname, basename } from "path";
import R from "ramda";
import Shopify from "shopify-api-node";

export type InferredResource = {
  key: keyof Shopify;
  endpoints: readonly string[];
  children: Record<string, InferredResource>;
};

type FlatResourceData = {
  key: keyof Shopify;
  name: string;
  parentName: string | null;
  endpoints: readonly string[];
};

export function refreshInferredResources() {
  const resources = inferResourcesFromShopifyModule();
  const output = `${__dirname}/inferred-resources.ts`;
  writeFileSync(output, `export default ${JSON.stringify(resources, null, 2)} as const;`);
}

function inferResourcesFromShopifyModule() {
  const pathToShopifyIndexDotJs = require.resolve("shopify-api-node");
  const pathToResources = `${dirname(pathToShopifyIndexDotJs)}/resources`;
  const inferredResourcesFlat = readdirSync(pathToResources)
    .filter(filename => filename.endsWith(".js") && filename !== "index.js")
    .map((filename): FlatResourceData => {
      //eslint-disable-next-line @typescript-eslint/no-var-requires
      const resourceConstructor = require(`${pathToResources}/${filename}`);
      const resource = new resourceConstructor(null);
      return {
        key: hyphenatedToCamelCase(basename(filename, ".js")) as keyof Shopify,
        name: resource.name,
        parentName: resource.parentName ?? null,
        endpoints: Object.keys(resourceConstructor.prototype).filter(prop => prop !== "buildUrl"),
      };
    });
  return buildTree(inferredResourcesFlat);
}

function buildTree(flatData: FlatResourceData[]): Record<string, InferredResource> {
  const resourcesByName = R.fromPairs(
    flatData.map((resource): [string, InferredResource] => [
      resource.name,
      {
        key: resource.key,
        endpoints: resource.endpoints,
        children: {},
      },
    ]),
  );

  flatData
    .filter(resource => resource.parentName)
    .forEach(resource => {
      resourcesByName[resource.parentName!].children[resource.key] = resourcesByName[resource.name];
    });

  const rootResources = flatData
    .filter(resource => !resource.parentName)
    .map(resource => resourcesByName[resource.name]);

  return R.fromPairs(rootResources.map(resource => [resource.key, resource]));
}

function hyphenatedToCamelCase(value: string): string {
  return value.replace(/-[a-z]/g, g => `${g[1].toUpperCase()}`);
}
