"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.regularConnectors = void 0;
const big_commerce_1 = require("./big-commerce");
const magento1_1 = require("./magento1");
const magento2_1 = require("./magento2");
const shopify_1 = require("./shopify");
const bundle_b2b_1 = require("./bundle-b2b");
__exportStar(require("./big-commerce"), exports);
__exportStar(require("./config-management"), exports);
__exportStar(require("./magento1"), exports);
__exportStar(require("./magento2"), exports);
__exportStar(require("./shopify"), exports);
__exportStar(require("./bundle-b2b"), exports);
exports.regularConnectors = {
    bigCommerce: big_commerce_1.bigCommerce,
    magento1: magento1_1.magento1,
    magento2: magento2_1.magento2,
    shopify: shopify_1.shopify,
    bundleB2b: bundle_b2b_1.bundleB2b,
};
