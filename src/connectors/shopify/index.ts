import { connector } from "../../framework";

import * as client from "./client";
import { resourceDefinitions } from "./codegen";

export { refreshInferredResources } from "./resource-inference";

export const shopify = connector({
  configSchema: client.configSchema,

  getScope: config => new client.Scope(config),

  getScopeName: config => config.shopName,

  getWarningMessage: async (scope: client.Scope) => {
    try {
      const shop = await scope.client().shop.get();
      if (!shop.password_enabled) {
        return `Shop is LIVE at ${shop.domain}`;
      }
      if (shop.domain !== shop.myshopify_domain) {
        return `Shop is using custom domain ${shop.domain}`
      }
    } catch {
      return 'Failed to fetch shop data from Shopify API. This could be a live shop.';
    }
  },

  resources: resourceDefinitions,
});
