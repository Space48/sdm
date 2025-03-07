#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const watch_1 = require("../framework/watch");
const cli_table3_1 = __importDefault(require("cli-table3"));
const readline_1 = __importDefault(require("readline"));
const chalk_1 = __importDefault(require("chalk"));
const duration_1 = __importDefault(require("duration"));
function main() {
    process.stdin.pause();
    const progressLog = new ProgressLog();
    const stop = watch_1.listenForProgress(async (processes) => {
        progressLog.apply(processes);
        const output = progressLog
            .getScopes()
            .map(scope => ` ${chalk_1.default.red.underline.bold(scope)}\n\n${renderProgressTable(progressLog.getExecutions(scope))}`)
            .join("\n\n");
        readline_1.default.cursorTo(process.stdout, 0, 0);
        console.error(`Cursor`);
        readline_1.default.clearScreenDown(process.stdout);
        process.stdout.write(output + "\n");
    });
    process.once("SIGINT", () => {
        stop();
        process.exit();
    });
}
class ProgressLog {
    constructor() {
        this.data = new Map();
    }
    apply(processes) {
        const executionProgress = processes.map(({ executions }) => executions).flat();
        executionProgress.forEach(progress => {
            const commandIdentifier = `${progress.pid}-${progress.executionId}`;
            this.data.set(commandIdentifier, progress);
        });
    }
    getScopes() {
        return distinct([...this.data.values()].map(commandProgress => commandProgress.scope));
    }
    getExecutions(scope) {
        return [...this.data.values()].filter(commandProgress => commandProgress.scope === scope);
    }
}
function renderProgressTable(executions) {
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
    const table = new cli_table3_1.default({ head });
    const lines = executions.sort(compareExecutionsForSort).flatMap(execution => {
        const runtimeMillis = execution.timestamp.getTime() - execution.startTime.getTime();
        const commandRows = execution.commands.flatMap(command => [
            `${command.command.endpoint} ${command.command.path}`,
            formatDuration(execution.startTime, command.stats.timestamp),
            command.stats.outputs,
            computeRpm(command.stats.outputs, runtimeMillis),
            computeRpm(command.stats.outputs10, Math.min(10000, runtimeMillis)),
            computeRpm(command.stats.outputs60, Math.min(60000, runtimeMillis)),
            computeRpm(command.stats.outputs300, Math.min(300000, runtimeMillis)),
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
function compareExecutionsForSort(execution1, execution2) {
    var _a, _b, _c, _d;
    if (execution1.finishTime && !execution2.finishTime) {
        return -1;
    }
    if (execution2.finishTime && !execution1.finishTime) {
        return 1;
    }
    const command1ComparisonValue = (_b = (_a = execution1.finishTime) === null || _a === void 0 ? void 0 : _a.getTime()) !== null && _b !== void 0 ? _b : execution1.startTime.getTime();
    const command2ComparisonValue = (_d = (_c = execution2.finishTime) === null || _c === void 0 ? void 0 : _c.getTime()) !== null && _d !== void 0 ? _d : execution2.startTime.getTime();
    return command2ComparisonValue < command1ComparisonValue ? 1 : -1;
}
function formatTimestamp(timestamp) {
    const isoString = timestamp.toISOString().split(".")[0];
    const isToday = timestamp.getFullYear() === Clock.now.getFullYear() &&
        timestamp.getMonth() === Clock.now.getMonth() &&
        timestamp.getDate() === Clock.now.getDate();
    return `${isToday ? isoString.split("T")[1] : isoString}Z`;
}
function formatDuration(from, to) {
    const parts = new duration_1.default(from, to).toString(1).split(" ");
    // remove ms part unless it's the only part
    const partsToKeep = parts.length > 1 ? parts.slice(0, -1) : parts;
    return partsToKeep.join(" ");
}
function computeRpm(count, durationMillis) {
    const rpm = (60000 * count) / durationMillis;
    return rpm >= 100 ? Math.round(rpm) : rpm.toPrecision(3);
}
class Clock {
    static get now() {
        if (!Clock.started) {
            Clock._now = new Date();
            setInterval(() => (Clock._now = new Date()), 100);
            Clock.started = true;
        }
        return Clock._now;
    }
}
Clock.started = false;
main();
function distinct(values) {
    return [...new Set(values)];
}
