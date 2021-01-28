
# Using the CLI interface

# Using the TypeScript interface

# Resources

 * [categories](#categories)
 * [categories.tree](#categories.tree)
 * [customers](#customers)
 * [orders](#orders)
 * [products](#products)
 * [products[].links](#products[].links)
 * [products.attributes](#products.attributes)
 * [products.attributes[].options](#products.attributes[].options)
 * [products.configurables[].children](#products.configurables[].children)
 * [products.configurables[].options](#products.configurables[].options)

## categories

 * [create](#categories.create)
 * [delete](#categories[].delete)
 * [get](#categories[].get)
 * [list](#categories.list)
 * [update](#categories[].update)

### categories.create

*CLI*
```sh
$ sdm magento2[www.my-shop.com].categories.create
```

*TypeScript*
```javascript
const command = magento2.categories.create(input?: unknown);
```


### categories[].delete

*CLI*
```sh
$ sdm magento2[www.my-shop.com].categories[id|*].delete
```

*TypeScript*
```javascript
const command = magento2.categories.$doc(id).delete(input?: unknown);
const command = magento2.categories.$all.delete(input?: unknown);
```


### categories[].get

*CLI*
```sh
$ sdm magento2[www.my-shop.com].categories[id|*].get
```

*TypeScript*
```javascript
const command = magento2.categories.$doc(id).get(input?: unknown);
const command = magento2.categories.$all.get(input?: unknown);
```


### categories.list

*CLI*
```sh
$ sdm magento2[www.my-shop.com].categories.list
```

*TypeScript*
```javascript
const command = magento2.categories.list(input?: unknown);
```


### categories[].update

*CLI*
```sh
$ sdm magento2[www.my-shop.com].categories[id|*].update
```

*TypeScript*
```javascript
const command = magento2.categories.$doc(id).update(input?: unknown);
const command = magento2.categories.$all.update(input?: unknown);
```


## categories.tree

 * [get](#categories.tree.get)

### categories.tree.get

*CLI*
```sh
$ sdm magento2[www.my-shop.com].categories.tree.get
```

*TypeScript*
```javascript
const command = magento2.categories.tree.get(input?: unknown);
```


## customers

 * [create](#customers.create)
 * [delete](#customers[].delete)
 * [get](#customers[].get)
 * [list](#customers.list)
 * [update](#customers[].update)

### customers.create

*CLI*
```sh
$ sdm magento2[www.my-shop.com].customers.create
```

*TypeScript*
```javascript
const command = magento2.customers.create(input?: unknown);
```


### customers[].delete

*CLI*
```sh
$ sdm magento2[www.my-shop.com].customers[id|*].delete
```

*TypeScript*
```javascript
const command = magento2.customers.$doc(id).delete(input?: unknown);
const command = magento2.customers.$all.delete(input?: unknown);
```


### customers[].get

*CLI*
```sh
$ sdm magento2[www.my-shop.com].customers[id|*].get
```

*TypeScript*
```javascript
const command = magento2.customers.$doc(id).get(input?: unknown);
const command = magento2.customers.$all.get(input?: unknown);
```


### customers.list

*CLI*
```sh
$ sdm magento2[www.my-shop.com].customers.list
```

*TypeScript*
```javascript
const command = magento2.customers.list(input?: unknown);
```


### customers[].update

*CLI*
```sh
$ sdm magento2[www.my-shop.com].customers[id|*].update
```

*TypeScript*
```javascript
const command = magento2.customers.$doc(id).update(input?: unknown);
const command = magento2.customers.$all.update(input?: unknown);
```


## orders

 * [delete](#orders[].delete)
 * [get](#orders[].get)
 * [list](#orders.list)
 * [update](#orders[].update)

### orders[].delete

*CLI*
```sh
$ sdm magento2[www.my-shop.com].orders[id|*].delete
```

*TypeScript*
```javascript
const command = magento2.orders.$doc(id).delete(input?: unknown);
const command = magento2.orders.$all.delete(input?: unknown);
```


### orders[].get

*CLI*
```sh
$ sdm magento2[www.my-shop.com].orders[id|*].get
```

*TypeScript*
```javascript
const command = magento2.orders.$doc(id).get(input?: unknown);
const command = magento2.orders.$all.get(input?: unknown);
```


### orders.list

*CLI*
```sh
$ sdm magento2[www.my-shop.com].orders.list
```

*TypeScript*
```javascript
const command = magento2.orders.list(input?: unknown);
```


### orders[].update

*CLI*
```sh
$ sdm magento2[www.my-shop.com].orders[id|*].update
```

*TypeScript*
```javascript
const command = magento2.orders.$doc(id).update(input?: unknown);
const command = magento2.orders.$all.update(input?: unknown);
```


## products

 * [create](#products.create)
 * [delete](#products[].delete)
 * [get](#products[].get)
 * [list](#products.list)
 * [update](#products[].update)

### products.create

*CLI*
```sh
$ sdm magento2[www.my-shop.com].products.create
```

*TypeScript*
```javascript
const command = magento2.products.create(input?: unknown);
```


### products[].delete

*CLI*
```sh
$ sdm magento2[www.my-shop.com].products[sku|*].delete
```

*TypeScript*
```javascript
const command = magento2.products.$doc(sku).delete(input?: unknown);
const command = magento2.products.$all.delete(input?: unknown);
```


### products[].get

*CLI*
```sh
$ sdm magento2[www.my-shop.com].products[sku|*].get
```

*TypeScript*
```javascript
const command = magento2.products.$doc(sku).get(input?: unknown);
const command = magento2.products.$all.get(input?: unknown);
```


### products.list

*CLI*
```sh
$ sdm magento2[www.my-shop.com].products.list
```

*TypeScript*
```javascript
const command = magento2.products.list(input?: unknown);
```


### products[].update

*CLI*
```sh
$ sdm magento2[www.my-shop.com].products[sku|*].update
```

*TypeScript*
```javascript
const command = magento2.products.$doc(sku).update(input?: unknown);
const command = magento2.products.$all.update(input?: unknown);
```


## products[].links

 * [get](#products[].links[].get)

### products[].links[].get

*CLI*
```sh
$ sdm magento2[www.my-shop.com].products[sku|*].links[type].get
```

*TypeScript*
```javascript
const command = magento2.products.$doc(sku).links.$doc(type).get(input?: unknown);
const command = magento2.products.$all.links.$doc(type).get(input?: unknown);
```


## products.attributes

 * [list](#products.attributes.list)

### products.attributes.list

*CLI*
```sh
$ sdm magento2[www.my-shop.com].products.attributes.list
```

*TypeScript*
```javascript
const command = magento2.products.attributes.list(input?: unknown);
```


## products.attributes[].options

 * [get](#products.attributes[].options.get)

### products.attributes[].options.get

*CLI*
```sh
$ sdm magento2[www.my-shop.com].products.attributes[attribute_code].options.get
```

*TypeScript*
```javascript
const command = magento2.products.attributes.$doc(attribute_code).options.get(input?: unknown);
```


## products.configurables[].children

 * [get](#products.configurables[].children.get)

### products.configurables[].children.get

*CLI*
```sh
$ sdm magento2[www.my-shop.com].products.configurables[sku].children.get
```

*TypeScript*
```javascript
const command = magento2.products.configurables.$doc(sku).children.get(input?: unknown);
```


## products.configurables[].options

 * [get](#products.configurables[].options.get)

### products.configurables[].options.get

*CLI*
```sh
$ sdm magento2[www.my-shop.com].products.configurables[sku].options.get
```

*TypeScript*
```javascript
const command = magento2.products.configurables.$doc(sku).options.get(input?: unknown);
```


