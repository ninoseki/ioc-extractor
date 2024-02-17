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

/**
 * Check whether a string matches with a regexp or not
 *
 * @param {string} s A string
 * @param {RegExp} regexp A regexp
 * @returns {boolean} returns true if a string matches with a regexp
 */
function check(s: string, regexp: RegExp): boolean {
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
  return check(s, md5Regex);
}

/**
 * Check whether a string is a SHA1 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a SHA1
 */
export function isSHA1(s: string): boolean {
  return check(s, sha1Regex);
}

/**
 * Check whether a string is a SHA256 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a SHA256
 */
export function isSHA256(s: string): boolean {
  return check(s, sha256Regex);
}

/**
 * Check whether a string is a SHA512 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a SHA512
 */
export function isSHA512(s: string): boolean {
  return check(s, sha512Regex);
}

/**
 * Check whether a string is a SSDEEP or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a SSDEEP
 */
export function isSSDEEP(s: string): boolean {
  return check(s, ssdeepRegex);
}

/**
 * Check whether a string is an ASN or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is an ASN
 */
export function isASN(s: string): boolean {
  return check(s, asnRegex);
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
  options: Options = { strict: true },
): boolean {
  const regex = domainRegex(options);
  return check(s, regex);
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
  options: Options = { strict: true },
): boolean {
  const regex = emailRegex(options);
  return check(s, regex);
}

/**
 * Check whether a string is an IPv4 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is an IPv4
 */
export function isIPv4(s: string): boolean {
  return check(s, ipRegex.v4());
}

/**
 * Check whether a string is an IPv6 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is an IPv6
 */
export function isIPv6(s: string): boolean {
  return check(s, ipRegex.v6());
}

/**
 * Check whether a string is a URL or not
 *
 * @export
 * @param {string} s A string
 * @param {Options} options
 * @returns {boolean} true if a string is a URL
 */
export function isURL(s: string, options: Options = { strict: true }): boolean {
  const regex = urlRegex(options);
  return check(s, regex);
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
  return check(s, btcRegex);
}

/**
 * Check whether a string is an XMR or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is an XMR
 */
export function isXMR(s: string): boolean {
  return check(s, xmrRegex);
}

/**
 * Check whether a string is a Google Adsense Publisher ID or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is a Google Adsense Publisher ID
 */
export function isGAPubID(s: string): boolean {
  return check(s, gaPubIDRegex);
}

/**
 * Check whether a string is a Google Analytics tracking ID or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is a Google Analytics tracking ID
 */
export function isGATrackID(s: string): boolean {
  return check(s, gaTrackIDRegex);
}

/**
 * Check whether a string is a mac address or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is a mac address
 */
export function isMacAddress(s: string): boolean {
  return check(s, macAddressRegex);
}

/**
 * Check whether a string is an ETH address or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is an ETH address
 */
export function isETH(s: string): boolean {
  return check(s, ethRegex);
}
