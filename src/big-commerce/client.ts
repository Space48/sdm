import fetch, { RequestInit } from "node-fetch";
import { stringify } from 'query-string'
import { Credentials } from "./credentials";
import pRetry from "p-retry";

export default class BigCommerce {
    constructor(private credentials: Credentials) {}

    async get<T>(uri: string, params?: Record<string, any>): Promise<T> {
        const paramsString = params ? `?${stringify(params)}` : '';
        return await this.fetch(uri + paramsString);
    }

    async post<T>(uri: string, content: any): Promise<T> {
        return this.makeUnsafeRequest('POST', uri, content);
    }

    async put<T>(uri: string, content: any): Promise<T> {
        return this.makeUnsafeRequest('PUT', uri, content);
    }

    async patch<T>(uri: string, content: any): Promise<T> {
        return this.makeUnsafeRequest('PATCH', uri, content);
    }

    async delete<T>(uri: string, content?: any): Promise<T> {
        return this.makeUnsafeRequest('DELETE', uri, content);
    }

    private async makeUnsafeRequest<T>(method: string, uri: string, content: any): Promise<T> {
        return await this.fetch(uri, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        });
    }

    private async fetch<T>(relativeUri: string, init?: RequestInit): Promise<T> {
        const absoluteUri = `https://api.bigcommerce.com/stores/${this.credentials.storeHash}/${relativeUri}`;
        const initResolved = this.init(init);
        const response = await pRetry(
            async () => {
                const response = await fetch(absoluteUri, initResolved);
                if (response.status === 429) {
                    throw new Error;
                }
                return response;
            },
            {retries: 50}
        );
        if (!response.ok) {
            const error = new Error(`${response.status} ${response.statusText}`);
            (error as any).response = {
                status: response.status,
                body: await response.text(),
            }
            throw error;
        }
        return await response.json();
    }

    private init(init?: RequestInit): RequestInit {
        const headers = {
            ...(init?.headers || {}),
            Accept: 'application/json',
            'X-Auth-Token': this.credentials.accessToken,
            'X-Auth-Client': this.credentials.clientId,
        }
        return {
            ...(init || {}),
            headers,
        };
    }
}
