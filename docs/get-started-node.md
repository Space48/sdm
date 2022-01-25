# Get started with the SDM Node.js interface

## Bootstrap a Node.js project

From your shell terminal, run
```sh
mkdir ~/sdm-tutorial
cd ~/sdm-tutorial
nvm use 14
npm i csv-parser @space48/json-pipe @space48/sdm@^0.10.0
npm i --save-dev typescript @tsconfig/node14 @types/node@^14 ts-node
echo '{"extends": "@tsconfig/node12/tsconfig.json", "include": ["src"]}' > tsconfig.json
mkdir src
```

## Grant SDM access to the playground Shopify shop

From your shell terminal, run
```sh
npx sdm 'config.connectors[shopify].scopes.save' '{shopName: "sdm-playground", credentials: {apiKey: "eff43ff5164e26308b48bf2219e225de", password: "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"}}'
npx sdm 'config.connectors[shopify].scopes.list'
```

SDM will reply
```sh
"sdm-playground"
```

## Dump all Shopify product data

Save the following to `~/sdm-tutorial/src/print-products.ts`

```ts
import { sdm, shopify } from "@space48/sdm";

async function main() {
  const playgroundShop = await sdm().requireScope({
    connector: 'shopify',
    scope: 'sdm-playground'
  });

  const products = playgroundShop.execute(shopify.product.list());

  for await (const product of products) {
    console.log(product);
  }
}

main();
```

From your shell terminal, run
```sh
cd ~/sdm-tutorial
npx ts-node src/print-products.ts
```

Node will print all of the product data to the terminal.

## Add some products to Shopify

Save the following to `~/sdm-tutorial/products.csv`
```csv
sku,name,price
DVD10898,The Crown - Season 03 [DVD] [2020],24.99
DVD08150,The Greatest Showman [DVD] [2017],4.99
DVD12183,Harry Potter: The Complete 8-film Collection,34.99
DVD11719,The Crown - Season 1 & 2 [DVD] [2018],18.00
```

Save the following to `~/sdm-tutorial/src/common.ts`

```ts
export const sdmTutorialProductTag = 'sdm-tutorial';
```

Save the following to `~/sdm-tutorial/src/import-products.ts`
```ts
import csvParser from "csv-parser";
import { map, pipe, writeJsonLinesTo } from "@space48/json-pipe";
import { shopify } from "@space48/sdm";
import { createReadStream } from "fs";
import { dirname } from "path"
import { sdmTutorialProductTag } from "./common";

type ProductRecord = {
  sku: string
  name: string
  price: string
};

async function main() {
  await pipe(
    createReadStream(`${dirname(__dirname)}/products.csv`),

    // convert binary CSV to ProductRecords
    productsCsv => productsCsv.pipe(csvParser()),        

    // convert ProductRecords to shopify.product.create commands
    map((productRecord: ProductRecord) => 
      shopify.product.create({
        title: productRecord.name,
        tags: [sdmTutorialProductTag],
        variants: [
          {
            title: productRecord.name,
            sku: productRecord.sku,
            price: productRecord.price,
          },
        ],
      })
    ),

    // write to stdout
    writeJsonLinesTo(process.stdout),
  );
}

main();
```

From your shell terminal, run
```sh
cd ~/sdm-tutorial
npx ts-node src/import-products.ts
```

Node will output something like
```
{"path":["product","create"],"input":{"title":"The Crown - Season 03 [DVD] [2020]","variants":[{"title":"The Crown - Season 03 [DVD] [2020]","sku":"DVD10898","price":"24.99"}]}}
{"path":["product","create"],"input":{"title":"The Greatest Showman [DVD] [2017]","variants":[{"title":"The Greatest Showman [DVD] [2017]","sku":"DVD08150","price":"4.99"}]}}
{"path":["product","create"],"input":{"title":"Harry Potter: The Complete 8-film Collection","variants":[{"title":"Harry Potter: The Complete 8-film Collection","sku":"DVD12183","price":"34.99"}]}}
{"path":["product","create"],"input":{"title":"The Crown - Season 1 & 2 [DVD] [2018]","variants":[{"title":"The Crown - Season 1 & 2 [DVD] [2018]","sku":"DVD11719","price":"18.00"}]}}
```

The output above shows the commands we will send to the playground Shopify shop, but we haven't sent them yet.

Update `~/sdm-tutorial/products.csv` as follows:

```ts
import csvParser from "csv-parser";
import { map, pipe, writeJsonLinesTo } from "@space48/json-pipe";
import { shopify, sdm } from "@space48/sdm";
import { createReadStream } from "fs";
import { dirname } from "path"
import { sdmTutorialProductTag } from "./common";

type ProductRecord = {
  sku: string
  name: string
  price: string
};

async function main() {
  const playgroundShop = await sdm().requireScope({
    connector: 'shopify',
    scope: 'sdm-playground',
  });

  await pipe(
    createReadStream(`${dirname(__dirname)}/products.csv`),

    // convert binary CSV to ProductRecords
    productsCsv => productsCsv.pipe(csvParser()),        

    // convert ProductRecords to shopify.product.create commands
    map((productRecord: ProductRecord) => 
      shopify.product.create({
        title: productRecord.name,
        tags: [sdmTutorialProductTag],
        variants: [
          {
            title: productRecord.name,
            sku: productRecord.sku,
            price: productRecord.price,
          },
        ],
      })
    ),

    // execute the commands on sdm-playground in a streaming manner -- this would work for 10,000s of products
    commands => playgroundShop.execute(commands),

    // get the output from the result, or the error if there is no output
    map(result => result.output ?? result.error),

    // write to stdout
    writeJsonLinesTo(process.stdout),
  );
}

main();
```

From your shell terminal, run
```sh
cd ~/sdm-tutorial
npx ts-node src/import-products.ts
```

Node will output the details of the products which were created in Shopify as well as any errors which occur.

## Clean up the products we created in Shopify

Save the following to `~/sdm-tutorial/src/clean-up-products.ts`

```ts
import { filter, map, pipe, writeJsonLinesTo } from "@space48/json-pipe";
import { sdm, shopify } from "@space48/sdm";
import { sdmTutorialProductTag } from "./common";

async function main() {
  const playgroundShop = await sdm().requireScope({
    connector: 'shopify',
    scope: 'sdm-playground'
  });

  await pipe(
    playgroundShop.execute(
      shopify.product.list()
    ),

    // find the products we created by checking for our tag
    filter(product => product.tags.includes(sdmTutorialProductTag)),

    // create the delete product commands
    map(product => shopify.product.$doc(product.id).delete()),

    // execute the delete product commands on the playground shop
    deleteProductCommands => playgroundShop.execute(deleteProductCommands),

    // write to stdout
    writeJsonLinesTo(process.stdout),
  );
}

main();

```

From your shell terminal, run
```sh
cd ~/sdm-tutorial
npx ts-node src/clean-up-products.ts
```

Node will output something like
```
{"command":{"path":[["product",6204237938874],"delete"]},"output":{},"success":true}
{"command":{"path":[["product",6204237971642],"delete"]},"output":{},"success":true}
{"command":{"path":[["product",6204238037178],"delete"]},"output":{},"success":true}
{"command":{"path":[["product",6204238004410],"delete"]},"output":{},"success":true}
```
