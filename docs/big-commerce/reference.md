
# Resources

 * [blog.posts](#blogposts)
 * [blog.tags](#blogtags)
 * [brands](#brands)
 * [brands[].image](#brandsimage)
 * [brands[].metafields](#brandsmetafields)
 * [carts](#carts)
 * [carts[].items](#cartsitems)
 * [categories](#categories)
 * [categories[].image](#categoriesimage)
 * [categories[].metafields](#categoriesmetafields)
 * [categories.tree](#categoriestree)
 * [channels](#channels)
 * [customers](#customers)
 * [customers.addresses](#customersaddresses)
 * [customers.attributes](#customersattributes)
 * [customers.attributes[].values](#customersattributesvalues)
 * [customers.attributes.values](#customersattributesvalues)
 * [gift-certificates](#gift-certificates)
 * [orders](#orders)
 * [orders[].refunds](#ordersrefunds)
 * [orders[].shipping-addresses](#ordersshipping-addresses)
 * [orders[].products](#ordersproducts)
 * [orders.statuses](#ordersstatuses)
 * [pages](#pages)
 * [payment-methods](#payment-methods)
 * [products](#products)
 * [products[].bulk-pricing-rules](#productsbulk-pricing-rules)
 * [products[].complex-rules](#productscomplex-rules)
 * [products[].custom-fields](#productscustom-fields)
 * [products[].images](#productsimages)
 * [products[].metafields](#productsmetafields)
 * [products[].modifiers](#productsmodifiers)
 * [products[].modifiers[].values](#productsmodifiersvalues)
 * [products[].modifiers[].values[].image](#productsmodifiersvaluesimage)
 * [products[].options](#productsoptions)
 * [products[].options[].values](#productsoptionsvalues)
 * [products[].reviews](#productsreviews)
 * [products[].variants](#productsvariants)
 * [products[].variants[].metafields](#productsvariantsmetafields)
 * [products[].videos](#productsvideos)
 * [products.variants](#productsvariants)
 * [store](#store)

## blog.posts

### Endpoints

 * [create](#blogpostscreate)
 * [delete](#blogpostsdelete)
 * [get](#blogpostsget)
 * [list](#blogpostslist)
 * [update](#blogpostsupdate)

### blog.posts.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].blog.posts.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.blog.posts.create(input?: unknown);
```


### blog.posts[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].blog.posts[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.blog.posts.$doc(id).delete(input?: unknown);
const command = bigCommerce.blog.posts.$all.delete(input?: unknown);
```


### blog.posts[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].blog.posts[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.blog.posts.$doc(id).get(input?: unknown);
const command = bigCommerce.blog.posts.$all.get(input?: unknown);
```


### blog.posts.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].blog.posts.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.blog.posts.list(input?: unknown);
```


### blog.posts[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].blog.posts[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.blog.posts.$doc(id).update(input?: unknown);
const command = bigCommerce.blog.posts.$all.update(input?: unknown);
```


## blog.tags

### Endpoints

 * [list](#blogtagslist)

### blog.tags.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].blog.tags.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.blog.tags.list(input?: unknown);
```


## brands

### Endpoints

 * [create](#brandscreate)
 * [delete](#brandsdelete)
 * [get](#brandsget)
 * [list](#brandslist)
 * [update](#brandsupdate)

### brands.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].brands.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.brands.create(input?: unknown);
```


### brands[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].brands[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).delete(input?: unknown);
const command = bigCommerce.brands.$all.delete(input?: unknown);
```


### brands[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].brands[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).get(input?: unknown);
const command = bigCommerce.brands.$all.get(input?: unknown);
```


### brands.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].brands.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.brands.list(input?: unknown);
```


### brands[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].brands[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).update(input?: unknown);
const command = bigCommerce.brands.$all.update(input?: unknown);
```


## brands[].image

### Endpoints

 * [create](#brandsimagecreate)
 * [delete](#brandsimagedelete)

### brands[].image.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].brands[id|*].image.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).image.create(input?: unknown);
const command = bigCommerce.brands.$all.image.create(input?: unknown);
```


### brands[].image.delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].brands[id|*].image.delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).image.delete(input?: unknown);
const command = bigCommerce.brands.$all.image.delete(input?: unknown);
```


## brands[].metafields

### Endpoints

 * [create](#brandsmetafieldscreate)
 * [delete](#brandsmetafieldsdelete)
 * [get](#brandsmetafieldsget)
 * [list](#brandsmetafieldslist)
 * [update](#brandsmetafieldsupdate)

### brands[].metafields.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].brands[id|*].metafields.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).metafields.create(input?: unknown);
const command = bigCommerce.brands.$all.metafields.create(input?: unknown);
```


### brands[].metafields[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].brands[id|*].metafields[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).metafields.$doc(id).delete(input?: unknown);
const command = bigCommerce.brands.$all.metafields.$all.delete(input?: unknown);
```


### brands[].metafields[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].brands[id|*].metafields[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).metafields.$doc(id).get(input?: unknown);
const command = bigCommerce.brands.$all.metafields.$all.get(input?: unknown);
```


### brands[].metafields.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].brands[id|*].metafields.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).metafields.list(input?: unknown);
const command = bigCommerce.brands.$all.metafields.list(input?: unknown);
```


### brands[].metafields[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].brands[id|*].metafields[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.brands.$doc(id).metafields.$doc(id).update(input?: unknown);
const command = bigCommerce.brands.$all.metafields.$all.update(input?: unknown);
```


## carts

### Endpoints

 * [create](#cartscreate)
 * [delete](#cartsdelete)
 * [get](#cartsget)
 * [update](#cartsupdate)

### carts.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].carts.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.carts.create(input?: unknown);
```


### carts[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].carts[id].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.carts.$doc(id).delete(input?: unknown);
```


### carts[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].carts[id].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.carts.$doc(id).get(input?: unknown);
```


### carts[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].carts[id].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.carts.$doc(id).update(input?: unknown);
```


## carts[].items

### Endpoints

 * [create](#cartsitemscreate)
 * [delete](#cartsitemsdelete)
 * [update](#cartsitemsupdate)

### carts[].items.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].carts[id].items.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.carts.$doc(id).items.create(input?: unknown);
```


### carts[].items[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].carts[id].items[id].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.carts.$doc(id).items.$doc(id).delete(input?: unknown);
```


### carts[].items[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].carts[id].items[id].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.carts.$doc(id).items.$doc(id).update(input?: unknown);
```


## categories

### Endpoints

 * [create](#categoriescreate)
 * [delete](#categoriesdelete)
 * [get](#categoriesget)
 * [list](#categorieslist)
 * [update](#categoriesupdate)

### categories.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].categories.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.categories.create(input?: unknown);
```


### categories[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].categories[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).delete(input?: unknown);
const command = bigCommerce.categories.$all.delete(input?: unknown);
```


### categories[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].categories[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).get(input?: unknown);
const command = bigCommerce.categories.$all.get(input?: unknown);
```


### categories.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].categories.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.categories.list(input?: unknown);
```


### categories[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].categories[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).update(input?: unknown);
const command = bigCommerce.categories.$all.update(input?: unknown);
```


## categories[].image

### Endpoints

 * [create](#categoriesimagecreate)
 * [delete](#categoriesimagedelete)

### categories[].image.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].categories[id|*].image.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).image.create(input?: unknown);
const command = bigCommerce.categories.$all.image.create(input?: unknown);
```


### categories[].image.delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].categories[id|*].image.delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).image.delete(input?: unknown);
const command = bigCommerce.categories.$all.image.delete(input?: unknown);
```


## categories[].metafields

### Endpoints

 * [create](#categoriesmetafieldscreate)
 * [delete](#categoriesmetafieldsdelete)
 * [get](#categoriesmetafieldsget)
 * [list](#categoriesmetafieldslist)
 * [update](#categoriesmetafieldsupdate)

### categories[].metafields.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].categories[id|*].metafields.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).metafields.create(input?: unknown);
const command = bigCommerce.categories.$all.metafields.create(input?: unknown);
```


### categories[].metafields[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].categories[id|*].metafields[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).metafields.$doc(id).delete(input?: unknown);
const command = bigCommerce.categories.$all.metafields.$all.delete(input?: unknown);
```


### categories[].metafields[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].categories[id|*].metafields[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).metafields.$doc(id).get(input?: unknown);
const command = bigCommerce.categories.$all.metafields.$all.get(input?: unknown);
```


### categories[].metafields.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].categories[id|*].metafields.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).metafields.list(input?: unknown);
const command = bigCommerce.categories.$all.metafields.list(input?: unknown);
```


### categories[].metafields[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].categories[id|*].metafields[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.categories.$doc(id).metafields.$doc(id).update(input?: unknown);
const command = bigCommerce.categories.$all.metafields.$all.update(input?: unknown);
```


## categories.tree

### Endpoints

 * [get](#categoriestreeget)

### categories.tree.get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].categories.tree.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.categories.tree.get(input?: unknown);
```


## channels

### Endpoints

 * [create](#channelscreate)
 * [get](#channelsget)
 * [list](#channelslist)
 * [update](#channelsupdate)

### channels.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].channels.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.channels.create(input?: unknown);
```


### channels[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].channels[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.channels.$doc(id).get(input?: unknown);
const command = bigCommerce.channels.$all.get(input?: unknown);
```


### channels.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].channels.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.channels.list(input?: unknown);
```


### channels[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].channels[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.channels.$doc(id).update(input?: unknown);
const command = bigCommerce.channels.$all.update(input?: unknown);
```


## customers

### Endpoints

 * [create](#customerscreate)
 * [delete](#customersdelete)
 * [delete](#customersdelete)
 * [get](#customersget)
 * [list](#customerslist)
 * [update](#customersupdate)

### customers.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.create(input?: unknown);
```


### customers.delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.delete(input?: unknown);
```


### customers[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.$doc(id).delete(input?: unknown);
const command = bigCommerce.customers.$all.delete(input?: unknown);
```


### customers[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.$doc(id).get(input?: unknown);
const command = bigCommerce.customers.$all.get(input?: unknown);
```


### customers.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.list(input?: unknown);
```


### customers.update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.update(input?: unknown);
```


## customers.addresses

### Endpoints

 * [create](#customersaddressescreate)
 * [delete](#customersaddressesdelete)
 * [delete](#customersaddressesdelete)
 * [get](#customersaddressesget)
 * [list](#customersaddresseslist)
 * [update](#customersaddressesupdate)

### customers.addresses.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.addresses.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.addresses.create(input?: unknown);
```


### customers.addresses.delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.addresses.delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.addresses.delete(input?: unknown);
```


### customers.addresses[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.addresses[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.addresses.$doc(id).delete(input?: unknown);
const command = bigCommerce.customers.addresses.$all.delete(input?: unknown);
```


### customers.addresses[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.addresses[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.addresses.$doc(id).get(input?: unknown);
const command = bigCommerce.customers.addresses.$all.get(input?: unknown);
```


### customers.addresses.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.addresses.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.addresses.list(input?: unknown);
```


### customers.addresses.update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.addresses.update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.addresses.update(input?: unknown);
```


## customers.attributes

### Endpoints

 * [create](#customersattributescreate)
 * [delete](#customersattributesdelete)
 * [delete](#customersattributesdelete)
 * [get](#customersattributesget)
 * [list](#customersattributeslist)
 * [update](#customersattributesupdate)

### customers.attributes.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.attributes.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.create(input?: unknown);
```


### customers.attributes.delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.attributes.delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.delete(input?: unknown);
```


### customers.attributes[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.attributes[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.$doc(id).delete(input?: unknown);
const command = bigCommerce.customers.attributes.$all.delete(input?: unknown);
```


### customers.attributes[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.attributes[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.$doc(id).get(input?: unknown);
const command = bigCommerce.customers.attributes.$all.get(input?: unknown);
```


### customers.attributes.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.attributes.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.list(input?: unknown);
```


### customers.attributes.update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.attributes.update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.update(input?: unknown);
```


## customers.attributes[].values

### Endpoints

 * [list](#customersattributesvalueslist)

### customers.attributes[].values.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.attributes[id|*].values.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.$doc(id).values.list(input?: unknown);
const command = bigCommerce.customers.attributes.$all.values.list(input?: unknown);
```


## customers.attributes.values

### Endpoints

 * [delete](#customersattributesvaluesdelete)
 * [delete](#customersattributesvaluesdelete)
 * [list](#customersattributesvalueslist)
 * [upsert](#customersattributesvaluesupsert)

### customers.attributes.values.delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.attributes.values.delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.values.delete(input?: unknown);
```


### customers.attributes.values[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.attributes.values[id].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.values.$doc(id).delete(input?: unknown);
```


### customers.attributes.values.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.attributes.values.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.values.list(input?: unknown);
```


### customers.attributes.values.upsert

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].customers.attributes.values.upsert' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.customers.attributes.values.upsert(input?: unknown);
```


## gift-certificates

### Endpoints

 * [create](#gift-certificatescreate)
 * [delete](#gift-certificatesdelete)
 * [get](#gift-certificatesget)
 * [list](#gift-certificateslist)
 * [update](#gift-certificatesupdate)

### gift-certificates.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].gift-certificates.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.giftCertificates.create(input?: unknown);
```


### gift-certificates[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].gift-certificates[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.giftCertificates.$doc(id).delete(input?: unknown);
const command = bigCommerce.giftCertificates.$all.delete(input?: unknown);
```


### gift-certificates[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].gift-certificates[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.giftCertificates.$doc(id).get(input?: unknown);
const command = bigCommerce.giftCertificates.$all.get(input?: unknown);
```


### gift-certificates.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].gift-certificates.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.giftCertificates.list(input?: unknown);
```


### gift-certificates[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].gift-certificates[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.giftCertificates.$doc(id).update(input?: unknown);
const command = bigCommerce.giftCertificates.$all.update(input?: unknown);
```


## orders

### Endpoints

 * [create](#orderscreate)
 * [delete](#ordersdelete)
 * [get](#ordersget)
 * [list](#orderslist)
 * [update](#ordersupdate)

### orders.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].orders.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.orders.create(input?: unknown);
```


### orders[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].orders[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.orders.$doc(id).delete(input?: unknown);
const command = bigCommerce.orders.$all.delete(input?: unknown);
```


### orders[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].orders[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.orders.$doc(id).get(input?: unknown);
const command = bigCommerce.orders.$all.get(input?: unknown);
```


### orders.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].orders.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.orders.list(input?: unknown);
```


### orders[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].orders[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.orders.$doc(id).update(input?: unknown);
const command = bigCommerce.orders.$all.update(input?: unknown);
```


## orders[].refunds

### Endpoints

 * [get](#ordersrefundsget)

### orders[].refunds.get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].orders[id|*].refunds.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.orders.$doc(id).refunds.get(input?: unknown);
const command = bigCommerce.orders.$all.refunds.get(input?: unknown);
```


## orders[].shipping-addresses

### Endpoints

 * [get](#ordersshipping-addressesget)
 * [list](#ordersshipping-addresseslist)
 * [update](#ordersshipping-addressesupdate)

### orders[].shipping-addresses[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].orders[id|*].shipping-addresses[id].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.orders.$doc(id).shippingAddresses.$doc(id).get(input?: unknown);
const command = bigCommerce.orders.$all.shippingAddresses.$doc(id).get(input?: unknown);
```


### orders[].shipping-addresses.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].orders[id|*].shipping-addresses.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.orders.$doc(id).shippingAddresses.list(input?: unknown);
const command = bigCommerce.orders.$all.shippingAddresses.list(input?: unknown);
```


### orders[].shipping-addresses[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].orders[id|*].shipping-addresses[id].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.orders.$doc(id).shippingAddresses.$doc(id).update(input?: unknown);
const command = bigCommerce.orders.$all.shippingAddresses.$doc(id).update(input?: unknown);
```


## orders[].products

### Endpoints

 * [get](#ordersproductsget)
 * [list](#ordersproductslist)

### orders[].products[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].orders[id|*].products[id].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.orders.$doc(id).products.$doc(id).get(input?: unknown);
const command = bigCommerce.orders.$all.products.$doc(id).get(input?: unknown);
```


### orders[].products.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].orders[id|*].products.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.orders.$doc(id).products.list(input?: unknown);
const command = bigCommerce.orders.$all.products.list(input?: unknown);
```


## orders.statuses

### Endpoints

 * [get](#ordersstatusesget)
 * [list](#ordersstatuseslist)

### orders.statuses[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].orders.statuses[id].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.orders.statuses.$doc(id).get(input?: unknown);
```


### orders.statuses.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].orders.statuses.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.orders.statuses.list(input?: unknown);
```


## pages

### Endpoints

 * [create](#pagescreate)
 * [delete](#pagesdelete)
 * [get](#pagesget)
 * [list](#pageslist)
 * [update](#pagesupdate)

### pages.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].pages.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.pages.create(input?: unknown);
```


### pages[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].pages[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.pages.$doc(id).delete(input?: unknown);
const command = bigCommerce.pages.$all.delete(input?: unknown);
```


### pages[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].pages[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.pages.$doc(id).get(input?: unknown);
const command = bigCommerce.pages.$all.get(input?: unknown);
```


### pages.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].pages.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.pages.list(input?: unknown);
```


### pages[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].pages[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.pages.$doc(id).update(input?: unknown);
const command = bigCommerce.pages.$all.update(input?: unknown);
```


## payment-methods

### Endpoints

 * [list](#payment-methodslist)

### payment-methods.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].payment-methods.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.paymentMethods.list(input?: unknown);
```


## products

### Endpoints

 * [create](#productscreate)
 * [delete](#productsdelete)
 * [get](#productsget)
 * [list](#productslist)
 * [update](#productsupdate)
 * [update](#productsupdate)

### products.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.create(input?: unknown);
```


### products[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.delete(input?: unknown);
```


### products[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.get(input?: unknown);
```


### products.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.list(input?: unknown);
```


### products.update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products.update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.update(input?: unknown);
```


### products[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.update(input?: unknown);
```


## products[].bulk-pricing-rules

### Endpoints

 * [create](#productsbulk-pricing-rulescreate)
 * [delete](#productsbulk-pricing-rulesdelete)
 * [get](#productsbulk-pricing-rulesget)
 * [list](#productsbulk-pricing-ruleslist)
 * [update](#productsbulk-pricing-rulesupdate)

### products[].bulk-pricing-rules.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].bulk-pricing-rules.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).bulkPricingRules.create(input?: unknown);
const command = bigCommerce.products.$all.bulkPricingRules.create(input?: unknown);
```


### products[].bulk-pricing-rules[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].bulk-pricing-rules[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).bulkPricingRules.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.bulkPricingRules.$all.delete(input?: unknown);
```


### products[].bulk-pricing-rules[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].bulk-pricing-rules[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).bulkPricingRules.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.bulkPricingRules.$all.get(input?: unknown);
```


### products[].bulk-pricing-rules.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].bulk-pricing-rules.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).bulkPricingRules.list(input?: unknown);
const command = bigCommerce.products.$all.bulkPricingRules.list(input?: unknown);
```


### products[].bulk-pricing-rules[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].bulk-pricing-rules[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).bulkPricingRules.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.bulkPricingRules.$all.update(input?: unknown);
```


## products[].complex-rules

### Endpoints

 * [create](#productscomplex-rulescreate)
 * [delete](#productscomplex-rulesdelete)
 * [get](#productscomplex-rulesget)
 * [list](#productscomplex-ruleslist)
 * [update](#productscomplex-rulesupdate)

### products[].complex-rules.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].complex-rules.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).complexRules.create(input?: unknown);
const command = bigCommerce.products.$all.complexRules.create(input?: unknown);
```


### products[].complex-rules[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].complex-rules[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).complexRules.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.complexRules.$all.delete(input?: unknown);
```


### products[].complex-rules[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].complex-rules[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).complexRules.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.complexRules.$all.get(input?: unknown);
```


### products[].complex-rules.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].complex-rules.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).complexRules.list(input?: unknown);
const command = bigCommerce.products.$all.complexRules.list(input?: unknown);
```


### products[].complex-rules[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].complex-rules[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).complexRules.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.complexRules.$all.update(input?: unknown);
```


## products[].custom-fields

### Endpoints

 * [create](#productscustom-fieldscreate)
 * [delete](#productscustom-fieldsdelete)
 * [get](#productscustom-fieldsget)
 * [list](#productscustom-fieldslist)
 * [update](#productscustom-fieldsupdate)

### products[].custom-fields.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].custom-fields.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).customFields.create(input?: unknown);
const command = bigCommerce.products.$all.customFields.create(input?: unknown);
```


### products[].custom-fields[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].custom-fields[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).customFields.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.customFields.$all.delete(input?: unknown);
```


### products[].custom-fields[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].custom-fields[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).customFields.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.customFields.$all.get(input?: unknown);
```


### products[].custom-fields.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].custom-fields.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).customFields.list(input?: unknown);
const command = bigCommerce.products.$all.customFields.list(input?: unknown);
```


### products[].custom-fields[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].custom-fields[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).customFields.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.customFields.$all.update(input?: unknown);
```


## products[].images

### Endpoints

 * [create](#productsimagescreate)
 * [delete](#productsimagesdelete)
 * [get](#productsimagesget)
 * [list](#productsimageslist)
 * [update](#productsimagesupdate)

### products[].images.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].images.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).images.create(input?: unknown);
const command = bigCommerce.products.$all.images.create(input?: unknown);
```


### products[].images[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].images[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).images.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.images.$all.delete(input?: unknown);
```


### products[].images[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].images[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).images.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.images.$all.get(input?: unknown);
```


### products[].images.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].images.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).images.list(input?: unknown);
const command = bigCommerce.products.$all.images.list(input?: unknown);
```


### products[].images[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].images[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).images.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.images.$all.update(input?: unknown);
```


## products[].metafields

### Endpoints

 * [create](#productsmetafieldscreate)
 * [delete](#productsmetafieldsdelete)
 * [get](#productsmetafieldsget)
 * [list](#productsmetafieldslist)
 * [update](#productsmetafieldsupdate)

### products[].metafields.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].metafields.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).metafields.create(input?: unknown);
const command = bigCommerce.products.$all.metafields.create(input?: unknown);
```


### products[].metafields[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].metafields[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).metafields.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.metafields.$all.delete(input?: unknown);
```


### products[].metafields[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].metafields[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).metafields.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.metafields.$all.get(input?: unknown);
```


### products[].metafields.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].metafields.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).metafields.list(input?: unknown);
const command = bigCommerce.products.$all.metafields.list(input?: unknown);
```


### products[].metafields[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].metafields[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).metafields.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.metafields.$all.update(input?: unknown);
```


## products[].modifiers

### Endpoints

 * [create](#productsmodifierscreate)
 * [delete](#productsmodifiersdelete)
 * [get](#productsmodifiersget)
 * [list](#productsmodifierslist)
 * [update](#productsmodifiersupdate)

### products[].modifiers.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].modifiers.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.create(input?: unknown);
const command = bigCommerce.products.$all.modifiers.create(input?: unknown);
```


### products[].modifiers[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].modifiers[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.delete(input?: unknown);
```


### products[].modifiers[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].modifiers[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.get(input?: unknown);
```


### products[].modifiers.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].modifiers.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.list(input?: unknown);
const command = bigCommerce.products.$all.modifiers.list(input?: unknown);
```


### products[].modifiers[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].modifiers[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.update(input?: unknown);
```


## products[].modifiers[].values

### Endpoints

 * [create](#productsmodifiersvaluescreate)
 * [delete](#productsmodifiersvaluesdelete)
 * [get](#productsmodifiersvaluesget)
 * [list](#productsmodifiersvalueslist)
 * [update](#productsmodifiersvaluesupdate)

### products[].modifiers[].values.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].modifiers[id|*].values.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).values.create(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.values.create(input?: unknown);
```


### products[].modifiers[].values[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].modifiers[id|*].values[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).values.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.values.$all.delete(input?: unknown);
```


### products[].modifiers[].values[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].modifiers[id|*].values[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).values.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.values.$all.get(input?: unknown);
```


### products[].modifiers[].values.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].modifiers[id|*].values.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).values.list(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.values.list(input?: unknown);
```


### products[].modifiers[].values[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].modifiers[id|*].values[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).values.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.values.$all.update(input?: unknown);
```


## products[].modifiers[].values[].image

### Endpoints

 * [create](#productsmodifiersvaluesimagecreate)
 * [delete](#productsmodifiersvaluesimagedelete)

### products[].modifiers[].values[].image.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].modifiers[id|*].values[id|*].image.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).values.$doc(id).image.create(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.values.$all.image.create(input?: unknown);
```


### products[].modifiers[].values[].image[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].modifiers[id|*].values[id|*].image[id].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).modifiers.$doc(id).values.$doc(id).image.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.modifiers.$all.values.$all.image.$doc(id).delete(input?: unknown);
```


## products[].options

### Endpoints

 * [create](#productsoptionscreate)
 * [delete](#productsoptionsdelete)
 * [get](#productsoptionsget)
 * [list](#productsoptionslist)
 * [update](#productsoptionsupdate)

### products[].options.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].options.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.create(input?: unknown);
const command = bigCommerce.products.$all.options.create(input?: unknown);
```


### products[].options[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].options[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.options.$all.delete(input?: unknown);
```


### products[].options[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].options[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.options.$all.get(input?: unknown);
```


### products[].options.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].options.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.list(input?: unknown);
const command = bigCommerce.products.$all.options.list(input?: unknown);
```


### products[].options[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].options[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.options.$all.update(input?: unknown);
```


## products[].options[].values

### Endpoints

 * [create](#productsoptionsvaluescreate)
 * [delete](#productsoptionsvaluesdelete)
 * [get](#productsoptionsvaluesget)
 * [list](#productsoptionsvalueslist)
 * [update](#productsoptionsvaluesupdate)

### products[].options[].values.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].options[id|*].values.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.$doc(id).values.create(input?: unknown);
const command = bigCommerce.products.$all.options.$all.values.create(input?: unknown);
```


### products[].options[].values[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].options[id|*].values[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.$doc(id).values.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.options.$all.values.$all.delete(input?: unknown);
```


### products[].options[].values[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].options[id|*].values[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.$doc(id).values.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.options.$all.values.$all.get(input?: unknown);
```


### products[].options[].values.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].options[id|*].values.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.$doc(id).values.list(input?: unknown);
const command = bigCommerce.products.$all.options.$all.values.list(input?: unknown);
```


### products[].options[].values[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].options[id|*].values[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).options.$doc(id).values.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.options.$all.values.$all.update(input?: unknown);
```


## products[].reviews

### Endpoints

 * [create](#productsreviewscreate)
 * [delete](#productsreviewsdelete)
 * [get](#productsreviewsget)
 * [list](#productsreviewslist)
 * [update](#productsreviewsupdate)

### products[].reviews.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].reviews.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).reviews.create(input?: unknown);
const command = bigCommerce.products.$all.reviews.create(input?: unknown);
```


### products[].reviews[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].reviews[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).reviews.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.reviews.$all.delete(input?: unknown);
```


### products[].reviews[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].reviews[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).reviews.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.reviews.$all.get(input?: unknown);
```


### products[].reviews.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].reviews.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).reviews.list(input?: unknown);
const command = bigCommerce.products.$all.reviews.list(input?: unknown);
```


### products[].reviews[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].reviews[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).reviews.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.reviews.$all.update(input?: unknown);
```


## products[].variants

### Endpoints

 * [create](#productsvariantscreate)
 * [delete](#productsvariantsdelete)
 * [get](#productsvariantsget)
 * [list](#productsvariantslist)
 * [update](#productsvariantsupdate)

### products[].variants.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].variants.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).variants.create(input?: unknown);
const command = bigCommerce.products.$all.variants.create(input?: unknown);
```


### products[].variants[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].variants[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).variants.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.variants.$all.delete(input?: unknown);
```


### products[].variants[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].variants[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).variants.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.variants.$all.get(input?: unknown);
```


### products[].variants.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].variants.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).variants.list(input?: unknown);
const command = bigCommerce.products.$all.variants.list(input?: unknown);
```


### products[].variants[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].variants[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).variants.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.variants.$all.update(input?: unknown);
```


## products[].variants[].metafields

### Endpoints

 * [create](#productsvariantsmetafieldscreate)
 * [delete](#productsvariantsmetafieldsdelete)
 * [get](#productsvariantsmetafieldsget)
 * [list](#productsvariantsmetafieldslist)
 * [update](#productsvariantsmetafieldsupdate)

### products[].variants[].metafields.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].variants[id|*].metafields.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).variants.$doc(id).metafields.create(input?: unknown);
const command = bigCommerce.products.$all.variants.$all.metafields.create(input?: unknown);
```


### products[].variants[].metafields[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].variants[id|*].metafields[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).variants.$doc(id).metafields.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.variants.$all.metafields.$all.delete(input?: unknown);
```


### products[].variants[].metafields[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].variants[id|*].metafields[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).variants.$doc(id).metafields.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.variants.$all.metafields.$all.get(input?: unknown);
```


### products[].variants[].metafields.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].variants[id|*].metafields.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).variants.$doc(id).metafields.list(input?: unknown);
const command = bigCommerce.products.$all.variants.$all.metafields.list(input?: unknown);
```


### products[].variants[].metafields[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].variants[id|*].metafields[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).variants.$doc(id).metafields.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.variants.$all.metafields.$all.update(input?: unknown);
```


## products[].videos

### Endpoints

 * [create](#productsvideoscreate)
 * [delete](#productsvideosdelete)
 * [get](#productsvideosget)
 * [list](#productsvideoslist)
 * [update](#productsvideosupdate)

### products[].videos.create

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].videos.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).videos.create(input?: unknown);
const command = bigCommerce.products.$all.videos.create(input?: unknown);
```


### products[].videos[].delete

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].videos[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).videos.$doc(id).delete(input?: unknown);
const command = bigCommerce.products.$all.videos.$all.delete(input?: unknown);
```


### products[].videos[].get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].videos[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).videos.$doc(id).get(input?: unknown);
const command = bigCommerce.products.$all.videos.$all.get(input?: unknown);
```


### products[].videos.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].videos.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).videos.list(input?: unknown);
const command = bigCommerce.products.$all.videos.list(input?: unknown);
```


### products[].videos[].update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products[id|*].videos[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.$doc(id).videos.$doc(id).update(input?: unknown);
const command = bigCommerce.products.$all.videos.$all.update(input?: unknown);
```


## products.variants

### Endpoints

 * [list](#productsvariantslist)
 * [update](#productsvariantsupdate)

### products.variants.list

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products.variants.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.variants.list(input?: unknown);
```


### products.variants.update

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].products.variants.update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.products.variants.update(input?: unknown);
```


## store

### Endpoints

 * [get](#storeget)

### store.get

*CLI*
```sh
$ sdm 'big-commerce[some-store-alias].store.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bigCommerce.store.get(input?: unknown);
```


