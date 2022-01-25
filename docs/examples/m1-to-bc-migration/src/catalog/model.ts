import { ITEM_KEY, join } from "file-join";
import { map, pipe } from "@space48/json-pipe";
import { bigCommerce } from "@space48/sdm";

type MagentoProductData = {
  product: MagentoProduct
  children: MagentoProduct[]
};

type MagentoProduct = {
  sku: string
};

type BigCommerceProduct = {
  id?: number
  sku: string
  name: string
  type: 'physical' | 'digital'
  weight: number
  price: number
  availability: 'available' | 'disabled' | 'preorder'
};

const joinProductSets = join({
  sku: ITEM_KEY,
  magento2: (product: MagentoProduct) => product.sku,
  bigCommerce: (product: BigCommerceProduct) => product.sku,
});

type ProductData = {
  sku: string
  magento?: MagentoProductData
  bigCommerce?: BigCommerceProduct
};

export function computeProductCommands(productData: ProductData) {
  if (!productData.magento) {
    return [
      bigCommerce.products.$doc(productData.bigCommerce!.id!).update({
        availability: 'disabled',
      }),
    ];
  }

  const bigCommerceProductData: BigCommerceProduct = {
    id: productData.bigCommerce?.id,
    sku: productData.sku
  };
}
