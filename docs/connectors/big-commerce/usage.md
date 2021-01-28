
# Using the CLI interface

# Using the TypeScript interface

# Commands

## blog.posts

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].blog.posts.create
```

*TypeScript*
```javascript
const command = bigCommerce.blog.posts.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].blog.posts[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.blog.posts.$doc(id).delete(input?: unknown);
const command = bigCommerce.blog.posts.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].blog.posts[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.blog.posts.$doc(id).get(input?: unknown);
const command = bigCommerce.blog.posts.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].blog.posts.list
```

*TypeScript*
```javascript
const command = bigCommerce.blog.posts.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].blog.posts[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.blog.posts.$doc(id).update(input?: unknown);
const command = bigCommerce.blog.posts.$all.update(input?: unknown);
```


## blog.tags

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].blog.tags.create
```

*TypeScript*
```javascript
const command = bigCommerce.blog.tags.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].blog.tags[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.blog.tags.$doc(id).delete(input?: unknown);
const command = bigCommerce.blog.tags.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].blog.tags[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.blog.tags.$doc(id).get(input?: unknown);
const command = bigCommerce.blog.tags.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].blog.tags.list
```

*TypeScript*
```javascript
const command = bigCommerce.blog.tags.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].blog.tags[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.blog.tags.$doc(id).update(input?: unknown);
const command = bigCommerce.blog.tags.$all.update(input?: unknown);
```


## brands

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].brands.create
```

*TypeScript*
```javascript
const command = bigCommerce.brands.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].brands[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).delete(input?: unknown);
const command = bigCommerce.brands.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].brands[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).get(input?: unknown);
const command = bigCommerce.brands.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].brands.list
```

*TypeScript*
```javascript
const command = bigCommerce.brands.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].brands[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).update(input?: unknown);
const command = bigCommerce.brands.$all.update(input?: unknown);
```


## brands[].image

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].brands[id|*].image.create
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).image.create(input?: unknown);
const command = bigCommerce.brands.$all.image.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].brands[id|*].image.delete
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).image.delete(input?: unknown);
const command = bigCommerce.brands.$all.image.delete(input?: unknown);
```


## brands[].metafields

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].brands[id|*].metafields.create
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).metafields.create(input?: unknown);
const command = bigCommerce.brands.$all.metafields.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].brands[id|*].metafields[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).metafields.$doc(id).delete(input?: unknown);
const command = bigCommerce.brands.$all.metafields.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].brands[id|*].metafields[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).metafields.$doc(id).get(input?: unknown);
const command = bigCommerce.brands.$all.metafields.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].brands[id|*].metafields.list
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).metafields.list(input?: unknown);
const command = bigCommerce.brands.$all.metafields.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].brands[id|*].metafields[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).metafields.$doc(id).update(input?: unknown);
const command = bigCommerce.brands.$all.metafields.$all.update(input?: unknown);
```


## carts

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].carts.create
```

*TypeScript*
```javascript
const command = bigCommerce.carts.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].carts[id].delete
```

*TypeScript*
```javascript
const command = bigCommerce.carts.$doc(id).delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].carts[id].get
```

*TypeScript*
```javascript
const command = bigCommerce.carts.$doc(id).get(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].carts[id].update
```

*TypeScript*
```javascript
const command = bigCommerce.carts.$doc(id).update(input?: unknown);
```


## carts[].items

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].carts[id].items.create
```

*TypeScript*
```javascript
const command = bigCommerce.carts.$doc(id).items.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].carts[id].items[id].delete
```

*TypeScript*
```javascript
const command = bigCommerce.carts.$doc(id).items.$doc(id).delete(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].carts[id].items[id].update
```

*TypeScript*
```javascript
const command = bigCommerce.carts.$doc(id).items.$doc(id).update(input?: unknown);
```


## categories

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].categories.create
```

*TypeScript*
```javascript
const command = bigCommerce.categories.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].categories[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).delete(input?: unknown);
const command = bigCommerce.categories.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].categories[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).get(input?: unknown);
const command = bigCommerce.categories.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].categories.list
```

*TypeScript*
```javascript
const command = bigCommerce.categories.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].categories[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).update(input?: unknown);
const command = bigCommerce.categories.$all.update(input?: unknown);
```


## categories[].image

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].categories[id|*].image.create
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).image.create(input?: unknown);
const command = bigCommerce.categories.$all.image.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].categories[id|*].image.delete
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).image.delete(input?: unknown);
const command = bigCommerce.categories.$all.image.delete(input?: unknown);
```


## categories[].metafields

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].categories[id|*].metafields.create
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).metafields.create(input?: unknown);
const command = bigCommerce.categories.$all.metafields.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].categories[id|*].metafields[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).metafields.$doc(id).delete(input?: unknown);
const command = bigCommerce.categories.$all.metafields.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].categories[id|*].metafields[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).metafields.$doc(id).get(input?: unknown);
const command = bigCommerce.categories.$all.metafields.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].categories[id|*].metafields.list
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).metafields.list(input?: unknown);
const command = bigCommerce.categories.$all.metafields.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].categories[id|*].metafields[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).metafields.$doc(id).update(input?: unknown);
const command = bigCommerce.categories.$all.metafields.$all.update(input?: unknown);
```


## categories.tree

### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].categories.tree.get
```

*TypeScript*
```javascript
const command = bigCommerce.categories.tree.get(input?: unknown);
```


## channels

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].channels.create
```

*TypeScript*
```javascript
const command = bigCommerce.channels.create(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].channels[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.channels.$doc(id).get(input?: unknown);
const command = bigCommerce.channels.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].channels.list
```

*TypeScript*
```javascript
const command = bigCommerce.channels.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].channels[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.channels.$doc(id).update(input?: unknown);
const command = bigCommerce.channels.$all.update(input?: unknown);
```


## customers

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].customers.create
```

*TypeScript*
```javascript
const command = bigCommerce.customers.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].customers[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.customers.$doc(id).delete(input?: unknown);
const command = bigCommerce.customers.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].customers[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.customers.$doc(id).get(input?: unknown);
const command = bigCommerce.customers.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].customers.list
```

*TypeScript*
```javascript
const command = bigCommerce.customers.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].customers[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.customers.$doc(id).update(input?: unknown);
const command = bigCommerce.customers.$all.update(input?: unknown);
```


## customers.addresses

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].customers.addresses.create
```

*TypeScript*
```javascript
const command = bigCommerce.customers.addresses.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].customers.addresses[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.customers.addresses.$doc(id).delete(input?: unknown);
const command = bigCommerce.customers.addresses.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].customers.addresses[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.customers.addresses.$doc(id).get(input?: unknown);
const command = bigCommerce.customers.addresses.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].customers.addresses.list
```

*TypeScript*
```javascript
const command = bigCommerce.customers.addresses.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].customers.addresses[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.customers.addresses.$doc(id).update(input?: unknown);
const command = bigCommerce.customers.addresses.$all.update(input?: unknown);
```


## customers.attributes

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].customers.attributes.create
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].customers.attributes[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.$doc(id).delete(input?: unknown);
const command = bigCommerce.customers.attributes.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].customers.attributes[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.$doc(id).get(input?: unknown);
const command = bigCommerce.customers.attributes.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].customers.attributes.list
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].customers.attributes[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.$doc(id).update(input?: unknown);
const command = bigCommerce.customers.attributes.$all.update(input?: unknown);
```


## customers.attributes[].values

### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].customers.attributes[id|*].values.list
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.$doc(id).values.list(input?: unknown);
const command = bigCommerce.customers.attributes.$all.values.list(input?: unknown);
```


## customers.attributes.values

### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].customers.attributes.values[id].delete
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.values.$doc(id).delete(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].customers.attributes.values.list
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.values.list(input?: unknown);
```


### set

*CLI*
```sh
$ sdm big-commerce[some-store-alias].customers.attributes.values[id].set
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.values.$doc(id).set(input?: unknown);
```


## gift-certificates

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].gift-certificates.create
```

*TypeScript*
```javascript
const command = bigCommerce.giftCertificates.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].gift-certificates[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.giftCertificates.$doc(id).delete(input?: unknown);
const command = bigCommerce.giftCertificates.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].gift-certificates[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.giftCertificates.$doc(id).get(input?: unknown);
const command = bigCommerce.giftCertificates.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].gift-certificates.list
```

*TypeScript*
```javascript
const command = bigCommerce.giftCertificates.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].gift-certificates[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.giftCertificates.$doc(id).update(input?: unknown);
const command = bigCommerce.giftCertificates.$all.update(input?: unknown);
```


## orders

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].orders.create
```

*TypeScript*
```javascript
const command = bigCommerce.orders.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].orders[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.orders.$doc(id).delete(input?: unknown);
const command = bigCommerce.orders.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].orders[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.orders.$doc(id).get(input?: unknown);
const command = bigCommerce.orders.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].orders.list
```

*TypeScript*
```javascript
const command = bigCommerce.orders.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].orders[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.orders.$doc(id).update(input?: unknown);
const command = bigCommerce.orders.$all.update(input?: unknown);
```


## orders[].refunds

### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].orders[id|*].refunds.get
```

*TypeScript*
```javascript
const command = bigCommerce.orders.$doc(id).refunds.get(input?: unknown);
const command = bigCommerce.orders.$all.refunds.get(input?: unknown);
```


## payment-methods

### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].payment-methods.list
```

*TypeScript*
```javascript
const command = bigCommerce.paymentMethods.list(input?: unknown);
```


## products

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products.create
```

*TypeScript*
```javascript
const command = bigCommerce.products.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products.list
```

*TypeScript*
```javascript
const command = bigCommerce.products.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products.update
```

*TypeScript*
```javascript
const command = bigCommerce.products.update(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.update(input?: unknown);
```


## products[].bulk-pricing-rules

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].bulk-pricing-rules.create
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).bulkPricingRules.create(input?: unknown);
const command = bigCommerce.products.$all.bulkPricingRules.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].bulk-pricing-rules[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).bulkPricingRules.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.bulkPricingRules.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].bulk-pricing-rules[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).bulkPricingRules.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.bulkPricingRules.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].bulk-pricing-rules.list
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).bulkPricingRules.list(input?: unknown);
const command = bigCommerce.products.$all.bulkPricingRules.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].bulk-pricing-rules[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).bulkPricingRules.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.bulkPricingRules.$all.update(input?: unknown);
```


## products[].complex-rules

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].complex-rules.create
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).complexRules.create(input?: unknown);
const command = bigCommerce.products.$all.complexRules.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].complex-rules[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).complexRules.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.complexRules.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].complex-rules[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).complexRules.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.complexRules.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].complex-rules.list
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).complexRules.list(input?: unknown);
const command = bigCommerce.products.$all.complexRules.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].complex-rules[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).complexRules.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.complexRules.$all.update(input?: unknown);
```


## products[].custom-fields

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].custom-fields.create
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).customFields.create(input?: unknown);
const command = bigCommerce.products.$all.customFields.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].custom-fields[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).customFields.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.customFields.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].custom-fields[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).customFields.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.customFields.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].custom-fields.list
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).customFields.list(input?: unknown);
const command = bigCommerce.products.$all.customFields.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].custom-fields[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).customFields.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.customFields.$all.update(input?: unknown);
```


## products[].images

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].images.create
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).images.create(input?: unknown);
const command = bigCommerce.products.$all.images.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].images[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).images.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.images.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].images[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).images.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.images.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].images.list
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).images.list(input?: unknown);
const command = bigCommerce.products.$all.images.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].images[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).images.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.images.$all.update(input?: unknown);
```


## products[].metafields

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].metafields.create
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).metafields.create(input?: unknown);
const command = bigCommerce.products.$all.metafields.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].metafields[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).metafields.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.metafields.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].metafields[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).metafields.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.metafields.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].metafields.list
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).metafields.list(input?: unknown);
const command = bigCommerce.products.$all.metafields.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].metafields[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).metafields.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.metafields.$all.update(input?: unknown);
```


## products[].modifiers

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].modifiers.create
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.create(input?: unknown);
const command = bigCommerce.products.$all.modifiers.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].modifiers[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].modifiers[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].modifiers.list
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.list(input?: unknown);
const command = bigCommerce.products.$all.modifiers.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].modifiers[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.update(input?: unknown);
```


## products[].modifiers[].values

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].modifiers[id|*].values.create
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).values.create(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.values.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].modifiers[id|*].values[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).values.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.values.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].modifiers[id|*].values[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).values.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.values.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].modifiers[id|*].values.list
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).values.list(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.values.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].modifiers[id|*].values[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).values.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.values.$all.update(input?: unknown);
```


## products[].modifiers[].values.image

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].modifiers[id|*].values.image.create
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).values.image.create(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.values.image.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].modifiers[id|*].values.image[id].delete
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).values.image.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.values.image.$doc(id).delete(input?: unknown);
```


## products[].options

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].options.create
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.create(input?: unknown);
const command = bigCommerce.products.$all.options.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].options[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.options.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].options[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.options.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].options.list
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.list(input?: unknown);
const command = bigCommerce.products.$all.options.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].options[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.options.$all.update(input?: unknown);
```


## products[].options[].values

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].options[id|*].values.create
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.$doc(id).values.create(input?: unknown);
const command = bigCommerce.products.$all.options.$all.values.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].options[id|*].values[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.$doc(id).values.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.options.$all.values.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].options[id|*].values[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.$doc(id).values.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.options.$all.values.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].options[id|*].values.list
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.$doc(id).values.list(input?: unknown);
const command = bigCommerce.products.$all.options.$all.values.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].options[id|*].values[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.$doc(id).values.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.options.$all.values.$all.update(input?: unknown);
```


## products[].variants

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].variants.create
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).variants.create(input?: unknown);
const command = bigCommerce.products.$all.variants.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].variants[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).variants.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.variants.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].variants[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).variants.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.variants.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].variants.list
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).variants.list(input?: unknown);
const command = bigCommerce.products.$all.variants.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].variants[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).variants.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.variants.$all.update(input?: unknown);
```


## products[].videos

### create

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].videos.create
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).videos.create(input?: unknown);
const command = bigCommerce.products.$all.videos.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].videos[id|*].delete
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).videos.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.videos.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].videos[id|*].get
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).videos.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.videos.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].videos.list
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).videos.list(input?: unknown);
const command = bigCommerce.products.$all.videos.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm big-commerce[some-store-alias].products[id|*].videos[id|*].update
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).videos.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.videos.$all.update(input?: unknown);
```


## store

### get

*CLI*
```sh
$ sdm big-commerce[some-store-alias].store.get
```

*TypeScript*
```javascript
const command = bigCommerce.store.get(input?: unknown);
```


