import { dedup, sortByValue } from "./auxiliary";
import {
  asnRegex,
  btcRegex,
  cveRegex,
  domainRegex,
  emailRegex,
  gaPubIDRegex,
  gaTrackIDRegex,
  ipv4Regex,
  ipv6Regex,
  macAddressRegex,
  md5Regex,
  sha1Regex,
  sha256Regex,
  sha512Regex,
  ssdeepRegex,
  urlRegex,
  xmrRegex,
} from "./regexes";

/**
 * Perform String match() by using a regexp
 *
 * @param {string} s A string
 * @param {RegExp} regex A regexp to use
 * @returns {string[]} An array of matched strings, returns an empty array if not matched
 */
function matchesWithRegexp(s: string, regex: RegExp): string[] {
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const matched = s.match(regex);
  return matched === null ? [] : sortByValue(dedup(matched));
}
/**
 * Extract MD5s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of MD5s
 */
export function extractMD5(s: string): string[] {
  return matchesWithRegexp(s, md5Regex);
}
/**
 * Extract SHA1s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SHA1s
 */
export function extractSHA1(s: string): string[] {
  return matchesWithRegexp(s, sha1Regex);
}
/**
 * Extract SHA256s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SHA256s
 */
export function extractSHA256(s: string): string[] {
  return matchesWithRegexp(s, sha256Regex);
}
/**
 * Extract SHA512s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SHA512s
 */
export function extractSHA512(s: string): string[] {
  return matchesWithRegexp(s, sha512Regex);
}

/**
 * Extract SSDEEPs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SSDEEPs
 */
export function extractSSDEEP(s: string): string[] {
  return matchesWithRegexp(s, ssdeepRegex);
}
/**
 * Extract ASNs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of ASNs
 */
export function extractASN(s: string): string[] {
  return matchesWithRegexp(s, asnRegex);
}

/**
 * Extract domains from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of domains
 */
export function extractDomain(s: string): string[] {
  return matchesWithRegexp(s, domainRegex);
}

/**
 * Extract emails from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of emails
 */
export function extractEmail(s: string): string[] {
  return matchesWithRegexp(s, emailRegex);
}

/**
 * Extract IPv4s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of IPv4s
 */
export function extractIPv4(s: string): string[] {
  return matchesWithRegexp(s, ipv4Regex);
}

/**
 * Extract IPv6s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of IPv6s
 */
export function extractIPv6(s: string): string[] {
  return matchesWithRegexp(s, ipv6Regex);
}

/**
 * Extract URLs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of URLs
 */
export function extractURL(s: string): string[] {
  return matchesWithRegexp(s, urlRegex);
}

/**
 * Extract CVEs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of CVEs
 */
export function extractCVE(s: string): string[] {
  return matchesWithRegexp(s, cveRegex);
}

/**
 * Extract BTCs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of BTCs
 */
export function extractBTC(s: string): string[] {
  return matchesWithRegexp(s, btcRegex);
}

/**
 * Extract XMRs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of XMRs
 */
export function extractXMR(s: string): string[] {
  return matchesWithRegexp(s, xmrRegex);
}

/**
 * Extract Google Adsense Publisher IDs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of Google Adsense Publisher IDs
 */
export function extractGAPubID(s: string): string[] {
  return matchesWithRegexp(s, gaPubIDRegex);
}

/**
 * Extract Google Analytics tracking IDs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of Google Analytics tracking IDs
 */
export function extractGATrackID(s: string): string[] {
  return matchesWithRegexp(s, gaTrackIDRegex);
}

/**
 * Extract mac addresses from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of mac addresses
 */
export function extractMacAddress(s: string): string[] {
  return matchesWithRegexp(s, macAddressRegex);
}
