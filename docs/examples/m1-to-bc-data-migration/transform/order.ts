import { transformJson, map } from "@space48/json-pipe";
import sampleMagentoOrder from '../magento-samples/order.json';

type MagentoOrder = typeof sampleMagentoOrder;
type SalesAddress = MagentoOrder['addresses'][0];
type OrderComments = MagentoOrder['order_comments'];
type OrderItems = MagentoOrder['order_items'];

transformJson(
    map((order: MagentoOrder) => {
        const shipping_address = order.addresses.find(address => address.address_type == "shipping");
        let billing_address = order.addresses.find(address => address.address_type == "billing");
        // if billing address not set then use shipping address as billing address
        billing_address = billing_address?.postcode ? billing_address : shipping_address;

        // confirm tax ids
        let status;
        switch (order.status) {
            case "complete":
                status = 10;
                break;
            case "holded":
                status = 0;
                break;
            case "pending_paypal":
                status = 4;
                break;
            case "cancelled":
                status = 5;
                break;
            case "closed":
                status = (order.total_refunded) ? 4 : 0
                break;
            default:
                status = 0;
        }

        return {
            status_id: status,
            billing_address: mapAddress(billing_address),
            shipping_addresses: [mapAddress(shipping_address)],
            ip_address: order.remote_ip,
            date_created: new Date(order.created_at).toUTCString(),
            external_id: order.increment_id,
            external_source: 'Magento1',
            default_currency_code: order.store_currency_code,
            shipping_cost_inc_tax: order.shipping_incl_tax,
            base_shipping_cost: order.base_shipping_amount,
            discount_amount: order.discount_amount,
            subtotal_ex_tax: order.subtotal,
            subtotal_inc_tax: order.subtotal_incl_tax,
            total_ex_tax: order.grand_total,
            refunded_amount: Number(order.total_refunded) ?? undefined,
            total_inc_tax: order.grand_total,
            products: mapProducts(order.order_items),
            payment_method: 'Manual',
        }
    }),
);

function mapProducts(products: OrderItems) {
    const variantProductNameMap = new Map(products
        .filter(product => product.parent_item_id !== null)
        .map(product => [product.sku, product.name]))

    return products && products.filter(product => (product.parent_item_id === null)).map(product => ({
        sku: product.sku,
        name: variantProductNameMap.get(product.sku),
        quantity: Number(product.qty_ordered),
        price_inc_tax: Number(product.price_incl_tax),
        price_ex_tax: Number(product.price),
    }));
}


function mapAddress(address?: SalesAddress) {
    return address && {
        first_name: address.firstname,
        last_name: address.lastname,
        email: address.email,
        phone: address.telephone,
        company: address.company ?? undefined,
        street_1: address.street?.split('\n')[0],
        street_2: address.street?.split('\n')[1] ?? undefined,
        city: address.city,
        state: address.region ?? address.city,
        zip: address.postcode,
        country_iso2: address.country_id,
    };
}
