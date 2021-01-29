"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionError = exports.FieldType = exports.Field = exports.Action = void 0;
class Action {
    constructor(_config) {
        this._config = _config;
    }
    get config() {
        return Object.freeze(this._config);
    }
    static source(config) {
        const { fn, ...rest } = config;
        return new Action({ ...rest, source: fn });
    }
    static sink(config) {
        const { fn, ...rest } = config;
        return new Action({ ...rest, sink: fn });
    }
}
exports.Action = Action;
class Field {
    constructor(data) {
        this.data = data;
    }
    static ofType(type) {
        return new Field({
            type,
            default: type === FieldType.Boolean ? false : null,
        });
    }
    static boolean() {
        return Field.ofType(FieldType.Boolean);
    }
    static integer() {
        return Field.ofType(FieldType.Integer);
    }
    static string() {
        return Field.ofType(FieldType.String);
    }
    getType() {
        return this.data.type;
    }
    default(value) {
        return new Field({ ...this.data, default: value });
    }
    getDefault() {
        var _a;
        return (_a = this.data.default) !== null && _a !== void 0 ? _a : null;
    }
    description(value) {
        return new Field({ ...this.data, description: value });
    }
    getDescription() {
        var _a;
        return (_a = this.data.description) !== null && _a !== void 0 ? _a : null;
    }
    optional() {
        return this.required(false);
    }
    required(value = true) {
        return new Field({ ...this.data, required: value });
    }
    isRequired() {
        var _a;
        return ((_a = this.data.default) !== null && _a !== void 0 ? _a : null) === null && this.data.required || false;
    }
    valueIsValid(value) {
        switch (this.getType()) {
            case FieldType.Boolean:
                return typeof value === 'boolean';
            case FieldType.Integer:
                return typeof value === 'number';
            case FieldType.String:
                return typeof value === 'string';
        }
    }
    parseString(value) {
        switch (this.getType()) {
            case FieldType.Integer:
                return parseInt(value);
            case FieldType.String:
                return value;
            case FieldType.Boolean:
                throw new Error();
        }
    }
}
exports.Field = Field;
var FieldType;
(function (FieldType) {
    FieldType[FieldType["Boolean"] = 0] = "Boolean";
    FieldType[FieldType["Integer"] = 1] = "Integer";
    FieldType[FieldType["String"] = 2] = "String";
})(FieldType = exports.FieldType || (exports.FieldType = {}));
;
class ActionError extends Error {
    constructor({ message, detail }) {
        super(message);
        this.detail = detail;
    }
}
exports.ActionError = ActionError;
