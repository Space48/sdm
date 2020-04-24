import * as commander from 'commander';
import * as credentials from './credentials';
import * as customer from './customer';
import * as order from './order';
import * as product from './product';
import { Config } from '../config';
import Shopify from 'shopify-api-node';
import pRetry from 'p-retry';

export function getCommands(config: Config<ConfigSchema>) {
    const credentialsConfig = config.select('credentials');
    const actionToCommand = commandFactory((shopName: string): Shopify => {
        const clientCredentials = credentials.getClientCredentials(credentialsConfig, shopName);
        const client = new Shopify({...clientCredentials, apiVersion: '2019-07'}) as any;
        const requestFn = client.request.bind(client);
        client.request = backoff(requestFn);
        return client;
    });
    return {
        creds: credentials.getCommands(credentialsConfig),
        customer: Object.entries(customer.actions).map(actionToCommand),
        order: Object.entries(order.actions).map(actionToCommand),
        product: Object.entries(product.actions).map(actionToCommand),
    };
}

export type ConfigSchema = {
    credentials: credentials.ConfigSchema,
};

type Action = (shopify: Shopify, ...args: any[]) => void | Promise<void>;
const commandFactory = (getClient: (shopName: string) => Shopify) => <T extends Action>([name, action]: [string, T]) => {
    const command = new commander.Command(name);
    command.arguments('<shop>');
    command.action((shopName: string) => action(getClient(shopName)));
    return command;
};

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
