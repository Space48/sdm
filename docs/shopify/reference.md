
# Using the CLI interface

# Using the TypeScript interface

# Resources

 * [access-scope](#accessscope)
 * [api-permission](#apipermission)
 * [application-credit](#applicationcredit)
 * [blog](#blog)
 * [blog[].article](#blogarticle)
 * [carrier-service](#carrierservice)
 * [collect](#collect)
 * [collection-listing](#collectionlisting)
 * [collection](#collection)
 * [country](#country)
 * [country[].province](#countryprovince)
 * [currency](#currency)
 * [custom-collection](#customcollection)
 * [customer](#customer)
 * [customer[].customer-address](#customercustomeraddress)
 * [dispute](#dispute)
 * [draft-order](#draftorder)
 * [event](#event)
 * [fulfillment-service](#fulfillmentservice)
 * [gift-card](#giftcard)
 * [gift-card[].gift-card-adjustment](#giftcardgiftcardadjustment)
 * [inventory-item](#inventoryitem)
 * [inventory-level](#inventorylevel)
 * [location](#location)
 * [metafield](#metafield)
 * [order](#order)
 * [order[].fulfillment](#orderfulfillment)
 * [order[].fulfillment[].fulfillment-event](#orderfulfillmentfulfillmentevent)
 * [order[].order-risk](#orderorderrisk)
 * [order[].refund](#orderrefund)
 * [order[].transaction](#ordertransaction)
 * [page](#page)
 * [payout](#payout)
 * [policy](#policy)
 * [price-rule](#pricerule)
 * [price-rule[].discount-code](#pricerulediscountcode)
 * [product-listing](#productlisting)
 * [product](#product)
 * [product[].product-image](#productproductimage)
 * [product[].product-resource-feedback](#productproductresourcefeedback)
 * [product[].product-variant](#productproductvariant)
 * [redirect](#redirect)
 * [report](#report)
 * [resource-feedback](#resourcefeedback)
 * [script-tag](#scripttag)
 * [shipping-zone](#shippingzone)
 * [shop](#shop)
 * [smart-collection](#smartcollection)
 * [storefront-access-token](#storefrontaccesstoken)
 * [tender-transaction](#tendertransaction)
 * [theme](#theme)
 * [theme[].asset](#themeasset)
 * [user](#user)
 * [webhook](#webhook)

## access-scope

### Endpoints

 * [list](#accessscopelist)

### access-scope.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].access-scope.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.accessScope.list(input?: unknown);
```


## api-permission

### Endpoints

 * [delete](#apipermissiondelete)

### api-permission[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].api-permission[id].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.apiPermission.$doc(id).delete(input?: unknown);
```


## application-credit

### Endpoints

 * [create](#applicationcreditcreate)
 * [get](#applicationcreditget)
 * [list](#applicationcreditlist)

### application-credit.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].application-credit.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.applicationCredit.create(input?: unknown);
```


### application-credit[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].application-credit[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.applicationCredit.$doc(id).get(input?: unknown);
const command = shopify.applicationCredit.$all.get(input?: unknown);
```


### application-credit.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].application-credit.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.applicationCredit.list(input?: unknown);
```


## blog

### Endpoints

 * [count](#blogcount)
 * [create](#blogcreate)
 * [delete](#blogdelete)
 * [get](#blogget)
 * [list](#bloglist)
 * [update](#blogupdate)

### blog.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].blog.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.blog.count(input?: unknown);
```


### blog.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].blog.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.blog.create(input?: unknown);
```


### blog[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].blog[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).delete(input?: unknown);
const command = shopify.blog.$all.delete(input?: unknown);
```


### blog[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].blog[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).get(input?: unknown);
const command = shopify.blog.$all.get(input?: unknown);
```


### blog.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].blog.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.blog.list(input?: unknown);
```


### blog[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].blog[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).update(input?: unknown);
const command = shopify.blog.$all.update(input?: unknown);
```


## blog[].article

### Endpoints

 * [count](#blogarticlecount)
 * [create](#blogarticlecreate)
 * [delete](#blogarticledelete)
 * [get](#blogarticleget)
 * [list](#blogarticlelist)
 * [tags](#blogarticletags)
 * [update](#blogarticleupdate)

### blog[].article.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].blog[id|*].article.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.count(input?: unknown);
const command = shopify.blog.$all.article.count(input?: unknown);
```


### blog[].article.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].blog[id|*].article.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.create(input?: unknown);
const command = shopify.blog.$all.article.create(input?: unknown);
```


### blog[].article[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].blog[id|*].article[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.$doc(id).delete(input?: unknown);
const command = shopify.blog.$all.article.$all.delete(input?: unknown);
```


### blog[].article[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].blog[id|*].article[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.$doc(id).get(input?: unknown);
const command = shopify.blog.$all.article.$all.get(input?: unknown);
```


### blog[].article.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].blog[id|*].article.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.list(input?: unknown);
const command = shopify.blog.$all.article.list(input?: unknown);
```


### blog[].article[].tags

*CLI*
```sh
$ sdm 'shopify[my-shop-name].blog[id|*].article[id|*].tags' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.$doc(id).tags(input?: unknown);
const command = shopify.blog.$all.article.$all.tags(input?: unknown);
```


### blog[].article[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].blog[id|*].article[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.$doc(id).update(input?: unknown);
const command = shopify.blog.$all.article.$all.update(input?: unknown);
```


## carrier-service

### Endpoints

 * [create](#carrierservicecreate)
 * [delete](#carrierservicedelete)
 * [get](#carrierserviceget)
 * [list](#carrierservicelist)
 * [update](#carrierserviceupdate)

### carrier-service.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].carrier-service.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.carrierService.create(input?: unknown);
```


### carrier-service[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].carrier-service[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.carrierService.$doc(id).delete(input?: unknown);
const command = shopify.carrierService.$all.delete(input?: unknown);
```


### carrier-service[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].carrier-service[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.carrierService.$doc(id).get(input?: unknown);
const command = shopify.carrierService.$all.get(input?: unknown);
```


### carrier-service.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].carrier-service.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.carrierService.list(input?: unknown);
```


### carrier-service[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].carrier-service[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.carrierService.$doc(id).update(input?: unknown);
const command = shopify.carrierService.$all.update(input?: unknown);
```


## collect

### Endpoints

 * [count](#collectcount)
 * [create](#collectcreate)
 * [delete](#collectdelete)
 * [get](#collectget)
 * [list](#collectlist)

### collect.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].collect.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.collect.count(input?: unknown);
```


### collect.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].collect.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.collect.create(input?: unknown);
```


### collect[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].collect[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.collect.$doc(id).delete(input?: unknown);
const command = shopify.collect.$all.delete(input?: unknown);
```


### collect[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].collect[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.collect.$doc(id).get(input?: unknown);
const command = shopify.collect.$all.get(input?: unknown);
```


### collect.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].collect.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.collect.list(input?: unknown);
```


## collection-listing

### Endpoints

 * [get](#collectionlistingget)
 * [list](#collectionlistinglist)

### collection-listing[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].collection-listing[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.collectionListing.$doc(id).get(input?: unknown);
const command = shopify.collectionListing.$all.get(input?: unknown);
```


### collection-listing.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].collection-listing.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.collectionListing.list(input?: unknown);
```


## collection

### Endpoints

 * [get](#collectionget)
 * [products](#collectionproducts)

### collection[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].collection[id].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.collection.$doc(id).get(input?: unknown);
```


### collection[].products

*CLI*
```sh
$ sdm 'shopify[my-shop-name].collection[id].products' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.collection.$doc(id).products(input?: unknown);
```


## country

### Endpoints

 * [count](#countrycount)
 * [create](#countrycreate)
 * [delete](#countrydelete)
 * [get](#countryget)
 * [list](#countrylist)
 * [update](#countryupdate)

### country.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].country.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.country.count(input?: unknown);
```


### country.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].country.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.country.create(input?: unknown);
```


### country[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].country[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.country.$doc(id).delete(input?: unknown);
const command = shopify.country.$all.delete(input?: unknown);
```


### country[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].country[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.country.$doc(id).get(input?: unknown);
const command = shopify.country.$all.get(input?: unknown);
```


### country.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].country.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.country.list(input?: unknown);
```


### country[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].country[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.country.$doc(id).update(input?: unknown);
const command = shopify.country.$all.update(input?: unknown);
```


## country[].province

### Endpoints

 * [count](#countryprovincecount)
 * [get](#countryprovinceget)
 * [list](#countryprovincelist)
 * [update](#countryprovinceupdate)

### country[].province.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].country[id|*].province.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.country.$doc(id).province.count(input?: unknown);
const command = shopify.country.$all.province.count(input?: unknown);
```


### country[].province[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].country[id|*].province[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.country.$doc(id).province.$doc(id).get(input?: unknown);
const command = shopify.country.$all.province.$all.get(input?: unknown);
```


### country[].province.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].country[id|*].province.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.country.$doc(id).province.list(input?: unknown);
const command = shopify.country.$all.province.list(input?: unknown);
```


### country[].province[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].country[id|*].province[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.country.$doc(id).province.$doc(id).update(input?: unknown);
const command = shopify.country.$all.province.$all.update(input?: unknown);
```


## currency

### Endpoints

 * [list](#currencylist)

### currency.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].currency.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.currency.list(input?: unknown);
```


## custom-collection

### Endpoints

 * [count](#customcollectioncount)
 * [create](#customcollectioncreate)
 * [delete](#customcollectiondelete)
 * [get](#customcollectionget)
 * [list](#customcollectionlist)
 * [update](#customcollectionupdate)

### custom-collection.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].custom-collection.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customCollection.count(input?: unknown);
```


### custom-collection.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].custom-collection.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customCollection.create(input?: unknown);
```


### custom-collection[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].custom-collection[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customCollection.$doc(id).delete(input?: unknown);
const command = shopify.customCollection.$all.delete(input?: unknown);
```


### custom-collection[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].custom-collection[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customCollection.$doc(id).get(input?: unknown);
const command = shopify.customCollection.$all.get(input?: unknown);
```


### custom-collection.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].custom-collection.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customCollection.list(input?: unknown);
```


### custom-collection[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].custom-collection[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customCollection.$doc(id).update(input?: unknown);
const command = shopify.customCollection.$all.update(input?: unknown);
```


## customer

### Endpoints

 * [count](#customercount)
 * [create](#customercreate)
 * [delete](#customerdelete)
 * [get](#customerget)
 * [list](#customerlist)
 * [orders](#customerorders)
 * [send-invite](#customersendinvite)
 * [update](#customerupdate)

### customer.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].customer.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customer.count(input?: unknown);
```


### customer.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].customer.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customer.create(input?: unknown);
```


### customer[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].customer[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).delete(input?: unknown);
const command = shopify.customer.$all.delete(input?: unknown);
```


### customer[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].customer[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).get(input?: unknown);
const command = shopify.customer.$all.get(input?: unknown);
```


### customer.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].customer.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customer.list(input?: unknown);
```


### customer[].orders

*CLI*
```sh
$ sdm 'shopify[my-shop-name].customer[id|*].orders' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).orders(input?: unknown);
const command = shopify.customer.$all.orders(input?: unknown);
```


### customer[].send-invite

*CLI*
```sh
$ sdm 'shopify[my-shop-name].customer[id|*].send-invite' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).sendInvite(input?: unknown);
const command = shopify.customer.$all.sendInvite(input?: unknown);
```


### customer[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].customer[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).update(input?: unknown);
const command = shopify.customer.$all.update(input?: unknown);
```


## customer[].customer-address

### Endpoints

 * [create](#customercustomeraddresscreate)
 * [default](#customercustomeraddressdefault)
 * [delete](#customercustomeraddressdelete)
 * [get](#customercustomeraddressget)
 * [list](#customercustomeraddresslist)
 * [set](#customercustomeraddressset)
 * [update](#customercustomeraddressupdate)

### customer[].customer-address.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].customer[id|*].customer-address.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.create(input?: unknown);
const command = shopify.customer.$all.customerAddress.create(input?: unknown);
```


### customer[].customer-address[].default

*CLI*
```sh
$ sdm 'shopify[my-shop-name].customer[id|*].customer-address[id|*].default' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.$doc(id).default(input?: unknown);
const command = shopify.customer.$all.customerAddress.$all.default(input?: unknown);
```


### customer[].customer-address[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].customer[id|*].customer-address[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.$doc(id).delete(input?: unknown);
const command = shopify.customer.$all.customerAddress.$all.delete(input?: unknown);
```


### customer[].customer-address[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].customer[id|*].customer-address[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.$doc(id).get(input?: unknown);
const command = shopify.customer.$all.customerAddress.$all.get(input?: unknown);
```


### customer[].customer-address.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].customer[id|*].customer-address.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.list(input?: unknown);
const command = shopify.customer.$all.customerAddress.list(input?: unknown);
```


### customer[].customer-address.set

*CLI*
```sh
$ sdm 'shopify[my-shop-name].customer[id|*].customer-address.set' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.set(input?: unknown);
const command = shopify.customer.$all.customerAddress.set(input?: unknown);
```


### customer[].customer-address[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].customer[id|*].customer-address[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.$doc(id).update(input?: unknown);
const command = shopify.customer.$all.customerAddress.$all.update(input?: unknown);
```


## dispute

### Endpoints

 * [get](#disputeget)
 * [list](#disputelist)

### dispute[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].dispute[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.dispute.$doc(id).get(input?: unknown);
const command = shopify.dispute.$all.get(input?: unknown);
```


### dispute.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].dispute.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.dispute.list(input?: unknown);
```


## draft-order

### Endpoints

 * [complete](#draftordercomplete)
 * [count](#draftordercount)
 * [create](#draftordercreate)
 * [delete](#draftorderdelete)
 * [get](#draftorderget)
 * [list](#draftorderlist)
 * [send-invoice](#draftordersendinvoice)
 * [update](#draftorderupdate)

### draft-order[].complete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].draft-order[id|*].complete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.draftOrder.$doc(id).complete(input?: unknown);
const command = shopify.draftOrder.$all.complete(input?: unknown);
```


### draft-order.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].draft-order.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.draftOrder.count(input?: unknown);
```


### draft-order.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].draft-order.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.draftOrder.create(input?: unknown);
```


### draft-order[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].draft-order[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.draftOrder.$doc(id).delete(input?: unknown);
const command = shopify.draftOrder.$all.delete(input?: unknown);
```


### draft-order[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].draft-order[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.draftOrder.$doc(id).get(input?: unknown);
const command = shopify.draftOrder.$all.get(input?: unknown);
```


### draft-order.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].draft-order.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.draftOrder.list(input?: unknown);
```


### draft-order[].send-invoice

*CLI*
```sh
$ sdm 'shopify[my-shop-name].draft-order[id|*].send-invoice' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.draftOrder.$doc(id).sendInvoice(input?: unknown);
const command = shopify.draftOrder.$all.sendInvoice(input?: unknown);
```


### draft-order[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].draft-order[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.draftOrder.$doc(id).update(input?: unknown);
const command = shopify.draftOrder.$all.update(input?: unknown);
```


## event

### Endpoints

 * [create](#eventcreate)
 * [delete](#eventdelete)
 * [get](#eventget)
 * [list](#eventlist)
 * [update](#eventupdate)

### event.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].event.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.event.create(input?: unknown);
```


### event[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].event[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.event.$doc(id).delete(input?: unknown);
const command = shopify.event.$all.delete(input?: unknown);
```


### event[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].event[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.event.$doc(id).get(input?: unknown);
const command = shopify.event.$all.get(input?: unknown);
```


### event.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].event.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.event.list(input?: unknown);
```


### event[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].event[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.event.$doc(id).update(input?: unknown);
const command = shopify.event.$all.update(input?: unknown);
```


## fulfillment-service

### Endpoints

 * [create](#fulfillmentservicecreate)
 * [delete](#fulfillmentservicedelete)
 * [get](#fulfillmentserviceget)
 * [list](#fulfillmentservicelist)
 * [update](#fulfillmentserviceupdate)

### fulfillment-service.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].fulfillment-service.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.fulfillmentService.create(input?: unknown);
```


### fulfillment-service[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].fulfillment-service[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.fulfillmentService.$doc(id).delete(input?: unknown);
const command = shopify.fulfillmentService.$all.delete(input?: unknown);
```


### fulfillment-service[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].fulfillment-service[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.fulfillmentService.$doc(id).get(input?: unknown);
const command = shopify.fulfillmentService.$all.get(input?: unknown);
```


### fulfillment-service.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].fulfillment-service.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.fulfillmentService.list(input?: unknown);
```


### fulfillment-service[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].fulfillment-service[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.fulfillmentService.$doc(id).update(input?: unknown);
const command = shopify.fulfillmentService.$all.update(input?: unknown);
```


## gift-card

### Endpoints

 * [count](#giftcardcount)
 * [create](#giftcardcreate)
 * [disable](#giftcarddisable)
 * [get](#giftcardget)
 * [list](#giftcardlist)
 * [update](#giftcardupdate)

### gift-card.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].gift-card.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.giftCard.count(input?: unknown);
```


### gift-card.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].gift-card.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.giftCard.create(input?: unknown);
```


### gift-card[].disable

*CLI*
```sh
$ sdm 'shopify[my-shop-name].gift-card[id|*].disable' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.giftCard.$doc(id).disable(input?: unknown);
const command = shopify.giftCard.$all.disable(input?: unknown);
```


### gift-card[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].gift-card[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.giftCard.$doc(id).get(input?: unknown);
const command = shopify.giftCard.$all.get(input?: unknown);
```


### gift-card.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].gift-card.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.giftCard.list(input?: unknown);
```


### gift-card[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].gift-card[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.giftCard.$doc(id).update(input?: unknown);
const command = shopify.giftCard.$all.update(input?: unknown);
```


## gift-card[].gift-card-adjustment

### Endpoints

 * [create](#giftcardgiftcardadjustmentcreate)
 * [get](#giftcardgiftcardadjustmentget)
 * [list](#giftcardgiftcardadjustmentlist)

### gift-card[].gift-card-adjustment.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].gift-card[id|*].gift-card-adjustment.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.giftCard.$doc(id).giftCardAdjustment.create(input?: unknown);
const command = shopify.giftCard.$all.giftCardAdjustment.create(input?: unknown);
```


### gift-card[].gift-card-adjustment[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].gift-card[id|*].gift-card-adjustment[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.giftCard.$doc(id).giftCardAdjustment.$doc(id).get(input?: unknown);
const command = shopify.giftCard.$all.giftCardAdjustment.$all.get(input?: unknown);
```


### gift-card[].gift-card-adjustment.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].gift-card[id|*].gift-card-adjustment.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.giftCard.$doc(id).giftCardAdjustment.list(input?: unknown);
const command = shopify.giftCard.$all.giftCardAdjustment.list(input?: unknown);
```


## inventory-item

### Endpoints

 * [get](#inventoryitemget)
 * [list](#inventoryitemlist)
 * [update](#inventoryitemupdate)

### inventory-item[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].inventory-item[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.inventoryItem.$doc(id).get(input?: unknown);
const command = shopify.inventoryItem.$all.get(input?: unknown);
```


### inventory-item.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].inventory-item.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.inventoryItem.list(input?: unknown);
```


### inventory-item[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].inventory-item[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.inventoryItem.$doc(id).update(input?: unknown);
const command = shopify.inventoryItem.$all.update(input?: unknown);
```


## inventory-level

### Endpoints

 * [delete](#inventoryleveldelete)
 * [list](#inventorylevellist)

### inventory-level[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].inventory-level[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.inventoryLevel.$doc(id).delete(input?: unknown);
const command = shopify.inventoryLevel.$all.delete(input?: unknown);
```


### inventory-level.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].inventory-level.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.inventoryLevel.list(input?: unknown);
```


## location

### Endpoints

 * [count](#locationcount)
 * [get](#locationget)
 * [inventory-levels](#locationinventorylevels)
 * [list](#locationlist)

### location.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].location.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.location.count(input?: unknown);
```


### location[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].location[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.location.$doc(id).get(input?: unknown);
const command = shopify.location.$all.get(input?: unknown);
```


### location[].inventory-levels

*CLI*
```sh
$ sdm 'shopify[my-shop-name].location[id|*].inventory-levels' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.location.$doc(id).inventoryLevels(input?: unknown);
const command = shopify.location.$all.inventoryLevels(input?: unknown);
```


### location.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].location.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.location.list(input?: unknown);
```


## metafield

### Endpoints

 * [count](#metafieldcount)
 * [create](#metafieldcreate)
 * [delete](#metafielddelete)
 * [get](#metafieldget)
 * [list](#metafieldlist)
 * [update](#metafieldupdate)

### metafield.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].metafield.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.metafield.count(input?: unknown);
```


### metafield.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].metafield.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.metafield.create(input?: unknown);
```


### metafield[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].metafield[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.metafield.$doc(id).delete(input?: unknown);
const command = shopify.metafield.$all.delete(input?: unknown);
```


### metafield[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].metafield[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.metafield.$doc(id).get(input?: unknown);
const command = shopify.metafield.$all.get(input?: unknown);
```


### metafield.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].metafield.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.metafield.list(input?: unknown);
```


### metafield[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].metafield[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.metafield.$doc(id).update(input?: unknown);
const command = shopify.metafield.$all.update(input?: unknown);
```


## order

### Endpoints

 * [cancel](#ordercancel)
 * [close](#orderclose)
 * [count](#ordercount)
 * [create](#ordercreate)
 * [delete](#orderdelete)
 * [fulfillment-orders](#orderfulfillmentorders)
 * [get](#orderget)
 * [list](#orderlist)
 * [open](#orderopen)
 * [update](#orderupdate)

### order[].cancel

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].cancel' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).cancel(input?: unknown);
const command = shopify.order.$all.cancel(input?: unknown);
```


### order[].close

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].close' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).close(input?: unknown);
const command = shopify.order.$all.close(input?: unknown);
```


### order.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.count(input?: unknown);
```


### order.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.create(input?: unknown);
```


### order[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).delete(input?: unknown);
const command = shopify.order.$all.delete(input?: unknown);
```


### order[].fulfillment-orders

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].fulfillment-orders' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillmentOrders(input?: unknown);
const command = shopify.order.$all.fulfillmentOrders(input?: unknown);
```


### order[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).get(input?: unknown);
const command = shopify.order.$all.get(input?: unknown);
```


### order.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.list(input?: unknown);
```


### order[].open

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].open' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).open(input?: unknown);
const command = shopify.order.$all.open(input?: unknown);
```


### order[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).update(input?: unknown);
const command = shopify.order.$all.update(input?: unknown);
```


## order[].fulfillment

### Endpoints

 * [cancel](#orderfulfillmentcancel)
 * [complete](#orderfulfillmentcomplete)
 * [count](#orderfulfillmentcount)
 * [create](#orderfulfillmentcreate)
 * [get](#orderfulfillmentget)
 * [list](#orderfulfillmentlist)
 * [open](#orderfulfillmentopen)
 * [update](#orderfulfillmentupdate)

### order[].fulfillment[].cancel

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].fulfillment[id|*].cancel' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).cancel(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.cancel(input?: unknown);
```


### order[].fulfillment[].complete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].fulfillment[id|*].complete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).complete(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.complete(input?: unknown);
```


### order[].fulfillment.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].fulfillment.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.count(input?: unknown);
const command = shopify.order.$all.fulfillment.count(input?: unknown);
```


### order[].fulfillment.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].fulfillment.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.create(input?: unknown);
const command = shopify.order.$all.fulfillment.create(input?: unknown);
```


### order[].fulfillment[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].fulfillment[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).get(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.get(input?: unknown);
```


### order[].fulfillment.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].fulfillment.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.list(input?: unknown);
const command = shopify.order.$all.fulfillment.list(input?: unknown);
```


### order[].fulfillment[].open

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].fulfillment[id|*].open' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).open(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.open(input?: unknown);
```


### order[].fulfillment[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].fulfillment[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).update(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.update(input?: unknown);
```


## order[].fulfillment[].fulfillment-event

### Endpoints

 * [create](#orderfulfillmentfulfillmenteventcreate)
 * [delete](#orderfulfillmentfulfillmenteventdelete)
 * [get](#orderfulfillmentfulfillmenteventget)
 * [list](#orderfulfillmentfulfillmenteventlist)
 * [update](#orderfulfillmentfulfillmenteventupdate)

### order[].fulfillment[].fulfillment-event.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].fulfillment[id|*].fulfillment-event.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).fulfillmentEvent.create(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.fulfillmentEvent.create(input?: unknown);
```


### order[].fulfillment[].fulfillment-event[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].fulfillment[id|*].fulfillment-event[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).fulfillmentEvent.$doc(id).delete(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.fulfillmentEvent.$all.delete(input?: unknown);
```


### order[].fulfillment[].fulfillment-event[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].fulfillment[id|*].fulfillment-event[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).fulfillmentEvent.$doc(id).get(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.fulfillmentEvent.$all.get(input?: unknown);
```


### order[].fulfillment[].fulfillment-event.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].fulfillment[id|*].fulfillment-event.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).fulfillmentEvent.list(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.fulfillmentEvent.list(input?: unknown);
```


### order[].fulfillment[].fulfillment-event[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].fulfillment[id|*].fulfillment-event[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).fulfillmentEvent.$doc(id).update(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.fulfillmentEvent.$all.update(input?: unknown);
```


## order[].order-risk

### Endpoints

 * [create](#orderorderriskcreate)
 * [delete](#orderorderriskdelete)
 * [get](#orderorderriskget)
 * [list](#orderorderrisklist)
 * [update](#orderorderriskupdate)

### order[].order-risk.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].order-risk.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).orderRisk.create(input?: unknown);
const command = shopify.order.$all.orderRisk.create(input?: unknown);
```


### order[].order-risk[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].order-risk[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).orderRisk.$doc(id).delete(input?: unknown);
const command = shopify.order.$all.orderRisk.$all.delete(input?: unknown);
```


### order[].order-risk[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].order-risk[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).orderRisk.$doc(id).get(input?: unknown);
const command = shopify.order.$all.orderRisk.$all.get(input?: unknown);
```


### order[].order-risk.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].order-risk.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).orderRisk.list(input?: unknown);
const command = shopify.order.$all.orderRisk.list(input?: unknown);
```


### order[].order-risk[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].order-risk[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).orderRisk.$doc(id).update(input?: unknown);
const command = shopify.order.$all.orderRisk.$all.update(input?: unknown);
```


## order[].refund

### Endpoints

 * [calculate](#orderrefundcalculate)
 * [create](#orderrefundcreate)
 * [get](#orderrefundget)
 * [list](#orderrefundlist)

### order[].refund.calculate

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].refund.calculate' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).refund.calculate(input?: unknown);
const command = shopify.order.$all.refund.calculate(input?: unknown);
```


### order[].refund.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].refund.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).refund.create(input?: unknown);
const command = shopify.order.$all.refund.create(input?: unknown);
```


### order[].refund[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].refund[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).refund.$doc(id).get(input?: unknown);
const command = shopify.order.$all.refund.$all.get(input?: unknown);
```


### order[].refund.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].refund.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).refund.list(input?: unknown);
const command = shopify.order.$all.refund.list(input?: unknown);
```


## order[].transaction

### Endpoints

 * [count](#ordertransactioncount)
 * [create](#ordertransactioncreate)
 * [get](#ordertransactionget)
 * [list](#ordertransactionlist)

### order[].transaction.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].transaction.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).transaction.count(input?: unknown);
const command = shopify.order.$all.transaction.count(input?: unknown);
```


### order[].transaction.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].transaction.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).transaction.create(input?: unknown);
const command = shopify.order.$all.transaction.create(input?: unknown);
```


### order[].transaction[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].transaction[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).transaction.$doc(id).get(input?: unknown);
const command = shopify.order.$all.transaction.$all.get(input?: unknown);
```


### order[].transaction.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].order[id|*].transaction.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).transaction.list(input?: unknown);
const command = shopify.order.$all.transaction.list(input?: unknown);
```


## page

### Endpoints

 * [count](#pagecount)
 * [create](#pagecreate)
 * [delete](#pagedelete)
 * [get](#pageget)
 * [list](#pagelist)
 * [update](#pageupdate)

### page.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].page.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.page.count(input?: unknown);
```


### page.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].page.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.page.create(input?: unknown);
```


### page[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].page[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.page.$doc(id).delete(input?: unknown);
const command = shopify.page.$all.delete(input?: unknown);
```


### page[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].page[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.page.$doc(id).get(input?: unknown);
const command = shopify.page.$all.get(input?: unknown);
```


### page.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].page.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.page.list(input?: unknown);
```


### page[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].page[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.page.$doc(id).update(input?: unknown);
const command = shopify.page.$all.update(input?: unknown);
```


## payout

### Endpoints

 * [get](#payoutget)
 * [list](#payoutlist)

### payout[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].payout[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.payout.$doc(id).get(input?: unknown);
const command = shopify.payout.$all.get(input?: unknown);
```


### payout.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].payout.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.payout.list(input?: unknown);
```


## policy

### Endpoints

 * [list](#policylist)

### policy.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].policy.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.policy.list(input?: unknown);
```


## price-rule

### Endpoints

 * [create](#pricerulecreate)
 * [delete](#priceruledelete)
 * [get](#priceruleget)
 * [list](#pricerulelist)
 * [update](#priceruleupdate)

### price-rule.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].price-rule.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.priceRule.create(input?: unknown);
```


### price-rule[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].price-rule[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).delete(input?: unknown);
const command = shopify.priceRule.$all.delete(input?: unknown);
```


### price-rule[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].price-rule[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).get(input?: unknown);
const command = shopify.priceRule.$all.get(input?: unknown);
```


### price-rule.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].price-rule.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.priceRule.list(input?: unknown);
```


### price-rule[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].price-rule[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).update(input?: unknown);
const command = shopify.priceRule.$all.update(input?: unknown);
```


## price-rule[].discount-code

### Endpoints

 * [create](#pricerulediscountcodecreate)
 * [delete](#pricerulediscountcodedelete)
 * [get](#pricerulediscountcodeget)
 * [list](#pricerulediscountcodelist)
 * [lookup](#pricerulediscountcodelookup)
 * [update](#pricerulediscountcodeupdate)

### price-rule[].discount-code.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].price-rule[id|*].discount-code.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).discountCode.create(input?: unknown);
const command = shopify.priceRule.$all.discountCode.create(input?: unknown);
```


### price-rule[].discount-code[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].price-rule[id|*].discount-code[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).discountCode.$doc(id).delete(input?: unknown);
const command = shopify.priceRule.$all.discountCode.$all.delete(input?: unknown);
```


### price-rule[].discount-code[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].price-rule[id|*].discount-code[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).discountCode.$doc(id).get(input?: unknown);
const command = shopify.priceRule.$all.discountCode.$all.get(input?: unknown);
```


### price-rule[].discount-code.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].price-rule[id|*].discount-code.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).discountCode.list(input?: unknown);
const command = shopify.priceRule.$all.discountCode.list(input?: unknown);
```


### price-rule[].discount-code.lookup

*CLI*
```sh
$ sdm 'shopify[my-shop-name].price-rule[id|*].discount-code.lookup' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).discountCode.lookup(input?: unknown);
const command = shopify.priceRule.$all.discountCode.lookup(input?: unknown);
```


### price-rule[].discount-code[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].price-rule[id|*].discount-code[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).discountCode.$doc(id).update(input?: unknown);
const command = shopify.priceRule.$all.discountCode.$all.update(input?: unknown);
```


## product-listing

### Endpoints

 * [count](#productlistingcount)
 * [create](#productlistingcreate)
 * [delete](#productlistingdelete)
 * [get](#productlistingget)
 * [list](#productlistinglist)

### product-listing.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product-listing.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.productListing.count(input?: unknown);
```


### product-listing.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product-listing.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.productListing.create(input?: unknown);
```


### product-listing[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product-listing[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.productListing.$doc(id).delete(input?: unknown);
const command = shopify.productListing.$all.delete(input?: unknown);
```


### product-listing[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product-listing[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.productListing.$doc(id).get(input?: unknown);
const command = shopify.productListing.$all.get(input?: unknown);
```


### product-listing.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product-listing.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.productListing.list(input?: unknown);
```


## product

### Endpoints

 * [count](#productcount)
 * [create](#productcreate)
 * [delete](#productdelete)
 * [get](#productget)
 * [list](#productlist)
 * [update](#productupdate)

### product.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.count(input?: unknown);
```


### product.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.create(input?: unknown);
```


### product[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).delete(input?: unknown);
const command = shopify.product.$all.delete(input?: unknown);
```


### product[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).get(input?: unknown);
const command = shopify.product.$all.get(input?: unknown);
```


### product.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.list(input?: unknown);
```


### product[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).update(input?: unknown);
const command = shopify.product.$all.update(input?: unknown);
```


## product[].product-image

### Endpoints

 * [count](#productproductimagecount)
 * [create](#productproductimagecreate)
 * [delete](#productproductimagedelete)
 * [get](#productproductimageget)
 * [list](#productproductimagelist)
 * [update](#productproductimageupdate)

### product[].product-image.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product[id|*].product-image.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productImage.count(input?: unknown);
const command = shopify.product.$all.productImage.count(input?: unknown);
```


### product[].product-image.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product[id|*].product-image.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productImage.create(input?: unknown);
const command = shopify.product.$all.productImage.create(input?: unknown);
```


### product[].product-image[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product[id|*].product-image[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productImage.$doc(id).delete(input?: unknown);
const command = shopify.product.$all.productImage.$all.delete(input?: unknown);
```


### product[].product-image[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product[id|*].product-image[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productImage.$doc(id).get(input?: unknown);
const command = shopify.product.$all.productImage.$all.get(input?: unknown);
```


### product[].product-image.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product[id|*].product-image.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productImage.list(input?: unknown);
const command = shopify.product.$all.productImage.list(input?: unknown);
```


### product[].product-image[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product[id|*].product-image[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productImage.$doc(id).update(input?: unknown);
const command = shopify.product.$all.productImage.$all.update(input?: unknown);
```


## product[].product-resource-feedback

### Endpoints

 * [create](#productproductresourcefeedbackcreate)
 * [list](#productproductresourcefeedbacklist)

### product[].product-resource-feedback.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product[id|*].product-resource-feedback.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productResourceFeedback.create(input?: unknown);
const command = shopify.product.$all.productResourceFeedback.create(input?: unknown);
```


### product[].product-resource-feedback.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product[id|*].product-resource-feedback.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productResourceFeedback.list(input?: unknown);
const command = shopify.product.$all.productResourceFeedback.list(input?: unknown);
```


## product[].product-variant

### Endpoints

 * [count](#productproductvariantcount)
 * [create](#productproductvariantcreate)
 * [delete](#productproductvariantdelete)
 * [get](#productproductvariantget)
 * [list](#productproductvariantlist)
 * [update](#productproductvariantupdate)

### product[].product-variant.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product[id|*].product-variant.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productVariant.count(input?: unknown);
const command = shopify.product.$all.productVariant.count(input?: unknown);
```


### product[].product-variant.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product[id|*].product-variant.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productVariant.create(input?: unknown);
const command = shopify.product.$all.productVariant.create(input?: unknown);
```


### product[].product-variant[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product[id|*].product-variant[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productVariant.$doc(id).delete(input?: unknown);
const command = shopify.product.$all.productVariant.$all.delete(input?: unknown);
```


### product[].product-variant[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product[id|*].product-variant[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productVariant.$doc(id).get(input?: unknown);
const command = shopify.product.$all.productVariant.$all.get(input?: unknown);
```


### product[].product-variant.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product[id|*].product-variant.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productVariant.list(input?: unknown);
const command = shopify.product.$all.productVariant.list(input?: unknown);
```


### product[].product-variant[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].product[id|*].product-variant[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productVariant.$doc(id).update(input?: unknown);
const command = shopify.product.$all.productVariant.$all.update(input?: unknown);
```


## redirect

### Endpoints

 * [count](#redirectcount)
 * [create](#redirectcreate)
 * [delete](#redirectdelete)
 * [get](#redirectget)
 * [list](#redirectlist)
 * [update](#redirectupdate)

### redirect.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].redirect.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.redirect.count(input?: unknown);
```


### redirect.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].redirect.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.redirect.create(input?: unknown);
```


### redirect[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].redirect[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.redirect.$doc(id).delete(input?: unknown);
const command = shopify.redirect.$all.delete(input?: unknown);
```


### redirect[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].redirect[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.redirect.$doc(id).get(input?: unknown);
const command = shopify.redirect.$all.get(input?: unknown);
```


### redirect.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].redirect.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.redirect.list(input?: unknown);
```


### redirect[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].redirect[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.redirect.$doc(id).update(input?: unknown);
const command = shopify.redirect.$all.update(input?: unknown);
```


## report

### Endpoints

 * [create](#reportcreate)
 * [delete](#reportdelete)
 * [get](#reportget)
 * [list](#reportlist)
 * [update](#reportupdate)

### report.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].report.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.report.create(input?: unknown);
```


### report[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].report[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.report.$doc(id).delete(input?: unknown);
const command = shopify.report.$all.delete(input?: unknown);
```


### report[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].report[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.report.$doc(id).get(input?: unknown);
const command = shopify.report.$all.get(input?: unknown);
```


### report.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].report.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.report.list(input?: unknown);
```


### report[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].report[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.report.$doc(id).update(input?: unknown);
const command = shopify.report.$all.update(input?: unknown);
```


## resource-feedback

### Endpoints

 * [create](#resourcefeedbackcreate)
 * [list](#resourcefeedbacklist)

### resource-feedback.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].resource-feedback.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.resourceFeedback.create(input?: unknown);
```


### resource-feedback.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].resource-feedback.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.resourceFeedback.list(input?: unknown);
```


## script-tag

### Endpoints

 * [count](#scripttagcount)
 * [create](#scripttagcreate)
 * [delete](#scripttagdelete)
 * [get](#scripttagget)
 * [list](#scripttaglist)
 * [update](#scripttagupdate)

### script-tag.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].script-tag.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.scriptTag.count(input?: unknown);
```


### script-tag.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].script-tag.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.scriptTag.create(input?: unknown);
```


### script-tag[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].script-tag[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.scriptTag.$doc(id).delete(input?: unknown);
const command = shopify.scriptTag.$all.delete(input?: unknown);
```


### script-tag[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].script-tag[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.scriptTag.$doc(id).get(input?: unknown);
const command = shopify.scriptTag.$all.get(input?: unknown);
```


### script-tag.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].script-tag.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.scriptTag.list(input?: unknown);
```


### script-tag[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].script-tag[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.scriptTag.$doc(id).update(input?: unknown);
const command = shopify.scriptTag.$all.update(input?: unknown);
```


## shipping-zone

### Endpoints

 * [list](#shippingzonelist)

### shipping-zone.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].shipping-zone.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.shippingZone.list(input?: unknown);
```


## shop

### Endpoints

 * [get](#shopget)

### shop.get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].shop.get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.shop.get(input?: unknown);
```


## smart-collection

### Endpoints

 * [count](#smartcollectioncount)
 * [create](#smartcollectioncreate)
 * [delete](#smartcollectiondelete)
 * [get](#smartcollectionget)
 * [list](#smartcollectionlist)
 * [update](#smartcollectionupdate)

### smart-collection.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].smart-collection.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.smartCollection.count(input?: unknown);
```


### smart-collection.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].smart-collection.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.smartCollection.create(input?: unknown);
```


### smart-collection[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].smart-collection[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.smartCollection.$doc(id).delete(input?: unknown);
const command = shopify.smartCollection.$all.delete(input?: unknown);
```


### smart-collection[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].smart-collection[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.smartCollection.$doc(id).get(input?: unknown);
const command = shopify.smartCollection.$all.get(input?: unknown);
```


### smart-collection.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].smart-collection.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.smartCollection.list(input?: unknown);
```


### smart-collection[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].smart-collection[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.smartCollection.$doc(id).update(input?: unknown);
const command = shopify.smartCollection.$all.update(input?: unknown);
```


## storefront-access-token

### Endpoints

 * [create](#storefrontaccesstokencreate)
 * [delete](#storefrontaccesstokendelete)
 * [list](#storefrontaccesstokenlist)

### storefront-access-token.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].storefront-access-token.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.storefrontAccessToken.create(input?: unknown);
```


### storefront-access-token[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].storefront-access-token[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.storefrontAccessToken.$doc(id).delete(input?: unknown);
const command = shopify.storefrontAccessToken.$all.delete(input?: unknown);
```


### storefront-access-token.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].storefront-access-token.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.storefrontAccessToken.list(input?: unknown);
```


## tender-transaction

### Endpoints

 * [list](#tendertransactionlist)

### tender-transaction.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].tender-transaction.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.tenderTransaction.list(input?: unknown);
```


## theme

### Endpoints

 * [create](#themecreate)
 * [delete](#themedelete)
 * [get](#themeget)
 * [list](#themelist)
 * [update](#themeupdate)

### theme.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].theme.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.theme.create(input?: unknown);
```


### theme[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].theme[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).delete(input?: unknown);
const command = shopify.theme.$all.delete(input?: unknown);
```


### theme[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].theme[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).get(input?: unknown);
const command = shopify.theme.$all.get(input?: unknown);
```


### theme.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].theme.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.theme.list(input?: unknown);
```


### theme[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].theme[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).update(input?: unknown);
const command = shopify.theme.$all.update(input?: unknown);
```


## theme[].asset

### Endpoints

 * [create](#themeassetcreate)
 * [delete](#themeassetdelete)
 * [get](#themeassetget)
 * [list](#themeassetlist)
 * [update](#themeassetupdate)

### theme[].asset.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].theme[id|*].asset.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).asset.create(input?: unknown);
const command = shopify.theme.$all.asset.create(input?: unknown);
```


### theme[].asset[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].theme[id|*].asset[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).asset.$doc(id).delete(input?: unknown);
const command = shopify.theme.$all.asset.$all.delete(input?: unknown);
```


### theme[].asset[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].theme[id|*].asset[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).asset.$doc(id).get(input?: unknown);
const command = shopify.theme.$all.asset.$all.get(input?: unknown);
```


### theme[].asset.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].theme[id|*].asset.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).asset.list(input?: unknown);
const command = shopify.theme.$all.asset.list(input?: unknown);
```


### theme[].asset[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].theme[id|*].asset[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).asset.$doc(id).update(input?: unknown);
const command = shopify.theme.$all.asset.$all.update(input?: unknown);
```


## user

### Endpoints

 * [current](#usercurrent)
 * [get](#userget)
 * [list](#userlist)

### user.current

*CLI*
```sh
$ sdm 'shopify[my-shop-name].user.current' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.user.current(input?: unknown);
```


### user[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].user[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.user.$doc(id).get(input?: unknown);
const command = shopify.user.$all.get(input?: unknown);
```


### user.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].user.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.user.list(input?: unknown);
```


## webhook

### Endpoints

 * [count](#webhookcount)
 * [create](#webhookcreate)
 * [delete](#webhookdelete)
 * [get](#webhookget)
 * [list](#webhooklist)
 * [update](#webhookupdate)

### webhook.count

*CLI*
```sh
$ sdm 'shopify[my-shop-name].webhook.count' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.webhook.count(input?: unknown);
```


### webhook.create

*CLI*
```sh
$ sdm 'shopify[my-shop-name].webhook.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.webhook.create(input?: unknown);
```


### webhook[].delete

*CLI*
```sh
$ sdm 'shopify[my-shop-name].webhook[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.webhook.$doc(id).delete(input?: unknown);
const command = shopify.webhook.$all.delete(input?: unknown);
```


### webhook[].get

*CLI*
```sh
$ sdm 'shopify[my-shop-name].webhook[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.webhook.$doc(id).get(input?: unknown);
const command = shopify.webhook.$all.get(input?: unknown);
```


### webhook.list

*CLI*
```sh
$ sdm 'shopify[my-shop-name].webhook.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.webhook.list(input?: unknown);
```


### webhook[].update

*CLI*
```sh
$ sdm 'shopify[my-shop-name].webhook[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = shopify.webhook.$doc(id).update(input?: unknown);
const command = shopify.webhook.$all.update(input?: unknown);
```


