import { ConfigStore } from "../config-store";
import { ConfigSchema } from ".";
import Magento1 from "./client";
import { createClient } from './credentials';
import { Field, ActionConfig, Fields, Action } from "../action";

export class Magento1ActionFactory {
    constructor(private config: ConfigStore<ConfigSchema>) {}

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
            fn: m1 => data => m1.post(uri, data),
        });
    }

    get(uri: string) {
        return this.source({
            name: 'get',
            params: {
                entity_id: Field.integer().required(),
            },
            fn: m1 => ({params: {entity_id}}) => m1.get(`${uri}/${entity_id}`),
        });
    }

    list(uri: string) {
        return this.source({
            name: 'list',
            fn: m1 => () => m1.search(uri, {sortKey: 'entity_id'}),
        });
    }

    listChildren(name: string, parentUri: string, uriSuffix: string) {
        return this.source({
            name,
            params: {
                entity_id: Field.integer(),
            },
            fn: m1 => async function* ({params: {entity_id}}) {
                if (entity_id) {
                    yield* await m1.get<Array<unknown>>(`${parentUri}/${entity_id}/${uriSuffix}`);
                } else {
                    const parentEntities = m1.search(parentUri, { sortKey: 'entity_id' });
                    for await (const parentEntity of parentEntities) {
                        yield* await m1.get<Array<unknown>>(`${parentUri}/${parentEntity.entity_id}/${uriSuffix}`);
                    }
                }
            },
        })
    }

    update(uri: string) {
        return this.sink({
            name: 'update',
            params: {
                entity_id: Field.integer().required(),
            },
            fn: m2 => ({input, params: {entity_id}}) => m2.put(`${uri}/${entity_id}`, input),
        });
    }

    delete(uri: string) {
        return this.source({
            name: 'delete',
            params: {
                entity_id: Field.integer().required(),
            },
            fn: m1 => ({params: {entity_id}}) => m1.delete(`${uri}/${entity_id}`),
        });
    }

    // advanced methods

    source<P extends Fields = {}>({name, params, fn}: SourceConfig<P>) {
        return Action.source({
            name,
            context: Magento1ActionFactory.clientContext,
            params,
            fn: context => {
                const client = this.getClient(context);
                return fn(client);
            },
        });
    }

    sink<P extends Fields = {}>({name, params, fn}: SinkConfig<P>) {
        return Action.sink({
            name,
            context: Magento1ActionFactory.clientContext,
            params,
            fn: context => {
                const client = this.getClient(context);
                return fn(client);
            },
        });
    }

    private static clientContext = {
        baseUrl: Field.string().required(),
        insecure: Field.boolean(),
    };

    private getClient({baseUrl, insecure}: {baseUrl: string, insecure: boolean}): Magento1 {
        const credentialsConfig = this.config.select('credentials');
        return createClient(credentialsConfig, baseUrl, {insecure});
    }
}

type SourceConfig<P extends Fields = {}> = {
    name: string,
    params?: P,
    fn: (client: Magento1) => ReturnType<NonNullable<ActionConfig<any, P>['source']>>,
};

type SinkConfig<P extends Fields = {}> = {
    name: string,
    params?: P,
    fn: (client: Magento1) => ReturnType<NonNullable<ActionConfig<any, P>['sink']>>,
};
