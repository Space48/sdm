import fetch, { RequestInit } from "node-fetch";
import { Agent } from "https";
import { parse } from "url";
import { stringify } from 'query-string'
import { objectFromEntries, flatten } from "../util";

type AuthResolver = (method: string, url: string) => string;

export default class Magento1 {
    private agent?: Agent;

    constructor(
        private baseUrl: string,
        private options?: {auth?: AuthResolver},
    ) {
        this.agent = parse(baseUrl).protocol === 'https:' ? new Agent({rejectUnauthorized: false}) : undefined;
    }

    async get<T>(uri: string, params?: QueryParams): Promise<T> {
        const paramsFlattened = params && flattenParams(params);
        const paramsString = paramsFlattened ? `?${stringify(paramsFlattened)}` : '';
        return await this.fetch(uri + paramsString);
    }

    async* search<T extends Record<string, any> = any>(
        uri: string,
        {idField, filters=[]}: {idField: string, filters?: Filter[]}
    ): AsyncIterable<T> {
        let additionalFilters: Filter[] = [];
        while (1) {
            const content = await this.get<Record<string, T>>(uri, {
                filter: [...filters, ...additionalFilters]
                    .map(([attribute, conditionType, value]) => ({attribute, [conditionType]: value})),
                order: idField,
                dir: 'asc',
                limit: 100,
            });
            const items = Object.values(content);
            if (items.length === 0) {
                break;
            }
            yield* items;
            const lastId = items.slice(-1)[0][idField] as string|number;
            additionalFilters = [[
                idField,
                'gt',
                lastId,
            ]];
        }
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

    async delete<T>(uri: string, content: any): Promise<T> {
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
        const url = `${this.baseUrl}/api/rest/${relativeUri}`;
        const auth = this.options?.auth?.(init?.method || 'GET', url);
        const response = await fetch(url, this.init({auth, init}));
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}\n\n${await response.text()}`);
        }
        return await response.json();
    }

    private init({auth, init}: {auth?: string, init?: RequestInit}): RequestInit {
        const headers = {
            ...(init?.headers || {}),
            ...(auth ? {Authorization: auth} : {}),
            Accept: 'application/json',
        }
        return {
            ...(init || {}),
            headers,
            agent: this.agent,
        };
    }
}

export type QueryParams = {[param: string]: QueryParam};
type QueryParam = QueryParams | string | number | QueryParam[];

function flattenParams(params: QueryParams): Record<string, string> {
    const entries = Object.entries(params)
        .map(([name, value]) => flattenParam(name, value))
        .reduce(flatten, []) as [string, string][];
    return objectFromEntries(entries);
}

function flattenParam(name: string, value: QueryParam): string[][] {
    switch (typeof value) {
        case 'string':
            return [[name, value]];

        case 'number':
            return [[name, value.toString()]];

        case 'object': {
            const entries = Array.isArray(value)
                ? value.map((_value, index) => [index + 1, _value])
                : Object.entries(value);
            return entries
                .map(([_name, _value]) => flattenParam(`${name}[${_name}]`, _value))
                .reduce(flatten, []);
        };

        case 'undefined':
            return [];
    }
}

type FilterCondition = 'eq' | 'gt' | 'in';
type Filter = [string, FilterCondition, string|number|string[]|number[]];
