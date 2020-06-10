import { Config } from "../config";
import { ConfigSchema } from ".";
import action, { Field, ActionConfig, Fields, Action } from "../action";
import BigCommerce from "./client";

export class BigCommerceActionFactory {
    constructor(private config: Config<ConfigSchema>) {}

    // CRUD convenience methods

    crud(uri: string, children: string[] = []): Action[] {
        return [
            ...this.read(uri, children),
            ...this.write(uri),
        ];
    }

    read(uri: string, children: string[] = []): Action[] {
        return [
            this.get(uri),
            this.list(uri),
            ...children.map(child => this.listChildren(`list-${child}`, uri, child)),
        ];
    }

    write(uri: string): Action[] {
        return [
            this.create(uri),
            this.update(uri),
            this.delete(uri),
        ];
    }

    create(uri: string) {
        return this.sink({
            name: 'create',
            fn: bc => data => bc.post(uri, data),
        });
    }

    get(uri: string, params?: Record<string, any>) {
        return this.source({
            name: 'get',
            params: {
                id: Field.integer().required(),
            },
            fn: bc => ({id}) => bc.get(`${uri}/${id}`, params),
        });
    }

    list(uri: string, params?: Record<string, any>) {
        return this.source({
            name: 'list',
            fn: bc => () => bc.list(uri, params),
        });
    }

    listChildren(name: string, parentUri: string, uriSuffix: string, params?: Record<string, any>) {
        return this.source({
            name,
            params: {
                id: Field.integer(),
            },
            fn: bc => async function* ({id}) {
                if (id) {
                    yield* await bc.get<Array<unknown>>(`${parentUri}/${id}/${uriSuffix}`, params);
                } else {
                    const parentEntities = bc.list(parentUri);
                    for await (const parentEntity of parentEntities) {
                        yield* await bc.get<Array<unknown>>(`${parentUri}/${parentEntity.id}/${uriSuffix}`, params);
                    }
                }
            },
        })
    }

    update(uri: string) {
        return this.sink({
            name: 'update',
            params: {
                id: Field.integer().required(),
            },
            fn: m2 => (data, {id}) => m2.put(`${uri}/${id}`, data),
        });
    }

    delete(uri: string) {
        return this.source({
            name: 'delete',
            params: {
                id: Field.integer().required(),
            },
            fn: bc => ({id}) => bc.delete(`${uri}/${id}`),
        });
    }

    // advanced methods

    source<P extends Fields = {}>({name, params, fn}: SourceConfig<P>) {
        return action({
            name,
            context: BigCommerceActionFactory.clientContext,
            params,
            concurrency: {default: 100},
            source: context => {
                const client = this.getClient(context);
                return fn(client);
            },
        });
    }

    sink<P extends Fields = {}>({name, params, fn}: SinkConfig<P>) {
        return action({
            name,
            context: BigCommerceActionFactory.clientContext,
            params,
            concurrency: {default: 100},
            sink: context => {
                const client = this.getClient(context);
                return fn(client);
            },
        });
    }

    private static clientContext = {
        storeAlias: Field.string().required(),
    };

    private getClient({storeAlias}: {storeAlias: string}): BigCommerce {
        const credentials = this.config.select('credentials').get(storeAlias);
        if (!credentials)  {
            const allAliases = Object.keys(this.config.select('credentials').getAll() || {});
            throw new Error(`No credentials found for store ${storeAlias}. Available stores: ${allAliases.join(', ')}`);
        }
        return new BigCommerce(credentials);
    }
}

type SourceConfig<P extends Fields = {}> = {
    name: string,
    params?: P,
    fn: (client: BigCommerce) => ReturnType<NonNullable<ActionConfig<any, P>['source']>>,
};

type SinkConfig<P extends Fields = {}> = {
    name: string,
    params?: P,
    fn: (client: BigCommerce) => ReturnType<NonNullable<ActionConfig<any, P>['sink']>>,
};
