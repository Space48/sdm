
# Using the CLI interface

# Using the TypeScript interface

# Resources

 * [access-scope](#access-scope)
 * [api-permission](#api-permission)
 * [application-credit](#application-credit)
 * [blog](#blog)
 * [blog[].article](#blog[].article)
 * [carrier-service](#carrier-service)
 * [collect](#collect)
 * [collection-listing](#collection-listing)
 * [collection](#collection)
 * [country](#country)
 * [country[].province](#country[].province)
 * [currency](#currency)
 * [custom-collection](#custom-collection)
 * [customer](#customer)
 * [customer[].customer-address](#customer[].customer-address)
 * [dispute](#dispute)
 * [draft-order](#draft-order)
 * [event](#event)
 * [fulfillment-service](#fulfillment-service)
 * [gift-card](#gift-card)
 * [gift-card[].gift-card-adjustment](#gift-card[].gift-card-adjustment)
 * [inventory-item](#inventory-item)
 * [inventory-level](#inventory-level)
 * [location](#location)
 * [metafield](#metafield)
 * [order](#order)
 * [order[].fulfillment](#order[].fulfillment)
 * [order[].fulfillment[].fulfillment-event](#order[].fulfillment[].fulfillment-event)
 * [order[].order-risk](#order[].order-risk)
 * [order[].refund](#order[].refund)
 * [order[].transaction](#order[].transaction)
 * [page](#page)
 * [payout](#payout)
 * [policy](#policy)
 * [price-rule](#price-rule)
 * [price-rule[].discount-code](#price-rule[].discount-code)
 * [product-listing](#product-listing)
 * [product](#product)
 * [product[].product-image](#product[].product-image)
 * [product[].product-resource-feedback](#product[].product-resource-feedback)
 * [product[].product-variant](#product[].product-variant)
 * [redirect](#redirect)
 * [report](#report)
 * [resource-feedback](#resource-feedback)
 * [script-tag](#script-tag)
 * [shipping-zone](#shipping-zone)
 * [shop](#shop)
 * [smart-collection](#smart-collection)
 * [storefront-access-token](#storefront-access-token)
 * [tender-transaction](#tender-transaction)
 * [theme](#theme)
 * [theme[].asset](#theme[].asset)
 * [user](#user)
 * [webhook](#webhook)

## access-scope

 * [list](#access-scope.list)

### access-scope.list

*CLI*
```sh
$ sdm shopify[my-shop-name].access-scope.list
```

*TypeScript*
```javascript
const command = shopify.accessScope.list(input?: unknown);
```


## api-permission

 * [delete](#api-permission[].delete)

### api-permission[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].api-permission[id].delete
```

*TypeScript*
```javascript
const command = shopify.apiPermission.$doc(id).delete(input?: unknown);
```


## application-credit

 * [create](#application-credit.create)
 * [get](#application-credit[].get)
 * [list](#application-credit.list)

### application-credit.create

*CLI*
```sh
$ sdm shopify[my-shop-name].application-credit.create
```

*TypeScript*
```javascript
const command = shopify.applicationCredit.create(input?: unknown);
```


### application-credit[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].application-credit[id|*].get
```

*TypeScript*
```javascript
const command = shopify.applicationCredit.$doc(id).get(input?: unknown);
const command = shopify.applicationCredit.$all.get(input?: unknown);
```


### application-credit.list

*CLI*
```sh
$ sdm shopify[my-shop-name].application-credit.list
```

*TypeScript*
```javascript
const command = shopify.applicationCredit.list(input?: unknown);
```


## blog

 * [count](#blog.count)
 * [create](#blog.create)
 * [delete](#blog[].delete)
 * [get](#blog[].get)
 * [list](#blog.list)
 * [update](#blog[].update)

### blog.count

*CLI*
```sh
$ sdm shopify[my-shop-name].blog.count
```

*TypeScript*
```javascript
const command = shopify.blog.count(input?: unknown);
```


### blog.create

*CLI*
```sh
$ sdm shopify[my-shop-name].blog.create
```

*TypeScript*
```javascript
const command = shopify.blog.create(input?: unknown);
```


### blog[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].blog[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).delete(input?: unknown);
const command = shopify.blog.$all.delete(input?: unknown);
```


### blog[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].blog[id|*].get
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).get(input?: unknown);
const command = shopify.blog.$all.get(input?: unknown);
```


### blog.list

*CLI*
```sh
$ sdm shopify[my-shop-name].blog.list
```

*TypeScript*
```javascript
const command = shopify.blog.list(input?: unknown);
```


### blog[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].blog[id|*].update
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).update(input?: unknown);
const command = shopify.blog.$all.update(input?: unknown);
```


## blog[].article

 * [count](#blog[].article.count)
 * [create](#blog[].article.create)
 * [delete](#blog[].article[].delete)
 * [get](#blog[].article[].get)
 * [list](#blog[].article.list)
 * [tags](#blog[].article[].tags)
 * [update](#blog[].article[].update)

### blog[].article.count

*CLI*
```sh
$ sdm shopify[my-shop-name].blog[id|*].article.count
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.count(input?: unknown);
const command = shopify.blog.$all.article.count(input?: unknown);
```


### blog[].article.create

*CLI*
```sh
$ sdm shopify[my-shop-name].blog[id|*].article.create
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.create(input?: unknown);
const command = shopify.blog.$all.article.create(input?: unknown);
```


### blog[].article[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].blog[id|*].article[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.$doc(id).delete(input?: unknown);
const command = shopify.blog.$all.article.$all.delete(input?: unknown);
```


### blog[].article[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].blog[id|*].article[id|*].get
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.$doc(id).get(input?: unknown);
const command = shopify.blog.$all.article.$all.get(input?: unknown);
```


### blog[].article.list

*CLI*
```sh
$ sdm shopify[my-shop-name].blog[id|*].article.list
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.list(input?: unknown);
const command = shopify.blog.$all.article.list(input?: unknown);
```


### blog[].article[].tags

*CLI*
```sh
$ sdm shopify[my-shop-name].blog[id|*].article[id|*].tags
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.$doc(id).tags(input?: unknown);
const command = shopify.blog.$all.article.$all.tags(input?: unknown);
```


### blog[].article[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].blog[id|*].article[id|*].update
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.$doc(id).update(input?: unknown);
const command = shopify.blog.$all.article.$all.update(input?: unknown);
```


## carrier-service

 * [create](#carrier-service.create)
 * [delete](#carrier-service[].delete)
 * [get](#carrier-service[].get)
 * [list](#carrier-service.list)
 * [update](#carrier-service[].update)

### carrier-service.create

*CLI*
```sh
$ sdm shopify[my-shop-name].carrier-service.create
```

*TypeScript*
```javascript
const command = shopify.carrierService.create(input?: unknown);
```


### carrier-service[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].carrier-service[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.carrierService.$doc(id).delete(input?: unknown);
const command = shopify.carrierService.$all.delete(input?: unknown);
```


### carrier-service[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].carrier-service[id|*].get
```

*TypeScript*
```javascript
const command = shopify.carrierService.$doc(id).get(input?: unknown);
const command = shopify.carrierService.$all.get(input?: unknown);
```


### carrier-service.list

*CLI*
```sh
$ sdm shopify[my-shop-name].carrier-service.list
```

*TypeScript*
```javascript
const command = shopify.carrierService.list(input?: unknown);
```


### carrier-service[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].carrier-service[id|*].update
```

*TypeScript*
```javascript
const command = shopify.carrierService.$doc(id).update(input?: unknown);
const command = shopify.carrierService.$all.update(input?: unknown);
```


## collect

 * [count](#collect.count)
 * [create](#collect.create)
 * [delete](#collect[].delete)
 * [get](#collect[].get)
 * [list](#collect.list)

### collect.count

*CLI*
```sh
$ sdm shopify[my-shop-name].collect.count
```

*TypeScript*
```javascript
const command = shopify.collect.count(input?: unknown);
```


### collect.create

*CLI*
```sh
$ sdm shopify[my-shop-name].collect.create
```

*TypeScript*
```javascript
const command = shopify.collect.create(input?: unknown);
```


### collect[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].collect[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.collect.$doc(id).delete(input?: unknown);
const command = shopify.collect.$all.delete(input?: unknown);
```


### collect[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].collect[id|*].get
```

*TypeScript*
```javascript
const command = shopify.collect.$doc(id).get(input?: unknown);
const command = shopify.collect.$all.get(input?: unknown);
```


### collect.list

*CLI*
```sh
$ sdm shopify[my-shop-name].collect.list
```

*TypeScript*
```javascript
const command = shopify.collect.list(input?: unknown);
```


## collection-listing

 * [get](#collection-listing[].get)
 * [list](#collection-listing.list)

### collection-listing[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].collection-listing[id|*].get
```

*TypeScript*
```javascript
const command = shopify.collectionListing.$doc(id).get(input?: unknown);
const command = shopify.collectionListing.$all.get(input?: unknown);
```


### collection-listing.list

*CLI*
```sh
$ sdm shopify[my-shop-name].collection-listing.list
```

*TypeScript*
```javascript
const command = shopify.collectionListing.list(input?: unknown);
```


## collection

 * [get](#collection[].get)
 * [products](#collection[].products)

### collection[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].collection[id].get
```

*TypeScript*
```javascript
const command = shopify.collection.$doc(id).get(input?: unknown);
```


### collection[].products

*CLI*
```sh
$ sdm shopify[my-shop-name].collection[id].products
```

*TypeScript*
```javascript
const command = shopify.collection.$doc(id).products(input?: unknown);
```


## country

 * [count](#country.count)
 * [create](#country.create)
 * [delete](#country[].delete)
 * [get](#country[].get)
 * [list](#country.list)
 * [update](#country[].update)

### country.count

*CLI*
```sh
$ sdm shopify[my-shop-name].country.count
```

*TypeScript*
```javascript
const command = shopify.country.count(input?: unknown);
```


### country.create

*CLI*
```sh
$ sdm shopify[my-shop-name].country.create
```

*TypeScript*
```javascript
const command = shopify.country.create(input?: unknown);
```


### country[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].country[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.country.$doc(id).delete(input?: unknown);
const command = shopify.country.$all.delete(input?: unknown);
```


### country[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].country[id|*].get
```

*TypeScript*
```javascript
const command = shopify.country.$doc(id).get(input?: unknown);
const command = shopify.country.$all.get(input?: unknown);
```


### country.list

*CLI*
```sh
$ sdm shopify[my-shop-name].country.list
```

*TypeScript*
```javascript
const command = shopify.country.list(input?: unknown);
```


### country[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].country[id|*].update
```

*TypeScript*
```javascript
const command = shopify.country.$doc(id).update(input?: unknown);
const command = shopify.country.$all.update(input?: unknown);
```


## country[].province

 * [count](#country[].province.count)
 * [get](#country[].province[].get)
 * [list](#country[].province.list)
 * [update](#country[].province[].update)

### country[].province.count

*CLI*
```sh
$ sdm shopify[my-shop-name].country[id|*].province.count
```

*TypeScript*
```javascript
const command = shopify.country.$doc(id).province.count(input?: unknown);
const command = shopify.country.$all.province.count(input?: unknown);
```


### country[].province[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].country[id|*].province[id|*].get
```

*TypeScript*
```javascript
const command = shopify.country.$doc(id).province.$doc(id).get(input?: unknown);
const command = shopify.country.$all.province.$all.get(input?: unknown);
```


### country[].province.list

*CLI*
```sh
$ sdm shopify[my-shop-name].country[id|*].province.list
```

*TypeScript*
```javascript
const command = shopify.country.$doc(id).province.list(input?: unknown);
const command = shopify.country.$all.province.list(input?: unknown);
```


### country[].province[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].country[id|*].province[id|*].update
```

*TypeScript*
```javascript
const command = shopify.country.$doc(id).province.$doc(id).update(input?: unknown);
const command = shopify.country.$all.province.$all.update(input?: unknown);
```


## currency

 * [list](#currency.list)

### currency.list

*CLI*
```sh
$ sdm shopify[my-shop-name].currency.list
```

*TypeScript*
```javascript
const command = shopify.currency.list(input?: unknown);
```


## custom-collection

 * [count](#custom-collection.count)
 * [create](#custom-collection.create)
 * [delete](#custom-collection[].delete)
 * [get](#custom-collection[].get)
 * [list](#custom-collection.list)
 * [update](#custom-collection[].update)

### custom-collection.count

*CLI*
```sh
$ sdm shopify[my-shop-name].custom-collection.count
```

*TypeScript*
```javascript
const command = shopify.customCollection.count(input?: unknown);
```


### custom-collection.create

*CLI*
```sh
$ sdm shopify[my-shop-name].custom-collection.create
```

*TypeScript*
```javascript
const command = shopify.customCollection.create(input?: unknown);
```


### custom-collection[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].custom-collection[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.customCollection.$doc(id).delete(input?: unknown);
const command = shopify.customCollection.$all.delete(input?: unknown);
```


### custom-collection[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].custom-collection[id|*].get
```

*TypeScript*
```javascript
const command = shopify.customCollection.$doc(id).get(input?: unknown);
const command = shopify.customCollection.$all.get(input?: unknown);
```


### custom-collection.list

*CLI*
```sh
$ sdm shopify[my-shop-name].custom-collection.list
```

*TypeScript*
```javascript
const command = shopify.customCollection.list(input?: unknown);
```


### custom-collection[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].custom-collection[id|*].update
```

*TypeScript*
```javascript
const command = shopify.customCollection.$doc(id).update(input?: unknown);
const command = shopify.customCollection.$all.update(input?: unknown);
```


## customer

 * [count](#customer.count)
 * [create](#customer.create)
 * [delete](#customer[].delete)
 * [get](#customer[].get)
 * [list](#customer.list)
 * [orders](#customer[].orders)
 * [send-invite](#customer[].send-invite)
 * [update](#customer[].update)

### customer.count

*CLI*
```sh
$ sdm shopify[my-shop-name].customer.count
```

*TypeScript*
```javascript
const command = shopify.customer.count(input?: unknown);
```


### customer.create

*CLI*
```sh
$ sdm shopify[my-shop-name].customer.create
```

*TypeScript*
```javascript
const command = shopify.customer.create(input?: unknown);
```


### customer[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).delete(input?: unknown);
const command = shopify.customer.$all.delete(input?: unknown);
```


### customer[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].get
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).get(input?: unknown);
const command = shopify.customer.$all.get(input?: unknown);
```


### customer.list

*CLI*
```sh
$ sdm shopify[my-shop-name].customer.list
```

*TypeScript*
```javascript
const command = shopify.customer.list(input?: unknown);
```


### customer[].orders

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].orders
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).orders(input?: unknown);
const command = shopify.customer.$all.orders(input?: unknown);
```


### customer[].send-invite

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].send-invite
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).sendInvite(input?: unknown);
const command = shopify.customer.$all.sendInvite(input?: unknown);
```


### customer[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].update
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).update(input?: unknown);
const command = shopify.customer.$all.update(input?: unknown);
```


## customer[].customer-address

 * [create](#customer[].customer-address.create)
 * [default](#customer[].customer-address[].default)
 * [delete](#customer[].customer-address[].delete)
 * [get](#customer[].customer-address[].get)
 * [list](#customer[].customer-address.list)
 * [set](#customer[].customer-address.set)
 * [update](#customer[].customer-address[].update)

### customer[].customer-address.create

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].customer-address.create
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.create(input?: unknown);
const command = shopify.customer.$all.customerAddress.create(input?: unknown);
```


### customer[].customer-address[].default

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].customer-address[id|*].default
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.$doc(id).default(input?: unknown);
const command = shopify.customer.$all.customerAddress.$all.default(input?: unknown);
```


### customer[].customer-address[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].customer-address[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.$doc(id).delete(input?: unknown);
const command = shopify.customer.$all.customerAddress.$all.delete(input?: unknown);
```


### customer[].customer-address[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].customer-address[id|*].get
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.$doc(id).get(input?: unknown);
const command = shopify.customer.$all.customerAddress.$all.get(input?: unknown);
```


### customer[].customer-address.list

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].customer-address.list
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.list(input?: unknown);
const command = shopify.customer.$all.customerAddress.list(input?: unknown);
```


### customer[].customer-address.set

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].customer-address.set
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.set(input?: unknown);
const command = shopify.customer.$all.customerAddress.set(input?: unknown);
```


### customer[].customer-address[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].customer-address[id|*].update
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.$doc(id).update(input?: unknown);
const command = shopify.customer.$all.customerAddress.$all.update(input?: unknown);
```


## dispute

 * [get](#dispute[].get)
 * [list](#dispute.list)

### dispute[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].dispute[id|*].get
```

*TypeScript*
```javascript
const command = shopify.dispute.$doc(id).get(input?: unknown);
const command = shopify.dispute.$all.get(input?: unknown);
```


### dispute.list

*CLI*
```sh
$ sdm shopify[my-shop-name].dispute.list
```

*TypeScript*
```javascript
const command = shopify.dispute.list(input?: unknown);
```


## draft-order

 * [complete](#draft-order[].complete)
 * [count](#draft-order.count)
 * [create](#draft-order.create)
 * [delete](#draft-order[].delete)
 * [get](#draft-order[].get)
 * [list](#draft-order.list)
 * [send-invoice](#draft-order[].send-invoice)
 * [update](#draft-order[].update)

### draft-order[].complete

*CLI*
```sh
$ sdm shopify[my-shop-name].draft-order[id|*].complete
```

*TypeScript*
```javascript
const command = shopify.draftOrder.$doc(id).complete(input?: unknown);
const command = shopify.draftOrder.$all.complete(input?: unknown);
```


### draft-order.count

*CLI*
```sh
$ sdm shopify[my-shop-name].draft-order.count
```

*TypeScript*
```javascript
const command = shopify.draftOrder.count(input?: unknown);
```


### draft-order.create

*CLI*
```sh
$ sdm shopify[my-shop-name].draft-order.create
```

*TypeScript*
```javascript
const command = shopify.draftOrder.create(input?: unknown);
```


### draft-order[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].draft-order[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.draftOrder.$doc(id).delete(input?: unknown);
const command = shopify.draftOrder.$all.delete(input?: unknown);
```


### draft-order[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].draft-order[id|*].get
```

*TypeScript*
```javascript
const command = shopify.draftOrder.$doc(id).get(input?: unknown);
const command = shopify.draftOrder.$all.get(input?: unknown);
```


### draft-order.list

*CLI*
```sh
$ sdm shopify[my-shop-name].draft-order.list
```

*TypeScript*
```javascript
const command = shopify.draftOrder.list(input?: unknown);
```


### draft-order[].send-invoice

*CLI*
```sh
$ sdm shopify[my-shop-name].draft-order[id|*].send-invoice
```

*TypeScript*
```javascript
const command = shopify.draftOrder.$doc(id).sendInvoice(input?: unknown);
const command = shopify.draftOrder.$all.sendInvoice(input?: unknown);
```


### draft-order[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].draft-order[id|*].update
```

*TypeScript*
```javascript
const command = shopify.draftOrder.$doc(id).update(input?: unknown);
const command = shopify.draftOrder.$all.update(input?: unknown);
```


## event

 * [create](#event.create)
 * [delete](#event[].delete)
 * [get](#event[].get)
 * [list](#event.list)
 * [update](#event[].update)

### event.create

*CLI*
```sh
$ sdm shopify[my-shop-name].event.create
```

*TypeScript*
```javascript
const command = shopify.event.create(input?: unknown);
```


### event[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].event[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.event.$doc(id).delete(input?: unknown);
const command = shopify.event.$all.delete(input?: unknown);
```


### event[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].event[id|*].get
```

*TypeScript*
```javascript
const command = shopify.event.$doc(id).get(input?: unknown);
const command = shopify.event.$all.get(input?: unknown);
```


### event.list

*CLI*
```sh
$ sdm shopify[my-shop-name].event.list
```

*TypeScript*
```javascript
const command = shopify.event.list(input?: unknown);
```


### event[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].event[id|*].update
```

*TypeScript*
```javascript
const command = shopify.event.$doc(id).update(input?: unknown);
const command = shopify.event.$all.update(input?: unknown);
```


## fulfillment-service

 * [create](#fulfillment-service.create)
 * [delete](#fulfillment-service[].delete)
 * [get](#fulfillment-service[].get)
 * [list](#fulfillment-service.list)
 * [update](#fulfillment-service[].update)

### fulfillment-service.create

*CLI*
```sh
$ sdm shopify[my-shop-name].fulfillment-service.create
```

*TypeScript*
```javascript
const command = shopify.fulfillmentService.create(input?: unknown);
```


### fulfillment-service[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].fulfillment-service[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.fulfillmentService.$doc(id).delete(input?: unknown);
const command = shopify.fulfillmentService.$all.delete(input?: unknown);
```


### fulfillment-service[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].fulfillment-service[id|*].get
```

*TypeScript*
```javascript
const command = shopify.fulfillmentService.$doc(id).get(input?: unknown);
const command = shopify.fulfillmentService.$all.get(input?: unknown);
```


### fulfillment-service.list

*CLI*
```sh
$ sdm shopify[my-shop-name].fulfillment-service.list
```

*TypeScript*
```javascript
const command = shopify.fulfillmentService.list(input?: unknown);
```


### fulfillment-service[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].fulfillment-service[id|*].update
```

*TypeScript*
```javascript
const command = shopify.fulfillmentService.$doc(id).update(input?: unknown);
const command = shopify.fulfillmentService.$all.update(input?: unknown);
```


## gift-card

 * [count](#gift-card.count)
 * [create](#gift-card.create)
 * [disable](#gift-card[].disable)
 * [get](#gift-card[].get)
 * [list](#gift-card.list)
 * [update](#gift-card[].update)

### gift-card.count

*CLI*
```sh
$ sdm shopify[my-shop-name].gift-card.count
```

*TypeScript*
```javascript
const command = shopify.giftCard.count(input?: unknown);
```


### gift-card.create

*CLI*
```sh
$ sdm shopify[my-shop-name].gift-card.create
```

*TypeScript*
```javascript
const command = shopify.giftCard.create(input?: unknown);
```


### gift-card[].disable

*CLI*
```sh
$ sdm shopify[my-shop-name].gift-card[id|*].disable
```

*TypeScript*
```javascript
const command = shopify.giftCard.$doc(id).disable(input?: unknown);
const command = shopify.giftCard.$all.disable(input?: unknown);
```


### gift-card[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].gift-card[id|*].get
```

*TypeScript*
```javascript
const command = shopify.giftCard.$doc(id).get(input?: unknown);
const command = shopify.giftCard.$all.get(input?: unknown);
```


### gift-card.list

*CLI*
```sh
$ sdm shopify[my-shop-name].gift-card.list
```

*TypeScript*
```javascript
const command = shopify.giftCard.list(input?: unknown);
```


### gift-card[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].gift-card[id|*].update
```

*TypeScript*
```javascript
const command = shopify.giftCard.$doc(id).update(input?: unknown);
const command = shopify.giftCard.$all.update(input?: unknown);
```


## gift-card[].gift-card-adjustment

 * [create](#gift-card[].gift-card-adjustment.create)
 * [get](#gift-card[].gift-card-adjustment[].get)
 * [list](#gift-card[].gift-card-adjustment.list)

### gift-card[].gift-card-adjustment.create

*CLI*
```sh
$ sdm shopify[my-shop-name].gift-card[id|*].gift-card-adjustment.create
```

*TypeScript*
```javascript
const command = shopify.giftCard.$doc(id).giftCardAdjustment.create(input?: unknown);
const command = shopify.giftCard.$all.giftCardAdjustment.create(input?: unknown);
```


### gift-card[].gift-card-adjustment[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].gift-card[id|*].gift-card-adjustment[id|*].get
```

*TypeScript*
```javascript
const command = shopify.giftCard.$doc(id).giftCardAdjustment.$doc(id).get(input?: unknown);
const command = shopify.giftCard.$all.giftCardAdjustment.$all.get(input?: unknown);
```


### gift-card[].gift-card-adjustment.list

*CLI*
```sh
$ sdm shopify[my-shop-name].gift-card[id|*].gift-card-adjustment.list
```

*TypeScript*
```javascript
const command = shopify.giftCard.$doc(id).giftCardAdjustment.list(input?: unknown);
const command = shopify.giftCard.$all.giftCardAdjustment.list(input?: unknown);
```


## inventory-item

 * [get](#inventory-item[].get)
 * [list](#inventory-item.list)
 * [update](#inventory-item[].update)

### inventory-item[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].inventory-item[id|*].get
```

*TypeScript*
```javascript
const command = shopify.inventoryItem.$doc(id).get(input?: unknown);
const command = shopify.inventoryItem.$all.get(input?: unknown);
```


### inventory-item.list

*CLI*
```sh
$ sdm shopify[my-shop-name].inventory-item.list
```

*TypeScript*
```javascript
const command = shopify.inventoryItem.list(input?: unknown);
```


### inventory-item[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].inventory-item[id|*].update
```

*TypeScript*
```javascript
const command = shopify.inventoryItem.$doc(id).update(input?: unknown);
const command = shopify.inventoryItem.$all.update(input?: unknown);
```


## inventory-level

 * [delete](#inventory-level[].delete)
 * [list](#inventory-level.list)

### inventory-level[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].inventory-level[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.inventoryLevel.$doc(id).delete(input?: unknown);
const command = shopify.inventoryLevel.$all.delete(input?: unknown);
```


### inventory-level.list

*CLI*
```sh
$ sdm shopify[my-shop-name].inventory-level.list
```

*TypeScript*
```javascript
const command = shopify.inventoryLevel.list(input?: unknown);
```


## location

 * [count](#location.count)
 * [get](#location[].get)
 * [inventory-levels](#location[].inventory-levels)
 * [list](#location.list)

### location.count

*CLI*
```sh
$ sdm shopify[my-shop-name].location.count
```

*TypeScript*
```javascript
const command = shopify.location.count(input?: unknown);
```


### location[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].location[id|*].get
```

*TypeScript*
```javascript
const command = shopify.location.$doc(id).get(input?: unknown);
const command = shopify.location.$all.get(input?: unknown);
```


### location[].inventory-levels

*CLI*
```sh
$ sdm shopify[my-shop-name].location[id|*].inventory-levels
```

*TypeScript*
```javascript
const command = shopify.location.$doc(id).inventoryLevels(input?: unknown);
const command = shopify.location.$all.inventoryLevels(input?: unknown);
```


### location.list

*CLI*
```sh
$ sdm shopify[my-shop-name].location.list
```

*TypeScript*
```javascript
const command = shopify.location.list(input?: unknown);
```


## metafield

 * [count](#metafield.count)
 * [create](#metafield.create)
 * [delete](#metafield[].delete)
 * [get](#metafield[].get)
 * [list](#metafield.list)
 * [update](#metafield[].update)

### metafield.count

*CLI*
```sh
$ sdm shopify[my-shop-name].metafield.count
```

*TypeScript*
```javascript
const command = shopify.metafield.count(input?: unknown);
```


### metafield.create

*CLI*
```sh
$ sdm shopify[my-shop-name].metafield.create
```

*TypeScript*
```javascript
const command = shopify.metafield.create(input?: unknown);
```


### metafield[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].metafield[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.metafield.$doc(id).delete(input?: unknown);
const command = shopify.metafield.$all.delete(input?: unknown);
```


### metafield[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].metafield[id|*].get
```

*TypeScript*
```javascript
const command = shopify.metafield.$doc(id).get(input?: unknown);
const command = shopify.metafield.$all.get(input?: unknown);
```


### metafield.list

*CLI*
```sh
$ sdm shopify[my-shop-name].metafield.list
```

*TypeScript*
```javascript
const command = shopify.metafield.list(input?: unknown);
```


### metafield[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].metafield[id|*].update
```

*TypeScript*
```javascript
const command = shopify.metafield.$doc(id).update(input?: unknown);
const command = shopify.metafield.$all.update(input?: unknown);
```


## order

 * [cancel](#order[].cancel)
 * [close](#order[].close)
 * [count](#order.count)
 * [create](#order.create)
 * [delete](#order[].delete)
 * [fulfillment-orders](#order[].fulfillment-orders)
 * [get](#order[].get)
 * [list](#order.list)
 * [open](#order[].open)
 * [update](#order[].update)

### order[].cancel

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].cancel
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).cancel(input?: unknown);
const command = shopify.order.$all.cancel(input?: unknown);
```


### order[].close

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].close
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).close(input?: unknown);
const command = shopify.order.$all.close(input?: unknown);
```


### order.count

*CLI*
```sh
$ sdm shopify[my-shop-name].order.count
```

*TypeScript*
```javascript
const command = shopify.order.count(input?: unknown);
```


### order.create

*CLI*
```sh
$ sdm shopify[my-shop-name].order.create
```

*TypeScript*
```javascript
const command = shopify.order.create(input?: unknown);
```


### order[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).delete(input?: unknown);
const command = shopify.order.$all.delete(input?: unknown);
```


### order[].fulfillment-orders

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment-orders
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillmentOrders(input?: unknown);
const command = shopify.order.$all.fulfillmentOrders(input?: unknown);
```


### order[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].get
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).get(input?: unknown);
const command = shopify.order.$all.get(input?: unknown);
```


### order.list

*CLI*
```sh
$ sdm shopify[my-shop-name].order.list
```

*TypeScript*
```javascript
const command = shopify.order.list(input?: unknown);
```


### order[].open

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].open
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).open(input?: unknown);
const command = shopify.order.$all.open(input?: unknown);
```


### order[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].update
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).update(input?: unknown);
const command = shopify.order.$all.update(input?: unknown);
```


## order[].fulfillment

 * [cancel](#order[].fulfillment[].cancel)
 * [complete](#order[].fulfillment[].complete)
 * [count](#order[].fulfillment.count)
 * [create](#order[].fulfillment.create)
 * [get](#order[].fulfillment[].get)
 * [list](#order[].fulfillment.list)
 * [open](#order[].fulfillment[].open)
 * [update](#order[].fulfillment[].update)

### order[].fulfillment[].cancel

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment[id|*].cancel
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).cancel(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.cancel(input?: unknown);
```


### order[].fulfillment[].complete

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment[id|*].complete
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).complete(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.complete(input?: unknown);
```


### order[].fulfillment.count

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment.count
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.count(input?: unknown);
const command = shopify.order.$all.fulfillment.count(input?: unknown);
```


### order[].fulfillment.create

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment.create
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.create(input?: unknown);
const command = shopify.order.$all.fulfillment.create(input?: unknown);
```


### order[].fulfillment[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment[id|*].get
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).get(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.get(input?: unknown);
```


### order[].fulfillment.list

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment.list
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.list(input?: unknown);
const command = shopify.order.$all.fulfillment.list(input?: unknown);
```


### order[].fulfillment[].open

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment[id|*].open
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).open(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.open(input?: unknown);
```


### order[].fulfillment[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment[id|*].update
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).update(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.update(input?: unknown);
```


## order[].fulfillment[].fulfillment-event

 * [create](#order[].fulfillment[].fulfillment-event.create)
 * [delete](#order[].fulfillment[].fulfillment-event[].delete)
 * [get](#order[].fulfillment[].fulfillment-event[].get)
 * [list](#order[].fulfillment[].fulfillment-event.list)
 * [update](#order[].fulfillment[].fulfillment-event[].update)

### order[].fulfillment[].fulfillment-event.create

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment[id|*].fulfillment-event.create
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).fulfillmentEvent.create(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.fulfillmentEvent.create(input?: unknown);
```


### order[].fulfillment[].fulfillment-event[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment[id|*].fulfillment-event[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).fulfillmentEvent.$doc(id).delete(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.fulfillmentEvent.$all.delete(input?: unknown);
```


### order[].fulfillment[].fulfillment-event[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment[id|*].fulfillment-event[id|*].get
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).fulfillmentEvent.$doc(id).get(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.fulfillmentEvent.$all.get(input?: unknown);
```


### order[].fulfillment[].fulfillment-event.list

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment[id|*].fulfillment-event.list
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).fulfillmentEvent.list(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.fulfillmentEvent.list(input?: unknown);
```


### order[].fulfillment[].fulfillment-event[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment[id|*].fulfillment-event[id|*].update
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).fulfillmentEvent.$doc(id).update(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.fulfillmentEvent.$all.update(input?: unknown);
```


## order[].order-risk

 * [create](#order[].order-risk.create)
 * [delete](#order[].order-risk[].delete)
 * [get](#order[].order-risk[].get)
 * [list](#order[].order-risk.list)
 * [update](#order[].order-risk[].update)

### order[].order-risk.create

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].order-risk.create
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).orderRisk.create(input?: unknown);
const command = shopify.order.$all.orderRisk.create(input?: unknown);
```


### order[].order-risk[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].order-risk[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).orderRisk.$doc(id).delete(input?: unknown);
const command = shopify.order.$all.orderRisk.$all.delete(input?: unknown);
```


### order[].order-risk[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].order-risk[id|*].get
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).orderRisk.$doc(id).get(input?: unknown);
const command = shopify.order.$all.orderRisk.$all.get(input?: unknown);
```


### order[].order-risk.list

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].order-risk.list
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).orderRisk.list(input?: unknown);
const command = shopify.order.$all.orderRisk.list(input?: unknown);
```


### order[].order-risk[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].order-risk[id|*].update
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).orderRisk.$doc(id).update(input?: unknown);
const command = shopify.order.$all.orderRisk.$all.update(input?: unknown);
```


## order[].refund

 * [calculate](#order[].refund.calculate)
 * [create](#order[].refund.create)
 * [get](#order[].refund[].get)
 * [list](#order[].refund.list)

### order[].refund.calculate

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].refund.calculate
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).refund.calculate(input?: unknown);
const command = shopify.order.$all.refund.calculate(input?: unknown);
```


### order[].refund.create

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].refund.create
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).refund.create(input?: unknown);
const command = shopify.order.$all.refund.create(input?: unknown);
```


### order[].refund[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].refund[id|*].get
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).refund.$doc(id).get(input?: unknown);
const command = shopify.order.$all.refund.$all.get(input?: unknown);
```


### order[].refund.list

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].refund.list
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).refund.list(input?: unknown);
const command = shopify.order.$all.refund.list(input?: unknown);
```


## order[].transaction

 * [count](#order[].transaction.count)
 * [create](#order[].transaction.create)
 * [get](#order[].transaction[].get)
 * [list](#order[].transaction.list)

### order[].transaction.count

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].transaction.count
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).transaction.count(input?: unknown);
const command = shopify.order.$all.transaction.count(input?: unknown);
```


### order[].transaction.create

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].transaction.create
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).transaction.create(input?: unknown);
const command = shopify.order.$all.transaction.create(input?: unknown);
```


### order[].transaction[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].transaction[id|*].get
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).transaction.$doc(id).get(input?: unknown);
const command = shopify.order.$all.transaction.$all.get(input?: unknown);
```


### order[].transaction.list

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].transaction.list
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).transaction.list(input?: unknown);
const command = shopify.order.$all.transaction.list(input?: unknown);
```


## page

 * [count](#page.count)
 * [create](#page.create)
 * [delete](#page[].delete)
 * [get](#page[].get)
 * [list](#page.list)
 * [update](#page[].update)

### page.count

*CLI*
```sh
$ sdm shopify[my-shop-name].page.count
```

*TypeScript*
```javascript
const command = shopify.page.count(input?: unknown);
```


### page.create

*CLI*
```sh
$ sdm shopify[my-shop-name].page.create
```

*TypeScript*
```javascript
const command = shopify.page.create(input?: unknown);
```


### page[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].page[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.page.$doc(id).delete(input?: unknown);
const command = shopify.page.$all.delete(input?: unknown);
```


### page[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].page[id|*].get
```

*TypeScript*
```javascript
const command = shopify.page.$doc(id).get(input?: unknown);
const command = shopify.page.$all.get(input?: unknown);
```


### page.list

*CLI*
```sh
$ sdm shopify[my-shop-name].page.list
```

*TypeScript*
```javascript
const command = shopify.page.list(input?: unknown);
```


### page[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].page[id|*].update
```

*TypeScript*
```javascript
const command = shopify.page.$doc(id).update(input?: unknown);
const command = shopify.page.$all.update(input?: unknown);
```


## payout

 * [get](#payout[].get)
 * [list](#payout.list)

### payout[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].payout[id|*].get
```

*TypeScript*
```javascript
const command = shopify.payout.$doc(id).get(input?: unknown);
const command = shopify.payout.$all.get(input?: unknown);
```


### payout.list

*CLI*
```sh
$ sdm shopify[my-shop-name].payout.list
```

*TypeScript*
```javascript
const command = shopify.payout.list(input?: unknown);
```


## policy

 * [list](#policy.list)

### policy.list

*CLI*
```sh
$ sdm shopify[my-shop-name].policy.list
```

*TypeScript*
```javascript
const command = shopify.policy.list(input?: unknown);
```


## price-rule

 * [create](#price-rule.create)
 * [delete](#price-rule[].delete)
 * [get](#price-rule[].get)
 * [list](#price-rule.list)
 * [update](#price-rule[].update)

### price-rule.create

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule.create
```

*TypeScript*
```javascript
const command = shopify.priceRule.create(input?: unknown);
```


### price-rule[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).delete(input?: unknown);
const command = shopify.priceRule.$all.delete(input?: unknown);
```


### price-rule[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule[id|*].get
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).get(input?: unknown);
const command = shopify.priceRule.$all.get(input?: unknown);
```


### price-rule.list

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule.list
```

*TypeScript*
```javascript
const command = shopify.priceRule.list(input?: unknown);
```


### price-rule[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule[id|*].update
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).update(input?: unknown);
const command = shopify.priceRule.$all.update(input?: unknown);
```


## price-rule[].discount-code

 * [create](#price-rule[].discount-code.create)
 * [delete](#price-rule[].discount-code[].delete)
 * [get](#price-rule[].discount-code[].get)
 * [list](#price-rule[].discount-code.list)
 * [lookup](#price-rule[].discount-code.lookup)
 * [update](#price-rule[].discount-code[].update)

### price-rule[].discount-code.create

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule[id|*].discount-code.create
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).discountCode.create(input?: unknown);
const command = shopify.priceRule.$all.discountCode.create(input?: unknown);
```


### price-rule[].discount-code[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule[id|*].discount-code[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).discountCode.$doc(id).delete(input?: unknown);
const command = shopify.priceRule.$all.discountCode.$all.delete(input?: unknown);
```


### price-rule[].discount-code[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule[id|*].discount-code[id|*].get
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).discountCode.$doc(id).get(input?: unknown);
const command = shopify.priceRule.$all.discountCode.$all.get(input?: unknown);
```


### price-rule[].discount-code.list

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule[id|*].discount-code.list
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).discountCode.list(input?: unknown);
const command = shopify.priceRule.$all.discountCode.list(input?: unknown);
```


### price-rule[].discount-code.lookup

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule[id|*].discount-code.lookup
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).discountCode.lookup(input?: unknown);
const command = shopify.priceRule.$all.discountCode.lookup(input?: unknown);
```


### price-rule[].discount-code[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule[id|*].discount-code[id|*].update
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).discountCode.$doc(id).update(input?: unknown);
const command = shopify.priceRule.$all.discountCode.$all.update(input?: unknown);
```


## product-listing

 * [count](#product-listing.count)
 * [create](#product-listing.create)
 * [delete](#product-listing[].delete)
 * [get](#product-listing[].get)
 * [list](#product-listing.list)

### product-listing.count

*CLI*
```sh
$ sdm shopify[my-shop-name].product-listing.count
```

*TypeScript*
```javascript
const command = shopify.productListing.count(input?: unknown);
```


### product-listing.create

*CLI*
```sh
$ sdm shopify[my-shop-name].product-listing.create
```

*TypeScript*
```javascript
const command = shopify.productListing.create(input?: unknown);
```


### product-listing[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].product-listing[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.productListing.$doc(id).delete(input?: unknown);
const command = shopify.productListing.$all.delete(input?: unknown);
```


### product-listing[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].product-listing[id|*].get
```

*TypeScript*
```javascript
const command = shopify.productListing.$doc(id).get(input?: unknown);
const command = shopify.productListing.$all.get(input?: unknown);
```


### product-listing.list

*CLI*
```sh
$ sdm shopify[my-shop-name].product-listing.list
```

*TypeScript*
```javascript
const command = shopify.productListing.list(input?: unknown);
```


## product

 * [count](#product.count)
 * [create](#product.create)
 * [delete](#product[].delete)
 * [get](#product[].get)
 * [list](#product.list)
 * [update](#product[].update)

### product.count

*CLI*
```sh
$ sdm shopify[my-shop-name].product.count
```

*TypeScript*
```javascript
const command = shopify.product.count(input?: unknown);
```


### product.create

*CLI*
```sh
$ sdm shopify[my-shop-name].product.create
```

*TypeScript*
```javascript
const command = shopify.product.create(input?: unknown);
```


### product[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).delete(input?: unknown);
const command = shopify.product.$all.delete(input?: unknown);
```


### product[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].get
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).get(input?: unknown);
const command = shopify.product.$all.get(input?: unknown);
```


### product.list

*CLI*
```sh
$ sdm shopify[my-shop-name].product.list
```

*TypeScript*
```javascript
const command = shopify.product.list(input?: unknown);
```


### product[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].update
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).update(input?: unknown);
const command = shopify.product.$all.update(input?: unknown);
```


## product[].product-image

 * [count](#product[].product-image.count)
 * [create](#product[].product-image.create)
 * [delete](#product[].product-image[].delete)
 * [get](#product[].product-image[].get)
 * [list](#product[].product-image.list)
 * [update](#product[].product-image[].update)

### product[].product-image.count

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-image.count
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productImage.count(input?: unknown);
const command = shopify.product.$all.productImage.count(input?: unknown);
```


### product[].product-image.create

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-image.create
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productImage.create(input?: unknown);
const command = shopify.product.$all.productImage.create(input?: unknown);
```


### product[].product-image[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-image[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productImage.$doc(id).delete(input?: unknown);
const command = shopify.product.$all.productImage.$all.delete(input?: unknown);
```


### product[].product-image[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-image[id|*].get
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productImage.$doc(id).get(input?: unknown);
const command = shopify.product.$all.productImage.$all.get(input?: unknown);
```


### product[].product-image.list

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-image.list
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productImage.list(input?: unknown);
const command = shopify.product.$all.productImage.list(input?: unknown);
```


### product[].product-image[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-image[id|*].update
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productImage.$doc(id).update(input?: unknown);
const command = shopify.product.$all.productImage.$all.update(input?: unknown);
```


## product[].product-resource-feedback

 * [create](#product[].product-resource-feedback.create)
 * [list](#product[].product-resource-feedback.list)

### product[].product-resource-feedback.create

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-resource-feedback.create
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productResourceFeedback.create(input?: unknown);
const command = shopify.product.$all.productResourceFeedback.create(input?: unknown);
```


### product[].product-resource-feedback.list

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-resource-feedback.list
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productResourceFeedback.list(input?: unknown);
const command = shopify.product.$all.productResourceFeedback.list(input?: unknown);
```


## product[].product-variant

 * [count](#product[].product-variant.count)
 * [create](#product[].product-variant.create)
 * [delete](#product[].product-variant[].delete)
 * [get](#product[].product-variant[].get)
 * [list](#product[].product-variant.list)
 * [update](#product[].product-variant[].update)

### product[].product-variant.count

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-variant.count
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productVariant.count(input?: unknown);
const command = shopify.product.$all.productVariant.count(input?: unknown);
```


### product[].product-variant.create

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-variant.create
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productVariant.create(input?: unknown);
const command = shopify.product.$all.productVariant.create(input?: unknown);
```


### product[].product-variant[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-variant[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productVariant.$doc(id).delete(input?: unknown);
const command = shopify.product.$all.productVariant.$all.delete(input?: unknown);
```


### product[].product-variant[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-variant[id|*].get
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productVariant.$doc(id).get(input?: unknown);
const command = shopify.product.$all.productVariant.$all.get(input?: unknown);
```


### product[].product-variant.list

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-variant.list
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productVariant.list(input?: unknown);
const command = shopify.product.$all.productVariant.list(input?: unknown);
```


### product[].product-variant[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-variant[id|*].update
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productVariant.$doc(id).update(input?: unknown);
const command = shopify.product.$all.productVariant.$all.update(input?: unknown);
```


## redirect

 * [count](#redirect.count)
 * [create](#redirect.create)
 * [delete](#redirect[].delete)
 * [get](#redirect[].get)
 * [list](#redirect.list)
 * [update](#redirect[].update)

### redirect.count

*CLI*
```sh
$ sdm shopify[my-shop-name].redirect.count
```

*TypeScript*
```javascript
const command = shopify.redirect.count(input?: unknown);
```


### redirect.create

*CLI*
```sh
$ sdm shopify[my-shop-name].redirect.create
```

*TypeScript*
```javascript
const command = shopify.redirect.create(input?: unknown);
```


### redirect[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].redirect[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.redirect.$doc(id).delete(input?: unknown);
const command = shopify.redirect.$all.delete(input?: unknown);
```


### redirect[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].redirect[id|*].get
```

*TypeScript*
```javascript
const command = shopify.redirect.$doc(id).get(input?: unknown);
const command = shopify.redirect.$all.get(input?: unknown);
```


### redirect.list

*CLI*
```sh
$ sdm shopify[my-shop-name].redirect.list
```

*TypeScript*
```javascript
const command = shopify.redirect.list(input?: unknown);
```


### redirect[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].redirect[id|*].update
```

*TypeScript*
```javascript
const command = shopify.redirect.$doc(id).update(input?: unknown);
const command = shopify.redirect.$all.update(input?: unknown);
```


## report

 * [create](#report.create)
 * [delete](#report[].delete)
 * [get](#report[].get)
 * [list](#report.list)
 * [update](#report[].update)

### report.create

*CLI*
```sh
$ sdm shopify[my-shop-name].report.create
```

*TypeScript*
```javascript
const command = shopify.report.create(input?: unknown);
```


### report[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].report[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.report.$doc(id).delete(input?: unknown);
const command = shopify.report.$all.delete(input?: unknown);
```


### report[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].report[id|*].get
```

*TypeScript*
```javascript
const command = shopify.report.$doc(id).get(input?: unknown);
const command = shopify.report.$all.get(input?: unknown);
```


### report.list

*CLI*
```sh
$ sdm shopify[my-shop-name].report.list
```

*TypeScript*
```javascript
const command = shopify.report.list(input?: unknown);
```


### report[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].report[id|*].update
```

*TypeScript*
```javascript
const command = shopify.report.$doc(id).update(input?: unknown);
const command = shopify.report.$all.update(input?: unknown);
```


## resource-feedback

 * [create](#resource-feedback.create)
 * [list](#resource-feedback.list)

### resource-feedback.create

*CLI*
```sh
$ sdm shopify[my-shop-name].resource-feedback.create
```

*TypeScript*
```javascript
const command = shopify.resourceFeedback.create(input?: unknown);
```


### resource-feedback.list

*CLI*
```sh
$ sdm shopify[my-shop-name].resource-feedback.list
```

*TypeScript*
```javascript
const command = shopify.resourceFeedback.list(input?: unknown);
```


## script-tag

 * [count](#script-tag.count)
 * [create](#script-tag.create)
 * [delete](#script-tag[].delete)
 * [get](#script-tag[].get)
 * [list](#script-tag.list)
 * [update](#script-tag[].update)

### script-tag.count

*CLI*
```sh
$ sdm shopify[my-shop-name].script-tag.count
```

*TypeScript*
```javascript
const command = shopify.scriptTag.count(input?: unknown);
```


### script-tag.create

*CLI*
```sh
$ sdm shopify[my-shop-name].script-tag.create
```

*TypeScript*
```javascript
const command = shopify.scriptTag.create(input?: unknown);
```


### script-tag[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].script-tag[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.scriptTag.$doc(id).delete(input?: unknown);
const command = shopify.scriptTag.$all.delete(input?: unknown);
```


### script-tag[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].script-tag[id|*].get
```

*TypeScript*
```javascript
const command = shopify.scriptTag.$doc(id).get(input?: unknown);
const command = shopify.scriptTag.$all.get(input?: unknown);
```


### script-tag.list

*CLI*
```sh
$ sdm shopify[my-shop-name].script-tag.list
```

*TypeScript*
```javascript
const command = shopify.scriptTag.list(input?: unknown);
```


### script-tag[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].script-tag[id|*].update
```

*TypeScript*
```javascript
const command = shopify.scriptTag.$doc(id).update(input?: unknown);
const command = shopify.scriptTag.$all.update(input?: unknown);
```


## shipping-zone

 * [list](#shipping-zone.list)

### shipping-zone.list

*CLI*
```sh
$ sdm shopify[my-shop-name].shipping-zone.list
```

*TypeScript*
```javascript
const command = shopify.shippingZone.list(input?: unknown);
```


## shop

 * [get](#shop.get)

### shop.get

*CLI*
```sh
$ sdm shopify[my-shop-name].shop.get
```

*TypeScript*
```javascript
const command = shopify.shop.get(input?: unknown);
```


## smart-collection

 * [count](#smart-collection.count)
 * [create](#smart-collection.create)
 * [delete](#smart-collection[].delete)
 * [get](#smart-collection[].get)
 * [list](#smart-collection.list)
 * [update](#smart-collection[].update)

### smart-collection.count

*CLI*
```sh
$ sdm shopify[my-shop-name].smart-collection.count
```

*TypeScript*
```javascript
const command = shopify.smartCollection.count(input?: unknown);
```


### smart-collection.create

*CLI*
```sh
$ sdm shopify[my-shop-name].smart-collection.create
```

*TypeScript*
```javascript
const command = shopify.smartCollection.create(input?: unknown);
```


### smart-collection[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].smart-collection[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.smartCollection.$doc(id).delete(input?: unknown);
const command = shopify.smartCollection.$all.delete(input?: unknown);
```


### smart-collection[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].smart-collection[id|*].get
```

*TypeScript*
```javascript
const command = shopify.smartCollection.$doc(id).get(input?: unknown);
const command = shopify.smartCollection.$all.get(input?: unknown);
```


### smart-collection.list

*CLI*
```sh
$ sdm shopify[my-shop-name].smart-collection.list
```

*TypeScript*
```javascript
const command = shopify.smartCollection.list(input?: unknown);
```


### smart-collection[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].smart-collection[id|*].update
```

*TypeScript*
```javascript
const command = shopify.smartCollection.$doc(id).update(input?: unknown);
const command = shopify.smartCollection.$all.update(input?: unknown);
```


## storefront-access-token

 * [create](#storefront-access-token.create)
 * [delete](#storefront-access-token[].delete)
 * [list](#storefront-access-token.list)

### storefront-access-token.create

*CLI*
```sh
$ sdm shopify[my-shop-name].storefront-access-token.create
```

*TypeScript*
```javascript
const command = shopify.storefrontAccessToken.create(input?: unknown);
```


### storefront-access-token[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].storefront-access-token[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.storefrontAccessToken.$doc(id).delete(input?: unknown);
const command = shopify.storefrontAccessToken.$all.delete(input?: unknown);
```


### storefront-access-token.list

*CLI*
```sh
$ sdm shopify[my-shop-name].storefront-access-token.list
```

*TypeScript*
```javascript
const command = shopify.storefrontAccessToken.list(input?: unknown);
```


## tender-transaction

 * [list](#tender-transaction.list)

### tender-transaction.list

*CLI*
```sh
$ sdm shopify[my-shop-name].tender-transaction.list
```

*TypeScript*
```javascript
const command = shopify.tenderTransaction.list(input?: unknown);
```


## theme

 * [create](#theme.create)
 * [delete](#theme[].delete)
 * [get](#theme[].get)
 * [list](#theme.list)
 * [update](#theme[].update)

### theme.create

*CLI*
```sh
$ sdm shopify[my-shop-name].theme.create
```

*TypeScript*
```javascript
const command = shopify.theme.create(input?: unknown);
```


### theme[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].theme[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).delete(input?: unknown);
const command = shopify.theme.$all.delete(input?: unknown);
```


### theme[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].theme[id|*].get
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).get(input?: unknown);
const command = shopify.theme.$all.get(input?: unknown);
```


### theme.list

*CLI*
```sh
$ sdm shopify[my-shop-name].theme.list
```

*TypeScript*
```javascript
const command = shopify.theme.list(input?: unknown);
```


### theme[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].theme[id|*].update
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).update(input?: unknown);
const command = shopify.theme.$all.update(input?: unknown);
```


## theme[].asset

 * [create](#theme[].asset.create)
 * [delete](#theme[].asset[].delete)
 * [get](#theme[].asset[].get)
 * [list](#theme[].asset.list)
 * [update](#theme[].asset[].update)

### theme[].asset.create

*CLI*
```sh
$ sdm shopify[my-shop-name].theme[id|*].asset.create
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).asset.create(input?: unknown);
const command = shopify.theme.$all.asset.create(input?: unknown);
```


### theme[].asset[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].theme[id|*].asset[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).asset.$doc(id).delete(input?: unknown);
const command = shopify.theme.$all.asset.$all.delete(input?: unknown);
```


### theme[].asset[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].theme[id|*].asset[id|*].get
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).asset.$doc(id).get(input?: unknown);
const command = shopify.theme.$all.asset.$all.get(input?: unknown);
```


### theme[].asset.list

*CLI*
```sh
$ sdm shopify[my-shop-name].theme[id|*].asset.list
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).asset.list(input?: unknown);
const command = shopify.theme.$all.asset.list(input?: unknown);
```


### theme[].asset[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].theme[id|*].asset[id|*].update
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).asset.$doc(id).update(input?: unknown);
const command = shopify.theme.$all.asset.$all.update(input?: unknown);
```


## user

 * [current](#user.current)
 * [get](#user[].get)
 * [list](#user.list)

### user.current

*CLI*
```sh
$ sdm shopify[my-shop-name].user.current
```

*TypeScript*
```javascript
const command = shopify.user.current(input?: unknown);
```


### user[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].user[id|*].get
```

*TypeScript*
```javascript
const command = shopify.user.$doc(id).get(input?: unknown);
const command = shopify.user.$all.get(input?: unknown);
```


### user.list

*CLI*
```sh
$ sdm shopify[my-shop-name].user.list
```

*TypeScript*
```javascript
const command = shopify.user.list(input?: unknown);
```


## webhook

 * [count](#webhook.count)
 * [create](#webhook.create)
 * [delete](#webhook[].delete)
 * [get](#webhook[].get)
 * [list](#webhook.list)
 * [update](#webhook[].update)

### webhook.count

*CLI*
```sh
$ sdm shopify[my-shop-name].webhook.count
```

*TypeScript*
```javascript
const command = shopify.webhook.count(input?: unknown);
```


### webhook.create

*CLI*
```sh
$ sdm shopify[my-shop-name].webhook.create
```

*TypeScript*
```javascript
const command = shopify.webhook.create(input?: unknown);
```


### webhook[].delete

*CLI*
```sh
$ sdm shopify[my-shop-name].webhook[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.webhook.$doc(id).delete(input?: unknown);
const command = shopify.webhook.$all.delete(input?: unknown);
```


### webhook[].get

*CLI*
```sh
$ sdm shopify[my-shop-name].webhook[id|*].get
```

*TypeScript*
```javascript
const command = shopify.webhook.$doc(id).get(input?: unknown);
const command = shopify.webhook.$all.get(input?: unknown);
```


### webhook.list

*CLI*
```sh
$ sdm shopify[my-shop-name].webhook.list
```

*TypeScript*
```javascript
const command = shopify.webhook.list(input?: unknown);
```


### webhook[].update

*CLI*
```sh
$ sdm shopify[my-shop-name].webhook[id|*].update
```

*TypeScript*
```javascript
const command = shopify.webhook.$doc(id).update(input?: unknown);
const command = shopify.webhook.$all.update(input?: unknown);
```


