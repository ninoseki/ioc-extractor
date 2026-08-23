import { StrictOptions } from '@/types'

import { domainRegex } from './domain'
import { ipRegex } from './ip'

const path = '(?:[/?#][^\\s"]*)?'
const protocol = '(?:(?:https?)://)'
const auth = '(?:(?=[^\\s/?#@])[^\\s/?#:@]*(?::[^\\s/?#]*)?@)?'
const port = '(?::\\d{2,5})?'

function buildUrlRegex(strict: boolean): RegExp {
  const domainPart = domainRegex({ strict }).source
  return new RegExp(
    `(?:${protocol})${auth}(?:${domainPart}|localhost|${ipRegex.v4().source})${port}${path}`,
    'gi',
  )
}

let strictUrlRegex: RegExp | undefined
let nonStrictUrlRegex: RegExp | undefined

export function urlRegex(
  options: StrictOptions = {
    strict: true,
  },
): RegExp {
  return (options.strict ?? true)
    ? (strictUrlRegex ??= buildUrlRegex(true))
    : (nonStrictUrlRegex ??= buildUrlRegex(false))
}
