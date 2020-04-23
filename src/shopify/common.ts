import * as action from "@space48/json-pipe";
import { Response } from "got";

const concurrency = 20;
export const sink = <I, O>(fn: action.Mapper<I, Promise<O>>) => action.sink({concurrency}, async (input: I) => {
    try {
        return await fn(input);
    } catch (e) {
        const response: Response|undefined = e.response;
        throw (response ? {statusCode: response.statusCode, body: response.body} : e);
    }
});
