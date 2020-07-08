import BigCommerceConnector, * as bigCommerce from './big-commerce';
import * as magento1 from './magento1';
import Magento2Connector, * as magento2 from './magento2';
import ShopifyConnector, * as shopify from './shopify';
import { ConfigStore } from './config-store';
import Conf from 'conf';
import { Connector } from './connector';

const config = new ConfigStore<ConfigSchema>(new Conf());

export const connectors: Record<string, Connector> = {
    bc: new BigCommerceConnector(config.select('bigCommerce')),
    m2: new Magento2Connector(config.select('magento2')),
    shopify: new ShopifyConnector(config.select('shopify')),
};

type ConfigSchema = {
    bigCommerce: bigCommerce.ConfigSchema,
    magento1: magento1.ConfigSchema,
    magento2: magento2.ConfigSchema,
    shopify: shopify.ConfigSchema,
};
