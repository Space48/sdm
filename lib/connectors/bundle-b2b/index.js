"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bundleB2b = void 0;
const client_1 = __importStar(require("./client"));
const framework_1 = require("../../framework");
const functions_1 = require("./functions");
const mergeResources = framework_1.resourceMerger();
exports.bundleB2b = framework_1.connector({
    configSchema: client_1.configSchema,
    scopeNameExample: 'some-store-alias',
    getScopeName: config => config.storeAlias,
    getScope: config => new client_1.default(config),
    getWarningMessage: async (client) => { },
    resources: {
        companies: functions_1.endpoint.crud('v3/io/companies'),
        users: functions_1.endpoint.crud('v3/io/users'),
        addresses: functions_1.endpoint.crud('v3/io/addresses'),
    },
});
