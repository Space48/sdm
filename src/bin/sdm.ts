#!/usr/bin/env node

import {
  Command,
  ConnectorDefinition,
  EndpointError,
  FullyQualifiedMessageHeader,
  Path,
  ScopeRef,
  State,
} from "../framework";
import * as readline from "readline";
import {
  map,
  pipe,
  takeWhile,
  tap,
  readJsonLinesFrom,
  writeJsonLinesTo,
  writeTo,
} from "@space48/json-pipe";
import chalk from "chalk";
import { BinaryApi } from "../framework";
import { Shell } from "../framework/docgen";
import { sdm } from "..";

const app = sdm();

enum Flag {
  Force = "force",
}
const availableFlags = Object.values(Flag) as string[];

const argsExcludingFlags = process.argv.slice(2).filter(arg => !arg.startsWith("--"));
const flags = process.argv
  .slice(2)
  .filter(arg => arg.startsWith("--"))
  .map(arg => arg.slice(2));
const invalidFlags = flags.filter(flag => !availableFlags.includes(flag));
if (invalidFlags.length > 0) {
  const renderOptions = (options: string[]) => options.map(flag => `--${flag}`).join(", ");
  process.stderr.write(
    `Invalid option${invalidFlags.length > 1 ? "s" : ""} ${renderOptions(invalidFlags)}. `,
  );
  process.stderr.write(`Valid options are ${renderOptions(availableFlags)}.\n`);
  process.exit(1);
}

async function main() {
  try {
    if (argsExcludingFlags[0] === "help") {
      await runHelpMode();
      process.exit(0);
    }
    if (
      !process.stdin.isTTY ||
      (argsExcludingFlags[0] && tryDecodeFQMessageHeader(argsExcludingFlags[0]))
    ) {
      await runNonInteractiveMode();
      process.exit(0);
    }
    await runInteractiveMode();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function runHelpMode() {
  const connectorName = await resolveConnectorInteractively(argsExcludingFlags[1]);
  const connector = app.connectors[connectorName];
  process.stderr.write(
    Shell.explainCliUsageOnCli(connector.$definition, {
      connector: connectorName,
      scope: connector.$definition.scopeNameExample,
    }),
  );
}

async function runNonInteractiveMode() {
  const messageHeader = tryDecodeFQMessageHeader(argsExcludingFlags[0]);
  if (messageHeader) {
    await runNonInteractiveSingleMessageMode(messageHeader);
  } else {
    const scopeRef = await resolveScope(argsExcludingFlags[0], false);
    await runNonInteractiveMultiMessageMode(scopeRef);
  }
}

async function runNonInteractiveMultiMessageMode(scopeRef: ScopeRef) {
  const scope = await app.requireScope(scopeRef);
  await pipe(
    readJsonLinesFrom<Command>(process.stdin),
    commands => scope.execute(commands),
    writeJsonLinesTo(process.stdout),
  );
}

async function runNonInteractiveSingleMessageMode(header: FullyQualifiedMessageHeader) {
  const command: Command = {
    ...header,
    input:
      argsExcludingFlags.length > 1
        ? BinaryApi.decodeCommandInput(argsExcludingFlags[1])
        : undefined,
  };
  await warnUserIfNecessary(header);
  const scope = await app.requireScope(header.scope);
  if (process.stdin.isTTY || command.input !== undefined) {
    try {
      await pipe(scope.execute(command), writeJsonLinesTo(process.stdout));
    } catch (e) {
      console.error(
        e instanceof EndpointError ? JSON.stringify({ error: e.normalize() }, null, 2) : e,
      );
      process.exit(1);
    }
  } else {
    await pipe(
      readJsonLinesFrom(process.stdin),
      State.map((input): Command => ({ ...command, input })),
      commands => scope.execute(commands),
      writeJsonLinesTo(process.stdout),
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
    readlineInterface().once("SIGINT", sigintListener);
    try {
      await warnUserIfNecessary({
        scope: scopeRef,
        path: command.path,
        endpoint: command.endpoint,
      });
      const scope = await app.requireScope(scopeRef);
      let numOutputs = 0;
      if (!interrupted) {
        process.stderr.write("\n");
        const startTime = Date.now();
        await pipe(
          scope.execute(command),
          tap(() => {
            numOutputs++;
            return new Promise(setImmediate);
          }),
          takeWhile(() => !interrupted),
          map(item => `${JSON.stringify(item)}\n\n`), // blank line to improve readability in interactive mode
          writeTo(process.stdout),
        );
        const runtimeSecs = (Date.now() - startTime) / 1000;
        process.stderr.write(`${numOutputs} results in ${runtimeSecs}s\n\n`);
      }
    } catch (e) {
      console.error(
        e instanceof EndpointError ? JSON.stringify({ error: e.normalize() }, null, 2) : e,
      );
    } finally {
      readlineInterface().removeListener("SIGINT", sigintListener);
    }
  }
}

async function askForCommand(scopeRef: ScopeRef): Promise<Command> {
  const scope = await app.requireScope(scopeRef);
  while (true) {
    process.stderr.write("Enter `help` to see a list of available commands.\n\n");
    const commandLine = await ask({
      question: `sdm ${BinaryApi.encodeHeader({ scope: scopeRef })}> `,
      completer: (line: string) => {
        const additionalSuggestions = "help".startsWith(line) ? ["help"] : [];
        const commandSuggestions = suggestCommands(scope.connector.$definition, line);
        return [[...additionalSuggestions, ...commandSuggestions], line];
      },
    });
    if (commandLine === "help") {
      process.stderr.write(Shell.explainInteractiveCliUsage(scope.connector.$definition));
      continue;
    }
    try {
      return BinaryApi.decodeCommand(commandLine);
    } catch {}
  }
}

function suggestCommands(connector: ConnectorDefinition, line: string): string[] {
  try {
    const selectHost = Path.selector(connector.resources);
    const path = BinaryApi.decodeIncompletePath(line);
    const lastElement = path.slice(-1)[0];
    if (Array.isArray(lastElement)) {
      // [full resource name, doc ID]
      const host = selectHost(path);
      return Path.computeAllHeaders(host, path).map(BinaryApi.encodeHeader);
    } else {
      // partial resource name
      const hostPath = path.slice(0, -1);
      const host = hostPath.length === 0 ? connector : selectHost(hostPath);
      return Path.computeAllHeaders(host, hostPath)
        .map(BinaryApi.encodeHeader)
        .filter(encodedPath => encodedPath.startsWith(line));
    }
  } catch (e) {
    return [];
  }
}

async function resolveConnectorInteractively(hint: string | undefined): Promise<string> {
  const availableConnectors = Object.keys(app.connectors).map(BinaryApi.encodeConnectorName);
  const availableConnectorsStr = `Available connectors: ${availableConnectors.map(
    connector => `\n\t${connector}`,
  )}\n`;

  if (hint) {
    if (availableConnectors.includes(hint)) {
      return BinaryApi.decodeConnectorName(hint);
    }
    process.stderr.write(`No such connector '${hint}'. ${availableConnectorsStr}`);
    process.exit(1);
  }

  while (true) {
    const choice = await askForConnector(availableConnectors);
    if (availableConnectors.includes(choice)) {
      return BinaryApi.decodeConnectorName(choice);
    }
    process.stderr.write(`No such connector '${choice}'. ${availableConnectorsStr}`);
  }
}

async function askForConnector(options: string[]): Promise<string> {
  const selection = await ask({
    question: `
${title("Available connectors")}

${options.join("\n")}

Enter a connector: `,
    completer: (line: string) => [options.filter(connector => connector.startsWith(line)), line],
  });
  return selection;
}

async function resolveScope(hint: string | undefined, interactive: boolean): Promise<ScopeRef> {
  const availableScopes = await getAvailableScopes();
  const availableScopesStr = `Available scopes: ${availableScopes.map(scope => `\n\t${scope}`)}\n`;

  if (hint) {
    if (availableScopes.includes(hint)) {
      return BinaryApi.decodeScope(hint);
    }
    process.stderr.write(
      `Invalid scope '${hint}'. Use sdm-config to add new scopes. ${availableScopesStr}`,
    );
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
    process.stderr.write(
      `Invalid scope '${scopeStr}'. Use sdm-config to add new scopes. ${availableScopesStr}`,
    );
  }
}

async function askForScope(): Promise<string> {
  const availableScopes = await getAvailableScopes();
  const selection = await ask({
    question: `
${title("Available scopes")}

${availableScopes.join("\n")}

Enter a scope: `,
    completer: (line: string) => [availableScopes.filter(scope => scope.startsWith(line)), line],
  });
  return selection;
}

async function getAvailableScopes(): Promise<string[]> {
  return (await app.listScopes()).map(scope => BinaryApi.encodeHeader({ scope }));
}

const safeEndpoints = ["get", "list"];
async function warnUserIfNecessary(header: FullyQualifiedMessageHeader): Promise<void> {
  if (flags.includes(Flag.Force) || safeEndpoints.includes(header.endpoint)) {
    return;
  }

  const scope = await app.requireScope(header.scope);
  const warning = await scope.getWarningMessage();
  if (!warning) {
    return;
  }
  const commandHeader = BinaryApi.encodeHeader(header);
  process.stderr.write(chalk.redBright.bold(`\nWARNING: ${warning} [${commandHeader}]\n\n`));

  const delaySecs = 15;
  const interactiveMode = process.stdin.isTTY;
  process.stderr.write(
    chalk.yellow(
      interactiveMode
        ? `Press enter or wait ${delaySecs}s to proceed with \`${commandHeader}\`. Press ctrl+c to abort.\n\n`
        : `sdm will proceed with \`${commandHeader}\` in ${delaySecs}s. Press ctrl+c to abort.\n\n`,
    ),
  );
  const timeout = new Promise(resolve => setTimeout(resolve, delaySecs * 1000));
  await Promise.race([
    timeout,
    new Promise(resolve => {
      if (process.stdin.isTTY) {
        process.stdin.once("data", resolve);
        timeout.finally(() => process.stdin.removeListener("data", resolve));
      }
    }),
  ]);
}

let rl: readline.Interface | undefined = undefined;
let rlCompleter: readline.Completer | undefined = undefined;
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
async function ask(options: { question: string; completer?: readline.Completer }): Promise<string> {
  rlCompleter = options?.completer;
  const result = await new Promise<string>(resolve =>
    readlineInterface().question(options.question, resolve),
  );
  rlCompleter = undefined;
  return result;
}

function title(value: string) {
  return chalk.underline.bold(value);
}

function tryDecodeFQMessageHeader(text: string): FullyQualifiedMessageHeader | undefined {
  try {
    return BinaryApi.decodeFQHeader(text);
  } catch {
    return undefined;
  }
}

main();
