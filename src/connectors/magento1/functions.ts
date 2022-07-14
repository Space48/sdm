import { Magento1RestClient } from "./rest";
import { map, pipe } from "@space48/json-pipe";
import { DocId, EndpointDefinition, Path, resource, ResourceDefinition } from "../../framework";
import { Magento1SoapClient } from "./soap";
import R from "ramda";

export type Magento1Scope = {
  rest: Magento1RestClient;
  soap: Magento1SoapClient;
};

export class Soap {
  private constructor() {
    return
  }

  static list<T = any>(method: string): EndpointDefinition<Magento1Scope, any, T> {
    return ({ soap }) =>
      async function* ({ input: filters }) {
        const result = await soap.execute<T[] | null>(method, { filters: Soap.prepareFilters(filters) });
        if (result !== null) {
          yield* result;
        }
      };
  }

  private static prepareFilters(restStyleFilters: any[]) {
    return {
      complex_filter: {
        complexObjectArray: restStyleFilters.map(filter => {
          if (!(Array.isArray(filter) && filter.length === 3)) {
            throw new Error("Filters must of format [field, condition, value]");
          }
          return { key: filter[0], value: { key: filter[1], value: filter[2] } };
        }),
      },
    };
  }
}

type Children<Name extends string> = {
  [K in Name]: ResourceDefinition<Magento1Scope, { getRest: EndpointDefinition<Magento1Scope> }>;
};

export class Rest {
  private constructor() {
    return
  }

  static crud<ChildName extends string>(
    uriPattern: string,
    childNames: readonly ChildName[] = [],
  ) {
    const docUriPattern = `${uriPattern}/{id}`;

    return {
      endpoints: {
        createRest: Rest.create(uriPattern),
        listRest: Rest.list(uriPattern),
      },

      documents: {
        idField: "entity_id",

        listIds: Rest.listIds(uriPattern),

        endpoints: {
          deleteRest: Rest.del(docUriPattern),
          getRest: Rest.get(docUriPattern),
          updateRest: Rest.update(docUriPattern),
        },

        resources: Rest.children(docUriPattern, childNames),
      },
    };
  }

  static read<ChildName extends string>(
    uriPattern: string,
    childNames: readonly ChildName[] = [],
  ) {
    const docUriPattern = `${uriPattern}/{id}`;

    return {
      endpoints: {
        listRest: Rest.list(uriPattern),
      },

      documents: {
        idField: "entity_id",

        listIds: Rest.listIds(uriPattern),

        endpoints: {
          getRest: Rest.get(docUriPattern),
        },

        resources: Rest.children(docUriPattern, childNames),
      },
    };
  }

  private static children<Name extends string>(
    parentUri: string,
    children: readonly Name[],
  ): Children<Name> {
    return R.fromPairs(
      children.map(childName =>
        R.pair(
          childName,
          resource({
            endpoints: {
              getRest: Rest.get(`${parentUri}/childName`),
            },
          }),
        ),
      ),
    ) as Children<Name>;
  }

  private static fn<I = any, O = any>(
    uriPattern: string,
    _fn: (
      scope: Magento1RestClient,
      uri: string,
      data: I,
      path: ReadonlyArray<DocId>,
    ) => Promise<O> | AsyncIterable<O>,
  ): EndpointDefinition<Magento1Scope, I, O> {
    return ({ rest }) =>
      ({ path, input }) => {
        const uri = UriTemplate.uri(uriPattern, Path.getDocIds(path));
        return _fn(rest, uri, input, Path.getDocIds(path));
      };
  }

  static create = (uriPattern: string) =>
  Rest. fn(uriPattern, (m2Client, uri, data: object) => m2Client.post<object>(uri, data));

  static del = (uriPattern: string) =>
  Rest. fn(uriPattern, (m2Client, uri, data) => m2Client.delete(uri, data));

  static get = (uriPattern: string) =>
  Rest. fn(uriPattern, (m2Client, uri) => m2Client.get<object>(uri));

  static list = (uriPattern: string) =>
  Rest. fn(uriPattern, (m2Client, uri, filters) =>
      m2Client.search<object>(uri, { sortKey: "entity_id", filters }),
    );

  static update = (uriPattern: string) =>
  Rest. fn(uriPattern, (m2Client, uri, data: object) => m2Client.put<object>(uri, data));

  private static listIds(uriPattern: string) {
    return (scope: Magento1Scope) => (path: Path) => {
      const uri = UriTemplate.uri(uriPattern, Path.getDocIds(path));
      const docs = scope.rest.search<Record<string, DocId>>(uri, { sortKey: "entity_id" });
      return pipe(
        docs,
        map(doc => doc.entity_id),
      );
    };
  }
}

export async function useAgent<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    if (e instanceof Error && e.message.includes("socket hang up")) {
      return await fn();
    }
    throw e;
  }
}

class UriTemplate {
  static uri(uriTemplate: string, fieldValues: ReadonlyArray<DocId>): string {
    const uri = UriTemplate.applyValues(uriTemplate, fieldValues);
    const missingValues = UriTemplate.fields(uri);
    if (UriTemplate.fields(uri).length > 0) {
      throw new Error(`Missing URI fields ${missingValues.join(", ")}`);
    }
    return uri;
  }

  static applyValues(uriTemplate: string, fieldValues: ReadonlyArray<DocId>): string {
    return UriTemplate.fields(uriTemplate)
      .filter((field, index) => (fieldValues[index] ?? null) !== null)
      .reduce(
        (uri, field, index) => uri.replace(`{${field}}`, String(fieldValues[index])),
        uriTemplate,
      );
  }

  static fields(uriTemplate: string): string[] {
    // todo: convert to matchAll once we support ES2020
    return (
      uriTemplate.match(/\{[^}]+\}/g)?.map(match => match.substring(1, match.length - 1)) || []
    );
  }
}
