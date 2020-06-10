import * as credentials from './credentials';
import { Config } from '../config';
import { BigCommerceActionFactory } from './action';
import { Action, Field } from '../action';

export type ConfigSchema = {
    credentials: credentials.ConfigSchema,
};

export function getActions(config: Config<ConfigSchema>): Record<string, Action[]> {
    const action = new BigCommerceActionFactory(config);

    return {
        brand: action.crud('v3/catalog/brands'),

        category: [
            ...action.crud('v3/catalog/categories'),
            
            action.source({
                name: 'tree',
                fn: bc => () => bc.get('v3/catalog/categories/tree'),
            }),
        ],

        creds: credentials.getActions(config.select('credentials')),

        order: action.crud('v2/orders', ['products']),

        product: [
            action.source({
                name: 'get',
                params: {
                    id: Field.integer().required(),
                    include: Field.string().default('variants,images,custom_fields,bulk_pricing_rules,primary_image,modifiers,options,videos'),
                    includes: Field.boolean().default(true),
                },
                fn: bigCommerce => ({id, includes, include}) => bigCommerce.get(`v3/catalog/products/${id}`, includes ? {include} : {}),
            }),

            action.source({
                name: 'list',
                params: {
                    include: Field.string().default('variants,images,custom_fields,bulk_pricing_rules,primary_image,modifiers,options,videos'),
                    includes: Field.boolean().default(true),
                },
                fn: bigCommerce => ({includes, include}) => bigCommerce.list(`v3/catalog/products`, includes ? {include} : {}),
            }),

            ...action.write('v3/catalog/products'),
        ],

        store: [action.get('v2/store')],
    };
}
