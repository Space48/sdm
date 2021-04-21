import {transformJson, map, compose, group} from "@space48/json-pipe";
import sampleMagentoCustomer from "../magento-samples/customers.json";
import sampleMagentoCustomerAddress from "../magento-samples/customer-addresses.json";

type Customer = typeof sampleMagentoCustomer;
type CustomerAddress = typeof sampleMagentoCustomerAddress;
type Input = Customer|CustomerAddress;

transformJson(
    compose(
        group((item: Input) => item.entity_id),
        map(items => {
            const customer = items?.find(item => !("address" in item)) as Customer | null;
            const customerAddress = items?.find(item => "address" in item) as CustomerAddress | null;

            return {
                email: customer?.email,
                first_name: customer?.firstname,
                last_name: customer?.lastname,
                addresses: customerAddress?.address?.map(
                    address => ({
                        first_name: address.firstname,
                        last_name: address.lastname,
                        phone: address.telephone,
                        company: address.company,
                        address1: address.street.split('\n')[0],
                        address2: address.street.split('\n')[1] ?? undefined,
                        city: address.city,
                        state_or_province: address.region ?? address.city,
                        postal_code: address.postcode,
                        country_code: address.country_id,
                    }),
                ),
                authentication: {
                    force_password_reset: true,
                }
            };
        }),
    )
);