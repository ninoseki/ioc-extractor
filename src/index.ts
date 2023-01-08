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
import { normalizeOptions, refang } from "./aux/utils";
import { convertToSTIX2, STIX2 } from "./stix2";
import type { IOC, Options } from "./types";

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
  refang,
};

export type { IOC, Options };

export class IOCExtractor {
  /**
   * Returns an IOC in data
   *
   * @static
   * @param {string} data A string
   * @param {Options} options
   * @returns {IOC}
   * @memberof IOCExtractor
   */
  public static extractIOC(
    data: string,
    options: Options = { enableIDN: true, strictTLD: true, enableRefang: true }
  ): IOC {
    const extractor = new IOCExtractor(data);
    return extractor.extractIOC(options);
  }

  private data: string;

  public constructor(data: string) {
    this.data = data;
  }

  /**
   * Returns an IOC of the data
   *
   * @returns {IOC}
   * @param {Options} options
   * @memberof IOCExtractor
   */
  public extractIOC(
    options: Options = { enableIDN: true, strictTLD: true, enableRefang: true }
  ): IOC {
    const normalizedOptions = normalizeOptions(options);
    const normalizedData = normalizedOptions.enableRefang
      ? refang(this.data)
      : this.data;

    const ioc: IOC = {
      asns: extractASNs(normalizedData),
      btcs: extractBTCs(normalizedData),
      cves: extractCVEs(normalizedData),
      domains: extractDomains(normalizedData, normalizedOptions),
      emails: extractEmails(normalizedData, normalizedOptions),
      eths: extractETHs(normalizedData),
      gaPubIDs: extractGAPubIDs(normalizedData),
      gaTrackIDs: extractGATrackIDs(normalizedData),
      ipv4s: extractIPv4s(normalizedData),
      ipv6s: extractIPv6s(normalizedData),
      macAddresses: extractMacAddresses(normalizedData),
      md5s: extractMD5s(normalizedData),
      sha1s: extractSHA1s(normalizedData),
      sha256s: extractSHA256s(normalizedData),
      sha512s: extractSHA512s(normalizedData),
      ssdeeps: extractSSDEEPs(normalizedData),
      urls: extractURLs(normalizedData, normalizedOptions),
      xmrs: extractXMRs(normalizedData),
    };
    return ioc;
  }
}

/**
 * Returns an IOC of data
 *
 * @export
 * @param {string} data A string
 * @param {Options} options
 * @returns {IOC}
 */
export function extractIOC(
  data: string,
  options: Options = { enableIDN: true, strictTLD: true, enableRefang: true }
): IOC {
  return IOCExtractor.extractIOC(data, options);
}

/**
 * Returns an IOC of data as STIX2 format
 *
 * @export
 * @param {string} data
 * @param {Options} options
 * @returns {STIX2}
 */
export function extractSTIX2(
  data: string,
  options: Options = { enableIDN: true, strictTLD: true, enableRefang: true }
): STIX2 {
  const ioc = extractIOC(data, options);
  return convertToSTIX2(ioc);
}
