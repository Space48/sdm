import { bigCommerce } from "./big-commerce";
import { magento2 } from "./magento2";
import { shopify } from "./shopify";

export * from "./big-commerce";
export * from "./config-management";
export * from "./magento2";
export * from "./shopify";

export const regularConnectors = {
  bigCommerce,
  magento2,
  shopify,
};
