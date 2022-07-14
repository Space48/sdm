import {
  FlatMapAsyncOptions,
  flatMapAsync,
  pipe,
  compose,
  map,
  tap,
  Transform,
  groupWhile,
} from "@space48/json-pipe";
import * as t from "io-ts";
import { PathReporter } from "io-ts/lib/PathReporter";
import R from "ramda";

export function connector<Config, Scope, Resources extends ResourceDefinitionMap<Scope>>(
  definition: ConnectorDefinition<Config, Scope, Resources>,
): Connector<Config, Scope, Resources> {
  try {
    const resources = resourceMap(definition.resources, []);

    function scopeFactory(configArg: Config | MutableReference<Config>): ConnectorScope {
      const config =
        configArg instanceof MutableReference
          ? configArg
          : MutableReference.of(configArg, definition.configSchema);

      const _scope = definition.getScope(config);

      const executeCommands = commandExecutor(definition.resources, _scope);

      return {
        scopeName: definition.getScopeName(config.get()),

        connector,

        async getWarningMessage(): Promise<string | undefined | void> {
          return await definition.getWarningMessage?.(_scope);
        },

        async *execute(commandOrCommands: Command | AnyIterable<Command | State>): any {
          if (isIterable(commandOrCommands)) {
            yield* pipe(
              executeCommands(commandOrCommands),
              State.map(result => ({
                ...result,
                error:
                  result.error instanceof EndpointError
                    ? result.error.normalize()
                    : result.error instanceof Error
                    ? result.error.message
                    : result.error,
              })),
            );
          } else {
            const pathContainsWildcard = Path.containsWildcard(commandOrCommands.path);
            const outputElements = executeCommands([commandOrCommands]);
            if (pathContainsWildcard) {
              yield* pipe(
                outputElements,
                State.tap(({ success, error }) => {
                  if (!success) {
                    if (error instanceof Error) {
                      throw error;
                    }
                    throw Error(error);
                  }
                }),
                State.map(
                  (outputElement): OutputWithPath => ({
                    path: outputElement.path,
                    output: outputElement.output,
                  }),
                ),
              );
            } else {
              yield* pipe(
                outputElements,
                State.tap(({ success, error }) => {
                  if (!success) {
                    if (error instanceof Error) {
                      throw error;
                    }
                    throw Error(error);
                  }
                }),
                State.map(({ output }) => output),
              );
            }
          }
        },
      };
    }

    const connector = addPropertiesToFunction(scopeFactory, {
      ...resources,
      $definition: definition,
    }) as Connector<Config, Scope, Resources>;

    return connector;
  } catch (e) {
    throw new InvalidConnectorDefinition(e);
  }
}

export type ScopeRef = {
  connector: string;
  scope: string | null;
};

/**
 * this function can help with type inference in connectors -- don't use unless necessary for type inference
 */
export function resource<T extends ResourceDefinition>(resource: T): T {
  return resource;
}

export function resourceMerger<Scope>() {
  return <
    E1 extends EndpointDefinitionMap<Scope>,
    R1 extends ResourceDefinitionMap<Scope>,
    D1 extends DocumentDefinition<Scope>,
    E2 extends EndpointDefinitionMap<Scope>,
    R2 extends ResourceDefinitionMap<Scope>,
    D2 extends DocumentDefinition<Scope>,
  >(
    r1: ResourceDefinition<Scope, E1, R1, D1>,
    r2: ResourceDefinition<Scope, E2, R2, D2>,
  ) => {
    return R.mergeDeepRight(r1, r2) as ResourceDefinition<Scope, E1 & E2, R1 & R2, D1 & D2>;
  };
}

/**
 * A definition of a connector describing the required configuration and available
 * endpoints for that connector.
 */
export interface ConnectorDefinition<
  Config = any,
  Scope = any,
  Resources extends ResourceDefinitionMap<Scope> = ResourceDefinitionMap<Scope>,
> {
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

export type Connector<
  Config = any,
  Scope = any,
  Resources extends ResourceDefinitionMap<Scope> = {},
> = ResourceMap<Resources, false> & {
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
  execute<T extends Command | State>(
    commands: AnyIterable<T>,
  ): AsyncIterable<InferOutputElement<T>>;
}

/**
 * This type is distributive, so
 *  InferOutputElement<Command<A, B> | Command<C, D> | State<S1> | State<S2>>
 * will yield
 *  OutputElement<A, B> | OutputElement<C, D> | State<S1> | State<S2>
 */
type InferOutputElement<Input extends Command | State> = Input extends Command<
  infer InT,
  infer OutT,
  boolean
>
  ? OutputElement<InT, OutT>
  : Input extends State<infer StateT>
  ? State<StateT>
  : never;

export interface ResourceDefinitionMap<Scope = any> {
  readonly [key: string]: ResourceDefinition<Scope>;
}

export type ResourceMap<
  T extends ResourceDefinitionMap = ResourceDefinitionMap,
  MultiPath extends boolean = boolean,
> = { ___foobar: never } extends T
  ? {} // make it an error downstream to reference non-existent resources in paths
  : {
      [K in keyof T]: T[K] extends object & ResourceDefinition<any, infer E, infer R, infer D>
        ? Resource<E, R, D, MultiPath>
        : never;
    };

function resourceMap<T extends ResourceDefinitionMap>(resources: T, path: Path): ResourceMap<T> {
  return R.mapObjIndexed(
    (resource, name) => _resource(resource, path, name),
    resources,
  ) as ResourceMap<T>;
}

export interface ResourceDefinition<
  Scope = any,
  Endpoints extends EndpointDefinitionMap<Scope> = EndpointDefinitionMap<Scope>,
  Resources extends ResourceDefinitionMap<Scope> = ResourceDefinitionMap<Scope>,
  Documents extends DocumentDefinition<Scope> = DocumentDefinition<Scope>,
> {
  readonly endpoints?: Endpoints;
  readonly resources?: Resources;
  readonly documents?: Documents;
}

type Resource<
  Endpoints extends EndpointDefinitionMap = EndpointDefinitionMap,
  Resources extends ResourceDefinitionMap = ResourceDefinitionMap,
  Documents extends DocumentDefinition = DocumentDefinition,
  MultiPath extends boolean = boolean,
> = ResourceMap<Resources, MultiPath> &
  EndpointMap<Endpoints, MultiPath> &
  DocumentSelectors<Documents, MultiPath>;

function _resource(resource: ResourceDefinition, path: Path, name: string): Resource {
  return deepMerge(
    deepMerge(
      resourceMap(resource.resources ?? {}, [...path, name]),
      endpointMap(resource.endpoints ?? {}, [...path, name]),
    ),
    {
      $all: document(resource.documents ?? {}, [...path, [name, Path.WILDCARD]]),
      $doc: (id: DocId) => document(resource.documents ?? {}, [...path, [name, id]]),
    },
  );
}

interface DocumentSelectors<
  T extends DocumentDefinition = DocumentDefinition,
  MultiPath extends boolean = boolean,
> {
  $all: Document<T, true>; // todo -- only include $all if listIds() is defined on the resource
  $doc(id: DocId): Document<T, MultiPath>;
}

export interface DocumentDefinition<Scope = any> {
  idField?: string;
  listIds?(scope: Scope): (path: Path) => AsyncIterable<DocId>;
  readonly endpoints?: EndpointDefinitionMap<Scope>;
  readonly resources?: ResourceDefinitionMap<Scope>;
}

type Document<
  T extends DocumentDefinition = DocumentDefinition,
  MultiPath extends boolean = boolean,
> = (T["resources"] extends ResourceDefinitionMap ? ResourceMap<T["resources"], MultiPath> : {}) &
  (T["endpoints"] extends EndpointDefinitionMap ? EndpointMap<T["endpoints"], MultiPath> : {});

function document(document: DocumentDefinition, path: Path): Document {
  return deepMerge(
    resourceMap(document.resources ?? {}, path),
    endpointMap(document.endpoints ?? {}, path),
  );
}

export interface EndpointDefinitionMap<Scope = any> {
  readonly [key: string]: EndpointDefinition<Scope>;
}

type EndpointMap<
  T extends EndpointDefinitionMap = EndpointDefinitionMap,
  MultiPath extends boolean = boolean,
> = {
  [K in keyof T]: T[K] extends object ? Endpoint<T[K], MultiPath> : never;
};

function endpointMap(endpoints: EndpointDefinitionMap, path: Path): EndpointMap {
  return R.mapObjIndexed((_, name) => endpoint(path, name), endpoints);
}

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

export type DocId = number | string;

type Endpoint<
  T extends EndpointDefinition = EndpointDefinition,
  MultiPath extends boolean = boolean,
> = T extends EndpointDefinition<any, infer InT, infer OutT>
  ? undefined extends InT
    ? OptionalInputEndpointFns<InT, OutT, MultiPath>
    : MandatoryInputEndpointFns<InT, OutT, MultiPath>
  : never;

function endpoint(path: Path, endpoint: string): Endpoint {
  return input => ({ path, endpoint, input: input! });
}

interface OptionalInputEndpointFns<
  InTConstraint = any,
  OutTConstraint = any,
  MultiPath extends boolean = boolean,
> {
  <OutT extends OutTConstraint = OutTConstraint, InT extends InTConstraint = InTConstraint>(
    input?: InT,
  ): Command<typeof input, OutT, MultiPath>;
}

interface MandatoryInputEndpointFns<
  InTConstraint = any,
  OutTConstraint = any,
  MultiPath extends boolean = boolean,
> {
  <OutT extends OutTConstraint = OutTConstraint, InT extends InTConstraint = InTConstraint>(
    input: InT,
  ): Command<InT, OutT, MultiPath>;
}

export interface State<T = unknown> {
  state: T;
}

export interface Command<InT = unknown, OutT = unknown, MultiPath extends boolean = boolean>
  extends MessageHeader {
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

function createValidator<T>(schema: t.Type<T>): (value: T) => void {
  return value => {
    const result = schema.decode(value);
    if ("left" in result) {
      throw new Error(PathReporter.report(result).join("\n"));
    }
  };
}

/**
 * A deep merge which will merge functions with objects where necessary
 */
function deepMerge<
  X extends Function | Record<string, any>,
  Y extends Function | Record<string, any>,
>(x: X, y: Y): X & Y {
  if (typeof x === "function" && typeof y === "function") {
    throw new Error("Cannot merge two functions.");
  }
  if (typeof x === "function" && typeof y === "object") {
    return addPropertiesToFunction(x, y);
  }
  if (typeof y === "function" && typeof x === "object") {
    return addPropertiesToFunction(y, x);
  }
  if (typeof x === "object" && typeof y === "object") {
    const keys = new Set(Object.keys(x).concat(Object.keys(y)));
    const entries = [...keys].map(key => R.pair(key, deepMergeProperty(key, x, y)));
    return R.fromPairs(entries) as X & Y;
  }
  throw new Error();
}

function deepMergeProperty(property: string, x: Record<string, any>, y: Record<string, any>): any {
  if (property in x) {
    return property in y ? deepMerge(x, y) : x[property];
  }
  return y[property];
}

function addPropertiesToFunction<X extends Function, Y extends Record<string, any>>(
  fn: X,
  properties: Y,
): X & Y {
  const result: any = (...args: any[]) => fn(...args);
  Object.entries(properties).forEach(([key, value]) => (result[key] = value));
  return result;
}

export type Path = Path.Element[];

export namespace Path {
  export const WILDCARD = "*";
  export type DocIdWildcard = typeof WILDCARD;

  export type Element = string | [resource: string, documentId: DocId | DocIdWildcard];

  export function pop(path: Path): [head: Path, tail: Path.Element | undefined] {
    const head = path.slice(0, -1);
    const tail = path.slice(-1)[0];
    return [head, tail];
  }

  function popResourceName(path: Path): [head: Path, tail: string] {
    const [head, tail] = pop(path);
    if (typeof tail !== "string") {
      throw new InvalidPathError(path);
    }
    return [head, tail];
  }

  export function computeAllHeaders(
    host: ConnectorDefinition | ResourceDefinition | DocumentDefinition | {},
    path: Path = [],
  ): MessageHeader[] {
    const endpointNames = "endpoints" in host ? Object.keys(host.endpoints ?? {}) : [];
    const headers: MessageHeader[] = endpointNames.map(endpoint => ({ path, endpoint }));

    const resources = "resources" in host ? Object.entries(host.resources ?? {}) : [];

    let documentPaths: MessageHeader[];

    if ("documents" in host) {
      const supportsDocIdWildcard = host.documents?.listIds ? true : false;
      const docIdField = host.documents?.idField ?? "id";
      const docIdPattern = `${docIdField}${supportsDocIdWildcard ? `|${Path.WILDCARD}` : ""}`;
      const [prevPath, resourceName] = popResourceName(path);
      const documentsPath: Path = [...prevPath, [resourceName, docIdPattern]];

      documentPaths = Path.computeAllHeaders(host.documents ?? {}, documentsPath);
    } else {
      documentPaths = [];
    }

    return [
      ...headers,

      ...documentPaths,

      ...R.chain(
        ([resourceName, resource]) => Path.computeAllHeaders(resource, [...path, resourceName]),
        resources,
      ),
    ];
  }

  export function containsWildcard(path: Path): boolean {
    return path.some(element => Array.isArray(element) && element[1] === WILDCARD);
  }

  export class InvalidPathError extends Error {
    constructor(path: Path, message = "") {
      super(`Invalid path ${JSON.stringify(path)}. ${message}`);
    }
  }

  export function selector(
    resources: ResourceDefinitionMap,
  ): (path: Path) => ResourceDefinition | DocumentDefinition {
    return path => {
      if (path.length === 0) {
        throw new InvalidPathError(path);
      }

      return path.reduce(
        (host: { resources?: ResourceDefinitionMap }, element: Element) => {
          const resourceName = typeof element === "string" ? element : element[0];
          const resource = host.resources?.[resourceName];
          const _host = typeof element === "string" ? resource : resource?.documents;
          if (!_host) {
            throw new InvalidPathError(path);
          }
          return _host;
        },
        { resources },
      );
    };
  }

  export function endpointFnSelector<Scope>(resources: ResourceDefinitionMap<Scope>, scope: Scope) {
    const hostSelector = selector(resources);

    return <InT, OutT>(resourcePath: Path, endpointName: string) => {
      const endpointHost = hostSelector(resourcePath);
      if (!endpointHost.endpoints?.[endpointName]) {
        throw new InvalidPathError(
          resourcePath,
          `Endpoint '${endpointName}' does not exist on this resource.`,
        );
      }
      const endpoint = endpointHost.endpoints[endpointName] as EndpointDefinition<Scope, InT, OutT>;
      return endpoint(scope);
    };
  }

  export function endpointNamesSelector(
    resources: ResourceDefinitionMap,
  ): (path: Path) => string[] {
    const hostSelector = selector(resources);
    return path => Object.keys(hostSelector(path).endpoints ?? {});
  }

  export function getDocIds(path: Path): DocId[] {
    return path.filter(element => Array.isArray(element)).map(([, docId]) => docId);
  }

  /**
   * Expand a path so that a path containing document ID wildcards is mapped to n paths containing document IDs only
   */
  export function expander<Scope>(
    resources: ResourceDefinitionMap<Scope>,
    scope: Scope,
  ): (path: Path) => AsyncIterable<Path> {
    return async function* (path) {
      let _resources = resources;

      for (let i = 0; i < path.length; i++) {
        const pathElement = path[i];

        if (typeof pathElement === "string") {
          if (!_resources[pathElement]) {
            throw new InvalidPathError(
              path.slice(0, i + 1),
              `Resource '${pathElement}' does not exist.`,
            );
          }
          _resources = _resources[pathElement].resources ?? {};
          continue;
        }

        const [resourceName, docId] = pathElement;

        if (!_resources[resourceName]) {
          throw new InvalidPathError(
            path.slice(0, i + 1),
            `Resource '${resourceName}' does not exist.`,
          );
        }

        const documents = _resources[resourceName].documents ?? {};

        if (docId === WILDCARD) {
          if (!documents.listIds) {
            throw new InvalidPathError(
              path.slice(0, i + 1),
              "Wildcards are not supported for this resource.",
            );
          }
          const listIdsPath = [...path.slice(0, i), resourceName];
          const expandPath = expander(resources, scope);
          yield* pipe(
            documents.listIds(scope)(listIdsPath),
            map(docId => R.update(i, [resourceName, docId], path)),
            flatMapAsync({ concurrency: 10 }, expandPath),
          );
          return;
        }

        _resources = documents.resources ?? {};
      }

      yield path;
    };
  }
}

type CommandExecutor = <InT, OutT, StateT>(
  commands: AnyIterable<Command<InT, OutT> | State<StateT>>,
) => AsyncIterable<OutputElement<InT, OutT> | State<StateT>>;

type AnyIterable<T> = AsyncIterable<T> | Iterable<T>;

function commandExecutor<Scope>(
  resources: ResourceDefinitionMap<Scope>,
  scope: Scope,
): CommandExecutor {
  const selectEndpointFn = Path.endpointFnSelector(resources, scope);
  const expandPaths = Path.expander(resources, scope);

  return compose(
    ensureIterableIsAsync,
    State.flatMapAsync({ concurrency: 10 }, command =>
      pipe(
        expandPaths(command.path),
        map(path => ({ ...command, path })),
      ),
    ),
    State.flatMapAsync({ concurrency: 100 }, async function* <
      InT,
      OutT,
    >(command: Command<InT, OutT>) {
      const endpointFn = selectEndpointFn<InT, OutT>(command.path, command.endpoint);

      try {
        const endpointReturnValue = endpointFn({
          input: command.input,
          path: command.path,
          docId: Path.getDocIds(command.path),
        });

        if (isAsyncIterable(endpointReturnValue)) {
          for await (const output of endpointReturnValue) {
            yield {
              input: command.input,
              path: command.path,
              endpoint: command.endpoint,
              output,
              success: true,
            };
          }
        } else {
          yield {
            input: command.input,
            path: command.path,
            endpoint: command.endpoint,
            output: await endpointReturnValue,
            success: true,
          };
        }
      } catch (e) {
        yield {
          input: command.input,
          path: command.path,
          endpoint: command.endpoint,
          success: false,
          error: e,
        };
      }
    }),
  );
}

type CompoundReference<T extends Record<string, Reference>> = 1 extends 1
  ? Reference<{ readonly [K in keyof T]: T[K] extends Reference<infer U> ? U : never }>
  : never;

export class Reference<T = any> {
  static combine<Refs extends Record<string, Reference>>(refs: Refs): CompoundReference<Refs> {
    const unstablRef = new Reference(() =>
      R.mapObjIndexed(ref => ref.get(), refs),
    ) as CompoundReference<Refs>;
    // map will do equality checking; i.e. if the new computed value is equal to the previous one, we return the previous one
    const stableRef = unstablRef.map(v => v);
    return stableRef;
  }

  constructor(readonly get: () => T) {}

  map<U>(mapper: (config: T) => U): Reference<U> {
    let previousInput = this.get();
    let output = mapper(previousInput);

    return new Reference(() => {
      const currentInput = this.get();
      if (!R.equals(previousInput, currentInput)) {
        output = mapper(currentInput);
        previousInput = currentInput;
      }
      return output;
    });
  }
}

export class MutableReference<T = any> extends Reference<T> {
  static of<T>(initialValue: T, schema?: t.Type<T>): MutableReference<T> {
    let current = initialValue;
    const ref = new MutableReference(
      () => current,
      value => {
        current = value;
      },
    );
    return schema ? ref.withSchema(schema) : ref;
  }

  constructor(readonly get: () => T, readonly set: (value: T) => void) {
    super(get);
  }

  withSchema(schema: t.Type<T>): MutableReference<T> {
    const validate = createValidator(schema);
    validate(this.get());
    return new MutableReference(
      () => this.get(),
      value => {
        if (R.equals(this.get(), value)) {
          return;
        }
        validate(value);
        this.set(value);
      },
    );
  }
}

export class InvalidConnectorDefinition extends Error {}

export class InvalidCommand extends Error {}

function ensureIterableIsAsync<T>(iterable: AnyIterable<T>): AsyncIterable<T> {
  if (isSyncIterable(iterable)) {
    return (async function* () {
      yield* iterable;
    })();
  }
  return iterable;
}

function isIterable<T>(value: any): value is AnyIterable<T> {
  return isSyncIterable(value) || isAsyncIterable(value);
}

function isSyncIterable(value: any): value is Iterable<any> {
  return Symbol.iterator in value;
}

function isAsyncIterable(value: any): value is AsyncIterable<any> {
  return Symbol.asyncIterator in value;
}

export class EndpointError extends Error {
  readonly detail: any;

  constructor(message: string, options?: { detail?: any }) {
    super(message);
    this.detail = options?.detail;
  }

  normalize() {
    return {
      message: this.message,
      detail: this.detail || undefined,
    };
  }
}

/**
 * Pipeline functions which pass State directly through, unmodified, but *in order*
 *
 * I.e. when input is [Input<A> State<B> Input<C>], output is [Output<A> State<B> Output<C>]
 */
export abstract class State {
  private constructor() {}

  static of<T>(value: T): State<T> {
    return { state: value };
  }

  static isState<T = unknown>(value: any): value is State<T> {
    return "state" in value;
  }

  static map<StateT, InT, OutT>(
    mapper: (element: InT) => OutT,
  ): Transform<State<StateT> | InT, State<StateT> | OutT> {
    return map(element => (State.isState(element) ? element : mapper(element)));
  }

  static tap<StateT, InT>(
    fn: (element: InT) => void,
  ): Transform<State<StateT> | InT, State<StateT> | InT> {
    return tap(element => {
      if (!State.isState(element)) {
        fn(element);
      }
    });
  }

  static flatMapAsync<StateT, InT, OutT>(
    options: FlatMapAsyncOptions,
    mapper: (element: InT) => AsyncIterable<OutT>,
  ): Transform<State<StateT> | InT, State<StateT> | OutT> {
    return flatMapAsync(options, async function* (element) {
      if (State.isState(element)) {
        yield element;
      } else {
        yield* mapper(element);
      }
    });
  }

  static collectOutputs<T extends OutputElement | State>(
    outputs: AsyncIterable<T>,
  ): AsyncIterable<InferStatefulOutput<T>>;
  static collectOutputs<T extends OutputElement | State>(): Transform<T, InferStatefulOutput<T>>;
  static collectOutputs<T extends OutputElement | State>(outputs?: AsyncIterable<T>): any {
    if (!outputs) {
      return State.collectOutputs;
    }
    return pipe(
      outputs,
      groupWhile(element => !State.isState(element)),
      map(([stateElement, ...elements]): InferStatefulOutput<any> => {
        if (!State.isState(stateElement)) {
          throw new Error(
            "Stream must start with a `State` element in order to use `groupByState()`",
          );
        }
        return [stateElement.state, ...(elements as OutputElement[])];
      }),
    );
  }
}

type InferStatefulOutput<Input extends OutputElement | State> = 1 extends 1
  ? [
      state: Input extends State<infer StateT> ? StateT : never,
      ...outputs: ReadonlyArray<
        Input extends OutputElement<infer InT, infer OutT> ? OutputElement<InT, OutT> : never
      >,
    ]
  : never;
