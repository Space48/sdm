import {transformJson, map, compose, filter} from '@space48/json-pipe';
import { getAttribute, getAttributeValue } from "../tools/getAttributes";
import { CombinedParentChildProduct } from "./combine-simple-and-confs";
import categoriesToExclude from '../magento-extract/categories-to-exclude.json';
import sampleFullProduct from '../magento-samples/products-full-data.json';
import combinedCategoriesCategories from '../combined/categories-imported.json';

require('dotenv').config();

transformJson(
    compose(
        filter(({parent}: Input) => {
            return (parent.status == '1') ? (parent.visibility == '4' || parent.visibility == '2') : false;
        }),
        map(({parent, children}: Input) => {
            const categories_to_exclude = categoriesToExclude.categories_to_exclude;

            // Get categories of all children as not same as parent
            const childCategories = children?.map(child => child.category_ids) ?? [];
            const flatChildCategories = childCategories?.reduce((previousValue, currentVal) => previousValue.concat(currentVal), ['']);
            const parentCategories = parent.category_ids;
            // Concat children categories onto parent category list
            parentCategories?.push(...flatChildCategories);
            // Remove duplicates & nulls
            const filteredCategories = parentCategories?.filter((categoryId, index, self) => categoryId && self.indexOf(categoryId) === index).filter(Boolean);

            // Remove brands
            const magentoCategoryIDs = filteredCategories?.filter(category_id => !categories_to_exclude.includes(category_id));
            // Get Big Commerce category ID
            const bigCommerceCategory = magentoCategoryIDs?.map(id => BigCommerceCategoryMap.get(Number(id))?.bc_id).filter(Boolean);

            const visibility = (parent.status == '1') ? (parent.visibility == '4' || parent.visibility == '2') : false;

            const product_images = parent.media?.filter(entry => entry.exclude == "0").map(entry => ({
                description: entry.label ?? '',
                sort_order: Number(entry.position),
                image_url: entry.file ? ('https://' + process.env.M1_BASE_URL + '/media/catalog/product' +  entry.file) : entry.url,
                is_thumbnail: entry?.types?.includes('thumbnail'),
            }));

            // confirm tax ids
            let tax_class;
            switch (parent.tax_class_id) {
                case "0":
                    tax_class = 0;
                    break;
                case "2":
                    tax_class = 0;
                    break;
                case "5":
                    tax_class = 1;
                    break;
                case "6":
                    tax_class = 4;
                    break;
                default:
                    tax_class = 0;
            }

            return {
                sku: parent.sku,
                name: parent.name,
                categories: bigCommerceCategory,
                type: "physical",
                price: Number(parent.price),
                weight: Number(parent?.weight) ?? 0,
                is_visible: visibility,
                // Check if this attribute code should be 'brand', 'manufacturer', 'vendor' or similar
                brand_name: getAttribute(parent, 'manufacturer'),
                tax_class_id: tax_class,
                description: parent.description,
                meta_description: parent.meta_description,
                page_title: parent.meta_title,
                meta_keywords: parent.meta_keyword?.split(", "),
                upc: parent.barcode,
                cost_price: Number(parent.cost ?? 0),
                sale_price: Number(parent.special_price) ?? undefined,
                // // inventory_level:
                // inventory_warning_level: 100, //confirm if they also want this
                inventory_tracking: 'variant',

                custom_url: {
                    is_customized: true,
                    url: '/' + parent.url_path,
                },
                images: product_images,
                primary_image: product_images?.filter(image => image.sort_order == 1),
                custom_fields: getAllCustomFields(parent),
                variants: children?.map((child) => {
                    return {
                        sku: child.sku,
                        price: child.price,
                        weight: child.weight,
                        cost_price: getAttributeValue(child,'cost'),
                        upc: getAttributeValue(child,'barcode'),
                        option_values: [{
                            label: getAttribute(child, 'size'),
                            option_display_name: 'size'
                        }]
                    }
                })
            };
        })
    )
);

type Input = CombinedParentChildProduct;
type MagentoProduct = typeof sampleFullProduct;

const BigCommerceCategoryMap = new Map<number, any>(combinedCategoriesCategories.map(category => [category.m2_id, category]));

function getVariantOptionValue(product: MagentoProduct) {
    // demo variant options if attribute sets
    let sizeLabel;
    switch (product.attribute_set_id) {
        case "11":
            sizeLabel = 'shoe_size'
            break;
        case "13":
            sizeLabel = 'accessory_size';
            break;
        default:
            sizeLabel = 'size';
    }

    return  [{
        label: getAttribute(product, sizeLabel),
        option_display_name: sizeLabel
    }]
}

function getAllCustomFields(product: MagentoProduct) {
    const coreCustomFields = getCommonAttributes(product);
    const uniqueCustomFields = getCustomAttributes(product);
    return coreCustomFields.concat(uniqueCustomFields).filter(Boolean);
}

function getCommonAttributes(product: MagentoProduct) {
    // demo common attributes
    return [
        { name: 'gender', value: getAttribute(product, 'gender') ?? ' ' },
        { name: 'age_group', value: getAttribute(product, 'age_group') ?? ' ' },
        { name: 'best_seller', value: getAttribute(product, 'best_seller') ?? ' ' },
        { name: 'related_title', value: getAttribute(product, 'related_title') ?? ' ' },
        { name: 'filter_colour', value: getAttribute(product, 'filter_colour') ?? ' ' },
        { name: 'commodity_code', value: getAttribute(product, 'commodity_code') ?? ' ' },
        { name: 'primary_colour', value: getAttribute(product, 'primary_colour') ?? ' ' },
        { name: 'secondary_colour', value: getAttribute(product, 'secondary_colour') ?? ' ' },
        { name: 'product_list_name', value: getAttribute(product, 'product_list_name') ?? ' ' },
        { name: 'short_description', value: getAttribute(product, 'short_description') ?? ' ' },
        { name: 'country_of_manufacture', value: getAttribute(product, 'country_of_manufacture') ?? ' ' },
    ]
}

function getCustomAttributes(product: MagentoProduct) {
    // demo attributes if using attribute sets
    let attributeLabels: string[]
    switch (getAttribute(product, 'attribute_set_id')) {
        case '1':
            attributeLabels = ['clothing_set', 'shipment_type', 'size_chart'];
            break;
        case '2':
            attributeLabels = ['accessory_colour', 'accessory_pattern_shirt', 'accessory_type_shirt', 'available_sizes', 'choice_of_tie', 'clothing_set', 'collection_name', 'cravat_hanky_colour', 'exclusive', 'fit', 'jacket_back', 'jacket_buttons', 'jacket_lining', 'jacket_pattern', 'jacket_pockets', 'jacket_style', 'material', 'occasion', 'shipment_type', 'shirt_colour', 'shirt_material', 'size_chart', 'size_filter', 'tie_colour', 'timed_offer_active', 'timed_offer_end', 'trouser_waist', 'trousers_style', 'var_accessory_colour', 'waistcoat_back', 'waistcoat_buttons', 'waistcoat_colour', 'waistcoat_detail', 'waistcoat_pockets', 'washing_instructions'];
            break;
        case '3':
            attributeLabels = ['material_composition', 'shipment_type', 'shirt_colour', 'shirt_material', 'size', 'size_filter', 'sleeve_length'];
            break;
        case '4':
            attributeLabels = ['accessory_colour', 'fascinator_fastening', 'hat_accessory', 'hat_material', 'hat_style', 'occasion', 'shipment_type', 'size'];
            break;
        default:
            attributeLabels = ['clothing_set', 'shipment_type', 'size_chart'];
            break;
    }

    return attributeLabels.map(label => ({
        name: label,
        value: getAttribute(product, label) ?? ' '
    }))
}
