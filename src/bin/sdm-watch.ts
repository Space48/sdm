#!/usr/bin/env node

import {
  CommandProgressSnapshot,
  ExecutionProgressSnapshot,
  listenForProgress,
  ProcessSnapshot,
} from "../framework/watch";
import Table from "cli-table3";
import readline from "readline";
import chalk from "chalk";
import Duration from "duration";

function main() {
  process.stdin.pause();

  const progressLog = new ProgressLog();

  const stop = listenForProgress(async processes => {
    progressLog.apply(processes);
    const output = progressLog
      .getScopes()
      .map(
        scope =>
          ` ${chalk.red.underline.bold(scope)}\n\n${renderProgressTable(
            progressLog.getExecutions(scope),
          )}`,
      )
      .join("\n\n");
    readline.cursorTo(process.stdout, 0, 0);
    console.error(`Cursor`);
    readline.clearScreenDown(process.stdout);
    process.stdout.write(output + "\n");
  });

  process.once("SIGINT", () => {
    stop();
    process.exit();
  });
}

class ProgressLog {
  private data = new Map<string, ExecutionProgressSnapshot>();

  apply(processes: ProcessSnapshot[]) {
    const executionProgress = processes.map(({ executions }) => executions).flat();
    executionProgress.forEach(progress => {
      const commandIdentifier = `${progress.pid}-${progress.executionId}`;
      this.data.set(commandIdentifier, progress);
    });
  }

  getScopes(): string[] {
    return distinct([...this.data.values()].map(commandProgress => commandProgress.scope));
  }

  getExecutions(scope: string): ExecutionProgressSnapshot[] {
    return [...this.data.values()].filter(commandProgress => commandProgress.scope === scope);
  }
}

function renderProgressTable(executions: ExecutionProgressSnapshot[]): string {
  const head = [
    "Command",
    "Runtime",
    "Items",
    "RPM",
    "RPM 10s",
    "RPM 60s",
    "RPM 5m",
    "Start",
    "Finish",
  ];
  const table = new Table({ head });
  const lines = executions.sort(compareExecutionsForSort).flatMap(execution => {
    const runtimeMillis = execution.timestamp.getTime() - execution.startTime.getTime();
    const commandRows = execution.commands.flatMap(command => [
      `${command.command.endpoint} ${command.command.path}`,
      formatDuration(execution.startTime, command.stats.timestamp),
      command.stats.outputs,
      computeRpm(command.stats.outputs, runtimeMillis),
      computeRpm(command.stats.outputs10, Math.min(10_000, runtimeMillis)),
      computeRpm(command.stats.outputs60, Math.min(60_000, runtimeMillis)),
      computeRpm(command.stats.outputs300, Math.min(300_000, runtimeMillis)),
      formatTimestamp(execution.startTime),
      execution.finishTime ? formatTimestamp(execution.finishTime) : "-",
    ]);
    console.error(`Command Rows: ${JSON.stringify(commandRows)}`);
    const rows = [
      commandRows,
      ["", { colSpan: head.length - 1, content: `↳ Error: ${execution.error}` }],
    ];
    return execution.error ? rows : rows.slice(0, 1);
  });
  console.error(`Lines: ${JSON.stringify(lines)}`);
  table.push(...lines);
  return table.toString();
}

function compareExecutionsForSort(
  execution1: ExecutionProgressSnapshot,
  execution2: ExecutionProgressSnapshot,
): number {
  if (execution1.finishTime && !execution2.finishTime) {
    return -1;
  }
  if (execution2.finishTime && !execution1.finishTime) {
    return 1;
  }
  const command1ComparisonValue =
    execution1.finishTime?.getTime() ?? execution1.startTime.getTime();
  const command2ComparisonValue =
    execution2.finishTime?.getTime() ?? execution2.startTime.getTime();
  return command2ComparisonValue < command1ComparisonValue ? 1 : -1;
}

function formatTimestamp(timestamp: Date): string {
  const isoString = timestamp.toISOString().split(".")[0];
  const isToday =
    timestamp.getFullYear() === Clock.now.getFullYear() &&
    timestamp.getMonth() === Clock.now.getMonth() &&
    timestamp.getDate() === Clock.now.getDate();
  return `${isToday ? isoString.split("T")[1] : isoString}Z`;
}

function formatDuration(from: Date, to: Date) {
  const parts = new Duration(from, to).toString(1).split(" ");
  // remove ms part unless it's the only part
  const partsToKeep = parts.length > 1 ? parts.slice(0, -1) : parts;
  return partsToKeep.join(" ");
}

function computeRpm(count: number, durationMillis: number) {
  const rpm = (60_000 * count) / durationMillis;
  return rpm >= 100 ? Math.round(rpm) : rpm.toPrecision(3);
}

class Clock {
  public static get now(): Date {
    if (!Clock.started) {
      Clock._now = new Date();
      setInterval(() => (Clock._now = new Date()), 100);
      Clock.started = true;
    }
    return Clock._now;
  }

  private static _now: Date;
  private static started = false;
}

main();

function distinct<T>(values: T[]): T[] {
  return [...new Set(values)];
}
