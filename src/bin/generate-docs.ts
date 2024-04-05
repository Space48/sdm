#!/usr/bin/env node

import { regularConnectors } from "../connectors/index.js";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { Markdown } from "../framework/docgen.js";

const docsDir = path.join(path.dirname(path.dirname(__dirname)), "docs");

function main() {
  const connectorsDocsDir = docsDir;

  let summaryMarkdown = "";

  Object.entries(regularConnectors).forEach(([name, connector]) => {
    const connectorDocsDir = path.join(connectorsDocsDir, hyphenate(name));
    ensureDirExists(connectorDocsDir);

    const cliDocPath = path.join(connectorDocsDir, "reference.md");
    writeFileSync(cliDocPath, Markdown.explainUsage(connector.$definition, name));

    summaryMarkdown = summaryMarkdown.concat(Markdown.explainSummary(connector.$definition, name));
  });
  writeFileSync(path.join(docsDir, "summary.md"), summaryMarkdown);
}

function ensureDirExists(path: string): void {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

const hyphenate = (value: string): string =>
  value.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`).replace(/_/g, "-");

main();
