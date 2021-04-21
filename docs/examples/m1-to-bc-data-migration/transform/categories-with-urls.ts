import {transformJson, map} from '@space48/json-pipe';
import sampleMagentoCategory from "../magento-samples/category.json";
// import importedCategories from "../combined/categories-imported.json";

require('dotenv').config();

transformJson(
    map((category: typeof sampleMagentoCategory) => {

        let generated_path = '';
        if (category.url_path) {
            generated_path = ( '/' + category.url_path);
        } else {
            //url path has not been manually defined, calculate path from key
            // const parent_url = categoryMap.get(Number(category.parent_id))?.url;
            // generated_path = parent_url + category.url_key + '/';
        }

        return {
            url: generated_path,
            category: category
        }
    }),
);

// const categoryMap = new Map<number, any>(importedCategories.map(category => [category.m2_id, category]))