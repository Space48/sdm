import * as commander from 'commander';
import * as category from './category';
import * as credentials from './credentials';
import * as customer from './customer';
import * as order from './order';
import * as product from './product';
import * as productAttribute from './product-attribute';
import { Config } from '../config';
import Magento2 from './client';

export function getCommands(config: Config<ConfigSchema>) {
    const credentialsConfig = config.select('credentials');
    const actionToCommand = commandFactory(credentials.getClient(credentialsConfig));

    return {
        creds: credentials.getCommands(credentialsConfig),
        category: Object.entries(category.actions).map(actionToCommand),
        customer: Object.entries(customer.actions).map(actionToCommand),
        order: Object.entries(order.actions).map(actionToCommand),
        product: Object.entries(product.actions).map(actionToCommand),
        'product-attribute': Object.entries(productAttribute.actions).map(actionToCommand),
    };
}

export type ConfigSchema = {
    credentials: credentials.ConfigSchema,
};

type Action = (magento: Magento2, concurrency: number, ...args: any[]) => void | Promise<void>;
const commandFactory = (getClient: (shopName: string) => Magento2) => <T extends Action>([name, action]: [string, T]) => {
    const command = new commander.Command(name);
    command.option('--concurrency <number>', 'Max number of concurrent API requests.', parseInt);
    command.arguments('<base-url>');
    command.action((baseUrl: string) => {
        const {concurrency = 1} = command.opts();
        action(getClient(baseUrl), concurrency);
    });
    return command;
};
