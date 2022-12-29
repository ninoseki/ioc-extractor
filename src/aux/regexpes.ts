import memoize from "memoizee";

import type { Options } from "../types";
import { getTLDRegExpString } from "./tlds.js";
import { normalizeOptions } from "./utils.js";

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

export const getMD5RegExp = (): RegExp => {
  return /\b[A-Fa-f0-9]{32}\b/g;
};

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

export const getSHA1RegExp = (): RegExp => {
  return /\b[A-Fa-f0-9]{40}\b/g;
};

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

export const getSHA256RegExp = (): RegExp => {
  return /\b[A-Fa-f0-9]{64}\b/g;
};

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

export const getSHA512RegExp = (): RegExp => {
  return /\b[A-Fa-f0-9]{128}\b/g;
};

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

export const getSSDEEPRegExp = (): RegExp => {
  return /\b\d{1,}:[A-Za-z0-9/+]{3,}:[A-Za-z0-9/+]{3,}/g;
};

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

export const getASNRegExp = (): RegExp => {
  return /(AS|ASN)\d+/gi;
};

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

const _getInternationalizedDomainRegExpString = (): string => {
  const tld = getTLDRegExpString();
  return `(([a-z0-9\\u00a1-\\uffff]{1,63}|xn--)((?!.{0,63}--)[a-z0-9\\u00a1-\\uffff-]{0,63}[a-z0-9\\u00a1-\\uffff])?\\.)+(${tld})\\b`;
};

const getInternationalizedDomainRegExpString = memoize(
  _getInternationalizedDomainRegExpString
);

export const getInternationalizedDomainRegExp = (): RegExp => {
  const internationalizedDomain = getInternationalizedDomainRegExpString();
  return new RegExp(internationalizedDomain, "gi");
};

const getNonStrictInternationalizedDomainRegExpString = () => {
  return "(([a-z0-9\\u00a1-\\uffff]{1,63}|xn--)((?!.{0,63}--)[a-z0-9\\u00a1-\\uffff-]{0,63}[a-z0-9\\u00a1-\\uffff])?\\.)+(?:[a-z0-9\\u00a1-\\uffff-]{2,63})\\b";
};

export const getNonStrictInternationalizedDomainRegExp = (): RegExp => {
  const nonStrictInternationalizedDomain =
    getNonStrictInternationalizedDomainRegExpString();
  return new RegExp(nonStrictInternationalizedDomain, "gi");
};

const _getDomainRegExpString = (): string => {
  const tld = getTLDRegExpString();
  return `(([a-z0-9]{1,63}|xn--)((?!.{0,63}--)[a-z0-9-]{0,63}[a-z0-9])?\\.)+(${tld})\\b`;
};

const getDomainRegExpString = memoize(_getDomainRegExpString);

export const getDomainRegExp = (): RegExp => {
  const domain = getDomainRegExpString();
  return new RegExp(domain, "gi");
};

const getNonStrictDomainRegExpString = (): string => {
  return "(([a-z0-9]{1,63}|xn--)((?!.{0,63}--)[a-z0-9-]{0,63}[a-z0-9])?\\.)+(?:[a-z-]{2,})";
};

export const getNonStrictDomainRegExp = (): RegExp => {
  const nonStrictDomain = getNonStrictDomainRegExpString();
  return new RegExp(nonStrictDomain, "gi");
};

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

const localPart = "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+";

export const getEmailRegExp = (): RegExp => {
  const domain = getDomainRegExpString();
  return new RegExp(`${localPart}@${domain}`, "gi");
};

export const getNonStrictEmailRegExp = (): RegExp => {
  const nonStrictDomain = getNonStrictDomainRegExpString();
  return new RegExp(`${localPart}@${nonStrictDomain}`, "gi");
};

export const getInternationalizedEmailRegExp = (): RegExp => {
  const internationalizedDomain = getInternationalizedDomainRegExpString();
  return new RegExp(`${localPart}@${internationalizedDomain}`, "gi");
};

export const getNonStrictInternationalizedEmailRegExp = (): RegExp => {
  const nonStrictInternationalizedDomain =
    getNonStrictInternationalizedDomainRegExpString();
  return new RegExp(`${localPart}@${nonStrictInternationalizedDomain}`, "gi");
};

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

export const getIPv4RegExpString = (): string => {
  return "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}";
};

export const getIPv4RegExp = (): RegExp => {
  const ipv4 = getIPv4RegExpString();
  return new RegExp(ipv4, "gi");
};

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

const _getIPv6RegExpString = (): string => {
  const ipv4 = getIPv4RegExpString();
  const v6seg = "[a-fA-F\\d]{1,4}";
  const ipv6 = `
(
(?:${v6seg}:){7}(?:${v6seg}|:)|                                // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:${v6seg}:){6}(?:${ipv4}|:${v6seg}|:)|                         // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:${v6seg}:){5}(?::${ipv4}|(:${v6seg}){1,2}|:)|                 // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:${v6seg}:){4}(?:(:${v6seg}){0,1}:${ipv4}|(:${v6seg}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:${v6seg}:){3}(?:(:${v6seg}){0,2}:${ipv4}|(:${v6seg}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:${v6seg}:){2}(?:(:${v6seg}){0,3}:${ipv4}|(:${v6seg}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:${v6seg}:){1}(?:(:${v6seg}){0,4}:${ipv4}|(:${v6seg}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::((?::${v6seg}){0,5}:${ipv4}|(?::${v6seg}){1,7}|:))           // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(%[0-9a-zA-Z]{1,})?                                           // %eth0            %1
`
    .replace(/\s*\/\/.*$/gm, "")
    .replace(/\n/g, "")
    .trim();
  return ipv6;
};

const getIPv6RegExpString = memoize(_getIPv6RegExpString);

export const getIPv6RegExp = (): RegExp => {
  const ipv6 = getIPv6RegExpString();
  return new RegExp(ipv6, "gi");
};

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

const protocol = "(?:(?:https?)://)";
const auth = "(?:\\S+(?::\\S*)?@)?";
const port = "(?::\\d{2,5})?";
const path = '(?:[/?#][^\\s"]*)?';

export const getURLRegExp = (): RegExp => {
  const domain = getDomainRegExpString();
  const ipv4 = getIPv4RegExpString();
  const url = `(?:${protocol})${auth}(?:${domain}|localhost|${ipv4})${port}${path}`;
  return new RegExp(url, "gi");
};

export const getNonStrictURLRegExp = (): RegExp => {
  const nonStrictDomain = getNonStrictDomainRegExpString();
  const ipv4 = getIPv4RegExpString();
  const nonStrictURL = `(?:${protocol})${auth}(?:${nonStrictDomain}|localhost|${ipv4})${port}${path}`;
  return new RegExp(nonStrictURL, "gi");
};

export const getInternationalizedURLRegExp = (): RegExp => {
  const internationalizedDomain = getInternationalizedDomainRegExpString();
  const ipv4 = getIPv4RegExpString();
  const internationalizedURL = `(?:${protocol})${auth}(?:${internationalizedDomain}|localhost|${ipv4})${port}${path}`;
  return new RegExp(internationalizedURL, "gi");
};

export const getNonStrictInternationalizedURLRegExp = (): RegExp => {
  const nonStrictInternationalizedDomain =
    getNonStrictInternationalizedDomainRegExpString();
  const ipv4 = getIPv4RegExpString();
  const nonStrictInternationalizedURL = `(?:${protocol})${auth}(?:${nonStrictInternationalizedDomain}|localhost|${ipv4})${port}${path}`;
  return new RegExp(nonStrictInternationalizedURL, "gi");
};

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

export const getCVERegExp = (): RegExp => {
  return /(CVE-(19|20)\d{2}-\d{4,7})/gi;
};

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

export const getBTCRegExp = (): RegExp => {
  return /\b[13][a-km-zA-HJ-NP-Z0-9]{26,33}\b/g;
};

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

export const getXMRRegExp = (): RegExp => {
  return /\b4[0-9AB][1-9A-HJ-NP-Za-km-z]{93}\b/g;
};

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

export const getGAPubIDRegExp = (): RegExp => {
  return /pub-\d{16}/gi;
};

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

export const getGATrackIDRegExp = (): RegExp => {
  return /UA-\d{4,9}(-\d{1,2})?/gi;
};

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

export const getMACAddressRegExp = (): RegExp => {
  return /\b(?:[A-Fa-f0-9]{2}([-:]))(?:[A-Fa-f0-9]{2}\1){4}[A-Fa-f0-9]{2}\b/g;
};

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

export const getETHRegExp = (): RegExp => {
  return /\b0x[a-fA-F0-9]{40}\b/g;
};

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
