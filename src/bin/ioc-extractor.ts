#!/usr/bin/env node
import getStdin from 'get-stdin'

import { extractIOC, partialExtractIOC } from '../index'
import { CLIError, helpText, parseCLIArgs } from './args'

;(async (): Promise<void> => {
  let options
  try {
    options = parseCLIArgs(process.argv.slice(2))
  } catch (error) {
    if (error instanceof CLIError) {
      process.stderr.write(`error: ${error.message}\n`)
      process.exit(1)
    }
    throw error
  }

  if (options.help) {
    process.stdout.write(helpText)
    process.exit(0)
  }

  const input = (await getStdin()).trim()

  const ioc = options.only
    ? partialExtractIOC(input, options.only, options)
    : extractIOC(input, options)

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(ioc))
})()
