import { Config } from "../config";
import { ConfigSchema } from ".";
import Magento2, { SortKey } from "./client";
import { createClient } from './credentials';
import action, { Fields, FieldType, Field, ActionConfig, Action } from "../action";

type Key = {
    attributeCode: string,
    type: FieldType.Integer|FieldType.String,
};
type ReadOptions = {
    uri: string,
    key: Key,
    list: ListOptions|false,
};
type WriteOptions = {
    uri: string,
    key: Key,
    create?: string|boolean,
    update?: string|boolean,
    delete?: string|boolean,
};
type ListOptions = {
    uri?: string,
    sortKey: SortKey,
};

export class Magento2ActionFactory {
    constructor(private config: Config<ConfigSchema>) {}

    // CRUD convenience methods

    crud(options: ReadOptions & WriteOptions): Action[] {
        return [
            ...this.read(options),
            ...this.write(options),
        ];
    }

    read({key, uri, list}: ReadOptions): Action[] {
        if (!list) {
            return [];
        }
        return [
            this.get(uri, key),
            this.list(list.uri || uri, list.sortKey),
        ].filter(Boolean);
    }

    write({uri, key, create=true, delete: _delete=true, update=true}: WriteOptions): Action[] {
        const resolveUri = (maybeUri: any) => typeof maybeUri === 'string' ? maybeUri : uri;
        return [
            create && this.create(resolveUri(create)),
            update && this.update(resolveUri(update), key),
            _delete && this.delete(resolveUri(_delete), key),
        ].filter(Boolean) as Action[];
    }

    create(uri: string) {
        return this.sink({
            name: 'create',
            fn: m2 => data => m2.post(uri, data),
        });
    }

    get(uri: string, key: Key) {
        return this.source({
            name: 'get',
            params: {
                [key.attributeCode]: Field.ofType(key.type).required(),
            },
            fn: m2 => params => m2.get(`${uri}/${params[key.attributeCode]}`),
        });
    }

    list(uri: string, sortKey: SortKey) {
        return this.source({
            name: 'list',
            fn: m2 => () => m2.search(uri, {sortKey}),
        });
    }

    update(uri: string, key: Key) {
        return this.sink({
            name: 'update',
            params: {
                [key.attributeCode]: Field.ofType(key.type).required(),
            },
            fn: m2 => (data, params) => m2.put(`${uri}/${params[key.attributeCode]}`, data),
        });
    }

    delete(uri: string, key: Key) {
        return this.source({
            name: 'delete',
            params: {
                [key.attributeCode]: Field.ofType(key.type).required(),
            },
            fn: m2 => params => m2.delete(`${uri}/${params[key.attributeCode]}`),
        });
    }

    // advanced methods

    source<P extends Fields = {}>({name, params, fn}: SourceConfig<P>) {
        return action({
            name,
            context: Magento2ActionFactory.clientContext,
            params,
            source: context => {
                const client = this.getClient(context);
                return fn(client);
            },
        });
    }

    sink<P extends Fields = {}>({name, params, fn}: SinkConfig<P>) {
        return action({
            name,
            context: Magento2ActionFactory.clientContext,
            params,
            sink: context => {
                const client = this.getClient(context);
                return fn(client);
            },
        });
    }

    private static clientContext = {
        baseUrl: Field.string().required(),
        insecure: Field.boolean(),
    };

    private getClient({baseUrl, insecure}: {baseUrl: string, insecure: boolean}): Magento2 {
        const credentialsConfig = this.config.select('credentials');
        return createClient(credentialsConfig, baseUrl, {insecure});
    }
}

type SourceConfig<P extends Fields = {}> = {
    name: string,
    params?: P,
    fn: (client: Magento2) => ReturnType<NonNullable<ActionConfig<any, P>['source']>>,
};

type SinkConfig<P extends Fields = {}> = {
    name: string,
    params?: P,
    fn: (client: Magento2) => ReturnType<NonNullable<ActionConfig<any, P>['sink']>>,
};
