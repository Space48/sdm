"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Magento1ResourceFactory = void 0;
const resource_1 = require("../resource");
const action_1 = require("../action");
const util_1 = require("../util");
const json_pipe_1 = require("@space48/json-pipe");
class Magento1ResourceFactory {
    constructor(client) {
        this.client = client;
    }
    crud(uri, children = []) {
        return resource_1.ResourceConfig.merge(this.read(uri, children), this.write(uri));
    }
    read(uri, children = []) {
        return {
            docKey: { name: 'entity_id', type: action_1.Field.integer() },
            listDocKeys: json_pipe_1.compose(() => this.client.search(uri, { sortKey: 'entity_id' }), json_pipe_1.map(doc => doc['entity_id'])),
            endpoints: {
                ...this.get(`${uri}/{entity_id}`),
                ...this.list(uri),
            },
            children: util_1.objectFromEntries(children.map(name => [
                name,
                {
                    docKey: { name: 'entity_id', type: action_1.Field.integer() },
                    endpoints: {
                        get: {
                            scope: resource_1.EndpointScope.Resource,
                            cardinality: resource_1.Cardinality.One,
                            fn: ({ docKeys: [entityId] }) => this.client.get(`${uri}/${entityId}/${name}`),
                        },
                    },
                }
            ])),
        };
    }
    write(uri) {
        return {
            docKey: { name: 'entity_id', type: action_1.Field.integer() },
            endpoints: {
                ...this.create(uri),
                ...this.update(`${uri}/{entity_id}`),
                ...this.delete(`${uri}/{entity_id}`),
            },
        };
    }
    create(uriTemplate) {
        return {
            create: {
                scope: resource_1.EndpointScope.Resource,
                cardinality: resource_1.Cardinality.One,
                fn: ({ docKeys, data }) => this.client.post(UriTemplate.uri(uriTemplate, docKeys), data),
            }
        };
    }
    get(uriTemplate) {
        return {
            get: {
                scope: resource_1.EndpointScope.Document,
                cardinality: resource_1.Cardinality.One,
                fn: ({ docKeys }) => this.client.get(UriTemplate.uri(uriTemplate, docKeys)),
            },
        };
    }
    list(uriTemplate) {
        return {
            list: {
                scope: resource_1.EndpointScope.Resource,
                cardinality: resource_1.Cardinality.Many,
                fn: ({ docKeys }) => this.client.search(UriTemplate.uri(uriTemplate, docKeys), { sortKey: 'entity_id' }),
            },
        };
    }
    update(uriTemplate) {
        return {
            update: {
                scope: resource_1.EndpointScope.Document,
                cardinality: resource_1.Cardinality.One,
                fn: ({ docKeys, data }) => this.client.put(UriTemplate.uri(uriTemplate, docKeys), data),
            },
        };
    }
    delete(uriTemplate) {
        return {
            delete: {
                scope: resource_1.EndpointScope.Document,
                cardinality: resource_1.Cardinality.One,
                fn: ({ docKeys }) => this.client.delete(UriTemplate.uri(uriTemplate, docKeys)),
            },
        };
    }
}
exports.Magento1ResourceFactory = Magento1ResourceFactory;
class UriTemplate {
    static uri(uriTemplate, fieldValues) {
        const uri = UriTemplate.applyValues(uriTemplate, fieldValues);
        const missingValues = UriTemplate.fields(uri);
        if (UriTemplate.fields(uri).length > 0) {
            throw new Error(`Missing URI fields ${missingValues.join(', ')}`);
        }
        return uri;
    }
    static applyValues(uriTemplate, fieldValues) {
        return UriTemplate.fields(uriTemplate)
            .filter((_, index) => { var _a; return ((_a = fieldValues[index]) !== null && _a !== void 0 ? _a : null) !== null; })
            .reduce((uri, field, index) => uri.replace(`{${field}}`, fieldValues[index]), uriTemplate);
    }
    static fields(uriTemplate) {
        var _a;
        return ((_a = uriTemplate.match(/\{[^}]+\}/g)) === null || _a === void 0 ? void 0 : _a.map(match => match.substring(1, match.length - 1))) || [];
    }
}
