import { StrictOptions } from '@/types'

import {
  idnPrefix,
  labelLetters,
  nonStrictTld,
  oneOrMoreLabel,
  strictTld,
  zeroOrMoreLabel,
  zeroOrMoreLabelWithHyphen,
} from './regexes'

function buildDomainRegex(strict: boolean): RegExp {
  const tld = strict ? strictTld : nonStrictTld
  const regex =
    `(?=[${labelLetters}.\\-]{1,252}\\.(${tld})\\b)` +
    `((${idnPrefix}${zeroOrMoreLabel}|${oneOrMoreLabel})((?!.{0,63}--)${zeroOrMoreLabelWithHyphen}[${labelLetters}])?\\.)+(${tld})\\b`
  return new RegExp(regex, 'gi')
}

// Built on first use, one instance per strictness. They carry the `g` flag and
// thus a mutable lastIndex, so match them with String#match (which resets it)
// rather than calling test()/exec() on them directly.
let strictDomainRegex: RegExp | undefined
let nonStrictDomainRegex: RegExp | undefined

export function domainRegex(
  options: StrictOptions = {
    strict: true,
  },
): RegExp {
  return (options.strict ?? true)
    ? (strictDomainRegex ??= buildDomainRegex(true))
    : (nonStrictDomainRegex ??= buildDomainRegex(false))
}
