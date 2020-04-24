import * as commander from "commander";
import * as action from "@space48/json-pipe";
import { Config } from "../config";
import Magento1 from "./client";
import { OAuth } from "oauth";
import open from "open";
import * as rl from "readline";

export type ConfigSchema = {[baseUrl: string]: Instance};

export const getClient = (config: Config<ConfigSchema>) => (baseUrl: string): Magento1 => {
    const instanceConfig = config.get(baseUrl);
    if (!(instanceConfig?.credentials && instanceConfig?.accessToken)) {
        throw new Error(`Magento1: No access token available for instance ${baseUrl}.`);
    }
    const accessToken = instanceConfig.accessToken;
    const oauth = getOauthClient(baseUrl, instanceConfig.credentials);
    return new Magento1(baseUrl, {
        auth: (method, url) => oauth.authHeader(url, accessToken.token, accessToken.tokenSecret, method),
    });
}

export function getCommands(config: Config<ConfigSchema>) {
    return [
        new commander.Command('set')
            .arguments('<base-url>')
            .requiredOption('--key <value>')
            .requiredOption('--secret <value>')
            .action(async (baseUrl: string, command: commander.Command) => {
                const {key, secret} = command.opts();
                const credentials = {key, secret};
                const accessToken = await getAccessToken(baseUrl, credentials)
                config.set(baseUrl, {baseUrl, credentials, accessToken});
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
    accessToken?: TokenPair,
};

type Credentials = {
    key: string,
    secret: string,
};

type TokenPair = {
    token: string,
    tokenSecret: string,
};

function getOauthClient(baseUrl: string, credentials: Credentials): OAuth {
    return new OAuth(
        `${baseUrl}/oauth/initiate`,
        `${baseUrl}/oauth/token`,
        credentials.key,
        credentials.secret,
        '1.0', // not 1.0a as per Magento docs
        null,
        'HMAC-SHA1'
    );
}

async function getAccessToken(baseUrl: string, credentials: Credentials): Promise<TokenPair> {
    const oauth = getOauthClient(baseUrl, credentials);
    const {token, tokenSecret} = await new Promise<TokenPair>((resolve, reject) => {
        oauth.getOAuthRequestToken({oauth_callback: 'oob'}, (error, token, tokenSecret) => {
            if (error) {
                reject(error);
            } else {
                resolve({token, tokenSecret});
            }
        });
    });
    await open(`${baseUrl}/admin/oAuth_authorize?oauth_token=${token}`);
    const readLine = rl.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const verifierCode = await new Promise<string>(resolve => readLine.question('Verifier code: ', resolve));
    readLine.close();
    return await new Promise<TokenPair>((resolve, reject) => {
        oauth.getOAuthAccessToken(token, tokenSecret, verifierCode, (error, token, tokenSecret) => {
            if (error) {
                reject(error);
            } else {
                resolve({token, tokenSecret});
            }
        });
    });
}
