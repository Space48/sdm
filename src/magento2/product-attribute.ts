import * as action from "../action";
import Magento2, { SearchIdField } from "./client";

const idField: SearchIdField = {query: 'attribute_id', response: 'attribute_id'};

export const actions = {
    list: (magento: Magento2) => action.source(magento.search('products/attributes', {idField})),

    'list-options': (magento: Magento2) => action.source((async function* () {
        const attributes = magento.search('products/attributes', {idField});
        for await (const attribute of attributes) {
            const options = await magento.get<Array<any>>(`products/attributes/${attribute.attribute_code}/options`);
            yield* options.filter(({value}) => value !== '');
        }
    })()),
};

export async function getAllProductAttributes(magento: Magento2): Promise<ProductAttribute[]> {
    return await action.collect(magento.search<ProductAttribute>('products/attributes', {idField}));
}

export type ProductAttribute = {
    is_wysiwyg_enabled: boolean,
    is_html_allowed_on_front: boolean,
    used_for_sort_by: boolean,
    is_filterable: boolean,
    is_filterable_in_search: boolean,
    is_used_in_grid: boolean,
    is_visible_in_grid: boolean,
    is_filterable_in_grid: boolean,
    position: number,
    apply_to: Array<string>,
    is_searchable: string,
    is_visible_in_advanced_search: string,
    is_comparable: string,
    is_used_for_promo_rules: string,
    is_visible_on_front: string,
    used_in_product_listing: string,
    is_visible: boolean,
    scope: string,
    extension_attributes: Record<string, any>,
    attribute_id: number,
    attribute_code: string,
    frontend_input: string,
    entity_type_id: string,
    is_required: boolean,
    options: Array<{
        label: string,
        value: string,
        sort_order: number,
        is_default: boolean,
        store_labels: Array<{
            store_id: number,
            label: string
          }>
      }>,
    is_user_defined: boolean,
    default_frontend_label: string,
    frontend_labels: Array<{
        store_id: number,
        label: string
      }>,
    note: string,
    backend_type: string,
    backend_model: string,
    source_model: string,
    default_value: string,
    is_unique: string,
    frontend_class: string,
    validation_rules: Array<{
        key: string,
        value: string
      }>,
    custom_attributes: Array<{
        attribute_code: string,
        value: string
      }>
};
