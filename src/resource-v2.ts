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
> = {
  readonly configSchema: Config
  readonly resources: Resources
  getWarningMessage(config: Config): Promise<string|undefined|void>
  (config: Config): ResourceMapRef<Resources, false>
};

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
  $docs(ids: Iterable<DocId>): DocumentRef<T, true>
  $extractId(extractId: (input: any) => DocId): DocumentRef<T, MultiPath>
  //(id: unknown): DocumentRef<T, MultiPath extends true ? true : boolean>
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

export interface Endpoint<Config = any, I = any, O = any> {
  (config: Config): EndpointFn<I, O>
}

export interface EndpointFn<I = any, O = any> {
  (input: EndpointPayload<I>): Promise<O> | AsyncIterable<O>
}

export interface EndpointPayload<T = undefined> {
  readonly path: ReadonlyArray<DocId>
  readonly data: T
}

type EndpointRef<
  T extends Endpoint = Endpoint,
  MultiPath extends boolean = boolean,
> =
  T extends Endpoint<any, undefined, infer O> & Endpoint<any, infer I, infer O> ? OptionalInputEndpointFns<I, O, MultiPath>
  : T extends Endpoint<any, infer I, infer O> ? MandatoryInputEndpointFns<I, O, MultiPath>
  : never;

interface OptionalInputEndpointFns<
  I = any,
  O = any,
  MultiPath extends boolean = boolean,
> {
  <T extends any>(extractEndpointInput: (input: T) => I): (inputs: AsyncIterable<T>) => AsyncIterable<Result<T, O, MultiPath>>
  (inputs: AsyncIterable<I>): AsyncIterable<Result<I, O, MultiPath>>
  <T extends Data & I>(input?: T): AsyncIterable<Output<O, MultiPath>>
}

interface MandatoryInputEndpointFns<
  I = any,
  O = any,
  MultiPath extends boolean = boolean,
> {
  (inputs: AsyncIterable<I>): AsyncIterable<Result<I, O, MultiPath>>
  <T extends Data & I>(input: T): AsyncIterable<Output<O, MultiPath>>
}

type Output<T = any, MultiPath extends boolean = boolean> =
  MultiPath extends true ? {output: T, path: string}
  : MultiPath extends false ? T
  : never;

type Result<
  I = any,
  O = any,
  MultiPath extends boolean = boolean,
> = {
  input: I
  output?: O
  success: boolean
  error?: any
} & PathProp<MultiPath>;

type PathProp<MultiPath extends boolean = boolean> = 
  MultiPath extends true ? {path: string}
  : MultiPath extends false ? {}
  : never;

type Data = ReadonlyArray<Data> | boolean | DataObject | null | number | string | undefined;

interface DataObject {
  [key: string]: Data
  
  // prevent AsyncIterators from being inferred as DataObjects
  [Symbol.asyncIterator]?: never
}
