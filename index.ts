#!/usr/bin/env node

import * as fs from "fs"
import * as path from "path"

const configFile = "maestro-ts.config.js"
const tempFolder = path.join(__dirname, "../temp")

const main = () => {
  console.log("Checking for config file")
  try {
    const configPath = path.join(process.cwd(), configFile)
    const config = require(configPath) as {
      appId: string
      deepLinkBase: string
    }
    process.env["appId"] = config.appId
    process.env["deepLinkBase"] = config.deepLinkBase
    console.log("found config file")
  } catch (e) {
    console.log(e)
    console.log("No config file found")
  }
  console.log("Scanning for *.maestro.ts files")

  const flows = [] as string[]

  fs.readdirSync(".").forEach((file) => {
    if (file.includes(".maestro.")) return flows.push(file)
  })

  console.log(`Found flows: ${flows.length}`)

  const tempFiles: string[] = []

  flows.forEach((fl) => {
    console.log(`Parsing: ${fl}`)
    const input = fs.readFileSync(fl, "utf-8")

    const withStart = input.replace(
      'import * as M from "maestro-ts"',
      '\nconst fs = require("fs")\n' +
        'const { MaestroTranslators: M } = require("../build/commands/index")\n' +
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
  })

  // fs.rmSync(tempFolder, { recursive: true, force: true })
}

main()
