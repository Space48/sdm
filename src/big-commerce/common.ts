import * as action from "@space48/json-pipe";

const concurrency = 50;
export const sink = <I, O>(fn: action.Mapper<I, Promise<O>>) => action.sink({concurrency}, fn);
