import { Command } from "./resource";
import { tap, compose, streamJson, transformJson } from "@space48/json-pipe";
import ipc from "node-ipc";

export async function streamAndReportProgress(scope: string, command: Command, processor: () => AsyncIterable<any>): Promise<void> {
    const progress = Client.reportProgress(scope, command);
    const wrappedProcessor = compose(
        processor,
        tap(() => progress.recordOutput()),
    );
    try {
        await streamJson(() => wrappedProcessor(null));
        progress.finish();
    } catch (e) {
        progress.finish(e);
        throw e;
    }
}

export async function transformAndReportProgress(scope: string, command: Command, processor: (input: AsyncIterable<any>) => AsyncIterable<any>): Promise<void> {
    const progress = Client.reportProgress(scope, command);
    const wrappedProcessor = compose(
        processor,
        tap(() => progress.recordOutput()),
    );
    try {
        await transformJson(wrappedProcessor);
        progress.finish();
    } catch (e) {
        progress.finish(e);
        throw e;
    }
}

export function listenForProgress(listener: (state: ProcessSnapshot[]) => void): () => void {
    let state: ProcessSnapshot[] = [];
    ipc.config.id = ipcId;
    ipc.config.silent = true;
    ipc.serve(() => {
        ipc.server.on(MessageType.ProcessState, (serializedProcessState: any) => {
            const processState = deserializeProcessState(serializedProcessState);
            state = state.filter(({pid}) => pid !== processState.pid).concat(processState);
            listener(state);
        });
    });
    ipc.server.start();
    setImmediate(() => listener(state));
    return () => ipc.server.stop();
}

export type ProcessSnapshot = {
    pid: number,
    commands: CommandProgressSnapshot[],
};

export type CommandProgressSnapshot = {
    pid: number,
    commandId: number,
    scope: string,
    command: Command,
    startTime: Date,
    finishTime: Date|null,
    error: string|null,
    stats: {
        timestamp: Date,
        outputs: number,
        outputs10: number,
        outputs60: number,
        outputs300: number,
    },
};

class Client {
    // note that state is mutable
    private static activeCommands: CommandProgress[] = [];
    private static finishedCommands: CommandProgressSnapshot[] = [];
    private static interval: NodeJS.Timeout|undefined = undefined;
    private static connected = false;
    private static nextCommandId = 1;

    static reportProgress(scope: string, command: Command): CommandProgress {
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
                Client.broadcast({includeFinished: true});
                Client.stop();
            }
        });
        this.activeCommands.push(progress);
        return progress;
    }

    private static start() {
        if (!Client.interval) {
            Client.ensureSocketCreated();
            Client.interval = setInterval(() => Client.broadcast({includeFinished: false}), 1000);
        }
    }

    private static stop() {
        if (Client.interval) {
            clearInterval(Client.interval);
            Client.interval = undefined;
        }
    }

    private static broadcast({includeFinished}: {includeFinished: boolean}) {
        if (Client.connected) {
            const timestamp = new Date();
            ipc.of[ipcId].emit(MessageType.ProcessState, serializeProcessState({
                pid: process.pid,
                commands: [
                    ...Client.activeCommands.map(progress => progress.getStats(timestamp)),
                    ...(includeFinished ? Client.finishedCommands : []),
                ],
            }));
        }
    }

    private static socketCreated = false;

    private static ensureSocketCreated() {
        if (Client.socketCreated) {
            return;
        }

        ipc.config.silent = true;
        ipc.connectTo(ipcId, () => {
            ipc.of[ipcId].on('connect', () => {
                Client.connected = true;
                Client.broadcast({includeFinished: true});
            });
            ipc.of[ipcId].on('disconnect', () => Client.connected = false);
            ipc.of[ipcId].on('destroy', () => {
                Client.connected = false;
                Client.ensureSocketCreated();
            });
        });
    }
}

class CommandProgress {
    private outputCount: number = 0;
    private checkpoints: Array<[number, number]> = [];
    private progress: Omit<CommandProgressSnapshot, 'stats'>;

    constructor(
        data: Omit<CommandProgressSnapshot, 'error' | 'startTime' | 'finishTime' | 'stats'>,
        private onFinish: (result: CommandProgressSnapshot) => void
    ) {
        this.progress = {
            ...data,
            startTime: new Date(),
            finishTime: null,
            error: null,
        };
    }

    recordOutput(): void {
        this.outputCount++;
    }

    finish(error?: Error): void {
        const timestamp = new Date();
        this.progress.error = error?.message ?? null;
        this.progress.finishTime = timestamp;
        this.onFinish(this.getStats(timestamp));
    }

    getStats(timestamp: Date): CommandProgressSnapshot {
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
                outputs10: this.getOutputsSince(unixTimestampMs - 10_000),
                outputs60: this.getOutputsSince(unixTimestampMs - 60_000),
                outputs300: this.getOutputsSince(unixTimestampMs - 300_000),
            }
        };
    }

    private getOutputsSince(unixTimestampMs: number): number {
        const index = this.checkpoints.findIndex(([checkpointTime]) => checkpointTime >= unixTimestampMs) - 1;
        return index < 0 ? this.outputCount : this.outputCount - this.checkpoints[index][1];
    }
}

const ipcId = 'sdm-watch';

enum MessageType {
    ProcessState = 'process_state',
};

function serializeProcessState(state: ProcessSnapshot): any {
    return state;
    return {
        ...state,
        commands: state.commands.map(commandProgress => ({
            ...commandProgress,
            startTime: commandProgress.startTime.toISOString(),
            finishTime: commandProgress.finishTime?.toISOString() ?? null,
            stats: {
                ...commandProgress.stats,
                timestamp: commandProgress.stats.timestamp.toISOString(),
            },
        })),
    };
}

function deserializeProcessState(state: any): ProcessSnapshot {
    return {
        ...state,
        commands: state.commands.map((commandProgress: any) => ({
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
