import type { Options } from "../types";
import { domainRegex } from "./domain";
import { emailRegex } from "./email";
import { ipRegex } from "./ip";
import {
  asnRegex,
  btcRegex,
  cveRegExp,
  ethRegex,
  gaPubIDRegex,
  gaTrackIDRegex,
  macAddressRegex,
  md5Regex,
  sha1Regex,
  sha256Regex,
  sha512Regex,
  ssdeepRegex,
  xmrRegex,
} from "./regexes";
import { urlRegex } from "./url";
import { dedup, sortByValue } from "./utils";

/**
 * Perform String match() by using a regexp
 *
 * @param {string} s A string
 * @param {RegExp} regexp A regexp to use
 * @returns {string[]} An array of matched strings, returns an empty array if not matched
 */
function matchesWithRegExp(s: string, regexp: RegExp): string[] {
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
  return matchesWithRegExp(s, md5Regex);
}

/**
 * Extract MD5 from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} MD5
 */
export function extractMD5(s: string): string | null {
  return getFirstMatchedValue(s, md5Regex);
}

/**
 * Extract SHA1s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SHA1s
 */
export function extractSHA1s(s: string): string[] {
  return matchesWithRegExp(s, sha1Regex);
}

/**
 * Extract SHA1 from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null } SHA1
 */
export function extractSHA1(s: string): string | null {
  return getFirstMatchedValue(s, sha1Regex);
}

/**
 * Extract SHA256s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SHA256s
 */
export function extractSHA256s(s: string): string[] {
  return matchesWithRegExp(s, sha256Regex);
}

/**
 * Extract SHA256 from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null } SHA256
 */
export function extractSHA256(s: string): string | null {
  return getFirstMatchedValue(s, sha256Regex);
}

/**
 * Extract SHA512s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SHA512s
 */
export function extractSHA512s(s: string): string[] {
  return matchesWithRegExp(s, sha512Regex);
}

/**
 * Extract SHA512 from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} SHA512
 */
export function extractSHA512(s: string): string | null {
  return getFirstMatchedValue(s, sha512Regex);
}

/**
 * Extract SSDEEPs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SSDEEPs
 */
export function extractSSDEEPs(s: string): string[] {
  return matchesWithRegExp(s, ssdeepRegex);
}

/**
 * Extract SSDEEP from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} SSDEEP
 */
export function extractSSDEEP(s: string): string | null {
  return getFirstMatchedValue(s, ssdeepRegex);
}

/**
 * Extract ASNs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of ASNs
 */
export function extractASNs(s: string): string[] {
  if (!s.includes("AS")) {
    return [];
  }
  return matchesWithRegExp(s, asnRegex);
}

/**
 * Extract ASN from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} ASN
 */
export function extractASN(s: string): string | null {
  if (!s.includes("AS")) {
    return null;
  }
  return getFirstMatchedValue(s, asnRegex);
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
  options: Options = { strict: true },
): string[] {
  if (!s.includes(".")) {
    return [];
  }
  const regexp = domainRegex(options);
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
  options: Options = { strict: true },
): string | null {
  if (!s.includes(".")) {
    return null;
  }
  const regexp = domainRegex(options);
  return getFirstMatchedValue(s, regexp);
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
  options: Options = { strict: true },
): string[] {
  if (!s.includes("@") && !s.includes(".")) {
    return [];
  }
  const regexp = emailRegex(options);
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
  options: Options = { strict: true },
): string | null {
  if (!s.includes("@") && !s.includes(".")) {
    return null;
  }
  const regexp = emailRegex(options);
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
  if (!s.includes(".")) {
    return [];
  }
  return matchesWithRegExp(s, ipRegex.v4());
}

/**
 * Extract IPv4 from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} IPv4
 */
export function extractIPv4(s: string): string | null {
  if (!s.includes(".")) {
    return null;
  }
  return getFirstMatchedValue(s, ipRegex.v4());
}

/**
 * Extract IPv6s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of IPv6s
 */
export function extractIPv6s(s: string): string[] {
  return matchesWithRegExp(s, ipRegex.v6());
}

/**
 * Extract IPv6 from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} IPv6
 */
export function extractIPv6(s: string): string | null {
  return getFirstMatchedValue(s, ipRegex.v6());
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
  options: Options = { strict: true },
): string[] {
  const regexp = urlRegex(options);
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
  options: Options = { strict: true },
): string | null {
  const regexp = urlRegex(options);
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
  return matchesWithRegExp(s, btcRegex);
}

/**
 * Extract BTC from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} BTC
 */
export function extractBTC(s: string): string | null {
  return getFirstMatchedValue(s, btcRegex);
}

/**
 * Extract XMRs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of XMRs
 */
export function extractXMRs(s: string): string[] {
  return matchesWithRegExp(s, xmrRegex);
}

/**
 * Extract XMR from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} XMR
 */
export function extractXMR(s: string): string | null {
  return getFirstMatchedValue(s, xmrRegex);
}

/**
 * Extract Google Adsense Publisher IDs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of Google Adsense Publisher IDs
 */
export function extractGAPubIDs(s: string): string[] {
  return matchesWithRegExp(s, gaPubIDRegex);
}

/**
 * Extract Google Adsense Publisher IDs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} Adsense Publisher ID
 */
export function extractGAPubID(s: string): string | null {
  return getFirstMatchedValue(s, gaPubIDRegex);
}

/**
 * Extract Google Analytics tracking IDs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of Google Analytics tracking IDs
 */
export function extractGATrackIDs(s: string): string[] {
  return matchesWithRegExp(s, gaTrackIDRegex);
}

/**
 * Extract Google Analytics tracking ID from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} Google Analytics tracking ID
 */
export function extractGATrackID(s: string): string | null {
  return getFirstMatchedValue(s, gaTrackIDRegex);
}

/**
 * Extract mac addresses from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of mac addresses
 */
export function extractMacAddresses(s: string): string[] {
  return matchesWithRegExp(s, macAddressRegex);
}

/**
 * Extract mac address from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} Mac address
 */
export function extractMacAddress(s: string): string | null {
  return getFirstMatchedValue(s, macAddressRegex);
}

/**
 * Extract ETH addresses from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of ETH addresses
 */
export function extractETHs(s: string): string[] {
  return matchesWithRegExp(s, ethRegex);
}

/**
 * Extract ETH address from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} ETH address
 */
export function extractETH(s: string): string | null {
  return getFirstMatchedValue(s, ethRegex);
}
