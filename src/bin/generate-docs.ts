#!/usr/bin/env node

import { regularConnectors } from "../connectors";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { Markdown } from "../framework/docgen";

const docsDir = path.join(path.dirname(path.dirname(__dirname)), 'docs');

function main() {
  const connectorsDocsDir = path.join(docsDir, 'connectors');

  Object.entries(regularConnectors).forEach(([name, connector]) => {
    const connectorDocsDir = path.join(connectorsDocsDir, hyphenate(name));
    ensureDirExists(connectorDocsDir);

    const cliDocPath = path.join(connectorDocsDir, 'usage.md');
    writeFileSync(cliDocPath, Markdown.explainUsage(connector.$definition, name));
  });
}

function ensureDirExists(path: string): void {
  if (!existsSync(path)) {
    mkdirSync(path, {recursive: true});
  }
}

const hyphenate = (value: string): string => (
  value
    .replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
    .replace(/_/g, '-')
);

main();
