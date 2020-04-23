import * as action from "../action";
import * as Shopify from "shopify-api-node";
import { sink } from "./common";

export const actions = {
    create: ({customer}: Shopify) => sink(data => customer.create(data)),

    update: ({customer}: Shopify) => sink(({id, ...rest}: Partial<Shopify.ICustomer>) => customer.update(id!, rest)),

    save: (shopify: Shopify) => sink(async (customer: Partial<Shopify.ICustomer>) => {
        const customerId = customer.id || (customer.email && await getCustomerId(shopify.customer, customer.email));
        if (!customerId) {
            throw new Error('`id` or `email` must be specified in order to save a customer.');
        }
        return customerId
            ? await shopify.customer.update(customerId, {...customer, id: customerId})
            : await shopify.customer.create(customer);
    }),

    list: ({customer}: Shopify) => action.source(customer.list({})),

    count: ({customer}: Shopify) => action.source([customer.count()]),
};

async function getCustomerId(customerApi: Shopify['customer'], email: string) {
    const customers = await customerApi.search({query: `email:${email}`, limit: 1});
    return customers.length > 0 ? customers[0].id : null;
}
