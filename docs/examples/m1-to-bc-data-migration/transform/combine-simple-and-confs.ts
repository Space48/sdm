import { groupBySimilar } from '../tools/groupBySimilar';
import {transformJson, map, compose, filter} from '@space48/json-pipe';
import sampleMagentoProduct from "../magento-samples/products-full-data.json";

type Input = typeof sampleMagentoProduct;

transformJson(
    compose(
        filter((item: Input) => item.status == '1'),
        groupBySimilar((item: Input) => item.sku),
        map((items: Input[]) => ({
            sku: items.find(item => item.type == "configurable")?.sku ?? items.find(item => item.type == "simple")?.sku,
            parent: items.find(item => item.type == "configurable"),
            children: items.filter(item => item.type == "simple"),
        } as CombinedParentChildProduct))
    )
);

export type CombinedParentChildProduct = {
    sku: string,
    parent: typeof sampleMagentoProduct,
    children: typeof sampleMagentoProduct[]|null,
}