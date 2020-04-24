import * as action from "@space48/json-pipe";
import Shopify from "shopify-api-node";
import { sink } from "./common";

export const actions = {
    create: ({order}: Shopify) => sink(data => order.create(data)),

    update: ({order}: Shopify) => sink(({id, ...rest}: Partial<Shopify.IOrder>) => order.update(id!, rest)),

    delete: ({order}: Shopify) => sink((id: number|string) => order.delete(+id)),

    list: (shopify: Shopify) => action.source((async function* () {
        let params = { limit: 250, status: 'any' };
        do {
            const result = await shopify.order.list(params);
            for (const order of result) {
                yield order;
            }
            params = (result as any).nextPageParameters;
        } while (params);
    })()),

    count: ({order}: Shopify) => action.source([order.count()]),
};
