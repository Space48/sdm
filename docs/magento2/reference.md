
# Resources

 * [categories](#categories)
 * [categories.tree](#categoriestree)
 * [customers](#customers)
 * [orders](#orders)
 * [products](#products)
 * [products[].links](#productslinks)
 * [products.attributes](#productsattributes)
 * [products.attributes[].options](#productsattributesoptions)
 * [products.attribute-groups](#productsattribute-groups)
 * [products.attribute-sets](#productsattribute-sets)
 * [products.attribute-sets[].attributes](#productsattribute-setsattributes)
 * [products.attribute-sets[].groups](#productsattribute-setsgroups)
 * [products.configurables[].children](#productsconfigurableschildren)
 * [products.configurables[].options](#productsconfigurablesoptions)

## categories

### Endpoints

 * [create](#categoriescreate)
 * [create-async](#categoriescreate-async)
 * [delete](#categoriesdelete)
 * [get](#categoriesget)
 * [list](#categorieslist)
 * [update](#categoriesupdate)

### categories.create

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].categories.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.categories.create(input?: unknown);
```


### categories.create-async

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].categories.create-async' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.categories.createAsync(input?: unknown);
```


### categories[].delete

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].categories[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.categories.$doc(id).delete(input?: unknown);
const command = magento2.categories.$all.delete(input?: unknown);
```


### categories[].get

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].categories[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.categories.$doc(id).get(input?: unknown);
const command = magento2.categories.$all.get(input?: unknown);
```


### categories.list

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].categories.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.categories.list(input?: unknown);
```


### categories[].update

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].categories[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.categories.$doc(id).update(input?: unknown);
const command = magento2.categories.$all.update(input?: unknown);
```


## categories.tree

### Endpoints

 * [get](#categoriestreeget)

### categories.tree.get

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].categories.tree.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.categories.tree.get(input?: unknown);
```


## customers

### Endpoints

 * [create](#customerscreate)
 * [create-async](#customerscreate-async)
 * [delete](#customersdelete)
 * [get](#customersget)
 * [list](#customerslist)
 * [update](#customersupdate)

### customers.create

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].customers.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.customers.create(input?: unknown);
```


### customers.create-async

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].customers.create-async' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.customers.createAsync(input?: unknown);
```


### customers[].delete

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].customers[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.customers.$doc(id).delete(input?: unknown);
const command = magento2.customers.$all.delete(input?: unknown);
```


### customers[].get

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].customers[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.customers.$doc(id).get(input?: unknown);
const command = magento2.customers.$all.get(input?: unknown);
```


### customers.list

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].customers.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.customers.list(input?: unknown);
```


### customers[].update

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].customers[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.customers.$doc(id).update(input?: unknown);
const command = magento2.customers.$all.update(input?: unknown);
```


## orders

### Endpoints

 * [delete](#ordersdelete)
 * [get](#ordersget)
 * [list](#orderslist)
 * [update](#ordersupdate)

### orders[].delete

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].orders[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.orders.$doc(id).delete(input?: unknown);
const command = magento2.orders.$all.delete(input?: unknown);
```


### orders[].get

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].orders[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.orders.$doc(id).get(input?: unknown);
const command = magento2.orders.$all.get(input?: unknown);
```


### orders.list

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].orders.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.orders.list(input?: unknown);
```


### orders[].update

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].orders[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.orders.$doc(id).update(input?: unknown);
const command = magento2.orders.$all.update(input?: unknown);
```


## products

### Endpoints

 * [create](#productscreate)
 * [create-async](#productscreate-async)
 * [delete](#productsdelete)
 * [get](#productsget)
 * [list](#productslist)
 * [update](#productsupdate)

### products.create

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.create(input?: unknown);
```


### products.create-async

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.create-async' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.createAsync(input?: unknown);
```


### products[].delete

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products[sku|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.$doc(sku).delete(input?: unknown);
const command = magento2.products.$all.delete(input?: unknown);
```


### products[].get

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products[sku|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.$doc(sku).get(input?: unknown);
const command = magento2.products.$all.get(input?: unknown);
```


### products.list

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.list(input?: unknown);
```


### products[].update

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products[sku|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.$doc(sku).update(input?: unknown);
const command = magento2.products.$all.update(input?: unknown);
```


## products[].links

### Endpoints

 * [get](#productslinksget)

### products[].links[].get

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products[sku|*].links[type].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.$doc(sku).links.$doc(type).get(input?: unknown);
const command = magento2.products.$all.links.$doc(type).get(input?: unknown);
```


## products.attributes

### Endpoints

 * [create](#productsattributescreate)
 * [create-async](#productsattributescreate-async)
 * [delete](#productsattributesdelete)
 * [get](#productsattributesget)
 * [list](#productsattributeslist)
 * [update](#productsattributesupdate)

### products.attributes.create

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attributes.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributes.create(input?: unknown);
```


### products.attributes.create-async

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attributes.create-async' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributes.createAsync(input?: unknown);
```


### products.attributes[].delete

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attributes[attribute_code|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributes.$doc(attribute_code).delete(input?: unknown);
const command = magento2.products.attributes.$all.delete(input?: unknown);
```


### products.attributes[].get

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attributes[attribute_code|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributes.$doc(attribute_code).get(input?: unknown);
const command = magento2.products.attributes.$all.get(input?: unknown);
```


### products.attributes.list

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attributes.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributes.list(input?: unknown);
```


### products.attributes[].update

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attributes[attribute_code|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributes.$doc(attribute_code).update(input?: unknown);
const command = magento2.products.attributes.$all.update(input?: unknown);
```


## products.attributes[].options

### Endpoints

 * [get](#productsattributesoptionsget)

### products.attributes[].options.get

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attributes[attribute_code|*].options.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributes.$doc(attribute_code).options.get(input?: unknown);
const command = magento2.products.attributes.$all.options.get(input?: unknown);
```


## products.attribute-groups

### Endpoints

 * [create](#productsattribute-groupscreate)
 * [create-async](#productsattribute-groupscreate-async)
 * [delete](#productsattribute-groupsdelete)
 * [get](#productsattribute-groupsget)
 * [list](#productsattribute-groupslist)
 * [update](#productsattribute-groupsupdate)

### products.attribute-groups.create

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attribute-groups.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributeGroups.create(input?: unknown);
```


### products.attribute-groups.create-async

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attribute-groups.create-async' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributeGroups.createAsync(input?: unknown);
```


### products.attribute-groups[].delete

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attribute-groups[group_id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributeGroups.$doc(group_id).delete(input?: unknown);
const command = magento2.products.attributeGroups.$all.delete(input?: unknown);
```


### products.attribute-groups[].get

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attribute-groups[group_id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributeGroups.$doc(group_id).get(input?: unknown);
const command = magento2.products.attributeGroups.$all.get(input?: unknown);
```


### products.attribute-groups.list

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attribute-groups.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributeGroups.list(input?: unknown);
```


### products.attribute-groups[].update

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attribute-groups[group_id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributeGroups.$doc(group_id).update(input?: unknown);
const command = magento2.products.attributeGroups.$all.update(input?: unknown);
```


## products.attribute-sets

### Endpoints

 * [create](#productsattribute-setscreate)
 * [create-async](#productsattribute-setscreate-async)
 * [delete](#productsattribute-setsdelete)
 * [get](#productsattribute-setsget)
 * [list](#productsattribute-setslist)
 * [update](#productsattribute-setsupdate)

### products.attribute-sets.create

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attribute-sets.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributeSets.create(input?: unknown);
```


### products.attribute-sets.create-async

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attribute-sets.create-async' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributeSets.createAsync(input?: unknown);
```


### products.attribute-sets[].delete

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attribute-sets[attribute_set_id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributeSets.$doc(attribute_set_id).delete(input?: unknown);
const command = magento2.products.attributeSets.$all.delete(input?: unknown);
```


### products.attribute-sets[].get

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attribute-sets[attribute_set_id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributeSets.$doc(attribute_set_id).get(input?: unknown);
const command = magento2.products.attributeSets.$all.get(input?: unknown);
```


### products.attribute-sets.list

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attribute-sets.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributeSets.list(input?: unknown);
```


### products.attribute-sets[].update

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attribute-sets[attribute_set_id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributeSets.$doc(attribute_set_id).update(input?: unknown);
const command = magento2.products.attributeSets.$all.update(input?: unknown);
```


## products.attribute-sets[].attributes

### Endpoints

 * [delete](#productsattribute-setsattributesdelete)
 * [get](#productsattribute-setsattributesget)

### products.attribute-sets[].attributes[].delete

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attribute-sets[attribute_set_id|*].attributes[attribute_code].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributeSets.$doc(attribute_set_id).attributes.$doc(attribute_code).delete(input?: unknown);
const command = magento2.products.attributeSets.$all.attributes.$doc(attribute_code).delete(input?: unknown);
```


### products.attribute-sets[].attributes[].get

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attribute-sets[attribute_set_id|*].attributes[attribute_code].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributeSets.$doc(attribute_set_id).attributes.$doc(attribute_code).get(input?: unknown);
const command = magento2.products.attributeSets.$all.attributes.$doc(attribute_code).get(input?: unknown);
```


## products.attribute-sets[].groups

### Endpoints

 * [put](#productsattribute-setsgroupsput)

### products.attribute-sets[].groups.put

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.attribute-sets[attribute_set_id|*].groups.put' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.attributeSets.$doc(attribute_set_id).groups.put(input?: unknown);
const command = magento2.products.attributeSets.$all.groups.put(input?: unknown);
```


## products.configurables[].children

### Endpoints

 * [get](#productsconfigurableschildrenget)

### products.configurables[].children.get

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.configurables[sku].children.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.configurables.$doc(sku).children.get(input?: unknown);
```


## products.configurables[].options

### Endpoints

 * [get](#productsconfigurablesoptionsget)

### products.configurables[].options.get

*CLI*
```sh
$ sdm 'magento2[www.my-shop.com].products.configurables[sku].options.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = magento2.products.configurables.$doc(sku).options.get(input?: unknown);
```


