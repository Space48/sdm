Big Commerce
============

Adding a store to sdm
---------------------

1. [Generate API credentials][create-bc-api-creds] for the desired Big Commerce store
2. Use those credentials in the following command 
  
  NB. store alias can be any string to help you identify the store, the store hash can be found at the beginning of the admin url

``` sdm-config bc:set --store-alias={S48-test-store} --store-hash={HASH}, --access-token={ACCESS-TOKEN}, --client-id={CLIENT-ID}```


**Removing a store from sdm**
---------------------------------

```sdm-config bc:delete --store-alias={S48-test-store}```


**List all stores names and credentials linked to sdm**
----------------------------------------------------------

```sdm-config bc:list```


**List all store names linked to sdm**
------------------------------------------

```sdm-config bc:list-stores```


**Get a linked store's name and credentials**
------------------------------------------------

```sdm-config bc:get --store-alias={S48-test-store}```


[create-bc-api-creds]: https://support.bigcommerce.com/s/article/Store-API-Accounts#creating
