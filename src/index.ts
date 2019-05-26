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
  extractMD5,
  extractSHA1,
  extractSHA256,
  extractSHA512,
  extractSSDEEP,
  extractURL,
  extractXMR,
} from "./aux/extractor";

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
  md5s: string[];
  sha1s: string[];
  sha256s: string[];
  sha512s: string[];
  ssdeeps: string[];
  urls: string[];
  xmrs: string[];
}

export class IOCExtractor {
  public static getIOC(data: string): IOC {
    const extractor = new IOCExtractor(data);
    return extractor.getIOC();
  }

  private data: string;

  public constructor(data: string) {
    this.data = clean(data);
  }

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

export function getIOC(data: string): IOC {
  return IOCExtractor.getIOC(data);
}
