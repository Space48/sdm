import commander from "commander";
import { objectFromEntries, filterProperties, hyphenate, camelCase } from "./util";
import { streamJson, mapAsync, transformJson } from "@space48/json-pipe";
import { ActionConfig, Fields, FieldValues, ConcurrencyOptions, Field, FieldType, Action } from "./action";

export function actionCommand(action: Action): commander.Command {
    const config = action.config;
    if (Boolean(config.sink) === Boolean(config.source)) {
        throw new Error();
    }
    return config.sink ? sink(config) : source(config);
}

function source<Context extends Fields = {}, Params extends Fields = {}>(config: ActionConfig<Context, Params>): commander.Command {
    if (!config.source) {
        throw new Error();
    }

    const command = new commander.Command(hyphenate(config.name));

    const resolveContext = applyContextConfig(config.context || {} as Context, command);
    const resolveParams = applyParamsConfig(config.params || {} as Params, command);
    const getConcurrency = applyConcurrencyConfig(config.concurrency || null, command);

    command.action(() => {
        const context = resolveContext();
        const concurrency = getConcurrency();
        const fn = config.source!(context as any);
        if (process.stdin.isTTY) {
            const params = resolveParams({});
            const result = fn({params});
            if (Symbol.asyncIterator in result) {
                streamJson(result as AsyncIterable<any>);
            } else {
                streamJson((async function* () {
                    const _result = await result;
                    if (_result !== undefined) {
                        yield _result;
                    }
                })());
            }
        } else {
            transformJson(
                mapAsync({concurrency, preserveOrder: true}, transform(input => fn({input, params: resolveParams(input)})))
            );
        }
    });

    config.help && command.usage(`\n\n${config.help}`);

    return command;
}

function sink<Context extends Fields = {}, Params extends Fields = {}>(config: ActionConfig<Context, Params>): commander.Command {
    if (!config.sink) {
        throw new Error();
    }

    const command = new commander.Command(hyphenate(config.name));

    const resolveContext = applyContextConfig(config.context || {} as Context, command);
    const resolveParams = applyParamsConfig(config.params || {} as Params, command);
    const getConcurrency = applyConcurrencyConfig(config.concurrency || null, command);

    command.action(() => {
        const context = resolveContext();
        const concurrency = getConcurrency();
        const fn = config.sink!(context);
        transformJson(
            mapAsync({concurrency, preserveOrder: true}, transform(input => fn({input, params: resolveParams(input)})))
        );
    });

    config.help && command.usage(`\n\n${config.help}`);

    return command;
}

function transform(fn: (input: any) => Promise<unknown>|AsyncIterable<unknown>) {
    return async (input: any) => {
        const startTime = new Date();
        try {
            const fnResult = fn(input);
            let output;
            if (Symbol.asyncIterator in fnResult) {
                output = [];
                for await (let outputEl of fnResult as AsyncIterable<any>) {
                    output.push(outputEl);
                }
            } else {
                output = await fnResult;
            }
            return {
                timestamp: startTime.toISOString(),
                input,
                duration: Date.now() - startTime.getTime(),
                success: true,
                output,
            };
        } catch (error) {
            return {
                timestamp: startTime.toISOString(),
                input,
                duration: Date.now() - startTime.getTime(),
                success: false,
                error: error.message,
            };
        }
    };
}

function applyContextConfig<T extends Fields>(fields: T, command: commander.Command): () => FieldValues<T> {
    const argFields = Object.entries(fields).filter(([, config]) => config.isRequired());
    command.arguments(argFields.map(([name]) => `<${hyphenate(name)}>`).join(' '));

    const optionFields = Object.entries(fields).filter(([, config]) => !config.isRequired());
    optionFields.forEach(([name, config]) => addOption(name, config, command));

    return () => ({
        ...objectFromEntries(argFields.map(([name, field], index) => [name, field.parseString(command.args[index])])),
        ...getOptionValues(optionFields.map(([name]) => name), command),
    }) as FieldValues<T>;
}

function applyParamsConfig<T extends Fields>(params: T, command: commander.Command): (input: any) => FieldValues<T> {
    Object.entries(params).forEach(([name, config]) => addOption(name, config.optional(), command));
    let base: Partial<FieldValues<T>>|undefined = undefined;
    let paramsNotSpecified: string[];
    let paramsRequiredInInput: string[];
    return input => {
        if (!base) {
            base = getOptionValues(Object.keys(params), command) as Partial<FieldValues<T>>;
            paramsNotSpecified = Object.keys(params).filter(name => (base![name] ?? null) === null);
            paramsRequiredInInput = paramsNotSpecified.filter(name => params[name].isRequired());
        }
        const inputParams: Partial<FieldValues<T>> =
            typeof input === 'object'
                ? filterProperties(
                    input as Partial<FieldValues<T>>,
                    (value, name) => typeof name === 'string' && (value ?? null) !== null && paramsNotSpecified.includes(name)
                )
                : {};
        const missingParams = paramsRequiredInInput.filter(field => !(field in inputParams));
        if (missingParams.length > 0) {
            const plural = missingParams.length > 1 ? 's' : '';
            throw new Error(`No value${plural} provided for required param${plural}: ${missingParams.join(', ')}`);
        }
        const invalidParamValues = Object.entries(inputParams)
            .filter(([name, value]) => !params[name].valueIsValid(value))
            .map(([name]) => name);
        if (invalidParamValues.length > 0) {
            const plural = invalidParamValues.length > 1 ? 's' : '';
            throw new Error(`Invalid value${plural} provided for: ${invalidParamValues.join(', ')}`);
        }
        return {...base, ...inputParams} as FieldValues<T>;
    };
}

function applyConcurrencyConfig(config: ConcurrencyOptions|null, command: commander.Command): () => number {
    if (typeof config === 'number') {
        return () => config;
    }
    const minConcurrency = config?.min || 1;
    const maxConcurrency = config?.max || 1000;
    if (minConcurrency < 1 || maxConcurrency < 1 || minConcurrency > maxConcurrency) {
        throw new Error();
    }
    if (minConcurrency === maxConcurrency) {
        return () => minConcurrency;
    }
    const parse = (val: string) => {
        const concurrency = parseInt(val);
        if (isNaN(concurrency) || concurrency < minConcurrency || concurrency > maxConcurrency) {
            throw new Error(`--concurrency must be an integer between ${minConcurrency} and ${maxConcurrency}`);
        }
        return concurrency;
    }
    command.option('--concurrency <value>', '', parse, config?.default || minConcurrency);
    return () => command.opts().concurrency;
}

function addOption(fieldName: string, field: Field, command: commander.Command): void {
    if (field.getType() === FieldType.Boolean) {
        command.option(
            `--${field.getDefault() ? 'no-' : ''}${hyphenate(fieldName)}`,
            field.getDescription() ?? '',
        );
    } else if (field.isRequired()) {
        command.requiredOption(
            `--${hyphenate(fieldName)} <value>`,
            field.getDescription() ?? '',
            raw => field.parseString(raw),
            field.getDefault(),
        );
    } else {
        command.option(
            `--${hyphenate(fieldName)} <value>`,
            field.getDescription() ?? '',
            raw => field.parseString(raw),
            field.getDefault(),
        );
    }
}

function getOptionValues(names: string[], command: commander.Command) {
    const options = command.opts();
    return objectFromEntries(names.map(name => [name, options[camelCase(name)]]));
}
