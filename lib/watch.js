"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenForProgress = exports.transformAndReportProgress = exports.streamAndReportProgress = void 0;
const json_pipe_1 = require("@space48/json-pipe");
const node_ipc_1 = __importDefault(require("node-ipc"));
async function streamAndReportProgress(scope, command, processor) {
    const progress = Client.reportProgress(scope, command);
    const wrappedProcessor = json_pipe_1.compose(processor, json_pipe_1.tap(() => progress.recordOutput()));
    try {
        await json_pipe_1.streamJson(() => wrappedProcessor(null));
        progress.finish();
    }
    catch (e) {
        progress.finish(e);
        throw e;
    }
}
exports.streamAndReportProgress = streamAndReportProgress;
async function transformAndReportProgress(scope, command, processor) {
    const progress = Client.reportProgress(scope, command);
    const wrappedProcessor = json_pipe_1.compose(processor, json_pipe_1.tap(() => progress.recordOutput()));
    try {
        await json_pipe_1.transformJson(wrappedProcessor);
        progress.finish();
    }
    catch (e) {
        progress.finish(e);
        throw e;
    }
}
exports.transformAndReportProgress = transformAndReportProgress;
function listenForProgress(listener) {
    let state = [];
    node_ipc_1.default.config.id = ipcId;
    node_ipc_1.default.config.silent = true;
    node_ipc_1.default.serve(() => {
        node_ipc_1.default.server.on(MessageType.ProcessState, (serializedProcessState) => {
            const processState = deserializeProcessState(serializedProcessState);
            state = state.filter(({ pid }) => pid !== processState.pid).concat(processState);
            listener(state);
        });
    });
    node_ipc_1.default.server.start();
    setImmediate(() => listener(state));
    return () => node_ipc_1.default.server.stop();
}
exports.listenForProgress = listenForProgress;
class Client {
    static reportProgress(scope, command) {
        Client.start();
        const data = {
            pid: process.pid,
            commandId: Client.nextCommandId++,
            scope,
            command,
        };
        const progress = new CommandProgress(data, finalProgress => {
            Client.activeCommands = Client.activeCommands.filter(_progress => _progress !== progress);
            Client.finishedCommands = [...Client.finishedCommands, finalProgress];
            if (Client.activeCommands.length === 0) {
                Client.broadcast({ includeFinished: true });
                Client.stop();
            }
        });
        this.activeCommands.push(progress);
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
            node_ipc_1.default.of[ipcId].emit(MessageType.ProcessState, serializeProcessState({
                pid: process.pid,
                commands: [
                    ...Client.activeCommands.map(progress => progress.getStats(timestamp)),
                    ...(includeFinished ? Client.finishedCommands : []),
                ],
            }));
        }
    }
    static ensureSocketCreated() {
        if (Client.socketCreated) {
            return;
        }
        node_ipc_1.default.config.silent = true;
        node_ipc_1.default.connectTo(ipcId, () => {
            node_ipc_1.default.of[ipcId].on('connect', () => {
                Client.connected = true;
                Client.broadcast({ includeFinished: true });
            });
            node_ipc_1.default.of[ipcId].on('disconnect', () => Client.connected = false);
            node_ipc_1.default.of[ipcId].on('destroy', () => {
                Client.connected = false;
                Client.ensureSocketCreated();
            });
        });
    }
}
Client.activeCommands = [];
Client.finishedCommands = [];
Client.interval = undefined;
Client.connected = false;
Client.nextCommandId = 1;
Client.socketCreated = false;
class CommandProgress {
    constructor(data, onFinish) {
        this.onFinish = onFinish;
        this.outputCount = 0;
        this.checkpoints = [];
        this.progress = {
            ...data,
            startTime: new Date(),
            finishTime: null,
            error: null,
        };
    }
    recordOutput() {
        this.outputCount++;
    }
    finish(error) {
        var _a;
        const timestamp = new Date();
        this.progress.error = (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : null;
        this.progress.finishTime = timestamp;
        this.onFinish(this.getStats(timestamp));
    }
    getStats(timestamp) {
        if (this.progress.finishTime) {
            timestamp = this.progress.finishTime;
        }
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
            }
        };
    }
    getOutputsSince(unixTimestampMs) {
        const index = this.checkpoints.findIndex(([checkpointTime]) => checkpointTime >= unixTimestampMs) - 1;
        return index < 0 ? this.outputCount : this.outputCount - this.checkpoints[index][1];
    }
}
const ipcId = 'sdm-watch';
var MessageType;
(function (MessageType) {
    MessageType["ProcessState"] = "process_state";
})(MessageType || (MessageType = {}));
;
function serializeProcessState(state) {
    return state;
    return {
        ...state,
        commands: state.commands.map(commandProgress => {
            var _a, _b;
            return ({
                ...commandProgress,
                startTime: commandProgress.startTime.toISOString(),
                finishTime: (_b = (_a = commandProgress.finishTime) === null || _a === void 0 ? void 0 : _a.toISOString()) !== null && _b !== void 0 ? _b : null,
                stats: {
                    ...commandProgress.stats,
                    timestamp: commandProgress.stats.timestamp.toISOString(),
                },
            });
        }),
    };
}
function deserializeProcessState(state) {
    return {
        ...state,
        commands: state.commands.map((commandProgress) => ({
            ...commandProgress,
            startTime: new Date(commandProgress.startTime),
            finishTime: commandProgress.finishTime && new Date(commandProgress.finishTime),
            timestamp: new Date(commandProgress.timestamp),
            stats: {
                ...commandProgress.stats,
                timestamp: new Date(commandProgress.stats.timestamp),
            },
        })),
    };
}
