import { Command, ConnectorScope, OutputElement } from "./connector";
import { onEnd, tap, compose, pipe, streamJson, transformJson } from "@space48/json-pipe";
import ipc from "node-ipc";
import { MessageHeader, Path } from ".";
import { encodeHeader } from "./binary-api";
import { throws } from "assert";
import { time, timeStamp } from "console";

export function watchScope(scope: ConnectorScope): ConnectorScope {
  return {
    ...scope,
    execute: async function* (commands: any) {
      const progress = Client.reportProgress(scope.scopeName, commands);
      try {
        for await (const output of scope.execute(commands)) {
          progress.recordOutput(output);
          yield output as any;
        }
        progress.finish();
      } catch (e) {
        progress.finish(e instanceof Error ? e : new Error(String(e)));
        throw e;
      }
    },
  };
}

export function listenForProgress(listener: (state: ProcessSnapshot[]) => void): () => void {
  let state: ProcessSnapshot[] = [];
  ipc.config.id = ipcId;
  ipc.config.silent = true;
  ipc.serve(() => {
    ipc.server.on(MessageType.ProcessState, (serializedProcessState: any) => {
      const processState = deserializeProcessState(serializedProcessState);
      state = state.filter(({ pid }) => pid !== processState.pid).concat(processState);
      listener(state);
    });
  });
  ipc.server.start();
  setImmediate(() => listener(state));
  return () => ipc.server.stop();
}

export type ProcessSnapshot = Readonly<{
  pid: number;
  executions: ExecutionProgressSnapshot[];
}>;

export type ExecutionProgressSnapshot = Readonly<{
  pid: number;
  executionId: number;
  error: string | null;
  commands: CommandProgressSnapshot[];
  timestamp: Date;
  startTime: Date;
  finishTime: Date | null;
  scope: string;
}>;

export type CommandProgressSnapshot = Readonly<{
  commandId: number;
  command: MessageHeader;
  stats: {
    timestamp: Date;
    outputs: number;
    outputs10: number;
    outputs60: number;
    outputs300: number;
  };
}>;

class Client {
  // note that state is mutable
  private static activeExecutions: ExecutionProgress[] = [];
  private static finishedExecutions: ExecutionProgressSnapshot[] = [];
  private static interval: NodeJS.Timeout | undefined = undefined;
  private static connected = false;

  static reportProgress(scope: string, commandOrCommands: any): ExecutionProgress {
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

  private static start() {
    if (!Client.interval) {
      Client.ensureSocketCreated();
      Client.interval = setInterval(() => Client.broadcast({ includeFinished: false }), 1000);
    }
  }

  private static stop() {
    if (Client.interval) {
      clearInterval(Client.interval);
      Client.interval = undefined;
    }
  }

  private static broadcast({ includeFinished }: { includeFinished: boolean }) {
    if (Client.connected) {
      const timestamp = new Date();
      ipc.of[ipcId].emit(
        MessageType.ProcessState,
        serializeProcessState({
          pid: process.pid,
          executions: [
            ...Client.activeExecutions.map(progress => progress.getSnapshot(timestamp)),
            ...(includeFinished ? Client.finishedExecutions : []),
          ],
        }),
      );
    }
  }

  private static socketCreated = false;

  private static ensureSocketCreated() {
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

class ExecutionProgress {
  private multiCommand: boolean;
  private snapshot: Omit<ExecutionProgressSnapshot, "commands">;
  private checkpoints: Array<[number, number]> = [];
  private outputCount = 0;
  private singletonCommandProgress: CommandProgress | undefined;

  private static nextExecutionId = 1;

  constructor(
    scope: string,
    commandOrCommands: Command | Iterable<Command> | AsyncIterable<Command>,
    pid: number,
    private onFinish: (result: ExecutionProgressSnapshot) => void,
  ) {
    this.multiCommand = isIterable(commandOrCommands);
    if (!this.multiCommand) {
      this.singletonCommandProgress = this.createCommandProgress(commandOrCommands as Command);
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

  getSnapshot(timestamp: Date): ExecutionProgressSnapshot {
    if (this.snapshot.finishTime) {
      timestamp = this.snapshot.finishTime;
    }
    const commandProgresses = this.multiCommand
      ? Object.values(this.commandProgresses)
      : [this.singletonCommandProgress!];
    return {
      ...this.snapshot,
      timestamp,
      commands: commandProgresses.map(progress => progress.getSnapshot(timestamp)),
    };
  }

  recordOutput(output: unknown) {
    if (this.multiCommand) {
      const outputEl = output as OutputElement;
      this.getCommandProgress(outputEl).recordOutput();
    } else {
      this.singletonCommandProgress!.recordOutput();
    }
    this.outputCount++;
  }

  finish(error?: Error): void {
    const timestamp = new Date();
    this.snapshot = {
      ...this.snapshot,
      error: error?.message ?? null,
      finishTime: timestamp,
    };
    this.onFinish(this.getSnapshot(timestamp));
  }

  private commandProgresses: Record<string, CommandProgress> = {};

  private getCommandProgress(outputEl: OutputElement): CommandProgress {
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

  private nextCommandId = 1;

  private createCommandProgress(messageHeader: MessageHeader): CommandProgress {
    return new CommandProgress({
      command: messageHeader,
      commandId: this.nextCommandId++,
    });
  }

  private static stripDocIds(path: Path): Path {
    return path.map(pathElement => {
      if (Array.isArray(pathElement)) {
        return [pathElement[0], Path.WILDCARD];
      } else {
        return pathElement;
      }
    });
  }

  private getOutputsSince(unixTimestampMs: number): number {
    const index =
      this.checkpoints.findIndex(([checkpointTime]) => checkpointTime >= unixTimestampMs) - 1;
    return index < 0 ? this.outputCount : this.outputCount - this.checkpoints[index][1];
  }
}

class CommandProgress {
  private outputCount = 0;
  private checkpoints: Array<[number, number]> = [];

  constructor(private progress: Omit<CommandProgressSnapshot, "stats">) {}

  recordOutput(): void {
    this.outputCount++;
  }

  getSnapshot(timestamp: Date): CommandProgressSnapshot {
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
      },
    };
  }

  private getOutputsSince(unixTimestampMs: number): number {
    const index =
      this.checkpoints.findIndex(([checkpointTime]) => checkpointTime >= unixTimestampMs) - 1;
    return index < 0 ? this.outputCount : this.outputCount - this.checkpoints[index][1];
  }
}

const ipcId = "sdm-watch";

enum MessageType {
  ProcessState = "process_state",
}

function serializeProcessState(state: ProcessSnapshot): any {
  return {
    ...state,
    executions: state.executions.map(executionProgress => ({
      ...executionProgress,
      startTime: executionProgress.startTime.toISOString(),
      finishTime: executionProgress.finishTime?.toISOString() ?? null,
      commands: executionProgress.commands.map(command => ({
        ...command,
        stats: {
          ...command.stats,
          timestamp: command.stats.timestamp.toISOString(),
        },
      })),
    })),
  };
}

function deserializeProcessState(state: any): ProcessSnapshot {
  return {
    ...state,
    executions: state.executions.map((executionProgress: any) => ({
      ...executionProgress,
      startTime: new Date(executionProgress.startTime),
      finishTime: executionProgress.finishTime && new Date(executionProgress.finishTime),
      timestamp: new Date(executionProgress.timestamp),
      commands: executionProgress.commands.map((command: any) => ({
        ...command,
        stats: {
          ...command.stats,
          timestamp: new Date(command.stats.timestamp),
        },
      })),
    })),
  };
}

type AnyIterable<T> = AsyncIterable<T> | Iterable<T>;

function isIterable<T>(value: any): value is AnyIterable<T> {
  return isSyncIterable(value) || isAsyncIterable(value);
}

function isSyncIterable(value: any): value is Iterable<any> {
  return Symbol.iterator in value;
}

function isAsyncIterable(value: any): value is AsyncIterable<any> {
  return Symbol.asyncIterator in value;
}
