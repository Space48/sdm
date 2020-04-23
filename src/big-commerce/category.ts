import { sink } from "./common";
import BigCommerce from "./client";
import { source } from "../action";

export const actions = {
    create: (bigCommerce: BigCommerce) => sink(data => bigCommerce.post('v3/catalog/categories', data)),

    list: (bigCommerce: BigCommerce) => source((async function* () {
        for (let page = 1;; page++) {
            const items = (await bigCommerce.get<{data: Category[]}>('v3/catalog/categories', {page})).data;
            if (items.length === 0) {
                break;
            }
            yield* items;
        }
    })()),

    tree: (bigCommerce: BigCommerce) => source(bigCommerce.get('v3/catalog/categories/tree').then((body: any) => body.data)),

    delete: (bigCommerce: BigCommerce) => sink(categoryId => bigCommerce.delete(`v3/catalog/categories/${categoryId}`)),
};

export type Category = {
    id: number,
    parent_id: number,
    name: string,
    description?: string,
};
