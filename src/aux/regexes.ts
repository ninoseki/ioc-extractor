import { tldRegexString } from "./tlds";

/**
 * Check whether a string matches with a regexp or not
 *
 * @param {string} s A string
 * @param {RegExp} regex A regexp
 * @returns {boolean} returns true if a string matches with a regexp
 */
function check(s: string, regex: RegExp): boolean {
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const match = s.match(regex);
  if (match === null) {
    return false;
  }
  return match[0].length == s.length;
}

export const md5Regex = /\b[A-Fa-f0-9]{32}\b/gi;

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

export const sha1Regex = /\b[A-Fa-f0-9]{40}\b/gi;

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

export const sha256Regex = /\b[A-Fa-f0-9]{64}\b/gi;

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

export const sha512Regex = /\b[A-Fa-f0-9]{128}\b/gi;

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

export const ssdeepRegex = /\b\d{1,}:[A-Za-z0-9/+]{3,}:[A-Za-z0-9/+]{3,}/gi;

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

export const asnRegex = /(AS|ASN)\d+/gi;

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

const internationalizedDomain = `(([a-z0-9\\u00a1-\\uffff]{1,63}|xn--)((?!.{0,63}--)[a-z0-9\\u00a1-\\uffff-]{0,63}[a-z0-9\\u00a1-\\uffff])?\\.)+(${tldRegexString})\\b`;
export const internationalizedDomainRegex = new RegExp(
  internationalizedDomain,
  "gi"
);

const nonStrictInternationalizedDomain = `(([a-z0-9\\u00a1-\\uffff]{1,63}|xn--)((?!.{0,63}--)[a-z0-9\\u00a1-\\uffff-]{0,63}[a-z0-9\\u00a1-\\uffff])?\\.)+(?:[a-z0-9\\u00a1-\\uffff-]{2,63})\\b`;
export const nonStrictInternationalizedDomainRegex = new RegExp(
  nonStrictInternationalizedDomain,
  "gi"
);

const domain = `(([a-z0-9]{1,63}|xn--)((?!.{0,63}--)[a-z0-9-]{0,63}[a-z0-9])?\\.)+(${tldRegexString})\\b`;
export const domainRegex = new RegExp(domain, "gi");

const nonStrictDomain = `(([a-z0-9]{1,63}|xn--)((?!.{0,63}--)[a-z0-9-]{0,63}[a-z0-9])?\\.)+(?:[a-z-]{2,})`;
export const nonStrictDomainRegex = new RegExp(nonStrictDomain, "gi");

/**
 * Check whether a string is a domain or not
 *
 * @export
 * @param {string} s A string
 * @param {boolean} enableIDN Enable or disable IDN extraction
 * @param {boolean} strictTLD Enable or disable strict TLD validation
 * @returns {boolean} return true if a string is a domain
 */
export function isDomain(
  s: string,
  enableIDN = true,
  strictTLD = true
): boolean {
  if (enableIDN && strictTLD) {
    return check(s, internationalizedDomainRegex);
  }
  if (enableIDN) {
    return check(s, nonStrictInternationalizedDomainRegex);
  }

  if (strictTLD) {
    return check(s, domainRegex);
  }
  return check(s, nonStrictDomainRegex);
}

export const emailRegex = new RegExp(`[A-Za-z0-9_.]+@${domain}`, "gi");
export const nonStrictEmailRegex = new RegExp(
  `[A-Za-z0-9_.]+@${nonStrictDomain}`,
  "gi"
);

export const internationalizedEmailRegex = new RegExp(
  `[A-Za-z0-9_.]+@${internationalizedDomain}`,
  "gi"
);
export const nonStrictInternationalizedEmailRegex = new RegExp(
  `[A-Za-z0-9_.]+@${nonStrictInternationalizedDomain}`,
  "gi"
);

/**
 * Check whether a string is an email or not
 *
 * @export
 * @param {string} s A string
 * @param {boolean} enableIDN Enable or disable IDN extraction
 * @param {boolean} strictTLD Enable or disable strict TLD validation
 * @returns {boolean} return true if a string is a domain
 */
export function isEmail(
  s: string,
  enableIDN = true,
  strictTLD = true
): boolean {
  if (enableIDN && strictTLD) {
    return check(s, internationalizedEmailRegex);
  }
  if (enableIDN) {
    return check(s, nonStrictInternationalizedEmailRegex);
  }

  if (strictTLD) {
    return check(s, emailRegex);
  }
  return check(s, nonStrictEmailRegex);
}

const ipv4 =
  "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\[?\\.]?){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
export const ipv4Regex = new RegExp(ipv4, "gi");

/**
 * Check whether a string is an IPv4 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is an IPv4
 */
export function isIPv4(s: string): boolean {
  return check(s, ipv4Regex);
}

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

export const ipv6Regex = new RegExp(ipv6, "gi");

/**
 * Check whether a string is an IPv6 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is an IPv6
 */
export function isIPv6(s: string): boolean {
  return check(s, ipv6Regex);
}

const protocol = "(?:(?:https?)://)";
const auth = "(?:\\S+(?::\\S*)?@)?";
const port = "(?::\\d{2,5})?";
const path = '(?:[/?#][^\\s"]*)?';

const url = `(?:${protocol})${auth}(?:${domain}|localhost|${ipv4})${port}${path}`;
const nonStrictURL = `(?:${protocol})${auth}(?:${nonStrictDomain}|localhost|${ipv4})${port}${path}`;

const internationalizedURL = `(?:${protocol})${auth}(?:${internationalizedDomain}|localhost|${ipv4})${port}${path}`;
const nonStrictInternationalizedURL = `(?:${protocol})${auth}(?:${nonStrictInternationalizedDomain}|localhost|${ipv4})${port}${path}`;

export const urlRegex = new RegExp(url, "gi");
export const nonStrictURLRegex = new RegExp(nonStrictURL, "gi");

export const internationalizedURLRegex = new RegExp(internationalizedURL, "gi");
export const nonStrictInternationalizedURLRegex = new RegExp(
  nonStrictInternationalizedURL,
  "gi"
);

/**
 * Check whether a string is a URL or not
 *
 * @export
 * @param {string} s A string
 * @param {boolean} enableIDN Enable or disable IDN extraction
 * @param {boolean} strictTLD Enable or disable strict TLD validation
 * @returns {boolean} return true if a string is a URL
 */
export function isURL(s: string, enableIDN = true, strictTLD = true): boolean {
  if (enableIDN && strictTLD) {
    return check(s, internationalizedURLRegex);
  }
  if (enableIDN) {
    return check(s, nonStrictInternationalizedURLRegex);
  }

  if (strictTLD) {
    return check(s, urlRegex);
  }
  return check(s, nonStrictURLRegex);
}

export const cveRegex = /(CVE-(19|20)\d{2}-\d{4,7})/gi;

/**
 * Check whether a string is a CVE or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a CVE
 */
export function isCVE(s: string): boolean {
  return check(s, cveRegex);
}

export const btcRegex = /\b[13][a-km-zA-HJ-NP-Z0-9]{26,33}\b/gi;

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

export const xmrRegex = /\b4[0-9AB][1-9A-HJ-NP-Za-km-z]{93}\b/gi;

/**
 * Check whether a string is an XMR or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is an XMR
 */
export function isXMR(s: string): boolean {
  return check(s, xmrRegex);
}

export const gaPubIDRegex = /pub-\d{16}/gi;

/**
 * Check whether a string is a Google Adsense Publisher ID or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a Google Adsense Publisher ID
 */
export function isGAPubID(s: string): boolean {
  return check(s, gaPubIDRegex);
}

export const gaTrackIDRegex = /UA-\d{4,9}(-\d{1,2})?/gi;

/**
 * Check whether a string is a Google Analytics tracking ID or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a Google Analytics tracking ID
 */
export function isGATrackID(s: string): boolean {
  return check(s, gaTrackIDRegex);
}

export const macAddressRegex = /\b(?:[A-Fa-f0-9]{2}([-:]))(?:[A-Fa-f0-9]{2}\1){4}[A-Fa-f0-9]{2}\b/gi;

/**
 * Check whether a string is a mac address or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a mac address
 */
export function isMacAddress(s: string): boolean {
  return check(s, macAddressRegex);
}

export const ethRegex = /\b0x[a-fA-F0-9]{40}\b/gi;

/**
 * Check whether a string is an ETH address or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is an ETH address
 */
export function isETH(s: string): boolean {
  return check(s, ethRegex);
}
