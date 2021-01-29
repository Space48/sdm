import { InferredResource, InferredResources } from '../resource-inference';
import * as client from "../client";
import t from "ts-toolbelt";
import { EndpointDefinition, ResourceDefinition } from '../../../framework';
import Shopify from 'shopify-api-node';
export declare function computeResourceDefinitions<C extends ShopifyConnectorConfig>(config: C): InferResourceDefnMap<InferredResources, C>;
declare type InferResourceDefnMap<T extends Record<string, InferredResource>, Config> = RemoveEmptyProps<{
    [K in keyof T]: InferResourceDefn<T[K], Prop<Config, K, undefined>>;
}>;
declare type InferResourceDefn<T extends InferredResource, Config> = ResourceDefinition<client.Scope, InferEndpointDefnMap<T['key'], T['endpoints'][number], Prop<Config, 'endpoints', undefined>, 'resource'>, {}, InferDocumentDefn<T, Config>>;
declare type InferDocumentDefn<T extends InferredResource, Config> = RemoveEmptyProps<{
    endpoints: InferEndpointDefnMap<T['key'], T['endpoints'][number], Prop<Config, 'endpoints', undefined>, 'document'>;
    resources: InferResourceDefnMap<T['children'], Prop<Config, 'resources', {}>>;
}>;
declare type InferEndpointDefnMap<ResourceK extends keyof Shopify, EndpointK extends string, Config, Target extends EndpointTarget> = RemoveEmptyProps<{
    [K in EndpointK]: InferEndpointDefn<ResourceK, K, Prop<Config, K, undefined>, Target>;
}>;
declare type InferEndpointDefn<ResourceK extends keyof Shopify, EndpointK extends string, Config, Target extends EndpointTarget> = ResolveEndpointTarget<EndpointK, Config> extends Target ? EndpointK extends keyof Shopify[ResourceK] ? Shopify[ResourceK][EndpointK] extends (...args: infer Args) => Promise<infer Ret> ? Ret extends (infer RetInner)[] ? EndpointDefinition<client.Scope, t.Tuple.Last<Args>, RetInner> : EndpointDefinition<client.Scope, t.Tuple.Last<Args>, Ret> : never : never : never;
declare type ResolveEndpointTarget<Key extends string, Config> = Config extends false ? never : Config extends FullEndpointConfig<infer Target> ? Target : StandardEndpointConfig<Key>['target'];
export declare type ShopifyConnectorConfig = MakeValuesOptionalWhereAppropriate<ResourcesConfig<InferredResources>>;
declare type ResourcesConfig<T extends Record<string, InferredResource>> = MakeValuesOptionalWhereAppropriate<{
    [K in keyof T]: ResourceConfig<T[K]>;
}>;
declare type ResourceConfig<T extends InferredResource = InferredResource> = MakeValuesOptionalWhereAppropriate<{
    endpoints: EndpointsConfig<T['endpoints'][number]>;
    resources: ResourcesConfig<T['children']>;
}> | false;
declare type EndpointsConfig<Key extends string = string> = MakeValuesOptionalWhereAppropriate<{
    [K in Key]: EndpointConfig<K>;
}>;
declare type EndpointConfig<Key extends string = string> = DecorateEndpointConfig<Key extends StandardEndpointKey ? 'optional' : 'required', FullEndpointConfig>;
declare type FullEndpointConfig<Target extends EndpointTarget = EndpointTarget, Type extends EndpointType = EndpointType> = {
    target: Target;
    type: Type;
    params?: object;
};
declare type EndpointTarget = 'document' | 'resource';
declare type EndpointType = 'map' | 'flatMap';
declare type DecorateEndpointConfig<Optionality extends 'required' | 'optional', T extends object> = (Optionality extends 'optional' ? Partial<T> | undefined : T) | false;
declare type StandardEndpointKey = keyof typeof standardEndpoints;
declare type StandardEndpointConfig<Key extends string> = Key extends StandardEndpointKey ? (typeof standardEndpoints)[Key] : never;
declare const standardEndpoints: {
    readonly count: {
        readonly target: "resource";
        readonly type: "map";
    };
    readonly create: {
        readonly target: "resource";
        readonly type: "map";
    };
    readonly delete: {
        readonly target: "document";
        readonly type: "map";
    };
    readonly get: {
        readonly target: "document";
        readonly type: "map";
    };
    readonly update: {
        readonly target: "document";
        readonly type: "map";
    };
    readonly list: {
        readonly target: "resource";
        readonly type: "flatMap";
    };
};
declare type MakeValuesOptionalWhereAppropriate<T extends object> = PermitUndefinedIfPermitsEmptyObject<MakePropsPermittingUndefinedOptional<T>>;
declare type MakePropsPermittingUndefinedOptional<T> = MakePropsOptional<T, PropsPermittingUndefined<T>>;
declare type PermitUndefinedIfPermitsEmptyObject<T> = {} extends T ? T | undefined : T;
declare type MakePropsOptional<T, OptionalProps extends keyof T> = t.Object.Merge<{
    [K in OptionalProps]?: T[K];
}, {
    [K in Exclude<keyof T, OptionalProps>]: T[K];
}>;
declare type PropsPermittingUndefined<T> = {
    [K in keyof T]: undefined extends T[K] ? K : never;
}[keyof T];
declare type Prop<T, K, Default> = K extends keyof T ? T[K] : Default;
declare type RemoveEmptyProps<O> = FilterProps<O, undefined | Record<string, never>>;
declare type FilterProps<O, Match> = {
    [K in FilterKeys<O, Match>]: O[K] extends never ? never : O[K];
};
declare type FilterKeys<O, Match> = {
    [K in keyof O]: O[K] extends Match ? never : K;
}[keyof O];
export {};
