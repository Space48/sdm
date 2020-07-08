#!/usr/bin/env node

import { Command, executeCommand, getAvailableCommands } from "../resource";
import { connectors } from "..";
import { flatten, distinct } from "../util";
import * as readline from "readline";
import { compose, streamJson, takeWhile, transformJson } from "@space48/json-pipe";

function main() {
    return process.argv[2] === 'help' ? runHelpMode()
        : process.argv[3] ? runNonInteractiveMode()
        : runInteractiveMode();
}

async function runHelpMode() {
    const scope = await resolveScope(process.argv[3], true);
    const [connectorId, connectorScope] = scope.split(':', 2);
    const resources = connectors[connectorId].getScopeResources(connectorScope);
    const availableCommands = getAvailableCommands(resources);
    process.stderr.write(explainCommands(availableCommands, `sdm ${scope}`));
    process.exit(0);
}

async function runNonInteractiveMode() {
    const scope = await resolveScope(process.argv[2], false);
    const [connectorId, connectorScope] = scope.split(':', 2);
    const resources = connectors[connectorId].getScopeResources(connectorScope);
    const command = {name: process.argv[3], path: process.argv[4]};
    if (process.stdin.isTTY) {
        await streamJson(executeCommand(resources, command));
    } else {
        await transformJson(input => executeCommand(resources, command, input));
    }
}

async function runInteractiveMode() {
    const scope = await resolveScope(process.argv[2], true);
    const [connectorId, connectorScope] = scope.split(':', 2);
    const resources = connectors[connectorId].getScopeResources(connectorScope);
    const availableCommands = getAvailableCommands(resources);
    while (true) {
        const command = await askForCommand(scope, availableCommands);
        let interrupted = false;
        process.once('SIGINT', () => {
            interrupted = true;
            // readline doesn't seem to work after sigint
            rl?.close();
            rl = undefined;
        });
        const runUntilSigint = compose(
            () => executeCommand(resources, command),
            takeWhile(() => !interrupted),
        );
        try {
            await streamJson(runUntilSigint(null));
        } catch (e) {
            console.error(e.message);
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
async function ask(options: {question: string, completer?: readline.Completer}): Promise<string> {
    if (!rl) {
        rl = readline.createInterface({
            input: process.stdin,
            output: process.stderr,
            completer: (line: string) => rlCompleter?.(line),
        });
    }
    rlCompleter = options?.completer;
    const result = await new Promise<string>(resolve => rl!.question(options.question, resolve));
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
    return `${value}\n${'-'.repeat(value.length)}`;
}

main()
