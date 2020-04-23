import * as commander from "commander";
import * as action from "../action";
import { Config } from "../config";

export type ConfigSchema = {[shopName: string]: Credentials};

type Credentials = {
    shopName: string,
    apiKey: string,
    password: string,
};

export const getClientCredentials = (config: Config<ConfigSchema>, shopName: string): Credentials => {
    const credentials = config.get(shopName);
    if (!credentials) {
        throw new Error(`Shopify: No credentials available for shop ${shopName}.`);
    }
    return credentials;
}

export function getCommands(config: Config<ConfigSchema>) {
    return [
        new commander.Command('set')
            .arguments('<shop>')
            .requiredOption('--api-key <value>')
            .requiredOption('--password <value>')
            .action((shopName: string, command: commander.Command) => {
                const {apiKey, password} = command.opts();
                config.set(shopName, {shopName, apiKey, password});
            }),

        new commander.Command('get')
            .arguments('<shop>')
            .action((shopName: string) => action.source([config.get(shopName)].filter(Boolean))),

        new commander.Command('list')
            .action(() => action.source(Object.values(config.getAll() || {}))),

        new commander.Command('list-shops')
            .action(() => action.source(Object.keys(config.getAll() || {}))),

        new commander.Command('delete')
            .arguments('<shop>')
            .action((shopName: string) => config.delete(shopName)),

        new commander.Command('delete-all')
            .action(() => config.clear()),
    ];
}
