#!/usr/bin/env node
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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const configFile = "maestro-ts.config.js";
const tempFolder = path.join(__dirname, "../temp");
const main = () => {
    var _a;
    console.log("Checking for config file");
    try {
        const configPath = path.join(process.cwd(), configFile);
        const config = require(configPath);
        process.env["appId"] = config.appId;
        process.env["deepLinkBase"] = (_a = config.deepLinkBase) !== null && _a !== void 0 ? _a : config.appId + "://";
        console.log("found config file");
    }
    catch (e) {
        console.log("No config file found");
    }
    console.log("Scanning for *.maestro.ts files");
    const flows = [];
    fs.readdirSync(".").forEach((file) => {
        if (file.includes(".maestro."))
            return flows.push(file);
    });
    console.log(`Found flows: ${flows.length}`);
    const tempFiles = [];
    flows.forEach((fl) => {
        console.log(`Parsing: ${fl}`);
        const input = fs.readFileSync(fl, "utf-8");
        const withStart = input.replace('import * as M from "maestro-ts"', '\nconst fs = require("fs")\n' +
            'const { MaestroTranslators: M } = require("../build/commands/index")\n' +
            'let out = ""\n');
        const withAdditions = withStart.replace(/\bM\./gi, "out += M.");
        const withOutput = withAdditions +
            "\n console.log(out)\n" +
            `fs.writeFileSync("./${fl.replace(".maestro.ts", ".yaml")}", out)`;
        const tempFileName = path.join(__dirname, "../temp", fl.replace(".ts", ".build.js"));
        tempFiles.push(tempFileName);
        const exists = fs.existsSync(tempFolder);
        if (!exists) {
            fs.mkdirSync(tempFolder);
        }
        fs.writeFileSync(tempFileName, withOutput);
        require(tempFileName);
    });
    // fs.rmSync(tempFolder, { recursive: true, force: true })
};
main();
