import { sink } from "./common";
import BigCommerce from "./client";
import { source } from "../action";

export const actions = {
    create: (bigCommerce: BigCommerce) => sink(data => bigCommerce.post('v3/catalog/brands', data)),

    list: (bigCommerce: BigCommerce) => source((async function* () {
        for (let page = 1;; page++) {
            const items = (await bigCommerce.get<{data: Brand[]}>('v3/catalog/brands', {page})).data;
            if (items.length === 0) {
                break;
            }
            yield* items;
        }
    })()),

    delete: (bigCommerce: BigCommerce) => sink(brandId => bigCommerce.delete(`v3/catalog/brands/${brandId}`)),
};

export type Brand = {
    id: number,
    name: string,
};
