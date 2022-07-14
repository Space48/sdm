import BundleB2b from "./client";
import { resource, DocId, EndpointDefinition, Path } from "../../framework";
import { map, pipe } from "@space48/json-pipe";

export interface Query {
  [key: string]: any;
}

export namespace endpoint {
  export function crud(uriPattern: string, idField = "id") {
    const docUriPattern = `${uriPattern}/{id}`;

    return resource({
      endpoints: {
        create: create(uriPattern),
        list: list(uriPattern),
      },

      documents: {
        idField,

        listIds: listIds(uriPattern, idField),

        endpoints: {
          delete: del(docUriPattern),
          get: get(docUriPattern),
          update: update(docUriPattern),
        },
      },
    });
  }

  export function fn<I = any, O = any>(
    uriPattern: string,
    _fn: (
      client: BundleB2b,
      uri: string,
      data: I,
      path: ReadonlyArray<DocId>,
    ) => Promise<O> | AsyncIterable<O>,
  ): EndpointDefinition<BundleB2b, I, O> {
    return client =>
      ({ path, input }) => {
        const uri = UriTemplate.uri(uriPattern, Path.getDocIds(path));
        return _fn(client, uri, input, Path.getDocIds(path));
      };
  }

  export const create = (uriPattern: string) =>
    fn(uriPattern, (bB2bClient, uri, data: object) => bB2bClient.post<object>(uri, data));

  export const del = (uriPattern: string) =>
    fn(uriPattern, (bB2bClient, uri, data) => bB2bClient.delete(uri, data));

  export const get = (uriPattern: string) =>
    fn(uriPattern, (bB2bClient, uri, data: Query | undefined) => bB2bClient.get<object>(uri, data));

  export const list = (uriPattern: string) =>
    fn(uriPattern, (bB2bClient, uri, query: Query | undefined) =>
      bB2bClient.list<object>(uri, query),
    );

  export const update = (uriPattern: string) =>
    fn(uriPattern, (bB2bClient, uri, data: object) => bB2bClient.put<object>(uri, data));
}

export class UriTemplate {
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

export function listIds(uriPattern: string, idField = "id") {
  return (client: BundleB2b) => (path: Path) => {
    const uri = UriTemplate.uri(uriPattern, Path.getDocIds(path));
    const docs = client.list<Record<string, DocId>>(uri, { include_fields: [] });
    return pipe(
      docs,
      map(doc => doc[idField]),
    );
  };
}
