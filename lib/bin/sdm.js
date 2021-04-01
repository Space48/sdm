#!/usr/bin/env node
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
const framework_1 = require("../framework");
const readline = __importStar(require("readline"));
const json_pipe_1 = require("@space48/json-pipe");
const chalk_1 = __importDefault(require("chalk"));
const framework_2 = require("../framework");
const docgen_1 = require("../framework/docgen");
const __1 = require("..");
const app = __1.sdm();
var Flag;
(function (Flag) {
    Flag["Force"] = "force";
})(Flag || (Flag = {}));
const availableFlags = Object.values(Flag);
const argsExcludingFlags = process.argv.slice(2).filter(arg => !arg.startsWith('--'));
const flags = process.argv.slice(2)
    .filter(arg => arg.startsWith('--'))
    .map(arg => arg.slice(2));
const invalidFlags = flags.filter(flag => !availableFlags.includes(flag));
if (invalidFlags.length > 0) {
    const renderOptions = (options) => options.map(flag => `--${flag}`).join(', ');
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
        if (argsExcludingFlags[0] && tryDecodeFQMessageHeader(argsExcludingFlags[0])) {
            await runNonInteractiveMode();
            process.exit(0);
        }
        await runInteractiveMode();
        process.exit(0);
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
}
async function runHelpMode() {
    const connectorName = await resolveConnectorInteractively(argsExcludingFlags[1]);
    const connector = app.connectors[connectorName];
    process.stderr.write(docgen_1.Shell.explainCliUsageOnCli(connector.$definition, {
        connector: connectorName,
        scope: connector.$definition.scopeNameExample,
    }));
}
async function runNonInteractiveMode() {
    const header = framework_2.BinaryApi.decodeFQHeader(argsExcludingFlags[0]);
    const command = {
        ...header,
        input: argsExcludingFlags.length > 1 ? framework_2.BinaryApi.decodeCommandInput(argsExcludingFlags[1]) : undefined,
    };
    await warnUserIfNecessary(header);
    const scope = await app.requireScope(header.scope);
    if (process.stdin.isTTY || command.input !== undefined) {
        try {
            await json_pipe_1.pipe(scope.execute(command), json_pipe_1.writeJsonLinesTo(process.stdout));
        }
        catch (e) {
            console.error(e instanceof framework_1.EndpointError
                ? JSON.stringify({ error: e.normalize() }, null, 2)
                : e);
            process.exit(1);
        }
    }
    else {
        await json_pipe_1.pipe(json_pipe_1.readJsonLinesFrom(process.stdin), framework_1.State.map((input) => ({ ...command, input })), commands => scope.execute(commands), json_pipe_1.writeJsonLinesTo(process.stdout));
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
            await warnUserIfNecessary({ scope: scopeRef, path: command.path, endpoint: command.endpoint });
            const scope = await app.requireScope(scopeRef);
            let numOutputs = 0;
            if (!interrupted) {
                process.stderr.write('\n');
                const startTime = Date.now();
                await json_pipe_1.pipe(scope.execute(command), json_pipe_1.tap(() => {
                    numOutputs++;
                    return new Promise(setImmediate);
                }), json_pipe_1.takeWhile(() => !interrupted), json_pipe_1.map(item => `${JSON.stringify(item)}\n\n`), // blank line to improve readability in interactive mode
                json_pipe_1.writeTo(process.stdout));
                const runtimeSecs = (Date.now() - startTime) / 1000;
                process.stderr.write(`${numOutputs} results in ${runtimeSecs}s\n\n`);
            }
        }
        catch (e) {
            console.error(e instanceof framework_1.EndpointError
                ? JSON.stringify({ error: e.normalize() }, null, 2)
                : e);
        }
        finally {
            readlineInterface().removeListener('SIGINT', sigintListener);
        }
    }
}
async function askForCommand(scopeRef) {
    const scope = await app.requireScope(scopeRef);
    while (true) {
        process.stderr.write('Enter `help` to see a list of available commands.\n\n');
        const commandLine = await ask({
            question: `sdm ${framework_2.BinaryApi.encodeHeader({ scope: scopeRef })}> `,
            completer: (line) => {
                const additionalSuggestions = 'help'.startsWith(line) ? ['help'] : [];
                const commandSuggestions = suggestCommands(scope.connector.$definition, line);
                return [[...additionalSuggestions, ...commandSuggestions], line];
            }
        });
        if (commandLine === 'help') {
            process.stderr.write(docgen_1.Shell.explainInteractiveCliUsage(scope.connector.$definition));
            continue;
        }
        try {
            return framework_2.BinaryApi.decodeCommand(commandLine);
        }
        catch (_a) { }
    }
}
function suggestCommands(connector, line) {
    try {
        const selectHost = framework_1.Path.selector(connector.resources);
        const path = framework_2.BinaryApi.decodeIncompletePath(line);
        const lastElement = path.slice(-1)[0];
        if (Array.isArray(lastElement)) {
            // [full resource name, doc ID]
            const host = selectHost(path);
            return framework_1.Path.computeAllHeaders(host, path)
                .map(framework_2.BinaryApi.encodeHeader);
        }
        else {
            // partial resource name
            const hostPath = path.slice(0, -1);
            const host = hostPath.length === 0 ? connector : selectHost(hostPath);
            return framework_1.Path.computeAllHeaders(host, hostPath)
                .map(framework_2.BinaryApi.encodeHeader)
                .filter(encodedPath => encodedPath.startsWith(line));
        }
    }
    catch (e) {
        return [];
    }
}
async function resolveConnectorInteractively(hint) {
    const availableConnectors = Object.keys(app.connectors).map(framework_2.BinaryApi.encodeConnectorName);
    const availableConnectorsStr = `Available connectors: ${availableConnectors.map(connector => `\n\t${connector}`)}\n`;
    if (hint) {
        if (availableConnectors.includes(hint)) {
            return framework_2.BinaryApi.decodeConnectorName(hint);
        }
        process.stderr.write(`No such connector '${hint}'. ${availableConnectorsStr}`);
        process.exit(1);
    }
    while (true) {
        const choice = await askForConnector(availableConnectors);
        if (availableConnectors.includes(choice)) {
            return framework_2.BinaryApi.decodeConnectorName(choice);
        }
        process.stderr.write(`No such connector '${choice}'. ${availableConnectorsStr}`);
    }
}
async function askForConnector(options) {
    const selection = await ask({
        question: `
${title('Available connectors')}

${options.join('\n')}

Enter a connector: `,
        completer: (line) => [options.filter(connector => connector.startsWith(line)), line],
    });
    return selection;
}
async function resolveScope(hint, interactive) {
    const availableScopes = await getAvailableScopes();
    const availableScopesStr = `Available scopes: ${availableScopes.map(scope => `\n\t${scope}`)}\n`;
    if (hint) {
        if (availableScopes.includes(hint)) {
            return framework_2.BinaryApi.decodeScope(hint);
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
            return framework_2.BinaryApi.decodeScope(scopeStr);
        }
        process.stderr.write(`Invalid scope '${scopeStr}'. Use sdm-config to add new scopes. ${availableScopesStr}`);
    }
}
async function askForScope() {
    const availableScopes = await getAvailableScopes();
    const selection = await ask({
        question: `
${title('Available scopes')}

${availableScopes.join('\n')}

Enter a scope: `,
        completer: (line) => [availableScopes.filter(scope => scope.startsWith(line)), line],
    });
    return selection;
}
async function getAvailableScopes() {
    return (await app.listScopes()).map(scope => framework_2.BinaryApi.encodeHeader({ scope }));
}
const safeEndpoints = ['get', 'list'];
async function warnUserIfNecessary(header) {
    if (flags.includes(Flag.Force) || safeEndpoints.includes(header.endpoint)) {
        return;
    }
    const scope = await app.requireScope(header.scope);
    const warning = await scope.getWarningMessage();
    if (!warning) {
        return;
    }
    const commandHeader = framework_2.BinaryApi.encodeHeader(header);
    process.stderr.write(chalk_1.default.redBright.bold(`\nWARNING: ${warning} [${commandHeader}]\n\n`));
    const delaySecs = 15;
    const interactiveMode = process.stdin.isTTY;
    process.stderr.write(chalk_1.default.yellow(interactiveMode
        ? `Press enter or wait ${delaySecs}s to proceed with \`${commandHeader}\`. Press ctrl+c to abort.\n\n`
        : `sdm will proceed with \`${commandHeader}\` in ${delaySecs}s. Press ctrl+c to abort.\n\n`));
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
let rl = undefined;
let rlCompleter = undefined;
function readlineInterface() {
    if (!rl) {
        rl = readline.createInterface({
            input: process.stdin,
            output: process.stderr,
            completer: (line) => rlCompleter === null || rlCompleter === void 0 ? void 0 : rlCompleter(line),
        });
    }
    return rl;
}
async function ask(options) {
    rlCompleter = options === null || options === void 0 ? void 0 : options.completer;
    const result = await new Promise(resolve => readlineInterface().question(options.question, resolve));
    rlCompleter = undefined;
    return result;
}
function title(value) {
    return chalk_1.default.underline.bold(value);
}
function tryDecodeFQMessageHeader(text) {
    try {
        return framework_2.BinaryApi.decodeFQHeader(text);
    }
    catch (_a) {
        return undefined;
    }
}
main();
