import { sink } from "./common";
import BigCommerce from "./client";

export const actions = {
    update: (bigCommerce: BigCommerce) => sink((option: any) =>
        bigCommerce.put(`v3/catalog/products/${option.product_id}/options/${option.id}`, option)),
};
