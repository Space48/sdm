import Conf from "conf";
import { bigCommerce, configManagement, magento2, shopify } from "./connectors";
import { LocalConfigRepository } from "./framework";
import { Application } from "./framework/application";

export * from "./connectors";
export * from "./framework";

export function sdm() {
  const configRepository = new LocalConfigRepository(new Conf);

  const regularConnectors = {
    bigCommerce,
    magento2,
    shopify,
  };

  return new Application(
    configRepository,
    {
      bigCommerce,
      config: configManagement(regularConnectors, configRepository),
      magento2,
      shopify,
    }
  );
}
