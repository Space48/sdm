import { createClientAsync } from "soap";
import * as t from "io-ts";
import R from "ramda";
import { Reference } from "../../framework";
import { useAgent } from "./functions";
export const magento1SoapConfigSchema = t.type({
    credentials: t.type({
        username: t.string,
        apiKey: t.string,
    }),
});
export class Magento1SoapClient {
    constructor(baseUrl, agent, soapConfig) {
        this.baseUrl = baseUrl;
        this.agent = agent;
        this.soapConfig = soapConfig;
        this.client = this.baseUrl.map(baseUrl => createClientAsync(`${baseUrl}/api/v2_soap?wsdl=1`, {
            ignoredNamespaces: ["xsi"],
            wsdl_options: { agentOptions: { rejectUnauthorized: false } },
        }));
        this.state = Reference.combine({
            soap: this.soapConfig,
            agent: this.agent,
            clientPromise: this.client,
        }).map(({ soap, agent, clientPromise }) => {
            if (!soap) {
                return;
            }
            const requestOptions = { agent };
            const loginResult = clientPromise
                .then(client => client.loginAsync(soap.credentials, requestOptions))
                .then(([result]) => result.result
                ? { wsiCompliance: true, sessionId: result.result }
                : { wsiCompliance: false, sessionId: extractNonWsiValue(result.loginReturn) });
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
            throw new Error("Soap has not been configured.");
        }
        const { clientPromise, loginResult, requestOptions } = state;
        const client = await clientPromise;
        const { sessionId, wsiCompliance } = await loginResult;
        const [result] = await useAgent(() => client[`${method}Async`]({ sessionId, ...args }, requestOptions));
        return wsiCompliance
            ? extractWsiValue(result.result)
            : extractNonWsiValue(Object.values(result)[0]);
    }
}
function extractWsiValue(result) {
    if (result === null || typeof result !== "object") {
        return result;
    }
    if (result.complexObjectArray) {
        return result.complexObjectArray.map(extractWsiValue);
    }
    return R.mapObjIndexed(extractWsiValue, result);
}
function extractNonWsiValue(result) {
    var _a;
    if (result.$value !== undefined) {
        return extractNonWsiValue(result.$value);
    }
    if ((_a = result.attributes) === null || _a === void 0 ? void 0 : _a["SOAP-ENC:arrayType"]) {
        const items = !result.item ? [] : Array.isArray(result.item) ? result.item : [result.item];
        return items.map(extractNonWsiValue);
    }
    if (typeof result === "object") {
        if (result === null) {
            return null;
        }
        const mapped = R.mapObjIndexed(extractNonWsiValue, result);
        delete mapped.attributes;
        return mapped;
    }
    return result;
}
