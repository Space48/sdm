"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAgent = exports.Rest = void 0;
const json_pipe_1 = require("@space48/json-pipe");
const framework_1 = require("../../framework");
const ramda_1 = __importDefault(require("ramda"));
var Rest;
(function (Rest) {
    function crud(uriPattern, childNames = []) {
        const docUriPattern = `${uriPattern}/{id}`;
        return {
            endpoints: {
                createRest: Rest.create(uriPattern),
                listRest: Rest.list(uriPattern),
            },
            documents: {
                idField: 'entity_id',
                listIds: listIds(uriPattern),
                endpoints: {
                    deleteRest: Rest.del(docUriPattern),
                    getRest: Rest.get(docUriPattern),
                    updateRest: Rest.update(docUriPattern),
                },
                resources: children(docUriPattern, childNames),
            },
        };
    }
    Rest.crud = crud;
    function read(uriPattern, childNames = []) {
        const docUriPattern = `${uriPattern}/{id}`;
        return {
            endpoints: {
                listRest: Rest.list(uriPattern),
            },
            documents: {
                idField: 'entity_id',
                listIds: listIds(uriPattern),
                endpoints: {
                    getRest: Rest.get(docUriPattern),
                },
                resources: children(docUriPattern, childNames),
            },
        };
    }
    Rest.read = read;
    function children(parentUri, children) {
        return ramda_1.default.fromPairs(children.map(childName => ramda_1.default.pair(childName, framework_1.resource({
            endpoints: {
                getRest: Rest.get(`${parentUri}/childName`)
            },
        }))));
    }
    function fn(uriPattern, _fn) {
        return ({ rest }) => ({ path, input }) => {
            const uri = UriTemplate.uri(uriPattern, framework_1.Path.getDocIds(path));
            return _fn(rest, uri, input, framework_1.Path.getDocIds(path));
        };
    }
    Rest.create = (uriPattern) => fn(uriPattern, (m2Client, uri, data) => m2Client.post(uri, data));
    Rest.del = (uriPattern) => fn(uriPattern, (m2Client, uri, data) => m2Client.delete(uri, data));
    Rest.get = (uriPattern) => fn(uriPattern, (m2Client, uri) => m2Client.get(uri));
    Rest.list = (uriPattern) => fn(uriPattern, (m2Client, uri, filters) => m2Client.search(uri, { sortKey: 'entity_id', filters }));
    Rest.update = (uriPattern) => fn(uriPattern, (m2Client, uri, data) => m2Client.put(uri, data));
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
    function listIds(uriPattern) {
        return (scope) => (path) => {
            const uri = UriTemplate.uri(uriPattern, framework_1.Path.getDocIds(path));
            const docs = scope.rest.search(uri, { sortKey: 'entity_id' });
            return json_pipe_1.pipe(docs, json_pipe_1.map(doc => doc.entity_id));
        };
    }
})(Rest = exports.Rest || (exports.Rest = {}));
async function useAgent(fn) {
    try {
        return await fn();
    }
    catch (e) {
        if (e instanceof Error && e.message.includes('socket hang up')) {
            return await fn();
        }
        throw e;
    }
}
exports.useAgent = useAgent;
