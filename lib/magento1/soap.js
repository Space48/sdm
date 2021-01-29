"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMagento1SoapClient = void 0;
const soap_1 = require("soap");
const util_1 = require("../util");
function createMagento1SoapClient(instanceConfig) {
    if (!(instanceConfig === null || instanceConfig === void 0 ? void 0 : instanceConfig.soap)) {
        return undefined;
    }
    const requestOptions = {
        agentOptions: {
            keepAlive: true,
            rejectUnauthorized: instanceConfig.insecure ? false : true,
            maxSockets: 3,
        },
    };
    const clientPromise = soap_1.createClientAsync(`${instanceConfig.baseUrl}/api/v2_soap?wsdl=1`, {
        ignoredNamespaces: ['xsi'],
        wsdl_options: requestOptions,
    });
    const loginResult = clientPromise
        .then(client => client.loginAsync(instanceConfig.soap.credentials, requestOptions))
        .then(([result]) => (result.result
        ? { wsiCompliance: true, sessionId: result.result }
        : { wsiCompliance: false, sessionId: extractNonWsiValue(result.loginReturn) }));
    return async (method, args = {}) => {
        const client = await clientPromise;
        const { sessionId, wsiCompliance } = await loginResult;
        const [result] = await client[`${method}Async`]({ sessionId, ...args }, requestOptions);
        return wsiCompliance
            ? extractWsiValue(result.result)
            : extractNonWsiValue(Object.values(result)[0]);
    };
}
exports.createMagento1SoapClient = createMagento1SoapClient;
function extractWsiValue(result) {
    if (result === null || typeof result !== 'object') {
        return result;
    }
    if (result.complexObjectArray) {
        return result.complexObjectArray.map(extractWsiValue);
    }
    return util_1.mapProperties(result, extractWsiValue);
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
        const mapped = util_1.mapProperties(result, extractNonWsiValue);
        delete mapped.attributes;
        return mapped;
    }
    return result;
}
