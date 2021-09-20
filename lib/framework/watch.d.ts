import { ConnectorScope } from "./connector";
import { MessageHeader } from ".";
export declare function watchScope(scope: ConnectorScope): ConnectorScope;
export declare function listenForProgress(listener: (state: ProcessSnapshot[]) => void): () => void;
export declare type ProcessSnapshot = Readonly<{
    pid: number;
    executions: ExecutionProgressSnapshot[];
}>;
export declare type ExecutionProgressSnapshot = Readonly<{
    pid: number;
    executionId: number;
    error: string | null;
    commands: CommandProgressSnapshot[];
    timestamp: Date;
    startTime: Date;
    finishTime: Date | null;
    scope: string;
}>;
export declare type CommandProgressSnapshot = Readonly<{
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
