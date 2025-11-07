SDM
===

[![NPM Publish](https://github.com/Space48/sdm/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/Space48/sdm/actions/workflows/npm-publish.yml)

## Installation
------------

Check the [pre-requisites for installation](#pre-requisites-for-installation) and then install sdm using npm:
```bash
npm i @space48/sdm
```

Pre-requisites for installation
-------------------------------

### Install sdm

Install sdm from npm:

```bash
npm install @space48/sdm
```

### Enable node 20

sdm uses node 20. Use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to enable node 20:
```bash
nvm use 20
```


# Local Setup

SDM currently has four connectors, these are: Magento 1, Magento 2, Shopify and Big Commerce. To add a new connection to shop on any of these platforms to run locally run 

    npx sdm config

This will start the sdm-config interaction mode, which supports tab-completion. From here you can run `help` to get a full list of commands.

###  Using sdm-config

1. List currently saved scopes

    ```
    connectors[*].scopes.list
    ```
2. Setup a conection to a new store E.g A new Big Commerce store

    ```
    connectors[bigCommerce].scopes.add {"storeAlias":"demo-store","storeHash":"123abc456def","credentials":{"clientId":"longAlphaNumericString123","accessToken":"anotherLongAlphaNumericString456"}}
    ```

    Running the previous command without arguments will return a list of what is missing

    ```
    connectors[shopify].scopes.add
    ```
3. Get the credentials of a previously saved connection

    ```
    connectors[bigCommerce].scopes[demo-store].get
    ```

# Usage

SDM can be used in one of multiple ways, although they all follow the same format of entity.sub-entity.crud-command

##  Interactive mode (for use in terminals)
-----

*Note: supports tab-completion*

Run `npx sdm` to display a list of currently saved scopes. To setup a new scope follow the [local setup](#local-setup)

Enter a scope such as `big-commerce[demo-store]`

From here all SDM endpoints in relation to the connector can be used with their response values being displayed on the terminal such as:

```
categories.tree.list
```
For commands that require an ID these are passed in using square brackets
```
products[123].custom-fields.list
```
Command inputs are done using a single object
```
brands.create {name: "Demo Brand", page_title: "Test Title"}
```

May also use the `help` to get a full list commands


## Makefile
----

Once a [local connection](#local-setup) to a store has been created

Connect to a store create an instance of SDM at the top of the makefile
```
sdm = npx sdm
big-commerce= $(sdm) big-commerce[demo-store]
```
SDM can then be used as such:

```
$(big-commerce).blog.posts.list
```

To input data, whether as part of the path (such as an id), or as the body of the request these need to be "piped" into the SDM instance

```
echo "{id: 1, body: "Updated blog text", "url":"/your-first-blog-post/"}" \
| jq -c '{ path: ["blog", ["posts", .id]], endpoint: "update", input: del(.id) }' \
| $(big-commerce)
```

In a similar fashion input params can be passed into the input property

```
echo "[1,2,3,4,5]" \
| jq -c '.[] | {path: ["customers", "addresses"], endpoint: "delete", input: {"id:in": .}}' \
| $(big-commerce)
```

## In TS mode 
-----
The following example shows how a SDM connection can be created and used directly in a TS script

```
import {ConnectorScope, shopify} from "@space48/sdm";
import {writeJsonLinesTo, pipe} from "@space48/json-pipe";


type ShopApiCredentials = {
    apiKey: string
    password: string
};

async function getConnectorScope(credentials: ShopApiCredentials) {
    return shopify({
        shopName: "shopify-demo-story",
        apiKey: credentials.apiKey,
        password: credentials.password        
    })
}

export async function listProducts() {
    const shop: ConnectorScope = await getConnectorScope(apiCredentials);

    pipe(
        shopify.product.list({fields: 'id,tags,variants', limit: 250}),
        command => shop.execute(command),
        writeJsonLinesTo(process.stdout)
    )
}
```
