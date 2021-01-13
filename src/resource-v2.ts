import * as t from 'io-ts'
import R from "ramda";

export function connector<Config, Resources extends ResourceMap<Config>>(
  configSchema: t.Type<Config>,
  connector: Connector<Config, Resources>,
): ConnectorRef<Config, Resources> {
  return {} as any;
}

export function resource<
  Config,
  Endpoints extends EndpointMap<Config>,
  Resources extends ResourceMap<Config>,
  Documents extends Document<Config>,
>(
  configSchema: t.Type<Config>,
  resource: Resource<Config, Endpoints, Resources, Documents>,
): Resource<Config, Endpoints, Resources, Documents> {
  return resource;
}

export function mergeResources<
  C,
  E1 extends EndpointMap<C>, R1 extends ResourceMap<C>, D1 extends Document<C>,
  E2 extends EndpointMap<C>, R2 extends ResourceMap<C>, D2 extends Document<C>,
>(
  r1: Resource<C, E1, R1, D1>,
  r2: Resource<C, E2, R2, D2>,
): Resource<C, E1&E2, R1&R2, D1&D2> {
  return R.mergeDeepRight(r1, r2) as Resource<C, E1&E2, R1&R2, D1&D2>;
}

export type Connector<
  Config = any,
  Resources extends ResourceMap<Config> = ResourceMap<Config>,
> = {
  readonly resources: Resources
  getWarningMessage?(config: Config): Promise<string|undefined|void>
}

type ConnectorRef<
  Config = any,
  Resources extends ResourceMap<Config> = {},
> = ResourceMapRef<Resources, false> & {
  configure(config: Config): ConfiguredConnector
}

export interface ConfiguredConnector {
  getWarningMessage(): Promise<string|undefined|void>
  execute<OutT>(command: Command<any, OutT, false>): AsyncIterable<OutT>
  execute<OutT>(command: Command<any, OutT, true>): AsyncIterable<OutputWithPath<OutT>>
  execute<T extends Command>(commands: Iterable<T> | AsyncIterable<T>): AsyncIterable<OutputElement<T>>
}

export interface ResourceMap<Config = any> {
  readonly [key: string]: Resource<Config>
}

export type ResourceMapRef<
  T extends ResourceMap = ResourceMap,
  MultiPath extends boolean = boolean,
> = {
  [K in keyof T]:
    T[K] extends Resource<any, infer E, infer R, infer D>
      ? ResourceRef<E, R, D, MultiPath>
      : never
};

export interface Resource<
  Config = any,
  Endpoints extends EndpointMap<Config> = EndpointMap<Config>,
  Resources extends ResourceMap<Config> = ResourceMap<Config>,
  Documents extends Document<Config> = Document<Config>,
> {
  readonly endpoints?: Endpoints
  readonly resources?: Resources
  readonly documents?: Documents
}

export type DocId = number | string;

type ResourceRef<
  Endpoints extends EndpointMap = EndpointMap,
  Resources extends ResourceMap = ResourceMap,
  Documents extends Document = Document,
  MultiPath extends boolean = boolean,
> = ResourceMapRef<Resources, MultiPath>
  & EndpointMapRef<Endpoints, MultiPath>
  & DocumentRefSelectors<Documents, MultiPath>;

interface DocumentRefSelectors<
  T extends Document = Document,
  MultiPath extends boolean = boolean,
> {
  $all: DocumentRef<T, true>
  $doc(id: DocId): DocumentRef<T, MultiPath>
}

export interface Document<Config = any> {
  idField?: string
  listIds?(config: Config): (path: ReadonlyArray<DocId>) => AsyncIterable<DocId>
  readonly endpoints?: EndpointMap<Config>
  readonly resources?: ResourceMap<Config>
}

type DocumentRef<
  T extends Document = Document,
  MultiPath extends boolean = boolean,
> = (T['resources'] extends ResourceMap ? ResourceMapRef<T['resources'], MultiPath> : {})
  & (T['endpoints'] extends EndpointMap ? EndpointMapRef<T['endpoints'], MultiPath> : {});

export interface EndpointMap<Config = any> {
  readonly [key: string]: Endpoint<Config>
}

type EndpointMapRef<
  T extends EndpointMap = EndpointMap,
  MultiPath extends boolean = boolean,
> = {
  [K in keyof T]: EndpointRef<T[K], MultiPath>
};

export interface Endpoint<Config = any, InT = any, OutT = any> {
  (config: Config): EndpointFn<InT, OutT>
}

export interface EndpointFn<InT = any, OutT = any> {
  (input: EndpointPayload<InT>): Promise<OutT> | AsyncIterable<OutT>
}

export interface EndpointPayload<T = undefined> {
  readonly path: ReadonlyArray<DocId>
  readonly data: T
}

type EndpointRef<
  T extends Endpoint = Endpoint,
  MultiPath extends boolean = boolean,
> =
  T extends Endpoint<any, undefined, infer OutT> & Endpoint<any, infer InT, infer OutT> ? OptionalInputEndpointFns<InT, OutT, MultiPath>
  : T extends Endpoint<any, infer InT, infer OutT> ? MandatoryInputEndpointFns<InT, OutT, MultiPath>
  : never;

interface OptionalInputEndpointFns<
  InT = any,
  OutT = any,
  MultiPath extends boolean = boolean,
> {
  (input?: InT): Command<InT, OutT, MultiPath>
}

interface MandatoryInputEndpointFns<
  InT = any,
  OutT = any,
  MultiPath extends boolean = boolean,
> {
  (input: InT): Command<InT, OutT, MultiPath>
}

interface Command<
  InT = any,
  OutT = any,
  MultiPath extends boolean = boolean,
> {
  path: string
  input: InT
  __dummyProps?: {
    outT: OutT
    multiPath: MultiPath
  }
}

interface OutputWithPath<T = any> {
  path: string
  output: T
}

interface OutputElement<T extends Command = Command> {
  command: Command
  output?: T extends Command<any, infer OutT> ? OutT : never
  success: boolean
  error?: any
}
