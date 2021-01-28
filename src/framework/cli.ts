import { Command, Path, ScopeRef } from "../framework";
import json5 from "json5";

const PATH_SEPARATOR = '.';

export function decodePartialPath(encodedPath: string): Path {
  const path = decodePath(encodedPath);
  const [head, tail] = Path.pop(path);
  if (!tail) {
    return head;
  }
  if (Array.isArray(tail) && tail[1] === '') {
    return [...head, tail[0]];
  }
  return [...head, tail];
}

export function decodeScopeAndPath(encodedScopeAndPath: string): [ScopeRef | undefined, Path] {
  const [connectorAndScope, ...path] = decodePath(encodedScopeAndPath);
  if (!connectorAndScope) {
    return [undefined, []];
  }
  const scope = Array.isArray(connectorAndScope)
    ? {
      connector: getConnectorName(connectorAndScope[0]),
      scope: connectorAndScope[1] as string,
    }
    : {
      connector: getConnectorName(connectorAndScope),
      scope: '',
    };
  return [ scope, path ];
}

export function decodePath(encodedPath: string): Path {
  const encodedPathElements = encodedPath.split(PATH_SEPARATOR);
  return encodedPathElements.map(decodePathElement);
}

export function encodePath(path: Path): string {
  const encodedPathElements = path.map(encodePathElement);
  return encodedPathElements.join(PATH_SEPARATOR);
}

export function decodePathElement(encodedPathElement: string): Path[number] {
  const match = /(^.*)\[(.*)\]$/.exec(encodedPathElement);
  if (match) {
    return [decodeIdentifier(match[1]), match[2]];
  }
  return decodeIdentifier(encodedPathElement);
}

export function encodePathElement(pathElement: Path[number]): string {
  if (typeof pathElement === 'string') {
    return encodeIdentifier(pathElement);
  }
  return `${encodeIdentifier(pathElement[0])}[${pathElement[1]}]`;
}

export function decodeCommand(encodedCommandLine: string): Command {
  const [encodedPath, ...encodedInputParts] = encodedCommandLine.split(' ');
  const encodedInput = encodedInputParts.join(' ');
  const path = decodePath(encodedPath);
  return {
    path,
    input: encodedInput ? decodeCommandInput(encodedInput) : undefined,
  };
}

export function decodeCommandInput(encodedInput: string): any {
  return json5.parse(encodedInput);
}

export function encodeCommandHeader(command: Command): string {
  return encodePath(command.path);
}

export function decodeScope(encodedScopeRef: string): ScopeRef {
  const pathEl = decodePathElement(encodedScopeRef); 
  return Array.isArray(pathEl)
    ? {
      connector: getConnectorName(pathEl[0]),
      scope: pathEl[1] as string,
    }
    : {
      connector: getConnectorName(pathEl),
      scope: '',
    };
}

export function encodeScope(scopeRef: ScopeRef): string {
  return scopeRef.scope
    ? encodePathElement([getConnectorIdentifier(scopeRef.connector), scopeRef.scope])
    : encodePathElement(getConnectorIdentifier(scopeRef.connector));
}

export function decodeConnectorName(encodedConnectorName: string): string {
  const connectorIdentifier = decodeIdentifier(encodedConnectorName)
  return getConnectorName(connectorIdentifier);
}

export function encodeConnectorName(connectorName: string): string {
  return encodeIdentifier(getConnectorIdentifier(connectorName));
}

function getConnectorName(connectorIdentifier: string): string {
  return connectorIdentifier;
  //return connectorAliases[connectorIdentifier] ?? connectorIdentifier;
}

function getConnectorIdentifier(connectorName: string): string {
  return connectorName;
  //const alias = Object.entries(connectorAliases).find(([_, name]) => name === connectorName)?.[0];
  //return alias ?? connectorName;
}

function encodeIdentifier(identifier: string): string {
  return hyphenate(identifier);
}

function decodeIdentifier(encodedIdentifier: string): string {
  return camelCase(encodedIdentifier);
}

const hyphenate = (value: string): string => (
  value
    .replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
    .replace(/_/g, '-')
);

const camelCase = (value: string): string => (
  value
    .replace(/^[A-Z]/, g => g.toLowerCase())
    .replace(/[-_][a-z]/g, g => g[1].toUpperCase())
);
