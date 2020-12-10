import _resources from "./resources.json";

export type Resource = {
  key: ResourceKey,
  name: string,
  parentName: string | null,
  endpoints: string[],
};

export type ResourceKey = keyof typeof _resources;

export const resources = _resources as Record<ResourceKey, Resource>;

export function getParentKeyPath(resourceKey: ResourceKey): ResourceKey[] {
  const path: ResourceKey[] = [];
  let resource = resources[resourceKey];
  while (resource.parentName) {
    resource = getResourceByName(resource.parentName);
    path.unshift(resource.key);
  }
  return path;
}

let resourcesByName: Map<string, Resource>|undefined = undefined;
function getResourceByName(name: string): Resource {
  if (!resourcesByName) {
    resourcesByName = new Map();
    Object.values(resources).forEach(resource => resourcesByName!.set(resource.name, resource));
  }
  return resourcesByName.get(name)!;
}
