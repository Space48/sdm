import Magento2, { SearchIdField } from "./client";
import { collect, source } from "@space48/json-pipe";

const idField: SearchIdField = {query: 'entity_id', response: 'id'};

export const actions = {
    list: (magento: Magento2) => source(magento.search<Category>('categories/list', {idField})),
};

export async function getAllCategories(magento: Magento2): Promise<Category[]> {
    return await collect(magento.search<Category>('categories/list', {idField}));
}

export type Category = {
    id: number,
    parent_id: number,
    name: string,
    is_active: boolean,
    position: number,
    level: number,
    children: string,
    created_at: string,
    updated_at: string,
    path: string,
    available_sort_by: string[],
    include_in_menu: boolean,
    extension_attributes: Record<string, any>,
    custom_attributes: Array<{
        attribute_code: string,
        value: string
    }>
};
