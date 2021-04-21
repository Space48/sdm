import { transformJson, group, compose, map } from "@space48/json-pipe";
import sampleBigCommerceProduct from "../big-commerce-samples/product.json";
import sampleMagentoConfigurableProduct from "../magento-samples/product-configurable.json";
import sampleMagentoSimpleProduct from "../magento-samples/product-simple.json";

type BigCommerceProduct = typeof sampleBigCommerceProduct;
type MagentoProduct = typeof sampleMagentoConfigurableProduct | typeof sampleMagentoSimpleProduct;
type Input = BigCommerceProduct|MagentoProduct;

transformJson(
    compose(
        group((item: Input) => item.sku),
        map(items => ({
            bigCommerceProduct: items.find(item => !('children' in item)) ?? null,
            magentoProduct: items.find(item => 'children' in item) ?? null,
        } as CombinedProductData))
    )
);

export type CombinedProductData = {
    bigCommerceProduct: BigCommerceProduct|null,
    magentoProduct: MagentoProduct|null,
};
