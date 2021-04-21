import { writeJsonLinesTo } from "@space48/json-pipe";
import { sdm } from "@space48/sdm";
import { pipe } from "fp-ts/lib/pipeable";
import { fetchProducts } from '../magento';

async function main() {
  const baseUrl = process.argv[2];
  const magentoInstance = await sdm().requireScope({ connector: 'magento1', scope: baseUrl });
  await pipe(
    fetchProducts(magentoInstance),
    writeJsonLinesTo(process.stdout),
  );
}

main();
