import * as action from "@space48/json-pipe";
import Shopify, { ISmartCollection } from "shopify-api-node";
import { sink } from "./common";

export const actions = {
    create: (shopify: Shopify) => sink(data => shopify.smartCollection.create(data)),

    update: (shopify: Shopify) => sink(({id, ...rest}: Partial<ISmartCollection>) => shopify.smartCollection.update(id!, rest)),

    list: (shopify: Shopify) => action.source((async function* () {
        let params = { limit: 250 };
        do {
            const result = await shopify.smartCollection.list(params);
            for (const customCollection of result) {
                yield customCollection;
            }
            params = (result as any).nextPageParameters;
        } while (params);
    })()),

    count: (shopify: Shopify) => action.source([shopify.smartCollection.count()]),

    delete: (shopify: Shopify) => sink<number, any>(collectionId => shopify.smartCollection.delete(collectionId)),
};
