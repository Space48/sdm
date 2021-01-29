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
        return json_pipe_1.pipe(connector_1.Path.computeAll(connector), ramda_1.default.map(connector_1.Path.popEndpointName), ramda_1.default.map(([resourcePath, endpointName]) => ramda_1.default.pair(scopeRef ? BinaryApi.encodeScopeAndPath(scopeRef, resourcePath) : BinaryApi.encodePath(resourcePath), BinaryApi.encodePathElement(endpointName))), ramda_1.default.groupBy(([encodedResourcePath]) => encodedResourcePath), ramda_1.default.mapObjIndexed(ramda_1.default.map(([, encodedEndpointName]) => encodedEndpointName)), ramda_1.default.toPairs, ramda_1.default.map(([encodedResourcePath, encodedEndpointNames]) => `${commandPrefix}${encodedResourcePath}\n ↳ ${encodedEndpointNames.sort().join(', ')}\n`));
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
${title(0, 'Using the CLI interface')}

${title(0, 'Using the TypeScript interface')}

${title(0, 'Resources')}

${contents(0, commands)}

${commands}
`);
    }
    Markdown.explainUsage = explainUsage;
    function describeCommands(nestingLevel, connector, scopeRef) {
        return json_pipe_1.pipe(connector_1.Path.computeAll(connector), ramda_1.default.groupBy(path => {
            const resourcePath = getResourcePathExcludingDocId(path);
            return BinaryApi.encodePath(resourcePath);
        }), Object.values, ramda_1.default.map(endpointPaths => describeResourceUsage(nestingLevel, scopeRef, endpointPaths)), lines => lines.join('\n'));
    }
    function describeResourceUsage(nestingLevel, scope, endpointPaths) {
        const resourcePath = getResourcePathExcludingDocId(endpointPaths[0]);
        const endpointsSorted = ramda_1.default.sortBy(path => path[path.length - 1], endpointPaths);
        const endpointUsage = endpointsSorted.map(path => describeEndpointUsage(nestingLevel + 1, scope, path)).join('\n\n');
        return (`${pathTitle(nestingLevel, resourcePath)}

${title(nestingLevel + 1, 'Endpoints')}

${contents(nestingLevel, endpointUsage, title => title.split('.').slice(-1)[0])}

${endpointUsage}
`);
    }
    function describeEndpointUsage(nestingLevel, scope, path) {
        return (`${pathTitle(nestingLevel, path)}

*CLI*
\`\`\`sh
$ sdm '${BinaryApi.encodeScopeAndPath(scope, path)}' [input-as-json5]
\`\`\`

*TypeScript*
\`\`\`javascript
${encodeJsCommands(scope.connector, path).map(js => `const command = ${js};`).join('\n')}
\`\`\`
`);
    }
    function encodeJsCommands(connectorName, path) {
        const [resourcePath, endpointName] = connector_1.Path.popEndpointName(path);
        const encodedResourcePaths = encodeResourcePathJs(resourcePath);
        return encodedResourcePaths.map(_resourcePath => `${connectorName}.${_resourcePath}.${endpointName}(input?: unknown)`);
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
    function getResourcePathExcludingDocId(endpointPath) {
        const [resourcePath] = connector_1.Path.popEndpointName(endpointPath);
        const lastElementOfPath = resourcePath[resourcePath.length - 1];
        return Array.isArray(lastElementOfPath)
            ? [...resourcePath.slice(0, -1), lastElementOfPath[0]]
            : resourcePath;
    }
    function pathTitle(nestingLevel, path) {
        const pathWithoutIds = path.map(pathEl => Array.isArray(pathEl) ? [pathEl[0], ''] : pathEl);
        const encodedPath = BinaryApi.encodePath(pathWithoutIds);
        return title(nestingLevel, encodedPath);
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
