import { LRUCache } from 'lru-cache'

import { StrictOptions } from '@/types'

import { domainRegex } from './domain'

const emailRegexCache = new LRUCache<boolean, RegExp>({ max: 2 })

function buildEmailRegex(options: StrictOptions): RegExp {
  const domainPart = domainRegex(options).source
  const localPart = "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+"
  const result = new RegExp(`${localPart}@${domainPart}`, 'gi')
  emailRegexCache.set(options.strict ?? true, result)
  return result
}

export function emailRegex(
  options: StrictOptions = {
    strict: true,
  },
): RegExp {
  const strict = options.strict ?? true
  return emailRegexCache.get(strict) ?? buildEmailRegex(options)
}
