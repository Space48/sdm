Magento 1 -> Big Commerce data migration
===================================

Migrate a Magento 1 instance to Big Commerce in a matter of hours.

Features
--------

* Configurable products: including options and variants.
* Simple products.
* Categories: including category structure
* Brands and brand images
* Customers: including addresses
* Orders: including some payment information

Usage
-----

### Configuration

1. Check the [pre-requisites](#pre-requisites)
2. Clone this repository
3. [Add the source Magento 1 instance][add-m1-instance] to sdm
4. [Add the destination Big Commerce shop][add-bc-shop] to sdm
5. Add M1 store url and BC store alias to `.env` file

### Execution

1. Extract data from Magento 1
2. Transform data
3. Import data into Big Commerce

Pre-requisites
--------------

### Configure @space48 npm scope

This will allow you to install private Space 48 npm packages such as sdm.

1. [Create a github access token](https://github.com/settings/tokens/new) with `read packages` and `repo` privileges
2. Configure npm
    ```bash
    npm login --registry=https://npm.pkg.github.com --scope=@space48
    ```

### Install jq

#### Mac

```bash
brew install jq
```

### Enable node 10

1. [Install nvm](https://github.com/nvm-sh/nvm#installing-and-updating) if you haven't already
2. Enable node 10
    ```bash
    nvm use 10
    ```

[add-m1-instance]: https://github.com/Space48/sdm/blob/master/src/magento2/README.md#adding-an-instance
[add-bc-shop]: https://github.com/Space48/sdm/blob/master/src/big-commerce/README.md#adding-a-store-to-sdm
