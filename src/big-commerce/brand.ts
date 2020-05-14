import { sink } from "./common";
import BigCommerce from "./client";
import { source } from "@space48/json-pipe";

export const actions = {
    create: (bigCommerce: BigCommerce) => sink(data => bigCommerce.post('v3/catalog/brands', data)),

    list: (bigCommerce: BigCommerce) => source(bigCommerce.list<Brand>('v3/catalog/brands')),

    delete: (bigCommerce: BigCommerce) => sink(brandId => bigCommerce.delete(`v3/catalog/brands/${brandId}`)),
};

export type Brand = {
    id: number,
    name: string,
};
