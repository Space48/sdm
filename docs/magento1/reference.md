
# Resources

 * [categories](#categories)
 * [category-tree](#category-tree)
 * [customers](#customers)
 * [customers[].addresses](#customersaddresses)
 * [customers[].addresses-soap](#customersaddresses-soap)
 * [customers[].info](#customersinfo)
 * [orders](#orders)
 * [orders[].addresses](#ordersaddresses)
 * [orders[].comments](#orderscomments)
 * [orders[].items](#ordersitems)
 * [products](#products)
 * [products[].categories](#productscategories)
 * [products[].images](#productsimages)
 * [products[].websites](#productswebsites)
 * [products[].info](#productsinfo)
 * [products[].links](#productslinks)
 * [products[].media](#productsmedia)
 * [products.attributes](#productsattributes)
 * [products.attribute-sets](#productsattribute-sets)
 * [products.attribute-sets[].attributes](#productsattribute-setsattributes)

## categories

### Endpoints

 * [get](#categoriesget)
 * [list](#categorieslist)

### categories[].get

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].categories[entity_id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.categories.$doc(entity_id).get(input?: unknown);
const command = magento1.categories.$all.get(input?: unknown);
```


### categories.list

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].categories.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.categories.list(input?: unknown);
```


## category-tree

### Endpoints

 * [get](#category-treeget)

### category-tree.get

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].category-tree.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.categoryTree.get(input?: unknown);
```


## customers

### Endpoints

 * [create](#customerscreate)
 * [delete](#customersdelete)
 * [get](#customersget)
 * [list](#customerslist)
 * [update](#customersupdate)

### customers.create

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].customers.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.customers.create(input?: unknown);
```


### customers[].delete

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].customers[entity_id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.customers.$doc(entity_id).delete(input?: unknown);
const command = magento1.customers.$all.delete(input?: unknown);
```


### customers[].get

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].customers[entity_id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.customers.$doc(entity_id).get(input?: unknown);
const command = magento1.customers.$all.get(input?: unknown);
```


### customers.list

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].customers.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.customers.list(input?: unknown);
```


### customers[].update

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].customers[entity_id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.customers.$doc(entity_id).update(input?: unknown);
const command = magento1.customers.$all.update(input?: unknown);
```


## customers[].addresses

### Endpoints

 * [get](#customersaddressesget)

### customers[].addresses.get

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].customers[entity_id|*].addresses.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.customers.$doc(entity_id).addresses.get(input?: unknown);
const command = magento1.customers.$all.addresses.get(input?: unknown);
```


## customers[].addresses-soap

### Endpoints

 * [get](#customersaddresses-soapget)

### customers[].addresses-soap.get

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].customers[entity_id|*].addresses-soap.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.customers.$doc(entity_id).addressesSoap.get(input?: unknown);
const command = magento1.customers.$all.addressesSoap.get(input?: unknown);
```


## customers[].info

### Endpoints

 * [get](#customersinfoget)

### customers[].info.get

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].customers[entity_id|*].info.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.customers.$doc(entity_id).info.get(input?: unknown);
const command = magento1.customers.$all.info.get(input?: unknown);
```


## orders

### Endpoints

 * [get](#ordersget)
 * [list](#orderslist)

### orders[].get

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].orders[entity_id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.orders.$doc(entity_id).get(input?: unknown);
const command = magento1.orders.$all.get(input?: unknown);
```


### orders.list

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].orders.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.orders.list(input?: unknown);
```


## orders[].addresses

### Endpoints

 * [get](#ordersaddressesget)

### orders[].addresses.get

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].orders[entity_id|*].addresses.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.orders.$doc(entity_id).addresses.get(input?: unknown);
const command = magento1.orders.$all.addresses.get(input?: unknown);
```


## orders[].comments

### Endpoints

 * [get](#orderscommentsget)

### orders[].comments.get

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].orders[entity_id|*].comments.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.orders.$doc(entity_id).comments.get(input?: unknown);
const command = magento1.orders.$all.comments.get(input?: unknown);
```


## orders[].items

### Endpoints

 * [get](#ordersitemsget)

### orders[].items.get

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].orders[entity_id|*].items.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.orders.$doc(entity_id).items.get(input?: unknown);
const command = magento1.orders.$all.items.get(input?: unknown);
```


## products

### Endpoints

 * [create](#productscreate)
 * [delete](#productsdelete)
 * [get](#productsget)
 * [list](#productslist)
 * [update](#productsupdate)

### products.create

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.create(input?: unknown);
```


### products[].delete

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products[entity_id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.$doc(entity_id).delete(input?: unknown);
const command = magento1.products.$all.delete(input?: unknown);
```


### products[].get

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products[entity_id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.$doc(entity_id).get(input?: unknown);
const command = magento1.products.$all.get(input?: unknown);
```


### products.list

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.list(input?: unknown);
```


### products[].update

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products[entity_id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.$doc(entity_id).update(input?: unknown);
const command = magento1.products.$all.update(input?: unknown);
```


## products[].categories

### Endpoints

 * [get](#productscategoriesget)

### products[].categories.get

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products[entity_id|*].categories.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.$doc(entity_id).categories.get(input?: unknown);
const command = magento1.products.$all.categories.get(input?: unknown);
```


## products[].images

### Endpoints

 * [get](#productsimagesget)

### products[].images.get

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products[entity_id|*].images.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.$doc(entity_id).images.get(input?: unknown);
const command = magento1.products.$all.images.get(input?: unknown);
```


## products[].websites

### Endpoints

 * [get](#productswebsitesget)

### products[].websites.get

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products[entity_id|*].websites.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.$doc(entity_id).websites.get(input?: unknown);
const command = magento1.products.$all.websites.get(input?: unknown);
```


## products[].info

### Endpoints

 * [get](#productsinfoget)

### products[].info.get

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products[entity_id|*].info.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.$doc(entity_id).info.get(input?: unknown);
const command = magento1.products.$all.info.get(input?: unknown);
```


## products[].links

### Endpoints

 * [get](#productslinksget)

### products[].links[].get

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products[entity_id|*].links[type].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.$doc(entity_id).links.$doc(type).get(input?: unknown);
const command = magento1.products.$all.links.$doc(type).get(input?: unknown);
```


## products[].media

### Endpoints

 * [get](#productsmediaget)

### products[].media.get

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products[entity_id|*].media.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.$doc(entity_id).media.get(input?: unknown);
const command = magento1.products.$all.media.get(input?: unknown);
```


## products.attributes

### Endpoints

 * [get](#productsattributesget)
 * [list](#productsattributeslist)

### products.attributes[].get

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products.attributes[attribute_id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.attributes.$doc(attribute_id).get(input?: unknown);
const command = magento1.products.attributes.$all.get(input?: unknown);
```


### products.attributes.list

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products.attributes.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.attributes.list(input?: unknown);
```


## products.attribute-sets

### Endpoints

 * [list](#productsattribute-setslist)

### products.attribute-sets.list

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products.attribute-sets.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.attributeSets.list(input?: unknown);
```


## products.attribute-sets[].attributes

### Endpoints

 * [list](#productsattribute-setsattributeslist)

### products.attribute-sets[].attributes.list

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products.attribute-sets[attribute_set_id|*].attributes.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.attributeSets.$doc(attribute_set_id).attributes.list(input?: unknown);
const command = magento1.products.attributeSets.$all.attributes.list(input?: unknown);
```


