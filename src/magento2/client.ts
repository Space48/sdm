import fetch, { RequestInit } from "node-fetch";
import { stringify } from 'query-string'
import { flatten, objectFromEntries } from "../util";
import { ScopeConfig } from "../resource-v2";
import * as t from 'io-ts'

export type Config = t.TypeOf<typeof configSchema>;

export const configSchema = t.intersection([
  t.type({
    baseUrl: t.string,
  }),
  t.partial({
    credentials: t.type({
      username: t.string,
      password: t.string,
    }),
    insecure: t.boolean,
    token: t.type({
      value: t.string,
      expiration: t.string,
    }),
  }),
]);

export default class Magento2 {
  constructor(
    private readonly config: ScopeConfig<Config>,
  ) {}

  async get<T>(uri: string, params?: QueryParams): Promise<T> {
    const paramsFlattened = params && flattenParams(params);
    const paramsString = paramsFlattened ? `?${stringify(paramsFlattened)}` : '';
    return await this.fetch(uri + paramsString);
  }

  async* search<T extends Record<string, any> = any>(
    uri: string,
    {sortKey, filters=[]}: {sortKey: SortKey, filters?: Filter[]}
  ): AsyncIterable<T> {
    let additionalFilters: Filter[] = [];
    while (1) {
      const items = await this.fetchSearchResultsPage<T>(uri, {
        filters: [...filters, ...additionalFilters],
        sortOrders: [[sortKey.query, 'asc']],
        pageSize: 100,
        currentPage: 1,
      });
      if (items.length === 0) {
        break;
      }
      yield* items;
      const lastId = items.slice(-1)[0][sortKey.response] as string|number;
      additionalFilters = [[
        sortKey.query,
        'gt',
        lastId,
      ]];
    }
  }

  async post<T>(uri: string, content: any): Promise<T> {
    return this.makeUnsafeRequest('POST', uri, content);
  }

  async put<T>(uri: string, content: any): Promise<T> {
    return this.makeUnsafeRequest('PUT', uri, content);
  }

  async patch<T>(uri: string, content: any): Promise<T> {
    return this.makeUnsafeRequest('PATCH', uri, content);
  }

  async delete<T>(uri: string, content?: any): Promise<T> {
    return this.makeUnsafeRequest('DELETE', uri, content);
  }

  private async fetchSearchResultsPage<T extends Record<string, any> = any>(
    uri: string,
    options: {filters?: Filter[], pageSize: number, currentPage?: number, sortOrders?: SortOrder[]}
  ): Promise<T[]> {
    const { filters=[], pageSize, currentPage=1, sortOrders=[] } = options;
    const {items} = await this.get<{items: T[]}>(uri, {
      searchCriteria: {
        filterGroups: filters.map(([field, conditionType, value]) => ({filters: [{field, conditionType, value}]})),
        sortOrders: sortOrders.map(([field, direction]) => ({field, direction})),
        pageSize,
        currentPage,
      }
    });
    return items;
  }

  private async makeUnsafeRequest<T>(method: string, uri: string, content: any): Promise<T> {
    return await this.fetch(uri, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    });
  }

  private async fetch<T>(relativeUri: string, init?: RequestInit): Promise<T> {
    let auth = await this.options?.auth?.({refresh: false});
    let response = await fetch(`${this.baseUrl}/rest/V1/${relativeUri}`, this.init({auth, init}));
    if (response.status === 401) {
      auth = await this.options?.auth?.({refresh: true});
      response = await fetch(`${this.baseUrl}/rest/V1/${relativeUri}`, this.init({auth, init}));
    }
    if (!response.ok) {
      const error = new Error(`${response.status} ${response.statusText}`);
      let responseBody: any = await response.text();
      try {
        responseBody = JSON.parse(responseBody);
      } catch (e) {}
      (error as any).response = {
        status: response.status,
        body: responseBody,
      }
      throw error;
    }
    return await response.json();
  }

  private init({auth, init}: {auth?: string, init?: RequestInit}): RequestInit {
    const headers = {
      ...init?.headers,
      ...(auth ? {Authorization: `Bearer ${auth}`} : {}),
      Accept: 'application/json',
    }
    return {
      ...(init || {}),
      headers,
      agent: this.agent,
    };
  }

  private async getToken(credentials: NonNullable<Config['credentials']>): Promise<NonNullable<Config['token']>> {
    const fourHoursFromNow = new Date(Date.now() + 4 * 3_600_000);
    const tokenValue = await this.post<string>('integration/admin/token', credentials);
    return {
      value: tokenValue,
      expiration: fourHoursFromNow.toISOString(),
    }
  }
}

export type QueryParams = {[param: string]: QueryParam};
type QueryParam = QueryParams | string | number | QueryParam[];

function flattenParams(params: QueryParams): Record<string, string> {
  const entries = Object.entries(params)
    .map(([name, value]) => flattenParam(name, value))
    .reduce(flatten, []) as [string, string][];
  return objectFromEntries(entries);
}

function flattenParam(name: string, value: QueryParam): string[][] {
  switch (typeof value) {
    case 'string':
      return [[name, value]];

    case 'number':
      return [[name, value.toString()]];

    case 'object': {
      const entries = Array.isArray(value)
        ? value.map((_value, index) => [index, _value])
        : Object.entries(value);
      return entries
        .map(([_name, _value]) => flattenParam(`${name}[${_name}]`, _value))
        .reduce(flatten, []);
    };

    case 'undefined':
      return [];
  }
}

export type Filter = [string, FilterCondition, string|number|string[]|number[]];

type FilterCondition = 'eq' | 'gt' | 'in';
type SortOrder = [string, 'asc'|'desc'];

export type SortKey = {
  query: string,
  response: string,
};
