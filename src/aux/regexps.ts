import { tldRegExpString } from "./tlds";

export const md5RegExp = /\b[A-Fa-f0-9]{32}\b/g;
export const sha1RegExp = /\b[A-Fa-f0-9]{40}\b/g;
export const sha256RegExp = /\b[A-Fa-f0-9]{64}\b/g;
export const sha512RegExp = /\b[A-Fa-f0-9]{128}\b/g;
export const ssdeepRegExp = /\b\d{1,}:[A-Za-z0-9/+]{3,}:[A-Za-z0-9/+]{3,}/g;

export const asnRegExp = /(AS|ASN)\d+/gi;

// Each label can have 63 bytes
const idnLabelLetters = "a-z0-9\\u00a1-\\uffff";
const idnOneOrMoreLabel = `[${idnLabelLetters}]{1,63}`;
const idnZeroOrMoreLabelWithHyphen = `[${idnLabelLetters}-]{0,63}`;
const idnTwoOrMoreLabelWithHyphen = `[${idnLabelLetters}-]{2,63}`;
const idnPrefix = "xn--";

const internationalizedDomainRegExpString = `((${idnOneOrMoreLabel}|${idnPrefix})((?!.{0,63}--)${idnZeroOrMoreLabelWithHyphen}[${idnLabelLetters}])?\\.)+(${tldRegExpString})\\b`;
export const internationalizedDomainRegExp = new RegExp(
  internationalizedDomainRegExpString,
  "gi"
);

const nonStrictInternationalizedDomainRegExpString = `((${idnOneOrMoreLabel}|${idnPrefix})((?!.{0,63}--)${idnZeroOrMoreLabelWithHyphen}[${idnLabelLetters}])?\\.)+(?:${idnTwoOrMoreLabelWithHyphen})\\b`;
export const nonStrictInternationalizedDomainRegExp = new RegExp(
  nonStrictInternationalizedDomainRegExpString,
  "gi"
);

const labelLetters = "a-z0-9";
const oneOrMoreLabel = `[${labelLetters}]{1,63}`;
const zeroOrMoreLabelWithHyphen = `[${labelLetters}-]{0,63}`;
const twoOrMoreLabelWithHyphen = `[${labelLetters}-]{2,}`;

const domainRegExpString = `((${oneOrMoreLabel}|${idnPrefix})((?!.{0,63}--)${zeroOrMoreLabelWithHyphen}[${labelLetters}])?\\.)+(${tldRegExpString})\\b`;
export const domainRegExp = new RegExp(domainRegExpString, "gi");

const nonStrictDomainRegExpString = `((${oneOrMoreLabel}|${idnPrefix})((?!.{0,63}--)${zeroOrMoreLabelWithHyphen}[${labelLetters}])?\\.)+(?:${twoOrMoreLabelWithHyphen})`;
export const nonStrictDomainRegExp = new RegExp(
  nonStrictDomainRegExpString,
  "gi"
);

const localPart = "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+";

export const emailRegExp = new RegExp(
  `${localPart}@${domainRegExpString}`,
  "gi"
);
export const nonStrictEmailRegExp = new RegExp(
  `${localPart}@${nonStrictDomainRegExpString}`,
  "gi"
);
export const internationalizedEmailRegExp = new RegExp(
  `${localPart}@${internationalizedDomainRegExpString}`,
  "gi"
);
export const nonStrictInternationalizedEmailRegExp = new RegExp(
  `${localPart}@${nonStrictInternationalizedDomainRegExpString}`,
  "gi"
);

const ipv4RegExpString =
  "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}";
export const ipv4RegExp = new RegExp(ipv4RegExpString, "gi");

const v6seg = "[a-fA-F\\d]{1,4}";
const ipv6RegExpString = `
(
(?:${v6seg}:){7}(?:${v6seg}|:)|                                // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:${v6seg}:){6}(?:${ipv4RegExpString}|:${v6seg}|:)|                         // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:${v6seg}:){5}(?::${ipv4RegExpString}|(:${v6seg}){1,2}|:)|                 // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:${v6seg}:){4}(?:(:${v6seg}){0,1}:${ipv4RegExpString}|(:${v6seg}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:${v6seg}:){3}(?:(:${v6seg}){0,2}:${ipv4RegExpString}|(:${v6seg}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:${v6seg}:){2}(?:(:${v6seg}){0,3}:${ipv4RegExpString}|(:${v6seg}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:${v6seg}:){1}(?:(:${v6seg}){0,4}:${ipv4RegExpString}|(:${v6seg}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::((?::${v6seg}){0,5}:${ipv4RegExpString}|(?::${v6seg}){1,7}|:))           // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(%[0-9a-zA-Z]{1,})?                                           // %eth0            %1
`
  .replace(/\s*\/\/.*$/gm, "")
  .replace(/\n/g, "")
  .trim();
export const ipv6RegExp = new RegExp(ipv6RegExpString, "gi");

const protocol = "(?:(?:https?)://)";
const auth = "(?:\\S+(?::\\S*)?@)?";
const port = "(?::\\d{2,5})?";
const path = '(?:[/?#][^\\s"]*)?';

const urlRegExpString = `(?:${protocol})${auth}(?:${domainRegExpString}|localhost|${ipv4RegExpString})${port}${path}`;
export const urlRegExp = new RegExp(urlRegExpString, "gi");

const nonStrictURLRegExpString = `(?:${protocol})${auth}(?:${nonStrictDomainRegExpString}|localhost|${ipv4RegExpString})${port}${path}`;
export const nonStrictURLRegExp = new RegExp(nonStrictURLRegExpString, "gi");

const internationalizedURLRegExpString = `(?:${protocol})${auth}(?:${internationalizedDomainRegExpString}|localhost|${ipv4RegExpString})${port}${path}`;
export const internationalizedURLRegExp = new RegExp(
  internationalizedURLRegExpString,
  "gi"
);

const nonStrictInternationalizedURLRegExpString = `(?:${protocol})${auth}(?:${nonStrictInternationalizedDomainRegExpString}|localhost|${ipv4RegExpString})${port}${path}`;
export const nonStrictInternationalizedURLRegExp = new RegExp(
  nonStrictInternationalizedURLRegExpString,
  "gi"
);

export const cveRegExp = /(CVE-(19|20)\d{2}-\d{4,7})/gi;

export const btcRegExp = /\b[13][a-km-zA-HJ-NP-Z0-9]{26,33}\b/g;
export const xmrRegExp = /\b4[0-9AB][1-9A-HJ-NP-Za-km-z]{93}\b/g;
export const ethRegExp = /\b0x[a-fA-F0-9]{40}\b/g;

export const gaPubIDRegExp = /pub-\d{16}/gi;
export const gaTrackIDRegExp = /UA-\d{4,9}(-\d{1,2})?/gi;

export const macAddressRegExp =
  /\b(?:[A-Fa-f0-9]{2}([-:]))(?:[A-Fa-f0-9]{2}\1){4}[A-Fa-f0-9]{2}\b/g;
