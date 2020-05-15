import fetch, { RequestInit } from "node-fetch";
import { stringify } from 'query-string'
import { Credentials } from "./credentials";
import pRetry from "p-retry";
import { flatten } from "../util";

const listConcurrency = 50;

type ListPage<T> = T[] | {data: T[]} | null;

export default class BigCommerce {
    constructor(private credentials: Credentials) {}

    async get<T = any>(uri: string, params?: Record<string, any>): Promise<T> {
        const paramsString = params ? `?${stringify(params)}` : '';
        return await this.fetch(uri + paramsString);
    }

    async* list<T = any>(uri: string, params?: Record<string, any>): AsyncIterable<T> {
        const threads = [...new Array(listConcurrency).keys()];
        for (let page = 1;; page += listConcurrency) {
            const pages = await Promise.all(threads.map(
                threadId => this.get<ListPage<T>>(uri, {page: page + threadId, ...(params || {})})
            ));
            const items = pages
                .map(page => Array.isArray(page) ? page : page?.data || [])
                .reduce(flatten);
            yield* items;
            const lastPage = pages.slice(-1)[0];
            const lastPageItems = Array.isArray(lastPage) ? lastPage : lastPage?.data || [];
            if (lastPageItems.length === 0) {
                break;
            }
        }
    }

    async post<T = any>(uri: string, content: any): Promise<T> {
        return this.makeUnsafeRequest('POST', uri, content);
    }

    async put<T = any>(uri: string, content: any): Promise<T> {
        return this.makeUnsafeRequest('PUT', uri, content);
    }

    async patch<T = any>(uri: string, content: any): Promise<T> {
        return this.makeUnsafeRequest('PATCH', uri, content);
    }

    async delete(uri: string, content?: any): Promise<void> {
        await this.makeUnsafeRequest('DELETE', uri, content);
    }

    private async makeUnsafeRequest<T>(method: string, uri: string, content: any): Promise<T> {
        return await this.fetch(uri, {
            method,
            headers: content && {
                'Content-Type': 'application/json',
            },
            body: content && JSON.stringify(content),
        });
    }

    private async fetch(relativeUri: string, init?: RequestInit): Promise<any> {
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
        if (response.status === 204) {
            return null;
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
