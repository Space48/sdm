"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Markdown = exports.Shell = void 0;
const connector_1 = require("./connector");
const BinaryApi = __importStar(require("./binary-api"));
const ramda_1 = __importDefault(require("ramda"));
const json_pipe_1 = require("@space48/json-pipe");
class Shell {
    constructor() {
        return;
    }
    static explainInteractiveCliUsage(connector) {
        return Shell.describeCommandsOnCli(connector, "").join("\n");
    }
    static explainCliUsageOnCli(connector, scopeRef) {
        return Shell.describeCommandsOnCli(connector, "sdm ", scopeRef).join("\n");
    }
    static describeCommandsOnCli(connector, commandPrefix, scopeRef) {
        return json_pipe_1.pipe(connector_1.Path.computeAllHeaders(connector), ramda_1.default.map(header => ramda_1.default.pair(BinaryApi.encodeHeader({ scope: scopeRef, path: header.path }), BinaryApi.encodeHeader({ endpoint: header.endpoint }))), ramda_1.default.groupBy(([encodedResourcePath]) => encodedResourcePath), ramda_1.default.mapObjIndexed(ramda_1.default.map(([, encodedEndpointName]) => encodedEndpointName)), ramda_1.default.toPairs, ramda_1.default.map(([encodedResourcePath, encodedEndpointNames]) => `${commandPrefix}${encodedResourcePath}\n ↳ ${encodedEndpointNames.sort().join(", ")}\n`));
    }
}
exports.Shell = Shell;
class Markdown {
    constructor() {
        return;
    }
    static explainUsage(connector, connectorName) {
        const commands = Markdown.describeCommands(1, connector, {
            connector: connectorName,
            scope: connector.scopeNameExample,
        });
        return `
${Markdown.title(0, "Resources")}

${Markdown.contents(0, commands)}

${commands}
`;
    }
    static describeCommands(nestingLevel, connector, scopeRef) {
        return json_pipe_1.pipe(connector_1.Path.computeAllHeaders(connector), ramda_1.default.groupBy(header => {
            const path = Markdown.getPathExcludingDocId(header.path);
            return BinaryApi.encodeHeader({ path });
        }), groups => Object.values(groups), ramda_1.default.map(headers => Markdown.describeResourceUsage(nestingLevel, headers.map(header => ({ scope: scopeRef, ...header })))), lines => lines.join("\n"));
    }
    static describeResourceUsage(nestingLevel, headers) {
        const headersSorted = ramda_1.default.sortBy(header => header.endpoint, headers);
        const endpointUsage = headersSorted
            .map(header => Markdown.describeEndpointUsage(nestingLevel + 1, header))
            .join("\n\n");
        return `${Markdown.pathTitle(nestingLevel, {
            path: Markdown.getPathExcludingDocId(headers[0].path),
        })}

${Markdown.title(nestingLevel + 1, "Endpoints")}

${Markdown.contents(nestingLevel, endpointUsage, title => title.split(".").slice(-1)[0])}

${endpointUsage}
`;
    }
    static describeEndpointUsage(nestingLevel, header) {
        return `${Markdown.pathTitle(nestingLevel, { path: header.path, endpoint: header.endpoint })}

*CLI*
\`\`\`sh
$ sdm '${BinaryApi.encodeHeader(header)}' [input-as-json5]
\`\`\`

*TypeScript*
\`\`\`javascript
${Markdown.encodeJsCommands(header)
            .map(js => `const command = ${js};`)
            .join("\n")}
\`\`\`
`;
    }
    static encodeJsCommands(header) {
        const encodedResourcePaths = Markdown.encodeResourcePathJs(header.path);
        return encodedResourcePaths.map(_resourcePath => `${header.scope.connector}.${_resourcePath}.${header.endpoint}(input?: unknown)`);
    }
    static encodeResourcePathJs(path) {
        const pathWithAll = path
            .map(pathEl => Array.isArray(pathEl)
            ? String(pathEl[1]).includes(connector_1.Path.WILDCARD)
                ? `${pathEl[0]}.$all`
                : `${pathEl[0]}.$doc(${String(pathEl[1]).replace("|*", "")})`
            : pathEl)
            .join(".");
        const pathWithDoc = path
            .map(pathEl => Array.isArray(pathEl)
            ? `${pathEl[0]}.$doc(${String(pathEl[1]).replace("|*", "")})`
            : pathEl)
            .join(".");
        return pathWithAll === pathWithDoc ? [pathWithDoc] : [pathWithDoc, pathWithAll];
    }
    static getPathExcludingDocId(path) {
        const lastElementOfPath = path[path.length - 1];
        return Array.isArray(lastElementOfPath) ? [...path.slice(0, -1), lastElementOfPath[0]] : path;
    }
    static pathTitle(nestingLevel, header) {
        var _a;
        const encodedHeader = BinaryApi.encodeHeader({
            ...header,
            path: (_a = header.path) === null || _a === void 0 ? void 0 : _a.map(pathEl => (Array.isArray(pathEl) ? [pathEl[0], ""] : pathEl)),
        });
        return Markdown.title(nestingLevel, encodedHeader);
    }
    static title(nestingLevel, title) {
        return `${"#".repeat(nestingLevel + 1)} ${title}`;
    }
    static contents(nestingLevel, body, titleMapper) {
        return body
            .split("\n")
            .filter(line => line.startsWith(`${"#".repeat(nestingLevel + 2)} `))
            .map(line => line.slice(nestingLevel + 3))
            .map(sectionTitle => {
            const linkTitle = titleMapper ? titleMapper(sectionTitle) : sectionTitle;
            return Markdown.linkToSection(linkTitle, sectionTitle);
        })
            .map(contentsTitle => ` * ${contentsTitle}`)
            .join("\n");
    }
    static linkToSection(linkTitle, sectionTitle) {
        return `[${linkTitle}](#${sectionTitle.replace(/[[\].]/g, "")})`;
    }
}
exports.Markdown = Markdown;
