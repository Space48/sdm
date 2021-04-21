import { ConnectorScope } from "@space48/sdm";
import * as magento2 from "./magento";
import * as bigCommerce from "./big-commerce";
import { createCategoryIdMap, mapCategoryTree, mapProducts } from "./mapping";

export async function syncCatalog(m2Instance: ConnectorScope, bcStore: ConnectorScope) {
  const magentoCategoryTree = await magento2.fetchCategoryTree(m2Instance);
  const bigCommerceCategoryTreeDefn = mapCategoryTree(magentoCategoryTree);
  await bigCommerce.updateCategoryTree(bcStore, bigCommerceCategoryTreeDefn);

  const bigCommerceCategoryTree = await bigCommerce.fetchCategoryTree(bcStore);
  const categoryIdMap = createCategoryIdMap(magentoCategoryTree, bigCommerceCategoryTree);
  const magentoProducts = magento2.fetchProducts(m2Instance);
  const bigCommerceProductDefns = mapProducts({ categoryIdMap, magentoProducts });
  await bigCommerce.updateProducts(bcStore, bigCommerceProductDefns);
}
