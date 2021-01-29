"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionCommand = void 0;
const commander_1 = __importDefault(require("commander"));
const util_1 = require("./util");
const json_pipe_1 = require("@space48/json-pipe");
const action_1 = require("./action");
function actionCommand(action) {
    const config = action.config;
    if (Boolean(config.sink) === Boolean(config.source)) {
        throw new Error();
    }
    return config.sink ? sink(config) : source(config);
}
exports.actionCommand = actionCommand;
function source(config) {
    if (!config.source) {
        throw new Error();
    }
    const command = new commander_1.default.Command(util_1.hyphenate(config.name));
    const resolveContext = applyContextConfig(config.context || {}, command);
    const resolveParams = applyParamsConfig(config.params || {}, command);
    const getConcurrency = applyConcurrencyConfig(config.concurrency || null, command);
    command.action(async () => {
        const context = resolveContext();
        const concurrency = getConcurrency();
        const fn = config.source(context);
        if (process.stdin.isTTY) {
            const params = resolveParams({});
            const result = fn({ params });
            try {
                if (Symbol.asyncIterator in result) {
                    await json_pipe_1.streamJson(result);
                }
                else {
                    await json_pipe_1.streamJson((async function* () {
                        const _result = await result;
                        if (_result !== undefined) {
                            yield _result;
                        }
                    })());
                }
            }
            catch (e) {
                console.error(e.detail || e.message);
            }
        }
        else {
            await json_pipe_1.transformJson(json_pipe_1.mapAsync({ concurrency, preserveOrder: true }, transform(input => fn({ input, params: resolveParams(input) }))));
        }
    });
    config.help && command.usage(`\n\n${config.help}`);
    return command;
}
function sink(config) {
    if (!config.sink) {
        throw new Error();
    }
    const command = new commander_1.default.Command(util_1.hyphenate(config.name));
    const resolveContext = applyContextConfig(config.context || {}, command);
    const resolveParams = applyParamsConfig(config.params || {}, command);
    const getConcurrency = applyConcurrencyConfig(config.concurrency || null, command);
    command.action(async () => {
        const context = resolveContext();
        const concurrency = getConcurrency();
        const fn = config.sink(context);
        await json_pipe_1.transformJson(json_pipe_1.mapAsync({ concurrency, preserveOrder: true }, transform(input => fn({ input, params: resolveParams(input) }))));
    });
    config.help && command.usage(`\n\n${config.help}`);
    return command;
}
function transform(fn) {
    return async (input) => {
        const startTime = new Date();
        try {
            const fnResult = fn(input);
            let output;
            if (Symbol.asyncIterator in fnResult) {
                output = [];
                for await (let outputEl of fnResult) {
                    output.push(outputEl);
                }
            }
            else {
                output = await fnResult;
            }
            return {
                timestamp: startTime.toISOString(),
                input,
                duration: Date.now() - startTime.getTime(),
                success: true,
                output,
            };
        }
        catch (error) {
            return {
                timestamp: startTime.toISOString(),
                input,
                duration: Date.now() - startTime.getTime(),
                success: false,
                error: error.detail || error.message,
            };
        }
    };
}
function applyContextConfig(fields, command) {
    const argFields = Object.entries(fields).filter(([, config]) => config.isRequired());
    command.arguments(argFields.map(([name]) => `<${util_1.hyphenate(name)}>`).join(' '));
    const optionFields = Object.entries(fields).filter(([, config]) => !config.isRequired());
    optionFields.forEach(([name, config]) => addOption(name, config, command));
    return () => ({
        ...util_1.objectFromEntries(argFields.map(([name, field], index) => [name, field.parseString(command.args[index])])),
        ...getOptionValues(optionFields.map(([name]) => name), command),
    });
}
function applyParamsConfig(params, command) {
    Object.entries(params).forEach(([name, config]) => addOption(name, config.optional(), command));
    let base = undefined;
    let paramsNotSpecified;
    let paramsRequiredInInput;
    return input => {
        if (!base) {
            base = getOptionValues(Object.keys(params), command);
            paramsNotSpecified = Object.keys(params).filter(name => { var _a; return ((_a = base[name]) !== null && _a !== void 0 ? _a : null) === null; });
            paramsRequiredInInput = paramsNotSpecified.filter(name => params[name].isRequired());
        }
        const inputParams = typeof input === 'object'
            ? util_1.filterProperties(input, (value, name) => typeof name === 'string' && (value !== null && value !== void 0 ? value : null) !== null && paramsNotSpecified.includes(name))
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
        return { ...base, ...inputParams };
    };
}
function applyConcurrencyConfig(config, command) {
    if (typeof config === 'number') {
        return () => config;
    }
    const minConcurrency = (config === null || config === void 0 ? void 0 : config.min) || 1;
    const maxConcurrency = (config === null || config === void 0 ? void 0 : config.max) || 1000;
    if (minConcurrency < 1 || maxConcurrency < 1 || minConcurrency > maxConcurrency) {
        throw new Error();
    }
    if (minConcurrency === maxConcurrency) {
        return () => minConcurrency;
    }
    const parse = (val) => {
        const concurrency = parseInt(val);
        if (isNaN(concurrency) || concurrency < minConcurrency || concurrency > maxConcurrency) {
            throw new Error(`--concurrency must be an integer between ${minConcurrency} and ${maxConcurrency}`);
        }
        return concurrency;
    };
    command.option('--concurrency <value>', '', parse, (config === null || config === void 0 ? void 0 : config.default) || minConcurrency);
    return () => command.opts().concurrency;
}
function addOption(fieldName, field, command) {
    var _a, _b, _c;
    if (field.getType() === action_1.FieldType.Boolean) {
        command.option(`--${field.getDefault() ? 'no-' : ''}${util_1.hyphenate(fieldName)}`, (_a = field.getDescription()) !== null && _a !== void 0 ? _a : '');
    }
    else if (field.isRequired()) {
        command.requiredOption(`--${util_1.hyphenate(fieldName)} <value>`, (_b = field.getDescription()) !== null && _b !== void 0 ? _b : '', raw => field.parseString(raw), field.getDefault());
    }
    else {
        command.option(`--${util_1.hyphenate(fieldName)} <value>`, (_c = field.getDescription()) !== null && _c !== void 0 ? _c : '', raw => field.parseString(raw), field.getDefault());
    }
}
function getOptionValues(names, command) {
    const options = command.opts();
    return util_1.objectFromEntries(names.map(name => [name, options[util_1.camelCase(name)]]));
}
