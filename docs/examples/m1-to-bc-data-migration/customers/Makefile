include .env

sdm = ./node_modules/.bin/sdm
ts_node = ./node_modules/.bin/ts-node

m1 = $(sdm) m1:${M1_BASE_URL}
big-commerce = $(sdm) bc:$(BIG_COMMERCE_STORE_ALIAS)

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
