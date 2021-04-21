import { getMagentoCategoryUrl, MagentoCategory } from './magento';
import { BigCommerceCategory, BigCommerceCategoryDefinition } from './big-commerce';

export function createCategoryIdMap(
  magentoRootCategories: MagentoCategory[],
  bigCommerceRootCategories: BigCommerceCategory[]
): Map<number, number | undefined> {
  const bigCommerceCategoryIds = new Map(
    bigCommerceRootCategories
      .flatMap(flattenTree)
      .map(category => [category.url, category.id])
  );

  return new Map(
    magentoRootCategories
      .flatMap(flattenTree)
      .map(category => [category.id, getMagentoCategoryUrl(category)] as const)
      .map(([magentoCategoryId, url]) => {
        if (!url) {
          return [magentoCategoryId, undefined];
        }
        const bigCommerceCategoryId = bigCommerceCategoryIds.get(url);
        if (!bigCommerceCategoryId) {
          throw new Error();
        }
        return [magentoCategoryId, bigCommerceCategoryId];
      })
  );
}

export function mapCategoryTree(magentoCategories: MagentoCategory[]) {
  return magentoCategories.map(mapCategory).filter(Boolean) as BigCommerceCategoryDefinition[];
}

function mapCategory(magentoCategory: MagentoCategory): BigCommerceCategoryDefinition|undefined {
  const urlPath = getMagentoCategoryUrl(magentoCategory);

  if (!urlPath) {
    return undefined;
  }

  return {
    name: magentoCategory.name,
    url: urlPath,
    children: mapCategoryTree(magentoCategory.children),
    is_visible: Boolean(magentoCategory.is_active),
  };
}

export interface MapProductsInput {
  categoryIdMap: Map<number, number> // Magento category ID -> BC category ID
  magentoProducts: AsyncIterable<any>
}

export function mapProducts({ categoryIdMap, magentoProducts }: MapProductsInput) {
  
}

function flattenTree<T extends {children: readonly T[]}>(node: T): T[] {
  return [node, ...node.children.flatMap(flattenTree)];
}
