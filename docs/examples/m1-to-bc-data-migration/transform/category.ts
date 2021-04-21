import {transformJson, map, compose, filter,} from '@space48/json-pipe';
import sampleMagentoCategory from "../magento-samples/category.json";
import importedCategories from "../combined/categories-imported.json";
import categoriesToExclude from '../magento-extract/categories-to-exclude.json';

require('dotenv').config();

transformJson(
    compose(
        filter((category: typeof sampleMagentoCategory) => !categoriesToExclude.categories_to_exclude.find(
            categoryID => categoryID === category.category_id)
        ),
        map((category: typeof sampleMagentoCategory) => {
        const imageFilePath = 'https://' + process.env.M1_BASE_URL + '/media/catalog/category/';

        const bigCommerce_parentID = categoryMap.get(Number(category.parent_id))?.bc_id ?? undefined;
        const parent_id = (category.parent_id === process.env.M1_STARTER_CATEGORY) ? 0 : bigCommerce_parentID;

        // check if parent has already been imported
        if (parent_id !== undefined) {

            return {
                name: category.name,
                parent_id: parent_id,
                is_visible: Boolean(category.is_active),
                sort_order: category.position,
                custom_url: {
                    url: (category.url_path.charAt(0) === '/') ? category.url_path : '/' + category.url_path,
                    is_customized: true
                },
                description: category.meta_description,
                search_keywords:category.meta_title,
                meta_title: category.meta_title,
                meta_keywords: category.meta_keywords?.split(', ') ?? undefined,
                meta_description: category.meta_description,
            }
        } else {
            return {}
        }
    }),
    )
);

const categoryMap = new Map<number, any>(importedCategories.map(category => [category.m2_id, category]))