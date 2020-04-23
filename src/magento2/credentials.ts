import * as commander from "commander";
import * as action from "../action";
import { Config } from "../config";
import Magento2 from "./client";

export type ConfigSchema = {[baseUrl: string]: Instance};

export const getClient = (config: Config<ConfigSchema>) => (baseUrl: string): Magento2 => {
    const instanceConfig = config.get(baseUrl);
    if (!(instanceConfig?.credentials || instanceConfig?.token)) {
        throw new Error(`Magento2: No credentials available for instance ${baseUrl}.`);
    }
    let token = instanceConfig?.token;
    const tokenResolver = async ({refresh}: {refresh: boolean}) => {
        if (refresh || !token) {
            if (!instanceConfig?.credentials) {
                throw new Error();
            }
            token = await getToken(baseUrl, instanceConfig.credentials);
            config.set(baseUrl, {...instanceConfig, token});
        }
        return token.value;
    };
    return new Magento2(baseUrl, {auth: tokenResolver});
}

export function getCommands(config: Config<ConfigSchema>) {
    return [
        new commander.Command('set')
            .arguments('<base-url>')
            .requiredOption('--username <value>')
            .requiredOption('--password <value>')
            .action((baseUrl: string, command: commander.Command) => {
                const {username, password} = command.opts();
                config.set(baseUrl, {baseUrl, credentials: {username, password}});
            }),

        new commander.Command('get')
            .arguments('<base-url>')
            .action((baseUrl: string) => action.source([config.get(baseUrl)].filter(Boolean))),

        new commander.Command('list')
            .action(() => action.source(Object.values(config.getAll() || {}))),

        new commander.Command('list-base-urls')
            .action(() => action.source(Object.keys(config.getAll() || {}))),

        new commander.Command('delete')
            .arguments('<base-url>')
            .action((baseUrl: string) => config.delete(baseUrl)),

        new commander.Command('delete-all')
            .action(() => config.clear()),
    ];
}

type Instance = {
    baseUrl: string,
    credentials?: Credentials,
    token?: Token,
};

type Credentials = {
    username: string,
    password: string,
};

type Token = {
    value: string,
    expiration: string,
};

async function getToken(baseUrl: string, credentials: Credentials): Promise<Token> {
    const client = new Magento2(baseUrl);
    const fourHoursFromNow = new Date(Date.now() + 4 * 3_600_000);
    const tokenValue = await client.post<string>('integration/admin/token', credentials);
    return {
        value: tokenValue,
        expiration: fourHoursFromNow.toISOString(),
    }
}
