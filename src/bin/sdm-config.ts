#!/usr/bin/env node

import commander  from 'commander';
import { actionCommand } from '../command';
import { connectors } from '..';
import { hyphenate } from '../util';
import { ActionCollection } from '../connector';

const program = new commander.Command();

const flatten = <T>(result: T[], el: T[]) => [...result, ...el];
const getCommands = (namespace: string, tree: ActionCollection): commander.Command[] => {
  const commands = 
    Array.isArray(tree) ? tree.map(action => actionCommand(action))
    : Object.entries(tree).map(args => getCommands(...args)).reduce(flatten, []);
  commands.forEach(command => command.name(namespace === '_' ? command.name() : `${hyphenate(namespace)}:${command.name()}`));
  return commands;
};

const commands = Object.entries(connectors)
  .map(([name, connector]) => getCommands(name, connector.getConfigActions()))
  .reduce(flatten, []);

commands.sort((command1, command2) => command1.name().localeCompare(command2.name()));
commands.forEach(program.addCommand.bind(program));

program.parseAsync(process.argv);
