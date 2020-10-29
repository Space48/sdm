#!/usr/bin/env node

import { Command, executeCommand, getAvailableCommands } from "../resource";
import { connectors } from "..";
import { flatten, distinct } from "../util";
import * as readline from "readline";
import { compose, takeWhile, tap } from "@space48/json-pipe";
import { streamAndReportProgress, transformAndReportProgress } from "../watch";
import chalk from "chalk";
import { ConnectorScope } from "../connector";

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

function main() {
    return argsExcludingFlags[0] === 'help' ? runHelpMode()
        : argsExcludingFlags[1] ? runNonInteractiveMode()
        : runInteractiveMode();
}

async function runHelpMode() {
    const scope = await resolveScope(argsExcludingFlags[1], true);
    const [connectorId, connectorScope] = scope.split(':', 2);
    const resources = await connectors[connectorId].getScope(connectorScope)!.getResources();
    const availableCommands = getAvailableCommands(resources);
    process.stderr.write(explainCommands(availableCommands, `sdm ${scope}`));
    process.exit(0);
}

async function runNonInteractiveMode() {
    const scope = await resolveScope(argsExcludingFlags[0], false);
    const [connectorId, connectorScopeName] = scope.split(':', 2);
    const connectorScope = connectors[connectorId].getScope(connectorScopeName)!;
    const resources = await connectorScope.getResources();
    const command = {name: argsExcludingFlags[1], path: argsExcludingFlags[2]};
    await warnUserIfNecessary(connectorId, connectorScope, command);
    try {
        if (process.stdin.isTTY) {
            await streamAndReportProgress(scope, command, () => executeCommand(resources, command));
        } else {
            await transformAndReportProgress(scope, command, input => executeCommand(resources, command, input));
        }
        process.exit(0);
    } catch (e) {
        process.stderr.write(e.message + '\n');
        process.exit(1);
    }
}

async function runInteractiveMode() {
    const scope = await resolveScope(argsExcludingFlags[0], true);
    const [connectorId, connectorScopeName] = scope.split(':', 2);
    const connectorScope = connectors[connectorId].getScope(connectorScopeName)!;
    const resources = await connectorScope.getResources();
    const availableCommands = getAvailableCommands(resources);
    while (true) {
        const command = await askForCommand(scope, availableCommands);
        let interrupted = false;
        const sigintListener = () => {
            interrupted = true;
        };
        readlineInterface().once('SIGINT', sigintListener);
        const runUntilSigint = compose(
            () => executeCommand(resources, command),
            tap(() => new Promise(setImmediate)),
            takeWhile(() => !interrupted),
        );
        await warnUserIfNecessary(connectorId, connectorScope, command);
        try {
            if (!interrupted) {
                await streamAndReportProgress(scope, command, () => runUntilSigint(null));
                process.stderr.write('\n');
            }
        } catch (e) {
            process.stderr.write(`${e.message}\n`);
        } finally {
            readlineInterface().removeListener('SIGINT', sigintListener);
        }
    }
}

async function resolveScope(hint: string|undefined, interactive: boolean): Promise<string> {
    const availableScopes = getAvailableScopes();

    if (hint) {
        if (!availableScopes.includes(hint)) {
            process.stderr.write(`Invalid scope '${hint}'. Use sdm-config to add new scopes. Available scopes: ${availableScopes.map(scope => `\n\t${scope}`)}\n`);
            process.exit(1);
        }
        return hint;
    }
    
    if (interactive) {
        const scope = await askForScope();
        process.stderr.write('\n');
        return scope;
    }

    process.stderr.write(`Scope must be specified. Available scopes: ${availableScopes.map(scope => `\n\t${scope}`)}`);
    process.exit(1);
}

async function askForScope(): Promise<string> {
    while (true) {
        const availableScopes = getAvailableScopes();
        const selection = await ask({
            question:
`
${title('Available scopes')}

${availableScopes.join('\n')}

Enter a scope: `,
            completer: (line: string) => [availableScopes.filter(scope => scope.startsWith(line)), line],
        });
        if (availableScopes.includes(selection)) {
            return selection;
        }
        process.stderr.write(`Invalid scope '${selection}'. Use sdm-config to add new scopes. Available scopes: ${availableScopes.map(scope => `\n\t${scope}`)}\n`);
    }
}

async function askForCommand(scope: string, availableCommands: Command[]): Promise<Command> {
    while (true) {
        process.stderr.write('Enter `help` to see a list of available commands.\n\n');
        const commandLine = await ask({
            question: `sdm ${scope}> `,
            completer: (line: string) => {
                const additionalSuggestions = 'help'.startsWith(line) ? ['help'] : [];
                const commandSuggestions = suggestCommands(line, availableCommands).map(command => `${command.name} ${command.path}`);
                return [[...additionalSuggestions, ...commandSuggestions], line];
            }
        });
        if (commandLine === 'help') {
            process.stderr.write(explainCommands(availableCommands));
            continue;
        }
        const [name, path] = commandLine.split(' ');
        return {name, path};
    }
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

function getAvailableScopes(): string[] {
    return Object.entries(connectors)
        .map(([connectorId, connector]) => connector.getScopes().map(scope => `${connectorId}:${scope}`))
        .reduce(flatten, []);
}

function suggestCommands(line: string, availableCommands: Command[]): Command[] {
    const [commandName, path] = line.trim().replace(/ +/g, ' ').split(' ');
    const pathSegments = path ? path.split('/') : [];
    const regexp = getCommandLineRegExp(commandName, pathSegments);
    return availableCommands
        .filter(command => regexp.test(`${command.name} ${command.path}`))
        .map(({name, path: commandPath}) => ({
            name,
            path: pathSegments.length ? getSuggestedPath(pathSegments, commandPath.split('/')).join('/') : commandPath,
        }));
}

function getSuggestedPath(actualPath: string[], commandPath: string[]) {
    const lastSegment = actualPath[actualPath.length - 1];
    return [
        ...actualPath.slice(0, -1),
        commandPath[actualPath.length - 1].startsWith(lastSegment) ? commandPath[actualPath.length - 1] : lastSegment,
        ...commandPath.slice(actualPath.length),
    ];
}

function getCommandLineRegExp(commandName: string, pathSegments: string[]): RegExp {
    if (pathSegments.length === 0) {
        return new RegExp(`^${escapeRegExp(commandName)}`);
    }
    const pathPattern = pathSegments.map(segment => `(${escapeRegExp(segment)}|\\{[^}]+\\})`);
    return new RegExp(`^${escapeRegExp(commandName)} ${pathPattern.join('\\/')}`);
}

function escapeRegExp(value: string) {
    return value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function explainCommands(commands: Command[], commandPrefix: string = ''): string {
    const paths = commands.map(command => command.path).filter(distinct).sort();
    const endpointsByPath = new Map(paths.map(path => [path, [] as string[]]));
    commands.forEach(command => endpointsByPath.get(command.path)!.push(command.name));
    const helpForCommands = [...endpointsByPath.entries()]
        .map(([path, endpoints]) => `${path}\n ↳ ${endpoints.sort().join(', ')}\n`);
    const distinctEndpointNames = commands.map(command => command.name).filter(distinct).sort();

    return `
${title('Execute a command')}

${commandPrefix.length ? `${commandPrefix} ` : ''}${distinctEndpointNames.join('|')} <resource>


${title('Available resources and commands')}

${helpForCommands.join('\n')}
`;
}

function title(value: string) {
    return chalk.underline.bold(value);
}

const safeCommands = ['get', 'list'];
async function warnUserIfNecessary(connectorId: string, scope: ConnectorScope, command: Command): Promise<void> {
    if (flags.includes(Flag.Force) || safeCommands.includes(command.name)) {
        return;
    }

    const warning = await scope.getWarningMessage()
    if (!warning) {
        return;
    }
    const commandString = `${connectorId}:${scope.name} ${command.name} ${command.path}`;
    process.stderr.write(chalk.redBright.bold(`\nWARNING: ${warning} [${commandString}]\n\n`));

    const delaySecs = 15;
    const interactiveMode = process.stdin.isTTY;
    process.stderr.write(chalk.yellow(
        interactiveMode
            ? `Press enter or wait ${delaySecs}s to proceed with \`${command.name} ${command.path}\`. Press ctrl+c to abort.\n\n`
            : `sdm will proceed with \`${command.name} ${command.path}\` in ${delaySecs}s. Press ctrl+c to abort.\n\n`
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

main();
