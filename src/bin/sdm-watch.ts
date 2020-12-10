#!/usr/bin/env node

import { CommandProgressSnapshot, listenForProgress, ProcessSnapshot } from "../watch";
import { flatten, distinct } from "../util";
import Table from "cli-table3";
import readline from "readline";
import chalk from "chalk";
const Duration = require("duration");

function main() {
  process.stdin.pause();

  const progressLog = new ProgressLog();

  const stop = listenForProgress(async processes => {
    progressLog.apply(processes);
    const output = progressLog.getScopes()
      .map(scope => ` ${chalk.red.underline.bold(scope)}\n\n${renderProgressTable(progressLog.getCommands(scope))}`)
      .join('\n\n');
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    process.stdout.write(output + '\n');
  });

  process.once('SIGINT', () => {
    stop();
    process.exit();
  });
}

class ProgressLog {
  private data = new Map<string, CommandProgressSnapshot>();

  apply(processes: ProcessSnapshot[]) {
    const commandProgress = processes.map(({commands}) => commands).reduce(flatten, []);
    commandProgress.forEach(progress => {
      const commandIdentifier = `${progress.pid}-${progress.commandId}`;
      this.data.set(commandIdentifier, progress);
    });
  }

  getScopes(): string[] {
    return [...this.data.values()]
      .map(commandProgress => commandProgress.scope)
      .filter(distinct);
  }

  getCommands(scope: string): CommandProgressSnapshot[] {
    return [...this.data.values()]
      .filter(commandProgress => commandProgress.scope === scope);
  }
}

function renderProgressTable(commands: CommandProgressSnapshot[]): string {
  const head = ['PID', 'Command', 'Runtime', 'Items', 'RPM', 'RPM 10s', 'RPM 60s', 'RPM 5m', 'Start', 'Finish'];
  const table = new Table({head});
  const lines = commands
    .sort((command1, command2) => compareCommandsForSort(command1, command2))
    .map(command => {
      const runtimeMillis = command.stats.timestamp.getTime() - command.startTime.getTime();
      const rows = [
        [
          command.pid,
          `${command.command.name} ${command.command.path}`,
          formatDuration(command.startTime, command.stats.timestamp),
          command.stats.outputs,
          computeRpm(command.stats.outputs, runtimeMillis),
          computeRpm(command.stats.outputs10, Math.min(10_000, runtimeMillis)),
          computeRpm(command.stats.outputs60, Math.min(60_000, runtimeMillis)),
          computeRpm(command.stats.outputs300, Math.min(300_000, runtimeMillis)),
          formatTimestamp(command.startTime),
          command.finishTime ? formatTimestamp(command.finishTime) : '-',
        ],
        [
          '',
          {colSpan: head.length - 1, content: `↳ Error: ${command.error}`}
        ]
      ];
      return command.error ? rows : rows.slice(0, 1);
    })
    .reduce(flatten, []);
  table.push(...lines);
  return table.toString();
}

function compareCommandsForSort(command1: CommandProgressSnapshot, command2: CommandProgressSnapshot): number {
  if (command1.finishTime && !command2.finishTime) {
    return -1;
  }
  if (command2.finishTime && !command1.finishTime) {
    return 1;
  }
  const command1ComparisonValue = command1.finishTime?.getTime() ?? command1.startTime.getTime();
  const command2ComparisonValue = command2.finishTime?.getTime() ?? command2.startTime.getTime();
  return command2ComparisonValue < command1ComparisonValue ? 1 : -1;
}

function formatTimestamp(timestamp: Date): string {
  const isoString = timestamp.toISOString().split('.')[0];
  const isToday = timestamp.getFullYear() === Clock.now.getFullYear()
    && timestamp.getMonth() === Clock.now.getMonth()
    && timestamp.getDate() === Clock.now.getDate();
  return `${isToday ? isoString.split('T')[1] : isoString}Z`;
}

function formatDuration(from: Date, to: Date) {
  const parts = new Duration(from, to).toString(1).split(' ');
  // remove ms part unless it's the only part
  const partsToKeep = parts.length > 1 ? parts.slice(0, -1) : parts;
  return partsToKeep.join(' ');
}

function computeRpm(count: number, durationMillis: number) {
  const rpm = (60_000 * count) / durationMillis;
  return rpm >= 100 ? Math.round(rpm) : rpm.toPrecision(3);
}

class Clock {
  public static get now(): Date {
    if (!Clock.started) {
      Clock._now = new Date();
      setInterval(() => Clock._now = new Date(), 100);
      Clock.started = true;
    }
    return Clock._now;
  }

  private static _now: Date;
  private static started = false;
}

main();
