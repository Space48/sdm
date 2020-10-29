import { createClientAsync } from "soap";
import request from "request";
import { mapProperties } from "../util";
import { InstanceConfig } from "./config";

export function createMagento1SoapClient(instanceConfig: InstanceConfig): Magento1SoapClient|undefined {
    if (!instanceConfig?.soap) {
        return undefined;
    }
    const requestOptions: request.CoreOptions = {
        rejectUnauthorized: instanceConfig.insecure ? false : true,
        strictSSL: instanceConfig.insecure ? false : true,
    };
    const clientPromise = createClientAsync(
        `${instanceConfig.baseUrl}/api/v2_soap?wsdl=1`,
        {
            ignoredNamespaces: ['xsi'],
            wsdl_options: requestOptions,
        },
    );
    const sessionIdPromise = clientPromise
        .then(client => client.loginAsync(instanceConfig.soap!.credentials, requestOptions))
        .then(([result]: any) => extractValueFromSoapResult(result.loginReturn));
    return async (method, args={}) => {
        const client = await clientPromise;
        const sessionId = await sessionIdPromise;
        const [result] = await client[`${method}Async`]({sessionId, ...args}, requestOptions);
        return extractValueFromSoapResult(result);
    };
}

function extractValueFromSoapResult(result: any): any {
    if (result.$value !== undefined) {
        return extractValueFromSoapResult(result.$value)
    }
    if (result.attributes?.['SOAP-ENC:arrayType']) {
        const items = !result.item ? [] : Array.isArray(result.item) ? result.item : [result.item];
        return items.map(extractValueFromSoapResult);
    }
    if (typeof result === 'object') {
        if (result === null) {
            return null;
        }
        const mapped = mapProperties(result, extractValueFromSoapResult);
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
