import * as credentials from './credentials';
import { Config } from '../config';
import { Magento2ActionFactory } from './action';
import { Field, FieldType, Action } from '../action';

export type ConfigSchema = {
    credentials: credentials.ConfigSchema,
};

export function getActions(config: Config<ConfigSchema>): Record<string, Action[]> {
    const action = new Magento2ActionFactory(config);

    return {
        category: [
            ...action.crud({
                uri: 'categories',
                key: { attributeCode: 'id', type: FieldType.Integer },
                list: {
                    uri: 'categories/list',
                    sortKey: { query: 'entity_id', response: 'id' },
                },
            }),

            action.source({
                name: 'get-tree',
                params: { rootCategoryId: Field.integer().default(1) },
                fn: m2 => ({rootCategoryId}) => m2.get('categories', {rootCategoryId}),
            }),
        ],

        creds: credentials.getActions(config.select('credentials')),

        customer: action.crud({
            uri: 'customers',
            key: { attributeCode: 'id', type: FieldType.Integer },
            list: {
                uri: 'customers/search',
                sortKey: { query: 'entity_id', response: 'id' },
            },
        }),

        order: action.crud({
            uri: 'orders',
            key: { attributeCode: 'id', type: FieldType.Integer },
            list: { sortKey: { query: 'entity_id', response: 'entity_id' } },
        }),

        product: action.crud({
            uri: 'products',
            key: { attributeCode: 'sku', type: FieldType.String },
            list: { sortKey: { query: 'entity_id', response: 'id' } },
        }),

        'product-attribute': [
            action.list('products/attributes', { query: 'attribute_id', response: 'attribute_id' }),
    
            action.source({
                name: 'list-options',
                params: { attribute_code: Field.string() },
                fn: m2 => async function* ({attribute_code}) {
                    if (attribute_code) {
                        const options = await m2.get<Array<any>>(`products/attributes/${attribute_code}/options`);
                        yield* options.filter(({value}) => value !== '');
                    } else {
                        const attributes = m2.search('products/attributes', { sortKey: { query: 'attribute_id', response: 'attribute_id' } });
                        for await (const attribute of attributes) {
                            const options = await m2.get<Array<any>>(`products/attributes/${attribute.attribute_code}/options`);
                            yield* options.filter(({value}) => value !== '');
                        }
                    }
                },
            }),
        ],
    };
}
