import { InferredResource, inferredResources, InferredResources } from '../resource-inference';
import * as client from "../client";
import t from "ts-toolbelt";
import { DocumentDefinition, EndpointDefinition, EndpointDefinitionMap, Path, ResourceDefinition, ResourceDefinitionMap } from '../../../framework';
import R from "ramda";
import Shopify from 'shopify-api-node';

/** Definition inference */

export function computeResourceDefinitions<C extends ShopifyConnectorConfig>(
  config: C
): InferResourceDefnMap<InferredResources, C> {
  return resourceDefinitions(inferredResources, config) as any;
}

function resourceDefinitions(
  inferred: Record<string, InferredResource>,
  config: any
): ResourceDefinitionMap<client.Scope> {
  return R.filter(Boolean, R.mapObjIndexed(
    (inferredResource) => resourceDefinition(inferredResource, config?.[inferredResource.key]),
    inferred
  ));
}

type InferResourceDefnMap<T extends Record<string, InferredResource>, Config> =
  RemoveEmptyProps<{ [K in keyof T]: InferResourceDefn<T[K], Prop<Config, K, undefined>> }>;

function resourceDefinition(inferred: InferredResource, config: any): ResourceDefinition<client.Scope> {
  if (config === false) {
    return {};
  }

  const endpoints = endpointDefinitions(
    inferred.key,
    inferred.endpoints,
    config?.['endpoints'],
    'resource'
  );

  return {
    endpoints,

    documents: {
      ...documentDefinition(inferred, config),

      listIds: endpoints.list && (scope => path => scope.listIds(
        inferred.key,
        'list',
        Path.getDocIds(path),
        config?.['endpoints']?.list?.params,
      )),
    },
  };
}

type InferResourceDefn<T extends InferredResource, Config> =
  ResourceDefinition<
    client.Scope,
    InferEndpointDefnMap<T['key'], T['endpoints'][number], Prop<Config, 'endpoints', undefined>, 'resource'>,
    {},
    InferDocumentDefn<T, Config>
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
      config?.['endpoints'],
      'document'
    ),

    resources: resourceDefinitions(
      inferred.children,
      config?.['resources'],
    ),
  };
}

type InferDocumentDefn<T extends InferredResource, Config> =
  RemoveEmptyProps<{
    endpoints: InferEndpointDefnMap<T['key'], T['endpoints'][number], Prop<Config, 'endpoints', undefined>, 'document'>
    resources: InferResourceDefnMap<T['children'], Prop<Config, 'resources', {}>>
  }>;

function endpointDefinitions(
  resourceKey: string,
  keys: readonly string[],
  config: EndpointsConfig,
  target: EndpointTarget,
): EndpointDefinitionMap {
  try {
    return R.filter(Boolean, R.fromPairs(
      keys.map(endpointKey => [endpointKey, endpointDefinition(
        resourceKey,
        endpointKey,
        config?.[endpointKey],
        target
      )])
    )) as EndpointDefinitionMap;
  } catch (e) {
    console.error({resourceKey, keys, config, target})
    throw e;
  }
}

type InferEndpointDefnMap<
  ResourceK extends keyof Shopify,
  EndpointK extends string,
  Config,
  Target extends EndpointTarget
> = RemoveEmptyProps<{ [K in EndpointK]: InferEndpointDefn<ResourceK, K, Prop<Config, K, undefined>, Target> }>;

function endpointDefinition(
  resourceKey: string,
  endpointKey: string,
  config: EndpointConfig<any>,
  target: EndpointTarget
): EndpointDefinition<client.Scope>|undefined {
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
  if (resolvedConfig.type === 'flatMap') {
    return scope => ({path, input}) => scope.flatMap(
      resourceKey,
      endpointKey,
      Path.getDocIds(path),
      {...resolvedConfig.params, input},
    );
  }
  return scope => ({path, input}) => scope.map(
    resourceKey,
    endpointKey,
    Path.getDocIds(path),
    {...resolvedConfig.params, input},
  );
}

type InferEndpointDefn<ResourceK extends keyof Shopify, EndpointK extends string, Config, Target extends EndpointTarget> = 
  ResolveEndpointTarget<EndpointK, Config> extends Target
    ? EndpointK extends keyof Shopify[ResourceK]
      ? Shopify[ResourceK][EndpointK] extends (...args: infer Args) => Promise<infer Ret>
        // here we assume that ReturnType extends Array means it's a flatMap endpoint. Ideally we should the configured endpoint type
        ? Ret extends (infer RetInner)[]
          ? EndpointDefinition<client.Scope, t.Tuple.Last<Args>, RetInner>
          : EndpointDefinition<client.Scope, t.Tuple.Last<Args>, Ret>
        : never
      : never
    : never;

type ResolveEndpointTarget<Key extends string, Config> =
  Config extends false ? never
  : Config extends FullEndpointConfig<infer Target> ? Target
  : StandardEndpointConfig<Key>['target'];

/** Configuration types */

export type ShopifyConnectorConfig = MakeValuesOptionalWhereAppropriate<ResourcesConfig<InferredResources>>;

type ResourcesConfig<T extends Record<string, InferredResource>> =
  MakeValuesOptionalWhereAppropriate<{
    [K in keyof T]: ResourceConfig<T[K]>
  }>
;

type ResourceConfig<T extends InferredResource = InferredResource> =
  MakeValuesOptionalWhereAppropriate<{
    endpoints: EndpointsConfig<T['endpoints'][number]>
    resources: ResourcesConfig<T['children']>
  }> | false
;

type EndpointsConfig<Key extends string = string> =
  MakeValuesOptionalWhereAppropriate<{
    [K in Key]: EndpointConfig<K>
  }>
;

type EndpointConfig<Key extends string = string> =
  DecorateEndpointConfig<
    Key extends StandardEndpointKey ? 'optional' : 'required',
    FullEndpointConfig
  >;

type FullEndpointConfig<
  Target extends EndpointTarget = EndpointTarget,
  Type extends EndpointType = EndpointType,
> = {
  target: Target
  type: Type
  params?: object
};

type EndpointTarget = 'document' | 'resource';
type EndpointType = 'map' | 'flatMap';

type DecorateEndpointConfig<
  Optionality extends 'required'|'optional',
  T extends object
> = (Optionality extends 'optional' ? Partial<T> | undefined : T) | false;

type StandardEndpointKey = keyof typeof standardEndpoints;

type StandardEndpointConfig<Key extends string> =
  Key extends StandardEndpointKey ? (typeof standardEndpoints)[Key] : never;

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
} as const;

/** Utility types */

type MakeValuesOptionalWhereAppropriate<T extends object> = 
  PermitUndefinedIfPermitsEmptyObject<
    MakePropsPermittingUndefinedOptional<T>
  >
;

type MakePropsPermittingUndefinedOptional<T> = MakePropsOptional<T, PropsPermittingUndefined<T>>;

type PermitUndefinedIfPermitsEmptyObject<T> = {} extends T ? T|undefined : T;

type MakePropsOptional<T, OptionalProps extends keyof T> = t.Object.Merge<{
  [K in OptionalProps]?: T[K]
}, {
  [K in Exclude<keyof T, OptionalProps>]: T[K]
}>;

type PropsPermittingUndefined<T> = {
  [K in keyof T]: undefined extends T[K] ? K : never
}[keyof T];

type Prop<T, K, Default> = K extends keyof T ? T[K] : Default;

type RemoveEmptyProps<O> = FilterProps<O, undefined|Record<string,never>>;

type FilterProps<O, Match> = {
  [K in FilterKeys<O, Match>]: O[K] extends never ? never : O[K]
};

type FilterKeys<O, Match> = {[K in keyof O]: O[K] extends Match ? never : K}[keyof O];
