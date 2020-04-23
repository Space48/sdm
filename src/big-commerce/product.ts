import { sink } from "./common";
import BigCommerce from "./client";

export const actions = {
    create: (bigCommerce: BigCommerce) => sink(data => bigCommerce.post('v3/catalog/products', data)),
};
