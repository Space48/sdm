import * as action from "../action";
import Magento2, { SearchIdField } from "./client";
import { getAllCategories, Category } from "./category";
import { flatten, distinct } from "../util";
import { getAllProductAttributes, ProductAttribute } from "./product-attribute";

const idField: SearchIdField = {query: 'entity_id', response: 'id'};

export const actions = {
    list: (magento: Magento2) => action.source(magento.search('products', {idField})),

    'list-configurables': (magento: Magento2) => action.source(magento.search('products', {
        idField,
        filters: [['type_id', 'eq', 'configurable']],
    })),

    'resolve-relations': async (magento: Magento2) => {
        const getRelationResolver = await getRelationResolverFactory(magento);
        let buffer: Array<{product: Product, productRelations: number[]}> = [];
        let includedProductIds: number[] = [];
        await action.transform<Product, any>(async function* (products) {
            for await (const product of products) {
                const childProductIds = product.extension_attributes.configurable_product_links || [];
                buffer.push({product, productRelations: childProductIds});
                includedProductIds.push(...childProductIds);
                if (buffer.length === 100 || includedProductIds.length >= 100) {
                    const resolveRelations = await getRelationResolver(includedProductIds);
                    yield* buffer.map(resolveRelations);
                    buffer = [];
                    includedProductIds = [];
                }
            }
            const _resolveIncludes = await getRelationResolver(includedProductIds);
            yield* buffer.map(_resolveIncludes);
        });
    },
};

const getRelationResolverFactory = async (magento: Magento2) => {
    const categories = new Map((await getAllCategories(magento)).map(cat => [cat.id, cat]));
    const attributes = await getAllProductAttributes(magento);
    const attributesByCode = new Map(attributes.map(att => [att.attribute_code, att]));
    const attributesById = new Map(attributes.map(att => [att.attribute_id, att]));
    return async (productIds: number[]) => {
        const products = await fetchProducts(magento, productIds);
        return ({product, productRelations: productRelationIds}: {product: Product, productRelations: number[]}): ProductWithRelations => {
            const productRelations = productRelationIds.map(id => products.get(id)!).filter(Boolean);
            const categoryRelations = flatMapDistinct(
                [product, ...productRelations],
                ({extension_attributes}) => extension_attributes.category_links
                    ?.map(({category_id}) => categories.get(+category_id))
            );
            const customAttributes = flatMapDistinct(
                [product, ...productRelations],
                ({custom_attributes}) => custom_attributes
                    .map(({attribute_code}) => attributesByCode.get(attribute_code)!),
            );
            const configurableAttributes = flatMapDistinct(
                [product, ...productRelations],
                ({extension_attributes}) => extension_attributes.configurable_product_options
                    ?.map(option => attributesById.get(+option.attribute_id)),
            );
            return {product, relations: {
                products: productRelations,
                categories: categoryRelations,
                attributes: customAttributes.concat(configurableAttributes).filter(distinct),
            }};
        }
    };
};

function flatMapDistinct<T, R>(items: T[], mapper: (item: T) => (R|undefined)[]|undefined): R[] {
    return items
        .map(item => mapper(item) || [])
        .filter(Boolean)
        .reduce(flatten, [])
        .filter(distinct) as R[];
}

export type ProductWithRelations = {
    product: Product,
    relations: {
        products: Product[],
        categories: Category[],
        attributes: ProductAttribute[],
    },
};

async function fetchProducts(magento: Magento2, ids: number[]): Promise<Map<number, Product>> {
    if (ids.length === 0) {
        return new Map;
    }
    const products = await action.collect(magento.search<Product>('products', {idField, filters: [['entity_id', 'in', ids.join(',')]]}));
    return new Map(products.map(product => [product.id, product]));
}

export type Product = {
    id: number,
    sku: string,
    name: string,
    attribute_set_id: number,
    price: number,
    status: number,
    visibility: number,
    type_id: string,
    created_at: string,
    updated_at: string,
    weight: number,
    extension_attributes: Partial<{
        website_ids: Array<number>,
        category_links: Array<{
            position: number,
            category_id: string,
            extension_attributes: Record<string, any>
        }>,
        bundle_product_options: Array<{
            option_id: number,
            title: string,
            required: boolean,
            type: string,
            position: number,
            sku: string,
            product_links: Array<{
                id: string,
                sku: string,
                option_id: number,
                qty: number,
                position: number,
                is_default: boolean,
                price: number,
                price_type: number,
                can_change_quantity: number,
                extension_attributes: Record<string, any>
            }>,
            extension_attributes: Record<string, any>
        }>,
        stock_item: {
            item_id: number,
            product_id: number,
            stock_id: number,
            qty: number,
            is_in_stock: boolean,
            is_qty_decimal: boolean,
            show_default_notification_message: boolean,
            use_config_min_qty: boolean,
            min_qty: number,
            use_config_min_sale_qty: number,
            min_sale_qty: number,
            use_config_max_sale_qty: boolean,
            max_sale_qty: number,
            use_config_backorders: boolean,
            backorders: number,
            use_config_notify_stock_qty: boolean,
            notify_stock_qty: number,
            use_config_qty_increments: boolean,
            qty_increments: number,
            use_config_enable_qty_inc: boolean,
            enable_qty_increments: boolean,
            use_config_manage_stock: boolean,
            manage_stock: boolean,
            low_stock_date: string,
            is_decimal_divided: boolean,
            stock_status_changed_auto: number,
            extension_attributes: Record<string, any>
        },
        configurable_product_options: Array<{
            id: number,
            attribute_id: string,
            label: string,
            position: number,
            is_use_default: boolean,
            values: Array<{
                value_index: number,
                extension_attributes: Record<string, any>
            }>,
            extension_attributes: Record<string, any>,
            product_id: number
        }>,
        configurable_product_links: Array<number>,
        downloadable_product_links: Array<{
            id: number,
            title: string,
            sort_order: number,
            is_shareable: number,
            price: number,
            number_of_downloads: number,
            link_type: string,
            link_file: string,
            link_file_content: {
                file_data: string,
                name: string,
                extension_attributes: Record<string, any>
            },
            link_url: string,
            sample_type: string,
            sample_file: string,
            sample_file_content: {
                file_data: string,
                name: string,
                extension_attributes: Record<string, any>
            },
            sample_url: string,
            extension_attributes: Record<string, any>
        }>,
        downloadable_product_samples: Array<{
            id: number,
            title: string,
            sort_order: number,
            sample_type: string,
            sample_file: string,
            sample_file_content: {
                file_data: string,
                name: string,
                extension_attributes: Record<string, any>
            },
            sample_url: string,
            extension_attributes: Record<string, any>
        }>,
        giftcard_amounts: Array<{
            attribute_id: number,
            website_id: number,
            value: number,
            website_value: number,
            extension_attributes: Record<string, any>
        }>
    }>,
    product_links: Array<{
        sku: string,
        link_type: string,
        linked_product_sku: string,
        linked_product_type: string,
        position: number,
        extension_attributes: {
            qty: number
        }
    }>,
    options: Array<{
        product_sku: string,
        option_id: number,
        title: string,
        type: string,
        sort_order: number,
        is_require: boolean,
        price: number,
        price_type: string,
        sku: string,
        file_extension: string,
        max_characters: number,
        image_size_x: number,
        image_size_y: number,
        values: Array<{
            title: string,
            sort_order: number,
            price: number,
            price_type: string,
            sku: string,
            option_type_id: number
        }>,
        extension_attributes: {
            vertex_flex_field: string
        }
    }>,
    media_gallery_entries: Array<{
        id: number,
        media_type: string,
        label: string,
        position: number,
        disabled: boolean,
        types: Array<string>,
        file: string,
        content: {
            base64_encoded_data: string,
            type: string,
            name: string
        },
        extension_attributes: {
            video_content: {
                media_type: string,
                video_provider: string,
                video_url: string,
                video_title: string,
                video_description: string,
                video_metadata: string
            }
        }
    }>,
    tier_prices: Array<{
        customer_group_id: number,
        qty: number,
        value: number,
        extension_attributes: {
            percentage_value: number,
            website_id: number
        }
    }>,
    custom_attributes: Array<{
        attribute_code: string,
        value: string
    }>
};
