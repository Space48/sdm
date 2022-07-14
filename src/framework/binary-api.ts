import { Command, Path, ScopeRef } from ".";
import json5 from "json5";
import { FullyQualifiedMessageHeader, MessageHeader } from "./connector";

const PATH_SEPARATOR = ".";

export function decodeIncompletePath(encodedPath: string): Path {
  const [head, tail] = decodeMaybeIncompletePath(encodedPath);
  return tail === undefined ? head : [...head, tail];
}

export function decodeFQHeader(encodedHeader: string): FullyQualifiedMessageHeader {
  const [connectorAndScope, ...path] = decodePath(encodedHeader);
  const endpoint = path.pop();
  if (!(path.length > 0 && typeof endpoint === "string")) {
    throw new Error();
  }
  const scope = Array.isArray(connectorAndScope)
    ? {
        connector: getConnectorName(connectorAndScope[0]),
        scope: connectorAndScope[1] as string,
      }
    : {
        connector: getConnectorName(connectorAndScope),
        scope: "",
      };
  return { scope, path, endpoint };
}

export function decodeHeader(encodedHeader: string): MessageHeader {
  const path = decodePath(encodedHeader);
  const endpoint = path.pop();
  if (!(path.length > 0 && typeof endpoint === "string")) {
    throw new Error();
  }
  return { path, endpoint };
}

export function encodeHeader({
  scope,
  path,
  endpoint,
}: Partial<FullyQualifiedMessageHeader>): string {
  return encodePath(
    [
      scope?.scope ? [scope.connector, scope.scope] : scope?.connector,
      ...(path ?? []),
      endpoint,
    ].filter(Boolean) as Path,
  );
}

export function decodeCommand(encodedCommand: string): Command {
  const [encodedHeader, ...encodedInputParts] = encodedCommand.split(" ");
  const encodedInput = encodedInputParts.join(" ");
  return {
    ...decodeHeader(encodedHeader),
    input: encodedInput ? decodeCommandInput(encodedInput) : undefined,
  };
}

export function decodeCommandInput(encodedInput: string): any {
  return json5.parse(encodedInput);
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
        scope: "",
      };
}

export function decodeConnectorName(encodedConnectorName: string): string {
  const connectorIdentifier = decodeIdentifier(encodedConnectorName);
  return getConnectorName(connectorIdentifier);
}

export function encodeConnectorName(connectorName: string): string {
  return encodeIdentifier(getConnectorIdentifier(connectorName));
}

function decodePath(encodedPath: string): Path {
  const [path, tail] = decodeMaybeIncompletePath(encodedPath);
  if (tail === undefined) {
    return path;
  }
  throw new Error(`Invalid path '${encodedPath}'.`);
}

function decodeMaybeIncompletePath(encodedPath: string): [path: Path, invalidTail?: string] {
  let remaining = encodedPath;
  const elements: Path.Element[] = [];
  while (remaining.length > 0) {
    const match = remaining.match(/^((?:[^\.\[\]]+)(?:\[[^\]]*\])?)[\.$]*/);
    if (!match) {
      return [elements, remaining];
    }
    elements.push(decodePathElement(match[1]));
    remaining = remaining.slice(match[0].length);
  }
  return [elements];
}

function encodePath(path: Path): string {
  try {
    const encodedPathElements = path.map(encodePathElement);
    return encodedPathElements.join(PATH_SEPARATOR);
  } catch (e) {
    console.log({ path });
    throw e;
  }
}

function decodePathElement(encodedPathElement: string): Path[number] {
  const match = /(^.*)\[(.*)\]$/.exec(encodedPathElement);
  if (match) {
    return [decodeIdentifier(match[1]), match[2]];
  }
  return decodeIdentifier(encodedPathElement);
}

function encodePathElement(pathElement: Path[number]): string {
  if (typeof pathElement === "string") {
    return encodeIdentifier(pathElement);
  }
  return `${encodeIdentifier(pathElement[0])}[${pathElement[1]}]`;
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

const hyphenate = (value: string): string =>
  value.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`).replace(/_/g, "-");

const camelCase = (value: string): string =>
  value.replace(/^[A-Z]/, g => g.toLowerCase()).replace(/[-_][a-z]/g, g => g[1].toUpperCase());
