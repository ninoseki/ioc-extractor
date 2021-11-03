import { expose } from "threads/worker";

import { Options } from "..";
import {
  extractASNs,
  extractBTCs,
  extractCVEs,
  extractDomains,
  extractEmails,
  extractETHs,
  extractGAPubIDs,
  extractGATrackIDs,
  extractIPv4s,
  extractIPv6s,
  extractMacAddresses,
  extractMD5s,
  extractSHA1s,
  extractSHA256s,
  extractSHA512s,
  extractSSDEEPs,
  extractURLs,
  extractXMRs,
} from "../aux/extractor";

const extractor = {
  extractASNs(text: string): string[] {
    return extractASNs(text);
  },
  extractBTCs(text: string): string[] {
    return extractBTCs(text);
  },
  extractCVEs(text: string): string[] {
    return extractCVEs(text);
  },
  extractDomains(text: string, options: Options): string[] {
    return extractDomains(text, options);
  },
  extractEmails(text: string, options: Options): string[] {
    return extractEmails(text, options);
  },
  extractETHs(text: string): string[] {
    return extractETHs(text);
  },
  extractGAPubIDs(text: string): string[] {
    return extractGAPubIDs(text);
  },
  extractGATrackIDs(text: string): string[] {
    return extractGATrackIDs(text);
  },
  extractIPv4s(text: string): string[] {
    return extractIPv4s(text);
  },
  extractIPv6s(text: string): string[] {
    return extractIPv6s(text);
  },
  extractMacAddresses(text: string): string[] {
    return extractMacAddresses(text);
  },
  extractMD5s(text: string): string[] {
    return extractMD5s(text);
  },
  extractSHA1s(text: string): string[] {
    return extractSHA1s(text);
  },
  extractSHA256s(text: string): string[] {
    return extractSHA256s(text);
  },
  extractSHA512s(text: string): string[] {
    return extractSHA512s(text);
  },
  extractSSDEEPs(text: string): string[] {
    return extractSSDEEPs(text);
  },
  extractURLs(text: string, options: Options): string[] {
    return extractURLs(text, options);
  },
  extractXMRs(text: string): string[] {
    return extractXMRs(text);
  },
};

export type Extractor = typeof extractor;

expose(extractor);
