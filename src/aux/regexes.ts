import tlds from "tlds";
import url from "url";

import { dedup } from "./utils";

const normalizedTlds = dedup(
  tlds.concat(tlds.map((x) => url.domainToASCII(x))),
);

export const idnLabelLetters = "a-z0-9\\u00a1-\\uffff";
export const idnOneOrMoreLabel = `[${idnLabelLetters}]{1,63}`;
export const idnZeroOrMoreLabelWithHyphen = `[${idnLabelLetters}-]{0,63}`;
export const idnPrefix = "xn--";

export const nonStrictTld = "(?:[a-z\\u00a1-\\uffff]{2,})";
export const strictTld = `(?:${normalizedTlds.sort((a, b) => b.length - a.length).join("|")})`;
export const port = "(?::\\d{2,5})?";

export const asnRegex = /(AS|ASN)\d+/gi;
export const btcRegex = /\b[13][a-km-zA-HJ-NP-Z0-9]{26,33}\b/g;
export const cveRegExp = /(CVE-(19|20)\d{2}-\d{4,7})/gi;
export const ethRegex = /\b0x[a-fA-F0-9]{40}\b/g;
export const gaPubIDRegex = /pub-\d{16}/gi;
export const gaTrackIDRegex = /UA-\d{4,9}(-\d{1,2})?/gi;
export const macAddressRegex =
  /\b(?:[A-Fa-f0-9]{2}([-:]))(?:[A-Fa-f0-9]{2}\1){4}[A-Fa-f0-9]{2}\b/g;
export const md5Regex = /\b[A-Fa-f0-9]{32}\b/g;
export const sha1Regex = /\b[A-Fa-f0-9]{40}\b/g;
export const sha256Regex = /\b[A-Fa-f0-9]{64}\b/g;
export const sha512Regex = /\b[A-Fa-f0-9]{128}\b/g;
export const ssdeepRegex = /\b\d{1,}:[A-Za-z0-9/+]{3,}:[A-Za-z0-9/+]{3,}/g;
export const xmrRegex = /\b4[0-9AB][1-9A-HJ-NP-Za-km-z]{93}\b/g;
