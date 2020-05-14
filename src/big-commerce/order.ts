import { sink } from "./common";
import BigCommerce from "./client";
import { source, concurrentMap } from "@space48/json-pipe";

export const actions = {
    create: (bigCommerce: BigCommerce) => sink(data => bigCommerce.post('v2/orders', data)),

    delete: (bigCommerce: BigCommerce) => sink(orderId => bigCommerce.delete(`v2/orders/${orderId}`)),

    get: (bigCommerce: BigCommerce) => concurrentMap(50, orderId => bigCommerce.get(`v2/orders/${orderId}`)),

    'get-products': (bigCommerce: BigCommerce) => concurrentMap(50, orderId => bigCommerce.get(`v2/orders/${orderId}/products`)),

    list: (bigCommerce: BigCommerce) => source(bigCommerce.list('v2/orders')),
};
