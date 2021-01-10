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

/**
 * Extract MD5s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of MD5s
 */
export function extractMD5(s: string): string[] {
  const regexp = getMD5RegExp();
  return matchesWithRegExp(s, regexp);
}
/**
 * Extract SHA1s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SHA1s
 */
export function extractSHA1(s: string): string[] {
  const regexp = getSHA1RegExp();
  return matchesWithRegExp(s, regexp);
}
/**
 * Extract SHA256s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SHA256s
 */
export function extractSHA256(s: string): string[] {
  const regexp = getSHA256RegExp();
  return matchesWithRegExp(s, regexp);
}
/**
 * Extract SHA512s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SHA512s
 */
export function extractSHA512(s: string): string[] {
  const regexp = getSHA512RegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract SSDEEPs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SSDEEPs
 */
export function extractSSDEEP(s: string): string[] {
  const regexp = getSSDEEPRegExp();
  return matchesWithRegExp(s, regexp);
}
/**
 * Extract ASNs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of ASNs
 */
export function extractASN(s: string): string[] {
  const regexp = getASNRegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract domains from a string
 *
 * @export
 * @param {string} s A string
 * @param {boolean} enableIDN enable or disable IDN extraction
 * @param {boolean} strictTLD Enable or disable strict TLD validation
 * @returns {string[]} An array of domains
 */
export function extractDomain(
  s: string,
  enableIDN = true,
  strictTLD = true
): string[] {
  if (enableIDN && strictTLD) {
    const internationalizedDomainRegExp = getInternationalizedDomainRegExp();
    return matchesWithRegExp(s, internationalizedDomainRegExp);
  }

  if (enableIDN) {
    const nonStrictInternationalizedDomainRegExp = getNonStrictInternationalizedDomainRegExp();
    return matchesWithRegExp(s, nonStrictInternationalizedDomainRegExp);
  }

  if (strictTLD) {
    const domainRegExp = getDomainRegExp();
    return matchesWithRegExp(s, domainRegExp);
  }

  const nonStrictDomainRegExp = getNonStrictDomainRegExp();
  return matchesWithRegExp(s, nonStrictDomainRegExp);
}

/**
 * Extract emails from a string
 *
 * @export
 * @param {string} s A string
 * @param {boolean} enableIDN Enable or disable IDN extraction
 * @param {boolean} strictTLD Enable or disable strict TLD validation
 * @returns {string[]} An array of emails
 */
export function extractEmail(
  s: string,
  enableIDN = true,
  strictTLD = true
): string[] {
  if (enableIDN && strictTLD) {
    const internationalizedEmailRegExp = getInternationalizedEmailRegExp();
    return matchesWithRegExp(s, internationalizedEmailRegExp);
  }

  if (enableIDN) {
    const nonStrictInternationalizedEmailRegExp = getNonStrictInternationalizedEmailRegExp();
    return matchesWithRegExp(s, nonStrictInternationalizedEmailRegExp);
  }

  if (strictTLD) {
    const emailRegExp = getEmailRegExp();
    return matchesWithRegExp(s, emailRegExp);
  }

  const nonStrictEmailRegExp = getNonStrictEmailRegExp();
  return matchesWithRegExp(s, nonStrictEmailRegExp);
}

/**
 * Extract IPv4s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of IPv4s
 */
export function extractIPv4(s: string): string[] {
  const regexp = getIPv4RegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract IPv6s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of IPv6s
 */
export function extractIPv6(s: string): string[] {
  const regexp = getIPv6RegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract URLs from a string
 *
 * @export
 * @param {string} s A string
 * @param {boolean} enableIDN Enable or disable IDN extraction
 * @param {boolean} strictTLD Enable or disable strict TLD validation
 * @returns {string[]} An array of URLs
 */
export function extractURL(
  s: string,
  enableIDN = true,
  strictTLD = true
): string[] {
  if (enableIDN && strictTLD) {
    const internationalizedURLRegExp = getInternationalizedURLRegExp();
    return matchesWithRegExp(s, internationalizedURLRegExp);
  }

  if (enableIDN) {
    const nonStrictInternationalizedURLRegExp = getNonStrictInternationalizedURLRegExp();
    return matchesWithRegExp(s, nonStrictInternationalizedURLRegExp);
  }

  if (strictTLD) {
    const urlRegExp = getURLRegExp();
    return matchesWithRegExp(s, urlRegExp);
  }

  const nonStrictURLRegExp = getNonStrictURLRegExp();
  return matchesWithRegExp(s, nonStrictURLRegExp);
}

/**
 * Extract CVEs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of CVEs
 */
export function extractCVE(s: string): string[] {
  const regexp = getCVERegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract BTCs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of BTCs
 */
export function extractBTC(s: string): string[] {
  const regexp = getBTCRegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract XMRs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of XMRs
 */
export function extractXMR(s: string): string[] {
  const regexp = getXMRRegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract Google Adsense Publisher IDs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of Google Adsense Publisher IDs
 */
export function extractGAPubID(s: string): string[] {
  const regexp = getGAPubIDRegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract Google Analytics tracking IDs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of Google Analytics tracking IDs
 */
export function extractGATrackID(s: string): string[] {
  const regexp = getGATrackIDRegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract mac addresses from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of mac addresses
 */
export function extractMacAddress(s: string): string[] {
  const regexp = getMACAddressRegExp();
  return matchesWithRegExp(s, regexp);
}

/**
 * Extract ETH addresses from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of ETH addresses
 */
export function extractETH(s: string): string[] {
  const regexp = getETHRegExp();
  return matchesWithRegExp(s, regexp);
}
