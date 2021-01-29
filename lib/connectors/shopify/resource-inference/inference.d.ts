import Shopify from "shopify-api-node";
export declare type InferredResource = {
    key: keyof Shopify;
    endpoints: readonly string[];
    children: Record<string, InferredResource>;
};
export declare function refreshInferredResources(): void;
