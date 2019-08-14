import { tldRegexString } from "./tlds";

function check(s: string, regex: RegExp): boolean {
  if (s.match(regex)) {
    return true;
  }
  return false;
}

export const md5Regex = /\b[A-Fa-f0-9]{32}\b/gi;
export function isMD5(s: string): boolean {
  return check(s, md5Regex);
}

export const sha1Regex = /\b[A-Fa-f0-9]{40}\b/gi;
export function isSHA1(s: string): boolean {
  return check(s, sha1Regex);
}

export const sha256Regex = /\b[A-Fa-f0-9]{64}\b/gi;
export function isSHA256(s: string): boolean {
  return check(s, sha256Regex);
}

export const sha512Regex = /\b[A-Fa-f0-9]{128}\b/gi;
export function isSHA512(s: string): boolean {
  return check(s, sha512Regex);
}

export const ssdeepRegex = /\b\d{1,}:[A-Za-z0-9/+]{3,}:[A-Za-z0-9/+]{3,}/gi;
export function isSSDEEP(s: string): boolean {
  return check(s, ssdeepRegex);
}

export const asnRegex = /(AS|ASN)\d+/gi;
export function isASN(s: string): boolean {
  return check(s, asnRegex);
}

export const domainRegex = new RegExp(
  `([A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*\\.(${tldRegexString})\\b)`,
  "ig"
);
export function isDomain(s: string): boolean {
  return check(s, domainRegex);
}

export const emailRegex = new RegExp(
  `[A-Za-z0-9_.]+@([A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*\\.(${tldRegexString})\\b)`,
  "ig"
);
export function isEmail(s: string): boolean {
  return check(s, emailRegex);
}

export const ipv4Regex = /(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\[?\.\]?){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/gi;
export function isIPv4(s: string): boolean {
  return check(s, ipv4Regex);
}

export const ipv6Regex = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/gi;
export function isIPv6(s: string): boolean {
  return check(s, ipv6Regex);
}

export const urlRegex = /(?:(?:https?):\/\/)(?:\S+(?::\S*)?@)??(?:localhost|(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#][^\s"]*)?/gi;
export function isURL(s: string): boolean {
  return check(s, urlRegex);
}

export const cveRegex = /(CVE-(19|20)\d{2}-\d{4,7})/gi;
export function isCVE(s: string): boolean {
  return check(s, cveRegex);
}

export const btcRegex = /\b[13][a-km-zA-HJ-NP-Z0-9]{26,33}\b/gi;
export function isBTC(s: string): boolean {
  return check(s, btcRegex);
}

export const xmrRegex = /\b4[0-9AB][1-9A-HJ-NP-Za-km-z]{93}\b/gi;
export function isXMR(s: string): boolean {
  return check(s, xmrRegex);
}

export const gaPubIDRegex = /pub-\d{16}/gi;
export function isGAPubID(s: string): boolean {
  return check(s, gaPubIDRegex);
}

export const gaTrackIDRegex = /UA-\d{4,9}(-\d{1,2})?/gi;
export function isGATrackID(s: string): boolean {
  return check(s, gaTrackIDRegex);
}
