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
exports.shopify = void 0;
const framework_1 = require("../../framework");
const client = __importStar(require("./client"));
const codegen_1 = require("./codegen");
exports.shopify = framework_1.connector({
    configSchema: client.configSchema,
    getScope: config => new client.Scope(config),
    scopeNameExample: 'my-shop-name',
    getScopeName: config => config.shopName,
    getWarningMessage: async (scope) => {
        try {
            const shop = await scope.client().shop.get();
            if (!shop.password_enabled) {
                return `Shop is LIVE at ${shop.domain}`;
            }
            if (shop.domain !== shop.myshopify_domain) {
                return `Shop is using custom domain ${shop.domain}`;
            }
        }
        catch (_a) {
            return 'Failed to fetch shop data from Shopify API. This could be a live shop.';
        }
    },
    resources: codegen_1.resourceDefinitions,
});
