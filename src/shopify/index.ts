import * as credentials from './credentials';
import { Config } from '../config';
import { ShopifyActionFactory } from './action';
import { getAllResourceActions } from './config';
import { Action } from '../action';

export type ConfigSchema = {
    credentials: credentials.ConfigSchema,
};

export function getActions(config: Config<ConfigSchema>): Record<string, Action[]> {
    const actionFactory = new ShopifyActionFactory(config);
    return {
        creds: credentials.getActions(config.select('credentials')),
        ...getAllResourceActions(actionFactory),
    };
}
