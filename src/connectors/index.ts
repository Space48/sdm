import { bigCommerce } from "./big-commerce";
import { magento2 } from "./magento2";

export * from "./big-commerce";
export * from "./magento2";

export const connectors = {
  bigCommerce: bigCommerce,
  magento2: magento2,
}

export type Connectors = typeof connectors;
