import { Path, } from "./connector";
import * as BinaryApi from "./binary-api";
import R from "ramda";
import { pipe } from "@space48/json-pipe";
export class Shell {
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
        return pipe(Path.computeAllHeaders(connector), R.map(header => R.pair(BinaryApi.encodeHeader({ scope: scopeRef, path: header.path }), BinaryApi.encodeHeader({ endpoint: header.endpoint }))), R.groupBy(([encodedResourcePath]) => encodedResourcePath), R.mapObjIndexed(R.map(([, encodedEndpointName]) => encodedEndpointName)), R.toPairs, R.map(([encodedResourcePath, encodedEndpointNames]) => `${commandPrefix}${encodedResourcePath}\n ↳ ${encodedEndpointNames.sort().join(", ")}\n`));
    }
}
export class Markdown {
    constructor() {
        return;
    }
    static explainSummary(connector, connectorName) {
        const commands = Markdown.describeCommands(1, connector, {
            connector: connectorName,
            scope: connector.scopeNameExample,
        });
        return `
${Markdown.title(1, connectorName)}

${Markdown.title(2, "Resources")}

${Markdown.contents(0, commands)}

`;
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
        return pipe(Path.computeAllHeaders(connector), R.groupBy(header => {
            const path = Markdown.getPathExcludingDocId(header.path);
            return BinaryApi.encodeHeader({ path });
        }), groups => Object.values(groups), R.map(headers => Markdown.describeResourceUsage(nestingLevel, headers.map(header => ({ scope: scopeRef, ...header })))), lines => lines.join("\n"));
    }
    static describeResourceUsage(nestingLevel, headers) {
        const headersSorted = R.sortBy(header => header.endpoint, headers);
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
            ? String(pathEl[1]).includes(Path.WILDCARD)
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
