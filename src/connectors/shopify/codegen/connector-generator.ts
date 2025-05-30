import { InferredResource, inferredResources, InferredResources } from "../resource-inference";
import * as client from "../client";
import t from "ts-toolbelt";
import {
  DocumentDefinition,
  EndpointDefinition,
  EndpointDefinitionMap,
  Path,
  ResourceDefinition,
  ResourceDefinitionMap,
} from "../../../framework";
import R from "ramda";
import Shopify from "shopify-api-node";

/** Definition inference */

export function computeResourceDefinitions<C extends ShopifyConnectorConfig>(
  config: C,
): InferResourceDefnMap<InferredResources, C, "0"> {
  return resourceDefinitions(inferredResources, config) as any;
}

function resourceDefinitions(
  inferred: Record<string, InferredResource>,
  config: any,
): ResourceDefinitionMap<client.Scope> {
  return R.filter(
    Boolean,
    R.mapObjIndexed(
      inferredResource => resourceDefinition(inferredResource, config?.[inferredResource.key]),
      inferred,
    ),
  );
}

type InferResourceDefnMap<
  T extends Record<string, InferredResource>,
  Config,
  Depth extends string,
> = RemoveEmptyProps<{
  [K in keyof T]: InferResourceDefn<T[K], Prop<Config, K, undefined>, Depth>;
}>;

function resourceDefinition(
  inferred: InferredResource,
  config: any,
): ResourceDefinition<client.Scope> {
  if (config === false) {
    return {};
  }

  const endpoints = endpointDefinitions(
    inferred.key,
    inferred.endpoints,
    config?.["endpoints"],
    "resource",
  );

  return {
    endpoints,

    documents: {
      ...documentDefinition(inferred, config),

      listIds:
        endpoints.list &&
        (scope => path =>
          scope.listIds(
            inferred.key,
            "list",
            Path.getDocIds(path),
            config?.["endpoints"]?.list?.params,
          )),
    },
  };
}

type InferResourceDefn<
  Res extends InferredResource,
  Config,
  Depth extends string,
> = ResourceDefinition<
  client.Scope,
  InferEndpointDefnMap<Res, Prop<Config, "endpoints", undefined>, "resource", Depth>,
  Record<string, never>,
  InferDocumentDefn<Res, Config, t.Number.Plus<"1", Depth>>
>;

function documentDefinition(
  inferred: InferredResource,
  config: any,
): DocumentDefinition<client.Scope> {
  if (config === false) {
    return {};
  }

  return {
    endpoints: endpointDefinitions(
      inferred.key,
      inferred.endpoints,
      config?.["endpoints"],
      "document",
    ),

    resources: resourceDefinitions(inferred.children, config?.["resources"]),
  };
}

type InferDocumentDefn<
  Res extends InferredResource,
  Config,
  Depth extends string,
> = RemoveEmptyProps<{
  endpoints: InferEndpointDefnMap<Res, Prop<Config, "endpoints", undefined>, "document", Depth>;
  resources: InferResourceDefnMap<
    Res["children"],
    Prop<Config, "resources", Record<string, never>>,
    Depth
  >;
}>;

function endpointDefinitions(
  resourceKey: string,
  keys: readonly string[],
  config: EndpointsConfig,
  target: EndpointTarget,
): EndpointDefinitionMap {
  try {
    return R.filter(
      Boolean,
      R.fromPairs(
        keys.map(endpointKey => [
          endpointKey,
          endpointDefinition(resourceKey, endpointKey, config?.[endpointKey], target),
        ]),
      ),
    ) as EndpointDefinitionMap;
  } catch (e) {
    console.error({ resourceKey, keys, config, target });
    throw e;
  }
}

type InferEndpointDefnMap<
  Res extends InferredResource,
  Config,
  Target extends EndpointTarget,
  Depth extends string,
> = RemoveEmptyProps<{
  [K in Res["endpoints"][number]]: InferEndpointDefn<
    Res["key"],
    K,
    Prop<Config, K, undefined>,
    Target,
    t.N.Format<Depth, "n">
  >;
}>;

function endpointDefinition(
  resourceKey: string,
  endpointKey: string,
  config: EndpointConfig<any>,
  target: EndpointTarget,
): EndpointDefinition<client.Scope> | undefined {
  if (config === false) {
    return undefined;
  }
  const resolvedConfig: EndpointConfig<any> = {
    ...standardEndpoints[endpointKey as StandardEndpointKey],
    ...config,
  };
  if (!resolvedConfig.type) {
    throw new Error(`Shopify: Could not resolve config for ${resourceKey}.${endpointKey}().`);
  }
  if (resolvedConfig.target !== target) {
    return undefined;
  }
  if (resolvedConfig.type === "flatMap") {
    return scope =>
      ({ path, input }) =>
        scope.flatMap(resourceKey, endpointKey, Path.getDocIds(path), {
          ...resolvedConfig.params,
          ...input,
        });
  }
  return scope =>
    ({ path, input }) =>
      scope.map(resourceKey, endpointKey, Path.getDocIds(path), {
        ...resolvedConfig.params,
        ...input,
      });
}

type InferEndpointDefn<
  ResourceK extends keyof Shopify,
  EndpointK extends string,
  Config,
  Target extends EndpointTarget,
  Depth extends number,
> = ResolveEndpointTarget<EndpointK, Config> extends Target
  ? EndpointK extends keyof Shopify[ResourceK]
    ? Shopify[ResourceK][EndpointK] extends (...args: infer Args) => Promise<infer Ret>
      ? // here we assume that ReturnType extends Array means it's a flatMap endpoint. Ideally we should the configured endpoint type
        Ret extends (infer RetInner)[]
        ? EndpointDefinition<client.Scope, Args[Depth], RetInner>
        : EndpointDefinition<client.Scope, Args[Depth], Ret>
      : never
    : never
  : never;

type ResolveEndpointTarget<Key extends string, Config> = Config extends false
  ? never
  : Config extends FullEndpointConfig<infer Target>
  ? Target
  : StandardEndpointConfig<Key>["target"];

/** Configuration types */

export type ShopifyConnectorConfig = MakeValuesOptionalWhereAppropriate<
  ResourcesConfig<InferredResources>
>;

type ResourcesConfig<T extends Record<string, InferredResource>> =
  MakeValuesOptionalWhereAppropriate<{
    [K in keyof T]: ResourceConfig<T[K]>;
  }>;

type ResourceConfig<T extends InferredResource = InferredResource> =
  | MakeValuesOptionalWhereAppropriate<{
      endpoints: EndpointsConfig<T["endpoints"][number]>;
      resources: ResourcesConfig<T["children"]>;
    }>
  | false;

type EndpointsConfig<Key extends string = string> = MakeValuesOptionalWhereAppropriate<{
  [K in Key]: EndpointConfig<K>;
}>;

type EndpointConfig<Key extends string = string> = DecorateEndpointConfig<
  Key extends StandardEndpointKey ? "optional" : "required",
  FullEndpointConfig
>;

type FullEndpointConfig<
  Target extends EndpointTarget = EndpointTarget,
  Type extends EndpointType = EndpointType,
> = {
  target: Target;
  type: Type;
  params?: object;
};

type EndpointTarget = "document" | "resource";
type EndpointType = "map" | "flatMap";

type DecorateEndpointConfig<Optionality extends "required" | "optional", T extends object> =
  | (Optionality extends "optional" ? Partial<T> | undefined : T)
  | false;

type StandardEndpointKey = keyof typeof standardEndpoints;

type StandardEndpointConfig<Key extends string> = Key extends StandardEndpointKey
  ? typeof standardEndpoints[Key]
  : never;

const standardEndpoints = {
  count: {
    target: "resource",
    type: "map",
  },
  create: {
    target: "resource",
    type: "map",
  },
  delete: {
    target: "document",
    type: "map",
  },
  get: {
    target: "document",
    type: "map",
  },
  update: {
    target: "document",
    type: "map",
  },
  list: {
    target: "resource",
    type: "flatMap",
  },
} as const;

/** Utility types */

type MakeValuesOptionalWhereAppropriate<T extends object> = PermitUndefinedIfPermitsEmptyObject<
  MakePropsPermittingUndefinedOptional<T>
>;

type MakePropsPermittingUndefinedOptional<T> = MakePropsOptional<T, PropsPermittingUndefined<T>>;

type PermitUndefinedIfPermitsEmptyObject<T> = Record<string, never> extends T ? T | undefined : T;

type MakePropsOptional<T, OptionalProps extends keyof T> = t.Object.Merge<
  {
    [K in OptionalProps]?: T[K];
  },
  {
    [K in Exclude<keyof T, OptionalProps>]: T[K];
  }
>;

type PropsPermittingUndefined<T> = {
  [K in keyof T]: undefined extends T[K] ? K : never;
}[keyof T];

type Prop<T, K, Default> = K extends keyof T ? T[K] : Default;

type RemoveEmptyProps<O> = FilterProps<O, undefined | Record<string, never>>;

type FilterProps<O, Match> = {
  [K in FilterKeys<O, Match>]: O[K] extends never ? never : O[K];
};

type FilterKeys<O, Match> = { [K in keyof O]: O[K] extends Match ? never : K }[keyof O];
