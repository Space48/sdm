Shopify
=======

Adding a shop to sdm
--------------------

1. [Generate API credentials][create-shopify-api-creds] for the desired Shopify shop
2. Use those credentials in the following command 

``` sdm-config shopify:set --shop-name={S48-test-store} --api-key={API-KEY} --password={PASSWORD}```


**Removing a shop from sdm**
---------------------------------

```sdm-config shopify:delete --shop-names={S48-test-store}```


**List all shop names and credentials linked to sdm**
----------------------------------------------------------

```sdm-config shopify:list```


**List all shop names linked to sdm**
------------------------------------------

```sdm-config shopify:list-shops```


**Get a linked shop's name and credentials**
------------------------------------------------

```sdm-config shopify:get --shop-name={S48-test-store}```


[create-shopify-api-creds]: https://shopify.dev/tutorials/generate-api-credentials
