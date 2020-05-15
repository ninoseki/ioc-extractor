import { clean } from "./aux/auxiliary";
import {
  extractASN,
  extractBTC,
  extractCVE,
  extractDomain,
  extractEmail,
  extractGAPubID,
  extractGATrackID,
  extractIPv4,
  extractIPv6,
  extractMacAddress,
  extractMD5,
  extractSHA1,
  extractSHA256,
  extractSHA512,
  extractSSDEEP,
  extractURL,
  extractXMR,
} from "./aux/extractor";
import { convertToSTIX2, STIX2 } from "./stix2/stix2";

export declare interface IOC {
  asns: string[];
  btcs: string[];
  cves: string[];
  domains: string[];
  emails: string[];
  gaPubIDs: string[];
  gaTrackIDs: string[];
  ipv4s: string[];
  ipv6s: string[];
  macAddresses: string[];
  md5s: string[];
  sha1s: string[];
  sha256s: string[];
  sha512s: string[];
  ssdeeps: string[];
  urls: string[];
  xmrs: string[];
}

export class IOCExtractor {
  /**
   * Returns an IOC in data
   *
   * @static
   * @param {string} data A string
   * @returns {IOC}
   * @memberof IOCExtractor
   */
  public static getIOC(data: string): IOC {
    const extractor = new IOCExtractor(data);
    return extractor.getIOC();
  }

  private data: string;

  public constructor(data: string) {
    this.data = clean(data);
  }
  /**
   * Returns an IOC of the data
   *
   * @returns {IOC}
   * @memberof IOCExtractor
   */
  public getIOC(): IOC {
    const ioc: IOC = {
      asns: extractASN(this.data),
      btcs: extractBTC(this.data),
      cves: extractCVE(this.data),
      domains: extractDomain(this.data),
      emails: extractEmail(this.data),
      gaPubIDs: extractGAPubID(this.data),
      gaTrackIDs: extractGATrackID(this.data),
      ipv4s: extractIPv4(this.data),
      ipv6s: extractIPv6(this.data),
      macAddresses: extractMacAddress(this.data),
      md5s: extractMD5(this.data),
      sha1s: extractSHA1(this.data),
      sha256s: extractSHA256(this.data),
      sha512s: extractSHA512(this.data),
      ssdeeps: extractSSDEEP(this.data),
      urls: extractURL(this.data),
      xmrs: extractXMR(this.data),
    };
    return ioc;
  }
}
/**
 * Retuerns an IOC of data
 *
 * @export
 * @param {string} data A string
 * @returns {IOC}
 */
export function getIOC(data: string): IOC {
  return IOCExtractor.getIOC(data);
}
/**
 * Returns an IOC of data as STIX2 format
 *
 * @export
 * @param {string} data
 * @returns {STIX2}
 */
export function getSTIX2(data: string): STIX2 {
  const ioc = getIOC(data);
  return convertToSTIX2(ioc);
}
