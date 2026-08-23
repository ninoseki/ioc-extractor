import { StrictOptions } from '@/types'

import { domainRegex } from './domain'

const localPart = "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+"

function buildEmailRegex(strict: boolean): RegExp {
  const domainPart = domainRegex({ strict }).source
  return new RegExp(`${localPart}@${domainPart}`, 'gi')
}

let strictEmailRegex: RegExp | undefined
let nonStrictEmailRegex: RegExp | undefined

export function emailRegex(
  options: StrictOptions = {
    strict: true,
  },
): RegExp {
  return (options.strict ?? true)
    ? (strictEmailRegex ??= buildEmailRegex(true))
    : (nonStrictEmailRegex ??= buildEmailRegex(false))
}
