import { transformJson, group, compose, map } from "@space48/json-pipe";
import sampleBigCommerceCategory from "../big-commerce-samples/category-with-url.json";
import sampleMagentoCategory from "../magento-samples/category-with-url.json";

type BigCommerceCategory = typeof sampleBigCommerceCategory;
type MagentoCategory = typeof sampleMagentoCategory;
type Input = BigCommerceCategory|MagentoCategory;

transformJson(
    compose(
        group((item: Input) => item.url),
        map(items => ({
            bigCommerceCategory: items.find(item => 'is_visible' in item.category) ?? null,
            magentoCategory: items.find(item => !('is_visible' in item.category)) ?? null,
        } as CombinedCategoryData))
    )
);

export type CombinedCategoryData = {
    bigCommerceCategory: BigCommerceCategory|null,
    magentoCategory: MagentoCategory|null,
};
