import * as commander from "commander";
import * as action from "@space48/json-pipe";
import { Config } from "../config";

export type ConfigSchema = {[storeHash: string]: Credentials};

export type Credentials = {
    storeHash: string,
    clientId: string,
    accessToken: string,
};

export const getClientCredentials = (config: Config<ConfigSchema>, storeHash: string): Credentials => {
    const credentials = config.get(storeHash);
    if (!credentials) {
        throw new Error(`BigCommerce: No credentials available for store ${storeHash}.`);
    }
    return credentials;
}

export function getCommands(config: Config<ConfigSchema>) {
    return [
        new commander.Command('set')
            .arguments('<store>')
            .requiredOption('--access-token <value>')
            .requiredOption('--client-id <value>')
            .action((storeHash: string, command: commander.Command) => {
                const {accessToken, clientId} = command.opts();
                config.set(storeHash, {storeHash, accessToken, clientId});
            }),

        new commander.Command('get')
            .arguments('<store>')
            .action((storeHash: string) => action.source([config.get(storeHash)].filter(Boolean))),

        new commander.Command('list')
            .action(() => action.source(Object.values(config.getAll() || {}))),

        new commander.Command('list-stores')
            .action(() => action.source(Object.keys(config.getAll() || {}))),

        new commander.Command('delete')
            .arguments('<store>')
            .action((storeHash: string) => config.delete(storeHash)),

        new commander.Command('delete-all')
            .action(() => config.clear()),
    ];
}
