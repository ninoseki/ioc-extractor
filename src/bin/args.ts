import { parseArgs } from 'node:util'

import { type IOCKey, iocKeys, type Options } from '@/types'

export const helpText = `Usage: ioc-extractor [options]

Options:
  --no-strict            Disable strict option
  --no-refang            Disable refang option
  --no-sort              Disable sort option
  -p, --punycode         Enable punycode option
  -o, --only <types...>  Show only specific IoC types
  -h, --help             display help for command
`

export type CLIOptions = Options & Partial<{ only: IOCKey[] }> & { help: boolean }
export class CLIError extends Error {}

function toCLIErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return String(error)
  }

  const code = (error as NodeJS.ErrnoException).code
  if (code === 'ERR_PARSE_ARGS_UNKNOWN_OPTION') {
    return `unknown option '${/'([^']+)'/.exec(error.message)?.[1]}'`
  }
  if (
    code === 'ERR_PARSE_ARGS_INVALID_OPTION_VALUE' &&
    error.message.endsWith('argument missing')
  ) {
    return `option '-o, --only <types...>' argument missing`
  }

  return error.message
}

function parse(args: string[]) {
  try {
    return parseArgs({
      args,
      options: {
        'no-strict': { type: 'boolean' },
        'no-refang': { type: 'boolean' },
        'no-sort': { type: 'boolean' },
        punycode: { type: 'boolean', short: 'p' },
        only: { type: 'string', short: 'o', multiple: true },
        help: { type: 'boolean', short: 'h' },
      },
      // `--only` is variadic in Commander, thus its extra values are parsed as positionals
      allowPositionals: true,
      tokens: true,
    })
  } catch (error) {
    throw new CLIError(toCLIErrorMessage(error))
  }
}

/**
 * Parse CLI arguments
 *
 * @param {string[]} args Arguments without the leading `node` and script path
 * @returns {CLIOptions}
 * @throws {CLIError} If the arguments are invalid
 */
export function parseCLIArgs(args: string[]): CLIOptions {
  const { values, tokens } = parse(args)

  const only: string[] = []
  const excess: string[] = []
  // Whether the previous token is a part of `--only` or not
  let variadic = false

  for (const token of tokens) {
    switch (token.kind) {
      case 'option':
        variadic = token.name === 'only'
        if (variadic && token.value !== undefined) {
          only.push(token.value)
        }
        break
      case 'positional':
        ;(variadic ? only : excess).push(token.value)
        break
      default:
        variadic = false
    }
  }

  if (excess.length > 0) {
    throw new CLIError(
      `too many arguments. Expected 0 arguments but got ${excess.length}: ${excess.join(', ')}.`,
    )
  }

  for (const key of only) {
    if (!(<readonly string[]>iocKeys).includes(key)) {
      throw new CLIError(
        `option '-o, --only <types...>' argument '${key}' is invalid. Allowed choices are ${iocKeys.join(
          ', ',
        )}.`,
      )
    }
  }

  return {
    help: values.help ?? false,
    strict: !values['no-strict'],
    refang: !values['no-refang'],
    sort: !values['no-sort'],
    punycode: values.punycode ?? false,
    only: only.length > 0 ? <IOCKey[]>only : undefined,
  }
}
