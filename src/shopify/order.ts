import * as action from "@space48/json-pipe";
import * as Shopify from "shopify-api-node";
import { sink } from "./common";

export const actions = {
    create: ({order}: Shopify) => sink(data => order.create(data)),

    update: ({order}: Shopify) => sink(({id, ...rest}: Partial<Shopify.IOrder>) => order.update(id!, rest)),

    list: ({order}: Shopify) => action.source(order.list({})),

    count: ({order}: Shopify) => action.source([order.count()]),
};
