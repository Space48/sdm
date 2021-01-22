#!/usr/bin/env node

import { connectors, localConfigConnector } from "../connectors";
import { Command, ConnectorDefinition, Connector, ConnectorScope, Path, ScopeRef, ResourceDefinitionMap, ResourceDefinition, DocumentDefinition } from "../framework";
import * as readline from "readline";
import { compose, map, pipe, streamJson, takeWhile, tap, transformJson } from "@space48/json-pipe";
import json5 from "json5";
import chalk from "chalk";
import { defaultConfigRepository, defaultScopeLocator } from "..";
import R from "ramda";

const connectorAliases: Record<string, string|undefined> = {
  m2: 'magento2',
  bc: 'bigCommerce',
};

enum Flag {
  Force = 'force',
}
const availableFlags = Object.values(Flag) as string[];

const argsExcludingFlags = process.argv.slice(2).filter(arg => !arg.startsWith('--'));
const flags = process.argv.slice(2)
  .filter(arg => arg.startsWith('--'))
  .map(arg => arg.slice(2));
const invalidFlags = flags.filter(flag => !availableFlags.includes(flag));
if (invalidFlags.length > 0) {
  const renderOptions = (options: string[]) => options.map(flag => `--${flag}`).join(', ');
  process.stderr.write(`Invalid option${invalidFlags.length > 1 ? 's' : ''} ${renderOptions(invalidFlags)}. `);
  process.stderr.write(`Valid options are ${renderOptions(availableFlags)}.\n`);
  process.exit(1);
}

async function main() {
  try {
    if (argsExcludingFlags[0] === 'help') {
      await runHelpMode();
      process.exit(0);
    }
    if (argsExcludingFlags[0]) {
      const [scope, path] = BinaryApi.decodeScopeAndPath(argsExcludingFlags[0]);
      if (scope && path.length > 1) {
        await runNonInteractiveMode();
        process.exit(0);
      }
    }
    await runInteractiveMode();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function runHelpMode() {
  const connector = await resolveConnectorInteractively(argsExcludingFlags[1]);
  process.stderr.write(showConnectorHelp(connector.$definition));
}

async function runNonInteractiveMode() {
  const [scopeRef, path] = BinaryApi.decodeScopeAndPath(argsExcludingFlags[0]);
  if (!scopeRef) {
    throw new Error();
  }
  const command: Command = {
    path,
    input: argsExcludingFlags.length > 1 ? BinaryApi.decodeCommandInput(argsExcludingFlags[1]) : undefined,
  };
  await warnUserIfNecessary(scopeRef, command);
  const scope = await getScope(scopeRef);
  if (process.stdin.isTTY || command.input !== undefined) {
    await streamJson(
      scope.execute(command)
    );
  } else {
    await transformJson(
      compose(
        map((input): Command => ({ ...command, input })),
        commands => scope.execute(commands),
      )
    );
  }
}

async function runInteractiveMode() {
  const scopeRef = await resolveScope(argsExcludingFlags[0], true);
  while (true) {
    const command = await askForCommand(scopeRef);
    let interrupted = false;
    const sigintListener = () => {
      interrupted = true;
    };
    readlineInterface().once('SIGINT', sigintListener);
    try {
      await warnUserIfNecessary(scopeRef, command);
      const scope = await getScope(scopeRef);
      let numOutputs = 0;
      if (!interrupted) {
        process.stderr.write('\n');
        const startTime = Date.now();
        await pipe(
          scope.execute(command),
          tap(() => {
            numOutputs++;
            return new Promise(setImmediate);
          }),
          takeWhile(() => !interrupted),
          streamJson,
        );
        const runtimeSecs = (Date.now() - startTime) / 1000;
        process.stderr.write(`\n${numOutputs} results in ${runtimeSecs}s\n\n`);
      }
    } catch (e) {
      process.stderr.write(`${e.message}\n`);
    } finally {
      readlineInterface().removeListener('SIGINT', sigintListener);
    }
  }
}

async function askForCommand(scopeRef: ScopeRef): Promise<Command> {
  const scope = await getScope(scopeRef);
  while (true) {
    process.stderr.write('Enter `help` to see a list of available commands.\n\n');
    const commandLine = await ask({
      question: `sdm ${BinaryApi.encodeScope(scopeRef)}> `,
      completer: (line: string) => {
        const additionalSuggestions = 'help'.startsWith(line) ? ['help'] : [];
        const commandSuggestions = suggestCommands(scope.connector.$definition, line);
        return [[...additionalSuggestions, ...commandSuggestions], line];
      }
    });
    if (commandLine === 'help') {
      process.stderr.write(showConnectorHelp(scope.connector.$definition));
      continue;
    }
    return BinaryApi.decodeCommand(commandLine);
  }
}

function suggestCommands(connector: ConnectorDefinition, line: string): string[] {
  try {
    const selectHost = Path.selector(connector.resources);
    const path = BinaryApi.decodePartialPath(line);
    const lastElement = path.slice(-1)[0];
    if (Array.isArray(lastElement)) {
      // [full resource name, doc ID]
      const host = selectHost(path);
      return getAllPaths(host, path)
        .map(BinaryApi.encodePath);
    } else {
      // partial resource name
      const hostPath = path.slice(0, -1);
      const host = hostPath.length === 0 ? connector : selectHost(hostPath);
      return getAllPaths(host, hostPath)
        .map(BinaryApi.encodePath)
        .filter(encodedPath => encodedPath.startsWith(line));
    }
  } catch (e) {
    return [];
  }
}

function showConnectorHelp(connector: ConnectorDefinition, commandPrefix: string = ''): string {
  return `
${title('Available commands')}

${describeCommands(connector, commandPrefix).join('\n')}
`;
}

function describeCommands(resources: ConnectorDefinition, commandPrefix: string): string[] {
  return pipe(
    getAllPaths(resources),
    R.map(Path.popEndpointName),
    R.map(([resourcePath, endpointName]) => R.pair(
      BinaryApi.encodePath(resourcePath),
      BinaryApi.encodePathElement(endpointName),
    )),
    R.groupBy(([encodedResourcePath]) => encodedResourcePath),
    R.mapObjIndexed(R.map(([, encodedEndpointName]) => encodedEndpointName)),
    R.toPairs,
    R.map(([encodedResourcePath, encodedEndpointNames]) =>
      `${commandPrefix}${encodedResourcePath}\n ↳ ${encodedEndpointNames.sort().join(', ')}\n`)
  );
}

function getAllPaths(
  host: ConnectorDefinition | ResourceDefinition | DocumentDefinition | {},
  path: Path = []
): Path[] {
  const endpointNames = 'endpoints' in host ? Object.keys(host.endpoints ?? {}) : [];
  
  const resources = 'resources' in host ? Object.entries(host.resources ?? {}) : [];

  let documentPaths: Path[];

  if ('documents' in host) {
    const supportsDocIdWildcard = host.documents?.listIds ? true : false;
    const docIdField = host.documents?.idField ?? 'id';
    const docIdPattern = `${docIdField}${supportsDocIdWildcard ? `|${Path.WILDCARD}` : ''}`;
    const [prevPath, resourceName] = Path.popResourceName(path);
    const documentsPath: Path = [...prevPath, [resourceName, docIdPattern]];

    documentPaths = getAllPaths(host.documents ?? {}, documentsPath);
  } else {
    documentPaths = [];
  }

  return [
    ...endpointNames.map(endpointName => [...path, endpointName]),

    ...documentPaths,

    ...R.chain(([resourceName, resource]) => getAllPaths(resource, [...path, resourceName]), resources),
  ];
}

async function resolveConnectorInteractively(hint: string|undefined): Promise<Connector> {
  const availableConnectors = Object.keys(connectors).map(BinaryApi.encodeConnectorName);
  const availableConnectorsStr = `Available connectors: ${availableConnectors.map(connector => `\n\t${connector}`)}\n`;

  if (hint) {
    if (availableConnectors.includes(hint)) {
      const connectorName = BinaryApi.decodeConnectorName(hint);
      return connectors[connectorName];
    }
    process.stderr.write(`No such connector '${hint}'. ${availableConnectorsStr}`);
    process.exit(1);
  }

  while (true) {
    const choice = await askForConnector(availableConnectors);
    if (availableConnectors.includes(choice)) {
      const connectorName = BinaryApi.decodeConnectorName(choice);
      return connectors[connectorName];
    }
    process.stderr.write(`No such connector '${choice}'. ${availableConnectorsStr}`);
  }
}

async function askForConnector(options: string[]): Promise<string> {
  const selection = await ask({
    question:
`
${title('Available connectors')}

${options.join('\n')}

Enter a connector: `,
    completer: (line: string) => [options.filter(connector => connector.startsWith(line)), line],
  });
  return selection;
}

async function resolveScope(hint: string|undefined, interactive: boolean): Promise<ScopeRef> {
  const availableScopes = await getAvailableScopes();
  const availableScopesStr = `Available scopes: ${availableScopes.map(scope => `\n\t${scope}`)}\n`;

  if (hint) {
    if (availableScopes.includes(hint)) {
      return BinaryApi.decodeScope(hint);
    }
    process.stderr.write(`Invalid scope '${hint}'. Use sdm-config to add new scopes. ${availableScopesStr}`);
    process.exit(1);
  }

  if (!interactive) {
    process.stderr.write(`Scope must be specified. ${availableScopesStr}`);
    process.exit(1);
  }
  
  while (true) {
    const scopeStr = await askForScope();
    if (availableScopes.includes(scopeStr)) {
      return BinaryApi.decodeScope(scopeStr);
    }
    process.stderr.write(`Invalid scope '${scopeStr}'. Use sdm-config to add new scopes. ${availableScopesStr}`);
  }
}

async function askForScope(): Promise<string> {
  const availableScopes = await getAvailableScopes();
  const selection = await ask({
    question:
`
${title('Available scopes')}

${availableScopes.join('\n')}

Enter a scope: `,
    completer: (line: string) => [availableScopes.filter(scope => scope.startsWith(line)), line],
  });
  return selection;
}

const maybeGetScope = defaultScopeLocator();
async function getScope(ref: ScopeRef): Promise<ConnectorScope> {
  if (ref.connector === 'config') {
    return localConfigConnector({});
  }
  const maybeScope = await maybeGetScope(ref);
  if (!maybeScope) {
    throw new Error(`Scope ${BinaryApi.encodeScope(ref)} not found.`);
  }
  return maybeScope;
}

async function getAvailableScopes(): Promise<string[]> {
  return (await defaultConfigRepository().getScopes())
    .concat([{connector: 'config', scope: ''}])
    .map(BinaryApi.encodeScope);
}

const safeEndpoints = ['get', 'list'];
async function warnUserIfNecessary(scopeRef: ScopeRef, command: Command): Promise<void> {
  const [, endpointName] = Path.popEndpointName(command.path);
  if (flags.includes(Flag.Force) || safeEndpoints.includes(endpointName)) {
    return;
  }

  const scope = await getScope(scopeRef); 
  const warning = await scope.getWarningMessage()
  if (!warning) {
    return;
  }
  const commandHeader = BinaryApi.encodeCommandHeader(command);
  process.stderr.write(chalk.redBright.bold(`\nWARNING: ${warning} [${commandHeader}]\n\n`));

  const delaySecs = 15;
  const interactiveMode = process.stdin.isTTY;
  process.stderr.write(chalk.yellow(
    interactiveMode
      ? `Press enter or wait ${delaySecs}s to proceed with \`${commandHeader}\`. Press ctrl+c to abort.\n\n`
      : `sdm will proceed with \`${commandHeader}\` in ${delaySecs}s. Press ctrl+c to abort.\n\n`
  ));
  const timeout = new Promise(resolve => setTimeout(resolve, delaySecs * 1000));
  await Promise.race([
    timeout,
    new Promise(resolve => {
      if (process.stdin.isTTY) {
        process.stdin.once('data', resolve);
        timeout.finally(() => process.stdin.removeListener('data', resolve));
      }
    }),
  ]);
}

let rl: readline.Interface|undefined = undefined;
let rlCompleter: readline.Completer|undefined = undefined;
function readlineInterface(): readline.Interface {
  if (!rl) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stderr,
      completer: (line: string) => rlCompleter?.(line),
    });
  }
  return rl;
}
async function ask(options: {question: string, completer?: readline.Completer}): Promise<string> {
  rlCompleter = options?.completer;
  const result = await new Promise<string>(resolve => readlineInterface().question(options.question, resolve));
  rlCompleter = undefined;
  return result;
}

function title(value: string) {
  return chalk.underline.bold(value);
}

namespace BinaryApi {
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
    const [encodedPath, encodedInput] = encodedCommandLine.split(' ', 2);
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
    return connectorAliases[connectorIdentifier] ?? connectorIdentifier;
  }

  function getConnectorIdentifier(connectorName: string): string {
    const alias = Object.entries(connectorAliases).find(([_, name]) => name === connectorName)?.[0];
    return alias ?? connectorName;
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
}

main();
