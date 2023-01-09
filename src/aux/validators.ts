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
  return check(s, md5RegExp);
}

/**
 * Check whether a string is a SHA1 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a SHA1
 */
export function isSHA1(s: string): boolean {
  return check(s, sha1RegExp);
}

/**
 * Check whether a string is a SHA256 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a SHA256
 */
export function isSHA256(s: string): boolean {
  return check(s, sha256RegExp);
}

/**
 * Check whether a string is a SHA512 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a SHA512
 */
export function isSHA512(s: string): boolean {
  return check(s, sha512RegExp);
}

/**
 * Check whether a string is a SSDEEP or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a SSDEEP
 */
export function isSSDEEP(s: string): boolean {
  return check(s, ssdeepRegExp);
}

/**
 * Check whether a string is an ASN or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is an ASN
 */
export function isASN(s: string): boolean {
  return check(s, asnRegExp);
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
    return check(s, internationalizedDomainRegExp);
  }

  if (options.enableIDN) {
    return check(s, nonStrictInternationalizedDomainRegExp);
  }

  if (options.strictTLD) {
    return check(s, domainRegExp);
  }

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
    return check(s, internationalizedEmailRegExp);
  }

  if (options.enableIDN) {
    return check(s, nonStrictInternationalizedEmailRegExp);
  }

  if (options.strictTLD) {
    return check(s, emailRegExp);
  }

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
  return check(s, ipv4RegExp);
}

/**
 * Check whether a string is an IPv6 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is an IPv6
 */
export function isIPv6(s: string): boolean {
  return check(s, ipv6RegExp);
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
    return check(s, internationalizedURLRegExp);
  }

  if (options.enableIDN) {
    return check(s, nonStrictInternationalizedURLRegExp);
  }

  if (options.strictTLD) {
    return check(s, urlRegExp);
  }

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
  return check(s, cveRegExp);
}

/**
 * Check whether a string is a BTC or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a BTC
 */
export function isBTC(s: string): boolean {
  return check(s, btcRegExp);
}

/**
 * Check whether a string is an XMR or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is an XMR
 */
export function isXMR(s: string): boolean {
  return check(s, xmrRegExp);
}

/**
 * Check whether a string is a Google Adsense Publisher ID or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is a Google Adsense Publisher ID
 */
export function isGAPubID(s: string): boolean {
  return check(s, gaPubIDRegExp);
}

/**
 * Check whether a string is a Google Analytics tracking ID or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is a Google Analytics tracking ID
 */
export function isGATrackID(s: string): boolean {
  return check(s, gaTrackIDRegExp);
}

/**
 * Check whether a string is a mac address or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is a mac address
 */
export function isMacAddress(s: string): boolean {
  return check(s, macAddressRegExp);
}

/**
 * Check whether a string is an ETH address or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is an ETH address
 */
export function isETH(s: string): boolean {
  return check(s, ethRegExp);
}
