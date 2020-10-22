import * as config from './config';
import { ConfigStore } from '../config-store';
import { Magento1ResourceFactory } from './resource-factory';
import { Connector, ConnectorScope } from '../connector';
import { ResourceCollection } from '../resource';
import Magento1 from './client';

export type ConfigSchema = {
    credentials: config.ConfigSchema,
};

export default class Magento1Connector implements Connector {
    constructor(private configStore: ConfigStore<ConfigSchema>) {}

    getConfigActions() {
        return config.getActions(this.configStore.select('credentials'));
    }

    getScopes() {
        const credentialsConfig = this.configStore.select('credentials');
        return config.getBaseUrls(credentialsConfig);
    }

    getScope(baseUrl: string) {
        const credentialsConfig = this.configStore.select('credentials');
        return new Magento1Scope(baseUrl, credentialsConfig);
    }

    getTypicalResources() {
        return {};
    }
}

class Magento1Scope implements ConnectorScope {
    constructor(
        private baseUrl: string,
        private configStore: ConfigStore<ConfigSchema['credentials']>,
    ) {}

    get name() {
        return this.baseUrl;
    }

    async getWarningMessage() {
        return undefined;
    }

    getResources() {
        const client = config.createMagento1Client(this.configStore, this.baseUrl);
        return getResources(client);
    }
}

function getResources(client: Magento1): ResourceCollection {
    const resource = new Magento1ResourceFactory(client);

    return {
        customers: resource.crud('customers', ['addresses']),

        // order endpoints are untested
        orders: resource.read('orders', ['addresses', 'comments', 'items']),

        products: resource.crud('products', ['categories', 'images', 'websites']),
    };
}
