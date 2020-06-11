import * as credentials from './credentials';
import { Config } from '../config';
import { BigCommerceActionFactory } from './action';
import { Action, Field } from '../action';

export type ConfigSchema = {
    credentials: credentials.ConfigSchema,
};

export function getActions(config: Config<ConfigSchema>): Record<string, Action[]> {
    const actionFactory = new BigCommerceActionFactory(config);
    return {
        creds: credentials.getActions(config.select('credentials')),
        ...getV2Actions(actionFactory),
        ...getV3Actions(actionFactory),
    };
}

function getV2Actions(action: BigCommerceActionFactory): Record<string, Action[]> {
    return {
        'blog-post': action.crud('v2/blog/post'),

        'blog-tag': action.crud('v2/blog/tag'),

        country: action.read('v2/countries'),

        coupon: action.read('v2/coupons'),

        currency: action.read('v2/currencies'),

        'customer-group': action.crud('v2/customer_groups'),

        order: action.crud('v2/orders'),

        'order-coupon': [action.list('v2/orders/{order_id}/coupons')],

        'order-product': [action.list('v2/orders/{order_id}/products')],

        'order-shipping-address': [action.list('v2/orders/{order_id}/shippingaddresses')],

        store: [action.get('v2/store')],

        'tax-class': action.read('v2/tax_classes'),

        'webhook': action.crud('v2/hooks'),
    };
}

function getV3Actions(action: BigCommerceActionFactory): Record<string, Action[]> {
    return {
        brand: action.crud('v3/catalog/brands'),

        'brand-image': [
            action.create('v3/catalog/brands/{brand_id}/image'),
            action.delete('v3/catalog/brands/{brand_id}/image'),
        ],

        'brand-metafield': action.crud('v3/catalog/brands/{brand_id}/metafields'),

        category: [
            ...action.crud('v3/catalog/categories'),
            
            action.source({
                name: 'get-tree',
                fn: bc => async function* () { yield* await bc.get('v3/catalog/categories/tree') },
            }),
        ],

        'category-image': [
            action.create('v3/catalog/categories/{category_id}/image'),
            action.delete('v3/catalog/categories/{category_id}/image'),
        ],

        'category-metafield': action.crud('v3/catalog/categories/{category_id}/metafields'),

        channel: action.crud('v3/channel', {delete: false}),

        customer: action.crud('v3/customers'),
        
        'customer-address': action.crud('v3/customers/addresses'),

        'gift-certificate': action.crud('v3/gift_certificates'),

        'payment-method': [action.list('v3/payments/methods')],

        // 'price-list-record': todo: this would be useful, but it requires bespoke sources and sinks

        product: [
            action.source({
                name: 'get',
                params: {
                    id: Field.integer().required(),
                    include: Field.string().default('variants,images,custom_fields,bulk_pricing_rules,primary_image,modifiers,options,videos'),
                    includes: Field.boolean().default(true),
                },
                fn: bigCommerce => ({id, includes, include}) => bigCommerce.get(`v3/catalog/products/${id}`, includes ? {include} : {}),
            }),

            action.source({
                name: 'list',
                params: {
                    include: Field.string().default('variants,images,custom_fields,bulk_pricing_rules,primary_image,modifiers,options,videos'),
                    includes: Field.boolean().default(true),
                },
                fn: bigCommerce => ({includes, include}) => bigCommerce.list(`v3/catalog/products`, includes ? {include} : {}),
            }),

            ...action.write('v3/catalog/products'),
        ],

        'product-bulk-pricing-rule': action.crud('v3/catalog/products/{product_id}/bulk-pricing-rules'),

        'product-complex-rule': action.crud('v3/catalog/products/{product_id}/complex-rules'),

        'product-custom-field': action.crud('v3/catalog/products/{product_id}/custom-fields'),

        'product-image': action.crud('v3/catalog/products/{product_id}/images'),

        'product-metafield': action.crud('v3/catalog/products/{product_id}/metafields'),

        'product-modifier': action.crud('v3/catalog/products/{product_id}/modifiers'),

        'product-modifier-image': [
            action.create('v3/catalog/products/{product_id}/modifiers/{modifier_id}/values/{value_id}/image'),
            action.delete('v3/catalog/products/{product_id}/modifiers/{modifier_id}/values/{value_id}/image'),
        ],

        'product-modifier-value': action.crud('v3/catalog/products/{product_id}/modifiers/{modifier_id}/values'),

        'product-option': action.crud('v3/catalog/products/{product_id}/options'),

        'product-option-value': action.crud('v3/catalog/products/{product_id}/options/{option_id}/values'),

        'product-review': action.crud('v3/catalog/products/{product_id}/reviews'),

        'product-variant': action.crud('v3/catalog/products/{product_id}/variants'),

        'product-variant-metafield': action.crud('v3/catalog/products/{product_id}/variants/{variant_id}/metafields'),

        'product-video': action.crud('v3/catalog/products/{product_id}/videos'),

        'redirect': action.crud('v3/storefront/redirects'),

        'script': action.crud('v3/content/scripts'),

        'site': action.crud('v3/sites'),

        'subscriber': action.crud('v3/customers/subscribers'),

        'theme': action.crud('v3/themes'),

        'variant': [action.list('v3/catalog/variants')],

        'widget': action.crud('v3/content/widgets'),

        'widget-placement': action.crud('v3/content/placements'),

        'widget-region': action.crud('v3/content/regions'),

        'widget-template': action.crud('v3/content/widget-templates'),

        'wishlist': action.crud('v3/wishlists'),
    };
}
