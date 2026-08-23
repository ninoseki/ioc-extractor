import { StrictOptions } from '@/types'

import { domainRegex } from './domain'

const localPartLetters = "a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-"
// RFC 5321 caps the local part at 64 characters
const localPart = `(?<![${localPartLetters}])[${localPartLetters}]{1,64}`

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
