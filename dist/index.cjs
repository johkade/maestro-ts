#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const Tools = __importStar(require("./tools.cjs"));
const configPath = path_1.default.join(process.cwd(), "maestro-ts.config.cjs");
const distPath = __dirname;
const extraCommandsPath = path_1.default.join(process.cwd(), "maestro-commands-ext.ts");
const extraCommandsDefinitionPath = path_1.default.join(process.cwd(), "maestro-ext.d.ts");
// create a temp folders for later
const tempPath = path_1.default.join(__dirname, "../temp");
if (!fs_1.default.existsSync(tempPath))
    fs_1.default.mkdirSync(tempPath);
const main = async () => {
    // Find config file and set process environment variables.
    try {
        const config = (await import(configPath)).default;
        process.env["appId"] = config.appId;
        process.env["deepLinkBase"] = config.deepLinkBase ?? `${config.appId}://`;
        fs_1.default.copyFileSync(configPath, path_1.default.join(distPath, "maestro-ts.config.cjs"));
        Tools.cyan(`\nFound ${configPath.split("/").pop()}`);
    }
    catch (error) {
        Tools.dim("\nDid not find a maestro-ts.config.js - using defaults.");
    }
    // Find commands extension file
    try {
        const extraCommands = fs_1.default.readFileSync(extraCommandsPath, "utf-8");
        const extraCommandsInDistPath = path_1.default.join(distPath, "maestro-commands-ext.ts");
        fs_1.default.copyFileSync(extraCommandsPath, extraCommandsInDistPath);
        fs_1.default.copyFileSync(extraCommandsDefinitionPath, path_1.default.join(distPath, "maestro-ext.d.ts"));
        (0, child_process_1.spawnSync)(`tsc`, [extraCommandsInDistPath, "--module", "nodenext"]);
        Tools.cyan("Found extra commands in maestro-commands-ext.ts");
    }
    catch (error) {
        Tools.dim("Did not find extra maestro commands.");
    }
    // Find flows
    const flowPaths = [];
    fs_1.default.readdirSync(".").forEach((fileName) => {
        if (fileName.includes(".maestro."))
            return flowPaths.push(fileName);
    });
    const flowsCount = flowPaths.length;
    if (!flowsCount) {
        Tools.yellow("No flows found - are you in the right directory?");
        return Tools.dim("File names for flows should follow the pattern `my-flow.maestro.ts`");
    }
    Tools.dim(`Found ${flowsCount} flows.`);
    // Adapt flows to actually write yaml files.
    const tempFilePaths = [];
    flowPaths.forEach((fp) => {
        const originalFlow = fs_1.default.readFileSync(fp, "utf8");
        const adjustedStart = originalFlow.replace(/import.*["']maestro-ts.*\n/g, `import path from "path"
import fs from "fs"
const cwd = process.cwd()
import { MaestroTranslators } from "../dist/commands.js"
let MaestroExtensions = {
  MaestroTranslators: {}
}
try {
  MaestroExtensions = await import("../dist/maestro-commands-ext.js")
} catch (error) {
  console.log("No extensions found.")
}
const M = { ...MaestroTranslators, ...MaestroExtensions.MaestroTranslators }
const N = { ...MaestroTranslators, ...MaestroExtensions.MaestroTranslators }
let out = ""
`);
        const withAccumulations = adjustedStart
            .replace(/\bM\./gi, "out += M.")
            .replace(/\bN\./gi, "nestedOut += N.")
            .replace(/\(\) => {\n/gm, `() => {\nlet nestedOut = ""\n`)
            .replace(/\)\n}\)/gm, ")\nreturn nestedOut\n})");
        const withOutput = `
${withAccumulations}
fs.writeFileSync("./${fp.replace(".maestro.ts", ".yaml")}", out)
    `;
        const tempFilePath = path_1.default.join(tempPath, fp.replace(".ts", ".build.js"));
        tempFilePaths.push(tempFilePath);
        fs_1.default.writeFileSync(tempFilePath, withOutput);
        // execute the flow to generate the yaml file.
        try {
            import(tempFilePath);
            Tools.green(`Created ${fp} ✔`);
        }
        catch (error) {
            Tools.red(error);
        }
    });
};
main();
//# sourceMappingURL=index.cjs.map