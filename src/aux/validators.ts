import type { Options } from "../types";
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
} from "./regexps";
import { normalizeOptions } from "./utils";

/**
 * Check whether a string matches with a regexp or not
 *
 * @param {string} s A string
 * @param {RegExp} regexp A regexp
 * @returns {boolean} returns true if a string matches with a regexp
 */
function check(s: string, regexp: RegExp): boolean {
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const match = s.match(regexp);
  if (match === null) {
    return false;
  }
  return match[0].length == s.length;
}

/**
 * Check whether a string is a MD5 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is MD5
 */
export function isMD5(s: string): boolean {
  const regexp = getMD5RegExp();
  return check(s, regexp);
}

/**
 * Check whether a string is a SHA1 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a SHA1
 */
export function isSHA1(s: string): boolean {
  const regexp = getSHA1RegExp();
  return check(s, regexp);
}

/**
 * Check whether a string is a SHA256 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a SHA256
 */
export function isSHA256(s: string): boolean {
  const regexp = getSHA256RegExp();
  return check(s, regexp);
}

/**
 * Check whether a string is a SHA512 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a SHA512
 */
export function isSHA512(s: string): boolean {
  const regexp = getSHA512RegExp();
  return check(s, regexp);
}

/**
 * Check whether a string is a SSDEEP or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a SSDEEP
 */
export function isSSDEEP(s: string): boolean {
  const regexp = getSSDEEPRegExp();
  return check(s, regexp);
}

/**
 * Check whether a string is an ASN or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is an ASN
 */
export function isASN(s: string): boolean {
  const regexp = getASNRegExp();
  return check(s, regexp);
}

/**
 * Check whether a string is a domain or not
 *
 * @export
 * @param {string} s A string
 * @param {Options} options
 * @returns {boolean} return true if a string is a domain
 */
export function isDomain(
  s: string,
  options: Options = { enableIDN: true, strictTLD: true }
): boolean {
  options = normalizeOptions(options);
  if (options.enableIDN && options.strictTLD) {
    const internationalizedDomainRegExp = getInternationalizedDomainRegExp();
    return check(s, internationalizedDomainRegExp);
  }

  if (options.enableIDN) {
    const nonStrictInternationalizedDomainRegExp =
      getNonStrictInternationalizedDomainRegExp();
    return check(s, nonStrictInternationalizedDomainRegExp);
  }

  if (options.strictTLD) {
    const domainRegExp = getDomainRegExp();
    return check(s, domainRegExp);
  }

  const nonStrictDomainRegExp = getNonStrictDomainRegExp();
  return check(s, nonStrictDomainRegExp);
}

/**
 * Check whether a string is an email or not
 *
 * @export
 * @param {string} s A string
 * @param {Options} options
 * @returns {boolean} true if a string is a domain
 */
export function isEmail(
  s: string,
  options: Options = { enableIDN: true, strictTLD: true }
): boolean {
  options = normalizeOptions(options);
  if (options.enableIDN && options.strictTLD) {
    const internationalizedEmailRegExp = getInternationalizedEmailRegExp();
    return check(s, internationalizedEmailRegExp);
  }

  if (options.enableIDN) {
    const nonStrictInternationalizedEmailRegExp =
      getNonStrictInternationalizedEmailRegExp();
    return check(s, nonStrictInternationalizedEmailRegExp);
  }

  if (options.strictTLD) {
    const emailRegExp = getEmailRegExp();
    return check(s, emailRegExp);
  }

  const nonStrictEmailRegExp = getNonStrictEmailRegExp();
  return check(s, nonStrictEmailRegExp);
}

/**
 * Check whether a string is an IPv4 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is an IPv4
 */
export function isIPv4(s: string): boolean {
  const regexp = getIPv4RegExp();
  return check(s, regexp);
}

/**
 * Check whether a string is an IPv6 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is an IPv6
 */
export function isIPv6(s: string): boolean {
  const regexp = getIPv6RegExp();
  return check(s, regexp);
}

/**
 * Check whether a string is a URL or not
 *
 * @export
 * @param {string} s A string
 * @param {Options} options
 * @returns {boolean} true if a string is a URL
 */
export function isURL(
  s: string,
  options: Options = { enableIDN: true, strictTLD: true }
): boolean {
  options = normalizeOptions(options);
  if (options.enableIDN && options.strictTLD) {
    const internationalizedURLRegExp = getInternationalizedURLRegExp();
    return check(s, internationalizedURLRegExp);
  }

  if (options.enableIDN) {
    const nonStrictInternationalizedURLRegExp =
      getNonStrictInternationalizedURLRegExp();
    return check(s, nonStrictInternationalizedURLRegExp);
  }

  if (options.strictTLD) {
    const urlRegExp = getURLRegExp();
    return check(s, urlRegExp);
  }

  const nonStrictURLRegExp = getNonStrictURLRegExp();
  return check(s, nonStrictURLRegExp);
}

/**
 * Check whether a string is a CVE or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is a CVE
 */
export function isCVE(s: string): boolean {
  const regexp = getCVERegExp();
  return check(s, regexp);
}

/**
 * Check whether a string is a BTC or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a BTC
 */
export function isBTC(s: string): boolean {
  const regexp = getBTCRegExp();
  return check(s, regexp);
}

/**
 * Check whether a string is an XMR or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is an XMR
 */
export function isXMR(s: string): boolean {
  const regexp = getXMRRegExp();
  return check(s, regexp);
}

/**
 * Check whether a string is a Google Adsense Publisher ID or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is a Google Adsense Publisher ID
 */
export function isGAPubID(s: string): boolean {
  const regexp = getGAPubIDRegExp();
  return check(s, regexp);
}

/**
 * Check whether a string is a Google Analytics tracking ID or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is a Google Analytics tracking ID
 */
export function isGATrackID(s: string): boolean {
  const regexp = getGATrackIDRegExp();
  return check(s, regexp);
}

/**
 * Check whether a string is a mac address or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is a mac address
 */
export function isMacAddress(s: string): boolean {
  const regexp = getMACAddressRegExp();
  return check(s, regexp);
}

/**
 * Check whether a string is an ETH address or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is an ETH address
 */
export function isETH(s: string): boolean {
  const regexp = getETHRegExp();
  return check(s, regexp);
}
