import BundleB2b, { Config } from './client';
import * as f from '../../framework';
export declare type BundleB2bConfig = Config;
export declare const bundleB2b: f.Connector<{
    storeAlias: string;
    storeHash: string;
    credentials: {
        email: string;
        password: string;
    };
} & {
    token?: {
        value: string;
        expiration: number;
    } | undefined;
}, BundleB2b, {
    companies: {
        endpoints: {
            create: f.EndpointDefinition<BundleB2b, object, object>;
            list: f.EndpointDefinition<BundleB2b, import("./functions").Query | undefined, object>;
        };
        documents: {
            idField: string;
            listIds: (client: BundleB2b) => (path: f.Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: f.EndpointDefinition<BundleB2b, any, void>;
                get: f.EndpointDefinition<BundleB2b, import("./functions").Query | undefined, object>;
                update: f.EndpointDefinition<BundleB2b, object, object>;
            };
        };
    };
    users: {
        endpoints: {
            create: f.EndpointDefinition<BundleB2b, object, object>;
            list: f.EndpointDefinition<BundleB2b, import("./functions").Query | undefined, object>;
        };
        documents: {
            idField: string;
            listIds: (client: BundleB2b) => (path: f.Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: f.EndpointDefinition<BundleB2b, any, void>;
                get: f.EndpointDefinition<BundleB2b, import("./functions").Query | undefined, object>;
                update: f.EndpointDefinition<BundleB2b, object, object>;
            };
        };
    };
    addresses: {
        endpoints: {
            create: f.EndpointDefinition<BundleB2b, object, object>;
            list: f.EndpointDefinition<BundleB2b, import("./functions").Query | undefined, object>;
        };
        documents: {
            idField: string;
            listIds: (client: BundleB2b) => (path: f.Path) => AsyncIterable<string | number>;
            endpoints: {
                delete: f.EndpointDefinition<BundleB2b, any, void>;
                get: f.EndpointDefinition<BundleB2b, import("./functions").Query | undefined, object>;
                update: f.EndpointDefinition<BundleB2b, object, object>;
            };
        };
    };
}>;
