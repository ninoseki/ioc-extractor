import {
  extractASN,
  extractASNs,
  extractBTC,
  extractBTCs,
  extractCVE,
  extractCVEs,
  extractDomain,
  extractDomains,
  extractEmail,
  extractEmails,
  extractETH,
  extractETHs,
  extractGAPubID,
  extractGAPubIDs,
  extractGATrackID,
  extractGATrackIDs,
  extractIPv4,
  extractIPv4s,
  extractIPv6,
  extractIPv6s,
  extractMacAddress,
  extractMacAddresses,
  extractMD5,
  extractMD5s,
  extractSHA1,
  extractSHA1s,
  extractSHA256,
  extractSHA256s,
  extractSHA512,
  extractSHA512s,
  extractSSDEEP,
  extractSSDEEPs,
  extractURL,
  extractURLs,
  extractXMR,
  extractXMRs,
} from "./aux/extractors";
import { refang, unicodeToASCII } from "./aux/utils";
import {
  isASN,
  isBTC,
  isCVE,
  isDomain,
  isEmail,
  isETH,
  isGAPubID,
  isGATrackID,
  isIPv4,
  isIPv6,
  isMacAddress,
  isMD5,
  isSHA1,
  isSHA256,
  isSHA512,
  isSSDEEP,
  isURL,
  isXMR,
} from "./aux/validators";
import type { IOC, IOCKey, Options } from "./types";

export {
  extractASN,
  extractASNs,
  extractBTC,
  extractBTCs,
  extractCVE,
  extractCVEs,
  extractDomain,
  extractDomains,
  extractEmail,
  extractEmails,
  extractETH,
  extractETHs,
  extractGAPubID,
  extractGAPubIDs,
  extractGATrackID,
  extractGATrackIDs,
  extractIPv4,
  extractIPv4s,
  extractIPv6,
  extractIPv6s,
  extractMacAddress,
  extractMacAddresses,
  extractMD5,
  extractMD5s,
  extractSHA1,
  extractSHA1s,
  extractSHA256,
  extractSHA256s,
  extractSHA512,
  extractSHA512s,
  extractSSDEEP,
  extractSSDEEPs,
  extractURL,
  extractURLs,
  extractXMR,
  extractXMRs,
  isASN,
  isBTC,
  isCVE,
  isDomain,
  isEmail,
  isETH,
  isGAPubID,
  isGATrackID,
  isIPv4,
  isIPv6,
  isMacAddress,
  isMD5,
  isSHA1,
  isSHA256,
  isSHA512,
  isSSDEEP,
  isURL,
  isXMR,
  refang,
  unicodeToASCII,
};

export type { IOC, Options };

export class IOCExtractor {
  private s: string;

  public constructor(s: string) {
    this.s = s;
  }

  /**
   * Extract IoCs from a string
   *
   * @returns {IOC}
   * @param {Options} options
   * @memberof IOCExtractor
   */
  public extractIOC(
    options: Options = {
      strict: true,
      refang: true,
      punycode: false,
      sort: true,
    },
  ): IOC {
    // Apply refang
    let normalized = options.refang ? refang(this.s) : this.s;
    // Apply punycode conversion
    normalized = options.punycode
      ? unicodeToASCII(normalized, {
          ignoreInvalidPunycode: true,
          transitionalProcessing: true,
        })
      : normalized;

    const ioc: IOC = {
      asns: extractASNs(normalized, options),
      btcs: extractBTCs(normalized, options),
      cves: extractCVEs(normalized, options),
      domains: extractDomains(normalized, options),
      emails: extractEmails(normalized, options),
      eths: extractETHs(normalized, options),
      gaPubIDs: extractGAPubIDs(normalized, options),
      gaTrackIDs: extractGATrackIDs(normalized, options),
      ipv4s: extractIPv4s(normalized, options),
      ipv6s: extractIPv6s(normalized, options),
      macAddresses: extractMacAddresses(normalized, options),
      md5s: extractMD5s(normalized, options),
      sha1s: extractSHA1s(normalized, options),
      sha256s: extractSHA256s(normalized, options),
      sha512s: extractSHA512s(normalized, options),
      ssdeeps: extractSSDEEPs(normalized, options),
      urls: extractURLs(normalized, options),
      xmrs: extractXMRs(normalized, options),
    };
    return ioc;
  }

  /**
   * Partially extract IoCs a string
   *
   * @returns {IOC}
   * @param {IOCKey[]} only
   * @param {Options} options
   * @memberof IOCExtractor
   */
  public partialExtractIOC(
    only: IOCKey[],
    options: Options = {
      strict: true,
      refang: true,
      punycode: false,
      sort: true,
    },
  ): Partial<IOC> {
    // Apply refang
    let normalized = options.refang ? refang(this.s) : this.s;
    // Apply punycode conversion
    normalized = options.punycode
      ? unicodeToASCII(normalized, {
          ignoreInvalidPunycode: true,
          transitionalProcessing: true,
        })
      : normalized;

    const funcByType = {
      asns: extractASNs,
      btcs: extractBTCs,
      cves: extractCVEs,
      domains: extractDomains,
      emails: extractEmails,
      eths: extractETHs,
      gaPubIDs: extractGAPubIDs,
      gaTrackIDs: extractGATrackIDs,
      ipv4s: extractIPv4s,
      ipv6s: extractIPv6s,
      macAddresses: extractMacAddresses,
      md5s: extractMD5s,
      sha1s: extractSHA1s,
      sha256s: extractSHA256s,
      sha512s: extractSHA512s,
      ssdeeps: extractSSDEEPs,
      urls: extractURLs,
      xmrs: extractXMRs,
    };

    return Object.fromEntries(
      only.map((key) => [key, funcByType[key](normalized, options)]),
    ) as Partial<IOC>;
  }
}

/**
 * Extract IoCs from a string
 *
 * @export
 * @param {string} s A string
 * @param {Options} options
 * @returns {IOC}
 */
export function extractIOC(
  s: string,
  options: Options = {
    strict: true,
    refang: true,
    punycode: false,
    sort: true,
  },
): IOC {
  return new IOCExtractor(s).extractIOC(options);
}

/**
 * Partially extract IoCs from a string
 *
 * @export
 * @param {string} s A string
 * @param {Options} options
 * @returns {IOC}
 */
export function partialExtractIOC(
  s: string,
  only: IOCKey[],
  options: Options = {
    strict: true,
    refang: true,
    punycode: false,
    sort: true,
  },
): Partial<IOC> {
  return new IOCExtractor(s).partialExtractIOC(only, options);
}
