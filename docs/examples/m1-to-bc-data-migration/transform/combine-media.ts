import { transformJson, group, compose, map } from "@space48/json-pipe";
import sampleMedia from '../magento-samples/product-media.json';
import sampleMagentoProduct from '../magento-samples/products-with-categories.json';

type MagentoProductMedia = typeof sampleMedia;
type MagentoProduct = typeof sampleMagentoProduct;
type Input = MagentoProductMedia|MagentoProduct;

transformJson(
    compose(
        group((item: Input) => item.product_id),
        map(items => {
            const product = items.find(item => ("sku" in item)) as MagentoProduct;
            const images = items.find(item => ("media" in item)) as MagentoProductMedia;
            return {
                ...product,
                media: images?.media
            }
        })
    )
);