import * as action from "../action";
import * as Shopify from "shopify-api-node";
import { sink } from "./common";

export const actions = {
    create: (shopify: Shopify) => sink(data => shopify.product.create(data)),

    update: (shopify: Shopify) => sink(({id, ...rest}: Partial<Product>) => shopify.product.update(id!, rest)),

    list: (shopify: Shopify) => action.source((async function* () {
        let params = { limit: 250 };
        do {
            const result = await shopify.product.list(params);
            for (const product of result) {
                yield product;
            }
            params = (result as any).nextPageParameters;
        } while (params);
    })()),

    count: (shopify: Shopify) => action.source([shopify.product.count()]),

    delete: (shopify: Shopify) => sink(productId => shopify.product.delete(productId as number)),
};

type Product = Shopify.IProduct & {
    metafields?: Shopify.IMetafield[];
};

/*

# Notes

- Shopify permits Duplicate variant SKUs across different products (not tested on a single product)
- Shopify appends a -2, -3, etc., suffix to handles when they are non-unique
- Shopify ignores ids on create -- there's no need to remove them
- When updating a product, Shopify identifies variants by their SKU if the variant ID is not specified

 */
