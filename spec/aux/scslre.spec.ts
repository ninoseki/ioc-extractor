import { analyse } from 'scslre'

import { domainRegex } from '@/aux/domain'
import { emailRegex } from '@/aux/email'
import { ipRegex } from '@/aux/ip'
import * as regexes from '@/aux/regexes'
import { urlRegex } from '@/aux/url'

const staticRegexes = Object.entries(regexes).filter(
  (entry): entry is [string, RegExp] => entry[1] instanceof RegExp,
)

const generatedRegexes: [string, RegExp][] = [
  ['domainRegex (strict)', domainRegex({ strict: true })],
  ['domainRegex (non-strict)', domainRegex({ strict: false })],
  ['emailRegex (strict)', emailRegex({ strict: true })],
  ['emailRegex (non-strict)', emailRegex({ strict: false })],
  ['urlRegex (strict)', urlRegex({ strict: true })],
  ['urlRegex (non-strict)', urlRegex({ strict: false })],
  ['ipRegex', ipRegex()],
  ['ipRegex (with boundaries)', ipRegex({ includeBoundaries: true })],
  ['ipRegex.v4', ipRegex.v4()],
  ['ipRegex.v6', ipRegex.v6()],
]

describe('super-linear runtime', () => {
  it.each([...generatedRegexes, ...staticRegexes])('%s has no report', (_, regex) => {
    const reports = analyse(regex).reports.map((report) => report.type)
    expect(reports).toEqual([])
  })
})
