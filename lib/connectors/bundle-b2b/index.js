import BundleB2b, { configSchema } from "./client";
import { connector, resourceMerger } from "../../framework";
import { endpoint } from "./functions";
const mergeResources = resourceMerger();
export const bundleB2b = connector({
    configSchema,
    scopeNameExample: "some-store-alias",
    getScopeName: config => config.storeAlias,
    getScope: config => new BundleB2b(config),
    getWarningMessage: async (client) => Promise.resolve(),
    resources: {
        companies: endpoint.crud("v3/io/companies"),
        users: endpoint.crud("v3/io/users"),
        addresses: endpoint.crud("v3/io/addresses"),
    },
});
