import * as action from "@space48/json-pipe";
import Magento1 from "./client";

export const actions = {
    get: (magento: Magento1) => action.map(async (customerId: string|number) => ({
        customerId,
        addresses: await magento.get(`customers/${customerId}/addresses`),
    })),
};
