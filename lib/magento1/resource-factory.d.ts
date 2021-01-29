import { Magento1RestClient } from "./rest";
import { ResourceConfig } from "../resource";
export declare class Magento1ResourceFactory {
    private client;
    constructor(client: Magento1RestClient);
    crud(uri: string, children?: string[]): ResourceConfig;
    read(uri: string, children?: string[]): ResourceConfig;
    write(uri: string): ResourceConfig;
    private create;
    private get;
    private list;
    private update;
    private delete;
}
