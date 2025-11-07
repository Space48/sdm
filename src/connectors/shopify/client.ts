import * as t from "io-ts";
import pRetry from "p-retry";
import Shopify from "shopify-api-node";
import { EndpointError, MutableReference } from "../../framework";

export type Config = t.TypeOf<typeof configSchema>;

export const configSchema = t.type({
  shopName: t.string,
  credentials: t.type({
    apiKey: t.string,
    password: t.string,
  }),
});

export class Scope {
  constructor(private readonly config: MutableReference<Config>) {}

  private clientConfig?: Config = undefined;
  private _client?: Shopify = undefined;

  client(): Shopify {
    const currentConfig = this.config.get();
    if (
      !(
        currentConfig.shopName === this.clientConfig?.shopName &&
        currentConfig.credentials.apiKey === this.clientConfig?.credentials.apiKey &&
        currentConfig.credentials.password === this.clientConfig?.credentials.password
      )
    ) {
      const client = new Shopify({
        shopName: currentConfig.shopName,
        ...currentConfig.credentials,
        apiVersion: "2025-07",
      });
      const requestFn = (client as any).request.bind(client);
      (client as any).request = backoff(requestFn);
      this._client = client;
    }
    return this._client!;
  }

  async map(resourceKey: string, endpointKey: string, ids: any[], input?: any): Promise<any> {
    const client = this.client() as any;
    return client[resourceKey][endpointKey](...ids, input);
  }

  async *flatMap(
    resourceKey: string,
    endpointKey: string,
    ids: any[],
    input?: any,
  ): AsyncIterable<any> {
    let _params = { ...input, limit: 250 };
    do {
      const result = await this.map(resourceKey, endpointKey, ids, _params);
      yield* result;
      _params = (result as any).nextPageParameters;
    } while (_params);
  }

  async *listIds(
    resourceKey: string,
    endpointKey: string,
    ids: any[],
    input?: any,
  ): AsyncIterable<number> {
    for await (const item of this.flatMap(resourceKey, endpointKey, ids, input)) {
      yield item.id;
    }
  }
}

type Fn = (...args: any[]) => Promise<any>;
const backoff =
  <F extends Fn>(fn: F) =>
  (...args: Parameters<F>) => {
    const run = async () => {
      try {
        return await fn(...args);
      } catch (e: any) {
        const actionError = new EndpointError(e.message, {
          detail:
            typeof e.response?.body === "object" ? e.response.body.errors ?? e.response.body : null,
        });
        throw e.response?.statusCode == 429 ? actionError : new pRetry.AbortError(actionError);
      }
    };
    return pRetry(run, { retries: 50 });
  };
