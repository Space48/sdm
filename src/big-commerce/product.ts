import { sink } from "./common";
import BigCommerce from "./client";
import { source } from "@space48/json-pipe";

export const actions = {
    create: (bigCommerce: BigCommerce) => sink(data => bigCommerce.post('v3/catalog/products', data)),

    delete: (bigCommerce: BigCommerce) => sink(productId => bigCommerce.delete(`v3/catalog/products/${productId}`)),

    list: (bigCommerce: BigCommerce) => source((async function* () {
        for (let page = 1;; page++) {
            const items = (await bigCommerce.get('v3/catalog/products', {page})).data;
            if (items.length === 0) {
                break;
            }
            yield* items;
        }
    })()),
};
