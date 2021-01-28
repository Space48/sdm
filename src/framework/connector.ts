import { flatMapAsync, pipe, compose, map, tap } from '@space48/json-pipe';
import * as t from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'
import R from "ramda";

export function connector<
  Config,
  Scope,
  Resources extends ResourceDefinitionMap<Scope>
>(
  definition: ConnectorDefinition<Config, Scope, Resources>,
): Connector<Config, Scope, Resources> {
  try {
    const resources = resourceMap(definition.resources, []);
    
    function scopeFactory(configArg: Config | ScopeConfig<Config>): ConnectorScope {
      const config = ScopeConfig.resolve(definition.configSchema, configArg);

      const _scope = definition.getScope(config);
      
      const executeCommands = commandExecutor(definition.resources, _scope);

      return {
        scopeName: definition.getScopeName(config.get()),

        connector,
        
        async getWarningMessage(): Promise<string|undefined|void> {
          return await definition.getWarningMessage?.(_scope);
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
                    if (error instanceof Error) {
                      throw error;
                    }
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
                    if (error instanceof Error) {
                      throw error;
                    }
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
    
    const connector = addPropertiesToFunction(
      scopeFactory,
      {...resources, $definition: definition},
    ) as Connector<Config, Scope, Resources>;

    return connector;
  } catch (e) {
    throw new InvalidConnectorDefinition(e);
  }
}

export type ScopeRef = {
  connector: string
  scope: string
};

/**
 * this function can help with type inference in connectors -- don't use unless necessary for type inference
 */
export function resource<T extends ResourceDefinition>(resource: T): T {
  return resource;
}

export function resourceMerger<Scope>() {
  return <
    E1 extends EndpointDefinitionMap<Scope>, R1 extends ResourceDefinitionMap<Scope>, D1 extends DocumentDefinition<Scope>,
    E2 extends EndpointDefinitionMap<Scope>, R2 extends ResourceDefinitionMap<Scope>, D2 extends DocumentDefinition<Scope>,
  >(r1: ResourceDefinition<Scope, E1, R1, D1>, r2: ResourceDefinition<Scope, E2, R2, D2>) => {
    return R.mergeDeepRight(r1, r2) as ResourceDefinition<Scope, E1&E2, R1&R2, D1&D2>;
  }
}

export interface ConnectorDefinition<
  Config = any,
  Scope = any,
  Resources extends ResourceDefinitionMap<Scope> = ResourceDefinitionMap<Scope>,
> {
  readonly configSchema: t.Type<Config>
  readonly resources: Resources
  getScope(config: ScopeConfig<Config>): Scope
  getScopeName(config: Config): string
  getWarningMessage(scope: Scope): Promise<string|undefined|void>
}

export type Connector<
  Config = any,
  Scope = any,
  Resources extends ResourceDefinitionMap<Scope> = {},
> = ResourceMap<Resources, false> & {
  $definition: ConnectorDefinition<Config, Scope, Resources>
  (config: Config | ScopeConfig<Config>): ConnectorScope
}

export interface ConnectorScope {
  scopeName: string
  connector: Connector
  getWarningMessage(): Promise<string|undefined|void>
  execute<OutT>(command: Command<any, OutT, false>): AsyncIterable<OutT>
  execute<OutT>(command: Command<any, OutT, true>): AsyncIterable<OutputWithPath<OutT>>
  execute<OutT>(command: Command<any, OutT, boolean>): AsyncIterable<OutT | OutputWithPath<OutT>>
  execute<InT, OutT>(commands: Iterable<Command<InT, OutT>> | AsyncIterable<Command<InT, OutT>>): AsyncIterable<OutputElement<InT, OutT>>
}

export interface ResourceDefinitionMap<Scope = any> {
  readonly [key: string]: ResourceDefinition<Scope>
}

export type ResourceMap<
  T extends ResourceDefinitionMap = ResourceDefinitionMap,
  MultiPath extends boolean = boolean,
> = {
  [K in keyof T]:
    T[K] extends ResourceDefinition<any, infer E, infer R, infer D>
      ? Resource<E, R, D, MultiPath>
      : never
};

function resourceMap<T extends ResourceDefinitionMap>(resources: T, path: Path): ResourceMap<T> {
  return R.mapObjIndexed(
    (resource, name) => _resource(resource, path, name),
    resources
  ) as ResourceMap<T>;
}

export interface ResourceDefinition<
  Scope = any,
  Endpoints extends EndpointDefinitionMap<Scope> = EndpointDefinitionMap<Scope>,
  Resources extends ResourceDefinitionMap<Scope> = ResourceDefinitionMap<Scope>,
  Documents extends DocumentDefinition<Scope> = DocumentDefinition<Scope>,
> {
  readonly endpoints?: Endpoints
  readonly resources?: Resources
  readonly documents?: Documents
}

type Resource<
  Endpoints extends EndpointDefinitionMap = EndpointDefinitionMap,
  Resources extends ResourceDefinitionMap = ResourceDefinitionMap,
  Documents extends DocumentDefinition = DocumentDefinition,
  MultiPath extends boolean = boolean,
> = ResourceMap<Resources, MultiPath>
  & EndpointMap<Endpoints, MultiPath>
  & DocumentSelectors<Documents, MultiPath>;

function _resource(resource: ResourceDefinition, path: Path, name: string): Resource {
  return deepMerge(
    deepMerge(
      resourceMap(resource.resources ?? {}, [...path, name]),
      endpointMap(resource.endpoints ?? {}, [...path, name]),
    ),
    {
      $all: document(resource.documents ?? {}, [...path, [name, Path.WILDCARD]]),
      $doc: (id: DocId) => document(resource.documents ?? {}, [...path, [name, id]]),
    }
  );
}

interface DocumentSelectors<
  T extends DocumentDefinition = DocumentDefinition,
  MultiPath extends boolean = boolean,
> {
  $all: Document<T, true> // todo -- only include $all if listIds() is defined on the resource
  $doc(id: DocId): Document<T, MultiPath>
}

export interface DocumentDefinition<Scope = any> {
  idField?: string
  listIds?(scope: Scope): (path: Path) => AsyncIterable<DocId>
  readonly endpoints?: EndpointDefinitionMap<Scope>
  readonly resources?: ResourceDefinitionMap<Scope>
}

type Document<
  T extends DocumentDefinition = DocumentDefinition,
  MultiPath extends boolean = boolean,
> = (T['resources'] extends ResourceDefinitionMap ? ResourceMap<T['resources'], MultiPath> : {})
  & (T['endpoints'] extends EndpointDefinitionMap ? EndpointMap<T['endpoints'], MultiPath> : {});

function document(document: DocumentDefinition, path: Path): Document {
  return deepMerge(
    resourceMap(document.resources ?? {}, path),
    endpointMap(document.endpoints ?? {}, path),
  );
}

export interface EndpointDefinitionMap<Scope = any> {
  readonly [key: string]: EndpointDefinition<Scope>
}

type EndpointMap<
  T extends EndpointDefinitionMap = EndpointDefinitionMap,
  MultiPath extends boolean = boolean,
> = {
  [K in keyof T]: T[K] extends object ? Endpoint<T[K], MultiPath> : never
};

function endpointMap(endpoints: EndpointDefinitionMap, path: Path): EndpointMap {
  return R.mapObjIndexed((_, name) => endpoint(path, name), endpoints);
}

export interface EndpointDefinition<Scope = unknown, InT = any, OutT = any> {
  (scope: Scope): EndpointFn<InT, OutT>
}

export interface EndpointFn<InT = unknown, OutT = unknown> {
  (input: EndpointPayload<InT>): Promise<OutT> | AsyncIterable<OutT>
}

export interface EndpointPayload<T = undefined> {
  readonly path: Path
  readonly input: T
}

export type DocId = number | string;

type Endpoint<
  T extends EndpointDefinition = EndpointDefinition,
  MultiPath extends boolean = boolean,
> =
  T extends EndpointDefinition<any, undefined, infer OutT> & EndpointDefinition<any, infer InT, infer OutT> ? OptionalInputEndpointFns<InT, OutT, MultiPath>
  : T extends EndpointDefinition<any, infer InT, infer OutT> ? MandatoryInputEndpointFns<InT, OutT, MultiPath>
  : never;

function endpoint(path: Path, endpoint: string): Endpoint {
  return input => ({ path: [...path, endpoint], input });
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

export interface Command<
  InT = unknown,
  OutT = unknown,
  MultiPath extends boolean = boolean,
> {
  path: Path
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
      throw new Error(PathReporter.report(result).join('\n'));
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

  export function pop(path: Path): [head: Path, tail: Path.Element | undefined] {
    const head = path.slice(0, -1);
    const tail = path.slice(-1)[0];
    return [head, tail];
  }

  export function popResourceName(path: Path): [head: Path, tail: string] {
    const [head, tail] = pop(path);
    if (typeof tail !== 'string') {
      throw new InvalidPathError(path);
    }
    return [head, tail];
  }

  export function popEndpointName(path: Path): [resourcePath: Path, endpointName: string] {
    const [head, tail] = pop(path);
    if (head.length === 0 || typeof tail !== 'string') {
      throw new InvalidPathError(path);
    }
    return [head, tail];
  }

  export function containsWildcard(path: Path): boolean {
    return path.some(element => Array.isArray(element) && element[1] === WILDCARD);
  }

  export class InvalidPathError extends Error {
    constructor(path: Path, message: string = '') {
      super(`Invalid path ${JSON.stringify(path)}. ${message}`);
    }
  }

  export function selector(resources: ResourceDefinitionMap): (path: Path) => ResourceDefinition | DocumentDefinition {
    return path => {
      if (path.length === 0) {
        throw new InvalidPathError(path);
      }

      return path.reduce(
        (host: {resources?: ResourceDefinitionMap}, element: Element) => {
          const resourceName = typeof element === 'string' ? element : element[0];
          const resource = host.resources?.[resourceName];
          const _host = typeof element === 'string' ? resource : resource?.documents;
          if (!_host) {
            throw new InvalidPathError(path);
          }
          return _host;
        },
        {resources},
      )
    }
  }

  export function endpointFnSelector<Scope>(resources: ResourceDefinitionMap<Scope>, scope: Scope) {
    const hostSelector = selector(resources);

    return <InT, OutT>(path: Path) => {
      const [resourcePath, endpointName] = Path.popEndpointName(path);
      const endpointHost = hostSelector(resourcePath);
      if (!endpointHost.endpoints?.[endpointName]) {
        throw new InvalidPathError(path, `Endpoint '${endpointName}' does not exist on this resource.`);
      }
      const endpoint = endpointHost.endpoints[endpointName] as EndpointDefinition<Scope, InT, OutT>;
      return endpoint(scope);
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
  export function expander<Scope>(resources: ResourceDefinitionMap<Scope>, scope: Scope): (path: Path) => AsyncIterable<Path> {
    return async function* (path) {
      let _resources = resources;

      for (let i = 0; i < path.length - 1; i++) {
        const pathElement = path[i];

        if (typeof pathElement === 'string') {
          if (!_resources[pathElement]) {
            throw new InvalidPathError(path.slice(0, i + 1), `Resource '${pathElement}' does not exist.`);
          }
          _resources = _resources[pathElement].resources ?? {};
          continue;
        }

        const [resourceName, docId] = pathElement;

        if (!_resources[resourceName]) {
          throw new InvalidPathError(path.slice(0, i + 1), `Resource '${resourceName}' does not exist.`);
        }

        const documents = _resources[resourceName].documents ?? {};

        if (docId === WILDCARD) {
          if (!documents.listIds) {
            throw new InvalidPathError(path.slice(0, i + 1), 'Wildcards are not supported for this resource.');
          }
          const listIdsPath = [...path.slice(0, i), resourceName];
          const expandPath = expander(resources, scope);
          yield* pipe(
            documents.listIds(scope)(listIdsPath),
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

type CommandExecutor =
  <InT, OutT>(commands: AnyIterable<Command<InT, OutT>>) => AsyncIterable<OutputElement<InT, OutT>>;

type AnyIterable<T> = AsyncIterable<T> | Iterable<T>;

function commandExecutor<Scope>(
  resources: ResourceDefinitionMap<Scope>,
  scope: Scope,
): CommandExecutor {
  const selectEndpointFn = Path.endpointFnSelector(resources, scope);
  const expandPaths = Path.expander(resources, scope);

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
        const endpointFn = selectEndpointFn<InT, OutT>(command.path);

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

export class ScopeConfig<T> {
  static resolve<T>(
    configSchema: t.Type<T>,
    config: T | ScopeConfig<T>,
  ): ScopeConfig<T> {
    return config instanceof ScopeConfig
      ? config
      : new ScopeConfig(configSchema, config);
  }

  constructor(
    schema: t.Type<T>,
    private value: T,
    private onChange?: (state: T) => void
  ) {
    this.validate = configValidator(schema);
    this.validate(value);
  }

  private readonly validate: (config: T) => void;

  get(): T {
    return this.value;
  }

  set(value: T) {
    this.validate(value);
    this.value = value;
    this.onChange?.(value);
  }
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

export class CommandError extends Error {
  readonly detail: any;

  constructor({message, detail}: {message?: string, detail?: any}) {
    super(message);
    this.detail = detail;
  }
}
