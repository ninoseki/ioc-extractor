import { dedup, sortByValue } from "./auxiliary";
import { cryptocurrencyRegexs, fileRegexs, hashRegexs, networkRegexs, trackerRegexs, utilityRegexs } from "./regexs";

export function extractMD5(s: string): string[] {
  return matchesWithRegexp(s, hashRegexs.md5);
}

export function extractSHA1(s: string): string[] {
  return matchesWithRegexp(s, hashRegexs.sha1);
}

export function extractSHA256(s: string): string[] {
  return matchesWithRegexp(s, hashRegexs.sha256);
}

export function extractSHA512(s: string): string[] {
  return matchesWithRegexp(s, hashRegexs.sha512);
}

export function extractSSDEEP(s: string): string[] {
  return matchesWithRegexp(s, hashRegexs.ssdeep);
}

export function extractASN(s: string): string[] {
  return matchesWithRegexp(s, networkRegexs.asn);
}

export function extractDomain(s: string): string[] {
  return matchesWithRegexp(s, networkRegexs.domain);
}

export function extractEmail(s: string): string[] {
  return matchesWithRegexp(s, networkRegexs.email);
}

export function extractIPv4(s: string): string[] {
  return matchesWithRegexp(s, networkRegexs.ipv4);
}

export function extractIPv6(s: string): string[] {
  return matchesWithRegexp(s, networkRegexs.ipv6);
}

export function extractURL(s: string): string[] {
  return matchesWithRegexp(s, networkRegexs.url);
}

export function extractDoc(s: string): string[] {
  return matchesWithRegexp(s, fileRegexs.doc);
}

export function extractExe(s: string): string[] {
  return matchesWithRegexp(s, fileRegexs.exe);
}

export function extractFlash(s: string): string[] {
  return matchesWithRegexp(s, fileRegexs.flash);
}

export function extractImg(s: string): string[] {
  return matchesWithRegexp(s, fileRegexs.img);
}

export function extractMac(s: string): string[] {
  return matchesWithRegexp(s, fileRegexs.mac);
}

export function extractWeb(s: string): string[] {
  return matchesWithRegexp(s, fileRegexs.web);
}

export function extractZip(s: string): string[] {
  return matchesWithRegexp(s, fileRegexs.zip);
}

export function extractCVE(s: string): string[] {
  return matchesWithRegexp(s, utilityRegexs.cve);
}

export function extractBTC(s: string): string[] {
  return matchesWithRegexp(s, cryptocurrencyRegexs.btc);
}

export function extractXMR(s: string): string[] {
  return matchesWithRegexp(s, cryptocurrencyRegexs.xmr);
}

export function extractGAPubID(s: string): string[] {
  return matchesWithRegexp(s, trackerRegexs.gaPubID);
}

export function extractGATrackID(s: string): string[] {
  return matchesWithRegexp(s, trackerRegexs.gaTrackID);
}

function matchesWithRegexp(s: string, regex: RegExp): string[] {
  const matched = s.match(regex);
  return matched === null ? [] : sortByValue(dedup(matched));
}
