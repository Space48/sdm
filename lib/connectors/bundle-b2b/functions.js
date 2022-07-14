"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listIds = exports.UriTemplate = exports.endpoint = void 0;
const framework_1 = require("../../framework");
const json_pipe_1 = require("@space48/json-pipe");
class endpoint {
    constructor() {
        return;
    }
    static crud(uriPattern, idField = "id") {
        const docUriPattern = `${uriPattern}/{id}`;
        return framework_1.resource({
            endpoints: {
                create: endpoint.create(uriPattern),
                list: endpoint.list(uriPattern),
            },
            documents: {
                idField,
                listIds: listIds(uriPattern, idField),
                endpoints: {
                    delete: endpoint.del(docUriPattern),
                    get: endpoint.get(docUriPattern),
                    update: endpoint.update(docUriPattern),
                },
            },
        });
    }
    static fn(uriPattern, _fn) {
        return client => ({ path, input }) => {
            const uri = UriTemplate.uri(uriPattern, framework_1.Path.getDocIds(path));
            return _fn(client, uri, input, framework_1.Path.getDocIds(path));
        };
    }
}
exports.endpoint = endpoint;
endpoint.create = (uriPattern) => endpoint.fn(uriPattern, (bB2bClient, uri, data) => bB2bClient.post(uri, data));
endpoint.del = (uriPattern) => endpoint.fn(uriPattern, (bB2bClient, uri, data) => bB2bClient.delete(uri, data));
endpoint.get = (uriPattern) => endpoint.fn(uriPattern, (bB2bClient, uri, data) => bB2bClient.get(uri, data));
endpoint.list = (uriPattern) => endpoint.fn(uriPattern, (bB2bClient, uri, query) => bB2bClient.list(uri, query));
endpoint.update = (uriPattern) => endpoint.fn(uriPattern, (bB2bClient, uri, data) => bB2bClient.put(uri, data));
class UriTemplate {
    static uri(uriTemplate, fieldValues) {
        const uri = UriTemplate.applyValues(uriTemplate, fieldValues);
        const missingValues = UriTemplate.fields(uri);
        if (UriTemplate.fields(uri).length > 0) {
            throw new Error(`Missing URI fields ${missingValues.join(", ")}`);
        }
        return uri;
    }
    static applyValues(uriTemplate, fieldValues) {
        return UriTemplate.fields(uriTemplate)
            .filter((field, index) => { var _a; return ((_a = fieldValues[index]) !== null && _a !== void 0 ? _a : null) !== null; })
            .reduce((uri, field, index) => uri.replace(`{${field}}`, String(fieldValues[index])), uriTemplate);
    }
    static fields(uriTemplate) {
        var _a;
        // todo: convert to matchAll once we support ES2020
        return (((_a = uriTemplate.match(/\{[^}]+\}/g)) === null || _a === void 0 ? void 0 : _a.map(match => match.substring(1, match.length - 1))) || []);
    }
}
exports.UriTemplate = UriTemplate;
function listIds(uriPattern, idField = "id") {
    return (client) => (path) => {
        const uri = UriTemplate.uri(uriPattern, framework_1.Path.getDocIds(path));
        const docs = client.list(uri, { include_fields: [] });
        return json_pipe_1.pipe(docs, json_pipe_1.map(doc => doc[idField]));
    };
}
exports.listIds = listIds;
