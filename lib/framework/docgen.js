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
var Shell;
(function (Shell) {
    function explainInteractiveCliUsage(connector) {
        return describeCommandsOnCli(connector, '').join('\n');
    }
    Shell.explainInteractiveCliUsage = explainInteractiveCliUsage;
    function explainCliUsageOnCli(connector, scopeRef) {
        return describeCommandsOnCli(connector, 'sdm ', scopeRef).join('\n');
    }
    Shell.explainCliUsageOnCli = explainCliUsageOnCli;
    function describeCommandsOnCli(connector, commandPrefix, scopeRef) {
        return json_pipe_1.pipe(connector_1.Path.computeAllHeaders(connector), ramda_1.default.map(header => ramda_1.default.pair(BinaryApi.encodeHeader({ scope: scopeRef, path: header.path }), BinaryApi.encodeHeader({ endpoint: header.endpoint }))), ramda_1.default.groupBy(([encodedResourcePath]) => encodedResourcePath), ramda_1.default.mapObjIndexed(ramda_1.default.map(([, encodedEndpointName]) => encodedEndpointName)), ramda_1.default.toPairs, ramda_1.default.map(([encodedResourcePath, encodedEndpointNames]) => `${commandPrefix}${encodedResourcePath}\n ↳ ${encodedEndpointNames.sort().join(', ')}\n`));
    }
})(Shell = exports.Shell || (exports.Shell = {}));
var Markdown;
(function (Markdown) {
    function explainUsage(connector, connectorName) {
        const commands = describeCommands(1, connector, {
            connector: connectorName,
            scope: connector.scopeNameExample,
        });
        return (`
${title(0, 'Resources')}

${contents(0, commands)}

${commands}
`);
    }
    Markdown.explainUsage = explainUsage;
    function describeCommands(nestingLevel, connector, scopeRef) {
        return json_pipe_1.pipe(connector_1.Path.computeAllHeaders(connector), ramda_1.default.groupBy(header => {
            const path = getPathExcludingDocId(header.path);
            return BinaryApi.encodeHeader({ path });
        }), groups => Object.values(groups), ramda_1.default.map(headers => describeResourceUsage(nestingLevel, headers.map(header => ({ scope: scopeRef, ...header })))), lines => lines.join('\n'));
    }
    function describeResourceUsage(nestingLevel, headers) {
        const headersSorted = ramda_1.default.sortBy(header => header.endpoint, headers);
        const endpointUsage = headersSorted.map(header => describeEndpointUsage(nestingLevel + 1, header)).join('\n\n');
        return (`${pathTitle(nestingLevel, { path: getPathExcludingDocId(headers[0].path) })}

${title(nestingLevel + 1, 'Endpoints')}

${contents(nestingLevel, endpointUsage, title => title.split('.').slice(-1)[0])}

${endpointUsage}
`);
    }
    function describeEndpointUsage(nestingLevel, header) {
        return (`${pathTitle(nestingLevel, { path: header.path, endpoint: header.endpoint })}

*CLI*
\`\`\`sh
$ sdm '${BinaryApi.encodeHeader(header)}' [input-as-json5]
\`\`\`

*TypeScript*
\`\`\`javascript
${encodeJsCommands(header).map(js => `const command = ${js};`).join('\n')}
\`\`\`
`);
    }
    function encodeJsCommands(header) {
        const encodedResourcePaths = encodeResourcePathJs(header.path);
        return encodedResourcePaths.map(_resourcePath => `${header.scope.connector}.${_resourcePath}.${header.endpoint}(input?: unknown)`);
    }
    function encodeResourcePathJs(path) {
        const pathWithAll = path.map(pathEl => Array.isArray(pathEl)
            ? String(pathEl[1]).includes(connector_1.Path.WILDCARD)
                ? `${pathEl[0]}.$all`
                : `${pathEl[0]}.$doc(${String(pathEl[1]).replace('|*', '')})`
            : pathEl).join('.');
        const pathWithDoc = path.map(pathEl => Array.isArray(pathEl)
            ? `${pathEl[0]}.$doc(${String(pathEl[1]).replace('|*', '')})`
            : pathEl).join('.');
        return pathWithAll === pathWithDoc ? [pathWithDoc] : [pathWithDoc, pathWithAll];
    }
    function getPathExcludingDocId(path) {
        const lastElementOfPath = path[path.length - 1];
        return Array.isArray(lastElementOfPath)
            ? [...path.slice(0, -1), lastElementOfPath[0]]
            : path;
    }
    function pathTitle(nestingLevel, header) {
        var _a;
        const encodedHeader = BinaryApi.encodeHeader({
            ...header,
            path: (_a = header.path) === null || _a === void 0 ? void 0 : _a.map(pathEl => Array.isArray(pathEl) ? [pathEl[0], ''] : pathEl),
        });
        return title(nestingLevel, encodedHeader);
    }
    function title(nestingLevel, title) {
        return `${'#'.repeat(nestingLevel + 1)} ${title}`;
    }
    function contents(nestingLevel, body, titleMapper) {
        return body
            .split('\n')
            .filter(line => line.startsWith(`${'#'.repeat(nestingLevel + 2)} `))
            .map(line => line.slice(nestingLevel + 3))
            .map(sectionTitle => {
            const linkTitle = titleMapper ? titleMapper(sectionTitle) : sectionTitle;
            return linkToSection(linkTitle, sectionTitle);
        })
            .map(contentsTitle => ` * ${contentsTitle}`)
            .join('\n');
    }
    function linkToSection(linkTitle, sectionTitle) {
        return `[${linkTitle}](#${sectionTitle.replace(/[\[\]\.]/g, '')})`;
    }
})(Markdown = exports.Markdown || (exports.Markdown = {}));
//# sourceMappingURL=docgen.js.map