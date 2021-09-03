"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listIds = exports.UriTemplate = exports.batch = exports.endpoint = void 0;
const framework_1 = require("../../framework");
const json_pipe_1 = require("@space48/json-pipe");
var endpoint;
(function (endpoint) {
    function crud(uriPattern, idField = 'id') {
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
    endpoint.crud = crud;
    function fn(uriPattern, _fn) {
        return client => ({ path, input }) => {
            const uri = UriTemplate.uri(uriPattern, framework_1.Path.getDocIds(path));
            return _fn(client, uri, input, framework_1.Path.getDocIds(path));
        };
    }
    endpoint.fn = fn;
    endpoint.create = (uriPattern) => fn(uriPattern, (bcClient, uri, data) => bcClient.post(uri, data));
    endpoint.del = (uriPattern) => fn(uriPattern, (bcClient, uri, data) => bcClient.delete(uri, data));
    endpoint.get = (uriPattern) => fn(uriPattern, (bcClient, uri, data) => bcClient.get(uri, data));
    endpoint.list = (uriPattern) => fn(uriPattern, (bcClient, uri, query) => bcClient.list(uri, query));
    endpoint.update = (uriPattern) => fn(uriPattern, (bcClient, uri, data) => bcClient.put(uri, data));
})(endpoint = exports.endpoint || (exports.endpoint = {}));
// Following functions are for compatibility with batch endpoints
var batch;
(function (batch) {
    function crud(uriPattern, idField = 'id') {
        return {
            endpoints: {
                create: batch.createOneOrMany(uriPattern),
                delete: batch.deleteMany(uriPattern),
                list: endpoint.list(uriPattern),
                update: batch.updateMany(uriPattern),
            },
            documents: {
                idField,
                listIds: listIds(uriPattern, idField),
                endpoints: {
                    delete: batch.deleteOne(uriPattern),
                    get: batch.getOne(uriPattern),
                },
            },
        };
    }
    batch.crud = crud;
    batch.createOneOrMany = (uriPattern) => endpoint.fn(uriPattern, (bcClient, uri, data) => bcClient.post(uri, Array.isArray(data) ? data : [data]));
    batch.deleteOne = (uriPattern) => endpoint.fn(uriPattern, async (bcClient, uri, data, path) => {
        await bcClient.delete(uri, { ...data, 'id:in': path[path.length - 1] });
    });
    batch.deleteMany = (uriPattern) => endpoint.fn(uriPattern, (bcClient, uri, data) => bcClient.delete(uri, data));
    batch.getOne = (uriPattern) => endpoint.fn(uriPattern, async (bcClient, uri, data, path) => {
        const result = await bcClient.get(uri, { ...data, 'id:in': path[path.length - 1] });
        return result[0];
    });
    batch.updateMany = (uriPattern) => endpoint.fn(uriPattern, (bcClient, uri, data) => bcClient.put(uri, data));
})(batch = exports.batch || (exports.batch = {}));
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
            .filter((field, index) => { var _a; return ((_a = fieldValues[index]) !== null && _a !== void 0 ? _a : null) !== null; })
            .reduce((uri, field, index) => uri.replace(`{${field}}`, String(fieldValues[index])), uriTemplate);
    }
    static fields(uriTemplate) {
        var _a;
        // todo: convert to matchAll once we support ES2020
        return ((_a = uriTemplate.match(/\{[^}]+\}/g)) === null || _a === void 0 ? void 0 : _a.map(match => match.substring(1, match.length - 1))) || [];
    }
}
exports.UriTemplate = UriTemplate;
function listIds(uriPattern, idField = 'id') {
    return (client) => (path) => {
        const uri = UriTemplate.uri(uriPattern, framework_1.Path.getDocIds(path));
        const docs = client.list(uri, { include_fields: [] });
        return json_pipe_1.pipe(docs, json_pipe_1.map(doc => doc[idField]));
    };
}
exports.listIds = listIds;
//# sourceMappingURL=functions.js.map