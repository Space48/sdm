// these types exist for reference purposes only -- they are not used at all by sdm

type Customer = {
  id: number,
  group_id: number,
  default_billing: string,
  default_shipping: string,
  confirmation: string,
  created_at: string,
  updated_at: string,
  created_in: string,
  dob: string,
  email: string,
  firstname: string,
  lastname: string,
  middlename: string,
  prefix: string,
  suffix: string,
  gender: number,
  store_id: number,
  taxvat: string,
  website_id: number,
  addresses: Array<{
    id: number,
    customer_id: number,
    region: {
      region_code: string,
      region: string,
      region_id: number,
      extension_attributes: {}
    },
    region_id: number,
    country_id: string,
    street: Array<string>,
    company: string,
    telephone: string,
    fax: string,
    postcode: string,
    city: string,
    firstname: string,
    lastname: string,
    middlename: string,
    prefix: string,
    suffix: string,
    vat_id: string,
    default_shipping: boolean,
    default_billing: boolean,
    extension_attributes: {},
    custom_attributes: Array<{
      attribute_code: string,
      value: string
    }>
  }>,
  disable_auto_group_change: number,
  extension_attributes: {
    company_attributes: {
      customer_id: number,
      company_id: number,
      job_title: string,
      status: number,
      telephone: string,
      extension_attributes: {}
    },
    is_subscribed: boolean,
    amazon_id: string,
    vertex_customer_code: string
  },
  custom_attributes: Array<{
    attribute_code: string,
    value: string
  }>
};

type Order = {
  adjustment_negative: number,
  adjustment_positive: number,
  applied_rule_ids: string,
  base_adjustment_negative: number,
  base_adjustment_positive: number,
  base_currency_code: string,
  base_discount_amount: number,
  base_discount_canceled: number,
  base_discount_invoiced: number,
  base_discount_refunded: number,
  base_grand_total: number,
  base_discount_tax_compensation_amount: number,
  base_discount_tax_compensation_invoiced: number,
  base_discount_tax_compensation_refunded: number,
  base_shipping_amount: number,
  base_shipping_canceled: number,
  base_shipping_discount_amount: number,
  base_shipping_discount_tax_compensation_amnt: number,
  base_shipping_incl_tax: number,
  base_shipping_invoiced: number,
  base_shipping_refunded: number,
  base_shipping_tax_amount: number,
  base_shipping_tax_refunded: number,
  base_subtotal: number,
  base_subtotal_canceled: number,
  base_subtotal_incl_tax: number,
  base_subtotal_invoiced: number,
  base_subtotal_refunded: number,
  base_tax_amount: number,
  base_tax_canceled: number,
  base_tax_invoiced: number,
  base_tax_refunded: number,
  base_total_canceled: number,
  base_total_due: number,
  base_total_invoiced: number,
  base_total_invoiced_cost: number,
  base_total_offline_refunded: number,
  base_total_online_refunded: number,
  base_total_paid: number,
  base_total_qty_ordered: number,
  base_total_refunded: number,
  base_to_global_rate: number,
  base_to_order_rate: number,
  billing_address_id: number,
  can_ship_partially: number,
  can_ship_partially_item: number,
  coupon_code: string,
  created_at: string,
  customer_dob: string,
  customer_email: string,
  customer_firstname: string,
  customer_gender: number,
  customer_group_id: number,
  customer_id: number,
  customer_is_guest: number,
  customer_lastname: string,
  customer_middlename: string,
  customer_note: string,
  customer_note_notify: number,
  customer_prefix: string,
  customer_suffix: string,
  customer_taxvat: string,
  discount_amount: number,
  discount_canceled: number,
  discount_description: string,
  discount_invoiced: number,
  discount_refunded: number,
  edit_increment: number,
  email_sent: number,
  entity_id: number,
  ext_customer_id: string,
  ext_order_id: string,
  forced_shipment_with_invoice: number,
  global_currency_code: string,
  grand_total: number,
  discount_tax_compensation_amount: number,
  discount_tax_compensation_invoiced: number,
  discount_tax_compensation_refunded: number,
  hold_before_state: string,
  hold_before_status: string,
  increment_id: string,
  is_virtual: number,
  order_currency_code: string,
  original_increment_id: string,
  payment_authorization_amount: number,
  payment_auth_expiration: number,
  protect_code: string,
  quote_address_id: number,
  quote_id: number,
  relation_child_id: string,
  relation_child_real_id: string,
  relation_parent_id: string,
  relation_parent_real_id: string,
  remote_ip: string,
  shipping_amount: number,
  shipping_canceled: number,
  shipping_description: string,
  shipping_discount_amount: number,
  shipping_discount_tax_compensation_amount: number,
  shipping_incl_tax: number,
  shipping_invoiced: number,
  shipping_refunded: number,
  shipping_tax_amount: number,
  shipping_tax_refunded: number,
  state: string,
  status: string,
  store_currency_code: string,
  store_id: number,
  store_name: string,
  store_to_base_rate: number,
  store_to_order_rate: number,
  subtotal: number,
  subtotal_canceled: number,
  subtotal_incl_tax: number,
  subtotal_invoiced: number,
  subtotal_refunded: number,
  tax_amount: number,
  tax_canceled: number,
  tax_invoiced: number,
  tax_refunded: number,
  total_canceled: number,
  total_due: number,
  total_invoiced: number,
  total_item_count: number,
  total_offline_refunded: number,
  total_online_refunded: number,
  total_paid: number,
  total_qty_ordered: number,
  total_refunded: number,
  updated_at: string,
  weight: number,
  x_forwarded_for: string,
  items: Array<OrderItem>,
  billing_address: OrderAddress,
  payment: {
    account_status: string,
    additional_data: string,
    additional_information: Array<string>,
    address_status: string,
    amount_authorized: number,
    amount_canceled: number,
    amount_ordered: number,
    amount_paid: number,
    amount_refunded: number,
    anet_trans_method: string,
    base_amount_authorized: number,
    base_amount_canceled: number,
    base_amount_ordered: number,
    base_amount_paid: number,
    base_amount_paid_online: number,
    base_amount_refunded: number,
    base_amount_refunded_online: number,
    base_shipping_amount: number,
    base_shipping_captured: number,
    base_shipping_refunded: number,
    cc_approval: string,
    cc_avs_status: string,
    cc_cid_status: string,
    cc_debug_request_body: string,
    cc_debug_response_body: string,
    cc_debug_response_serialized: string,
    cc_exp_month: string,
    cc_exp_year: string,
    cc_last4: string,
    cc_number_enc: string,
    cc_owner: string,
    cc_secure_verify: string,
    cc_ss_issue: string,
    cc_ss_start_month: string,
    cc_ss_start_year: string,
    cc_status: string,
    cc_status_description: string,
    cc_trans_id: string,
    cc_type: string,
    echeck_account_name: string,
    echeck_account_type: string,
    echeck_bank_name: string,
    echeck_routing_number: string,
    echeck_type: string,
    entity_id: number,
    last_trans_id: string,
    method: string,
    parent_id: number,
    po_number: string,
    protection_eligibility: string,
    quote_payment_id: number,
    shipping_amount: number,
    shipping_captured: number,
    shipping_refunded: number,
    extension_attributes: {
      vault_payment_token: {
        entity_id: number,
        customer_id: number,
        public_hash: string,
        payment_method_code: string,
        type: string,
        created_at: string,
        expires_at: string,
        gateway_token: string,
        token_details: string,
        is_active: boolean,
        is_visible: boolean
      }
    }
  },
  status_histories: Array<{
      comment: string,
      created_at: string,
      entity_id: number,
      entity_name: string,
      is_customer_notified: number,
      is_visible_on_front: number,
      parent_id: number,
      status: string,
      extension_attributes: {}
    }>,
  extension_attributes: {
    shipping_assignments: Array<{
        shipping: {
          address: OrderAddress,
          method: string,
          total: {
            base_shipping_amount: number,
            base_shipping_canceled: number,
            base_shipping_discount_amount: number,
            base_shipping_discount_tax_compensation_amnt: number,
            base_shipping_incl_tax: number,
            base_shipping_invoiced: number,
            base_shipping_refunded: number,
            base_shipping_tax_amount: number,
            base_shipping_tax_refunded: number,
            shipping_amount: number,
            shipping_canceled: number,
            shipping_discount_amount: number,
            shipping_discount_tax_compensation_amount: number,
            shipping_incl_tax: number,
            shipping_invoiced: number,
            shipping_refunded: number,
            shipping_tax_amount: number,
            shipping_tax_refunded: number,
            extension_attributes: {}
          },
          extension_attributes: {
            ext_order_id: string,
            shipping_experience: {
              label: string,
              code: string,
              cost: number
            },
            collection_point: {
              recipient_address_id: number,
              collection_point_id: string,
              name: string,
              country: string,
              region: string,
              postcode: string,
              city: string,
              street: Array<string>
            }
          }
        },
        items: Array<OrderItem>,
        stock_id: number,
        extension_attributes: {}
      }>,
    payment_additional_info: Array<{
        key: string,
        value: string
      }>,
    applied_taxes: Array<{
        code: string,
        title: string,
        percent: number,
        amount: number,
        base_amount: number,
        extension_attributes: {
          rates: Array<{
              code: string,
              title: string,
              percent: number,
              extension_attributes: {}
            }>
        }
      }>,
    item_applied_taxes: Array<{
        type: string,
        item_id: number,
        associated_item_id: number,
        applied_taxes: Array<{
            code: string,
            title: string,
            percent: number,
            amount: number,
            base_amount: number,
            extension_attributes: {
              rates: Array<{
                  code: string,
                  title: string,
                  percent: number,
                  extension_attributes: {}
                }>
            }
          }>,
        extension_attributes: {}
      }>,
    converting_from_quote: boolean,
    company_order_attributes: {
      order_id: number,
      company_id: number,
      company_name: string,
      extension_attributes: {}
    },
    base_customer_balance_amount: number,
    customer_balance_amount: number,
    base_customer_balance_invoiced: number,
    customer_balance_invoiced: number,
    base_customer_balance_refunded: number,
    customer_balance_refunded: number,
    base_customer_balance_total_refunded: number,
    customer_balance_total_refunded: number,
    gift_cards: Array<{
        id: number,
        code: string,
        amount: number,
        base_amount: number
      }>,
    base_gift_cards_amount: number,
    gift_cards_amount: number,
    base_gift_cards_invoiced: number,
    gift_cards_invoiced: number,
    base_gift_cards_refunded: number,
    gift_cards_refunded: number,
    gift_message: {
      gift_message_id: number,
      customer_id: number,
      sender: string,
      recipient: string,
      message: string,
      extension_attributes: {
        entity_id: string,
        entity_type: string,
        wrapping_id: number,
        wrapping_allow_gift_receipt: boolean,
        wrapping_add_printed_card: boolean
      }
    },
    gw_id: string,
    gw_allow_gift_receipt: string,
    gw_add_card: string,
    gw_base_price: string,
    gw_price: string,
    gw_items_base_price: string,
    gw_items_price: string,
    gw_card_base_price: string,
    gw_card_price: string,
    gw_base_tax_amount: string,
    gw_tax_amount: string,
    gw_items_base_tax_amount: string,
    gw_items_tax_amount: string,
    gw_card_base_tax_amount: string,
    gw_card_tax_amount: string,
    gw_base_price_incl_tax: string,
    gw_price_incl_tax: string,
    gw_items_base_price_incl_tax: string,
    gw_items_price_incl_tax: string,
    gw_card_base_price_incl_tax: string,
    gw_card_price_incl_tax: string,
    gw_base_price_invoiced: string,
    gw_price_invoiced: string,
    gw_items_base_price_invoiced: string,
    gw_items_price_invoiced: string,
    gw_card_base_price_invoiced: string,
    gw_card_price_invoiced: string,
    gw_base_tax_amount_invoiced: string,
    gw_tax_amount_invoiced: string,
    gw_items_base_tax_invoiced: string,
    gw_items_tax_invoiced: string,
    gw_card_base_tax_invoiced: string,
    gw_card_tax_invoiced: string,
    gw_base_price_refunded: string,
    gw_price_refunded: string,
    gw_items_base_price_refunded: string,
    gw_items_price_refunded: string,
    gw_card_base_price_refunded: string,
    gw_card_price_refunded: string,
    gw_base_tax_amount_refunded: string,
    gw_tax_amount_refunded: string,
    gw_items_base_tax_refunded: string,
    gw_items_tax_refunded: string,
    gw_card_base_tax_refunded: string,
    gw_card_tax_refunded: string,
    reward_points_balance: number,
    reward_currency_amount: number,
    base_reward_currency_amount: number,
    amazon_order_reference_id: string
  }
};

type OrderItem = {
  additional_data: string,
  amount_refunded: number,
  applied_rule_ids: string,
  base_amount_refunded: number,
  base_cost: number,
  base_discount_amount: number,
  base_discount_invoiced: number,
  base_discount_refunded: number,
  base_discount_tax_compensation_amount: number,
  base_discount_tax_compensation_invoiced: number,
  base_discount_tax_compensation_refunded: number,
  base_original_price: number,
  base_price: number,
  base_price_incl_tax: number,
  base_row_invoiced: number,
  base_row_total: number,
  base_row_total_incl_tax: number,
  base_tax_amount: number,
  base_tax_before_discount: number,
  base_tax_invoiced: number,
  base_tax_refunded: number,
  base_weee_tax_applied_amount: number,
  base_weee_tax_applied_row_amnt: number,
  base_weee_tax_disposition: number,
  base_weee_tax_row_disposition: number,
  created_at: string,
  description: string,
  discount_amount: number,
  discount_invoiced: number,
  discount_percent: number,
  discount_refunded: number,
  event_id: number,
  ext_order_item_id: string,
  free_shipping: number,
  gw_base_price: number,
  gw_base_price_invoiced: number,
  gw_base_price_refunded: number,
  gw_base_tax_amount: number,
  gw_base_tax_amount_invoiced: number,
  gw_base_tax_amount_refunded: number,
  gw_id: number,
  gw_price: number,
  gw_price_invoiced: number,
  gw_price_refunded: number,
  gw_tax_amount: number,
  gw_tax_amount_invoiced: number,
  gw_tax_amount_refunded: number,
  discount_tax_compensation_amount: number,
  discount_tax_compensation_canceled: number,
  discount_tax_compensation_invoiced: number,
  discount_tax_compensation_refunded: number,
  is_qty_decimal: number,
  is_virtual: number,
  item_id: number,
  locked_do_invoice: number,
  locked_do_ship: number,
  name: string,
  no_discount: number,
  order_id: number,
  original_price: number,
  parent_item_id: number,
  price: number,
  price_incl_tax: number,
  product_id: number,
  product_type: string,
  qty_backordered: number,
  qty_canceled: number,
  qty_invoiced: number,
  qty_ordered: number,
  qty_refunded: number,
  qty_returned: number,
  qty_shipped: number,
  quote_item_id: number,
  row_invoiced: number,
  row_total: number,
  row_total_incl_tax: number,
  row_weight: number,
  sku: string,
  store_id: number,
  tax_amount: number,
  tax_before_discount: number,
  tax_canceled: number,
  tax_invoiced: number,
  tax_percent: number,
  tax_refunded: number,
  updated_at: string,
  weee_tax_applied: string,
  weee_tax_applied_amount: number,
  weee_tax_applied_row_amount: number,
  weee_tax_disposition: number,
  weee_tax_row_disposition: number,
  weight: number,
  product_option: {
    extension_attributes: {
      custom_options: Array<{
          option_id: string,
          option_value: string,
          extension_attributes: {
            file_info: {
              base64_encoded_data: string,
              type: string,
              name: string
            }
          }
        }>,
      bundle_options: Array<{
          option_id: number,
          option_qty: number,
          option_selections: Array<number>,
          extension_attributes: {}
        }>,
      configurable_item_options: Array<{
          option_id: string,
          option_value: number,
          extension_attributes: {}
        }>,
      downloadable_option: {
        downloadable_links: Array<number>
      },
      giftcard_item_option: {
        giftcard_amount: string,
        custom_giftcard_amount: number,
        giftcard_sender_name: string,
        giftcard_recipient_name: string,
        giftcard_sender_email: string,
        giftcard_recipient_email: string,
        giftcard_message: string,
        extension_attributes: {}
      }
    }
  },
  extension_attributes: {
    gift_message: {
      gift_message_id: number,
      customer_id: number,
      sender: string,
      recipient: string,
      message: string,
      extension_attributes: {
        entity_id: string,
        entity_type: string,
        wrapping_id: number,
        wrapping_allow_gift_receipt: boolean,
        wrapping_add_printed_card: boolean
      }
    },
    gw_id: string,
    gw_base_price: string,
    gw_price: string,
    gw_base_tax_amount: string,
    gw_tax_amount: string,
    gw_base_price_invoiced: string,
    gw_price_invoiced: string,
    gw_base_tax_amount_invoiced: string,
    gw_tax_amount_invoiced: string,
    gw_base_price_refunded: string,
    gw_price_refunded: string,
    gw_base_tax_amount_refunded: string,
    gw_tax_amount_refunded: string,
    vertex_tax_codes: Array<string>,
    invoice_text_codes: Array<string>,
    tax_codes: Array<string>
  }
};

type OrderAddress = {
  address_type: string,
  city: string,
  company: string,
  country_id: string,
  customer_address_id: number,
  customer_id: number,
  email: string,
  entity_id: number,
  fax: string,
  firstname: string,
  lastname: string,
  middlename: string,
  parent_id: number,
  postcode: string,
  prefix: string,
  region: string,
  region_code: string,
  region_id: number,
  street: Array<string>,
  suffix: string,
  telephone: string,
  vat_id: string,
  vat_is_valid: number,
  vat_request_date: string,
  vat_request_id: string,
  vat_request_success: number,
  extension_attributes: {
    checkout_fields: Array<{
      attribute_code: string,
      value: string
    }>
  },
};

type Product = {
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

type ProductAttribute = {
  is_wysiwyg_enabled: boolean,
  is_html_allowed_on_front: boolean,
  used_for_sort_by: boolean,
  is_filterable: boolean,
  is_filterable_in_search: boolean,
  is_used_in_grid: boolean,
  is_visible_in_grid: boolean,
  is_filterable_in_grid: boolean,
  position: number,
  apply_to: Array<string>,
  is_searchable: string,
  is_visible_in_advanced_search: string,
  is_comparable: string,
  is_used_for_promo_rules: string,
  is_visible_on_front: string,
  used_in_product_listing: string,
  is_visible: boolean,
  scope: string,
  extension_attributes: Record<string, any>,
  attribute_id: number,
  attribute_code: string,
  frontend_input: string,
  entity_type_id: string,
  is_required: boolean,
  options: Array<{
    label: string,
    value: string,
    sort_order: number,
    is_default: boolean,
    store_labels: Array<{
      store_id: number,
      label: string
      }>
    }>,
  is_user_defined: boolean,
  default_frontend_label: string,
  frontend_labels: Array<{
    store_id: number,
    label: string
    }>,
  note: string,
  backend_type: string,
  backend_model: string,
  source_model: string,
  default_value: string,
  is_unique: string,
  frontend_class: string,
  validation_rules: Array<{
    key: string,
    value: string
    }>,
  custom_attributes: Array<{
    attribute_code: string,
    value: string
    }>
};
