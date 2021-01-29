import { Command } from "./resource";
export declare function streamAndReportProgress(scope: string, command: Command, processor: () => AsyncIterable<any>): Promise<void>;
export declare function transformAndReportProgress(scope: string, command: Command, processor: (input: AsyncIterable<any>) => AsyncIterable<any>): Promise<void>;
export declare function listenForProgress(listener: (state: ProcessSnapshot[]) => void): () => void;
export declare type ProcessSnapshot = {
    pid: number;
    commands: CommandProgressSnapshot[];
};
export declare type CommandProgressSnapshot = {
    pid: number;
    commandId: number;
    scope: string;
    command: Command;
    startTime: Date;
    finishTime: Date | null;
    error: string | null;
    stats: {
        timestamp: Date;
        outputs: number;
        outputs10: number;
        outputs60: number;
        outputs300: number;
    };
};
