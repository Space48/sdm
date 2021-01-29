import { ConfigRepository, Connector, Path } from "../../framework";
import * as f from '../../framework';
export declare const configManagementConnector: (connectors: Readonly<Record<string, Connector>>, repository: ConfigRepository) => Connector<null, null, {
    blob: {
        endpoints: {
            import: () => ({ input }: f.EndpointPayload<any>) => Promise<void>;
            export: () => () => Promise<any>;
        };
    };
    connectors: {
        endpoints: {
            list: () => () => AsyncGenerator<string, void, undefined>;
        };
        documents: {
            idField: string;
            listIds: () => () => AsyncGenerator<string, void, undefined>;
            resources: {
                scopes: {
                    endpoints: {
                        add: () => ({ path, input: scopeConfig }: f.EndpointPayload<any>) => Promise<void>;
                        save: () => ({ path, input: scopeConfig }: f.EndpointPayload<any>) => Promise<void>;
                        list: () => ({ path }: f.EndpointPayload<any>) => AsyncGenerator<string | null, void, undefined>;
                    };
                    documents: {
                        idField: string;
                        listIds: () => (path: Path) => AsyncGenerator<string, void, undefined>;
                        endpoints: {
                            delete: () => ({ path }: f.EndpointPayload<any>) => Promise<boolean>;
                            get: () => ({ path }: f.EndpointPayload<any>) => Promise<any>;
                            update: () => ({ path, input: configUpdate }: f.EndpointPayload<any>) => Promise<void>;
                        };
                    };
                };
            };
        };
    };
}>;
