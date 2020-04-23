import * as bigCommerce from './big-commerce';
import * as magento1 from './magento1';
import * as magento2 from './magento2';
import * as shopify from './shopify';
import * as commander  from 'commander';
import { Config } from './config';
import * as Conf from 'conf';

const program = new commander.Command();

const globalConfig = new Config<ConfigSchema>(new Conf());

type CommandTree = commander.Command[] | {[namespace: string]: CommandTree};

const flatten = <T>(result: T[], el: T[]) => [...result, ...el];
const flattenCommands = (namespace: string, tree: CommandTree): commander.Command[] => {
    const commands = 
        Array.isArray(tree) ? tree
        : Object.entries(tree).map(args => flattenCommands(...args)).reduce(flatten, []);
    commands.forEach(command => command.name(`${namespace}:${command.name()}`));
    return commands;
};

const commands = [
    ...flattenCommands('bc', bigCommerce.getCommands(globalConfig.select('bigCommerce'))),
    ...flattenCommands('m1', magento1.getCommands(globalConfig.select('magento1'))),
    ...flattenCommands('m2', magento2.getCommands(globalConfig.select('magento2'))),
    ...flattenCommands('shopify', shopify.getCommands(globalConfig.select('shopify'))),
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
