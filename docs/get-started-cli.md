# Get started with the SDM command line interface

## Install SDM using npm

From your shell terminal, run
```sh
nvm use 12
npm install --global @space48/sdm
```

## Grant SDM access to the playground Shopify store

From your shell terminal, run
```sh
sdm 'config.connectors[shopify].scopes.save' '{shopName: "sdm-playground", credentials: {apiKey: "eff43ff5164e26308b48bf2219e225de", password: "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"}}'
sdm 'config.connectors[shopify].scopes.list'
```

SDM will reply
```sh
"sdm-playground"
```

## Enter interactive mode of SDM

From your shell terminal, run
```sh
sdm
```

SDM will reply
```
Available scopes

config
shopify[sdm-playground]

Enter a scope:
```

Enter `shopify[sdm-playground]` and press return.
```
Enter a scope: shopify[sdm-playground]
```

SDM will reply
```
Enter `help` to see a list of available commands.

sdm shopify[sdm-playground]>
```

You can now run commands against the *sdm-playground* Shopify store. For example...

### List access scopes for your API key

```
sdm shopify[sdm-playground]> access-scope.list
```

SDM will reply with something like
```
{"handle":"read_analytics"}
{"handle":"read_assigned_fulfillment_orders"}
{"handle":"read_customers"}
{"handle":"read_discounts"}
{"handle":"read_draft_orders"}
{"handle":"read_fulfillments"}
{"handle":"read_gdpr_data_request"}
{"handle":"read_gift_cards"}
{"handle":"write_inventory"}
{"handle":"read_legal_policies"}
{"handle":"read_locations"}
{"handle":"read_marketing_events"}
{"handle":"read_merchant_managed_fulfillment_orders"}
{"handle":"read_online_store_pages"}
{"handle":"read_order_edits"}
{"handle":"read_orders"}
{"handle":"read_price_rules"}
{"handle":"read_product_listings"}
{"handle":"write_products"}
{"handle":"read_reports"}
{"handle":"read_resource_feedbacks"}
{"handle":"read_script_tags"}
{"handle":"read_shipping"}
{"handle":"read_locales"}
{"handle":"read_shopify_payments_accounts"}
{"handle":"read_shopify_payments_bank_accounts"}
{"handle":"read_shopify_payments_disputes"}
{"handle":"read_shopify_payments_payouts"}
{"handle":"read_content"}
{"handle":"read_themes"}
{"handle":"read_third_party_fulfillment_orders"}
{"handle":"read_translations"}
{"handle":"read_all_orders"}
{"handle":"read_inventory"}
{"handle":"read_products"}

35 results in 0.328s

Enter `help` to see a list of available commands.

sdm shopify[sdm-playground]>
```

### Get the shop info

```
sdm shopify[sdm-playground]> shop.get
```

SDM will reply
```
{"id":53400109242,"name":"SDM Playground","email":"webmaster+shopify@space48.com","domain":"sdm-playground.myshopify.com","province":"","country":"GB","address1":"Floor 5","zip":"M2 7HA","city":"Exchange Street","source":null,"phone":"","latitude":53.4828029,"longitude":-2.2457408,"primary_locale":"en","address2":null,"created_at":"2021-02-04T11:53:38+00:00","updated_at":"2021-02-04T12:25:08+00:00","country_code":"GB","country_name":"United Kingdom","currency":"GBP","customer_email":"webmaster+shopify@space48.com","timezone":"(GMT+00:00) Europe/London","iana_timezone":"Europe/London","shop_owner":"SDM Playground Admin","money_format":"£{{amount}}","money_with_currency_format":"£{{amount}} GBP","weight_unit":"lb","province_code":null,"taxes_included":true,"auto_configure_tax_inclusivity":null,"tax_shipping":null,"county_taxes":true,"plan_display_name":"Development","plan_name":"affiliate","has_discounts":false,"has_gift_cards":false,"myshopify_domain":"sdm-playground.myshopify.com","google_apps_domain":null,"google_apps_login_enabled":null,"money_in_emails_format":"£{{amount}}","money_with_currency_in_emails_format":"£{{amount}} GBP","eligible_for_payments":true,"requires_extra_payments_agreement":false,"password_enabled":true,"has_storefront":true,"eligible_for_card_reader_giveaway":false,"finances":true,"primary_location_id":59779547322,"cookie_consent_level":"implicit","visitor_tracking_consent_preference":"allow_all","force_ssl":true,"checkout_api_supported":false,"multi_location_enabled":true,"setup_required":false,"pre_launch_enabled":false,"enabled_presentment_currencies":["GBP"]}

1 results in 0.506s

Enter `help` to see a list of available commands.

sdm shopify[sdm-playground]>
```

### Get the product count

```
sdm shopify[sdm-playground]> product.count
```

SDM will reply with something like
```
3

1 results in 0.864s

Enter `help` to see a list of available commands.

sdm shopify[sdm-playground]>
```
where 3 is the product count.

### List products

*Note: If lots of products are returned and you don't want to wait, you can press `ctrl+c` to abort the request.*

```
sdm shopify[sdm-playground]> product.list
```

SDM will reply with something like
```
{"id":6202634404026,"title":"Example Hat","body_html":"","vendor":"Acme","product_type":"Hat","created_at":"2021-02-04T14:38:59+00:00","handle":"example-hat","updated_at":"2021-02-04T14:38:59+00:00","published_at":null,"template_suffix":null,"status":"archived","published_scope":"web","tags":"mens hat example","admin_graphql_api_id":"gid://shopify/Product/6202634404026","variants":[{"id":38043776712890,"product_id":6202634404026,"title":"Grey","price":"17.99","sku":null,"position":1,"inventory_policy":"deny","compare_at_price":"22.99","fulfillment_service":"manual","inventory_management":null,"option1":"Grey","option2":null,"option3":null,"created_at":"2021-02-04T14:38:59+00:00","updated_at":"2021-02-04T14:38:59+00:00","taxable":true,"barcode":null,"grams":275,"image_id":null,"weight":275,"weight_unit":"g","inventory_item_id":40137204105402,"inventory_quantity":0,"old_inventory_quantity":0,"requires_shipping":true,"admin_graphql_api_id":"gid://shopify/ProductVariant/38043776712890"}],"options":[{"id":7907131392186,"product_id":6202634404026,"name":"Title","position":1,"values":["Grey"]}],"images":[{"id":23355397701818,"product_id":6202634404026,"position":1,"created_at":"2021-02-04T14:38:59+00:00","updated_at":"2021-02-04T14:38:59+00:00","alt":null,"width":4460,"height":2973,"src":"https://cdn.shopify.com/s/files/1/0534/0010/9242/products/grey-hat.jpg?v=1612449539","variant_ids":[],"admin_graphql_api_id":"gid://shopify/ProductImage/23355397701818"}],"image":{"id":23355397701818,"product_id":6202634404026,"position":1,"created_at":"2021-02-04T14:38:59+00:00","updated_at":"2021-02-04T14:38:59+00:00","alt":null,"width":4460,"height":2973,"src":"https://cdn.shopify.com/s/files/1/0534/0010/9242/products/grey-hat.jpg?v=1612449539","variant_ids":[],"admin_graphql_api_id":"gid://shopify/ProductImage/23355397701818"}}

... 

3 results in 0.513s

Enter `help` to see a list of available commands.

sdm shopify[sdm-playground]>
```

### List product titles

*Note: If lots of products are returned and you don't want to wait, you can press `ctrl+c` to abort the request.*

```
sdm shopify[sdm-playground]> product.list {fields: "id,title"}
```

SDM will reply with something like
```
{"id":6202634404026,"title":"Example Hat"}
{"id":6202634338490,"title":"Example Pants"}
{"id":6202634305722,"title":"Example T-Shirt"}

3 results in 0.479s

Enter `help` to see a list of available commands.

sdm shopify[sdm-playground]> 
```

### Get the variant count for each product

```
sdm shopify[sdm-playground]> product[*].product-variant.count
```

SDM will reply with something like
```
{"path":[["product",6202634305722],"productVariant","count"],"output":3}
{"path":[["product",6202634338490],"productVariant","count"],"output":1}
{"path":[["product",6202634404026],"productVariant","count"],"output":1}

3 results in 0.687s

Enter `help` to see a list of available commands.

sdm shopify[sdm-playground]>
```

### Create a product

```
sdm shopify[sdm-playground]> product.create {title: "My new product!"}
```

SDM will reply with something like
```
{"id":6202727039162,"title":"My new product!","body_html":null,"vendor":"SDM Playground","product_type":"","created_at":"2021-02-04T15:27:57+00:00","handle":"my-new-product","updated_at":"2021-02-04T15:27:58+00:00","published_at":"2021-02-04T15:27:57+00:00","template_suffix":null,"status":"active","published_scope":"web","tags":"","admin_graphql_api_id":"gid://shopify/Product/6202727039162","variants":[{"id":38044115402938,"product_id":6202727039162,"title":"Default Title","price":"0.00","sku":"","position":1,"inventory_policy":"deny","compare_at_price":null,"fulfillment_service":"manual","inventory_management":null,"option1":"Default Title","option2":null,"option3":null,"created_at":"2021-02-04T15:27:57+00:00","updated_at":"2021-02-04T15:27:57+00:00","taxable":true,"barcode":null,"grams":0,"image_id":null,"weight":0,"weight_unit":"lb","inventory_item_id":40137542959290,"inventory_quantity":0,"old_inventory_quantity":0,"requires_shipping":true,"admin_graphql_api_id":"gid://shopify/ProductVariant/38044115402938"}],"options":[{"id":7907243524282,"product_id":6202727039162,"name":"Title","position":1,"values":["Default Title"]}],"images":[],"image":null}

1 results in 0.653s

Enter `help` to see a list of available commands.

sdm shopify[sdm-playground]> 
```

### Delete your product

Take note of the `id` returned when you created your product.

```
sdm shopify[sdm-playground]> product[6202727039162].delete
```

SDM will reply with something like
```
{}

1 results in 0.628s

Enter `help` to see a list of available commands.

sdm shopify[sdm-playground]> 
```

### Exit interactive mode

Press `ctrl+c` to exit interactive mode and return to the shell terminal.

## SDM in non-interactive mode

You can use SDM in non-interactive mode, too.

### List all product handles

```sh
sdm 'shopify[sdm-playground].product.list' '{fields: "id,handle"}'
```

SDM will reply with something like
```
{"id":6202634404026,"handle":"example-hat"}
{"id":6202634338490,"handle":"example-pants"}
{"id":6202634305722,"handle":"example-t-shirt"}
```
