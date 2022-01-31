import fetch from "node-fetch";
import { stringify } from 'query-string'
import { EndpointError, MutableReference } from "../../framework";
import * as t from 'io-ts'
import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";
import { parse as parseUrl } from "url";
import R from "ramda";
import { boolean } from "fp-ts";

export type Config = t.TypeOf<typeof configSchema>;

export const configSchema = t.intersection([
  t.type({
    baseUrl: t.string,
  }),
  t.partial({
    concurrency: t.number,
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

const defaultConcurrency = 3;

export default class Magento2 {
  constructor(
    private readonly config: MutableReference<Config>,
  ) {}

  async get<T>(uri: string, params?: QueryParams): Promise<T> {
    const paramsFlattened = params && flattenParams(params);
    const paramsString = paramsFlattened ? `?${stringify(paramsFlattened)}` : '';
    return await this.fetch({method: 'GET', uri: uri + paramsString, auth: true});
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

  async post<T>(uri: string, content: any, fetchAsynchronously?: boolean): Promise<T> {
    return this.fetch({method: 'POST', uri, content, auth: true, fetchAsynchronously});
  }

  async put<T>(uri: string, content: any, fetchAsynchronously?: boolean): Promise<T> {
    return this.fetch({method: 'PUT', uri, content, auth: true, fetchAsynchronously});
  }

  async patch<T>(uri: string, content: any): Promise<T> {
    return this.fetch({method: 'PATCH', uri, content, auth: true});
  }

  async delete<T>(uri: string, content?: any): Promise<T> {
    return this.fetch({method: 'DELETE', uri, content, auth: true});
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

  private async fetch<T>(options: {method: string, uri: string, content?: any, auth: boolean, fetchAsynchronously?: boolean}): Promise<T> {
    const async = (!!options.fetchAsynchronously) ? '/async' : '';
    const doFetch = (config: Config) => {
      return fetch(`${config.baseUrl}/rest${async}/V1/${options.uri}`, {
        headers: {
          Accept: 'application/json',
          ...(options.content ? { 'Content-Type': 'application/json' } : {}),
          ...(options.auth ? {Authorization: `Bearer ${config.token!.value}`} : {}),
        },
        method: options.method,
        body: options.content && JSON.stringify(options.content),
        agent: this.agent.get(),
      });
    }

    const currentConfig = this.config.get();
    const config = options.auth && !currentConfig.token ? await this.refreshToken() : currentConfig;
    let response = await doFetch(config);
    if (response.status === 401) {
      const updatedConfig = await this.refreshToken();
      response = await doFetch(updatedConfig);
    }

    if (!response.ok) {
      let detail: any = undefined; 
      try {
        detail = await response.json();
      } catch {}
      throw new EndpointError(`${response.status} ${response.statusText}`, {detail});
    }

    return await response.json();
  }

  private async refreshToken(): Promise<Config> {
    const config = this.config.get();
    if (!config.credentials) {
      throw new Error(`No Magento 2 credentials available for ${config.baseUrl}`);
    }
    const token = await this.getToken(config.credentials);
    const updatedConfig = {...config, token};
    this.config.set(updatedConfig);
    return updatedConfig;
  }

  private async getToken(credentials: NonNullable<Config['credentials']>): Promise<NonNullable<Config['token']>> {
    const fourHoursFromNow = new Date(Date.now() + 4 * 3_600_000);
    const tokenValue = await this.fetch<string>({
      method: 'POST',
      uri: 'integration/admin/token',
      content: credentials,
      auth: false
    });
    return {
      value: tokenValue,
      expiration: fourHoursFromNow.toISOString(),
    }
  }

  private readonly agent =
    this.config
      .map(config => ({
        protocol: parseUrl(config.baseUrl).protocol,
        agentOptions: {
          keepAlive: true,
          maxSockets: config.concurrency ?? defaultConcurrency,
        },
        httpsOptions: {
          rejectUnauthorized: !config.insecure,
        },
      }))
      .map(({protocol, agentOptions, httpsOptions}) => 
        protocol === 'https:'
          ? new HttpsAgent({ ...agentOptions, ...httpsOptions })
          : new HttpAgent(agentOptions)
      );
}

export type QueryParams = {[param: string]: QueryParam};
type QueryParam = QueryParams | string | number | QueryParam[];

const flattenParams = R.pipe(
  (params: QueryParams) => R.toPairs(params),
  R.chain(([name, value]) => flattenParam(name, value)),
  pairs => R.fromPairs(pairs),
);

function flattenParam(name: string, value: QueryParam): [string, string][] {
  switch (typeof value) {
    case 'string':
      return [[name, value]];

    case 'number':
      return [[name, value.toString()]];

    case 'object': {
      const entries = Array.isArray(value)
        ? value.map((_value, index) => [index + 1, _value])
        : Object.entries(value);
      return R.chain(([_name, _value]) => flattenParam(`${name}[${_name}]`, _value), entries);
    };

    case 'undefined':
      return [];
  }
}

export type Filter = [string, FilterCondition, string|number|string[]|number[]];

type FilterCondition =
  | 'eq'
  | 'finset'
  | 'from'
  | 'gt'
  | 'gteq'
  | 'in'
  | 'like'
  | 'lt'
  | 'lteq'
  | 'moreq'
  | 'neq'
  | 'nfinset'
  | 'nin'
  | 'notnull'
  | 'null'
  | 'to';
type SortOrder = [string, 'asc'|'desc'];

export type SortKey = {
  query: string,
  response: string,
};
