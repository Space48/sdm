import BundleB2b, { Config, configSchema } from "./client";
import { connector, resourceMerger } from "../../framework";
import { endpoint } from "./functions";

// do not remove the following imports -- they are intended to tidy up the generated declaration files
import * as f from "../../framework";

export type BundleB2bConfig = Config;

const mergeResources = resourceMerger<BundleB2b>();

export const bundleB2b = connector({
  configSchema,

  scopeNameExample: "some-store-alias",

  getScopeName: config => config.storeAlias,

  getScope: config => new BundleB2b(config),

  getWarningMessage: async (client: BundleB2b) => Promise.resolve(),

  resources: {
    companies: endpoint.crud("v3/io/companies"),
    users: endpoint.crud("v3/io/users"),
    addresses: endpoint.crud("v3/io/addresses"),
  },
});
