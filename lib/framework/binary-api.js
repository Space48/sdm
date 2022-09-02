"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeConnectorName = exports.decodeConnectorName = exports.decodeScope = exports.decodeCommandInput = exports.decodeCommand = exports.encodeHeader = exports.decodeHeader = exports.decodeFQHeader = exports.decodeIncompletePath = void 0;
const json5_1 = __importDefault(require("json5"));
const PATH_SEPARATOR = ".";
function decodeIncompletePath(encodedPath) {
    const [head, tail] = decodeMaybeIncompletePath(encodedPath);
    return tail === undefined ? head : [...head, tail];
}
exports.decodeIncompletePath = decodeIncompletePath;
function decodeFQHeader(encodedHeader) {
    const [connectorAndScope, ...path] = decodePath(encodedHeader);
    const endpoint = path.pop();
    if (!(path.length > 0 && typeof endpoint === "string")) {
        throw new Error();
    }
    const scope = Array.isArray(connectorAndScope)
        ? {
            connector: getConnectorName(connectorAndScope[0]),
            scope: connectorAndScope[1],
        }
        : {
            connector: getConnectorName(connectorAndScope),
            scope: "",
        };
    return { scope, path, endpoint };
}
exports.decodeFQHeader = decodeFQHeader;
function decodeHeader(encodedHeader) {
    const path = decodePath(encodedHeader);
    const endpoint = path.pop();
    if (!(path.length > 0 && typeof endpoint === "string")) {
        throw new Error();
    }
    return { path, endpoint };
}
exports.decodeHeader = decodeHeader;
function encodeHeader({ scope, path, endpoint, }) {
    return encodePath([
        (scope === null || scope === void 0 ? void 0 : scope.scope) ? [scope.connector, scope.scope] : scope === null || scope === void 0 ? void 0 : scope.connector,
        ...(path !== null && path !== void 0 ? path : []),
        endpoint,
    ].filter(Boolean));
}
exports.encodeHeader = encodeHeader;
function decodeCommand(encodedCommand) {
    const [encodedHeader, ...encodedInputParts] = encodedCommand.split(" ");
    const encodedInput = encodedInputParts.join(" ");
    return {
        ...decodeHeader(encodedHeader),
        input: encodedInput ? decodeCommandInput(encodedInput) : undefined,
    };
}
exports.decodeCommand = decodeCommand;
function decodeCommandInput(encodedInput) {
    return json5_1.default.parse(encodedInput);
}
exports.decodeCommandInput = decodeCommandInput;
function decodeScope(encodedScopeRef) {
    const pathEl = decodePathElement(encodedScopeRef);
    return Array.isArray(pathEl)
        ? {
            connector: getConnectorName(pathEl[0]),
            scope: pathEl[1],
        }
        : {
            connector: getConnectorName(pathEl),
            scope: "",
        };
}
exports.decodeScope = decodeScope;
function decodeConnectorName(encodedConnectorName) {
    const connectorIdentifier = decodeIdentifier(encodedConnectorName);
    return getConnectorName(connectorIdentifier);
}
exports.decodeConnectorName = decodeConnectorName;
function encodeConnectorName(connectorName) {
    return encodeIdentifier(getConnectorIdentifier(connectorName));
}
exports.encodeConnectorName = encodeConnectorName;
function decodePath(encodedPath) {
    const [path, tail] = decodeMaybeIncompletePath(encodedPath);
    if (tail === undefined) {
        return path;
    }
    throw new Error(`Invalid path '${encodedPath}'.`);
}
function decodeMaybeIncompletePath(encodedPath) {
    let remaining = encodedPath;
    const elements = [];
    while (remaining.length > 0) {
        const match = remaining.match(/^((?:[^.[\]]+)(?:\[[^\]]*\])?)[.$]*/);
        if (!match) {
            return [elements, remaining];
        }
        elements.push(decodePathElement(match[1]));
        remaining = remaining.slice(match[0].length);
    }
    return [elements];
}
function encodePath(path) {
    try {
        const encodedPathElements = path.map(encodePathElement);
        return encodedPathElements.join(PATH_SEPARATOR);
    }
    catch (e) {
        console.log({ path });
        throw e;
    }
}
function decodePathElement(encodedPathElement) {
    const match = /(^.*)\[(.*)\]$/.exec(encodedPathElement);
    if (match) {
        return [decodeIdentifier(match[1]), match[2]];
    }
    return decodeIdentifier(encodedPathElement);
}
function encodePathElement(pathElement) {
    if (typeof pathElement === "string") {
        return encodeIdentifier(pathElement);
    }
    return `${encodeIdentifier(pathElement[0])}[${pathElement[1]}]`;
}
function getConnectorName(connectorIdentifier) {
    return connectorIdentifier;
    //return connectorAliases[connectorIdentifier] ?? connectorIdentifier;
}
function getConnectorIdentifier(connectorName) {
    return connectorName;
    //const alias = Object.entries(connectorAliases).find(([_, name]) => name === connectorName)?.[0];
    //return alias ?? connectorName;
}
function encodeIdentifier(identifier) {
    return hyphenate(identifier);
}
function decodeIdentifier(encodedIdentifier) {
    return camelCase(encodedIdentifier);
}
const hyphenate = (value) => value.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`).replace(/_/g, "-");
const camelCase = (value) => value.replace(/^[A-Z]/, g => g.toLowerCase()).replace(/[-_][a-z]/g, g => g[1].toUpperCase());
