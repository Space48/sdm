import { Field, FieldType } from "./action";
export declare type ResourceCollection = Record<string, ResourceConfig | Falsy>;
export declare type ResourceConfig = SingletonResourceConfig | DocumentCollectionConfig<any>;
export declare namespace ResourceConfig {
    function merge(config: ResourceConfig, ...updates: (Partial<ResourceConfig> | Falsy)[]): ResourceConfig;
}
export declare type SingletonResourceConfig = {
    docKey?: Falsy;
    listDocKeys?: Falsy;
    endpoints?: Record<string, EndpointConfig<never, any> | Falsy>;
    children?: ResourceCollection;
};
export declare type DocumentCollectionConfig<Key extends FieldType> = {
    docKey: DocumentKeyDefinition<Key>;
    listDocKeys?: ((keys: string[]) => AsyncIterable<string>) | Falsy;
    endpoints?: Record<string, EndpointConfig<Key, Cardinality> | Falsy>;
    children?: ResourceCollection;
};
export declare type EndpointConfig<Key extends FieldType, C extends Cardinality> = {
    scope: [Key] extends [never] ? EndpointScope.Resource : EndpointScope;
    cardinality: C;
    fn: C extends Cardinality.One ? MapEndpointFn : FlatMapEndpointFn;
};
export declare type MapEndpointFn = (input: EndpointPayload) => Promise<any>;
export declare type FlatMapEndpointFn = (input: EndpointPayload) => AsyncIterable<any>;
export declare type DocumentKeyDefinition<Type extends FieldType = FieldType> = {
    name: string;
    type: Field<Type>;
};
export declare type EndpointFn<Key extends FieldType | never, C extends Cardinality> = C extends Cardinality.One ? (input: EndpointPayload) => Promise<any> : C extends Cardinality.Many ? (input: EndpointPayload) => AsyncIterable<any> : never;
export declare type EndpointPayload = {
    docKeys: string[];
    data?: any;
};
export declare enum EndpointScope {
    Resource = 0,
    Document = 1
}
export declare enum Cardinality {
    One = 0,
    Many = 1
}
export declare type Command = Readonly<{
    name: string;
    path: string;
}>;
export declare function executeCommand(resources: ResourceCollection, command: Command, input?: AsyncIterable<any>): AsyncIterable<any>;
declare type Falsy = false | 0 | "" | null | undefined;
export declare function getAvailableCommands(resources: ResourceCollection): Command[];
export {};
