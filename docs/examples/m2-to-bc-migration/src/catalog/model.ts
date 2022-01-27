import { pipe, map, writeJsonLinesTo } from "@space48/json-pipe"
import { magento2, bigCommerce } from "@space48/sdm"


const main = async () => {
    const m2store = magento2({
        baseUrl: '{BASE URL}',
        credentials: {
            username: '{USERNAME}',
            password: '{PASSWORD}'
        }
    })

    const bcStore = bigCommerce({
        storeAlias: '{ALIAS}', //any memorable name: e.g. client-store-staging
        storeHash: '{storeHash}',
        credentials: {
            clientId: '{CLIENTID}',
            accessToken: '{ACCESS TOKEN}'
        }
    })

    await pipe(
        magento2.products.list<Magento2Product>(), 
        (command) => m2store.execute(command), 
        mapMagento2ToBigCommerceProduct(),
        map((product) => bigCommerce.products.create(product)),
        (command) => bcStore.execute(command),
        writeJsonLinesTo(process.stdout)
    )
}

function mapMagento2ToBigCommerceProduct() {
    return map((product: Magento2Product): BigCommerceProduct => ({
        sku: product.sku, 
        name: product.name,
        type: 'physical',
        weight: product.weight, 
        price: product.price,
        custom_fields: product.custom_attributes
            .map(attribute => ({
                name: attribute.attribute_code, 
                value: typeof attribute.value === 'object' 
                    ? attribute.value.join(',') 
                    : attribute.value
            }))
    }))
}

type BigCommerceProduct = {
    sku: string, 
    name: string, 
    type: string, 
    weight: number,
    price: number
    custom_fields: {name: string, value: string}[]
}
type Magento2Product = {
    id: number,
    sku: string, 
    price: number, 
    weight: number, 
    name: string, 
    custom_attributes: {attribute_code: string, value: string | string[]}[]
}

main();
