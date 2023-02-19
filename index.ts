#!/usr/bin/env node

import * as fs from "fs"

console.log("Scanning for *.maestro.ts files")

const files = {
  flows: [] as string[],
  other: [] as string[],
}

fs.readdirSync(".").forEach((file) => {
  if (file.includes(".maestro.")) return files.flows.push(file)

  return files.other.push(file)
})

console.log(`Found flows: ${files.flows.length}`)
console.log(`Found others: ${files.other.length}`)
