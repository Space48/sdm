Magento 2
=========

Adding an instance to sdm
-------------------------

Using the admin credentials of a Magento 2 store run the following command
 
``` sdm-config m2:set --base-url=https://magento2.test --username=s48admin --password=magneto123 ``` 


**Removing an instance from sdm**
---------------------------------

``` sdm-config m2:delete --base-url=https://magento2.test ```


**List all instances' name and credentials linked to sdm**
----------------------------------------------------------

``` sdm-config m2:list```


**List all instances' name linked to sdm**
-------------------------------------------------------

``` sdm-config m2:list-base-urls```


**Get a linked instances' name and credentials**
------------------------------------------------

``` sdm-config m2:get --base-url=https://magento2.test ```

