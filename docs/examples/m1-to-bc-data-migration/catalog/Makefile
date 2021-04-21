include ../.env

sdm = $(shell npm bin)/sdm
ts_node = $(shell npm bin)/ts-node

m1 = $(sdm) magento1[${M1_BASE_URL}]
big-commerce = $(sdm) big-commerce[$(BIG_COMMERCE_STORE_ALIAS)]

# Categories

# Categories - Magento

data/magento-categories.jsonl:
	npx ts-node bin/list-magento-categories.ts '$(M1_BASE_URL)' > $@

sample-data/m1-root-category.json:
	$(m1).categories[*].get | jq -c '.output | select(.level=="0")' | head -n1 | jq > $@

sample-data/m1-non-root-category.json:
	$(m1).categories[*].get | grep meta | head -n1 | jq .output > $@

# Products

# Products - Magento

data/magento-products.jsonl:
	$(ts_node) bin/list-magento-products.ts '$(M1_BASE_URL)' > $@
