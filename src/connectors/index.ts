import { bigCommerce } from "./big-commerce";
import { magento1 } from "./magento1";
import { magento2 } from "./magento2";
import { shopify } from "./shopify";
import { bundleB2b } from "./bundle-b2b";

export * from "./big-commerce";
export * from "./config-management";
export * from "./magento1";
export * from "./magento2";
export * from "./shopify";
export * from "./bundle-b2b";

export const regularConnectors = {
  bigCommerce,
  magento1,
  magento2,
  shopify,
  bundleB2b,
};
