import { LRUCache } from 'lru-cache'

import { StrictOptions } from '@/types'

import { domainRegex } from './domain'
import { ipRegex } from './ip'

const urlRegexCache = new LRUCache<boolean, RegExp>({ max: 2 })

function buildUrlRegex(options: StrictOptions): RegExp {
  const domainPart = domainRegex(options).source
  const path = '(?:[/?#][^\\s"]*)?'
  const protocol = '(?:(?:https?)://)'
  const auth = '(?:\\S+(?::\\S*)?@)?'
  const port = '(?::\\d{2,5})?'
  const result = new RegExp(
    `(?:${protocol})${auth}(?:${domainPart}|localhost|${ipRegex.v4().source})${port}${path}`,
    'gi',
  )
  urlRegexCache.set(options.strict ?? true, result)
  return result
}

export function urlRegex(
  options: StrictOptions = {
    strict: true,
  },
): RegExp {
  const strict = options.strict ?? true
  return urlRegexCache.get(strict) ?? buildUrlRegex(options)
}
