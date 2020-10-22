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


**IMPORTANT**
-------------

If you are migrating order data to a shopify shop then you need to ensure the following:
- That when generating api credentials in the admin and setting read/write privileges 
***DO NOT*** check the Storefront API checkbox. Doing so will trigger order confirmation emails to be sent to **ALL** customers who have previously made an order on the original store. See [Shopify API Create Order docs](https://shopify.dev/docs/admin-api/rest/reference/orders/order?api[version]=2020-07#create-2020-07) for more information. 
- In the store admin notification settings page `https://{store-name}.myshopify.com/admin/settings/notifications` ensure that the Staff Order Notifications are ***disabled***. If not the email address listed will recieve a notification for every order imported that include PII.

[create-shopify-api-creds]: https://shopify.dev/tutorials/generate-api-credentials
