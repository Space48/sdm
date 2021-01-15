import Magento2, { Filter, SortKey } from './client';
import { resource, DocId, Endpoint, Path } from '../resource-v2';
import { map, pipe } from '@space48/json-pipe';

export namespace endpoint {
  type CrudOptions = {
    idField: string
    list: {
      uri?: string,
      sortKey: SortKey
      idField?: string
    },
  };

  export function crud<T extends CrudOptions>(uriPattern: string, options: T) {
    const docUriPattern = `${uriPattern}/{id}`;

    return resource({
      endpoints: {
        create: create(uriPattern),
        list: list(options.list.uri ?? uriPattern, options.list.sortKey),
      },

      documents: {
        idField: options.idField,

        listIds: listIds(
          options.list.uri ?? uriPattern,
          options.list.idField ?? options.idField,
          options.list.sortKey,
        ),

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
    _fn: (client: Magento2, uri: string, data: I, path: ReadonlyArray<DocId>) => Promise<O> | AsyncIterable<O>
  ): Endpoint<Magento2, I, O> {
    return client => ({path, input}) => {
      const uri = UriTemplate.uri(uriPattern, Path.getDocIds(path));
      return _fn(client, uri, input, Path.getDocIds(path));
    };
  }

  export const create = (uriPattern: string) =>
    fn(uriPattern, (m2Client, uri, data: object) => m2Client.post<object>(uri, data));

  export const del = (uriPattern: string) =>
    fn(uriPattern, (m2Client, uri, data) => m2Client.delete(uri, data));
  
  export const get = (uriPattern: string) =>
    fn(uriPattern, (m2Client, uri) => m2Client.get<object>(uri));

  export const list = (uriPattern: string, sortKey: SortKey) =>
    fn(uriPattern, (m2Client, uri, filters: Filter[]|undefined) => m2Client.search<object>(uri, { sortKey, filters }));

  export const update = (uriPattern: string) =>
    fn(uriPattern, (m2Client, uri, data: object) => m2Client.put<object>(uri, data));
}

export class UriTemplate {
  static uri(uriTemplate: string, fieldValues: ReadonlyArray<DocId>): string {
    const uri = UriTemplate.applyValues(uriTemplate, fieldValues);
    const missingValues = UriTemplate.fields(uri);
    if (UriTemplate.fields(uri).length > 0) {
      throw new Error(`Missing URI fields ${missingValues.join(', ')}`);
    }
    return uri;
  }

  static applyValues(uriTemplate: string, fieldValues: ReadonlyArray<DocId>): string {
    return UriTemplate.fields(uriTemplate)
      .filter((field, index) => (fieldValues[index] ?? null) !== null)
      .reduce((uri, field, index) => uri.replace(`{${field}}`, String(fieldValues[index])), uriTemplate);
  }

  static fields(uriTemplate: string): string[] {
    // todo: convert to matchAll once we support ES2020
    return uriTemplate.match(/\{[^}]+\}/g)?.map(match => match.substring(1, match.length - 1)) || [];
  }
}

function listIds(uriPattern: string, idField: string, sortKey: SortKey) {
  return (client: Magento2) => (path: Path) => {
    const uri = UriTemplate.uri(uriPattern, Path.getDocIds(path));
    const docs = client.search<Record<string, DocId>>(uri, { sortKey });
    return pipe(docs, map(doc => doc[idField]));
  };
}
