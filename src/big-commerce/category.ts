import { sink } from "./common";
import BigCommerce from "./client";
import { source } from "@space48/json-pipe";

export const actions = {
    create: (bigCommerce: BigCommerce) => sink(data => bigCommerce.post('v3/catalog/categories', data)),

    list: (bigCommerce: BigCommerce) => source(bigCommerce.list('v3/catalog/categories')),

    tree: (bigCommerce: BigCommerce) => source(bigCommerce.get('v3/catalog/categories/tree').then((body: any) => body.data)),

    delete: (bigCommerce: BigCommerce) => sink(categoryId => bigCommerce.delete(`v3/catalog/categories/${categoryId}`)),
};

export type Category = {
    id: number,
    parent_id: number,
    name: string,
    description?: string,
};
