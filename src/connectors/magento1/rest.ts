import fetch, { RequestInit } from "node-fetch";
import { Agent } from "http";
import { stringify } from "query-string";
import open from "open";
import { OAuth } from "oauth";
import * as rl from "readline";
import { Reference } from "../../framework";
import * as t from "io-ts";
import R from "ramda";
import { useAgent } from "./functions";
import { mergeUnordered, pipe } from "@space48/json-pipe";

export type Magento1RestConfig = t.TypeOf<typeof magento1RestConfigSchema>;

export const magento1RestConfigSchema = t.type({
  credentials: t.type({
    key: t.string,
    secret: t.string,
  }),
  accessToken: t.type({
    token: t.string,
    tokenSecret: t.string,
  }),
});

export class Magento1RestClient {
  constructor(
    private baseUrl: Reference<string>,
    private agent: Reference<Agent>,
    private config: Reference<Magento1RestConfig | undefined>,
  ) {}

  async get<T>(uri: string, params?: QueryParams): Promise<T> {
    const paramsFlattened = params && flattenParams(params);
    const paramsString = paramsFlattened ? `?${stringify(paramsFlattened)}` : "";
    return await this.fetch(uri + paramsString);
  }

  async *search<T extends Record<string, any> = any>(
    uri: string,
    { sortKey, filters = [] }: { sortKey: string; filters?: Filter[] },
  ): AsyncIterable<T> {
    const [minId, maxId] = await Promise.all([
      this.getFirstItemId(uri, { sortKey, filters }, "asc"),
      this.getFirstItemId(uri, { sortKey, filters }, "desc"),
    ]);

    if (minId === null || maxId === null) {
      return;
    }

    const maxNumShards = 100;
    const pageSize = 100;
    const maxPossibleNumItems = Number(maxId) - Number(minId) + 1;
    const maxPossibleNumPages = Math.ceil(maxPossibleNumItems / pageSize);
    const numShards = Math.min(maxNumShards, maxPossibleNumPages);
    const idsPerShard = Math.ceil(maxPossibleNumItems / numShards);
    const shardFilters: Filter[][] = range(numShards).map(n => [
      [sortKey, "gteq", Number(minId) + idsPerShard * n],
      [sortKey, "lt", Number(minId) + idsPerShard * (n + 1)],
    ]);
    const shards = shardFilters.map(filters => this.searchRange(uri, { sortKey, filters }));
    yield* mergeUnordered(...shards);
  }

  private async getFirstItemId<T extends Record<string, any> = any>(
    uri: string,
    { sortKey, filters = [] }: { sortKey: string; filters?: Filter[] },
    dir: "asc" | "desc",
  ): Promise<string | number | null> {
    const content = await this.get<Record<string, T>>(uri, {
      filter: filters.map(([attribute, conditionType, value]) => ({
        attribute,
        [conditionType]: value,
      })),
      order: sortKey,
      dir,
      limit: 1,
    });
    const items = Object.values(content);
    if (items.length === 0) {
      return null;
    }
    return items.slice(-1)[0][sortKey] as string | number;
  }

  private async *searchRange<T extends Record<string, any> = any>(
    uri: string,
    { sortKey, filters = [] }: { sortKey: string; filters?: Filter[] },
  ): AsyncIterable<T> {
    let additionalFilters: Filter[] = [];
    while (1) {
      const content = await this.get<Record<string, T>>(uri, {
        filter: [...filters, ...additionalFilters].map(([attribute, conditionType, value]) => ({
          attribute,
          [conditionType]: value,
        })),
        order: sortKey,
        dir: "asc",
        limit: 100,
      });
      const items = Object.values(content);
      if (items.length === 0) {
        break;
      }
      yield* items;
      const lastId = items.slice(-1)[0][sortKey] as string | number;
      additionalFilters = [[sortKey, "gt", lastId]];
    }
  }

  async post<T>(uri: string, content: any): Promise<T> {
    return this.makeUnsafeRequest("POST", uri, content);
  }

  async put<T>(uri: string, content: any): Promise<T> {
    return this.makeUnsafeRequest("PUT", uri, content);
  }

  async patch<T>(uri: string, content: any): Promise<T> {
    return this.makeUnsafeRequest("PATCH", uri, content);
  }

  async delete<T>(uri: string, content?: any): Promise<T> {
    return this.makeUnsafeRequest("DELETE", uri, content);
  }

  private async makeUnsafeRequest<T>(method: string, uri: string, content: any): Promise<T> {
    return await this.fetch(uri, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
  }

  private async fetch<T>(relativeUri: string, init?: RequestInit): Promise<T> {
    return await useAgent(async () => {
      const url = `${this.baseUrl.get().replace(/\/+$/, "")}/api/rest/${relativeUri}`;
      const auth = this.authHeaderFn.get()(init?.method || "GET", url);
      const response = await fetch(url, this.init({ auth, init }));
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}\n\n${await response.text()}`);
      }
      return await response.json();
    });
  }

  private init({ auth, init }: { auth: string; init?: RequestInit }): RequestInit {
    const headers = {
      ...(init?.headers || {}),
      Authorization: auth,
      Accept: "application/json",
    };
    return {
      ...(init || {}),
      headers,
      agent: this.agent.get(),
    };
  }

  private authHeaderFn = Reference.combine({ baseUrl: this.baseUrl, rest: this.config }).map(
    ({ baseUrl, rest }) => {
      if (!rest) {
        throw new Error("REST has not been configured.");
      }

      const client = getOauthClient(baseUrl, rest.credentials);

      return (method: string, url: string) =>
        client.authHeader(url, rest.accessToken.token, rest.accessToken.tokenSecret, method);
    },
  );
}

export type QueryParams = { [param: string]: QueryParam };
type QueryParam = QueryParams | string | number | QueryParam[];

const flattenParams = R.pipe(
  (params: QueryParams) => R.toPairs(params),
  R.chain(([name, value]) => flattenParam(name, value)),
  pairs => R.fromPairs(pairs),
);

function flattenParam(name: string, value: QueryParam): [string, string][] {
  switch (typeof value) {
    case "string":
      return [[name, value]];

    case "number":
      return [[name, value.toString()]];

    case "object": {
      const entries = Array.isArray(value)
        ? value.map((_value, index) => [index + 1, _value])
        : Object.entries(value);
      return R.chain(([_name, _value]) => flattenParam(`${name}[${_name}]`, _value), entries);
    }

    case "undefined":
      return [];
  }
}

type FilterCondition = "eq" | "gt" | "gteq" | "lt" | "lteq" | "in";
type Filter = [string, FilterCondition, string | number | string[] | number[]];

export async function getAccessToken(
  baseUrl: string,
  credentials: Magento1RestConfig["credentials"],
): Promise<Magento1RestConfig["accessToken"]> {
  const oauth = getOauthClient(baseUrl, credentials);
  const { token, tokenSecret } = await new Promise<Magento1RestConfig["accessToken"]>(
    (resolve, reject) => {
      oauth.getOAuthRequestToken({ oauth_callback: "oob" }, (error, token, tokenSecret) => {
        if (error) {
          reject(error);
        } else {
          resolve({ token, tokenSecret });
        }
      });
    },
  );
  await open(`${baseUrl}/admin/oauth_authorize?oauth_token=${token}`);
  const readLine = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const verifierCode = await new Promise<string>(resolve =>
    readLine.question("Verifier code: ", resolve),
  );
  readLine.close();
  return await new Promise<Magento1RestConfig["accessToken"]>((resolve, reject) => {
    oauth.getOAuthAccessToken(token, tokenSecret, verifierCode, (error, token, tokenSecret) => {
      if (error) {
        reject(error);
      } else {
        resolve({ token, tokenSecret });
      }
    });
  });
}

function getOauthClient(baseUrl: string, credentials: Magento1RestConfig["credentials"]): OAuth {
  return new OAuth(
    `${baseUrl}/oauth/initiate`,
    `${baseUrl}/oauth/token`,
    credentials.key,
    credentials.secret,
    "1.0", // not 1.0a as per Magento docs
    null,
    "HMAC-SHA1",
  );
}

const range = (n: number) => Array.from(Array(n).keys());
