"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActions = exports.getInstanceConfig = exports.getBaseUrls = void 0;
const action_1 = require("../action");
const url_1 = require("url");
const rest_1 = require("./rest");
function getBaseUrls(config) {
    return Object.keys(config.getAll() || {}).map(computeUrlForComparison);
}
exports.getBaseUrls = getBaseUrls;
function getInstanceConfig(configStore, baseUrl) {
    const urlExcludingScheme = computeUrlForComparison(baseUrl);
    return configStore.get(baseUrl) || Object.values(configStore.getAll() || {}).find(candidate => urlExcludingScheme === computeUrlForComparison(candidate.baseUrl));
}
exports.getInstanceConfig = getInstanceConfig;
function getActions(config) {
    return [
        action_1.Action.source({
            name: 'set',
            params: {
                baseUrl: action_1.Field.string().required(),
                insecure: action_1.Field.boolean().default(false),
            },
            fn: () => async ({ params: { baseUrl, insecure } }) => {
                const urlForComparison = computeUrlForComparison(baseUrl);
                config.select(urlForComparison)
                    .set('baseUrl', baseUrl)
                    .set('insecure', insecure);
            },
        }),
        action_1.Action.source({
            name: 'set:rest',
            params: {
                baseUrl: action_1.Field.string().required(),
                key: action_1.Field.string().required(),
                secret: action_1.Field.string().required(),
                token: action_1.Field.string().optional(),
                tokenSecret: action_1.Field.string().optional(),
            },
            fn: () => async ({ params: { baseUrl, key, secret, token, tokenSecret } }) => {
                const credentials = { key, secret };
                const accessToken = token && tokenSecret ? { token, tokenSecret } : await rest_1.getAccessToken(baseUrl, credentials);
                const urlForComparison = computeUrlForComparison(baseUrl);
                config.select(urlForComparison)
                    .set('baseUrl', baseUrl)
                    .set('rest', { credentials, accessToken });
            },
        }),
        action_1.Action.source({
            name: 'set:soap',
            params: {
                baseUrl: action_1.Field.string().required(),
                username: action_1.Field.string().required(),
                apiKey: action_1.Field.string().required(),
            },
            fn: () => async ({ params: { baseUrl, username, apiKey } }) => {
                const credentials = { username, apiKey };
                const urlForComparison = computeUrlForComparison(baseUrl);
                config.select(urlForComparison)
                    .set('baseUrl', baseUrl)
                    .set('soap', { credentials });
            },
        }),
        action_1.Action.source({
            name: 'get',
            params: {
                baseUrl: action_1.Field.string().required(),
            },
            fn: () => async ({ params: { baseUrl } }) => { var _a; return (_a = config.get(computeUrlForComparison(baseUrl))) !== null && _a !== void 0 ? _a : null; },
        }),
        action_1.Action.source({
            name: 'list',
            fn: () => async function* () { yield* Object.values(config.getAll() || {}); },
        }),
        action_1.Action.source({
            name: 'list-base-urls',
            fn: () => async function* () { yield* Object.keys(config.getAll() || {}); },
        }),
        action_1.Action.source({
            name: 'delete',
            params: {
                baseUrl: action_1.Field.string().required(),
            },
            fn: () => async ({ params: { baseUrl } }) => (config.delete(baseUrl),
                config.delete(computeUrlForComparison(baseUrl))),
        }),
    ];
}
exports.getActions = getActions;
const computeUrlForComparison = (urlish) => {
    const { host, path } = url_1.parse(urlish);
    return `${host || ''}${path}`.replace(/\/$/, '');
};
