import { ConnectorDefinition, FullyQualifiedMessageHeader, MessageHeader, Path, ScopeRef } from "./connector";
import * as BinaryApi from "./binary-api";
import R from "ramda";
import { pipe } from "@space48/json-pipe";

export namespace Shell {
  export function explainInteractiveCliUsage(connector: ConnectorDefinition): string {
    return describeCommandsOnCli(connector, '').join('\n');
  }
  
  export function explainCliUsageOnCli(connector: ConnectorDefinition, scopeRef: ScopeRef): string {
    return describeCommandsOnCli(connector, 'sdm ', scopeRef).join('\n');
  }

  function describeCommandsOnCli(connector: ConnectorDefinition, commandPrefix: string, scopeRef?: ScopeRef): string[] {
    return pipe(
      Path.computeAllHeaders(connector),
      R.map(header => R.pair(
        BinaryApi.encodeHeader({ scope: scopeRef, path: header.path }),
        BinaryApi.encodeHeader({ endpoint: header.endpoint }),
      )),
      R.groupBy(([encodedResourcePath]) => encodedResourcePath),
      R.mapObjIndexed(R.map(([, encodedEndpointName]) => encodedEndpointName)),
      R.toPairs,
      R.map(([encodedResourcePath, encodedEndpointNames]) =>
        `${commandPrefix}${encodedResourcePath}\n ↳ ${encodedEndpointNames.sort().join(', ')}\n`)
    );
  }
}

export namespace Markdown {
  export function explainUsage(connector: ConnectorDefinition, connectorName: string): string {
    const commands = describeCommands(1, connector, {
      connector: connectorName,
      scope: connector.scopeNameExample,
    });

    return (
`
${title(0, 'Resources')}

${contents(0, commands)}

${commands}
`
    );
  }

  function describeCommands(nestingLevel: number, connector: ConnectorDefinition, scopeRef: ScopeRef): string {
    return pipe(
      Path.computeAllHeaders(connector),
      R.groupBy(header => {
        const path = getPathExcludingDocId(header.path);
        return BinaryApi.encodeHeader({ path });
      }),
      groups => Object.values(groups),
      R.map(headers => describeResourceUsage(nestingLevel, headers.map(header => ({scope: scopeRef, ...header})))),
      lines => lines.join('\n'),
    );
  }

  function describeResourceUsage(nestingLevel: number, headers: FullyQualifiedMessageHeader[]): string {
    const headersSorted = R.sortBy(header => header.endpoint, headers);
    const endpointUsage = headersSorted.map(header => describeEndpointUsage(nestingLevel + 1, header)).join('\n\n');

    return (
`${pathTitle(nestingLevel, { path: getPathExcludingDocId(headers[0].path) })}

${title(nestingLevel + 1, 'Endpoints')}

${contents(nestingLevel, endpointUsage, title => title.split('.').slice(-1)[0])}

${endpointUsage}
`
    );
  }

  function describeEndpointUsage(nestingLevel: number, header: FullyQualifiedMessageHeader): string {
    return (
`${pathTitle(nestingLevel, { path: header.path, endpoint: header.endpoint })}

*CLI*
\`\`\`sh
$ sdm '${BinaryApi.encodeHeader(header)}' [input-as-json5]
\`\`\`

*TypeScript*
\`\`\`javascript
${encodeJsCommands(header).map(js => `const command = ${js};`).join('\n')}
\`\`\`
`
    );
  }

  function encodeJsCommands(header: FullyQualifiedMessageHeader): string[] {
    const encodedResourcePaths = encodeResourcePathJs(header.path);
    return encodedResourcePaths.map(
      _resourcePath => `${header.scope.connector}.${_resourcePath}.${header.endpoint}(input?: unknown)`
    );
  }

  function encodeResourcePathJs(path: Path): string[] {
    const pathWithAll = path.map(
      pathEl => Array.isArray(pathEl)
        ? String(pathEl[1]).includes(Path.WILDCARD)
           ? `${pathEl[0]}.$all`
           : `${pathEl[0]}.$doc(${String(pathEl[1]).replace('|*', '')})`
        : pathEl
    ).join('.');

    const pathWithDoc = path.map(
      pathEl => Array.isArray(pathEl)
        ? `${pathEl[0]}.$doc(${String(pathEl[1]).replace('|*', '')})`
        : pathEl
    ).join('.');

    return pathWithAll === pathWithDoc ? [pathWithDoc] : [pathWithDoc, pathWithAll];
  }

  function getPathExcludingDocId(path: Path): Path {
    const lastElementOfPath = path[path.length - 1];
    return Array.isArray(lastElementOfPath)
      ? [...path.slice(0, -1), lastElementOfPath[0]]
      : path;
  }

  function pathTitle(nestingLevel: number, header: Partial<MessageHeader>): string {
    const encodedHeader = BinaryApi.encodeHeader({
      ...header,
      path: header.path?.map(pathEl => Array.isArray(pathEl) ? [pathEl[0], ''] : pathEl) as Path,
    });
    return title(nestingLevel, encodedHeader);
  }

  function title(nestingLevel: number, title: string): string {
    return `${'#'.repeat(nestingLevel + 1)} ${title}`;
  }

  function contents(nestingLevel: number, body: string, titleMapper?: (title: string) => string): string {
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

  function linkToSection(linkTitle: string, sectionTitle: string): string {
    return `[${linkTitle}](#${sectionTitle.replace(/[\[\]\.]/g, '')})`;
  }
}
