include .env

sdm = ./node_modules/.bin/sdm
ts_node = ./node_modules/.bin/ts-node

m1 = $(sdm) m1:${M1_BASE_URL}
big-commerce = $(sdm) bc:$(BIG_COMMERCE_STORE_ALIAS)

# Categories

# Categories - Magento

magento-extract/category-tree.json:
	$(m1) get category-tree \
	| jq -s > $@

magento-extract/categories.jsonl:
	$(m1) get categories/* | jq .output -c > $@

magento-extract/categories-to-exclude.json: magento-extract/categories.jsonl
	cat $< | jq 'select(.name == "Brands") | .all_children | split(",") | {categories_to_exclude: .}' > $@

magento-samples/category.json: magento-extract/categories.jsonl
	cat $< | head -n1 | jq > $@

# Puts category url in front of object for easy access in transforms
magento-samples/category-with-url.json: magento-samples/category.json
	cat $< | jq '{url: ("/" + .url_path), category: .}'  > $@

# Categories - Big Commerce

big-commerce-output/categories.json:
	$(big-commerce) list categories | jq -s > $@

big-commerce-samples/category.json: big-commerce-output/categories.json
	cat $< | jq '.[0]' > $@

big-commerce-samples/category-with-url.json: big-commerce-samples/category.json
	cat $< | jq '{url: .custom_url.url, category: .}' > $@

big-commerce-input/categories.jsonl: combined/categories-missing.jsonl combined/categories-imported.json magento-extract/categories-to-exclude.json transform/category.ts
	cat $< | jq -c '.magentoCategory.category' \
	| $(ts_node) transform/category.ts | jq -c 'select(length > 0)' > $@

log/create-categories-result.jsonl: big-commerce-input/categories.jsonl
	cat $< | $(big-commerce) create categories > $@

##############
# The category import uses the url path as an unique id and as a way of linking the categories from thr M2 store to the BC store
# Importing categories will require the import to be run as many times as the maximum depth of the category structure
# After each instance please run 'make clean-category-logs'
# and then re-run 'log/create-categories-result.jsonl'
# repeat until 'combined/categories-missing.jsonl' is empty
##############
clean-category-logs:
	rm -f big-commerce-input/categories.jsonl
	rm -f big-commerce-output/categories.json
	rm -rf combined/categories*


# Categories - Combined

combined/categories-merged.jsonl: magento-extract/categories.jsonl big-commerce-output/categories.json magento-samples/category-with-url.json big-commerce-samples/category-with-url.json transform/combine-categories.ts
	( cat $< | jq '{url: ("/" + .url_path), category: .}' -c ; cat $(word 2, $^) | jq -c '.[] | {url: .custom_url.url, category: .}' ) \
		| jq -sc 'sort_by(.url)[]' \
		| $(ts_node) transform/combine-categories.ts > $@

combined/categories-missing.jsonl: combined/categories-merged.jsonl
	cat $< | jq -c 'select(.bigCommerceCategory == null)' > $@

combined/categories-imported.json: combined/categories-merged.jsonl
	cat $< | jq 'select(.bigCommerceCategory != null)' \
	| jq '{url: .bigCommerceCategory.url, m2_id: (.magentoCategory.category.category_id // 0 | tonumber), m2_parent_id: (.magentoCategory.category.parent_id // 0 | tonumber), m2_path: (.magentoCategory.category.path // ""), bc_id: .bigCommerceCategory.category.id, bc_parent_id: .bigCommerceCategory.category.parent_id}' \
	| jq -s > $@

# Products

# Products - Magento - Attributes

magento-extract/attributes-sets-names.jsonl:
	$(m1) list product-attribute-sets > $@

magento-extract/attributes-sets.jsonl:
	$(m1) list product-attribute-sets/*/attributes \
	| jq '{set_id: .path | split("/")[1], attribute_set: .output}' -c > $@

magento-extract/attributes.json:
	$(m1) get product-attributes/* | jq .output | jq -s > $@

# Products - Magento - Media

magento-extract/products-media.jsonl:
	$(m1) get products/*/media \
 	| jq '{product_id: .path | split("/")[1], media: .output}' -c > $@

magento-samples/product-media.json: magento-extract/products-media.jsonl
	cat $< | head -n1 | jq > $@

# Products - Magento

magento-extract/products.jsonl:
	$(m1) list products > $@

magento-extract/products-with-categories.jsonl: magento-extract/products.jsonl
	cat $< | $(m1) get products/{entity_id}/info \
    | jq '.input * .output' -c > $@

magento-samples/products-with-categories.json: magento-extract/products-with-categories.jsonl
	cat $< | head -n1 | jq > $@

magento-extract/products-full-data.jsonl: magento-extract/products-with-categories.jsonl magento-extract/products-media.jsonl magento-samples/products-with-categories.json magento-samples/product-media.json transform/combine-media.ts
	( cat $< ; cat $(word 2, $^) ) \
	| jq 'sort_by(.product_id)[]' -sc \
	| $(ts_node) transform/combine-media.ts > $@

magento-samples/products-full-data.json: magento-extract/products-full-data.jsonl
	cat $< | head -n10 | tail -n1 | jq > $@

magento-extract/combined-products.jsonl: magento-extract/products-full-data.jsonl magento-samples/products-full-data.json transform/combine-simple-and-confs.ts
	cat $< | jq 'sort_by(.sku)[]' -sc \
	| $(ts_node) transform/combine-simple-and-confs.ts > $@

magento-extract/products-simple.jsonl: magento-extract/combined-products.jsonl
	cat $< | jq 'select(.sku) | select(.parent.product_id | not)' -c > $@

magento-samples/product-simple.json: magento-extract/products-simple.jsonl
	cat $< | head -n1 | jq > $@

magento-extract/products-configurable.jsonl: magento-extract/combined-products.jsonl
	cat $< | jq 'select(.sku) | select(.parent.product_id) | select(.children | length > 0)' -c > $@

magento-samples/product-configurable.json: magento-extract/products-configurable.jsonl
	cat $< | head -n10 | tail -n1 | jq > $@

log/error-products-configurable-no-children.jsonl: magento-extract/combined-products.jsonl
	cat $< | jq 'select(.parent.product_id) | select(.children | length == 0)' -c > $@

log/error-products-simple-no-sku.jsonl: magento-extract/combined-products.jsonl
	cat $< | jq 'select(.parent.product_id | not) | select(.sku == null)' -c > $@

# Products - Big Commerce

big-commerce-output/products.jsonl:
	$(big-commerce) get products/* | jq .output -c > $@

big-commerce-samples/product.json: big-commerce-output/products.jsonl
	cat $< | head -n1 | jq > $@

big-commerce-input/products-configurable.jsonl: combined/products-missing-configurable.jsonl magento-samples/product-configurable.json combined/categories-imported.json transform/product-configurable.ts
	cat $< | jq -c '.magentoProduct' | $(ts_node) transform/product-configurable.ts > $@

big-commerce-input/products-simple.jsonl: combined/products-missing-simples.jsonl magento-samples/product-simple.json combined/categories-imported.json transform/product-simple.ts
	cat $< | jq -c '.magentoProduct' | $(ts_node) transform/product-simple.ts > $@

log/create-products-configurable-result.jsonl: big-commerce-input/products-configurable.jsonl
	cat $< | head -n250 | $(big-commerce) create products > $@		# limit to 250 for test

log/create-products-simple-result.jsonl: big-commerce-input/products-simple.jsonl
	cat $< | $(big-commerce) create products > $@

##############
# The product import uses the sku as an unique id and as a way of linking the products from thr M2 store to the BC store
# After each instance please run 'make clean-category-logs'
# and then re-run either 'log/create-products-configurable-result.jsonl' or 'log/create-products-simple-result.jsonl'
# repeat until the 'missing' product files in `combine/` are empty
##############
clean-product-logs:
	rm -f big-commerce-input/products*
	rm -f big-commerce-output/products.jsonl
	rm -rf combined/products*

# Products - Combined

combined/products-merged-simples.jsonl: magento-extract/products-simple.jsonl big-commerce-output/products.jsonl magento-samples/product-simple.json magento-samples/product-configurable.json big-commerce-samples/product.json transform/combine-BC-M2-products.ts
	( cat $< | jq -c ; cat $(word 2, $^) | jq -c ) \
		| jq -sc 'sort_by(.sku)[]' \
		| $(ts_node) transform/combine-BC-M2-products.ts > $@

combined/products-merged-configurable.jsonl: magento-extract/products-configurable.jsonl big-commerce-output/products.jsonl magento-samples/product-simple.json magento-samples/product-configurable.json big-commerce-samples/product.json transform/combine-BC-M2-products.ts
	( cat $< | jq -c ; cat $(word 2, $^) | jq -c ) \
		| jq -sc 'sort_by(.sku)[]' \
		| $(ts_node) transform/combine-BC-M2-products.ts > $@

combined/products-missing-simples.jsonl: combined/products-merged-simples.jsonl
	cat $< | jq -c 'select(.bigCommerceProduct == null)' > $@

combined/products-missing-configurable.jsonl: combined/products-merged-configurable.jsonl
	cat $< | jq -c 'select(.bigCommerceProduct == null)' > $@

combined/products-imported-simples.json: combined/products-merged-simples.jsonl
	cat $< | jq 'select(.bigCommerceProduct != null) | select(.magentoProduct.children) | {sku: .magentoProduct.sku, m2_id: (.magentoProduct.children[0].entity_id // 0), bc_id: .bigCommerceProduct.id}' \
	| jq -s > $@

combined/products-imported-configurable.json: combined/products-merged-configurable.jsonl
	cat $< | jq 'select(.bigCommerceProduct != null) | select(.magentoProduct.parent) | {sku: .magentoProduct.sku, m2_id: (.magentoProduct.parent.entity_id // 0), bc_id: .bigCommerceProduct.id}' \
	| jq -s > $@

# Customers

# Customers - Magento

magento-extract/customers.jsonl:
	$(m1) list customers > $@

magento-samples/customers.json: magento-extract/customers.jsonl
	cat $< | head -n1 | jq > $@

magento-extract/customer-addresses.jsonl:
	$(m1) get customers/*/addresses-soap \
	| jq '{entity_id: (.path | split("/")[1]), address: .output}' -c > $@

magento-samples/customer-addresses.json: magento-extract/customer-addresses.jsonl
	cat $< | head -n1 | jq > $@

# Customers - Big Commerce

big-commerce-input/customers.jsonl: magento-extract/customers-dummy.jsonl magento-extract/customer-addresses-dummy.jsonl magento-samples/customers.json magento-samples/customer-addresses.json transform/customer.ts
	( cat $< ; cat $(word 2, $^) ) \
	| jq -sc 'sort_by(.entity_id)[]' \
	| $(ts_node) transform/customer.ts > $@

log/create-customers-result.jsonl: big-commerce-input/customers.jsonl
	cat $< | $(big-commerce) create customers > $@

# Orders

# Orders - Magento

magento-extract/orders.jsonl:
	$(m1) get orders/* | jq .output -c > $@

magento-samples/order.json: magento-extract/orders-dummy.jsonl
	cat $< | head -n1 | jq > $@

# Orders - Big Commerce

big-commerce-input/orders.jsonl: magento-extract/orders-dummy.jsonl magento-samples/order.json transform/order.ts
	cat $< | $(ts_node) transform/order.ts > $@

big-commerce-output/orders.jsonl:
	$(big-commerce) get orders/* > $@

log/create-orders-result.jsonl: big-commerce-input/orders.jsonl
	cat $< | $(big-commerce) create orders > $@