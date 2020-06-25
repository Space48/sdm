import * as bigCommerce from './big-commerce';
import * as magento1 from './magento1';
import * as magento2 from './magento2';
import * as shopify from './shopify';
import commander  from 'commander';
import { Config } from './config';
import Conf from 'conf';
import { hyphenate } from './util';
import { Action } from './action';
import { actionCommand } from './command';

const program = new commander.Command();

const globalConfig = new Config<ConfigSchema>(new Conf());

type ActionTree = Action[] | {[namespace: string]: ActionTree};

const flatten = <T>(result: T[], el: T[]) => [...result, ...el];
const getCommands = (namespace: string, tree: ActionTree): commander.Command[] => {
    const commands = 
        Array.isArray(tree) ? tree.map(action => actionCommand(action))
        : Object.entries(tree).map(args => getCommands(...args)).reduce(flatten, []);
    commands.forEach(command => command.name(namespace === '_' ? command.name() : `${hyphenate(namespace)}:${command.name()}`));
    return commands;
};

const commands = [
    ...getCommands('bc', bigCommerce.getActions(globalConfig.select('bigCommerce'))),
    ...getCommands('m1', magento1.getActions(globalConfig.select('magento1'))),
    ...getCommands('m2', magento2.getActions(globalConfig.select('magento2'))),
    ...getCommands('shopify', shopify.getActions(globalConfig.select('shopify'))),
];

commands.sort((command1, command2) => command1.name().localeCompare(command2.name()));
commands.forEach(program.addCommand.bind(program));

program.parseAsync(process.argv);

export type ConfigSchema = {
    bigCommerce: bigCommerce.ConfigSchema,
    magento1: magento1.ConfigSchema,
    magento2: magento2.ConfigSchema,
    shopify: shopify.ConfigSchema,
};
