import { ConnectorScope } from "@space48/sdm";

export interface BigCommerceCategory extends BigCommerceCategoryDefinition {
  id: number
  children: readonly BigCommerceCategory[]
}

export interface BigCommerceCategoryDefinition {
  name: string
  is_visible: boolean
  url: string
  children: readonly BigCommerceCategoryDefinition[]
}

export async function updateCategoryTree(store: ConnectorScope, rootCategories: BigCommerceCategoryDefinition[]) {

}

export async function fetchCategoryTree(store: ConnectorScope): Promise<BigCommerceCategory[]> {

}

export interface BigCommerceProductDefinition {
  name: string
  is_visible: boolean
  url: string
  children: readonly BigCommerceCategoryDefinition[]
}

export async function updateProducts(store: ConnectorScope, rootCategories: BigCommerceCategoryDefinition[]) {

}
