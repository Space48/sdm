import fetch, { RequestInit } from "node-fetch";
import { stringify } from 'query-string'
import pRetry from "p-retry";
import * as t from 'io-ts'
import { EndpointError, MutableReference } from "../../framework";
import { Agent } from "https";
import R from "ramda";

const listConcurrency = 50;

export type Config = t.TypeOf<typeof configSchema>;

export const configSchema = t.type({
  storeAlias: t.string,
  storeHash: t.string,
  credentials: t.type({
    clientId: t.string,
    accessToken: t.string,
  }),
});

export default class BigCommerce {
  constructor(
    private readonly config: MutableReference<Config>,
  ) {}

	private static readonly agent = new Agent({
    keepAlive: true,
    maxSockets: Number.POSITIVE_INFINITY, // we rely on 429 errors rather than concurrency to regulate throughput
  });

  async get<T = any>(uri: string, params?: Record<string, any>): Promise<T> {
    return unwrap(await this.doGet(uri, params));
  }

  async* list<T = any>(uri: string, params?: Record<string, any>): AsyncIterable<T> {
    // a lot of list reqs involve a single page or don't support pagination, only do one req in those cases
    const firstPage = await this.doGet(uri, {page: 1, ...(params || {})});
    yield* unwrap(firstPage);

    const totalPages =
      uri.startsWith('v3')
        ? (firstPage.meta?.pagination ? computeNumPages(firstPage.meta.pagination) : 1)
        : Number.MAX_SAFE_INTEGER;

    const concurrency = Math.min(totalPages, listConcurrency);
    const threads = [...new Array(concurrency).keys()];
    for (let page = 2; page <= totalPages; page += concurrency) {
      const pages = await Promise.all(threads.map(
        threadId => this.get<T[]|null>(uri, {page: page + threadId, ...(params || {})})
      ));
      const nonNullPages = pages.filter(Boolean) as T[][];
      yield* R.flatten(nonNullPages);
      const lastPage = pages.slice(-1)[0];
      if (!lastPage?.length) {
        break;
      }
    }
  }

  async post<T = any>(uri: string, content: any): Promise<T> {
    return this.makeRequestWithContent('POST', uri, content);
  }

  async put<T = any>(uri: string, content: any): Promise<T> {
    return this.makeRequestWithContent('PUT', uri, content);
  }

  async patch<T = any>(uri: string, content: any): Promise<T> {
    return this.makeRequestWithContent('PATCH', uri, content);
  }

  async delete(uri: string, params?: Record<string, any>): Promise<void> {
    const paramsString = params ? `?${stringify(params)}` : '';
    return unwrap(await this.fetch(uri + paramsString, {
      ...params,
      method: 'DELETE',
    }));
  }

  private async doGet<T = any>(uri: string, params?: Record<string, any>): Promise<T> {
    const paramsString = params ? `?${stringify(params)}` : '';
    return await this.fetch(uri + paramsString);
  }

  private async makeRequestWithContent<T>(method: string, uri: string, content: any): Promise<T> {
    return unwrap(await this.fetch(uri, {
      method,
      headers: content && {
        'Content-Type': 'application/json',
      },
      body: content && JSON.stringify(content),
    }));
  }

  private async fetch(relativeUri: string, init?: RequestInit): Promise<any> {
    const config = this.config.get();
    const absoluteUri = `https://api.bigcommerce.com/stores/${config.storeHash}/${relativeUri}`;
    const initResolved = this.init(config, init);
    const response = await pRetry(
      async () => {
        const response = await fetch(absoluteUri, initResolved);
        if (response.status === 429) {
          throw new Error; // this will trigger a retry
        }
        return response;
      },
      {retries: 50}
    );
    if (!response.ok) {
      throw new EndpointError(`${response.status} ${response.statusText}`, {
        detail: await response.text()
          .then(JSON.parse)
          .then(data => (data.errors && JSON.stringify(data.errors) !== '{}' ? data.errors : data.title) || data)
          .catch(),
      });
    }
    if (response.status === 204) {
      return null;
    }
    return await response.json();
  }

  private init(config: Config, init?: RequestInit): RequestInit {
    const headers = {
      ...init?.headers,
      Accept: 'application/json',
      'X-Auth-Token': config.credentials.accessToken,
      'X-Auth-Client': config.credentials.clientId,
    }
    return {
      ...init,
      headers,
      agent: BigCommerce.agent,
    };
  }
}

function unwrap(content: any) {
  return content?.data === undefined ? content : content.data;
}

type V3Pagination = {
  total: number
  count: number
  per_page: number
  current_page: number
  total_pages: number
  links: {
    next: string
    current: string
  },
  too_many: false
};

function computeNumPages(pagination: V3Pagination): number {
  // note -- total_pages does not respect the actual page size, so we cannot use it
  return Math.ceil(pagination.total / pagination.count); 
}
