import { bigCommerce } from "../../src/connectors/big-commerce";

describe('bigCommerce', () => {
    it('lists products', () => {
        const command = bigCommerce.products.list();
        expect(command).toEqual({ path: ["products"], endpoint: "list", input: undefined })
    })

    it('creates products', () => {
        const product = { name: "foo", sku: "BCD", price: 3, weight: 30, type: 'digital' };
        const command = bigCommerce.products.create({ name: "foo", sku: "BCD", price: 3, weight: 30, type: 'digital' })
        expect(command).toEqual({ endpoint: "create", path: ["products"], input: product })
    })

    it('fetches a product', () => {
        const command = bigCommerce.products.$doc(12).get();
        expect(command).toEqual({ endpoint: "get", path: [["products", 12]], input: undefined })
    })

    it('creates orders', () => {
        const order = { 
            id: 12, 
            products: [{ name: "Foo", price_inc_tax: 12, price_ex_tax: 14, sku: 'A' }],
            billing_address: {
                first_name: 'Joe', 
                last_name: 'Bloggs', 
                address1: 'Address1',
                city: 'City',
                postcode: 'M1 XXX',
                country: 'GB'
            }
        }
        const command = bigCommerce.orders.create(order)
        expect(command).toEqual({endpoint: "create", path: ["orders"], input: order})
    });

    it('creates customers', () => {
        const customer = {
            first_name: 'Joe',
            last_name: 'Bloggs',
            email: 'joe@bloggs.com'
        }
        const command = bigCommerce.customers.create(customer);
        expect(command).toEqual({endpoint: "create", path: ["customers"], input: customer})
    })
})