import {transformJson, map, compose, filter,} from '@space48/json-pipe';
import sampleMagentoCategory from "../magento-samples/category.json";
// import attributes from '../magento-extract/attributes.json';
import importedCategories from "../combined/categories-imported.json";

require('dotenv').config();

transformJson(
    map((category: typeof sampleMagentoCategory) => {

    }),
);

const categoryMap = new Map<number, any>(importedCategories.map(category => [category.m2_id, category]))