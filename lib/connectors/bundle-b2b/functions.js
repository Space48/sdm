import { resource, Path } from "../../framework";
import { map, pipe } from "@space48/json-pipe";
export class endpoint {
    constructor() {
        return;
    }
    static crud(uriPattern, idField = "id") {
        const docUriPattern = `${uriPattern}/{id}`;
        return resource({
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
            const uri = UriTemplate.uri(uriPattern, Path.getDocIds(path));
            return _fn(client, uri, input, Path.getDocIds(path));
        };
    }
}
endpoint.create = (uriPattern) => endpoint.fn(uriPattern, (bB2bClient, uri, data) => bB2bClient.post(uri, data));
endpoint.del = (uriPattern) => endpoint.fn(uriPattern, (bB2bClient, uri, data) => bB2bClient.delete(uri, data));
endpoint.get = (uriPattern) => endpoint.fn(uriPattern, (bB2bClient, uri, data) => bB2bClient.get(uri, data));
endpoint.list = (uriPattern) => endpoint.fn(uriPattern, (bB2bClient, uri, query) => bB2bClient.list(uri, query));
endpoint.update = (uriPattern) => endpoint.fn(uriPattern, (bB2bClient, uri, data) => bB2bClient.put(uri, data));
export class UriTemplate {
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
export function listIds(uriPattern, idField = "id") {
    return (client) => (path) => {
        const uri = UriTemplate.uri(uriPattern, Path.getDocIds(path));
        const docs = client.list(uri, { include_fields: [] });
        return pipe(docs, map(doc => doc[idField]));
    };
}
