import { ConnectorDefinition, Path, ScopeRef } from "./connector";
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
      Path.computeAll(connector),
      R.map(Path.popEndpointName),
      R.map(([resourcePath, endpointName]) => R.pair(
        scopeRef ? BinaryApi.encodeScopeAndPath(scopeRef, resourcePath) : BinaryApi.encodePath(resourcePath),
        BinaryApi.encodePathElement(endpointName),
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
${title(0, 'Using the CLI interface')}

${title(0, 'Using the TypeScript interface')}

${title(0, 'Resources')}

${contents(0, commands)}

${commands}
`
    );
  }

  function describeCommands(nestingLevel: number, connector: ConnectorDefinition, scopeRef: ScopeRef): string {
    return pipe(
      Path.computeAll(connector),
      R.groupBy(path => {
        const resourcePath = getResourcePathExcludingDocId(path);
        return BinaryApi.encodePath(resourcePath);
      }),
      Object.values,
      R.map(endpointPaths => describeResourceUsage(nestingLevel, scopeRef, endpointPaths)),
      lines => lines.join('\n'),
    );
  }

  function describeResourceUsage(nestingLevel: number, scope: ScopeRef, endpointPaths: Path[]): string {
    const resourcePath = getResourcePathExcludingDocId(endpointPaths[0]);
    const resourcePathWithoutIds = resourcePath.map(pathEl => Array.isArray(pathEl) ? [pathEl[0], ''] : pathEl) as Path;
    const endpointsSorted = R.sortBy(
      path => path[path.length - 1] as string,
      endpointPaths
    );

    return (
`${title(nestingLevel, BinaryApi.encodePath(resourcePathWithoutIds))}

${endpointsSorted.map(path => describeEndpointUsage(nestingLevel + 1, scope, path)).join('\n\n')}
`
    );
  }

  function describeEndpointUsage(nestingLevel: number, scope: ScopeRef, path: Path): string {
    const [, endpointName] = Path.popEndpointName(path);
    return (
`${title(nestingLevel, endpointName)}

*CLI*
\`\`\`sh
$ sdm ${BinaryApi.encodeScopeAndPath(scope, path)}
\`\`\`

*TypeScript*
\`\`\`javascript
${encodeJsCommands(scope.connector, path).map(js => `const command = ${js};`).join('\n')}
\`\`\`
`
    );
  }

  function encodeJsCommands(connectorName: string, path: Path): string[] {
    const [resourcePath, endpointName] = Path.popEndpointName(path);
    const encodedResourcePaths = encodeResourcePathJs(resourcePath);
    return encodedResourcePaths.map(
      _resourcePath => `${connectorName}.${_resourcePath}.${endpointName}(input?: unknown)`
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

  function getResourcePathExcludingDocId(endpointPath: Path): Path {
    const [resourcePath] = Path.popEndpointName(endpointPath);
    const lastElementOfPath = resourcePath[resourcePath.length - 1];
    return Array.isArray(lastElementOfPath)
      ? [...resourcePath.slice(0, -1), lastElementOfPath[0]]
      : resourcePath;
  }

  function title(nestingLevel: number, title: string): string {
    return `${'#'.repeat(nestingLevel + 1)} ${title}`;
  }

  function contents(nestingLevel: number, body: string): string {
    const titles =
      body
        .split('\n')
        .filter(line => line.startsWith(`${'#'.repeat(nestingLevel + 2)} `))
        .map(line => line.slice(nestingLevel + 3))
        .map(title => linkToTitle(title));

    return titles.map(title => ` * ${title}`).join('\n');
  }

  function linkToTitle(title: string): string {
    return `[${title}](#${title.replace(/-[]./g, '')})`;
  }
}
