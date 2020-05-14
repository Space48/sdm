import * as action from "@space48/json-pipe";

const sinkConcurrency = 100;
export const sink = <I, O>(fn: action.Mapper<I, Promise<O>>) => action.sink({concurrency: sinkConcurrency}, fn);
