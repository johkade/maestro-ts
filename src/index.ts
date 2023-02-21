#!/usr/bin/env node

import * as fs from "fs"
import * as path from "path"
import * as tools from "./tools"

const configFile = "maestro-ts.config.js"
const tempFolder = path.join(__dirname, "../temp")

const main = () => {
  tools.dim("Checking for config file...")
  try {
    const configPath = path.join(process.cwd(), configFile)
    const config = require(configPath) as {
      appId: string
      deepLinkBase: string
    }
    process.env["appId"] = config.appId
    process.env["deepLinkBase"] = config.deepLinkBase ?? config.appId + "://"
    tools.dim("Found config file")
  } catch (e) {
    tools.dim("No config file found")
  }
  tools.dim("Scanning for *.maestro.ts files")

  const flows = [] as string[]

  fs.readdirSync(".").forEach((file) => {
    if (file.includes(".maestro.")) return flows.push(file)
  })

  tools.dim(`Found flows: ${flows.length}`)

  const tempFiles: string[] = []

  flows.forEach((fl) => {
    tools.dim(`Parsing: ${fl}`)
    const input = fs.readFileSync(fl, "utf-8")

    const withStart = input.replace(
      'import * as M from "maestro-ts"',
      "let MExt = {}\n" +
        "try {\n" +
        "  MExt = require('./maestro-commands-ext.ts')\n" +
        "} catch (e){\n" +
        "  console.log('did not find extension')\n" +
        "}\n" +
        '\nconst fs = require("fs")\n' +
        'const { MaestroTranslators } = require("../build/src/commands")\n' +
        "const M = {...MaestroTranslators, ...MExt}\n" +
        'let out = ""\n'
    )

    const withAdditions = withStart.replace(/\bM\./gi, "out += M.")
    const withOutput =
      withAdditions +
      "\n console.log(out)\n" +
      `fs.writeFileSync("./${fl.replace(".maestro.ts", ".yaml")}", out)`

    const tempFileName = path.join(
      __dirname,
      "../temp",
      fl.replace(".ts", ".build.js")
    )
    tempFiles.push(tempFileName)

    const exists = fs.existsSync(tempFolder)
    if (!exists) {
      fs.mkdirSync(tempFolder)
    }
    fs.writeFileSync(tempFileName, withOutput)

    require(tempFileName)
    tools.green(`Created: ${fl} 🥳`)
  })

  // fs.rmSync(tempFolder, { recursive: true, force: true })
}

main()
