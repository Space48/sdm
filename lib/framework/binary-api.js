"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeConnectorName = exports.decodeConnectorName = exports.encodeScope = exports.decodeScope = exports.encodeCommandHeader = exports.decodeCommandInput = exports.decodeCommand = exports.encodePathElement = exports.decodePathElement = exports.encodePath = exports.decodePath = exports.encodeScopeAndPath = exports.decodeScopeAndPath = exports.decodePartialPath = void 0;
const _1 = require(".");
const json5_1 = __importDefault(require("json5"));
const PATH_SEPARATOR = '.';
function decodePartialPath(encodedPath) {
    const path = decodePath(encodedPath);
    const [head, tail] = _1.Path.pop(path);
    if (!tail) {
        return head;
    }
    if (Array.isArray(tail) && tail[1] === '') {
        return [...head, tail[0]];
    }
    return [...head, tail];
}
exports.decodePartialPath = decodePartialPath;
function decodeScopeAndPath(encodedScopeAndPath) {
    const [connectorAndScope, ...path] = decodePath(encodedScopeAndPath);
    if (!connectorAndScope) {
        return [undefined, []];
    }
    const scope = Array.isArray(connectorAndScope)
        ? {
            connector: getConnectorName(connectorAndScope[0]),
            scope: connectorAndScope[1],
        }
        : {
            connector: getConnectorName(connectorAndScope),
            scope: '',
        };
    return [scope, path];
}
exports.decodeScopeAndPath = decodeScopeAndPath;
function encodeScopeAndPath(scope, path) {
    return scope.scope === null
        ? encodePath([scope.connector, ...path])
        : encodePath([[scope.connector, scope.scope], ...path]);
}
exports.encodeScopeAndPath = encodeScopeAndPath;
function decodePath(encodedPath) {
    const encodedPathElements = encodedPath.split(PATH_SEPARATOR);
    return encodedPathElements.map(decodePathElement);
}
exports.decodePath = decodePath;
function encodePath(path) {
    const encodedPathElements = path.map(encodePathElement);
    return encodedPathElements.join(PATH_SEPARATOR);
}
exports.encodePath = encodePath;
function decodePathElement(encodedPathElement) {
    const match = /(^.*)\[(.*)\]$/.exec(encodedPathElement);
    if (match) {
        return [decodeIdentifier(match[1]), match[2]];
    }
    return decodeIdentifier(encodedPathElement);
}
exports.decodePathElement = decodePathElement;
function encodePathElement(pathElement) {
    if (typeof pathElement === 'string') {
        return encodeIdentifier(pathElement);
    }
    return `${encodeIdentifier(pathElement[0])}[${pathElement[1]}]`;
}
exports.encodePathElement = encodePathElement;
function decodeCommand(encodedCommandLine) {
    const [encodedPath, ...encodedInputParts] = encodedCommandLine.split(' ');
    const encodedInput = encodedInputParts.join(' ');
    const path = decodePath(encodedPath);
    return {
        path,
        input: encodedInput ? decodeCommandInput(encodedInput) : undefined,
    };
}
exports.decodeCommand = decodeCommand;
function decodeCommandInput(encodedInput) {
    return json5_1.default.parse(encodedInput);
}
exports.decodeCommandInput = decodeCommandInput;
function encodeCommandHeader(command) {
    return encodePath(command.path);
}
exports.encodeCommandHeader = encodeCommandHeader;
function decodeScope(encodedScopeRef) {
    const pathEl = decodePathElement(encodedScopeRef);
    return Array.isArray(pathEl)
        ? {
            connector: getConnectorName(pathEl[0]),
            scope: pathEl[1],
        }
        : {
            connector: getConnectorName(pathEl),
            scope: '',
        };
}
exports.decodeScope = decodeScope;
function encodeScope(scopeRef) {
    return scopeRef.scope
        ? encodePathElement([getConnectorIdentifier(scopeRef.connector), scopeRef.scope])
        : encodePathElement(getConnectorIdentifier(scopeRef.connector));
}
exports.encodeScope = encodeScope;
function decodeConnectorName(encodedConnectorName) {
    const connectorIdentifier = decodeIdentifier(encodedConnectorName);
    return getConnectorName(connectorIdentifier);
}
exports.decodeConnectorName = decodeConnectorName;
function encodeConnectorName(connectorName) {
    return encodeIdentifier(getConnectorIdentifier(connectorName));
}
exports.encodeConnectorName = encodeConnectorName;
function getConnectorName(connectorIdentifier) {
    return connectorIdentifier;
}
function getConnectorIdentifier(connectorName) {
    return connectorName;
}
function encodeIdentifier(identifier) {
    return hyphenate(identifier);
}
function decodeIdentifier(encodedIdentifier) {
    return camelCase(encodedIdentifier);
}
const hyphenate = (value) => (value
    .replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
    .replace(/_/g, '-'));
const camelCase = (value) => (value
    .replace(/^[A-Z]/, g => g.toLowerCase())
    .replace(/[-_][a-z]/g, g => g[1].toUpperCase()));
