import type { Options } from "../types";
import {
  asnRegExp,
  btcRegExp,
  cveRegExp,
  domainRegExp,
  emailRegExp,
  ethRegExp,
  gaPubIDRegExp,
  gaTrackIDRegExp,
  internationalizedDomainRegExp,
  internationalizedEmailRegExp,
  internationalizedURLRegExp,
  ipv4RegExp,
  ipv6RegExp,
  macAddressRegExp,
  md5RegExp,
  nonStrictDomainRegExp,
  nonStrictEmailRegExp,
  nonStrictInternationalizedDomainRegExp,
  nonStrictInternationalizedEmailRegExp,
  nonStrictInternationalizedURLRegExp,
  nonStrictURLRegExp,
  sha1RegExp,
  sha256RegExp,
  sha512RegExp,
  ssdeepRegExp,
  urlRegExp,
  xmrRegExp,
} from "./regexps";
import { dedup, normalizeOptions, sortByValue } from "./utils";

/**
 * Perform String match() by using a regexp
 *
 * @param {string} s A string
 * @param {RegExp} regexp A regexp to use
 * @returns {string[]} An array of matched strings, returns an empty array if not matched
 */
function matchesWithRegExp(s: string, regexp: RegExp): string[] {
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const matched = s.match(regexp);
  return matched === null ? [] : sortByValue(dedup(matched));
}

function getFirstMatchedValue(s: string, regexp: RegExp): string | null {
  if (regexp.global) {
    const flags = regexp.flags.replace("g", "");
    regexp = new RegExp(regexp.source, flags);
  }

  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const matched = s.match(regexp);
  return matched === null ? null : matched[0];
}

/**
 * Extract MD5s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of MD5s
 */
export function extractMD5s(s: string): string[] {
  return matchesWithRegExp(s, md5RegExp);
}

/**
 * Extract MD5 from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} MD5
 */
export function extractMD5(s: string): string | null {
  return getFirstMatchedValue(s, md5RegExp);
}

/**
 * Extract SHA1s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SHA1s
 */
export function extractSHA1s(s: string): string[] {
  return matchesWithRegExp(s, sha1RegExp);
}

/**
 * Extract SHA1 from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null } SHA1
 */
export function extractSHA1(s: string): string | null {
  return getFirstMatchedValue(s, sha1RegExp);
}

/**
 * Extract SHA256s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SHA256s
 */
export function extractSHA256s(s: string): string[] {
  return matchesWithRegExp(s, sha256RegExp);
}

/**
 * Extract SHA256 from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null } SHA256
 */
export function extractSHA256(s: string): string | null {
  return getFirstMatchedValue(s, sha256RegExp);
}

/**
 * Extract SHA512s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SHA512s
 */
export function extractSHA512s(s: string): string[] {
  return matchesWithRegExp(s, sha512RegExp);
}

/**
 * Extract SHA512 from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} SHA512
 */
export function extractSHA512(s: string): string | null {
  return getFirstMatchedValue(s, sha512RegExp);
}

/**
 * Extract SSDEEPs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SSDEEPs
 */
export function extractSSDEEPs(s: string): string[] {
  return matchesWithRegExp(s, ssdeepRegExp);
}

/**
 * Extract SSDEEP from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} SSDEEP
 */
export function extractSSDEEP(s: string): string | null {
  return getFirstMatchedValue(s, ssdeepRegExp);
}

/**
 * Extract ASNs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of ASNs
 */
export function extractASNs(s: string): string[] {
  return matchesWithRegExp(s, asnRegExp);
}

/**
 * Extract ASN from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} ASN
 */
export function extractASN(s: string): string | null {
  return getFirstMatchedValue(s, asnRegExp);
}

function selectRegExpForDomain(options: Options): RegExp {
  if (options.enableIDN && options.strictTLD) {
    return internationalizedDomainRegExp;
  }

  if (options.enableIDN) {
    return nonStrictInternationalizedDomainRegExp;
  }

  if (options.strictTLD) {
    return domainRegExp;
  }

  return nonStrictDomainRegExp;
}

/**
 * Extract domains from a string
 *
 * @export
 * @param {string} s A string
 * @param {Options} options
 * @returns {string[]} An array of domains
 */
export function extractDomains(
  s: string,
  options: Options = { enableIDN: true, strictTLD: true },
): string[] {
  const regexp = selectRegExpForDomain(normalizeOptions(options));
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract domain from a string
 *
 * @export
 * @param {string} s A string
 * @param {Options} options
 * @returns {string | null} Domain
 */
export function extractDomain(
  s: string,
  options: Options = { enableIDN: true, strictTLD: true },
): string | null {
  const regexp = selectRegExpForDomain(normalizeOptions(options));
  return getFirstMatchedValue(s, regexp);
}

function selectRegExpForEmail(options: Options): RegExp {
  if (options.enableIDN && options.strictTLD) {
    return internationalizedEmailRegExp;
  }

  if (options.enableIDN) {
    return nonStrictInternationalizedEmailRegExp;
  }

  if (options.strictTLD) {
    return emailRegExp;
  }

  return nonStrictEmailRegExp;
}

/**
 * Extract emails from a string
 *
 * @export
 * @param {string} s A string
 * @param {Options} options
 * @returns {string[]} An array of emails
 */
export function extractEmails(
  s: string,
  options: Options = { enableIDN: true, strictTLD: true },
): string[] {
  const regexp = selectRegExpForEmail(normalizeOptions(options));
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract email from a string
 *
 * @export
 * @param {string} s A string
 * @param {Options} options
 * @returns {string | null} Email
 */
export function extractEmail(
  s: string,
  options: Options = { enableIDN: true, strictTLD: true },
): string | null {
  const regexp = selectRegExpForEmail(normalizeOptions(options));
  return getFirstMatchedValue(s, regexp);
}

/**
 * Extract IPv4s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of IPv4s
 */
export function extractIPv4s(s: string): string[] {
  return matchesWithRegExp(s, ipv4RegExp);
}

/**
 * Extract IPv4 from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} IPv4
 */
export function extractIPv4(s: string): string | null {
  return getFirstMatchedValue(s, ipv4RegExp);
}

/**
 * Extract IPv6s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of IPv6s
 */
export function extractIPv6s(s: string): string[] {
  return matchesWithRegExp(s, ipv6RegExp);
}

/**
 * Extract IPv6 from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} IPv6
 */
export function extractIPv6(s: string): string | null {
  return getFirstMatchedValue(s, ipv6RegExp);
}

function selectRegExpForURL(options: Options): RegExp {
  if (options.enableIDN && options.strictTLD) {
    return internationalizedURLRegExp;
  }

  if (options.enableIDN) {
    return nonStrictInternationalizedURLRegExp;
  }

  if (options.strictTLD) {
    return urlRegExp;
  }

  return nonStrictURLRegExp;
}

/**
 * Extract URLs from a string
 *
 * @export
 * @param {string} s A string
 * @param {Options} options
 * @returns {string[]} An array of URLs
 */
export function extractURLs(
  s: string,
  options: Options = { enableIDN: true, strictTLD: true },
): string[] {
  const regexp = selectRegExpForURL(normalizeOptions(options));
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract URL from a string
 *
 * @export
 * @param {string} s A string
 * @param {Options} options
 * @returns {string | null} URL
 */
export function extractURL(
  s: string,
  options: Options = { enableIDN: true, strictTLD: true },
): string | null {
  const regexp = selectRegExpForURL(normalizeOptions(options));
  return getFirstMatchedValue(s, regexp);
}

/**
 * Extract CVEs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of CVEs
 */
export function extractCVEs(s: string): string[] {
  return matchesWithRegExp(s, cveRegExp);
}

/**
 * Extract CVE from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} CVE
 */
export function extractCVE(s: string): string | null {
  return getFirstMatchedValue(s, cveRegExp);
}

/**
 * Extract BTCs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of BTCs
 */
export function extractBTCs(s: string): string[] {
  return matchesWithRegExp(s, btcRegExp);
}

/**
 * Extract BTC from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} BTC
 */
export function extractBTC(s: string): string | null {
  return getFirstMatchedValue(s, btcRegExp);
}

/**
 * Extract XMRs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of XMRs
 */
export function extractXMRs(s: string): string[] {
  return matchesWithRegExp(s, xmrRegExp);
}

/**
 * Extract XMR from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} XMR
 */
export function extractXMR(s: string): string | null {
  return getFirstMatchedValue(s, xmrRegExp);
}

/**
 * Extract Google Adsense Publisher IDs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of Google Adsense Publisher IDs
 */
export function extractGAPubIDs(s: string): string[] {
  return matchesWithRegExp(s, gaPubIDRegExp);
}

/**
 * Extract Google Adsense Publisher IDs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} Adsense Publisher ID
 */
export function extractGAPubID(s: string): string | null {
  return getFirstMatchedValue(s, gaPubIDRegExp);
}

/**
 * Extract Google Analytics tracking IDs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of Google Analytics tracking IDs
 */
export function extractGATrackIDs(s: string): string[] {
  return matchesWithRegExp(s, gaTrackIDRegExp);
}

/**
 * Extract Google Analytics tracking ID from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} Google Analytics tracking ID
 */
export function extractGATrackID(s: string): string | null {
  return getFirstMatchedValue(s, gaTrackIDRegExp);
}

/**
 * Extract mac addresses from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of mac addresses
 */
export function extractMacAddresses(s: string): string[] {
  return matchesWithRegExp(s, macAddressRegExp);
}

/**
 * Extract mac address from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} Mac address
 */
export function extractMacAddress(s: string): string | null {
  return getFirstMatchedValue(s, macAddressRegExp);
}

/**
 * Extract ETH addresses from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of ETH addresses
 */
export function extractETHs(s: string): string[] {
  return matchesWithRegExp(s, ethRegExp);
}

/**
 * Extract ETH address from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} ETH address
 */
export function extractETH(s: string): string | null {
  return getFirstMatchedValue(s, ethRegExp);
}
