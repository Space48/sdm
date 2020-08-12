import Magento2, { SortKey } from "./client";
import { ResourceConfig, DocumentKeyDefinition, EndpointScope, Cardinality } from "../resource";
import { compose, map } from "@space48/json-pipe";

type Options = {
    docKey?: DocumentKeyDefinition,
    list?: ListOptions,
    create?: string|true,
    get?: string|true,
    update?: string|true,
    delete?: string|true,
};
type ListOptions = {
    uri?: string,
    sortKey: SortKey,
};

export class Magento2ResourceFactory {
    constructor(private client: Magento2) {}

    create(uriTemplate: string, options: Options): ResourceConfig {
        const keySuffix = options.docKey ? '/{key}' : '';
        const scope = options.docKey ? EndpointScope.Document : EndpointScope.Resource;
        
        const endpoints = {
            ...(options?.get && this.get(scope, typeof options.get === 'string' ? options.get : uriTemplate + keySuffix)),
            ...(options?.list && this.list(options.list.uri || uriTemplate, options.list.sortKey)),
            ...(options?.create && this._create(typeof options.create === 'string' ? options.create : uriTemplate)),
            ...(options?.update && this.update(scope, typeof options.update === 'string' ? options.update : uriTemplate + keySuffix)),
            ...(options?.delete && this.delete(scope, typeof options.delete === 'string' ? options.delete : uriTemplate + keySuffix)),
        };

        if (!options.docKey) {
            return {endpoints};
        }

        return {
            docKey: options.docKey,
            endpoints,
            listDocKeys: options?.list && options.docKey && compose(
                docKeys => this.client.search(UriTemplate.uri(uriTemplate, docKeys), {sortKey: options!.list!.sortKey}),
                map(doc => doc[options.docKey!.name]),
            ),
        };
    }

    private _create(uriTemplate: string): ResourceConfig['endpoints'] {
        return {
            create: {
                scope: EndpointScope.Resource,
                cardinality: Cardinality.One,
                fn: ({docKeys, data}) => this.client.post(UriTemplate.uri(uriTemplate, docKeys), data),
            }
        };
    }

    private get(scope: EndpointScope, uriTemplate: string): ResourceConfig['endpoints'] {
        return {
            get: {
                scope,
                cardinality: Cardinality.One,
                fn: ({docKeys}) => this.client.get(UriTemplate.uri(uriTemplate, docKeys)),
            },
        };
    }

    private list(uriTemplate: string, sortKey: SortKey): ResourceConfig['endpoints'] {
        return {
            list: {
                scope: EndpointScope.Resource,
                cardinality: Cardinality.Many,
                fn: ({docKeys}) => this.client.search(UriTemplate.uri(uriTemplate, docKeys), {sortKey}),
            },
        };
    }

    private update(scope: EndpointScope, uriTemplate: string): ResourceConfig['endpoints'] {
        return {
            update: {
                scope,
                cardinality: Cardinality.One,
                fn: ({docKeys, data}) => this.client.put(UriTemplate.uri(uriTemplate, docKeys), data),
            },
        };
    }

    private delete(scope: EndpointScope, uriTemplate: string): ResourceConfig['endpoints'] {
        return {
            delete: {
                scope,
                cardinality: Cardinality.One,
                fn: ({docKeys}) => this.client.delete(UriTemplate.uri(uriTemplate, docKeys)),
            },
        };
    }
}

class UriTemplate {
    static uri(uriTemplate: string, fieldValues: string[]): string {
        const uri = UriTemplate.applyValues(uriTemplate, fieldValues);
        const missingValues = UriTemplate.fields(uri);
        if (UriTemplate.fields(uri).length > 0) {
            throw new Error(`Missing URI fields ${missingValues.join(', ')}`);
        }
        return uri;
    }

    static applyValues(uriTemplate: string, fieldValues: string[]): string {
        return UriTemplate.fields(uriTemplate)
            .filter((_, index) => (fieldValues[index] ?? null) !== null)
            .reduce((uri, field, index) => uri.replace(`{${field}}`, fieldValues[index]), uriTemplate);
    }

    static fields(uriTemplate: string): string[] {
        // todo: convert to matchAll once we support ES2020
        return uriTemplate.match(/\{[^}]+\}/g)?.map(match => match.substring(1, match.length - 1)) || [];
    }
}
