import { createClientAsync } from "soap";
import request from "request";
import * as t from "io-ts";
import R from "ramda";
import { Reference } from "../../framework";
import { Agent } from "http";
import { useAgent } from "./functions";

export type Magento1SoapConfig = t.TypeOf<typeof magento1SoapConfigSchema>;

export const magento1SoapConfigSchema = t.type({
  credentials: t.type({
    username: t.string,
    apiKey: t.string,
  }),
});

interface LoginResult {
  sessionId: string;
  wsiCompliance: boolean;
}

export class Magento1SoapClient {
  constructor(
    private baseUrl: Reference<string>,
    private agent: Reference<Agent>,
    private soapConfig: Reference<Magento1SoapConfig | undefined>,
  ) {}

  async execute<R = unknown>(method: string, args: Record<string, any> = {}): Promise<R> {
    const state = this.state.get();
    if (!state) {
      throw new Error("Soap has not been configured.");
    }
    const { clientPromise, loginResult, requestOptions } = state;
    const client = await clientPromise;
    const { sessionId, wsiCompliance } = await loginResult;
    const response = await useAgent(() =>
      client[`${method}Async`]({ sessionId, ...args }, requestOptions),
    );
    const result = Array.isArray(response) && response.length > 0 ? response[0] : response;
    return wsiCompliance
      ? extractWsiValue(result.result)
      : extractNonWsiValue(Object.values(result)[0]);
  }

  private client = this.baseUrl.map(baseUrl =>
    createClientAsync(`${baseUrl}/api/v2_soap?wsdl=1`, {
      ignoredNamespaces: ["xsi"],
      wsdl_options: { agentOptions: { rejectUnauthorized: false } },
    }),
  );

  private state = Reference.combine({
    soap: this.soapConfig,
    agent: this.agent,
    clientPromise: this.client,
  }).map(({ soap, agent, clientPromise }) => {
    if (!soap) {
      return;
    }

    const requestOptions: request.CoreOptions = { agent };
    const loginResult = clientPromise
      .then(client => client.loginAsync(soap.credentials, requestOptions))
      .then(
        ([result]: any): LoginResult =>
          result.result
            ? { wsiCompliance: true, sessionId: result.result }
            : { wsiCompliance: false, sessionId: extractNonWsiValue(result.loginReturn) },
      );

    return {
      requestOptions,
      clientPromise,
      loginResult,
    };
  });
}

function extractWsiValue(result: any): any {
  if (result === null || typeof result !== "object") {
    return result;
  }
  if (result.complexObjectArray) {
    return result.complexObjectArray.map(extractWsiValue);
  }
  return R.mapObjIndexed(extractWsiValue, result);
}

function extractNonWsiValue(result: any): any {
  if (result.$value !== undefined) {
    return extractNonWsiValue(result.$value);
  }
  if (result.attributes?.["SOAP-ENC:arrayType"]) {
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
