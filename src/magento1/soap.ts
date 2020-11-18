import { createClientAsync } from "soap";
import request from "request";
import { mapProperties } from "../util";
import { InstanceConfig } from "./config";
import { exit } from "process";

interface LoginResult {
    sessionId: string
    wsiCompliance: boolean
}

export function createMagento1SoapClient(instanceConfig: InstanceConfig): Magento1SoapClient|undefined {
    if (!instanceConfig?.soap) {
        return undefined;
    }
    const requestOptions: request.CoreOptions = {
        agentOptions: {
            keepAlive: true,
            rejectUnauthorized: instanceConfig.insecure ? false : true,
            maxSockets: 3,
        },
        //rejectUnauthorized: instanceConfig.insecure ? false : true,
        //strictSSL: instanceConfig.insecure ? false : true,
    };
    const clientPromise = createClientAsync(
        `${instanceConfig.baseUrl}/api/v2_soap?wsdl=1`,
        {
            ignoredNamespaces: ['xsi'],
            wsdl_options: requestOptions,
        },
    );
    const loginResult = clientPromise
        .then(client => client.loginAsync(instanceConfig.soap!.credentials, requestOptions))
        .then(([result]: any): LoginResult => (
            result.result
                ? {wsiCompliance: true, sessionId: result.result}
                : {wsiCompliance: false, sessionId: extractNonWsiValue(result.loginReturn)}
        ));
    return async (method, args={}) => {
        const client = await clientPromise;
        const {sessionId, wsiCompliance} = await loginResult;
        const [result] = await client[`${method}Async`]({sessionId, ...args}, requestOptions);
        return wsiCompliance
            ? extractWsiValue(result.result)
            : extractNonWsiValue(Object.values(result)[0]);
    };
}

function extractWsiValue(result: any): any {
    if (result === null || typeof result !== 'object') {
        return result;
    }
    if (result.complexObjectArray) {
        return result.complexObjectArray.map(extractWsiValue);
    }
    return mapProperties(result, extractWsiValue);
}

function extractNonWsiValue(result: any): any {
    if (result.$value !== undefined) {
        return extractNonWsiValue(result.$value)
    }
    if (result.attributes?.['SOAP-ENC:arrayType']) {
        const items = !result.item ? [] : Array.isArray(result.item) ? result.item : [result.item];
        return items.map(extractNonWsiValue);
    }
    if (typeof result === 'object') {
        if (result === null) {
            return null;
        }
        const mapped = mapProperties(result, extractNonWsiValue);
        delete mapped.attributes;
        return mapped;
    }
    return result;
}

export type Magento1SoapClient = <T = any>(method: string, args?: Record<string, any>) => Promise<T>;

export interface SoapConfig {
    readonly credentials: SoapCredentials
}

export interface SoapCredentials {
    username: string
    apiKey: string
}
