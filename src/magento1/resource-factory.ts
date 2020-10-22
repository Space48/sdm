import Magento1 from "./client";
import { ResourceConfig, EndpointScope, Cardinality } from "../resource";
import { Field } from '../action';
import { objectFromEntries } from "../util";
import { compose, map } from "@space48/json-pipe";

export class Magento1ResourceFactory {
    constructor(private client: Magento1) {}

    crud(uri: string, children: string[] = []): ResourceConfig {
        return ResourceConfig.merge(this.read(uri, children), this.write(uri));
    }

    read(uri: string, children: string[] = []): ResourceConfig {
        return {
            docKey: {name: 'entity_id', type: Field.integer()},
            listDocKeys: compose(
                () => this.client.search(uri, {sortKey: 'entity_id'}),
                map(doc => doc['entity_id']),
            ),
            endpoints: {
                ...this.get(uri),
                ...this.list(uri),
            },
            children: objectFromEntries(children.map(name => [
                name,
                {
                    docKey: {name: 'entity_id', type: Field.integer()},
                    endpoints: {
                        get: {
                            scope: EndpointScope.Resource,
                            cardinality: Cardinality.One,
                            fn: ({docKeys: [entityId]}) => this.client.get(`${uri}/${entityId}/${name}`),
                        },
                    },
                }
            ])),
        };
    }

    write(uri: string): ResourceConfig {
        return {
            docKey: {name: 'entity_id', type: Field.integer()},
            endpoints: {
                ...this.create(uri),
                ...this.update(uri),
                ...this.delete(uri),
            },
        };
    }

    private create(uriTemplate: string): ResourceConfig['endpoints'] {
        return {
            create: {
                scope: EndpointScope.Resource,
                cardinality: Cardinality.One,
                fn: ({docKeys, data}) => this.client.post(UriTemplate.uri(uriTemplate, docKeys), data),
            }
        };
    }

    private get(uriTemplate: string): ResourceConfig['endpoints'] {
        return {
            get: {
                scope: EndpointScope.Document,
                cardinality: Cardinality.One,
                fn: ({docKeys}) => this.client.get(UriTemplate.uri(uriTemplate, docKeys)),
            },
        };
    }

    private list(uriTemplate: string): ResourceConfig['endpoints'] {
        return {
            list: {
                scope: EndpointScope.Resource,
                cardinality: Cardinality.Many,
                fn: ({docKeys}) => this.client.search(UriTemplate.uri(uriTemplate, docKeys), {sortKey: 'entity_id'}),
            },
        };
    }

    private update(uriTemplate: string): ResourceConfig['endpoints'] {
        return {
            update: {
                scope: EndpointScope.Document,
                cardinality: Cardinality.One,
                fn: ({docKeys, data}) => this.client.put(UriTemplate.uri(uriTemplate, docKeys), data),
            },
        };
    }

    private delete(uriTemplate: string): ResourceConfig['endpoints'] {
        return {
            delete: {
                scope: EndpointScope.Document,
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
