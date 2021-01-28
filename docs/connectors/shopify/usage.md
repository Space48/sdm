
# Using the CLI interface

# Using the TypeScript interface

# Commands

## access-scope

### list

*CLI*
```sh
$ sdm shopify[my-shop-name].access-scope.list
```

*TypeScript*
```javascript
const command = shopify.accessScope.list(input?: unknown);
```


## api-permission

### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].api-permission[id].delete
```

*TypeScript*
```javascript
const command = shopify.apiPermission.$doc(id).delete(input?: unknown);
```


## application-credit

### create

*CLI*
```sh
$ sdm shopify[my-shop-name].application-credit.create
```

*TypeScript*
```javascript
const command = shopify.applicationCredit.create(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].application-credit[id|*].get
```

*TypeScript*
```javascript
const command = shopify.applicationCredit.$doc(id).get(input?: unknown);
const command = shopify.applicationCredit.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].application-credit.list
```

*TypeScript*
```javascript
const command = shopify.applicationCredit.list(input?: unknown);
```


## blog

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].blog.count
```

*TypeScript*
```javascript
const command = shopify.blog.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].blog.create
```

*TypeScript*
```javascript
const command = shopify.blog.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].blog[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).delete(input?: unknown);
const command = shopify.blog.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].blog[id|*].get
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).get(input?: unknown);
const command = shopify.blog.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].blog.list
```

*TypeScript*
```javascript
const command = shopify.blog.list(input?: unknown);
```


### update

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

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].blog[id|*].article.count
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.count(input?: unknown);
const command = shopify.blog.$all.article.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].blog[id|*].article.create
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.create(input?: unknown);
const command = shopify.blog.$all.article.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].blog[id|*].article[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.$doc(id).delete(input?: unknown);
const command = shopify.blog.$all.article.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].blog[id|*].article[id|*].get
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.$doc(id).get(input?: unknown);
const command = shopify.blog.$all.article.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].blog[id|*].article.list
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.list(input?: unknown);
const command = shopify.blog.$all.article.list(input?: unknown);
```


### tags

*CLI*
```sh
$ sdm shopify[my-shop-name].blog[id|*].article[id|*].tags
```

*TypeScript*
```javascript
const command = shopify.blog.$doc(id).article.$doc(id).tags(input?: unknown);
const command = shopify.blog.$all.article.$all.tags(input?: unknown);
```


### update

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

### create

*CLI*
```sh
$ sdm shopify[my-shop-name].carrier-service.create
```

*TypeScript*
```javascript
const command = shopify.carrierService.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].carrier-service[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.carrierService.$doc(id).delete(input?: unknown);
const command = shopify.carrierService.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].carrier-service[id|*].get
```

*TypeScript*
```javascript
const command = shopify.carrierService.$doc(id).get(input?: unknown);
const command = shopify.carrierService.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].carrier-service.list
```

*TypeScript*
```javascript
const command = shopify.carrierService.list(input?: unknown);
```


### update

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

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].collect.count
```

*TypeScript*
```javascript
const command = shopify.collect.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].collect.create
```

*TypeScript*
```javascript
const command = shopify.collect.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].collect[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.collect.$doc(id).delete(input?: unknown);
const command = shopify.collect.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].collect[id|*].get
```

*TypeScript*
```javascript
const command = shopify.collect.$doc(id).get(input?: unknown);
const command = shopify.collect.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].collect.list
```

*TypeScript*
```javascript
const command = shopify.collect.list(input?: unknown);
```


## collection-listing

### get

*CLI*
```sh
$ sdm shopify[my-shop-name].collection-listing[id|*].get
```

*TypeScript*
```javascript
const command = shopify.collectionListing.$doc(id).get(input?: unknown);
const command = shopify.collectionListing.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].collection-listing.list
```

*TypeScript*
```javascript
const command = shopify.collectionListing.list(input?: unknown);
```


## collection

### get

*CLI*
```sh
$ sdm shopify[my-shop-name].collection[id].get
```

*TypeScript*
```javascript
const command = shopify.collection.$doc(id).get(input?: unknown);
```


### products

*CLI*
```sh
$ sdm shopify[my-shop-name].collection[id].products
```

*TypeScript*
```javascript
const command = shopify.collection.$doc(id).products(input?: unknown);
```


## country

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].country.count
```

*TypeScript*
```javascript
const command = shopify.country.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].country.create
```

*TypeScript*
```javascript
const command = shopify.country.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].country[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.country.$doc(id).delete(input?: unknown);
const command = shopify.country.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].country[id|*].get
```

*TypeScript*
```javascript
const command = shopify.country.$doc(id).get(input?: unknown);
const command = shopify.country.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].country.list
```

*TypeScript*
```javascript
const command = shopify.country.list(input?: unknown);
```


### update

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

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].country[id|*].province.count
```

*TypeScript*
```javascript
const command = shopify.country.$doc(id).province.count(input?: unknown);
const command = shopify.country.$all.province.count(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].country[id|*].province[id|*].get
```

*TypeScript*
```javascript
const command = shopify.country.$doc(id).province.$doc(id).get(input?: unknown);
const command = shopify.country.$all.province.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].country[id|*].province.list
```

*TypeScript*
```javascript
const command = shopify.country.$doc(id).province.list(input?: unknown);
const command = shopify.country.$all.province.list(input?: unknown);
```


### update

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

### list

*CLI*
```sh
$ sdm shopify[my-shop-name].currency.list
```

*TypeScript*
```javascript
const command = shopify.currency.list(input?: unknown);
```


## custom-collection

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].custom-collection.count
```

*TypeScript*
```javascript
const command = shopify.customCollection.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].custom-collection.create
```

*TypeScript*
```javascript
const command = shopify.customCollection.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].custom-collection[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.customCollection.$doc(id).delete(input?: unknown);
const command = shopify.customCollection.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].custom-collection[id|*].get
```

*TypeScript*
```javascript
const command = shopify.customCollection.$doc(id).get(input?: unknown);
const command = shopify.customCollection.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].custom-collection.list
```

*TypeScript*
```javascript
const command = shopify.customCollection.list(input?: unknown);
```


### update

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

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].customer.count
```

*TypeScript*
```javascript
const command = shopify.customer.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].customer.create
```

*TypeScript*
```javascript
const command = shopify.customer.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).delete(input?: unknown);
const command = shopify.customer.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].get
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).get(input?: unknown);
const command = shopify.customer.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].customer.list
```

*TypeScript*
```javascript
const command = shopify.customer.list(input?: unknown);
```


### orders

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].orders
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).orders(input?: unknown);
const command = shopify.customer.$all.orders(input?: unknown);
```


### sendInvite

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].send-invite
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).sendInvite(input?: unknown);
const command = shopify.customer.$all.sendInvite(input?: unknown);
```


### update

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

### create

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].customer-address.create
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.create(input?: unknown);
const command = shopify.customer.$all.customerAddress.create(input?: unknown);
```


### default

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].customer-address[id|*].default
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.$doc(id).default(input?: unknown);
const command = shopify.customer.$all.customerAddress.$all.default(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].customer-address[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.$doc(id).delete(input?: unknown);
const command = shopify.customer.$all.customerAddress.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].customer-address[id|*].get
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.$doc(id).get(input?: unknown);
const command = shopify.customer.$all.customerAddress.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].customer-address.list
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.list(input?: unknown);
const command = shopify.customer.$all.customerAddress.list(input?: unknown);
```


### set

*CLI*
```sh
$ sdm shopify[my-shop-name].customer[id|*].customer-address.set
```

*TypeScript*
```javascript
const command = shopify.customer.$doc(id).customerAddress.set(input?: unknown);
const command = shopify.customer.$all.customerAddress.set(input?: unknown);
```


### update

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

### get

*CLI*
```sh
$ sdm shopify[my-shop-name].dispute[id|*].get
```

*TypeScript*
```javascript
const command = shopify.dispute.$doc(id).get(input?: unknown);
const command = shopify.dispute.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].dispute.list
```

*TypeScript*
```javascript
const command = shopify.dispute.list(input?: unknown);
```


## draft-order

### complete

*CLI*
```sh
$ sdm shopify[my-shop-name].draft-order[id|*].complete
```

*TypeScript*
```javascript
const command = shopify.draftOrder.$doc(id).complete(input?: unknown);
const command = shopify.draftOrder.$all.complete(input?: unknown);
```


### count

*CLI*
```sh
$ sdm shopify[my-shop-name].draft-order.count
```

*TypeScript*
```javascript
const command = shopify.draftOrder.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].draft-order.create
```

*TypeScript*
```javascript
const command = shopify.draftOrder.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].draft-order[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.draftOrder.$doc(id).delete(input?: unknown);
const command = shopify.draftOrder.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].draft-order[id|*].get
```

*TypeScript*
```javascript
const command = shopify.draftOrder.$doc(id).get(input?: unknown);
const command = shopify.draftOrder.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].draft-order.list
```

*TypeScript*
```javascript
const command = shopify.draftOrder.list(input?: unknown);
```


### sendInvoice

*CLI*
```sh
$ sdm shopify[my-shop-name].draft-order[id|*].send-invoice
```

*TypeScript*
```javascript
const command = shopify.draftOrder.$doc(id).sendInvoice(input?: unknown);
const command = shopify.draftOrder.$all.sendInvoice(input?: unknown);
```


### update

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

### create

*CLI*
```sh
$ sdm shopify[my-shop-name].event.create
```

*TypeScript*
```javascript
const command = shopify.event.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].event[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.event.$doc(id).delete(input?: unknown);
const command = shopify.event.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].event[id|*].get
```

*TypeScript*
```javascript
const command = shopify.event.$doc(id).get(input?: unknown);
const command = shopify.event.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].event.list
```

*TypeScript*
```javascript
const command = shopify.event.list(input?: unknown);
```


### update

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

### create

*CLI*
```sh
$ sdm shopify[my-shop-name].fulfillment-service.create
```

*TypeScript*
```javascript
const command = shopify.fulfillmentService.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].fulfillment-service[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.fulfillmentService.$doc(id).delete(input?: unknown);
const command = shopify.fulfillmentService.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].fulfillment-service[id|*].get
```

*TypeScript*
```javascript
const command = shopify.fulfillmentService.$doc(id).get(input?: unknown);
const command = shopify.fulfillmentService.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].fulfillment-service.list
```

*TypeScript*
```javascript
const command = shopify.fulfillmentService.list(input?: unknown);
```


### update

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

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].gift-card.count
```

*TypeScript*
```javascript
const command = shopify.giftCard.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].gift-card.create
```

*TypeScript*
```javascript
const command = shopify.giftCard.create(input?: unknown);
```


### disable

*CLI*
```sh
$ sdm shopify[my-shop-name].gift-card[id|*].disable
```

*TypeScript*
```javascript
const command = shopify.giftCard.$doc(id).disable(input?: unknown);
const command = shopify.giftCard.$all.disable(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].gift-card[id|*].get
```

*TypeScript*
```javascript
const command = shopify.giftCard.$doc(id).get(input?: unknown);
const command = shopify.giftCard.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].gift-card.list
```

*TypeScript*
```javascript
const command = shopify.giftCard.list(input?: unknown);
```


### update

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

### create

*CLI*
```sh
$ sdm shopify[my-shop-name].gift-card[id|*].gift-card-adjustment.create
```

*TypeScript*
```javascript
const command = shopify.giftCard.$doc(id).giftCardAdjustment.create(input?: unknown);
const command = shopify.giftCard.$all.giftCardAdjustment.create(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].gift-card[id|*].gift-card-adjustment[id|*].get
```

*TypeScript*
```javascript
const command = shopify.giftCard.$doc(id).giftCardAdjustment.$doc(id).get(input?: unknown);
const command = shopify.giftCard.$all.giftCardAdjustment.$all.get(input?: unknown);
```


### list

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

### get

*CLI*
```sh
$ sdm shopify[my-shop-name].inventory-item[id|*].get
```

*TypeScript*
```javascript
const command = shopify.inventoryItem.$doc(id).get(input?: unknown);
const command = shopify.inventoryItem.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].inventory-item.list
```

*TypeScript*
```javascript
const command = shopify.inventoryItem.list(input?: unknown);
```


### update

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

### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].inventory-level[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.inventoryLevel.$doc(id).delete(input?: unknown);
const command = shopify.inventoryLevel.$all.delete(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].inventory-level.list
```

*TypeScript*
```javascript
const command = shopify.inventoryLevel.list(input?: unknown);
```


## location

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].location.count
```

*TypeScript*
```javascript
const command = shopify.location.count(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].location[id|*].get
```

*TypeScript*
```javascript
const command = shopify.location.$doc(id).get(input?: unknown);
const command = shopify.location.$all.get(input?: unknown);
```


### inventoryLevels

*CLI*
```sh
$ sdm shopify[my-shop-name].location[id|*].inventory-levels
```

*TypeScript*
```javascript
const command = shopify.location.$doc(id).inventoryLevels(input?: unknown);
const command = shopify.location.$all.inventoryLevels(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].location.list
```

*TypeScript*
```javascript
const command = shopify.location.list(input?: unknown);
```


## metafield

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].metafield.count
```

*TypeScript*
```javascript
const command = shopify.metafield.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].metafield.create
```

*TypeScript*
```javascript
const command = shopify.metafield.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].metafield[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.metafield.$doc(id).delete(input?: unknown);
const command = shopify.metafield.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].metafield[id|*].get
```

*TypeScript*
```javascript
const command = shopify.metafield.$doc(id).get(input?: unknown);
const command = shopify.metafield.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].metafield.list
```

*TypeScript*
```javascript
const command = shopify.metafield.list(input?: unknown);
```


### update

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

### cancel

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].cancel
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).cancel(input?: unknown);
const command = shopify.order.$all.cancel(input?: unknown);
```


### close

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].close
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).close(input?: unknown);
const command = shopify.order.$all.close(input?: unknown);
```


### count

*CLI*
```sh
$ sdm shopify[my-shop-name].order.count
```

*TypeScript*
```javascript
const command = shopify.order.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].order.create
```

*TypeScript*
```javascript
const command = shopify.order.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).delete(input?: unknown);
const command = shopify.order.$all.delete(input?: unknown);
```


### fulfillmentOrders

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment-orders
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillmentOrders(input?: unknown);
const command = shopify.order.$all.fulfillmentOrders(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].get
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).get(input?: unknown);
const command = shopify.order.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].order.list
```

*TypeScript*
```javascript
const command = shopify.order.list(input?: unknown);
```


### open

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].open
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).open(input?: unknown);
const command = shopify.order.$all.open(input?: unknown);
```


### update

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

### cancel

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment[id|*].cancel
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).cancel(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.cancel(input?: unknown);
```


### complete

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment[id|*].complete
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).complete(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.complete(input?: unknown);
```


### count

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment.count
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.count(input?: unknown);
const command = shopify.order.$all.fulfillment.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment.create
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.create(input?: unknown);
const command = shopify.order.$all.fulfillment.create(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment[id|*].get
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).get(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment.list
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.list(input?: unknown);
const command = shopify.order.$all.fulfillment.list(input?: unknown);
```


### open

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment[id|*].open
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).open(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.open(input?: unknown);
```


### update

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

### create

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment[id|*].fulfillment-event.create
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).fulfillmentEvent.create(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.fulfillmentEvent.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment[id|*].fulfillment-event[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).fulfillmentEvent.$doc(id).delete(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.fulfillmentEvent.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment[id|*].fulfillment-event[id|*].get
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).fulfillmentEvent.$doc(id).get(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.fulfillmentEvent.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].fulfillment[id|*].fulfillment-event.list
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).fulfillment.$doc(id).fulfillmentEvent.list(input?: unknown);
const command = shopify.order.$all.fulfillment.$all.fulfillmentEvent.list(input?: unknown);
```


### update

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

### create

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].order-risk.create
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).orderRisk.create(input?: unknown);
const command = shopify.order.$all.orderRisk.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].order-risk[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).orderRisk.$doc(id).delete(input?: unknown);
const command = shopify.order.$all.orderRisk.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].order-risk[id|*].get
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).orderRisk.$doc(id).get(input?: unknown);
const command = shopify.order.$all.orderRisk.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].order-risk.list
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).orderRisk.list(input?: unknown);
const command = shopify.order.$all.orderRisk.list(input?: unknown);
```


### update

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

### calculate

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].refund.calculate
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).refund.calculate(input?: unknown);
const command = shopify.order.$all.refund.calculate(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].refund.create
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).refund.create(input?: unknown);
const command = shopify.order.$all.refund.create(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].refund[id|*].get
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).refund.$doc(id).get(input?: unknown);
const command = shopify.order.$all.refund.$all.get(input?: unknown);
```


### list

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

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].transaction.count
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).transaction.count(input?: unknown);
const command = shopify.order.$all.transaction.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].transaction.create
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).transaction.create(input?: unknown);
const command = shopify.order.$all.transaction.create(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].order[id|*].transaction[id|*].get
```

*TypeScript*
```javascript
const command = shopify.order.$doc(id).transaction.$doc(id).get(input?: unknown);
const command = shopify.order.$all.transaction.$all.get(input?: unknown);
```


### list

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

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].page.count
```

*TypeScript*
```javascript
const command = shopify.page.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].page.create
```

*TypeScript*
```javascript
const command = shopify.page.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].page[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.page.$doc(id).delete(input?: unknown);
const command = shopify.page.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].page[id|*].get
```

*TypeScript*
```javascript
const command = shopify.page.$doc(id).get(input?: unknown);
const command = shopify.page.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].page.list
```

*TypeScript*
```javascript
const command = shopify.page.list(input?: unknown);
```


### update

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

### get

*CLI*
```sh
$ sdm shopify[my-shop-name].payout[id|*].get
```

*TypeScript*
```javascript
const command = shopify.payout.$doc(id).get(input?: unknown);
const command = shopify.payout.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].payout.list
```

*TypeScript*
```javascript
const command = shopify.payout.list(input?: unknown);
```


## policy

### list

*CLI*
```sh
$ sdm shopify[my-shop-name].policy.list
```

*TypeScript*
```javascript
const command = shopify.policy.list(input?: unknown);
```


## price-rule

### create

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule.create
```

*TypeScript*
```javascript
const command = shopify.priceRule.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).delete(input?: unknown);
const command = shopify.priceRule.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule[id|*].get
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).get(input?: unknown);
const command = shopify.priceRule.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule.list
```

*TypeScript*
```javascript
const command = shopify.priceRule.list(input?: unknown);
```


### update

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

### create

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule[id|*].discount-code.create
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).discountCode.create(input?: unknown);
const command = shopify.priceRule.$all.discountCode.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule[id|*].discount-code[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).discountCode.$doc(id).delete(input?: unknown);
const command = shopify.priceRule.$all.discountCode.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule[id|*].discount-code[id|*].get
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).discountCode.$doc(id).get(input?: unknown);
const command = shopify.priceRule.$all.discountCode.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule[id|*].discount-code.list
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).discountCode.list(input?: unknown);
const command = shopify.priceRule.$all.discountCode.list(input?: unknown);
```


### lookup

*CLI*
```sh
$ sdm shopify[my-shop-name].price-rule[id|*].discount-code.lookup
```

*TypeScript*
```javascript
const command = shopify.priceRule.$doc(id).discountCode.lookup(input?: unknown);
const command = shopify.priceRule.$all.discountCode.lookup(input?: unknown);
```


### update

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

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].product-listing.count
```

*TypeScript*
```javascript
const command = shopify.productListing.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].product-listing.create
```

*TypeScript*
```javascript
const command = shopify.productListing.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].product-listing[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.productListing.$doc(id).delete(input?: unknown);
const command = shopify.productListing.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].product-listing[id|*].get
```

*TypeScript*
```javascript
const command = shopify.productListing.$doc(id).get(input?: unknown);
const command = shopify.productListing.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].product-listing.list
```

*TypeScript*
```javascript
const command = shopify.productListing.list(input?: unknown);
```


## product

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].product.count
```

*TypeScript*
```javascript
const command = shopify.product.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].product.create
```

*TypeScript*
```javascript
const command = shopify.product.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).delete(input?: unknown);
const command = shopify.product.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].get
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).get(input?: unknown);
const command = shopify.product.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].product.list
```

*TypeScript*
```javascript
const command = shopify.product.list(input?: unknown);
```


### update

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

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-image.count
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productImage.count(input?: unknown);
const command = shopify.product.$all.productImage.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-image.create
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productImage.create(input?: unknown);
const command = shopify.product.$all.productImage.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-image[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productImage.$doc(id).delete(input?: unknown);
const command = shopify.product.$all.productImage.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-image[id|*].get
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productImage.$doc(id).get(input?: unknown);
const command = shopify.product.$all.productImage.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-image.list
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productImage.list(input?: unknown);
const command = shopify.product.$all.productImage.list(input?: unknown);
```


### update

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

### create

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-resource-feedback.create
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productResourceFeedback.create(input?: unknown);
const command = shopify.product.$all.productResourceFeedback.create(input?: unknown);
```


### list

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

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-variant.count
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productVariant.count(input?: unknown);
const command = shopify.product.$all.productVariant.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-variant.create
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productVariant.create(input?: unknown);
const command = shopify.product.$all.productVariant.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-variant[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productVariant.$doc(id).delete(input?: unknown);
const command = shopify.product.$all.productVariant.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-variant[id|*].get
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productVariant.$doc(id).get(input?: unknown);
const command = shopify.product.$all.productVariant.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].product[id|*].product-variant.list
```

*TypeScript*
```javascript
const command = shopify.product.$doc(id).productVariant.list(input?: unknown);
const command = shopify.product.$all.productVariant.list(input?: unknown);
```


### update

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

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].redirect.count
```

*TypeScript*
```javascript
const command = shopify.redirect.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].redirect.create
```

*TypeScript*
```javascript
const command = shopify.redirect.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].redirect[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.redirect.$doc(id).delete(input?: unknown);
const command = shopify.redirect.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].redirect[id|*].get
```

*TypeScript*
```javascript
const command = shopify.redirect.$doc(id).get(input?: unknown);
const command = shopify.redirect.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].redirect.list
```

*TypeScript*
```javascript
const command = shopify.redirect.list(input?: unknown);
```


### update

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

### create

*CLI*
```sh
$ sdm shopify[my-shop-name].report.create
```

*TypeScript*
```javascript
const command = shopify.report.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].report[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.report.$doc(id).delete(input?: unknown);
const command = shopify.report.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].report[id|*].get
```

*TypeScript*
```javascript
const command = shopify.report.$doc(id).get(input?: unknown);
const command = shopify.report.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].report.list
```

*TypeScript*
```javascript
const command = shopify.report.list(input?: unknown);
```


### update

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

### create

*CLI*
```sh
$ sdm shopify[my-shop-name].resource-feedback.create
```

*TypeScript*
```javascript
const command = shopify.resourceFeedback.create(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].resource-feedback.list
```

*TypeScript*
```javascript
const command = shopify.resourceFeedback.list(input?: unknown);
```


## script-tag

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].script-tag.count
```

*TypeScript*
```javascript
const command = shopify.scriptTag.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].script-tag.create
```

*TypeScript*
```javascript
const command = shopify.scriptTag.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].script-tag[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.scriptTag.$doc(id).delete(input?: unknown);
const command = shopify.scriptTag.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].script-tag[id|*].get
```

*TypeScript*
```javascript
const command = shopify.scriptTag.$doc(id).get(input?: unknown);
const command = shopify.scriptTag.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].script-tag.list
```

*TypeScript*
```javascript
const command = shopify.scriptTag.list(input?: unknown);
```


### update

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

### list

*CLI*
```sh
$ sdm shopify[my-shop-name].shipping-zone.list
```

*TypeScript*
```javascript
const command = shopify.shippingZone.list(input?: unknown);
```


## shop

### get

*CLI*
```sh
$ sdm shopify[my-shop-name].shop.get
```

*TypeScript*
```javascript
const command = shopify.shop.get(input?: unknown);
```


## smart-collection

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].smart-collection.count
```

*TypeScript*
```javascript
const command = shopify.smartCollection.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].smart-collection.create
```

*TypeScript*
```javascript
const command = shopify.smartCollection.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].smart-collection[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.smartCollection.$doc(id).delete(input?: unknown);
const command = shopify.smartCollection.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].smart-collection[id|*].get
```

*TypeScript*
```javascript
const command = shopify.smartCollection.$doc(id).get(input?: unknown);
const command = shopify.smartCollection.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].smart-collection.list
```

*TypeScript*
```javascript
const command = shopify.smartCollection.list(input?: unknown);
```


### update

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

### create

*CLI*
```sh
$ sdm shopify[my-shop-name].storefront-access-token.create
```

*TypeScript*
```javascript
const command = shopify.storefrontAccessToken.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].storefront-access-token[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.storefrontAccessToken.$doc(id).delete(input?: unknown);
const command = shopify.storefrontAccessToken.$all.delete(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].storefront-access-token.list
```

*TypeScript*
```javascript
const command = shopify.storefrontAccessToken.list(input?: unknown);
```


## tender-transaction

### list

*CLI*
```sh
$ sdm shopify[my-shop-name].tender-transaction.list
```

*TypeScript*
```javascript
const command = shopify.tenderTransaction.list(input?: unknown);
```


## theme

### create

*CLI*
```sh
$ sdm shopify[my-shop-name].theme.create
```

*TypeScript*
```javascript
const command = shopify.theme.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].theme[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).delete(input?: unknown);
const command = shopify.theme.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].theme[id|*].get
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).get(input?: unknown);
const command = shopify.theme.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].theme.list
```

*TypeScript*
```javascript
const command = shopify.theme.list(input?: unknown);
```


### update

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

### create

*CLI*
```sh
$ sdm shopify[my-shop-name].theme[id|*].asset.create
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).asset.create(input?: unknown);
const command = shopify.theme.$all.asset.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].theme[id|*].asset[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).asset.$doc(id).delete(input?: unknown);
const command = shopify.theme.$all.asset.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].theme[id|*].asset[id|*].get
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).asset.$doc(id).get(input?: unknown);
const command = shopify.theme.$all.asset.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].theme[id|*].asset.list
```

*TypeScript*
```javascript
const command = shopify.theme.$doc(id).asset.list(input?: unknown);
const command = shopify.theme.$all.asset.list(input?: unknown);
```


### update

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

### current

*CLI*
```sh
$ sdm shopify[my-shop-name].user.current
```

*TypeScript*
```javascript
const command = shopify.user.current(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].user[id|*].get
```

*TypeScript*
```javascript
const command = shopify.user.$doc(id).get(input?: unknown);
const command = shopify.user.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].user.list
```

*TypeScript*
```javascript
const command = shopify.user.list(input?: unknown);
```


## webhook

### count

*CLI*
```sh
$ sdm shopify[my-shop-name].webhook.count
```

*TypeScript*
```javascript
const command = shopify.webhook.count(input?: unknown);
```


### create

*CLI*
```sh
$ sdm shopify[my-shop-name].webhook.create
```

*TypeScript*
```javascript
const command = shopify.webhook.create(input?: unknown);
```


### delete

*CLI*
```sh
$ sdm shopify[my-shop-name].webhook[id|*].delete
```

*TypeScript*
```javascript
const command = shopify.webhook.$doc(id).delete(input?: unknown);
const command = shopify.webhook.$all.delete(input?: unknown);
```


### get

*CLI*
```sh
$ sdm shopify[my-shop-name].webhook[id|*].get
```

*TypeScript*
```javascript
const command = shopify.webhook.$doc(id).get(input?: unknown);
const command = shopify.webhook.$all.get(input?: unknown);
```


### list

*CLI*
```sh
$ sdm shopify[my-shop-name].webhook.list
```

*TypeScript*
```javascript
const command = shopify.webhook.list(input?: unknown);
```


### update

*CLI*
```sh
$ sdm shopify[my-shop-name].webhook[id|*].update
```

*TypeScript*
```javascript
const command = shopify.webhook.$doc(id).update(input?: unknown);
const command = shopify.webhook.$all.update(input?: unknown);
```


