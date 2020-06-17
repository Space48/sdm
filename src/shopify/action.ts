import { Config } from "../config";
import { ConfigSchema } from ".";
import { getClientCredentials } from './credentials';
import Shopify from "shopify-api-node";
import pRetry from "p-retry";
import { ResourceKey, getParentKeyPath } from "./resource";
import { Field, Fields, FieldValues, Action } from "../action";
import { objectFromEntries } from "../util";

export enum ActionType { Source, NoIdSource, List, NoIdList, Sink, NoIdSink };

const endpointTypesNotRequiringId = [ActionType.NoIdSource, ActionType.NoIdSink, ActionType.NoIdList];

export class ShopifyActionFactory {
    constructor(private config: Config<ConfigSchema>) {}

    create(resourceKey: ResourceKey, endpointName: string, endpointType: ActionType): Action {
        const parentIdPath = getParentKeyPath(resourceKey).map(key => `${key}Id`).map(camelCaseToUnderscore);
        const idPath = endpointTypesNotRequiringId.includes(endpointType) ? parentIdPath : parentIdPath.concat('id');
        const idFields = objectFromEntries(idPath.map(name => [name, Field.integer().required()]));
        const fn = (shopify: Shopify, idMap: Record<string, number>, shopifyParams?: any) => {
            const ids = idPath.map(idField => idMap[idField]);
            return (shopify as any)[resourceKey][endpointName](...ids, shopifyParams);
        };
        switch (endpointType) {
            case ActionType.NoIdSource:
            case ActionType.Source:
                return this.source(endpointName, idFields, fn);
            case ActionType.NoIdList:
            case ActionType.List:
                return this.list(endpointName, idFields, fn);
            case ActionType.NoIdSink:
            case ActionType.Sink:
                return this.sink(endpointName, idFields, fn);
            default:
                throw new Error(`No endpoint type specified for ${resourceKey}.${endpointName}`);
        }
    }

    private source<P extends Fields>(endpointName: string, params: P, fn: (client: Shopify, paramValues: FieldValues<P>) => any) {
        return Action.source({
            name: endpointName,
            context: ShopifyActionFactory.clientContext,
            params,
            fn: context => {
                const client = this.getClient(context);
                return paramValues => fn(client, paramValues);
            },
        });
    }

    private list<P extends Fields>(endpointName: string, params: P, fn: (client: Shopify, paramValues: FieldValues<P>, shopifyParams: any) => any) {
        return Action.source({
            name: endpointName,
            context: ShopifyActionFactory.clientContext,
            params,
            concurrency: {default: 10},
            fn: context => {
                const client = this.getClient(context);
                return async function* (paramValues) {
                    let _params = { limit: 250 };
                    do {
                        const result = await fn(client, paramValues, _params);
                        yield* result;
                        _params = (result as any).nextPageParameters;
                    } while (_params);
                }
            },
        });
    }

    private sink<P extends Fields>(endpointName: string, params: P, fn: (client: Shopify, paramValues: FieldValues<P>, shopifyParams: any) => any) {
        return Action.sink({
            name: endpointName,
            context: ShopifyActionFactory.clientContext,
            params,
            concurrency: {default: 10},
            fn: context => {
                const client = this.getClient(context);
                return (input, paramValues) => fn(client, paramValues, input);
            },
        });
    }

    private static clientContext = {
        shop: Field.string().required(),
    };

    private getClient({shop}: {shop: string}): Shopify {
        const clientCredentials = getClientCredentials(this.config.select('credentials'), shop);
        const client = new Shopify({...clientCredentials, apiVersion: '2019-10'}) as any;
        const requestFn = client.request.bind(client);
        client.request = backoff(requestFn);
        return client;
    }
}

type Fn = (...args: any[]) => Promise<any>;
const backoff = <F extends Fn>(fn: F) => (...args: Parameters<F>) => {
    const run = async () => {
        try {
            return await fn(...args);
        } catch (e) {
            throw e.response?.statusCode == 429 ? e : new pRetry.AbortError(e);
        }
    };
    return pRetry(run, {retries: 50});
};

function camelCaseToUnderscore(value: string): string {
    return value.replace(/([A-Z])/g, g => `_${g[0].toLowerCase()}`);
}
