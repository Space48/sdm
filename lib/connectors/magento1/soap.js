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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Magento1SoapClient = exports.magento1SoapConfigSchema = void 0;
const soap_1 = require("soap");
const t = __importStar(require("io-ts"));
const ramda_1 = __importDefault(require("ramda"));
const framework_1 = require("../../framework");
const functions_1 = require("./functions");
exports.magento1SoapConfigSchema = t.type({
    credentials: t.type({
        username: t.string,
        apiKey: t.string,
    }),
});
class Magento1SoapClient {
    constructor(baseUrl, agent, soapConfig) {
        this.baseUrl = baseUrl;
        this.agent = agent;
        this.soapConfig = soapConfig;
        this.client = this.baseUrl.map(baseUrl => soap_1.createClientAsync(`${baseUrl}/api/v2_soap?wsdl=1`, {
            ignoredNamespaces: ['xsi'],
            wsdl_options: { agentOptions: { rejectUnauthorized: false } },
        }));
        this.state = framework_1.Reference
            .combine({ soap: this.soapConfig, agent: this.agent, clientPromise: this.client })
            .map(({ soap, agent, clientPromise }) => {
            if (!soap) {
                return;
            }
            const requestOptions = { agent };
            const loginResult = clientPromise
                .then(client => client.loginAsync(soap.credentials, requestOptions))
                .then(([result]) => (result.result
                ? { wsiCompliance: true, sessionId: result.result }
                : { wsiCompliance: false, sessionId: extractNonWsiValue(result.loginReturn) }));
            return {
                requestOptions,
                clientPromise,
                loginResult,
            };
        });
    }
    async execute(method, args = {}) {
        const state = this.state.get();
        if (!state) {
            throw new Error('Soap has not been configured.');
        }
        const { clientPromise, loginResult, requestOptions } = state;
        const client = await clientPromise;
        const { sessionId, wsiCompliance } = await loginResult;
        const [result] = await functions_1.useAgent(() => client[`${method}Async`]({ sessionId, ...args }, requestOptions));
        return wsiCompliance
            ? extractWsiValue(result.result)
            : extractNonWsiValue(Object.values(result)[0]);
    }
}
exports.Magento1SoapClient = Magento1SoapClient;
function extractWsiValue(result) {
    if (result === null || typeof result !== 'object') {
        return result;
    }
    if (result.complexObjectArray) {
        return result.complexObjectArray.map(extractWsiValue);
    }
    return ramda_1.default.mapObjIndexed(extractWsiValue, result);
}
function extractNonWsiValue(result) {
    var _a;
    if (result.$value !== undefined) {
        return extractNonWsiValue(result.$value);
    }
    if ((_a = result.attributes) === null || _a === void 0 ? void 0 : _a['SOAP-ENC:arrayType']) {
        const items = !result.item ? [] : Array.isArray(result.item) ? result.item : [result.item];
        return items.map(extractNonWsiValue);
    }
    if (typeof result === 'object') {
        if (result === null) {
            return null;
        }
        const mapped = ramda_1.default.mapObjIndexed(extractNonWsiValue, result);
        delete mapped.attributes;
        return mapped;
    }
    return result;
}
//# sourceMappingURL=soap.js.map