import { tlds } from './tlds'

const alphabets = 'a-z'
const numbers = '0-9'
export const labelLetters = `${alphabets}${numbers}`
export const oneOrMoreLabel = `[${labelLetters}]{1,63}`
export const zeroOrMoreLabel = `[${labelLetters}]{0,63}`
export const zeroOrMoreLabelWithHyphen = `[${labelLetters}-]{0,63}`
export const nonDigitTwoOrMoreLabelWithHyphen = `[${alphabets}-]{2,63}`
export const idnPrefix = 'xn--'

export const nonStrictTld = nonDigitTwoOrMoreLabelWithHyphen
export const strictTld = tlds.join('|')

export const asnRegex = /\b(AS|ASN)\d+\b/gi
export const btcRegex = /\b[13][a-km-zA-HJ-NP-Z1-9]{26,33}\b/g
export const cveRegExp = /(CVE-(19|20)\d{2}-\d{4,7})/gi
export const ethRegex = /\b0x[a-fA-F0-9]{40}\b/g
export const gaPubIDRegex = /\bpub-\d{16}\b/gi
export const gaTrackIDRegex = /\bUA-\d{4,9}(-\d{1,2})?\b/gi
export const macAddressRegex = /\b[A-F0-9]{2}([-:])(?:[A-F0-9]{2}\1){4}[A-F0-9]{2}\b/gi
export const md5Regex = /\b[A-F0-9]{32}\b/gi
export const sha1Regex = /\b[A-F0-9]{40}\b/gi
export const sha256Regex = /\b[A-F0-9]{64}\b/gi
export const sha512Regex = /\b[A-F0-9]{128}\b/gi
export const ssdeepRegex = /\b\d+:[A-Z0-9/+]{3,}:[A-Z0-9/+]{3,}/gi
export const xmrRegex = /\b4[0-9AB][1-9A-HJ-NP-Za-km-z]{93}\b/g
