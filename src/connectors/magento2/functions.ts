import Magento2, { Filter, SortKey } from "./client";
import { DocId, EndpointDefinition, Path } from "../../framework";
import { map, pipe } from "@space48/json-pipe";

type CrudOptions = {
  idField: string;
  list: {
    uri?: string;
    sortKey: SortKey;
    idField?: string;
  };
};

export class endpoint {
  private constructor() {
    return;
  }

  static crud<T extends CrudOptions>(uriPattern: string, options: T) {
    const docUriPattern = `${uriPattern}/{id}`;

    return {
      endpoints: {
        create: endpoint.create(uriPattern),
        createAsync: endpoint.createAsync(uriPattern),
        list: endpoint.list(options.list.uri ?? uriPattern, options.list.sortKey),
      },

      documents: {
        idField: options.idField,

        listIds: listIds(
          options.list.uri ?? uriPattern,
          options.list.idField ?? options.idField,
          options.list.sortKey,
        ),

        endpoints: {
          delete: endpoint.del(docUriPattern),
          get: endpoint.get(docUriPattern),
          update: endpoint.update(docUriPattern),
        },
      },
    };
  }

  static fn<I = any, O = any>(
    uriPattern: string,
    _fn: (
      client: Magento2,
      uri: string,
      data: I,
      path: ReadonlyArray<DocId>,
    ) => Promise<O> | AsyncIterable<O>,
  ): EndpointDefinition<Magento2, I, O> {
    return client =>
      ({ path, input }) => {
        const uri = UriTemplate.uri(uriPattern, Path.getDocIds(path));
        return _fn(client, uri, input, Path.getDocIds(path));
      };
  }

  static create = (uriPattern: string) =>
    endpoint.fn(uriPattern, (m2Client, uri, data: object) => m2Client.post<object>(uri, data));

  static createAsync = (uriPattern: string) =>
    endpoint.fn(uriPattern, (m2Client, uri, data: object) =>
      m2Client.post<object>(uri, data, true),
    );

  static del = (uriPattern: string) =>
    endpoint.fn(uriPattern, (m2Client, uri, data) => m2Client.delete(uri, data));

  static get = (uriPattern: string) =>
    endpoint.fn(uriPattern, (m2Client, uri) => m2Client.get<object>(uri));

  static list = (uriPattern: string, sortKey: SortKey) =>
    endpoint.fn(uriPattern, (m2Client, uri, filters: Filter[] | undefined) =>
      m2Client.search<object>(uri, { sortKey, filters }),
    );

  static update = (uriPattern: string) =>
    endpoint.fn(uriPattern, (m2Client, uri, data: object) => m2Client.put<object>(uri, data));

  static updateAsync = (uriPattern: string) =>
    endpoint.fn(uriPattern, (m2Client, uri, data: object) => m2Client.put<object>(uri, data, true));

  static updateAsyncTEST = (uriPattern: string) =>
    endpoint.fn(uriPattern, (m2Client, uri, data: object) => m2Client.put<object>(uri, data, true));
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

function listIds(uriPattern: string, idField: string, sortKey: SortKey) {
  return (client: Magento2) => (path: Path) => {
    const uri = UriTemplate.uri(uriPattern, Path.getDocIds(path));
    const docs = client.search<Record<string, DocId>>(uri, { sortKey });
    return pipe(
      docs,
      map(doc => doc[idField]),
    );
  };
}
