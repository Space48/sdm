export class Action {
    constructor (private _config: ActionConfig<any, any>) {}

    get config(): Readonly<ActionConfig<any, any>> {
        return Object.freeze(this._config);
    }
}

export type ActionConfig<Context extends Fields = {}, Params extends Fields = {}> = {
    name: string,
    context?: Context,
    params?: Params,
    ordered?: boolean, // = FALSE. whether or not output order must be consistent with input order
    concurrency?: ConcurrencyOptions, // = {default: 1, min: 1, max: INF}
    source?: (context: FieldValues<Context>) => (params: FieldValues<Params>) => Promise<unknown>|AsyncIterable<unknown>,
    sink?: (context: FieldValues<Context>) => (input: any, params: FieldValues<Params>) => Promise<unknown>|AsyncIterable<unknown>,
};

export default function action<Context extends Fields = {}, Params extends Fields = {}>(config: ActionConfig<Context, Params>): Action {
    if (Boolean(config.sink) === Boolean(config.source)) {
        throw new Error();
    }
    return new Action(config);
}

export type Fields = Record<string, Field<any, any, any>>;

export class Field<T extends FieldType = FieldType, Req extends boolean = false, Def extends DefaultValue<T> = any> {
    private constructor(private data: any) {}

    static ofType<T extends FieldType>(type: T): Field<T, false, T extends FieldType.Boolean ? false : null> {
        return new Field({
            type,
            default: type ===  FieldType.Boolean ? false : null,
        });
    }

    static boolean(): Field<FieldType.Boolean, false, false> {
        return Field.ofType(FieldType.Boolean);
    }

    static integer(): Field<FieldType.Integer, false, null> {
        return Field.ofType(FieldType.Integer);
    }

    static string(): Field<FieldType.String, false, null> {
        return Field.ofType(FieldType.String);
    }

    getType(): FieldType {
        return this.data.type;
    }

    default<V extends DefaultValue<T>>(value: V): Field<T, Req, V> {
        return new Field({ ...this.data, default: value });
    }

    getDefault(): DefaultValue<T> {
        return this.data.default ?? null;
    }

    description(value: string|null): Field<T, Req, Def> {
        return new Field({ ...this.data, description: value });
    }

    getDescription(): string|null {
        return this.data.description ?? null;
    }

    optional(): Field<T, false, Def> {
        return this.required(false);
    }

    required(value?: true): Field<T, true, Def>;
    required(value: false): Field<T, false, Def>;
    required(value: boolean = true): Field<T, boolean, Def> {
        return new Field({ ...this.data, required: value });
    }

    isRequired(): boolean {
        return (this.data.default ?? null) === null && this.data.required || false;
    }

    valueIsValid(value: any): boolean {
        switch (this.getType()) {
            case FieldType.Boolean:
                return typeof value === 'boolean';
            case FieldType.Integer:
                return typeof value === 'number';
            case FieldType.String:
                return typeof value === 'string';
        }
    }

    parseString(value: string): ValueType<T> {
        switch (this.getType()) {
            case FieldType.Integer:
                return parseInt(value) as ValueType<T>;
            case FieldType.String:
                return value as ValueType<T>;
            case FieldType.Boolean:
                throw new Error();
        }
    }
}

type DefaultValue<T extends FieldType> = T extends FieldType.Boolean ? boolean : ValueType<T>|null

export enum FieldType {
    Boolean,
    Integer,
    String,
};

export type FieldValues<T extends Fields> = {[K in keyof T]: FieldValue<T[K]>};
type FieldValue<P extends Field> =
    P extends Field<infer T, infer R, infer D> ? 
        R extends true ? ValueType<T>
        : D extends ValueType<T> ? ValueType<T>
        : ValueType<T>|null
    : never;

type ValueType<P extends FieldType> = 
    P extends FieldType.Boolean ? boolean
    : P extends FieldType.Integer ? number
    : P extends FieldType.String ? string
    : never;

export type ConcurrencyOptions = number | {
    min?: number,
    max?: number,
    default?: number,
};
