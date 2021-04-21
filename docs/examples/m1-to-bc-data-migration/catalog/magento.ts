import { first, map, pipe, collectArray, take, tap, onEnd } from '@space48/json-pipe';
import { ConnectorScope, magento2 } from "@space48/sdm";
import level1CategorySample from "./sample-data/m2-level1-category.json";
import level2CategorySample from "./sample-data/m2-level2-category.json";
import configProductSample from "./sample-data/m2-configurable-product.json";
import virtualProductSample from "./sample-data/m2-virtual-product.json";
import { ITEM_KEY, index } from "file-join";

type SkeletalCategoryTree = { id: number, children_data: SkeletalCategoryTree[] };
type NonRootCategory = typeof level1CategorySample | typeof level2CategorySample;
export type MagentoCategory = Omit<NonRootCategory, 'children'> & {children: MagentoCategory[]};

export async function fetchCategoryTree(magentoInstance: ConnectorScope): Promise<MagentoCategory[]> {
  const t= magento2.categories.tree.get();

  // fetch magento 2 category tree (note that this is only skeletal data)
  const skeletalTree = await pipe(
    magento2.categories.tree.get(),
    command => magentoInstance.execute(command),
    first(),
  ) as any as SkeletalCategoryTree;

  // fetch magento 2 category list (note that this includes custom attributes)
  const categories = await pipe(
    magento2.categories.$all.get([['level', 'gt', 0]]), // fetch detailed category data
    command => magentoInstance.execute(command),
    map(item => item.output as NonRootCategory),
    collectArray(),
  );
  const categoriesById = new Map(categories.map(category => [category.id, category]));
  
  function mapTree(tree: SkeletalCategoryTree): MagentoCategory {
    const category = categoriesById.get(tree.id);
    if (!category) {
      throw new Error();
    }
    return { ...category, children: tree.children_data.map(mapTree) };
  }

  return skeletalTree.children_data.map(mapTree);
}

export function getMagentoCategoryUrl(category: MagentoCategory): string|undefined {
  return category.custom_attributes.find(attr => attr.attribute_code === 'url_path')?.value;
}

type MagentoConfigurableProduct = typeof configProductSample;
type MagentoVirtualProduct = typeof virtualProductSample;
export type MagentoProduct = {
  parent: MagentoConfigurableProduct | MagentoVirtualProduct
  children: MagentoVirtualProduct[]
}

export async function * fetchProducts(magentoInstance: ConnectorScope) {
  const configurableProducts = pipe(
    magento2.products.list([["type_id", "eq", "configurable"]]),
    command => magentoInstance.execute(command),
    take(10),
  );

  const nonConfigurableProducts = pipe(
    magento2.products.list([["type_id", "neq" as any, "configurable"]]),
    command => magentoInstance.execute(command),
    take(10),
  );

  const soapData = pipe(
    magento2.products.$all.info.get(),
    command => magentoInstance.execute(command),
    take(10),
    map(item => item.output),
    onEnd(() => console.error('Downloaded product details (SOAP).')),
  );

  const mediaData = pipe(
    magento2.products.$all.media.get(),
    command => magentoInstance.execute(command),
    take(10),
    map(item => ({
      product_id: String(item.path[0][1]),
      files: item.output,
    })),
    onEnd(() => console.error('Downloaded product media.')),
  );

  const joinResult = await joinProductData({
    rest: restData as AsyncIterable<ProductRestData>,
    soap: soapData,
    media: mediaData,
  });

  try {
    yield * pipe(
      joinResult,
      tap(data => {
        if (!(data.rest[0] && data.soap[0] && data.media[0])) {
          throw new Error(`Missing data for product ${data.product_id}.`);
        }
      }),
      map((data): MagentoProduct => ({
        ...data.rest[0],
        ...data.soap[0],
        media: data.media[0].files,
      })),
    )
  } finally {
    joinResult.cleanUp();
  }
}

const joinProductData = join({
  product_id: ITEM_KEY,
  rest: (product: ProductRestData) => product.entity_id,
  soap: (product: ProductSoapData) => product.product_id,
  media: (media: ProductMedia) => media.product_id,
});

