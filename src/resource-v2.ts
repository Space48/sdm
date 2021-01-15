import { flatMapAsync, pipe, compose, map, tap } from '@space48/json-pipe';
import * as t from 'io-ts'
import R from "ramda";

export function connector<Config, Resources extends ResourceMap<Config>>(
  configSchema: t.Type<Config>,
  connector: Connector<Config, Resources>,
): ConnectorRef<Config, Resources> {
  try {
    const validateConfig = configValidator(configSchema);

    const resources = resourceMapRef(connector.resources, []);
    
    function scope(config: Config): ConnectorScope {
      validateConfig(config);

      const executeCommands = commandExecutor(connector.resources, config);

      return {
        name: connector.getScopeName(config),
        
        async getWarningMessage(): Promise<string|undefined|void> {
          return await connector.getWarningMessage?.(config);
        },

        async *execute(commandOrCommands: Command | AnyIterable<Command>): any {
          if (isIterable(commandOrCommands)) {
            yield* executeCommands(commandOrCommands);
          } else {
            const pathContainsWildcard = Path.containsWildcard(commandOrCommands.path);
            const outputElements = executeCommands([commandOrCommands]);
            if (pathContainsWildcard) {
              yield* pipe(
                outputElements,
                tap(({success, error}) => {
                  if (!success) {
                    throw Error(error);
                  }
                }),
                map((outputElement): OutputWithPath => ({
                  path: outputElement.command.path,
                  output: outputElement.output,
                })),
              );
            } else {
              yield* pipe(
                outputElements,
                tap(({success, error}) => {
                  if (!success) {
                    throw Error(error);
                  }
                }),
                map(({output}) => output),
              );
            }
          }
        },
      }
    }
    
    return deepMerge(resources, { scope }) as ConnectorRef<Config, Resources>;
  } catch (e) {
    throw new InvalidConnectorDefinition(e);
  }
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
  getScopeName(config: Config): string
  getWarningMessage?(config: Config): Promise<string|undefined|void>
}

type ConnectorRef<
  Config = any,
  Resources extends ResourceMap<Config> = {},
> = ResourceMapRef<Resources, false> & {
  scope(config: Config): ConnectorScope
}

export interface ConnectorScope {
  name: string
  getWarningMessage(): Promise<string|undefined|void>
  execute<OutT>(command: Command<any, OutT, false>): AsyncIterable<OutT>
  execute<OutT>(command: Command<any, OutT, true>): AsyncIterable<OutputWithPath<OutT>>
  execute<InT, OutT>(commands: Iterable<Command<InT, OutT>> | AsyncIterable<Command<InT, OutT>>): AsyncIterable<OutputElement<InT, OutT>>
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

function resourceMapRef<T extends ResourceMap>(resources: T, path: Path): ResourceMapRef<T> {
  return R.mapObjIndexed(
    (resource, name) => resourceRef(resource, path, name),
    resources
  ) as any;
}

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

type ResourceRef<
  Endpoints extends EndpointMap = EndpointMap,
  Resources extends ResourceMap = ResourceMap,
  Documents extends Document = Document,
  MultiPath extends boolean = boolean,
> = ResourceMapRef<Resources, MultiPath>
  & EndpointMapRef<Endpoints, MultiPath>
  & DocumentRefSelectors<Documents, MultiPath>;

function resourceRef(resource: Resource, path: Path, name: string): ResourceRef {
  return deepMerge(
    deepMerge(
      resourceMapRef(resource.resources ?? {}, [...path, name]),
      endpointMapRef(resource.endpoints ?? {}, [...path, name]),
    ),
    {
      $all: documentRef(resource.documents ?? {}, [...path, [name, Path.WILDCARD]]),
      $doc: (id: DocId) => documentRef(resource.documents ?? {}, [...path, [name, id]]),
    }
  );
}

interface DocumentRefSelectors<
  T extends Document = Document,
  MultiPath extends boolean = boolean,
> {
  $all: DocumentRef<T, true>
  $doc(id: DocId): DocumentRef<T, MultiPath>
}

export interface Document<Config = any> {
  idField?: string
  listIds?(config: Config): (path: Path) => AsyncIterable<DocId>
  readonly endpoints?: EndpointMap<Config>
  readonly resources?: ResourceMap<Config>
}

type DocumentRef<
  T extends Document = Document,
  MultiPath extends boolean = boolean,
> = (T['resources'] extends ResourceMap ? ResourceMapRef<T['resources'], MultiPath> : {})
  & (T['endpoints'] extends EndpointMap ? EndpointMapRef<T['endpoints'], MultiPath> : {});

function documentRef(document: Document, path: Path): DocumentRef {
  return deepMerge(
    resourceMapRef(document.resources ?? {}, path),
    endpointMapRef(document.endpoints ?? {}, path),
  );
}

export interface EndpointMap<Config = any> {
  readonly [key: string]: Endpoint<Config>
}

type EndpointMapRef<
  T extends EndpointMap = EndpointMap,
  MultiPath extends boolean = boolean,
> = {
  [K in keyof T]: EndpointRef<T[K], MultiPath>
};

function endpointMapRef(endpoints: EndpointMap, path: Path): EndpointMapRef {
  return R.mapObjIndexed(
    (endpoint, name) => endpointRef(path, name),
    endpoints
  );
}

export interface Endpoint<Config = unknown, InT = any, OutT = any> {
  (config: Config): EndpointFn<InT, OutT>
}

export interface EndpointFn<InT = unknown, OutT = unknown> {
  (input: EndpointPayload<InT>): Promise<OutT> | AsyncIterable<OutT>
}

export interface EndpointPayload<T = undefined> {
  readonly path: Path
  readonly input: T
}

export type DocId = number | string;

type EndpointRef<
  T extends Endpoint = Endpoint,
  MultiPath extends boolean = boolean,
> =
  T extends Endpoint<any, undefined, infer OutT> & Endpoint<any, infer InT, infer OutT> ? OptionalInputEndpointFns<InT, OutT, MultiPath>
  : T extends Endpoint<any, infer InT, infer OutT> ? MandatoryInputEndpointFns<InT, OutT, MultiPath>
  : never;

function endpointRef(path: Path, endpoint: string): EndpointRef {
  return input => ({ path, endpoint, input });
}

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
  InT = unknown,
  OutT = unknown,
  MultiPath extends boolean = boolean,
> {
  path: Path
  endpoint: string
  input: InT
  __dummyProps?: {
    outT: OutT
    multiPath: MultiPath
  }
}

interface OutputWithPath<T = any> {
  path: Path
  output: T
}

interface OutputElement<InT = unknown, OutT = unknown> {
  command: Command<InT, OutT>
  output?: OutT
  success: boolean
  error?: any
}

function configValidator<Config>(configSchema: t.Type<Config>): (config: Config) => void {
  return config => {
    const result = configSchema.decode(config);
    if ('left' in result) {
      throw new Error(JSON.stringify(result.left));
    }
  };
}

/**
 * A deep merge which will merge functions with objects where necessary
 */
function deepMerge<
  X extends Function|Record<string, any>,
  Y extends Function|Record<string, any>
>(x: X, y: Y): X & Y {
  if (typeof x === 'function' && typeof y === 'function') {
    throw new Error('Cannot merge two functions.');
  }
  if (typeof x === 'function' && typeof y === 'object') {
    return addPropertiesToFunction(x, y);
  }
  if (typeof y === 'function' && typeof x === 'object') {
    return addPropertiesToFunction(y, x);
  }
  if (typeof x === 'object' && typeof y === 'object') {
    const keys = new Set(Object.keys(x).concat(Object.keys(y)));
    const entries = [...keys].map(key => R.pair(key, deepMergeProperty(key, x, y)));
    return R.fromPairs(entries) as X & Y;
  }
  throw new Error();
}

function deepMergeProperty(
  property: string,
  x: Record<string, any>,
  y: Record<string, any>,
): any {
  if (property in x) {
    return property in y ? deepMerge(x, y) : x[property];
  }
  return y[property];
}

function addPropertiesToFunction<
  X extends Function,
  Y extends Record<string, any>
>(fn: X, properties: Y): X & Y {
  const result: any = (...args: any[]) => fn(...args);
  Object.entries(properties).forEach(([key, value]) => result[key] = value);
  return result;
}

export type Path = Path.Element[];

export namespace Path {
  export const WILDCARD = '*';
  export type DocIdWildcard = typeof WILDCARD;

  export type Element = string | [resource: string, documentId: DocId | DocIdWildcard];

  export function containsWildcard(path: Path): boolean {
    return path.some(element => Array.isArray(element) && element[1] === WILDCARD);
  }

  export class InvalidPathError extends Error {

  }

  export function selector(resources: ResourceMap): (path: Path) => Resource | Document {
    return path => {
      if (path.length === 0) {
        throw new InvalidPathError();
      }

      return path.reduce(
        (host: {resources?: ResourceMap}, element: Element) => {
          const resourceName = typeof element === 'string' ? element : element[0];
          const resource = host.resources?.[resourceName];
          const _host = typeof element === 'string' ? resource : resource?.documents;
          if (!_host) {
            throw new InvalidPathError();
          }
          return _host;
        },
        {resources},
      )
    }
  }

  export function endpointFnSelector<C>(resources: ResourceMap<C>, config: C) {
    const hostSelector = selector(resources);

    return <InT, OutT>(path: Path, endpointName: string) => {
      const endpointHost = hostSelector(path);
      const endpoint = endpointHost.endpoints![endpointName] as Endpoint<C, InT, OutT>;
      return endpoint(config);
    };
  }

  export function getDocIds(path: Path): DocId[] {
    return path
      .filter(element => Array.isArray(element))
      .map(([, docId]) => docId);
  }

  /**
   * Expand a path so that a path containing document ID wildcards is mapped to n paths containing document IDs only
   */
  export function expander<C>(resources: ResourceMap<C>, config: C): (path: Path) => AsyncIterable<Path> {
    return async function* (path) {
      let _resources = resources;

      for (let i = 0; i < path.length; i++) {
        const pathElement = path[i];

        if (typeof pathElement === 'string') {
          _resources = _resources[pathElement].resources ?? {};
          continue;
        }

        const [resourceName, docId] = pathElement;
        const documents = _resources[resourceName].documents ?? {};

        if (docId === WILDCARD) {
          if (!documents.listIds) {
            throw new InvalidPathError('Wildcard is not permitted.');
          }
          const listIdsPath = [...path.slice(0, i), resourceName];
          const expandPath = expander(resources, config);
          yield* pipe(
            documents.listIds(config)(listIdsPath),
            map(docId => R.update(i, [resourceName, docId], path)),
            flatMapAsync({concurrency: 10}, expandPath),
          );
          return;
        }

        _resources = documents.resources ?? {};
      }

      yield path;
    }
  };
}

export type CommandExecutor =
  <InT, OutT>(commands: AnyIterable<Command<InT, OutT>>) => AsyncIterable<OutputElement<InT, OutT>>;

type AnyIterable<T> = AsyncIterable<T> | Iterable<T>;

export function commandExecutor<Config>(
  resources: ResourceMap<Config>,
  config: Config,
): CommandExecutor {
  const selectEndpointFn = Path.endpointFnSelector(resources, config);
  const expandPaths = Path.expander(resources, config);

  return compose(
    ensureIterableIsAsync,
    flatMapAsync(
      {concurrency: 10},
      command => pipe(
        expandPaths(command.path),
        map(path => ({ ...command, path }))
      ),
    ),
    flatMapAsync(
      {concurrency: 100},
      async function* <InT, OutT>(command: Command<InT, OutT>) {
        const endpointFn = selectEndpointFn<InT, OutT>(command.path, command.endpoint);

        try {
          const endpointReturnValue = endpointFn({
            input: command.input,
            path: command.path,
          });

          if (isAsyncIterable(endpointReturnValue)) {
            for await (const output of endpointReturnValue) {
              yield {
                command,
                output,
                success: true,
              };
            }
          } else {
            yield {
              command,
              output: await endpointReturnValue,
              success: true,
            };
          }
        } catch (e) {
          yield {
            command,
            success: false,
            error: e,
          };
        }
      }
    )
  );
}

export class InvalidConnectorDefinition extends Error {
  
}

export class InvalidCommand extends Error {
  
}

function ensureIterableIsAsync<T>(iterable: AsyncIterable<T> | Iterable<T>): AsyncIterable<T> {
  if (isSyncIterable(iterable)) {
    return (async function* () {
      yield* iterable;
    })();
  }
  return iterable;
}

function isIterable<T>(value: any): value is Iterable<T>|AsyncIterable<T> {
  return isSyncIterable(value) || isAsyncIterable(value);
}

function isSyncIterable(value: any): value is Iterable<any> {
  return Symbol.iterator in value;
}

function isAsyncIterable(value: any): value is AsyncIterable<any> {
  return Symbol.asyncIterator in value;
}
