
# Resources

 * [categories](#categories)
 * [categories.tree](#categoriestree)
 * [customers](#customers)
 * [customers[].addresses](#customersaddresses)
 * [orders](#orders)
 * [orders[].addresses](#ordersaddresses)
 * [orders[].comments](#orderscomments)
 * [orders[].items](#ordersitems)
 * [products](#products)
 * [products[].categories](#productscategories)
 * [products[].images](#productsimages)
 * [products[].websites](#productswebsites)
 * [products[].links](#productslinks)
 * [products[].media](#productsmedia)
 * [products.attributes](#productsattributes)
 * [products.attribute-sets](#productsattribute-sets)
 * [products.attribute-sets[].attributes](#productsattribute-setsattributes)

## categories

### Endpoints

 * [get-soap](#categoriesget-soap)
 * [list-soap](#categorieslist-soap)

### categories[].get-soap

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].categories[entity_id|*].get-soap' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.categories.$doc(entity_id).getSoap(input?: unknown);
const command = magento1.categories.$all.getSoap(input?: unknown);
```


### categories.list-soap

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].categories.list-soap' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.categories.listSoap(input?: unknown);
```


## categories.tree

### Endpoints

 * [get-soap](#categoriestreeget-soap)

### categories.tree.get-soap

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].categories.tree.get-soap' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.categories.tree.getSoap(input?: unknown);
```


## customers

### Endpoints

 * [create-rest](#customerscreate-rest)
 * [delete-rest](#customersdelete-rest)
 * [get-rest](#customersget-rest)
 * [get-soap](#customersget-soap)
 * [list-rest](#customerslist-rest)
 * [list-soap](#customerslist-soap)
 * [update-rest](#customersupdate-rest)

### customers.create-rest

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].customers.create-rest' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.customers.createRest(input?: unknown);
```


### customers[].delete-rest

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].customers[entity_id|*].delete-rest' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.customers.$doc(entity_id).deleteRest(input?: unknown);
const command = magento1.customers.$all.deleteRest(input?: unknown);
```


### customers[].get-rest

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].customers[entity_id|*].get-rest' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.customers.$doc(entity_id).getRest(input?: unknown);
const command = magento1.customers.$all.getRest(input?: unknown);
```


### customers[].get-soap

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].customers[entity_id|*].get-soap' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.customers.$doc(entity_id).getSoap(input?: unknown);
const command = magento1.customers.$all.getSoap(input?: unknown);
```


### customers.list-rest

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].customers.list-rest' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.customers.listRest(input?: unknown);
```


### customers.list-soap

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].customers.list-soap' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.customers.listSoap(input?: unknown);
```


### customers[].update-rest

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].customers[entity_id|*].update-rest' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.customers.$doc(entity_id).updateRest(input?: unknown);
const command = magento1.customers.$all.updateRest(input?: unknown);
```


## customers[].addresses

### Endpoints

 * [get-rest](#customersaddressesget-rest)
 * [get-soap](#customersaddressesget-soap)

### customers[].addresses.get-rest

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].customers[entity_id|*].addresses.get-rest' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.customers.$doc(entity_id).addresses.getRest(input?: unknown);
const command = magento1.customers.$all.addresses.getRest(input?: unknown);
```


### customers[].addresses.get-soap

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].customers[entity_id|*].addresses.get-soap' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.customers.$doc(entity_id).addresses.getSoap(input?: unknown);
const command = magento1.customers.$all.addresses.getSoap(input?: unknown);
```


## orders

### Endpoints

 * [get-rest](#ordersget-rest)
 * [list-rest](#orderslist-rest)
 * [list-soap](#orderslist-soap)

### orders[].get-rest

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].orders[entity_id|*].get-rest' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.orders.$doc(entity_id).getRest(input?: unknown);
const command = magento1.orders.$all.getRest(input?: unknown);
```


### orders.list-rest

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].orders.list-rest' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.orders.listRest(input?: unknown);
```


### orders.list-soap

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].orders.list-soap' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.orders.listSoap(input?: unknown);
```


## orders[].addresses

### Endpoints

 * [get-rest](#ordersaddressesget-rest)

### orders[].addresses.get-rest

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].orders[entity_id|*].addresses.get-rest' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.orders.$doc(entity_id).addresses.getRest(input?: unknown);
const command = magento1.orders.$all.addresses.getRest(input?: unknown);
```


## orders[].comments

### Endpoints

 * [get-rest](#orderscommentsget-rest)

### orders[].comments.get-rest

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].orders[entity_id|*].comments.get-rest' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.orders.$doc(entity_id).comments.getRest(input?: unknown);
const command = magento1.orders.$all.comments.getRest(input?: unknown);
```


## orders[].items

### Endpoints

 * [get-rest](#ordersitemsget-rest)

### orders[].items.get-rest

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].orders[entity_id|*].items.get-rest' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.orders.$doc(entity_id).items.getRest(input?: unknown);
const command = magento1.orders.$all.items.getRest(input?: unknown);
```


## products

### Endpoints

 * [create-rest](#productscreate-rest)
 * [delete-rest](#productsdelete-rest)
 * [get-rest](#productsget-rest)
 * [get-soap](#productsget-soap)
 * [list-rest](#productslist-rest)
 * [update-rest](#productsupdate-rest)

### products.create-rest

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products.create-rest' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.createRest(input?: unknown);
```


### products[].delete-rest

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products[entity_id|*].delete-rest' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.$doc(entity_id).deleteRest(input?: unknown);
const command = magento1.products.$all.deleteRest(input?: unknown);
```


### products[].get-rest

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products[entity_id|*].get-rest' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.$doc(entity_id).getRest(input?: unknown);
const command = magento1.products.$all.getRest(input?: unknown);
```


### products[].get-soap

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products[entity_id|*].get-soap' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.$doc(entity_id).getSoap(input?: unknown);
const command = magento1.products.$all.getSoap(input?: unknown);
```


### products.list-rest

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products.list-rest' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.listRest(input?: unknown);
```


### products[].update-rest

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products[entity_id|*].update-rest' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.$doc(entity_id).updateRest(input?: unknown);
const command = magento1.products.$all.updateRest(input?: unknown);
```


## products[].categories

### Endpoints

 * [get-rest](#productscategoriesget-rest)

### products[].categories.get-rest

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products[entity_id|*].categories.get-rest' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.$doc(entity_id).categories.getRest(input?: unknown);
const command = magento1.products.$all.categories.getRest(input?: unknown);
```


## products[].images

### Endpoints

 * [get-rest](#productsimagesget-rest)

### products[].images.get-rest

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products[entity_id|*].images.get-rest' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.$doc(entity_id).images.getRest(input?: unknown);
const command = magento1.products.$all.images.getRest(input?: unknown);
```


## products[].websites

### Endpoints

 * [get-rest](#productswebsitesget-rest)

### products[].websites.get-rest

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products[entity_id|*].websites.get-rest' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.$doc(entity_id).websites.getRest(input?: unknown);
const command = magento1.products.$all.websites.getRest(input?: unknown);
```


## products[].links

### Endpoints

 * [get-soap](#productslinksget-soap)

### products[].links[].get-soap

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products[entity_id|*].links[type].get-soap' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.$doc(entity_id).links.$doc(type).getSoap(input?: unknown);
const command = magento1.products.$all.links.$doc(type).getSoap(input?: unknown);
```


## products[].media

### Endpoints

 * [get-soap](#productsmediaget-soap)

### products[].media.get-soap

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products[entity_id|*].media.get-soap' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.$doc(entity_id).media.getSoap(input?: unknown);
const command = magento1.products.$all.media.getSoap(input?: unknown);
```


## products.attributes

### Endpoints

 * [get-soap](#productsattributesget-soap)
 * [list-soap](#productsattributeslist-soap)

### products.attributes[].get-soap

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products.attributes[attribute_id|*].get-soap' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.attributes.$doc(attribute_id).getSoap(input?: unknown);
const command = magento1.products.attributes.$all.getSoap(input?: unknown);
```


### products.attributes.list-soap

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products.attributes.list-soap' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.attributes.listSoap(input?: unknown);
```


## products.attribute-sets

### Endpoints

 * [list-soap](#productsattribute-setslist-soap)

### products.attribute-sets.list-soap

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products.attribute-sets.list-soap' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.attributeSets.listSoap(input?: unknown);
```


## products.attribute-sets[].attributes

### Endpoints

 * [list-soap](#productsattribute-setsattributeslist-soap)

### products.attribute-sets[].attributes.list-soap

*CLI*
```sh
$ sdm 'magento1[www.my-shop.com].products.attribute-sets[attribute_set_id|*].attributes.list-soap' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento1.products.attributeSets.$doc(attribute_set_id).attributes.listSoap(input?: unknown);
const command = magento1.products.attributeSets.$all.attributes.listSoap(input?: unknown);
```


