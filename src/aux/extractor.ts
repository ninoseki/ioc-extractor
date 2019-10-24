import { dedup, sortByValue } from "./auxiliary";
import {
  asnRegex,
  btcRegex,
  cveRegex,
  domainRegex,
  emailRegex,
  gaPubIDRegex,
  gaTrackIDRegex,
  ipv4Regex,
  ipv6Regex,
  macAddressRegex,
  md5Regex,
  sha1Regex,
  sha256Regex,
  sha512Regex,
  ssdeepRegex,
  urlRegex,
  xmrRegex,
} from "./regexes";

function matchesWithRegexp(s: string, regex: RegExp): string[] {
  const matched = s.match(regex);
  return matched === null ? [] : sortByValue(dedup(matched));
}

export function extractMD5(s: string): string[] {
  return matchesWithRegexp(s, md5Regex);
}

export function extractSHA1(s: string): string[] {
  return matchesWithRegexp(s, sha1Regex);
}

export function extractSHA256(s: string): string[] {
  return matchesWithRegexp(s, sha256Regex);
}

export function extractSHA512(s: string): string[] {
  return matchesWithRegexp(s, sha512Regex);
}

export function extractSSDEEP(s: string): string[] {
  return matchesWithRegexp(s, ssdeepRegex);
}

export function extractASN(s: string): string[] {
  return matchesWithRegexp(s, asnRegex);
}

export function extractDomain(s: string): string[] {
  return matchesWithRegexp(s, domainRegex);
}

export function extractEmail(s: string): string[] {
  return matchesWithRegexp(s, emailRegex);
}

export function extractIPv4(s: string): string[] {
  return matchesWithRegexp(s, ipv4Regex);
}

export function extractIPv6(s: string): string[] {
  return matchesWithRegexp(s, ipv6Regex);
}

export function extractURL(s: string): string[] {
  return matchesWithRegexp(s, urlRegex);
}

export function extractCVE(s: string): string[] {
  return matchesWithRegexp(s, cveRegex);
}

export function extractBTC(s: string): string[] {
  return matchesWithRegexp(s, btcRegex);
}

export function extractXMR(s: string): string[] {
  return matchesWithRegexp(s, xmrRegex);
}

export function extractGAPubID(s: string): string[] {
  return matchesWithRegexp(s, gaPubIDRegex);
}

export function extractGATrackID(s: string): string[] {
  return matchesWithRegexp(s, gaTrackIDRegex);
}

export function extractMacAddress(s: string): string[] {
  return matchesWithRegexp(s, macAddressRegex);
}
