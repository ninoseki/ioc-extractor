import { Options } from "..";
import { dedup, sortByValue } from "./auxiliary";
import {
  getASNRegExp,
  getBTCRegExp,
  getCVERegExp,
  getDomainRegExp,
  getEmailRegExp,
  getETHRegExp,
  getGAPubIDRegExp,
  getGATrackIDRegExp,
  getInternationalizedDomainRegExp,
  getInternationalizedEmailRegExp,
  getInternationalizedURLRegExp,
  getIPv4RegExp,
  getIPv6RegExp,
  getMACAddressRegExp,
  getMD5RegExp,
  getNonStrictDomainRegExp,
  getNonStrictEmailRegExp,
  getNonStrictInternationalizedDomainRegExp,
  getNonStrictInternationalizedEmailRegExp,
  getNonStrictInternationalizedURLRegExp,
  getNonStrictURLRegExp,
  getSHA1RegExp,
  getSHA256RegExp,
  getSHA512RegExp,
  getSSDEEPRegExp,
  getURLRegExp,
  getXMRRegExp,
} from "./regexpes";

function normalizeOptions(options: Options): Options {
  const strictTLD = options.strictTLD !== undefined ? options.strictTLD : true;
  const enableIDN = options.enableIDN !== undefined ? options.enableIDN : true;
  return { strictTLD, enableIDN };
}

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
  const regexp = getMD5RegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract MD5 from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} MD5
 */
export function extractMD5(s: string): string | null {
  const regexp = getMD5RegExp();
  return getFirstMatchedValue(s, regexp);
}

/**
 * Extract SHA1s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SHA1s
 */
export function extractSHA1s(s: string): string[] {
  const regexp = getSHA1RegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract SHA1 from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null } SHA1
 */
export function extractSHA1(s: string): string | null {
  const regexp = getSHA1RegExp();
  return getFirstMatchedValue(s, regexp);
}

/**
 * Extract SHA256s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SHA256s
 */
export function extractSHA256s(s: string): string[] {
  const regexp = getSHA256RegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract SHA256 from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null } SHA256
 */
export function extractSHA256(s: string): string | null {
  const regexp = getSHA256RegExp();
  return getFirstMatchedValue(s, regexp);
}

/**
 * Extract SHA512s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SHA512s
 */
export function extractSHA512s(s: string): string[] {
  const regexp = getSHA512RegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract SHA512 from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} SHA512
 */
export function extractSHA512(s: string): string | null {
  const regexp = getSHA512RegExp();
  return getFirstMatchedValue(s, regexp);
}

/**
 * Extract SSDEEPs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SSDEEPs
 */
export function extractSSDEEPs(s: string): string[] {
  const regexp = getSSDEEPRegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract SSDEEP from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} SSDEEP
 */
export function extractSSDEEP(s: string): string | null {
  const regexp = getSSDEEPRegExp();
  return getFirstMatchedValue(s, regexp);
}

/**
 * Extract ASNs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of ASNs
 */
export function extractASNs(s: string): string[] {
  const regexp = getASNRegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract ASN from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} ASN
 */
export function extractASN(s: string): string | null {
  const regexp = getASNRegExp();
  return getFirstMatchedValue(s, regexp);
}

function selectRegExpForDomain(options: Options): RegExp {
  if (options.enableIDN && options.strictTLD) {
    return getInternationalizedDomainRegExp();
  }

  if (options.enableIDN) {
    return getNonStrictInternationalizedDomainRegExp();
  }

  if (options.strictTLD) {
    return getDomainRegExp();
  }

  return getNonStrictDomainRegExp();
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
  options: Options = { enableIDN: true, strictTLD: true }
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
  options: Options = { enableIDN: true, strictTLD: true }
): string | null {
  const regexp = selectRegExpForDomain(normalizeOptions(options));
  return getFirstMatchedValue(s, regexp);
}

function selectRegExpForEmail(options: Options): RegExp {
  if (options.enableIDN && options.strictTLD) {
    return getInternationalizedEmailRegExp();
  }

  if (options.enableIDN) {
    return getNonStrictInternationalizedEmailRegExp();
  }

  if (options.strictTLD) {
    return getEmailRegExp();
  }

  return getNonStrictEmailRegExp();
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
  options: Options = { enableIDN: true, strictTLD: true }
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
  options: Options = { enableIDN: true, strictTLD: true }
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
  const regexp = getIPv4RegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract IPv4 from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} IPv4
 */
export function extractIPv4(s: string): string | null {
  const regexp = getIPv4RegExp();
  return getFirstMatchedValue(s, regexp);
}

/**
 * Extract IPv6s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of IPv6s
 */
export function extractIPv6s(s: string): string[] {
  const regexp = getIPv6RegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract IPv6 from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} IPv6
 */
export function extractIPv6(s: string): string | null {
  const regexp = getIPv6RegExp();
  return getFirstMatchedValue(s, regexp);
}

function selectRegExpForURL(options: Options): RegExp {
  if (options.enableIDN && options.strictTLD) {
    return getInternationalizedURLRegExp();
  }

  if (options.enableIDN) {
    return getNonStrictInternationalizedURLRegExp();
  }

  if (options.strictTLD) {
    return getURLRegExp();
  }

  return getNonStrictURLRegExp();
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
  options: Options = { enableIDN: true, strictTLD: true }
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
  options: Options = { enableIDN: true, strictTLD: true }
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
  const regexp = getCVERegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract CVE from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} CVE
 */
export function extractCVE(s: string): string | null {
  const regexp = getCVERegExp();
  return getFirstMatchedValue(s, regexp);
}

/**
 * Extract BTCs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of BTCs
 */
export function extractBTCs(s: string): string[] {
  const regexp = getBTCRegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract BTC from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} BTC
 */
export function extractBTC(s: string): string | null {
  const regexp = getBTCRegExp();
  return getFirstMatchedValue(s, regexp);
}

/**
 * Extract XMRs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of XMRs
 */
export function extractXMRs(s: string): string[] {
  const regexp = getXMRRegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract XMR from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} XMR
 */
export function extractXMR(s: string): string | null {
  const regexp = getXMRRegExp();
  return getFirstMatchedValue(s, regexp);
}

/**
 * Extract Google Adsense Publisher IDs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of Google Adsense Publisher IDs
 */
export function extractGAPubIDs(s: string): string[] {
  const regexp = getGAPubIDRegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract Google Adsense Publisher IDs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} Adsense Publisher ID
 */
export function extractGAPubID(s: string): string | null {
  const regexp = getGAPubIDRegExp();
  return getFirstMatchedValue(s, regexp);
}

/**
 * Extract Google Analytics tracking IDs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of Google Analytics tracking IDs
 */
export function extractGATrackIDs(s: string): string[] {
  const regexp = getGATrackIDRegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract Google Analytics tracking ID from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} Google Analytics tracking ID
 */
export function extractGATrackID(s: string): string | null {
  const regexp = getGATrackIDRegExp();
  return getFirstMatchedValue(s, regexp);
}

/**
 * Extract mac addresses from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of mac addresses
 */
export function extractMacAddresses(s: string): string[] {
  const regexp = getMACAddressRegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract mac address from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} Mac address
 */
export function extractMacAddress(s: string): string | null {
  const regexp = getMACAddressRegExp();
  return getFirstMatchedValue(s, regexp);
}

/**
 * Extract ETH addresses from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of ETH addresses
 */
export function extractETHs(s: string): string[] {
  const regexp = getETHRegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract ETH address from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string | null} ETH address
 */
export function extractETH(s: string): string | null {
  const regexp = getETHRegExp();
  return getFirstMatchedValue(s, regexp);
}
