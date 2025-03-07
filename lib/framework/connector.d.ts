import { FlatMapAsyncOptions, Transform } from "@space48/json-pipe";
import * as t from "io-ts";
export declare function connector<Config, Scope, Resources extends ResourceDefinitionMap<Scope>>(definition: ConnectorDefinition<Config, Scope, Resources>): Connector<Config, Scope, Resources>;
export declare type ScopeRef = {
    connector: string;
    scope: string | null;
};
/**
 * this function can help with type inference in connectors -- don't use unless necessary for type inference
 */
export declare function resource<T extends ResourceDefinition>(resource: T): T;
export declare function resourceMerger<Scope>(): <E1 extends EndpointDefinitionMap<Scope>, R1 extends ResourceDefinitionMap<Scope>, D1 extends DocumentDefinition<Scope>, E2 extends EndpointDefinitionMap<Scope>, R2 extends ResourceDefinitionMap<Scope>, D2 extends DocumentDefinition<Scope>>(r1: ResourceDefinition<Scope, E1, R1, D1>, r2: ResourceDefinition<Scope, E2, R2, D2>) => ResourceDefinition<Scope, E1 & E2, R1 & R2, D1 & D2>;
/**
 * A definition of a connector describing the required configuration and available
 * endpoints for that connector.
 */
export interface ConnectorDefinition<Config = any, Scope = any, Resources extends ResourceDefinitionMap<Scope> = ResourceDefinitionMap<Scope>> {
    /**
     * Schema describing config required by this connector, e.g. authentication,
     * concurrency, etc.
     */
    readonly configSchema: t.Type<Config>;
    /**
     * Resources available on this connector
     */
    readonly resources: Resources;
    /**
     * An example of a resource name to be used when generating docs. See existing
     * connectors for examples.
     */
    readonly scopeNameExample: string | null;
    /**
     * Create a "scope" which can be used to execute commands against this connector.
     *
     * Scope will typically be some kind of HTTP client which is updated whenever the
     * config changes. (E.g. when a user modifies the config while a long running process
     * is running, such as changing a concurrency limit.)
     */
    getScope(config: MutableReference<Config>): Scope;
    /**
     * Given a scope config, returns a unique name for the scope. E.g. this might be
     * a base URL in the case of Magento or a shop identifier in the case of Shopify.
     */
    getScopeName(config: Config): string;
    /**
     * Returns a warning message to be shown to a user before they execute commands
     * against this scope. For example, this might be a message warning the user that
     * the given scope relates to a production instance.
     */
    getWarningMessage(scope: Scope): Promise<string | undefined | void>;
}
export declare type Connector<Config = any, Scope = any, Resources extends ResourceDefinitionMap<Scope> = Record<string, any>> = ResourceMap<Resources, false> & {
    $definition: ConnectorDefinition<Config, Scope, Resources>;
    (config: Config | MutableReference<Config>): ConnectorScope;
};
export interface ConnectorScope {
    scopeName: string;
    connector: Connector;
    getWarningMessage(): Promise<string | undefined | void>;
    execute<OutT>(command: Command<any, OutT, false>): AsyncIterable<OutT>;
    execute<OutT>(command: Command<any, OutT, true>): AsyncIterable<OutputWithPath<OutT>>;
    execute<OutT>(command: Command<any, OutT, boolean>): AsyncIterable<OutT | OutputWithPath<OutT>>;
    execute<T extends Command | State>(commands: AnyIterable<T>): AsyncIterable<InferOutputElement<T>>;
}
/**
 * This type is distributive, so
 *  InferOutputElement<Command<A, B> | Command<C, D> | State<S1> | State<S2>>
 * will yield
 *  OutputElement<A, B> | OutputElement<C, D> | State<S1> | State<S2>
 */
declare type InferOutputElement<Input extends Command | State> = Input extends Command<infer InT, infer OutT, boolean> ? OutputElement<InT, OutT> : Input extends State<infer StateT> ? State<StateT> : never;
export interface ResourceDefinitionMap<Scope = any> {
    readonly [key: string]: ResourceDefinition<Scope>;
}
export declare type ResourceMap<T extends ResourceDefinitionMap = ResourceDefinitionMap, MultiPath extends boolean = boolean> = {
    ___foobar: never;
} extends T ? Record<string, any> : {
    [K in keyof T]: T[K] extends object & ResourceDefinition<any, infer E, infer R, infer D> ? Resource<E, R, D, MultiPath> : never;
};
export interface ResourceDefinition<Scope = any, Endpoints extends EndpointDefinitionMap<Scope> = EndpointDefinitionMap<Scope>, Resources extends ResourceDefinitionMap<Scope> = ResourceDefinitionMap<Scope>, Documents extends DocumentDefinition<Scope> = DocumentDefinition<Scope>> {
    readonly endpoints?: Endpoints;
    readonly resources?: Resources;
    readonly documents?: Documents;
}
declare type Resource<Endpoints extends EndpointDefinitionMap = EndpointDefinitionMap, Resources extends ResourceDefinitionMap = ResourceDefinitionMap, Documents extends DocumentDefinition = DocumentDefinition, MultiPath extends boolean = boolean> = ResourceMap<Resources, MultiPath> & EndpointMap<Endpoints, MultiPath> & DocumentSelectors<Documents, MultiPath>;
interface DocumentSelectors<T extends DocumentDefinition = DocumentDefinition, MultiPath extends boolean = boolean> {
    $all: Document<T, true>;
    $doc(id: DocId): Document<T, MultiPath>;
}
export interface DocumentDefinition<Scope = any> {
    idField?: string;
    listIds?(scope: Scope): (path: Path) => AsyncIterable<DocId>;
    readonly endpoints?: EndpointDefinitionMap<Scope>;
    readonly resources?: ResourceDefinitionMap<Scope>;
}
declare type Document<T extends DocumentDefinition = DocumentDefinition, MultiPath extends boolean = boolean> = (T["resources"] extends ResourceDefinitionMap ? ResourceMap<T["resources"], MultiPath> : Record<string, any>) & (T["endpoints"] extends EndpointDefinitionMap ? EndpointMap<T["endpoints"], MultiPath> : Record<string, any>);
export interface EndpointDefinitionMap<Scope = any> {
    readonly [key: string]: EndpointDefinition<Scope>;
}
declare type EndpointMap<T extends EndpointDefinitionMap = EndpointDefinitionMap, MultiPath extends boolean = boolean> = {
    [K in keyof T]: T[K] extends object ? Endpoint<T[K], MultiPath> : never;
};
export interface EndpointDefinition<Scope = unknown, InT = any, OutT = any> {
    (scope: Scope): EndpointFn<InT, OutT>;
}
export interface EndpointFn<InT = unknown, OutT = unknown> {
    (input: EndpointPayload<InT>): Promise<OutT> | AsyncIterable<OutT>;
}
export interface EndpointPayload<T = undefined> {
    readonly path: Path;
    readonly docId: DocId[];
    readonly input: T;
}
export declare type DocId = number | string;
declare type Endpoint<T extends EndpointDefinition = EndpointDefinition, MultiPath extends boolean = boolean> = T extends EndpointDefinition<any, infer InT, infer OutT> ? undefined extends InT ? OptionalInputEndpointFns<InT, OutT, MultiPath> : MandatoryInputEndpointFns<InT, OutT, MultiPath> : never;
interface OptionalInputEndpointFns<InTConstraint = any, OutTConstraint = any, MultiPath extends boolean = boolean> {
    <OutT extends OutTConstraint = OutTConstraint, InT extends InTConstraint = InTConstraint>(input?: InT): Command<typeof input, OutT, MultiPath>;
}
interface MandatoryInputEndpointFns<InTConstraint = any, OutTConstraint = any, MultiPath extends boolean = boolean> {
    <OutT extends OutTConstraint = OutTConstraint, InT extends InTConstraint = InTConstraint>(input: InT): Command<InT, OutT, MultiPath>;
}
export interface State<T = unknown> {
    state: T;
}
export interface Command<InT = unknown, OutT = unknown, MultiPath extends boolean = boolean> extends MessageHeader {
    input: InT;
    __dummyProps?: {
        outT: OutT;
        multiPath: MultiPath;
    };
}
export interface FullyQualifiedMessageHeader extends MessageHeader {
    scope: ScopeRef;
}
export interface MessageHeader {
    path: Path;
    endpoint: string;
}
export interface OutputWithPath<T = any> {
    path: Path;
    output: T;
}
export interface OutputElement<InT = unknown, OutT = unknown> extends MessageHeader {
    input: InT;
    output?: OutT;
    success: boolean;
    error?: any;
}
export declare type Path = Path.Element[];
export declare namespace Path {
    const WILDCARD = "*";
    type DocIdWildcard = typeof WILDCARD;
    type Element = string | [resource: string, documentId: DocId | DocIdWildcard];
    function pop(path: Path): [head: Path, tail: Path.Element | undefined];
    function computeAllHeaders(host: ConnectorDefinition | ResourceDefinition | DocumentDefinition, path?: Path): MessageHeader[];
    function containsWildcard(path: Path): boolean;
    class InvalidPathError extends Error {
        constructor(path: Path, message?: string);
    }
    function selector(resources: ResourceDefinitionMap): (path: Path) => ResourceDefinition | DocumentDefinition;
    function endpointFnSelector<Scope>(resources: ResourceDefinitionMap<Scope>, scope: Scope): <InT, OutT>(resourcePath: Path, endpointName: string) => EndpointFn<InT, OutT>;
    function endpointNamesSelector(resources: ResourceDefinitionMap): (path: Path) => string[];
    function getDocIds(path: Path): DocId[];
    /**
     * Expand a path so that a path containing document ID wildcards is mapped to n paths containing document IDs only
     */
    function expander<Scope>(resources: ResourceDefinitionMap<Scope>, scope: Scope): (path: Path) => AsyncIterable<Path>;
}
declare type AnyIterable<T> = AsyncIterable<T> | Iterable<T>;
declare type CompoundReference<T extends Record<string, Reference>> = 1 extends 1 ? Reference<{
    readonly [K in keyof T]: T[K] extends Reference<infer U> ? U : never;
}> : never;
export declare class Reference<T = any> {
    readonly get: () => T;
    static combine<Refs extends Record<string, Reference>>(refs: Refs): CompoundReference<Refs>;
    constructor(get: () => T);
    map<U>(mapper: (config: T) => U): Reference<U>;
}
export declare class MutableReference<T = any> extends Reference<T> {
    readonly get: () => T;
    readonly set: (value: T) => void;
    static of<T>(initialValue: T, schema?: t.Type<T>): MutableReference<T>;
    constructor(get: () => T, set: (value: T) => void);
    withSchema(schema: t.Type<T>): MutableReference<T>;
}
export declare class InvalidConnectorDefinition extends Error {
}
export declare class InvalidCommand extends Error {
}
export declare class EndpointError extends Error {
    readonly detail: any;
    constructor(message: string, options?: {
        detail?: any;
    });
    normalize(): {
        message: string;
        detail: any;
    };
}
/**
 * Pipeline functions which pass State directly through, unmodified, but *in order*
 *
 * I.e. when input is [Input<A> State<B> Input<C>], output is [Output<A> State<B> Output<C>]
 */
export declare abstract class State {
    private constructor();
    static of<T>(value: T): State<T>;
    static isState<T = unknown>(value: any): value is State<T>;
    static map<StateT, InT, OutT>(mapper: (element: InT) => OutT): Transform<State<StateT> | InT, State<StateT> | OutT>;
    static tap<StateT, InT>(fn: (element: InT) => void): Transform<State<StateT> | InT, State<StateT> | InT>;
    static flatMapAsync<StateT, InT, OutT>(options: FlatMapAsyncOptions, mapper: (element: InT) => AsyncIterable<OutT>): Transform<State<StateT> | InT, State<StateT> | OutT>;
    static collectOutputs<T extends OutputElement | State>(outputs: AsyncIterable<T>): AsyncIterable<InferStatefulOutput<T>>;
    static collectOutputs<T extends OutputElement | State>(): Transform<T, InferStatefulOutput<T>>;
}
declare type InferStatefulOutput<Input extends OutputElement | State> = 1 extends 1 ? [
    state: Input extends State<infer StateT> ? StateT : never,
    ...outputs: ReadonlyArray<Input extends OutputElement<infer InT, infer OutT> ? OutputElement<InT, OutT> : never>
] : never;
export {};
