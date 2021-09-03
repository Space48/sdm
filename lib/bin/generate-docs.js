#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectors_1 = require("../connectors");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const docgen_1 = require("../framework/docgen");
const docsDir = path_1.default.join(path_1.default.dirname(path_1.default.dirname(__dirname)), 'docs');
function main() {
    const connectorsDocsDir = docsDir;
    Object.entries(connectors_1.regularConnectors).forEach(([name, connector]) => {
        const connectorDocsDir = path_1.default.join(connectorsDocsDir, hyphenate(name));
        ensureDirExists(connectorDocsDir);
        const cliDocPath = path_1.default.join(connectorDocsDir, 'reference.md');
        fs_1.writeFileSync(cliDocPath, docgen_1.Markdown.explainUsage(connector.$definition, name));
    });
}
function ensureDirExists(path) {
    if (!fs_1.existsSync(path)) {
        fs_1.mkdirSync(path, { recursive: true });
    }
}
const hyphenate = (value) => (value
    .replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
    .replace(/_/g, '-'));
main();
//# sourceMappingURL=generate-docs.js.map