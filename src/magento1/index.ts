import * as credentials from './credentials';
import { Config } from '../config';
import { Magento1ActionFactory } from './action';
import { Action } from '../action';

export type ConfigSchema = {
    credentials: credentials.ConfigSchema,
};

export function getActions(config: Config<ConfigSchema>): Record<string, Action[]> {
    const action = new Magento1ActionFactory(config);

    return {
        creds: credentials.getActions(config.select('credentials')),

        customer: action.crud('customers', ['addresses']),

        // order endpoints are untested
        order: action.read('orders', ['addresses', 'comments', 'items']),

        product: action.crud('products', ['categories', 'images', 'websites']),
    };
}
