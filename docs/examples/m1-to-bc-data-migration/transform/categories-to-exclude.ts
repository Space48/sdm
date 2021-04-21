import {transformJson, map, compose, filter} from "@space48/json-pipe";
import sampleMagentoCategory from "../magento-samples/category.json";

require('dotenv').config();

transformJson(
    compose(
        filter((item: Input) => item.name === "Brands"),
        map((item: Input) => ({
            categories_to_exclude: item.all_children.split(",")
        }))
    )
);

type MagentoCategory = typeof sampleMagentoCategory;
type Input = MagentoCategory;
