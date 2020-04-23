import * as commander from 'commander';
import * as credentials from './credentials';
import * as customer from './customer';
import * as customerAddress from './customer-address';
import * as product from './product';
import { Config } from '../config';
import Magento1 from './client';

export function getCommands(config: Config<ConfigSchema>) {
    const credentialsConfig = config.select('credentials');
    const actionToCommand = commandFactory(credentials.getClient(credentialsConfig));

    return {
        creds: credentials.getCommands(credentialsConfig),
        customer: Object.entries(customer.actions).map(actionToCommand),
        'customer-address': Object.entries(customerAddress.actions).map(actionToCommand),
        product: Object.entries(product.actions).map(actionToCommand),
    };
}

export type ConfigSchema = {
    credentials: credentials.ConfigSchema,
};

type Action = (magento: Magento1, ...args: any[]) => void | Promise<void>;
const commandFactory = (getClient: (shopName: string) => Magento1) => <T extends Action>([name, action]: [string, T]) => {
    const command = new commander.Command(name);
    command.arguments('<base-url>');
    command.action((baseUrl: string) => action(getClient(baseUrl)));
    return command;
};
