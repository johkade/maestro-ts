#!/usr/bin/env node

import fs from "fs"
import path from "path"
import * as Tools from "./tools.cjs"
// import { spawnSync } from "child_process"
import type { MaestroConfig } from "maestro-ts"

const configPath = path.join(process.cwd(), "maestro-ts.config.cjs")
const extraCommandsPath = path.join(process.cwd(), "maestro-commands-ext.ts")

// create a temp folder for later
const tempPath = path.join(__dirname, "../temp")
if (!fs.existsSync(tempPath)) fs.mkdirSync(tempPath)

const main = async () => {
  // Find config file and set process environment variables.
  try {
    const config = (await import(configPath)).default as MaestroConfig
    process.env["appId"] = config.appId
    process.env["deepLinkBase"] = config.deepLinkBase ?? `${config.appId}://`
    Tools.cyan(`\nFound ${configPath.split("/").pop()}`)
  } catch (error) {
    console.log(error)
    Tools.dim("\nDid not find a maestro-ts.config.js - using defaults.")
  }

  // Find commands extension file
  try {
    const extraCommands = fs.readFileSync(extraCommandsPath, "utf-8")
    Tools.cyan("Found extra commands in maestro-commands-ext.ts")
  } catch (error) {
    Tools.dim("Did not find extra maestro commands.")
  }

  // Find flows
  const flowPaths: string[] = []

  fs.readdirSync(".").forEach((fileName) => {
    if (fileName.includes(".maestro.")) return flowPaths.push(fileName)
  })

  const flowsCount = flowPaths.length
  if (!flowsCount) {
    Tools.yellow("No flows found - are you in the right directory?")
    return Tools.dim(
      "File names for flows should follow the pattern `my-flow.maestro.ts`"
    )
  }

  Tools.dim(`Found ${flowsCount} flows.`)

  // Adapt flows to actually write yaml files.
  const tempFilePaths: string[] = []

  flowPaths.forEach((fp) => {
    const originalFlow = fs.readFileSync(fp, "utf8")

    const adjustedStart = originalFlow.replace(
      'import * as M from "maestro-ts"',
      `import path from "path"
import fs from "fs"
const cwd = process.cwd()
import { MaestroTranslators } from "../dist/commands.js"
const M = { ...MaestroTranslators }
let out = ""
`
    )
    const withAccumulations = adjustedStart
      .replace(/\bM\./gi, "out += M.")
      .replace(/\bN\./gi, "nestedOut += N.")
      .replace(/\(\) => {\n/gm, `() => {\nlet nestedOut = ""\n`)
      .replace(/\)\n}\)/gm, ")\nreturn nestedOut\n})")
    const withOutput = `
${withAccumulations}
fs.writeFileSync("./${fp.replace(".maestro.ts", ".yaml")}", out)
    `

    const tempFilePath = path.join(tempPath, fp.replace(".ts", ".build.js"))

    tempFilePaths.push(tempFilePath)
    fs.writeFileSync(tempFilePath, withOutput)

    // execute the flow to generate the yaml file.
    try {
      import(tempFilePath)
      Tools.green(`Created ${fp} ✔`)
    } catch (error) {
      Tools.red(error)
    }
  })
}

main()
