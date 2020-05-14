import { sink } from "./common";
import BigCommerce from "./client";
import { source } from "@space48/json-pipe";

export const actions = {
    create: (bigCommerce: BigCommerce) => sink(data => bigCommerce.post('v3/catalog/products', data)),

    delete: (bigCommerce: BigCommerce) => sink(productId => bigCommerce.delete(`v3/catalog/products/${productId}`)),

    list: (bigCommerce: BigCommerce) => source(bigCommerce.list('v3/catalog/products', {include})),
};

const include = 'variants,images,custom_fields,bulk_pricing_rules,primary_image,modifiers,options,videos';
