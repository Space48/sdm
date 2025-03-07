"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpoint = void 0;
const framework_1 = require("../../framework");
const json_pipe_1 = require("@space48/json-pipe");
class endpoint {
    constructor() {
        return;
    }
    static crud(uriPattern, options) {
        var _a, _b, _c;
        const docUriPattern = `${uriPattern}/{id}`;
        return {
            endpoints: {
                create: endpoint.create(uriPattern),
                createAsync: endpoint.createAsync(uriPattern),
                list: endpoint.list((_a = options.list.uri) !== null && _a !== void 0 ? _a : uriPattern, options.list.sortKey),
            },
            documents: {
                idField: options.idField,
                listIds: listIds((_b = options.list.uri) !== null && _b !== void 0 ? _b : uriPattern, (_c = options.list.idField) !== null && _c !== void 0 ? _c : options.idField, options.list.sortKey),
                endpoints: {
                    delete: endpoint.del(docUriPattern),
                    get: endpoint.get(docUriPattern),
                    update: endpoint.update(docUriPattern),
                },
            },
        };
    }
    static fn(uriPattern, _fn) {
        return client => ({ path, input }) => {
            const uri = UriTemplate.uri(uriPattern, framework_1.Path.getDocIds(path));
            return _fn(client, uri, input, framework_1.Path.getDocIds(path));
        };
    }
}
exports.endpoint = endpoint;
endpoint.create = (uriPattern) => endpoint.fn(uriPattern, (m2Client, uri, data) => m2Client.post(uri, data));
endpoint.createAsync = (uriPattern) => endpoint.fn(uriPattern, (m2Client, uri, data) => m2Client.post(uri, data, true));
endpoint.del = (uriPattern) => endpoint.fn(uriPattern, (m2Client, uri, data) => m2Client.delete(uri, data));
endpoint.get = (uriPattern) => endpoint.fn(uriPattern, (m2Client, uri) => m2Client.get(uri));
endpoint.list = (uriPattern, sortKey) => endpoint.fn(uriPattern, (m2Client, uri, filters) => m2Client.search(uri, { sortKey, filters }));
endpoint.update = (uriPattern) => endpoint.fn(uriPattern, (m2Client, uri, data) => m2Client.put(uri, data));
endpoint.updateAsync = (uriPattern) => endpoint.fn(uriPattern, (m2Client, uri, data) => m2Client.put(uri, data, true));
endpoint.updateAsyncTEST = (uriPattern) => endpoint.fn(uriPattern, (m2Client, uri, data) => m2Client.put(uri, data, true));
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
function listIds(uriPattern, idField, sortKey) {
    return (client) => (path) => {
        const uri = UriTemplate.uri(uriPattern, framework_1.Path.getDocIds(path));
        const docs = client.search(uri, { sortKey });
        return json_pipe_1.pipe(docs, json_pipe_1.map(doc => doc[idField]));
    };
}
