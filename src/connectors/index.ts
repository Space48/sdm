import { Connector } from "../framework";
import { bigCommerce } from "./big-commerce";
import { localConfigConnector } from "./local-config";
import { magento2 } from "./magento2";

export * from "./big-commerce";
export * from "./local-config";
export * from "./magento2";

export const connectors: Record<string, Connector> = {
  bigCommerce,
  config: localConfigConnector,
  magento2,
}

export type Connectors = typeof connectors;
