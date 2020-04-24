import * as commander from 'commander';
import * as brand from './brand';
import * as category from './category';
import * as credentials from './credentials';
import * as product from './product';
import * as store from './store';
import { Config } from '../config';
import BigCommerce from './client';

export function getCommands(config: Config<ConfigSchema>) {
    const credentialsConfig = config.select('credentials');
    const actionToCommand = commandFactory((storeHash: string): BigCommerce => {
        const clientCredentials = credentials.getClientCredentials(credentialsConfig, storeHash);
        return new BigCommerce(clientCredentials);
    });
    return {
        brand: Object.entries(brand.actions).map(actionToCommand),
        category: Object.entries(category.actions).map(actionToCommand),
        creds: credentials.getCommands(credentialsConfig),
        product: Object.entries(product.actions).map(actionToCommand),
        store: Object.entries(store.actions).map(actionToCommand),
    };
}

export type ConfigSchema = {
    credentials: credentials.ConfigSchema,
};

type Action = (bigCommerce: BigCommerce, ...args: any[]) => void | Promise<void>;
const commandFactory = (getClient: (storeHash: string) => BigCommerce) => <T extends Action>([name, action]: [string, T]) => {
    const command = new commander.Command(name);
    command.arguments('<store>');
    command.action((storeHash: string) => action(getClient(storeHash)));
    return command;
};
