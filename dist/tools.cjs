"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dim = exports.red = exports.yellow = exports.cyan = exports.green = void 0;
const GREEN = "\x1b[32m%s\x1b[0m";
const CYAN = "\x1b[36m%s\x1b[0m";
const YELLOW = "\x1b[33m%s\x1b[0m";
const RED = "\x1b[31m%s\x1b[0m";
const DIM = "\x1b[2m%s\x1b[0m";
const green = (...data) => console.log(GREEN, ...data, "\n");
exports.green = green;
const cyan = (...data) => console.log(CYAN, ...data, "\n");
exports.cyan = cyan;
const yellow = (...data) => console.log(YELLOW, ...data, "\n");
exports.yellow = yellow;
const red = (...data) => console.log(RED, ...data, "\n");
exports.red = red;
const dim = (...data) => console.log(DIM, ...data, "\n");
exports.dim = dim;
//# sourceMappingURL=tools.cjs.map