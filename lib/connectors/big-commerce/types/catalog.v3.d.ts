export interface paths {
    "/catalog/products": {
        get: operations["getProducts"];
        put: operations["updateProducts"];
        post: operations["createProduct"];
        delete: operations["deleteProducts"];
    };
    "/catalog/products/{product_id}": {
        get: operations["getProductById"];
        put: operations["updateProduct"];
        delete: operations["deleteProductById"];
        parameters: {
            path: {
                product_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/images": {
        get: operations["getProductImages"];
        post: operations["createProductImage"];
        parameters: {
            path: {
                product_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/images/{image_id}": {
        get: operations["getProductImageById"];
        put: operations["updateProductImage"];
        delete: operations["deleteProductImage"];
        parameters: {
            path: {
                product_id: unknown;
                image_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/videos": {
        get: operations["getProductVideos"];
        post: operations["createProductVideo"];
        parameters: {
            path: {
                product_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/videos/{id}": {
        get: operations["getProductVideoById"];
        put: operations["updateProductVideo"];
        delete: operations["deleteProductVideo"];
        parameters: {
            path: {
                product_id: unknown;
                id: parameters["VideoIdParam"];
            };
        };
    };
    "/catalog/products/{product_id}/variants": {
        get: operations["getVariantsByProductId"];
        post: operations["createVariant"];
        parameters: {
            path: {
                product_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/variants/{variant_id}": {
        get: operations["getVariantById"];
        put: operations["updateVariant"];
        delete: operations["deleteVariantById"];
        parameters: {
            path: {
                product_id: unknown;
                variant_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/variants/{variant_id}/metafields": {
        get: operations["getVariantMetafieldsByProductIdAndVariantId"];
        post: operations["createVariantMetafield"];
        parameters: {
            path: {
                product_id: unknown;
                variant_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/variants/{variant_id}/metafields/{metafield_id}": {
        get: operations["getVariantMetafieldByProductIdAndVariantId"];
        put: operations["updateVariantMetafield"];
        delete: operations["deleteVariantMetafieldById"];
        parameters: {
            path: {
                metafield_id: unknown;
                product_id: unknown;
                variant_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/variants/{variant_id}/image": {
        post: operations["createVariantImage"];
    };
    "/catalog/products/{product_id}/options": {
        get: operations["getOptions"];
        post: operations["createOption"];
        parameters: {
            path: {
                product_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/options/{option_id}": {
        get: operations["getOptionById"];
        put: operations["updateOption"];
        delete: operations["deleteOptionById"];
        parameters: {
            path: {
                product_id: unknown;
                option_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/options/{option_id}/values": {
        get: operations["getOptionValues"];
        post: operations["createOptionValue"];
        parameters: {
            path: {
                product_id: unknown;
                option_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/options/{option_id}/values/{value_id}": {
        get: operations["getOptionValueById"];
        put: operations["updateOptionValue"];
        delete: operations["deleteOptionValueById"];
        parameters: {
            path: {
                product_id: unknown;
                option_id: unknown;
                value_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/modifiers": {
        get: operations["getModifiers"];
        post: operations["createModifier"];
        parameters: {
            path: {
                product_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/modifiers/{modifier_id}": {
        get: operations["getModifierById"];
        put: operations["updateModifier"];
        delete: operations["deleteModifierById"];
        parameters: {
            path: {
                product_id: unknown;
                modifier_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/modifiers/{modifier_id}/values": {
        get: operations["getModifierValues"];
        post: operations["createModifierValue"];
        parameters: {
            path: {
                product_id: unknown;
                modifier_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/modifiers/{modifier_id}/values/{value_id}": {
        get: operations["getModifierValueById"];
        put: operations["updateModifierValue"];
        delete: operations["deleteModifierValueById"];
        parameters: {
            path: {
                product_id: unknown;
                modifier_id: unknown;
                value_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/modifiers/{modifier_id}/values/{value_id}/image": {
        post: operations["createModifierImage"];
        delete: operations["deleteModifierImage"];
        parameters: {
            path: {
                product_id: unknown;
                modifier_id: unknown;
                value_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/complex-rules": {
        get: operations["getComplexRules"];
        post: operations["createComplexRule"];
        parameters: {
            path: {
                product_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/complex-rules/{complex_rule_id}": {
        get: operations["getComplexRuleById"];
        put: operations["updateComplexRule"];
        delete: operations["deleteComplexRuleById"];
        parameters: {
            path: {
                product_id: unknown;
                complex_rule_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/custom-fields": {
        get: operations["getCustomFields"];
        post: operations["createCustomField"];
        parameters: {
            path: {
                product_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/custom-fields/{custom_field_id}": {
        get: operations["getCustomFieldById"];
        put: operations["updateCustomField"];
        delete: operations["deleteCustomFieldById"];
        parameters: {
            path: {
                product_id: unknown;
                custom_field_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/bulk-pricing-rules": {
        get: operations["getBulkPricingRules"];
        post: operations["createBulkPricingRule"];
        parameters: {
            path: {
                product_id: unknown;
            };
            query: {
                page?: unknown;
                limit?: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/bulk-pricing-rules/{bulk_pricing_rule_id}": {
        get: operations["getBulkPricingRuleById"];
        put: operations["updateBulkPricingRule"];
        delete: operations["deleteBulkPricingRuleById"];
        parameters: {
            path: {
                product_id: unknown;
                bulk_pricing_rule_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/metafields": {
        get: operations["getProductMetafieldsByProductId"];
        post: operations["createProductMetafield"];
        parameters: {
            path: {
                product_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/metafields/{metafield_id}": {
        get: operations["getProductMetafieldByProductId"];
        put: operations["updateProductMetafield"];
        delete: operations["deleteProductMetafieldById"];
        parameters: {
            path: {
                metafield_id: unknown;
                product_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/reviews": {
        get: operations["getProductReviews"];
        post: operations["createProductReview"];
        parameters: {
            path: {
                product_id: unknown;
            };
        };
    };
    "/catalog/products/{product_id}/reviews/{review_id}": {
        get: operations["getProductReviewById"];
        put: operations["updateProductReview"];
        delete: operations["deleteProductReview"];
        parameters: {
            path: {
                product_id: unknown;
                review_id: unknown;
            };
        };
    };
    "/catalog/categories": {
        get: operations["getCategories"];
        post: operations["createCategory"];
        delete: operations["deleteCategories"];
    };
    "/catalog/categories/{category_id}": {
        get: operations["getCategoryById"];
        put: operations["updateCategory"];
        delete: operations["deleteCategoryById"];
        parameters: {
            path: {
                category_id: unknown;
            };
        };
    };
    "/catalog/categories/{category_id}/metafields": {
        get: operations["getCategoryMetafieldsByCategoryId"];
        post: operations["createCategoryMetafield"];
        parameters: {
            path: {
                category_id: unknown;
            };
        };
    };
    "/catalog/categories/{category_id}/metafields/{metafield_id}": {
        get: operations["getCategoryMetafieldByCategoryId"];
        put: operations["updateCategoryMetafield"];
        delete: operations["deleteCategoryMetafieldById"];
        parameters: {
            path: {
                metafield_id: unknown;
                category_id: unknown;
            };
        };
    };
    "/catalog/categories/{category_id}/image": {
        post: operations["createCategoryImage"];
        delete: operations["deleteCategoryImage"];
        parameters: {
            path: {
                category_id: unknown;
            };
        };
    };
    "/catalog/categories/tree": {
        get: operations["getCategoryTree"];
    };
    "/catalog/brands": {
        get: operations["getBrands"];
        post: operations["createBrand"];
        delete: operations["deleteBrands"];
    };
    "/catalog/brands/{brand_id}": {
        get: operations["getBrandById"];
        put: operations["updateBrand"];
        delete: operations["deleteBrandById"];
        parameters: {
            path: {
                brand_id: unknown;
            };
        };
    };
    "/catalog/brands/{brand_id}/metafields": {
        get: operations["getBrandMetafieldsByBrandId"];
        post: operations["createBrandMetafield"];
        parameters: {
            path: {
                brand_id: unknown;
            };
        };
    };
    "/catalog/brands/{brand_id}/metafields/{metafield_id}": {
        get: operations["getBrandMetafieldByBrandId"];
        put: operations["updateBrandMetafield"];
        delete: operations["deleteBrandMetafieldById"];
        parameters: {
            path: {
                metafield_id: unknown;
                brand_id: unknown;
            };
        };
    };
    "/catalog/brands/{brand_id}/image": {
        post: operations["createBrandImage"];
        delete: operations["deleteBrandImage"];
        parameters: {
            path: {
                brand_id: unknown;
            };
        };
    };
    "/catalog/variants": {
        get: operations["getVariants"];
        put: operations["updateVariantsBatch"];
    };
    "/catalog/summary": {
        get: operations["getCatalogSummary"];
    };
}
export interface definitions {
    productModifier_Base: {
        type: "date" | "checkbox" | "file" | "text" | "multi_line_text" | "numbers_only_text" | "radio_buttons" | "rectangles" | "dropdown" | "product_list" | "product_list_with_images" | "swatch";
        required: boolean;
        sort_order?: number;
        config?: definitions["config_Full"];
        display_name?: string;
    };
    productModifier_Full: definitions["productModifier_Base"] & {
        id?: number;
        product_id?: number;
        name?: string;
        option_values?: definitions["productModifierOptionValue_Full"][];
    };
    productModifier_Post: {
        type: "date" | "checkbox" | "file" | "text" | "multi_line_text" | "numbers_only_text" | "radio_buttons" | "rectangles" | "dropdown" | "product_list" | "product_list_with_images" | "swatch";
        required: boolean;
        sort_order?: number;
        config?: {
            default_value?: string;
            checked_by_default?: boolean;
            checkbox_label?: string;
            date_limited?: boolean;
            date_limit_mode?: "earliest" | "range" | "latest";
            date_earliest_value?: string;
            date_latest_value?: string;
            file_types_mode?: "specific" | "all";
            file_types_supported?: string[];
            file_types_other?: string[];
            file_max_size?: number;
            text_characters_limited?: boolean;
            text_min_length?: number;
            text_max_length?: number;
            text_lines_limited?: boolean;
            text_max_lines?: number;
            number_limited?: boolean;
            number_limit_mode?: "lowest" | "highest" | "range";
            number_lowest_value?: number;
            number_highest_value?: number;
            number_integers_only?: boolean;
            product_list_adjusts_inventory?: boolean;
            product_list_adjusts_pricing?: boolean;
            product_list_shipping_calc?: "none" | "weight" | "package";
        };
        option_values?: (({
            is_default?: boolean;
            label: string;
            sort_order: number;
            value_data?: {
                [key: string]: any;
            };
        } & {
            adjusters?: {
                price?: {
                    adjuster?: "relative" | "percentage";
                    adjuster_value?: number;
                };
                weight?: {
                    adjuster?: "relative" | "percentage";
                    adjuster_value?: number;
                };
                image_url?: string;
                purchasing_disabled?: {
                    status?: boolean;
                    message?: string;
                };
            };
        }) & {
            id?: number;
        })[];
    } & {
        display_name: string;
    };
    productModifier_Put: {
        type: "date" | "checkbox" | "file" | "text" | "multi_line_text" | "numbers_only_text" | "radio_buttons" | "rectangles" | "dropdown" | "product_list" | "product_list_with_images" | "swatch";
        required: boolean;
        sort_order?: number;
        config?: {
            default_value?: string;
            checked_by_default?: boolean;
            checkbox_label?: string;
            date_limited?: boolean;
            date_limit_mode?: "earliest" | "range" | "latest";
            date_earliest_value?: string;
            date_latest_value?: string;
            file_types_mode?: "specific" | "all";
            file_types_supported?: string[];
            file_types_other?: string[];
            file_max_size?: number;
            text_characters_limited?: boolean;
            text_min_length?: number;
            text_max_length?: number;
            text_lines_limited?: boolean;
            text_max_lines?: number;
            number_limited?: boolean;
            number_limit_mode?: "lowest" | "highest" | "range";
            number_lowest_value?: number;
            number_highest_value?: number;
            number_integers_only?: boolean;
            product_list_adjusts_inventory?: boolean;
            product_list_adjusts_pricing?: boolean;
            product_list_shipping_calc?: "none" | "weight" | "package";
        };
        option_values?: (({
            is_default?: boolean;
            label: string;
            sort_order: number;
            value_data?: {
                [key: string]: any;
            };
        } & {
            adjusters?: {
                price?: {
                    adjuster?: "relative" | "percentage";
                    adjuster_value?: number;
                };
                weight?: {
                    adjuster?: "relative" | "percentage";
                    adjuster_value?: number;
                };
                image_url?: string;
                purchasing_disabled?: {
                    status?: boolean;
                    message?: string;
                };
            };
        }) & {
            id?: number;
        })[];
    };
    productModifierOptionValue_Base: {
        is_default?: boolean;
        label: string;
        sort_order: number;
        value_data?: {
            [key: string]: any;
        };
        adjusters?: definitions["adjusters_Full"];
    };
    productModifierOptionValue_Full: definitions["productModifierOptionValue_Base"] & {
        id?: number;
        option_id?: number;
    };
    productModifierOptionValue_Post: {
        is_default?: boolean;
        label: string;
        sort_order: number;
        value_data?: {
            [key: string]: any;
        };
    } & {
        adjusters?: {
            price?: {
                adjuster?: "relative" | "percentage";
                adjuster_value?: number;
            };
            weight?: {
                adjuster?: "relative" | "percentage";
                adjuster_value?: number;
            };
            image_url?: string;
            purchasing_disabled?: {
                status?: boolean;
                message?: string;
            };
        };
    };
    productModifierOptionValue_Put: ({
        is_default?: boolean;
        label: string;
        sort_order: number;
        value_data?: {
            [key: string]: any;
        };
    } & {
        adjusters?: {
            price?: {
                adjuster?: "relative" | "percentage";
                adjuster_value?: number;
            };
            weight?: {
                adjuster?: "relative" | "percentage";
                adjuster_value?: number;
            };
            image_url?: string;
            purchasing_disabled?: {
                status?: boolean;
                message?: string;
            };
        };
    }) & {
        id?: number;
    };
    resp_productionOption: {
        data?: definitions["productOption_Full"];
        meta?: {
            ""?: string;
        };
    };
    productOption_Base: {
        id?: number;
        product_id?: number;
        display_name?: string;
        type?: "radio_buttons" | "rectangles" | "dropdown" | "product_list" | "product_list_with_images" | "swatch";
        config?: definitions["productOptionConfig_Full"];
        sort_order?: number;
        option_values?: definitions["productOptionOptionValue_Full"];
    };
    productOption_Full: definitions["productOption_Base"] & {
        name?: string;
    };
    productOption_Post: {
        id?: number;
        product_id?: number;
        display_name?: string;
        type?: "radio_buttons" | "rectangles" | "dropdown" | "product_list" | "product_list_with_images" | "swatch";
        config?: {
            default_value?: string;
            checked_by_default?: boolean;
            checkbox_label?: string;
            date_limited?: boolean;
            date_limit_mode?: "earliest" | "range" | "latest";
            date_earliest_value?: string;
            date_latest_value?: string;
            file_types_mode?: "specific" | "all";
            file_types_supported?: string[];
            file_types_other?: string[];
            file_max_size?: number;
            text_characters_limited?: boolean;
            text_min_length?: number;
            text_max_length?: number;
            text_lines_limited?: boolean;
            text_max_lines?: number;
            number_limited?: boolean;
            number_limit_mode?: "lowest" | "highest" | "range";
            number_lowest_value?: number;
            number_highest_value?: number;
            number_integers_only?: boolean;
            product_list_adjusts_inventory?: boolean;
            product_list_adjusts_pricing?: boolean;
            product_list_shipping_calc?: "none" | "weight" | "package";
        };
        sort_order?: number;
        option_values?: ({
            is_default?: boolean;
            label: string;
            sort_order: number;
            value_data?: {
                [key: string]: any;
            };
        } & {
            id?: number;
        })[];
        image_url?: string;
    };
    productOption_Put: {
        id?: number;
        product_id?: number;
        display_name?: string;
        type?: "radio_buttons" | "rectangles" | "dropdown" | "product_list" | "product_list_with_images" | "swatch";
        config?: {
            default_value?: string;
            checked_by_default?: boolean;
            checkbox_label?: string;
            date_limited?: boolean;
            date_limit_mode?: "earliest" | "range" | "latest";
            date_earliest_value?: string;
            date_latest_value?: string;
            file_types_mode?: "specific" | "all";
            file_types_supported?: string[];
            file_types_other?: string[];
            file_max_size?: number;
            text_characters_limited?: boolean;
            text_min_length?: number;
            text_max_length?: number;
            text_lines_limited?: boolean;
            text_max_lines?: number;
            number_limited?: boolean;
            number_limit_mode?: "lowest" | "highest" | "range";
            number_lowest_value?: number;
            number_highest_value?: number;
            number_integers_only?: boolean;
            product_list_adjusts_inventory?: boolean;
            product_list_adjusts_pricing?: boolean;
            product_list_shipping_calc?: "none" | "weight" | "package";
        };
        sort_order?: number;
        option_values?: ({
            is_default?: boolean;
            label: string;
            sort_order: number;
            value_data?: {
                [key: string]: any;
            };
        } & {
            id?: number;
        })[];
        image_url?: string;
    };
    categoriesTree_Resp: {
        data?: definitions["categoriesTreeNode_Full"][];
        meta?: definitions["metaEmpty_Full"];
    };
    categoriesTreeNode_Full: {
        id?: number;
        parent_id?: number;
        name?: string;
        is_visible?: boolean;
        url?: string;
        children?: definitions["categoriesTreeNode_Full"][];
    };
    category_Full: {
        id?: number;
        parent_id: number;
        name: string;
        description?: string;
        views?: number;
        sort_order?: number;
        page_title?: string;
        search_keywords?: string;
        meta_keywords?: string[];
        meta_description?: string;
        layout_file?: string;
        is_visible?: boolean;
        default_product_sort?: "use_store_settings" | "featured" | "newest" | "best_selling" | "alpha_asc" | "alpha_desc" | "avg_customer_review" | "price_asc" | "price_desc";
        image_url?: string;
        custom_url?: definitions["customUrl_Full"];
    };
    brand_Full: {
        id?: number;
        name: string;
        page_title?: string;
        meta_keywords?: string[];
        meta_description?: string;
        search_keywords?: string;
        image_url?: string;
        custom_url?: definitions["customUrl_Full"];
    };
    productVariant_Base: {
        cost_price?: number;
        price?: number;
        sale_price?: number;
        retail_price?: number;
        weight?: number;
        width?: number;
        height?: number;
        depth?: number;
        is_free_shipping?: boolean;
        fixed_cost_shipping_price?: number;
        purchasing_disabled?: boolean;
        purchasing_disabled_message?: string;
        upc?: string;
        inventory_level?: number;
        inventory_warning_level?: number;
        bin_picking_number?: string;
    };
    productVariant_Full: definitions["productVariant_Base"] & {
        id?: number;
        product_id?: number;
        sku?: string;
        sku_id?: number;
        option_values?: definitions["productVariantOptionValue_Full"][];
        calculated_price?: number;
        ""?: string;
    };
    productVariant_Post: {
        cost_price?: number;
        price?: number;
        sale_price?: number;
        retail_price?: number;
        weight?: number;
        width?: number;
        height?: number;
        depth?: number;
        is_free_shipping?: boolean;
        fixed_cost_shipping_price?: number;
        purchasing_disabled?: boolean;
        purchasing_disabled_message?: string;
        upc?: string;
        inventory_level?: number;
        inventory_warning_level?: number;
        bin_picking_number?: string;
    } & {
        product_id?: number;
        sku?: string;
        option_values?: definitions["productVariantOptionValue_Full"][];
    };
    variantCollection_Put: definitions["productVariant_Full"][];
    variant_Put: {
        cost_price?: number;
        price?: number;
        sale_price?: number;
        retail_price?: number;
        weight?: number;
        width?: number;
        height?: number;
        depth?: number;
        is_free_shipping?: boolean;
        fixed_cost_shipping_price?: number;
        purchasing_disabled?: boolean;
        purchasing_disabled_message?: string;
        upc?: string;
        inventory_level?: number;
        inventory_warning_level?: number;
        bin_picking_number?: string;
    } & {
        id?: number;
    };
    productVariant_Post_Product: definitions["productVariant_Base"] & {
        sku?: string;
        option_values?: {
            option_display_name?: string;
            label?: string;
        }[];
    };
    productVariant_Put_Product: {
        cost_price?: number;
        price?: number;
        sale_price?: number;
        retail_price?: number;
        weight?: number;
        width?: number;
        height?: number;
        depth?: number;
        is_free_shipping?: boolean;
        fixed_cost_shipping_price?: number;
        purchasing_disabled?: boolean;
        purchasing_disabled_message?: string;
        upc?: string;
        inventory_level?: number;
        inventory_warning_level?: number;
        bin_picking_number?: string;
        product_id?: number;
        sku?: string;
    };
    productVariantOptionValue_Full: {
        option_display_name?: string;
        label?: string;
    } & definitions["productVariantOptionValue_Base"];
    productOptionValue_Post_Product: {
        option_display_name?: string;
        label?: string;
    };
    productVariantOptionValue_Base: {
        id?: number;
        option_id?: number;
    };
    productVariantOptionValue_Post: {
        id?: number;
        option_id?: number;
    };
    resp_productOptionValue: {
        data?: definitions["productOptionOptionValue_Full"];
        meta?: {
            ""?: string;
        };
    };
    productOptionOptionValue_Base: {
        is_default?: boolean;
        label: string;
        sort_order: number;
        value_data?: {
            [key: string]: any;
        };
    };
    productOptionOptionValue_Full: definitions["productOptionOptionValue_Base"] & {
        id?: number;
    };
    productOptionValue_Post: {
        is_default?: boolean;
        label: string;
        sort_order: number;
        value_data?: {
            [key: string]: any;
        };
    };
    productOptionValue_Put: {
        is_default?: boolean;
        label: string;
        sort_order: number;
        value_data?: {
            [key: string]: any;
        };
    } & {
        id?: number;
    };
    productImage_Base: {
        image_file?: string;
        is_thumbnail?: boolean;
        sort_order?: number;
        description?: string;
        image_url?: string;
    };
    productImage_Post: {
        id?: number;
        product_id?: number;
        image_file?: string;
        url_zoom?: string;
        url_standard?: string;
        url_thumbnail?: string;
        url_tiny?: string;
        date_modified?: string;
        is_thumbnail?: boolean;
        sort_order?: number;
        description?: string;
    } & {
        image_url?: string;
        image_file?: string;
    };
    productImage_Put: {
        id?: number;
        product_id?: number;
        image_file?: string;
        url_zoom?: string;
        url_standard?: string;
        url_thumbnail?: string;
        url_tiny?: string;
        date_modified?: string;
        is_thumbnail?: boolean;
        sort_order?: number;
        description?: string;
    };
    productVideo_Base: {
        title?: string;
        description?: string;
        sort_order?: number;
        type?: "youtube";
        video_id?: string;
    };
    productVideo_Full: definitions["productVideo_Base"] & {
        id?: number;
        product_id?: number;
        length?: string;
    };
    productVideo_Post: definitions["productVideo_Base"];
    productVideo_Put: definitions["productVideo_Base"] & {
        id?: number;
    };
    productReview_Base: {
        title: string;
        text?: string;
        status?: string;
        rating?: number;
        email?: string;
        name?: string;
        date_reviewed: string;
    };
    productReview_Full: definitions["productReview_Base"] & {
        id?: number;
        product_id?: number;
        date_created?: string;
        date_modified?: string;
    };
    productReview_Post: {
        title: string;
        text?: string;
        status?: string;
        rating?: number;
        email?: string;
        name?: string;
        date_reviewed: string;
    };
    productReview_Put: {
        title: string;
        text?: string;
        status?: string;
        rating?: number;
        email?: string;
        name?: string;
        date_reviewed: string;
    };
    resp_productImage: {
        data?: definitions["productImage_Full"];
        meta?: {
            [key: string]: any;
        };
    };
    resourceImage_Full: {
        image_url?: string;
    };
    product_Post: definitions["product_Base"] & {
        variants?: definitions["productVariant_Post_Product"];
    };
    product_Put: {
        id?: number;
    } & definitions["product_Base"] & {
        variants?: definitions["productVariant_Put_Product"];
    };
    catalogSummary_Full: {
        inventory_count?: number;
        inventory_value?: number;
        primary_category_id?: number;
        primary_category_name?: string;
        variant_count?: number;
        highest_variant_price?: number;
        average_variant_price?: number;
        lowest_variant_price?: string;
        oldest_variant_date?: string;
        newest_variant_date?: string;
    };
    metafield_Base: {
        id?: number;
        permission_set: "app_only" | "read" | "write" | "read_and_sf_access" | "write_and_sf_access";
        namespace: string;
        key: string;
        value: string;
        description?: string;
        resource_type?: "category" | "brand" | "product" | "variant";
        resource_id?: number;
        date_created?: string;
        date_modified?: string;
    };
    complexRule_Base: {
        id?: number;
        product_id?: number;
        sort_order?: number;
        enabled?: boolean;
        stop?: boolean;
        purchasing_disabled?: boolean;
        purchasing_disabled_message?: string;
        purchasing_hidden?: boolean;
        image_url?: string;
        price_adjuster?: definitions["adjuster_Full"];
        weight_adjuster?: definitions["adjuster_Full"];
        conditions?: definitions["complexRuleConditionBase"][];
    };
    productCustomField_Base: {
        id?: number;
        name: string;
        value: string;
    };
    productCustomField_Post: {
        id?: number;
        name: string;
        value: string;
    };
    productCustomField_Put: {
        id?: number;
        name: string;
        value: string;
    };
    complexRuleConditionBase: {
        id?: number;
        rule_id?: number;
        modifier_id: number;
        modifier_value_id: number;
        variant_id: number;
        combination_id?: number;
    };
    customUrl_Full: {
        url?: string;
        is_customized?: boolean;
    };
    bulkPricingRule_Full: {
        id?: number;
        quantity_min: number;
        quantity_max: number;
        type: "price" | "percent" | "fixed";
        amount: number;
    };
    productOptionConfig_Full: {
        default_value?: string;
        checked_by_default?: boolean;
        checkbox_label?: string;
        date_limited?: boolean;
        date_limit_mode?: "earliest" | "range" | "latest";
        date_earliest_value?: string;
        date_latest_value?: string;
        file_types_mode?: "specific" | "all";
        file_types_supported?: string[];
        file_types_other?: string[];
        file_max_size?: number;
        text_characters_limited?: boolean;
        text_min_length?: number;
        text_max_length?: number;
        text_lines_limited?: boolean;
        text_max_lines?: number;
        number_limited?: boolean;
        number_limit_mode?: "lowest" | "highest" | "range";
        number_lowest_value?: number;
        number_highest_value?: number;
        number_integers_only?: boolean;
        product_list_adjusts_inventory?: boolean;
        product_list_adjusts_pricing?: boolean;
        product_list_shipping_calc?: "none" | "weight" | "package";
    };
    adjuster_Full: {
        adjuster?: "relative" | "percentage";
        adjuster_value?: number;
    };
    resp_variantBatchError: {
        batch_errors?: (definitions["error_Base"] & {
            errors?: {
                additionalProperties?: string;
            };
        })[];
    };
    metaCollection_Full: {
        pagination?: definitions["pagination_Full"];
    };
    pagination_Full: {
        total?: number;
        count?: number;
        per_page?: number;
        current_page?: number;
        total_pages?: number;
        links?: {
            previous?: string;
            current?: string;
            next?: string;
        };
    };
    metaEmpty_Full: {
        [key: string]: any;
    };
    errorResponse_Full: definitions["error_Base"] & {
        errors?: definitions["detailedErrors"];
    };
    error_Base: {
        status?: number;
        title?: string;
        type?: string;
        instance?: string;
    };
    errorNotFound: {
        status?: number;
        title?: string;
        type?: string;
        instance?: string;
    };
    giftCertificate_Full: {
        code?: string;
        original_balance?: number;
        starting_balance?: number;
        remaining_balance?: number;
        status?: "active" | "pending" | "disabled" | "expired";
    };
    errorNoContent: {
        status?: number;
        title?: string;
        type?: string;
        instance?: string;
    };
    detailedErrors: {
        additionalProperties?: string;
    };
    product_Full: definitions["product_Base"] & {
        date_created?: string;
        date_modified?: string;
        id?: number;
        base_variant_id?: number;
        calculated_price?: number;
        options?: definitions["productOption_Base"][];
        modifiers?: definitions["productModifier_Full"][];
        map_price?: number;
        option_set_id?: number;
        option_set_display?: string;
    } & {
        variants?: definitions["productVariant_Full"];
    };
    productImage_Full: definitions["productImage_Base"] & {
        id?: number;
        product_id?: number;
        url_zoom?: string;
        url_standard?: string;
        url_thumbnail?: string;
        url_tiny?: string;
        date_modified?: string;
    };
    metafield_Post: definitions["metafield_Base"];
    product_Put_Collection: ({
        id: number;
    } & definitions["product_Base"])[];
    config_Full: {
        default_value?: string;
        checked_by_default?: boolean;
        checkbox_label?: string;
        date_limited?: boolean;
        date_limit_mode?: "earliest" | "range" | "latest";
        date_earliest_value?: string;
        date_latest_value?: string;
        file_types_mode?: "specific" | "all";
        file_types_supported?: string[];
        file_types_other?: string[];
        file_max_size?: number;
        text_characters_limited?: boolean;
        text_min_length?: number;
        text_max_length?: number;
        text_lines_limited?: boolean;
        text_max_lines?: number;
        number_limited?: boolean;
        number_limit_mode?: "lowest" | "highest" | "range";
        number_lowest_value?: number;
        number_highest_value?: number;
        number_integers_only?: boolean;
        product_list_adjusts_inventory?: boolean;
        product_list_adjusts_pricing?: boolean;
        product_list_shipping_calc?: "none" | "weight" | "package";
    };
    adjusters_Full: {
        price?: definitions["adjuster_Full"];
        weight?: definitions["adjuster_Full"];
        image_url?: string;
        purchasing_disabled?: {
            status?: boolean;
            message?: string;
        };
    };
    variant_Base: {
        cost_price?: number;
        price?: number;
        sale_price?: number;
        retail_price?: number;
        weight?: number;
        width?: number;
        height?: number;
        depth?: number;
        is_free_shipping?: boolean;
        fixed_cost_shipping_price?: number;
        purchasing_disabled?: boolean;
        purchasing_disabled_message?: string;
        upc?: string;
        inventory_level?: number;
        inventory_warning_level?: number;
        bin_picking_number?: string;
    };
    product_Base: {
        name: string;
        type: "physical" | "digital";
        sku?: string;
        description?: string;
        weight: number;
        width?: number;
        depth?: number;
        height?: number;
        price: number;
        cost_price?: number;
        retail_price?: number;
        sale_price?: number;
        tax_class_id?: number;
        product_tax_code?: string;
        categories?: number[];
        brand_id?: number;
        inventory_level?: number;
        inventory_warning_level?: number;
        inventory_tracking?: "none" | "product" | "variant";
        fixed_cost_shipping_price?: number;
        is_free_shipping?: boolean;
        is_visible?: boolean;
        is_featured?: boolean;
        related_products?: number[];
        warranty?: string;
        bin_picking_number?: string;
        layout_file?: string;
        upc?: string;
        search_keywords?: string;
        availability?: "available" | "disabled" | "preorder";
        availability_description?: string;
        gift_wrapping_options_type?: "any" | "none" | "list";
        gift_wrapping_options_list?: number[];
        sort_order?: number;
        condition?: "New" | "Used" | "Refurbished";
        is_condition_shown?: boolean;
        order_quantity_minimum?: number;
        order_quantity_maximum?: number;
        page_title?: string;
        meta_keywords?: string[];
        meta_description?: string;
        view_count?: number;
        preorder_release_date?: string;
        preorder_message?: string;
        is_preorder_only?: boolean;
        is_price_hidden?: boolean;
        price_hidden_label?: string;
        custom_url?: definitions["customUrl_Full"];
        open_graph_type?: "product" | "album" | "book" | "drink" | "food" | "game" | "movie" | "song" | "tv_show";
        open_graph_title?: string;
        open_graph_description?: string;
        open_graph_use_meta_description?: boolean;
        open_graph_use_product_name?: boolean;
        open_graph_use_image?: boolean;
        "brand_name or brand_id"?: string;
        gtin?: string;
        mpn?: string;
        reviews_rating_sum?: number;
        reviews_count?: number;
        total_sold?: number;
        custom_fields?: definitions["productCustomField_Put"][];
        bulk_pricing_rules?: definitions["bulkPricingRule_Full"][];
        images?: definitions["productImage_Full"][];
        videos?: definitions["productVideo_Full"][];
    };
    metafield_Put: {
        id?: number;
    } & definitions["metafield_Base"];
    metafield_Full: definitions["metafield_Put"] & {
        date_created?: string;
        date_modified?: string;
    };
    productVariant_Put: definitions["productVariant_Base"] & {
        product_id?: number;
        sku?: string;
    };
}
export interface parameters {
    FilterTemplateFileParam: string;
    FilterIdParam: number;
    FilterSkuParam: string;
    FilterNameParam: string;
    FilterEmailParam: string;
    FilterSourceParam: string;
    FilterOrderIdParam: number;
    FilterUpcParam: string;
    FilterPriceParam: number;
    FilterSalePriceParam: number;
    FilterRetailPriceParam: number;
    FilterMapPriceParam: number;
    FilterCalculatedPriceParam: number;
    FilterWeightParam: number;
    FilterConditionParam: "new" | "used" | "refurbished";
    FilterBrandIdParam: number;
    FilterDateModifiedParam: string;
    FilterDateCreatedParam: string;
    FilterDateLastImportedParam: string;
    FilterIsVisibleParam: boolean;
    FilterIsFeaturedParam: number;
    FilterIsFreeShippingParam: number;
    FilterInventoryLevelParam: number;
    FilterInventoryLowParam: number;
    FilterOutOfStockParam: number;
    FilterTotalSoldParam: number;
    ProductFilterTypeParam: "digital" | "physical";
    FilterCategoriesParam: number;
    FilterKeywordParam: string;
    ProductFilterKeywordParam: string;
    ProductFilterKeywordContextParam: "shopper" | "merchant";
    FilterStatusParam: number;
    FilterIncludeParam: "variants" | "images" | "custom_fields" | "bulk_pricing_rules" | "primary_image" | "modifiers" | "options" | "videos";
    FilterIncludeFieldsParam: string;
    FilterExcludeFieldsParam: string;
    FilterParentIdParam: number;
    FilterPageTitleParam: string;
    FilterAvailabilityParam: "available" | "disabled" | "preorder";
    FilterPriceListIdParam: number;
    FilterProductIdParam: string;
    FilterVariantIdParam: number;
    FilterCurrencyParam: string;
    PageParam: number;
    LimitParam: number;
    DirectionParam: "asc" | "desc";
    ProductSortParam: "id" | "name" | "sku" | "price" | "date_modified" | "date_last_imported" | "inventory_level" | "is_visible" | "total_sold";
    ProductIdParam: number;
    ReviewIdParam: number;
    ImageIdParam: number;
    VideoIdParam: number;
    ComplexRuleIdParam: number;
    ConfigurableFieldIdParam: number;
    CustomFieldIdParam: number;
    BulkPricingRuleIdParam: number;
    ModifierIdParam: number;
    ValueIdParam: number;
    OptionIdParam: number;
    VariantIdParam: number;
    CategoryIdParam: number;
    BrandIdParam: number;
    MetafieldIdParam: number;
    MetafieldKeyParam: string;
    MetafieldNamespaceParam: string;
    ImageFileParam: {
        [key: string]: any;
    };
    OrderIdParam: number;
    Accept: string;
    "Content-Type": string;
    product_id: string;
    FilterIdIn: number[];
    FilterIdNotIn: number[];
    FilterIdMax: number[];
    FilterIdMin: number[];
    FilterIdGreater: number[];
    FilterIdLess: number[];
}
export interface responses {
    ProductCollectionResponse: {
        schema: {
            data?: definitions["product_Full"][];
            meta?: definitions["metaCollection_Full"];
        };
    };
    BrandResponse: {
        schema: {
            data?: {
                id?: number;
                name: string;
                page_title?: string;
                meta_keywords?: string[];
                meta_description?: string;
                search_keywords?: string;
                image_url?: string;
                custom_url?: {
                    url?: string;
                    is_customized?: boolean;
                };
            };
            meta?: {
                [key: string]: any;
            };
        };
    };
    BrandCollectionResponse: {
        schema: {
            data?: {
                id?: number;
                name: string;
                page_title?: string;
                meta_keywords?: string[];
                meta_description?: string;
                search_keywords?: string;
                image_url?: string;
                custom_url?: {
                    url?: string;
                    is_customized?: boolean;
                };
            }[];
            meta?: definitions["metaCollection_Full"];
        };
    };
    BrandImageUpload: {
        schema: {
            data?: {
                image_url?: string;
            };
            meta?: {
                [key: string]: any;
            };
        };
    };
    MetafieldCollectionResponse: {
        schema: {
            data?: {
                id?: number;
                permission_set: "app_only" | "read" | "write";
                namespace: string;
                key: string;
                value: string;
                description?: string;
                resource_type?: "category" | "brand" | "product" | "variant";
                resource_id?: number;
                created_at?: string;
                updated_at?: string;
            }[];
            meta?: definitions["metaCollection_Full"];
        };
    };
    MetafieldResponse: {
        schema: {
            data?: {
                id?: number;
                permission_set: "app_only" | "read" | "write";
                namespace: string;
                key: string;
                value: string;
                description?: string;
                resource_type?: "category" | "brand" | "product" | "variant";
                resource_id?: number;
                created_at?: string;
                updated_at?: string;
            };
            meta?: {
                [key: string]: any;
            };
        };
    };
    CategoryCollectionResponse: {
        schema: {
            data?: {
                [key: string]: any;
            }[];
            meta?: definitions["metaCollection_Full"];
        };
    };
    CategoryResponse: {
        schema: {
            data?: definitions["category_Full"];
            meta?: {
                [key: string]: any;
            };
        };
    };
    ProductResponse: {
        schema: {
            data?: definitions["product_Full"];
            meta?: {
                [key: string]: any;
            };
        };
    };
    BulkPricingRuleResponse: {
        schema: {
            data?: definitions["bulkPricingRule_Full"];
            meta?: {
                [key: string]: any;
            };
        };
    };
    BulkPricingRuleCollectionResponse: {
        schema: {
            data?: definitions["bulkPricingRule_Full"][];
            meta?: definitions["metaCollection_Full"];
        };
    };
    ComplexRuleCollectionResponse: {
        schema: {
            data?: {
                id?: number;
                product_id?: number;
                sort_order?: number;
                enabled?: boolean;
                stop?: boolean;
                purchasing_disabled?: boolean;
                purchasing_disabled_message?: string;
                purchasing_hidden?: boolean;
                image_url?: string;
                price_adjuster?: {
                    adjuster?: "relative" | "percentage";
                    adjuster_value?: number;
                };
                weight_adjuster?: {
                    adjuster?: "relative" | "percentage";
                    adjuster_value?: number;
                };
                conditions?: {
                    id?: number;
                    rule_id?: number;
                    modifier_id: number;
                    modifier_value_id: number;
                    variant_id: number;
                    combination_id?: number;
                }[];
            }[];
            meta?: definitions["metaCollection_Full"];
        };
    };
    ComplexRuleResponse: {
        schema: {
            data?: {
                id?: number;
                product_id?: number;
                sort_order?: number;
                enabled?: boolean;
                stop?: boolean;
                purchasing_disabled?: boolean;
                purchasing_disabled_message?: string;
                purchasing_hidden?: boolean;
                image_url?: string;
                price_adjuster?: {
                    adjuster?: "relative" | "percentage";
                    adjuster_value?: number;
                };
                weight_adjuster?: {
                    adjuster?: "relative" | "percentage";
                    adjuster_value?: number;
                };
                conditions?: {
                    id?: number;
                    rule_id?: number;
                    modifier_id: number;
                    modifier_value_id: number;
                    variant_id: number;
                    combination_id?: number;
                }[];
            };
            meta?: {
                [key: string]: any;
            };
        };
    };
    CustomFieldCollectionResponse: {
        schema: {
            data?: {
                id?: number;
                name: string;
                value: string;
            }[];
            meta?: definitions["metaCollection_Full"];
        };
    };
    CustomFieldResponse: {
        schema: {
            data?: {
                id?: number;
                name: string;
                value: string;
            };
            meta?: {
                [key: string]: any;
            };
        };
    };
    ProductImageCollectionResponse: {
        schema: {
            data?: ({
                id?: number;
                product_id?: number;
                image_file?: string;
                url_zoom?: string;
                url_standard?: string;
                url_thumbnail?: string;
                url_tiny?: string;
                date_modified?: string;
                is_thumbnail?: boolean;
                sort_order?: number;
                description?: string;
            } & {
                id?: number;
                product_id?: number;
                image_file?: string;
                url_zoom?: string;
                url_standard?: string;
                url_thumbnail?: string;
                url_tiny?: string;
                date_modified?: string;
                image_url?: string;
            })[];
            meta?: definitions["metaCollection_Full"];
        };
    };
    ProductImageResponse: {
        schema: {
            data?: {
                id?: number;
                product_id?: number;
                image_file?: string;
                url_zoom?: string;
                url_standard?: string;
                url_thumbnail?: string;
                url_tiny?: string;
                date_modified?: string;
                is_thumbnail?: boolean;
                sort_order?: number;
                description?: string;
            } & {
                id?: number;
                product_id?: number;
                image_file?: string;
                url_zoom?: string;
                url_standard?: string;
                url_thumbnail?: string;
                url_tiny?: string;
                date_modified?: string;
                image_url?: string;
            };
            meta?: {
                [key: string]: any;
            };
        };
    };
    ModifierCollectionResponse: {
        schema: {
            data?: ({
                type: "date" | "checkbox" | "file" | "text" | "multi_line_text" | "numbers_only_text" | "radio_buttons" | "rectangles" | "dropdown" | "product_list" | "product_list_with_images" | "swatch";
                required: boolean;
                sort_order?: number;
                config?: {
                    default_value?: string;
                    checked_by_default?: boolean;
                    checkbox_label?: string;
                    date_limited?: boolean;
                    date_limit_mode?: "earliest" | "range" | "latest";
                    date_earliest_value?: string;
                    date_latest_value?: string;
                    file_types_mode?: "specific" | "all";
                    file_types_supported?: string[];
                    file_types_other?: string[];
                    file_max_size?: number;
                    text_characters_limited?: boolean;
                    text_min_length?: number;
                    text_max_length?: number;
                    text_lines_limited?: boolean;
                    text_max_lines?: number;
                    number_limited?: boolean;
                    number_limit_mode?: "lowest" | "highest" | "range";
                    number_lowest_value?: number;
                    number_highest_value?: number;
                    number_integers_only?: boolean;
                    product_list_adjusts_inventory?: boolean;
                    product_list_adjusts_pricing?: boolean;
                    product_list_shipping_calc?: "none" | "weight" | "package";
                };
                option_values?: (({
                    is_default?: boolean;
                    label: string;
                    sort_order: number;
                    value_data?: {
                        [key: string]: any;
                    };
                } & {
                    adjusters?: {
                        price?: {
                            adjuster?: "relative" | "percentage";
                            adjuster_value?: number;
                        };
                        weight?: {
                            adjuster?: "relative" | "percentage";
                            adjuster_value?: number;
                        };
                        image_url?: string;
                        purchasing_disabled?: {
                            status?: boolean;
                            message?: string;
                        };
                    };
                }) & {
                    id?: number;
                })[];
            } & {
                id?: number;
                product_id?: number;
                name?: string;
                display_name?: string;
            })[];
            meta?: definitions["metaCollection_Full"];
        };
    };
    ModifierResponse: {
        schema: {
            data?: {
                type: "date" | "checkbox" | "file" | "text" | "multi_line_text" | "numbers_only_text" | "radio_buttons" | "rectangles" | "dropdown" | "product_list" | "product_list_with_images" | "swatch";
                required: boolean;
                sort_order?: number;
                config?: {
                    default_value?: string;
                    checked_by_default?: boolean;
                    checkbox_label?: string;
                    date_limited?: boolean;
                    date_limit_mode?: "earliest" | "range" | "latest";
                    date_earliest_value?: string;
                    date_latest_value?: string;
                    file_types_mode?: "specific" | "all";
                    file_types_supported?: string[];
                    file_types_other?: string[];
                    file_max_size?: number;
                    text_characters_limited?: boolean;
                    text_min_length?: number;
                    text_max_length?: number;
                    text_lines_limited?: boolean;
                    text_max_lines?: number;
                    number_limited?: boolean;
                    number_limit_mode?: "lowest" | "highest" | "range";
                    number_lowest_value?: number;
                    number_highest_value?: number;
                    number_integers_only?: boolean;
                    product_list_adjusts_inventory?: boolean;
                    product_list_adjusts_pricing?: boolean;
                    product_list_shipping_calc?: "none" | "weight" | "package";
                };
                option_values?: (({
                    is_default?: boolean;
                    label: string;
                    sort_order: number;
                    value_data?: {
                        [key: string]: any;
                    };
                } & {
                    adjusters?: {
                        price?: {
                            adjuster?: "relative" | "percentage";
                            adjuster_value?: number;
                        };
                        weight?: {
                            adjuster?: "relative" | "percentage";
                            adjuster_value?: number;
                        };
                        image_url?: string;
                        purchasing_disabled?: {
                            status?: boolean;
                            message?: string;
                        };
                    };
                }) & {
                    id?: number;
                })[];
            } & {
                id?: number;
                product_id?: number;
                name?: string;
                display_name?: string;
            };
            meta?: {
                [key: string]: any;
            };
        };
    };
    ModifierValueCollectionResponse: {
        schema: {
            data?: (({
                is_default?: boolean;
                label: string;
                sort_order: number;
                value_data?: {
                    [key: string]: any;
                };
            } & {
                adjusters?: {
                    price?: {
                        adjuster?: "relative" | "percentage";
                        adjuster_value?: number;
                    };
                    weight?: {
                        adjuster?: "relative" | "percentage";
                        adjuster_value?: number;
                    };
                    image_url?: string;
                    purchasing_disabled?: {
                        status?: boolean;
                        message?: string;
                    };
                };
            }) & {
                id?: number;
            })[];
            meta?: definitions["metaCollection_Full"];
        };
    };
    ModifierValueResponse: {
        schema: {
            data?: ({
                is_default?: boolean;
                label: string;
                sort_order: number;
                value_data?: {
                    [key: string]: any;
                };
            } & {
                adjusters?: {
                    price?: {
                        adjuster?: "relative" | "percentage";
                        adjuster_value?: number;
                    };
                    weight?: {
                        adjuster?: "relative" | "percentage";
                        adjuster_value?: number;
                    };
                    image_url?: string;
                    purchasing_disabled?: {
                        status?: boolean;
                        message?: string;
                    };
                };
            }) & {
                id?: number;
            };
            meta?: {
                [key: string]: any;
            };
        };
    };
    OptionCollectionResponse: {
        schema: {
            data?: ({
                id?: number;
                product_id?: number;
                display_name?: string;
                type?: "radio_buttons" | "rectangles" | "dropdown" | "product_list" | "product_list_with_images" | "swatch";
                config?: {
                    default_value?: string;
                    checked_by_default?: boolean;
                    checkbox_label?: string;
                    date_limited?: boolean;
                    date_limit_mode?: "earliest" | "range" | "latest";
                    date_earliest_value?: string;
                    date_latest_value?: string;
                    file_types_mode?: "specific" | "all";
                    file_types_supported?: string[];
                    file_types_other?: string[];
                    file_max_size?: number;
                    text_characters_limited?: boolean;
                    text_min_length?: number;
                    text_max_length?: number;
                    text_lines_limited?: boolean;
                    text_max_lines?: number;
                    number_limited?: boolean;
                    number_limit_mode?: "lowest" | "highest" | "range";
                    number_lowest_value?: number;
                    number_highest_value?: number;
                    number_integers_only?: boolean;
                    product_list_adjusts_inventory?: boolean;
                    product_list_adjusts_pricing?: boolean;
                    product_list_shipping_calc?: "none" | "weight" | "package";
                };
                sort_order?: number;
                option_values?: ({
                    is_default?: boolean;
                    label: string;
                    sort_order: number;
                    value_data?: {
                        [key: string]: any;
                    };
                } & {
                    id?: number;
                })[];
                image_url?: string;
            } & {
                name?: string;
            })[];
            meta?: definitions["metaCollection_Full"];
        };
    };
    OptionResponse: {
        schema: {
            data?: {
                id?: number;
                product_id?: number;
                display_name?: string;
                type?: "radio_buttons" | "rectangles" | "dropdown" | "product_list" | "product_list_with_images" | "swatch";
                config?: {
                    default_value?: string;
                    checked_by_default?: boolean;
                    checkbox_label?: string;
                    date_limited?: boolean;
                    date_limit_mode?: "earliest" | "range" | "latest";
                    date_earliest_value?: string;
                    date_latest_value?: string;
                    file_types_mode?: "specific" | "all";
                    file_types_supported?: string[];
                    file_types_other?: string[];
                    file_max_size?: number;
                    text_characters_limited?: boolean;
                    text_min_length?: number;
                    text_max_length?: number;
                    text_lines_limited?: boolean;
                    text_max_lines?: number;
                    number_limited?: boolean;
                    number_limit_mode?: "lowest" | "highest" | "range";
                    number_lowest_value?: number;
                    number_highest_value?: number;
                    number_integers_only?: boolean;
                    product_list_adjusts_inventory?: boolean;
                    product_list_adjusts_pricing?: boolean;
                    product_list_shipping_calc?: "none" | "weight" | "package";
                };
                sort_order?: number;
                option_values?: ({
                    is_default?: boolean;
                    label: string;
                    sort_order: number;
                    value_data?: {
                        [key: string]: any;
                    };
                } & {
                    id?: number;
                })[];
                image_url?: string;
            } & {
                name?: string;
            };
            meta?: {
                [key: string]: any;
            };
        };
    };
    OptionValueCollectionResponse: {
        schema: {
            data?: ({
                is_default?: boolean;
                label: string;
                sort_order: number;
                value_data?: {
                    [key: string]: any;
                };
            } & {
                id?: number;
            })[];
            meta?: definitions["metaCollection_Full"];
        };
    };
    OptionValueResponse: {
        schema: {
            data?: {
                is_default?: boolean;
                label: string;
                sort_order: number;
                value_data?: {
                    [key: string]: any;
                };
            } & {
                id?: number;
            };
            meta?: {
                [key: string]: any;
            };
        };
    };
    ProductReviewCollectionResponse: {
        schema: {
            data?: ({
                title: string;
                text?: string;
                status?: string;
                rating?: number;
                email?: string;
                name?: string;
                date_reviewed: string;
            } & {
                id?: number;
                product_id?: number;
                date_created?: string;
                date_modified?: string;
            })[];
            meta?: definitions["metaCollection_Full"];
        };
    };
    ProductReviewResponse: {
        schema: {
            data?: {
                title: string;
                text?: string;
                status?: string;
                rating?: number;
                email?: string;
                name?: string;
                date_reviewed: string;
            } & {
                id?: number;
                product_id?: number;
                date_created?: string;
                date_modified?: string;
            };
            meta?: {
                [key: string]: any;
            };
        };
    };
    VariantCollectionResponse: {
        schema: {
            data?: ({
                cost_price?: number;
                price?: number;
                sale_price?: number;
                retail_price?: number;
                weight?: number;
                width?: number;
                height?: number;
                depth?: number;
                is_free_shipping?: boolean;
                fixed_cost_shipping_price?: number;
                purchasing_disabled?: boolean;
                purchasing_disabled_message?: string;
                upc?: string;
                inventory_level?: number;
                inventory_warning_level?: number;
                bin_picking_number?: string;
            } & {
                id?: number;
                product_id?: number;
                sku?: string;
                sku_id?: number;
                option_values?: ({
                    option_display_name?: string;
                    label?: string;
                } & {
                    id?: number;
                    option_id?: number;
                })[];
                calculated_price?: number;
            })[];
            meta?: {
                [key: string]: any;
            };
        };
    };
    VariantResponse: {
        schema: {
            data?: {
                cost_price?: number;
                price?: number;
                sale_price?: number;
                retail_price?: number;
                weight?: number;
                width?: number;
                height?: number;
                depth?: number;
                is_free_shipping?: boolean;
                fixed_cost_shipping_price?: number;
                purchasing_disabled?: boolean;
                purchasing_disabled_message?: string;
                upc?: string;
                inventory_level?: number;
                inventory_warning_level?: number;
                bin_picking_number?: string;
            } & {
                id?: number;
                product_id?: number;
                sku?: string;
                sku_id?: number;
                option_values?: ({
                    option_display_name?: string;
                    label?: string;
                } & {
                    id?: number;
                    option_id?: number;
                })[];
                calculated_price?: number;
            };
            meta?: {
                [key: string]: any;
            };
        };
    };
    ProductVideoCollectionResponse: {
        schema: {
            data?: ({
                title?: string;
                description?: string;
                sort_order?: number;
                type?: "youtube";
            } & {
                id?: number;
                video_id?: string;
                product_id?: number;
                length?: string;
            })[];
            meta?: {
                [key: string]: any;
            };
        };
    };
    ProductVideoResponse: {
        schema: {
            data?: {
                title?: string;
                description?: string;
                sort_order?: number;
                type?: "youtube";
            } & {
                id?: number;
                video_id?: string;
                product_id?: number;
                length?: string;
            };
            meta?: definitions["metaEmpty_Full"];
        };
    };
    CatalogSummaryResponse: {
        schema: {
            data?: {
                inventory_count?: number;
                inventory_value?: number;
                primary_category_id?: number;
                primary_category_name?: string;
                variant_count?: number;
                highest_variant_price?: number;
                average_variant_price?: number;
                lowest_variant_price?: string;
                oldest_variant_date?: string;
                newest_variant_date?: string;
            };
            meta?: {
                [key: string]: any;
            };
        };
    };
    CatalogVariantCollectionResponse: {
        schema: {
            data?: ({
                cost_price?: number;
                price?: number;
                sale_price?: number;
                retail_price?: number;
                weight?: number;
                width?: number;
                height?: number;
                depth?: number;
                is_free_shipping?: boolean;
                fixed_cost_shipping_price?: number;
                purchasing_disabled?: boolean;
                purchasing_disabled_message?: string;
                upc?: string;
                inventory_level?: number;
                inventory_warning_level?: number;
                bin_picking_number?: string;
            } & {
                id?: number;
                product_id?: number;
                sku?: string;
                sku_id?: number;
                option_values?: ({
                    option_display_name?: string;
                    label?: string;
                } & {
                    id?: number;
                    option_id?: number;
                })[];
                calculated_price?: number;
            })[];
            meta?: definitions["metaCollection_Full"];
        };
    };
}
export interface operations {
    getProducts: {
        parameters: {
            query: {
                name?: unknown;
                sku?: unknown;
                upc?: unknown;
                price?: unknown;
                weight?: unknown;
                condition?: unknown;
                brand_id?: unknown;
                date_modified?: unknown;
                date_last_imported?: unknown;
                is_visible?: unknown;
                is_featured?: unknown;
                is_free_shipping?: unknown;
                inventory_level?: unknown;
                inventory_low?: unknown;
                out_of_stock?: unknown;
                total_sold?: unknown;
                type?: unknown;
                categories?: unknown;
                keyword?: unknown;
                keyword_context?: unknown;
                status?: unknown;
                include?: unknown;
                include_fields?: unknown;
                exclude_fields?: unknown;
                availability?: unknown;
                price_list_id?: unknown;
                page?: unknown;
                limit?: unknown;
                direction?: unknown;
                sort?: unknown;
            };
        };
        responses: {
            200: responses["ProductCollectionResponse"];
        };
    };
    updateProducts: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
            body: {
                products?: definitions["product_Put_Collection"];
            };
        };
        responses: {
            200: responses["ProductCollectionResponse"];
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
            409: {
                schema: ({
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                })[];
            };
            413: unknown;
            422: {
                schema: ({
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                })[];
            };
        };
    };
    createProduct: {
        parameters: {
            body: {
                product: definitions["product_Post"];
            };
            header: {
                "Content-Type": unknown;
                Accept: unknown;
            };
        };
        responses: {
            200: responses["ProductResponse"];
            409: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    deleteProducts: {
        parameters: {
            query: {
                name?: unknown;
                sku?: unknown;
                price?: unknown;
                weight?: unknown;
                condition?: unknown;
                brand_id?: unknown;
                date_modified?: unknown;
                date_last_imported?: unknown;
                is_visible?: unknown;
                is_featured?: unknown;
                inventory_level?: unknown;
                total_sold?: unknown;
                type?: unknown;
                categories?: unknown;
                keyword?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    getProductById: {
        parameters: {
            query: {
                include?: unknown;
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["product_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    updateProduct: {
        parameters: {
            body: {
                product: definitions["product_Put"];
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: responses["ProductResponse"];
            201: {
                schema: {
                    [key: string]: any;
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
            409: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    deleteProductById: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    getProductImages: {
        parameters: {
            query: {
                page?: unknown;
                limit?: unknown;
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["productImage_Full"][];
                    meta?: definitions["metaCollection_Full"];
                };
            };
            204: never;
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    createProductImage: {
        parameters: {
            body: {
                productImage: {
                    id?: number;
                    product_id?: number;
                    image_file?: string;
                    url_zoom?: string;
                    url_standard?: string;
                    url_thumbnail?: string;
                    url_tiny?: string;
                    date_modified?: string;
                    is_thumbnail?: boolean;
                    sort_order?: number;
                    description?: string;
                } & {
                    image_url?: string;
                    image_file?: string;
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        id?: number;
                        product_id?: number;
                        image_file?: string;
                        url_zoom?: string;
                        url_standard?: string;
                        url_thumbnail?: string;
                        url_tiny?: string;
                        date_modified?: string;
                        is_thumbnail?: boolean;
                        sort_order?: number;
                        description?: string;
                    } & {
                        id?: number;
                        product_id?: number;
                        image_file?: string;
                        url_zoom?: string;
                        url_standard?: string;
                        url_thumbnail?: string;
                        url_tiny?: string;
                        date_modified?: string;
                        image_url?: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    getProductImageById: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["productImage_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    updateProductImage: {
        parameters: {
            body: {
                productImage: {
                    id?: number;
                    product_id?: number;
                    image_file?: string;
                    url_zoom?: string;
                    url_standard?: string;
                    url_thumbnail?: string;
                    url_tiny?: string;
                    date_modified?: string;
                    is_thumbnail?: boolean;
                    sort_order?: number;
                    description?: string;
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        id?: number;
                        product_id?: number;
                        image_file?: string;
                        url_zoom?: string;
                        url_standard?: string;
                        url_thumbnail?: string;
                        url_tiny?: string;
                        date_modified?: string;
                        is_thumbnail?: boolean;
                        sort_order?: number;
                        description?: string;
                    } & {
                        id?: number;
                        product_id?: number;
                        image_file?: string;
                        url_zoom?: string;
                        url_standard?: string;
                        url_thumbnail?: string;
                        url_tiny?: string;
                        date_modified?: string;
                        image_url?: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    deleteProductImage: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    getProductVideos: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["productVideo_Full"][];
                    meta?: definitions["metaCollection_Full"];
                };
            };
        };
    };
    createProductVideo: {
        parameters: {
            body: {
                productVideo: {
                    title?: string;
                    description?: string;
                    sort_order?: number;
                    type?: "youtube";
                } & {
                    video_id?: string;
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        title?: string;
                        description?: string;
                        sort_order?: number;
                        type?: "youtube";
                    } & {
                        id?: number;
                        video_id?: string;
                        product_id?: number;
                        length?: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    getProductVideoById: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["productVideo_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    updateProductVideo: {
        parameters: {
            body: {
                productVideo: {
                    title?: string;
                    description?: string;
                    sort_order?: number;
                    type?: "youtube";
                } & {
                    id?: number;
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        title?: string;
                        description?: string;
                        sort_order?: number;
                        type?: "youtube";
                    } & {
                        id?: number;
                        video_id?: string;
                        product_id?: number;
                        length?: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    deleteProductVideo: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    getVariantsByProductId: {
        parameters: {
            query: {
                page?: unknown;
                limit?: unknown;
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["productVariant_Full"][];
                    meta?: definitions["metaCollection_Full"];
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    createVariant: {
        parameters: {
            body: {
                Variant: definitions["productVariant_Post"];
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["productVariant_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    getVariantById: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["productVariant_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    updateVariant: {
        parameters: {
            body: {
                Variant: definitions["productVariant_Put"];
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["productVariant_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    deleteVariantById: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    getVariantMetafieldsByProductIdAndVariantId: {
        parameters: {
            query: {
                page?: unknown;
                limit?: unknown;
                key?: unknown;
                namespace?: unknown;
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        id?: number;
                        permission_set: "app_only" | "read" | "write" | "read_and_sf_access" | "write_and_sf_access";
                        namespace: string;
                        key: string;
                        value: string;
                        description?: string;
                        resource_type?: "category" | "brand" | "product" | "variant";
                        resource_id?: number;
                        created_at?: string;
                        updated_at?: string;
                    }[];
                    meta?: definitions["categoriesTree_Resp"];
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    createVariantMetafield: {
        parameters: {
            body: {
                Metafield: {
                    id?: number;
                    permission_set: "app_only" | "read" | "write" | "read_and_sf_access" | "write_and_sf_access";
                    namespace: string;
                    key: string;
                    value: string;
                    description?: string;
                    resource_type?: "category" | "brand" | "product" | "variant";
                    resource_id?: number;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        id?: number;
                        permission_set: "app_only" | "read" | "write" | "read_and_sf_access" | "write_and_sf_access";
                        namespace: string;
                        key: string;
                        value: string;
                        description?: string;
                        resource_type?: "category" | "brand" | "product" | "variant";
                        resource_id?: number;
                        created_at?: string;
                        updated_at?: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            409: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    getVariantMetafieldByProductIdAndVariantId: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["metafield_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    updateVariantMetafield: {
        parameters: {
            body: {
                Metafield: definitions["metafield_Put"];
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["metafield_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    deleteVariantMetafieldById: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    createVariantImage: {
        parameters: {
            path: {
                product_id: unknown;
                variant_id: unknown;
            };
            body: {
                body?: {
                    image_url?: string;
                };
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        image_url?: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
            500: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    getOptions: {
        parameters: {
            query: {
                page?: unknown;
                limit?: unknown;
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["productOption_Full"][];
                    meta?: definitions["metaCollection_Full"];
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    createOption: {
        parameters: {
            body: {
                Option: {
                    id?: number;
                    product_id?: number;
                    display_name?: string;
                    type?: "radio_buttons" | "rectangles" | "dropdown" | "product_list" | "product_list_with_images" | "swatch";
                    config?: {
                        default_value?: string;
                        checked_by_default?: boolean;
                        checkbox_label?: string;
                        date_limited?: boolean;
                        date_limit_mode?: "earliest" | "range" | "latest";
                        date_earliest_value?: string;
                        date_latest_value?: string;
                        file_types_mode?: "specific" | "all";
                        file_types_supported?: string[];
                        file_types_other?: string[];
                        file_max_size?: number;
                        text_characters_limited?: boolean;
                        text_min_length?: number;
                        text_max_length?: number;
                        text_lines_limited?: boolean;
                        text_max_lines?: number;
                        number_limited?: boolean;
                        number_limit_mode?: "lowest" | "highest" | "range";
                        number_lowest_value?: number;
                        number_highest_value?: number;
                        number_integers_only?: boolean;
                        product_list_adjusts_inventory?: boolean;
                        product_list_adjusts_pricing?: boolean;
                        product_list_shipping_calc?: "none" | "weight" | "package";
                    };
                    sort_order?: number;
                    option_values?: ({
                        is_default?: boolean;
                        label: string;
                        sort_order: number;
                        value_data?: {
                            [key: string]: any;
                        };
                    } & {
                        id?: number;
                    })[];
                    image_url?: string;
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: responses["OptionResponse"];
            409: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    getOptionById: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                "Content-Type": unknown;
                Accept: unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["productOption_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    updateOption: {
        parameters: {
            body: {
                option: {
                    id?: number;
                    product_id?: number;
                    display_name?: string;
                    type?: "radio_buttons" | "rectangles" | "dropdown" | "product_list" | "product_list_with_images" | "swatch";
                    config?: {
                        default_value?: string;
                        checked_by_default?: boolean;
                        checkbox_label?: string;
                        date_limited?: boolean;
                        date_limit_mode?: "earliest" | "range" | "latest";
                        date_earliest_value?: string;
                        date_latest_value?: string;
                        file_types_mode?: "specific" | "all";
                        file_types_supported?: string[];
                        file_types_other?: string[];
                        file_max_size?: number;
                        text_characters_limited?: boolean;
                        text_min_length?: number;
                        text_max_length?: number;
                        text_lines_limited?: boolean;
                        text_max_lines?: number;
                        number_limited?: boolean;
                        number_limit_mode?: "lowest" | "highest" | "range";
                        number_lowest_value?: number;
                        number_highest_value?: number;
                        number_integers_only?: boolean;
                        product_list_adjusts_inventory?: boolean;
                        product_list_adjusts_pricing?: boolean;
                        product_list_shipping_calc?: "none" | "weight" | "package";
                    };
                    sort_order?: number;
                    option_values?: ({
                        is_default?: boolean;
                        label: string;
                        sort_order: number;
                        value_data?: {
                            [key: string]: any;
                        };
                    } & {
                        id?: number;
                    })[];
                    image_url?: string;
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        id?: number;
                        product_id?: number;
                        display_name?: string;
                        type?: "radio_buttons" | "rectangles" | "dropdown" | "product_list" | "product_list_with_images" | "swatch";
                        config?: {
                            default_value?: string;
                            checked_by_default?: boolean;
                            checkbox_label?: string;
                            date_limited?: boolean;
                            date_limit_mode?: "earliest" | "range" | "latest";
                            date_earliest_value?: string;
                            date_latest_value?: string;
                            file_types_mode?: "specific" | "all";
                            file_types_supported?: string[];
                            file_types_other?: string[];
                            file_max_size?: number;
                            text_characters_limited?: boolean;
                            text_min_length?: number;
                            text_max_length?: number;
                            text_lines_limited?: boolean;
                            text_max_lines?: number;
                            number_limited?: boolean;
                            number_limit_mode?: "lowest" | "highest" | "range";
                            number_lowest_value?: number;
                            number_highest_value?: number;
                            number_integers_only?: boolean;
                            product_list_adjusts_inventory?: boolean;
                            product_list_adjusts_pricing?: boolean;
                            product_list_shipping_calc?: "none" | "weight" | "package";
                        };
                        sort_order?: number;
                        option_values?: ({
                            is_default?: boolean;
                            label: string;
                            sort_order: number;
                            value_data?: {
                                [key: string]: any;
                            };
                        } & {
                            id?: number;
                        })[];
                        image_url?: string;
                    } & {
                        name?: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            409: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    deleteOptionById: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    getOptionValues: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: ({
                        is_default?: boolean;
                        label: string;
                        sort_order: number;
                        value_data?: {
                            [key: string]: any;
                        };
                    } & {
                        id?: number;
                    })[];
                    meta?: definitions["metaCollection_Full"];
                };
            };
        };
    };
    createOptionValue: {
        parameters: {
            body: {
                OptionValue: {
                    is_default?: boolean;
                    label: string;
                    sort_order: number;
                    value_data?: {
                        [key: string]: any;
                    };
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        is_default?: boolean;
                        label: string;
                        sort_order: number;
                        value_data?: {
                            [key: string]: any;
                        };
                    } & {
                        id?: number;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    getOptionValueById: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        is_default?: boolean;
                        label: string;
                        sort_order: number;
                        value_data?: {
                            [key: string]: any;
                        };
                    } & {
                        id?: number;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    updateOptionValue: {
        parameters: {
            body: {
                OptionValue: {
                    is_default?: boolean;
                    label: string;
                    sort_order: number;
                    value_data?: {
                        [key: string]: any;
                    };
                } & {
                    id?: number;
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        is_default?: boolean;
                        label: string;
                        sort_order: number;
                        value_data?: {
                            [key: string]: any;
                        };
                    } & {
                        id?: number;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    deleteOptionValueById: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    getModifiers: {
        parameters: {
            query: {
                page?: unknown;
                limit?: unknown;
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["productModifier_Full"][];
                    meta?: definitions["metaCollection_Full"];
                };
            };
        };
    };
    createModifier: {
        parameters: {
            body: {
                Modifier: {
                    type: "date" | "checkbox" | "file" | "text" | "multi_line_text" | "numbers_only_text" | "radio_buttons" | "rectangles" | "dropdown" | "product_list" | "product_list_with_images" | "swatch";
                    required: boolean;
                    sort_order?: number;
                    config?: {
                        default_value?: string;
                        checked_by_default?: boolean;
                        checkbox_label?: string;
                        date_limited?: boolean;
                        date_limit_mode?: "earliest" | "range" | "latest";
                        date_earliest_value?: string;
                        date_latest_value?: string;
                        file_types_mode?: "specific" | "all";
                        file_types_supported?: string[];
                        file_types_other?: string[];
                        file_max_size?: number;
                        text_characters_limited?: boolean;
                        text_min_length?: number;
                        text_max_length?: number;
                        text_lines_limited?: boolean;
                        text_max_lines?: number;
                        number_limited?: boolean;
                        number_limit_mode?: "lowest" | "highest" | "range";
                        number_lowest_value?: number;
                        number_highest_value?: number;
                        number_integers_only?: boolean;
                        product_list_adjusts_inventory?: boolean;
                        product_list_adjusts_pricing?: boolean;
                        product_list_shipping_calc?: "none" | "weight" | "package";
                    };
                    option_values?: (({
                        is_default?: boolean;
                        label: string;
                        sort_order: number;
                        value_data?: {
                            [key: string]: any;
                        };
                    } & {
                        adjusters?: {
                            price?: {
                                adjuster?: "relative" | "percentage";
                                adjuster_value?: number;
                            };
                            weight?: {
                                adjuster?: "relative" | "percentage";
                                adjuster_value?: number;
                            };
                            image_url?: string;
                            purchasing_disabled?: {
                                status?: boolean;
                                message?: string;
                            };
                        };
                    }) & {
                        id?: number;
                    })[];
                } & {
                    display_name: string;
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        type: "date" | "checkbox" | "file" | "text" | "multi_line_text" | "numbers_only_text" | "radio_buttons" | "rectangles" | "dropdown" | "product_list" | "product_list_with_images" | "swatch";
                        required: boolean;
                        sort_order?: number;
                        config?: {
                            default_value?: string;
                            checked_by_default?: boolean;
                            checkbox_label?: string;
                            date_limited?: boolean;
                            date_limit_mode?: "earliest" | "range" | "latest";
                            date_earliest_value?: string;
                            date_latest_value?: string;
                            file_types_mode?: "specific" | "all";
                            file_types_supported?: string[];
                            file_types_other?: string[];
                            file_max_size?: number;
                            text_characters_limited?: boolean;
                            text_min_length?: number;
                            text_max_length?: number;
                            text_lines_limited?: boolean;
                            text_max_lines?: number;
                            number_limited?: boolean;
                            number_limit_mode?: "lowest" | "highest" | "range";
                            number_lowest_value?: number;
                            number_highest_value?: number;
                            number_integers_only?: boolean;
                            product_list_adjusts_inventory?: boolean;
                            product_list_adjusts_pricing?: boolean;
                            product_list_shipping_calc?: "none" | "weight" | "package";
                        };
                        option_values?: (({
                            is_default?: boolean;
                            label: string;
                            sort_order: number;
                            value_data?: {
                                [key: string]: any;
                            };
                        } & {
                            adjusters?: {
                                price?: {
                                    adjuster?: "relative" | "percentage";
                                    adjuster_value?: number;
                                };
                                weight?: {
                                    adjuster?: "relative" | "percentage";
                                    adjuster_value?: number;
                                };
                                image_url?: string;
                                purchasing_disabled?: {
                                    status?: boolean;
                                    message?: string;
                                };
                            };
                        }) & {
                            id?: number;
                        })[];
                    } & {
                        id?: number;
                        product_id?: number;
                        name?: string;
                        display_name?: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            409: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    getModifierById: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["productModifier_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    updateModifier: {
        parameters: {
            body: {
                modifier: {
                    type: "date" | "checkbox" | "file" | "text" | "multi_line_text" | "numbers_only_text" | "radio_buttons" | "rectangles" | "dropdown" | "product_list" | "product_list_with_images" | "swatch";
                    required: boolean;
                    sort_order?: number;
                    config?: {
                        default_value?: string;
                        checked_by_default?: boolean;
                        checkbox_label?: string;
                        date_limited?: boolean;
                        date_limit_mode?: "earliest" | "range" | "latest";
                        date_earliest_value?: string;
                        date_latest_value?: string;
                        file_types_mode?: "specific" | "all";
                        file_types_supported?: string[];
                        file_types_other?: string[];
                        file_max_size?: number;
                        text_characters_limited?: boolean;
                        text_min_length?: number;
                        text_max_length?: number;
                        text_lines_limited?: boolean;
                        text_max_lines?: number;
                        number_limited?: boolean;
                        number_limit_mode?: "lowest" | "highest" | "range";
                        number_lowest_value?: number;
                        number_highest_value?: number;
                        number_integers_only?: boolean;
                        product_list_adjusts_inventory?: boolean;
                        product_list_adjusts_pricing?: boolean;
                        product_list_shipping_calc?: "none" | "weight" | "package";
                    };
                    option_values?: (({
                        is_default?: boolean;
                        label: string;
                        sort_order: number;
                        value_data?: {
                            [key: string]: any;
                        };
                    } & {
                        adjusters?: {
                            price?: {
                                adjuster?: "relative" | "percentage";
                                adjuster_value?: number;
                            };
                            weight?: {
                                adjuster?: "relative" | "percentage";
                                adjuster_value?: number;
                            };
                            image_url?: string;
                            purchasing_disabled?: {
                                status?: boolean;
                                message?: string;
                            };
                        };
                    }) & {
                        id?: number;
                    })[];
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        type: "date" | "checkbox" | "file" | "text" | "multi_line_text" | "numbers_only_text" | "radio_buttons" | "rectangles" | "dropdown" | "product_list" | "product_list_with_images" | "swatch";
                        required: boolean;
                        sort_order?: number;
                        config?: {
                            default_value?: string;
                            checked_by_default?: boolean;
                            checkbox_label?: string;
                            date_limited?: boolean;
                            date_limit_mode?: "earliest" | "range" | "latest";
                            date_earliest_value?: string;
                            date_latest_value?: string;
                            file_types_mode?: "specific" | "all";
                            file_types_supported?: string[];
                            file_types_other?: string[];
                            file_max_size?: number;
                            text_characters_limited?: boolean;
                            text_min_length?: number;
                            text_max_length?: number;
                            text_lines_limited?: boolean;
                            text_max_lines?: number;
                            number_limited?: boolean;
                            number_limit_mode?: "lowest" | "highest" | "range";
                            number_lowest_value?: number;
                            number_highest_value?: number;
                            number_integers_only?: boolean;
                            product_list_adjusts_inventory?: boolean;
                            product_list_adjusts_pricing?: boolean;
                            product_list_shipping_calc?: "none" | "weight" | "package";
                        };
                        option_values?: (({
                            is_default?: boolean;
                            label: string;
                            sort_order: number;
                            value_data?: {
                                [key: string]: any;
                            };
                        } & {
                            adjusters?: {
                                price?: {
                                    adjuster?: "relative" | "percentage";
                                    adjuster_value?: number;
                                };
                                weight?: {
                                    adjuster?: "relative" | "percentage";
                                    adjuster_value?: number;
                                };
                                image_url?: string;
                                purchasing_disabled?: {
                                    status?: boolean;
                                    message?: string;
                                };
                            };
                        }) & {
                            id?: number;
                        })[];
                    } & {
                        id?: number;
                        product_id?: number;
                        name?: string;
                        display_name?: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            409: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    deleteModifierById: {
        parameters: {
            header: {
                "Content-Type": unknown;
                Accept: unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    getModifierValues: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["productModifierOptionValue_Full"][];
                    meta?: definitions["metaCollection_Full"];
                };
            };
        };
    };
    createModifierValue: {
        parameters: {
            body: {
                ModifierValue: {
                    is_default?: boolean;
                    label: string;
                    sort_order: number;
                    value_data?: {
                        [key: string]: any;
                    };
                } & {
                    adjusters?: {
                        price?: {
                            adjuster?: "relative" | "percentage";
                            adjuster_value?: number;
                        };
                        weight?: {
                            adjuster?: "relative" | "percentage";
                            adjuster_value?: number;
                        };
                        image_url?: string;
                        purchasing_disabled?: {
                            status?: boolean;
                            message?: string;
                        };
                    };
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: ({
                        is_default?: boolean;
                        label: string;
                        sort_order: number;
                        value_data?: {
                            [key: string]: any;
                        };
                    } & {
                        adjusters?: {
                            price?: {
                                adjuster?: "relative" | "percentage";
                                adjuster_value?: number;
                            };
                            weight?: {
                                adjuster?: "relative" | "percentage";
                                adjuster_value?: number;
                            };
                            image_url?: string;
                            purchasing_disabled?: {
                                status?: boolean;
                                message?: string;
                            };
                        };
                    }) & {
                        id?: number;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    getModifierValueById: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["productModifierOptionValue_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    updateModifierValue: {
        parameters: {
            body: {
                ModifierValue: ({
                    is_default?: boolean;
                    label: string;
                    sort_order: number;
                    value_data?: {
                        [key: string]: any;
                    };
                } & {
                    adjusters?: {
                        price?: {
                            adjuster?: "relative" | "percentage";
                            adjuster_value?: number;
                        };
                        weight?: {
                            adjuster?: "relative" | "percentage";
                            adjuster_value?: number;
                        };
                        image_url?: string;
                        purchasing_disabled?: {
                            status?: boolean;
                            message?: string;
                        };
                    };
                }) & {
                    id?: number;
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: ({
                        is_default?: boolean;
                        label: string;
                        sort_order: number;
                        value_data?: {
                            [key: string]: any;
                        };
                    } & {
                        adjusters?: {
                            price?: {
                                adjuster?: "relative" | "percentage";
                                adjuster_value?: number;
                            };
                            weight?: {
                                adjuster?: "relative" | "percentage";
                                adjuster_value?: number;
                            };
                            image_url?: string;
                            purchasing_disabled?: {
                                status?: boolean;
                                message?: string;
                            };
                        };
                    }) & {
                        id?: number;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    deleteModifierValueById: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    createModifierImage: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
            formData: {
                image_file?: unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        image_url?: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    deleteModifierImage: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    getComplexRules: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["complexRule_Base"][];
                    meta?: definitions["metaCollection_Full"];
                };
            };
        };
    };
    createComplexRule: {
        parameters: {
            body: {
                ComplexRule: {
                    id?: number;
                    product_id?: number;
                    sort_order?: number;
                    enabled?: boolean;
                    stop?: boolean;
                    purchasing_disabled?: boolean;
                    purchasing_disabled_message?: string;
                    purchasing_hidden?: boolean;
                    image_url?: string;
                    price_adjuster?: {
                        adjuster?: "relative" | "percentage";
                        adjuster_value?: number;
                    };
                    weight_adjuster?: {
                        adjuster?: "relative" | "percentage";
                        adjuster_value?: number;
                    };
                    conditions?: {
                        id?: number;
                        rule_id?: number;
                        modifier_id: number;
                        modifier_value_id: number;
                        variant_id: number;
                        combination_id?: number;
                    }[];
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: responses["ComplexRuleResponse"];
            409: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    getComplexRuleById: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: responses["ComplexRuleResponse"];
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    updateComplexRule: {
        parameters: {
            body: {
                ComplexRule: {
                    id?: number;
                    product_id?: number;
                    sort_order?: number;
                    enabled?: boolean;
                    stop?: boolean;
                    purchasing_disabled?: boolean;
                    purchasing_disabled_message?: string;
                    purchasing_hidden?: boolean;
                    image_url?: string;
                    price_adjuster?: {
                        adjuster?: "relative" | "percentage";
                        adjuster_value?: number;
                    };
                    weight_adjuster?: {
                        adjuster?: "relative" | "percentage";
                        adjuster_value?: number;
                    };
                    conditions?: {
                        id?: number;
                        rule_id?: number;
                        modifier_id: number;
                        modifier_value_id: number;
                        variant_id: number;
                        combination_id?: number;
                    }[];
                };
            };
        };
        responses: {
            200: responses["ComplexRuleResponse"];
            409: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    deleteComplexRuleById: {
        parameters: {
            header: {
                "Content-Type": unknown;
                Accept: unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    getCustomFields: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
                page?: unknown;
                limit?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        id?: number;
                        name: string;
                        value: string;
                    }[];
                    meta?: definitions["metaCollection_Full"];
                };
            };
        };
    };
    createCustomField: {
        parameters: {
            body: {
                CustomField: {
                    id?: number;
                    name: string;
                    value: string;
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        id?: number;
                        name: string;
                        value: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    getCustomFieldById: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["productCustomField_Base"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    updateCustomField: {
        parameters: {
            body: {
                CustomField: {
                    id?: number;
                    name: string;
                    value: string;
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        id?: number;
                        name: string;
                        value: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    deleteCustomFieldById: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    getBulkPricingRules: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
                page?: unknown;
                limit?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["bulkPricingRule_Full"][];
                    meta?: definitions["metaCollection_Full"];
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    createBulkPricingRule: {
        parameters: {
            body: {
                BulkPricingRule: definitions["bulkPricingRule_Full"];
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["bulkPricingRule_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
            409: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    getBulkPricingRuleById: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["bulkPricingRule_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    updateBulkPricingRule: {
        parameters: {
            body: {
                BulkPricingRule: definitions["bulkPricingRule_Full"];
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        id?: number;
                        quantity_min: number;
                        quantity_max: number;
                        type: "price" | "percent" | "fixed";
                        amount: number;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
            409: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    deleteBulkPricingRuleById: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    getProductMetafieldsByProductId: {
        parameters: {
            query: {
                page?: unknown;
                limit?: unknown;
                key?: unknown;
                namespace?: unknown;
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["metafield_Full"][];
                    meta?: definitions["metaCollection_Full"];
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    createProductMetafield: {
        parameters: {
            body: {
                Metafield: definitions["metafield_Post"];
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["metafield_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            409: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    getProductMetafieldByProductId: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["metafield_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    updateProductMetafield: {
        parameters: {
            body: {
                Metafield: definitions["metafield_Put"];
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        id?: number;
                        permission_set: "app_only" | "read" | "write" | "read_and_sf_access" | "write_and_sf_access";
                        namespace: string;
                        key: string;
                        value: string;
                        description?: string;
                        resource_type?: "category" | "brand" | "product" | "variant";
                        resource_id?: number;
                        created_at?: string;
                        updated_at?: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    deleteProductMetafieldById: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    getProductReviews: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
                page?: unknown;
                limit?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: ({
                        title: string;
                        text?: string;
                        status?: string;
                        rating?: number;
                        email?: string;
                        name?: string;
                        date_reviewed: string;
                    } & {
                        id?: number;
                        product_id?: number;
                        date_created?: string;
                        date_modified?: string;
                    })[];
                    meta?: definitions["metaCollection_Full"];
                };
            };
            204: never;
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    createProductReview: {
        parameters: {
            body: {
                productReview: {
                    title: string;
                    text?: string;
                    status?: string;
                    rating?: number;
                    email?: string;
                    name?: string;
                    date_reviewed: string;
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        title: string;
                        text?: string;
                        status?: string;
                        rating?: number;
                        email?: string;
                        name?: string;
                        date_reviewed: string;
                    } & {
                        id?: number;
                        product_id?: number;
                        date_created?: string;
                        date_modified?: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    getProductReviewById: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        title: string;
                        text?: string;
                        status?: string;
                        rating?: number;
                        email?: string;
                        name?: string;
                        date_reviewed: string;
                    } & {
                        id?: number;
                        product_id?: number;
                        date_created?: string;
                        date_modified?: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    updateProductReview: {
        parameters: {
            body: {
                productReview: {
                    title: string;
                    text?: string;
                    status?: string;
                    rating?: number;
                    email?: string;
                    name?: string;
                    date_reviewed: string;
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        title: string;
                        text?: string;
                        status?: string;
                        rating?: number;
                        email?: string;
                        name?: string;
                        date_reviewed: string;
                    } & {
                        id?: number;
                        product_id?: number;
                        date_created?: string;
                        date_modified?: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    deleteProductReview: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    getCategories: {
        parameters: {
            query: {
                name?: unknown;
                parent_id?: unknown;
                page_title?: unknown;
                keyword?: unknown;
                is_visible?: unknown;
                page?: unknown;
                limit?: unknown;
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: responses["CategoryCollectionResponse"];
        };
    };
    createCategory: {
        parameters: {
            body: {
                category: {
                    id?: number;
                    parent_id: number;
                    name: string;
                    description?: string;
                    views?: number;
                    sort_order?: number;
                    page_title?: string;
                    search_keywords?: string;
                    meta_keywords?: string[];
                    meta_description?: string;
                    layout_file?: string;
                    is_visible?: boolean;
                    default_product_sort?: "use_store_settings" | "featured" | "newest" | "best_selling" | "alpha_asc" | "alpha_desc" | "avg_customer_review" | "price_asc" | "price_desc";
                    image_url?: string;
                    custom_url?: {
                        url?: string;
                        is_customized?: boolean;
                    };
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: responses["CategoryResponse"];
            409: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    deleteCategories: {
        parameters: {
            query: {
                name?: unknown;
                parent_id?: unknown;
                page_title?: unknown;
                keyword?: unknown;
                is_visible?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    getCategoryById: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["category_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    updateCategory: {
        parameters: {
            body: {
                category: {
                    id?: number;
                    parent_id: number;
                    name: string;
                    description?: string;
                    views?: number;
                    sort_order?: number;
                    page_title?: string;
                    search_keywords?: string;
                    meta_keywords?: string[];
                    meta_description?: string;
                    layout_file?: string;
                    is_visible?: boolean;
                    default_product_sort?: "use_store_settings" | "featured" | "newest" | "best_selling" | "alpha_asc" | "alpha_desc" | "avg_customer_review" | "price_asc" | "price_desc";
                    image_url?: string;
                    custom_url?: {
                        url?: string;
                        is_customized?: boolean;
                    };
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        id?: number;
                        parent_id: number;
                        name: string;
                        description?: string;
                        views?: number;
                        sort_order?: number;
                        page_title?: string;
                        search_keywords?: string;
                        meta_keywords?: string[];
                        meta_description?: string;
                        layout_file?: string;
                        is_visible?: boolean;
                        default_product_sort?: "use_store_settings" | "featured" | "newest" | "best_selling" | "alpha_asc" | "alpha_desc" | "avg_customer_review" | "price_asc" | "price_desc";
                        image_url?: string;
                        custom_url?: {
                            url?: string;
                            is_customized?: boolean;
                        };
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
            409: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    deleteCategoryById: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    getCategoryMetafieldsByCategoryId: {
        parameters: {
            query: {
                page?: unknown;
                limit?: unknown;
                key?: unknown;
                namespace?: unknown;
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["metafield_Full"][];
                    meta?: definitions["metaCollection_Full"];
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    createCategoryMetafield: {
        parameters: {
            body: {
                Metafield: definitions["metafield_Post"];
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        id?: number;
                        permission_set: "app_only" | "read" | "write" | "read_and_sf_access" | "write_and_sf_access";
                        namespace: string;
                        key: string;
                        value: string;
                        description?: string;
                        resource_type?: "category" | "brand" | "product" | "variant";
                        resource_id?: number;
                        created_at?: string;
                        updated_at?: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            409: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    getCategoryMetafieldByCategoryId: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["metafield_Base"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    updateCategoryMetafield: {
        parameters: {
            body: {
                Metafield: definitions["metafield_Put"];
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["metafield_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    deleteCategoryMetafieldById: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    createCategoryImage: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
            formData: {
                image_file?: unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        image_url?: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    deleteCategoryImage: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    getCategoryTree: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: definitions["categoriesTree_Resp"];
            };
        };
    };
    getBrands: {
        parameters: {
            query: {
                name?: unknown;
                page_title?: unknown;
                page?: unknown;
                limit?: unknown;
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["brand_Full"][];
                    meta?: definitions["metaCollection_Full"];
                };
            };
        };
    };
    createBrand: {
        parameters: {
            body: {
                Brand: {
                    id?: number;
                    name: string;
                    page_title?: string;
                    meta_keywords?: string[];
                    meta_description?: string;
                    search_keywords?: string;
                    image_url?: string;
                    custom_url?: {
                        url?: string;
                        is_customized?: boolean;
                    };
                };
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        id?: number;
                        name: string;
                        page_title?: string;
                        meta_keywords?: string[];
                        meta_description?: string;
                        search_keywords?: string;
                        image_url?: string;
                        custom_url?: {
                            url?: string;
                            is_customized?: boolean;
                        };
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            409: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    deleteBrands: {
        parameters: {
            query: {
                name?: unknown;
                page_title?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    getBrandById: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                "Content-Type": unknown;
                Accept: unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["brand_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    updateBrand: {
        parameters: {
            body: {
                brand: {
                    id?: number;
                    name: string;
                    page_title?: string;
                    meta_keywords?: string[];
                    meta_description?: string;
                    search_keywords?: string;
                    image_url?: string;
                    custom_url?: {
                        url?: string;
                        is_customized?: boolean;
                    };
                };
            };
            header: {
                "Content-Type": unknown;
                Accept: unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        id?: number;
                        name: string;
                        page_title?: string;
                        meta_keywords?: string[];
                        meta_description?: string;
                        search_keywords?: string;
                        image_url?: string;
                        custom_url?: {
                            url?: string;
                            is_customized?: boolean;
                        };
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
            409: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    deleteBrandById: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    getBrandMetafieldsByBrandId: {
        parameters: {
            query: {
                page?: unknown;
                limit?: unknown;
                key?: unknown;
                namespace?: unknown;
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                "Content-Type": unknown;
                Accept: unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["metafield_Full"][];
                    meta?: definitions["metaCollection_Full"];
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    createBrandMetafield: {
        parameters: {
            body: {
                Metafield: definitions["metafield_Post"];
            };
            header: {
                "Content-Type": unknown;
                Accept: unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        [key: string]: any;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            409: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    getBrandMetafieldByBrandId: {
        parameters: {
            query: {
                include_fields?: unknown;
                exclude_fields?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["metafield_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    updateBrandMetafield: {
        parameters: {
            body: {
                Metafield: definitions["metafield_Put"];
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: definitions["metafield_Full"];
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    deleteBrandMetafieldById: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    createBrandImage: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
            formData: {
                image_file?: unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        image_url?: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                } & {
                    errors?: {
                        additionalProperties?: string;
                    };
                };
            };
        };
    };
    deleteBrandImage: {
        parameters: {
            header: {
                "Content-Type": unknown;
                Accept: unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    getVariants: {
        parameters: {
            query: {
                id?: unknown;
                sku?: unknown;
                page?: unknown;
                limit?: unknown;
                include_fields?: unknown;
                exclude_fields?: unknown;
                product_id?: unknown;
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: ({
                        cost_price?: number;
                        price?: number;
                        sale_price?: number;
                        retail_price?: number;
                        weight?: number;
                        width?: number;
                        height?: number;
                        depth?: number;
                        is_free_shipping?: boolean;
                        fixed_cost_shipping_price?: number;
                        purchasing_disabled?: boolean;
                        purchasing_disabled_message?: string;
                        upc?: string;
                        inventory_level?: number;
                        inventory_warning_level?: number;
                        bin_picking_number?: string;
                    } & {
                        id?: number;
                        product_id?: number;
                        sku?: string;
                        sku_id?: number;
                        option_values?: ({
                            option_display_name?: string;
                            label?: string;
                        } & {
                            id?: number;
                            option_id?: number;
                        })[];
                        calculated_price?: number;
                    })[];
                    meta?: definitions["metaCollection_Full"];
                };
            };
            404: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                };
            };
        };
    };
    updateVariantsBatch: {
        parameters: {
            body: {
                body: ({
                    cost_price?: number;
                    price?: number;
                    sale_price?: number;
                    retail_price?: number;
                    weight?: number;
                    width?: number;
                    height?: number;
                    depth?: number;
                    is_free_shipping?: boolean;
                    fixed_cost_shipping_price?: number;
                    purchasing_disabled?: boolean;
                    purchasing_disabled_message?: string;
                    upc?: string;
                    inventory_level?: number;
                    inventory_warning_level?: number;
                    bin_picking_number?: string;
                } & {
                    id?: number;
                })[];
            };
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: ({
                        cost_price?: number;
                        price?: number;
                        sale_price?: number;
                        retail_price?: number;
                        weight?: number;
                        width?: number;
                        height?: number;
                        depth?: number;
                        is_free_shipping?: boolean;
                        fixed_cost_shipping_price?: number;
                        purchasing_disabled?: boolean;
                        purchasing_disabled_message?: string;
                        upc?: string;
                        inventory_level?: number;
                        inventory_warning_level?: number;
                        bin_picking_number?: string;
                    } & {
                        id?: number;
                        product_id?: number;
                        sku?: string;
                        sku_id?: number;
                        option_values?: ({
                            option_display_name?: string;
                            label?: string;
                        } & {
                            id?: number;
                            option_id?: number;
                        })[];
                        calculated_price?: number;
                    })[];
                    meta?: {
                        pagination?: {
                            total?: number;
                            count?: number;
                            per_page?: number;
                            current_page?: number;
                            total_pages?: number;
                            links?: {
                                previous?: string;
                                current?: string;
                                next?: string;
                            };
                        };
                    };
                };
            };
            413: unknown;
            422: {
                schema: {
                    batch_errors?: ({
                        status?: number;
                        title?: string;
                        type?: string;
                        instance?: string;
                    } & {
                        errors?: {
                            additionalProperties?: string;
                        };
                    })[];
                };
            };
        };
    };
    getCatalogSummary: {
        parameters: {
            header: {
                Accept: unknown;
                "Content-Type": unknown;
            };
        };
        responses: {
            200: {
                schema: {
                    data?: {
                        inventory_count?: number;
                        inventory_value?: number;
                        primary_category_id?: number;
                        primary_category_name?: string;
                        variant_count?: number;
                        highest_variant_price?: number;
                        average_variant_price?: number;
                        lowest_variant_price?: string;
                        oldest_variant_date?: string;
                        newest_variant_date?: string;
                    };
                    meta?: {
                        [key: string]: any;
                    };
                };
            };
        };
    };
}
