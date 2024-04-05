import ipc from "node-ipc";
import { Path } from ".";
import { encodeHeader } from "./binary-api";
export function watchScope(scope) {
    return {
        ...scope,
        execute: async function* (commands) {
            const progress = Client.reportProgress(scope.scopeName, commands);
            try {
                for await (const output of scope.execute(commands)) {
                    progress.recordOutput(output);
                    yield output;
                }
                progress.finish();
            }
            catch (e) {
                progress.finish(e);
                throw e;
            }
        },
    };
}
export function listenForProgress(listener) {
    let state = [];
    ipc.config.id = ipcId;
    ipc.config.silent = true;
    ipc.serve(() => {
        ipc.server.on(MessageType.ProcessState, (serializedProcessState) => {
            const processState = deserializeProcessState(serializedProcessState);
            state = state.filter(({ pid }) => pid !== processState.pid).concat(processState);
            listener(state);
        });
    });
    ipc.server.start();
    setImmediate(() => listener(state));
    return () => ipc.server.stop();
}
class Client {
    static reportProgress(scope, commandOrCommands) {
        Client.start();
        const progress = new ExecutionProgress(scope, commandOrCommands, process.pid, finalProgress => {
            Client.activeExecutions = Client.activeExecutions.filter(_progress => _progress !== progress);
            Client.finishedExecutions = [...Client.finishedExecutions, finalProgress];
            if (Client.activeExecutions.length === 0) {
                Client.broadcast({ includeFinished: true });
                Client.stop();
            }
        });
        this.activeExecutions.push(progress);
        return progress;
    }
    static start() {
        if (!Client.interval) {
            Client.ensureSocketCreated();
            Client.interval = setInterval(() => Client.broadcast({ includeFinished: false }), 1000);
        }
    }
    static stop() {
        if (Client.interval) {
            clearInterval(Client.interval);
            Client.interval = undefined;
        }
    }
    static broadcast({ includeFinished }) {
        if (Client.connected) {
            const timestamp = new Date();
            ipc.of[ipcId].emit(MessageType.ProcessState, serializeProcessState({
                pid: process.pid,
                executions: [
                    ...Client.activeExecutions.map(progress => progress.getSnapshot(timestamp)),
                    ...(includeFinished ? Client.finishedExecutions : []),
                ],
            }));
        }
    }
    static ensureSocketCreated() {
        if (Client.socketCreated) {
            return;
        }
        ipc.config.silent = true;
        ipc.connectTo(ipcId, () => {
            ipc.of[ipcId].on("connect", () => {
                Client.connected = true;
                Client.broadcast({ includeFinished: true });
            });
            ipc.of[ipcId].on("disconnect", () => (Client.connected = false));
            ipc.of[ipcId].on("destroy", () => {
                Client.connected = false;
                Client.ensureSocketCreated();
            });
        });
    }
}
// note that state is mutable
Client.activeExecutions = [];
Client.finishedExecutions = [];
Client.interval = undefined;
Client.connected = false;
Client.socketCreated = false;
class ExecutionProgress {
    constructor(scope, commandOrCommands, pid, onFinish) {
        this.onFinish = onFinish;
        this.checkpoints = [];
        this.outputCount = 0;
        this.commandProgresses = {};
        this.nextCommandId = 1;
        this.multiCommand = isIterable(commandOrCommands);
        if (!this.multiCommand) {
            this.singletonCommandProgress = this.createCommandProgress(commandOrCommands);
        }
        this.snapshot = {
            pid,
            startTime: new Date(),
            timestamp: new Date(),
            scope,
            executionId: ExecutionProgress.nextExecutionId++,
            finishTime: null,
            error: null,
        };
    }
    getSnapshot(timestamp) {
        if (this.snapshot.finishTime) {
            timestamp = this.snapshot.finishTime;
        }
        const commandProgresses = this.multiCommand
            ? Object.values(this.commandProgresses)
            : [this.singletonCommandProgress];
        return {
            ...this.snapshot,
            timestamp,
            commands: commandProgresses.map(progress => progress.getSnapshot(timestamp)),
        };
    }
    recordOutput(output) {
        if (this.multiCommand) {
            const outputEl = output;
            this.getCommandProgress(outputEl).recordOutput();
        }
        else {
            this.singletonCommandProgress.recordOutput();
        }
        this.outputCount++;
    }
    finish(error) {
        var _a;
        const timestamp = new Date();
        this.snapshot = {
            ...this.snapshot,
            error: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : null,
            finishTime: timestamp,
        };
        this.onFinish(this.getSnapshot(timestamp));
    }
    getCommandProgress(outputEl) {
        const strippedPath = ExecutionProgress.stripDocIds(outputEl.path);
        const encodedHeader = encodeHeader({
            path: strippedPath,
            endpoint: outputEl.endpoint,
        });
        if (!this.commandProgresses[encodedHeader]) {
            this.commandProgresses[encodedHeader] = this.createCommandProgress({
                ...outputEl,
                path: strippedPath,
            });
        }
        return this.commandProgresses[encodedHeader];
    }
    createCommandProgress(messageHeader) {
        return new CommandProgress({
            command: messageHeader,
            commandId: this.nextCommandId++,
        });
    }
    static stripDocIds(path) {
        return path.map(pathElement => {
            if (Array.isArray(pathElement)) {
                return [pathElement[0], Path.WILDCARD];
            }
            else {
                return pathElement;
            }
        });
    }
    getOutputsSince(unixTimestampMs) {
        const index = this.checkpoints.findIndex(([checkpointTime]) => checkpointTime >= unixTimestampMs) - 1;
        return index < 0 ? this.outputCount : this.outputCount - this.checkpoints[index][1];
    }
}
ExecutionProgress.nextExecutionId = 1;
class CommandProgress {
    constructor(progress) {
        this.progress = progress;
        this.outputCount = 0;
        this.checkpoints = [];
    }
    recordOutput() {
        this.outputCount++;
    }
    getSnapshot(timestamp) {
        const unixTimestampMs = timestamp.getTime();
        this.checkpoints = [...this.checkpoints.slice(-300), [unixTimestampMs, this.outputCount]];
        return {
            ...this.progress,
            stats: {
                timestamp,
                outputs: this.outputCount,
                outputs10: this.getOutputsSince(unixTimestampMs - 10000),
                outputs60: this.getOutputsSince(unixTimestampMs - 60000),
                outputs300: this.getOutputsSince(unixTimestampMs - 300000),
            },
        };
    }
    getOutputsSince(unixTimestampMs) {
        const index = this.checkpoints.findIndex(([checkpointTime]) => checkpointTime >= unixTimestampMs) - 1;
        return index < 0 ? this.outputCount : this.outputCount - this.checkpoints[index][1];
    }
}
const ipcId = "sdm-watch";
var MessageType;
(function (MessageType) {
    MessageType["ProcessState"] = "process_state";
})(MessageType || (MessageType = {}));
function serializeProcessState(state) {
    return {
        ...state,
        executions: state.executions.map(executionProgress => {
            var _a, _b;
            return ({
                ...executionProgress,
                startTime: executionProgress.startTime.toISOString(),
                finishTime: (_b = (_a = executionProgress.finishTime) === null || _a === void 0 ? void 0 : _a.toISOString()) !== null && _b !== void 0 ? _b : null,
                commands: executionProgress.commands.map(command => ({
                    ...command,
                    stats: {
                        ...command.stats,
                        timestamp: command.stats.timestamp.toISOString(),
                    },
                })),
            });
        }),
    };
}
function deserializeProcessState(state) {
    return {
        ...state,
        executions: state.executions.map((executionProgress) => ({
            ...executionProgress,
            startTime: new Date(executionProgress.startTime),
            finishTime: executionProgress.finishTime && new Date(executionProgress.finishTime),
            timestamp: new Date(executionProgress.timestamp),
            commands: executionProgress.commands.map((command) => ({
                ...command,
                stats: {
                    ...command.stats,
                    timestamp: new Date(command.stats.timestamp),
                },
            })),
        })),
    };
}
function isIterable(value) {
    return isSyncIterable(value) || isAsyncIterable(value);
}
function isSyncIterable(value) {
    return Symbol.iterator in value;
}
function isAsyncIterable(value) {
    return Symbol.asyncIterator in value;
}
