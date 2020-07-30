Big Commerce
============

Adding a store to sdm
---------------------

1. [Generate API credentials][create-api-account] for the desired Big Commerce store
2. Use those credentials link the store to sdm. 
  NB store alias can be any string to help you identify the store, Store hash can be found in the url of the admin panel

``` sdm-config bc:set --store-alias={S48-test-store} --store-hash={HASH}, --access-token={ACCESS-TOKEN}, --client-id={CLIENT-ID}```


Deleting a store to sdm
---------------------




View all sdm configuration commands
-----------------------------------

```sdm-config```



[create-api-account]: https://support.bigcommerce.com/s/article/Store-API-Accounts#creating
