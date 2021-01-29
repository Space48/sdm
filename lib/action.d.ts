export declare class Action {
    private _config;
    constructor(_config: ActionConfig<any, any>);
    get config(): Readonly<ActionConfig<any, any>>;
    static source<Context extends Fields, Params extends Fields>(config: SourceConfig<Context, Params>): Action;
    static sink<Context extends Fields, Params extends Fields>(config: SinkConfig<Context, Params>): Action;
}
export declare type SourceConfig<Context extends Fields = {}, Params extends Fields = {}> = Omit<ActionConfig<Context, Params>, 'source' | 'sink'> & {
    fn: ActionConfig<Context, Params>['source'];
};
export declare type SinkConfig<Context extends Fields = {}, Params extends Fields = {}> = Omit<ActionConfig<Context, Params>, 'source' | 'sink'> & {
    fn: ActionConfig<Context, Params>['sink'];
};
export declare type ActionConfig<Context extends Fields = {}, Params extends Fields = {}> = {
    name: string;
    help?: string;
    context?: Context;
    params?: Params;
    concurrency?: ConcurrencyOptions;
    source?: (context: FieldValues<Context>) => (args: {
        input?: any;
        params: FieldValues<Params>;
    }) => Promise<unknown> | AsyncIterable<unknown>;
    sink?: (context: FieldValues<Context>) => (args: {
        input: any;
        params: FieldValues<Params>;
    }) => Promise<unknown> | AsyncIterable<unknown>;
};
export declare type Fields = Record<string, Field<any, any, any>>;
export declare class Field<T extends FieldType = FieldType, Req extends boolean = false, Def extends DefaultValue<T> = any> {
    private data;
    private constructor();
    static ofType<T extends FieldType>(type: T): Field<T, false, T extends FieldType.Boolean ? false : null>;
    static boolean(): Field<FieldType.Boolean, false, false>;
    static integer(): Field<FieldType.Integer, false, null>;
    static string(): Field<FieldType.String, false, null>;
    getType(): FieldType;
    default<V extends DefaultValue<T>>(value: V): Field<T, Req, V>;
    getDefault(): DefaultValue<T>;
    description(value: string | null): Field<T, Req, Def>;
    getDescription(): string | null;
    optional(): Field<T, false, Def>;
    required(value?: true): Field<T, true, Def>;
    required(value: false): Field<T, false, Def>;
    required(value: boolean): Field<T, boolean, Def>;
    isRequired(): boolean;
    valueIsValid(value: any): boolean;
    parseString(value: string): ValueType<T>;
}
declare type DefaultValue<T extends FieldType> = T extends FieldType.Boolean ? boolean : ValueType<T> | null;
export declare enum FieldType {
    Boolean = 0,
    Integer = 1,
    String = 2
}
export declare type FieldValues<T extends Fields = {}> = {
    [K in keyof T]: FieldValue<T[K]>;
};
declare type FieldValue<P extends Field> = P extends Field<infer T, infer R, infer D> ? R extends true ? ValueType<T> : D extends ValueType<T> ? ValueType<T> : ValueType<T> | null : never;
export declare type ValueType<P extends FieldType> = P extends FieldType.Boolean ? boolean : P extends FieldType.Integer ? number : P extends FieldType.String ? string : never;
export declare type ConcurrencyOptions = number | {
    min?: number;
    max?: number;
    default?: number;
};
export declare class ActionError extends Error {
    readonly detail: any;
    constructor({ message, detail }: {
        message?: string;
        detail?: any;
    });
}
export {};
