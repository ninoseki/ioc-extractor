import memoize from "memoizee";

import { getTLDRegExpString } from "./tlds";

export const getMD5RegExp = (): RegExp => {
  return /\b[A-Fa-f0-9]{32}\b/g;
};

export const getSHA1RegExp = (): RegExp => {
  return /\b[A-Fa-f0-9]{40}\b/g;
};

export const getSHA256RegExp = (): RegExp => {
  return /\b[A-Fa-f0-9]{64}\b/g;
};

export const getSHA512RegExp = (): RegExp => {
  return /\b[A-Fa-f0-9]{128}\b/g;
};

export const getSSDEEPRegExp = (): RegExp => {
  return /\b\d{1,}:[A-Za-z0-9/+]{3,}:[A-Za-z0-9/+]{3,}/g;
};

export const getASNRegExp = (): RegExp => {
  return /(AS|ASN)\d+/gi;
};

const _getInternationalizedDomainRegExpString = (): string => {
  const tld = getTLDRegExpString();
  return `(([a-z0-9\\u00a1-\\uffff]{1,63}|xn--)((?!.{0,63}--)[a-z0-9\\u00a1-\\uffff-]{0,63}[a-z0-9\\u00a1-\\uffff])?\\.)+(${tld})\\b`;
};

const getInternationalizedDomainRegExpString = memoize(
  _getInternationalizedDomainRegExpString
);

export const getInternationalizedDomainRegExp = (): RegExp => {
  const internationalizedDomain = getInternationalizedDomainRegExpString();
  return new RegExp(internationalizedDomain, "gi");
};

const getNonStrictInternationalizedDomainRegExpString = () => {
  return "(([a-z0-9\\u00a1-\\uffff]{1,63}|xn--)((?!.{0,63}--)[a-z0-9\\u00a1-\\uffff-]{0,63}[a-z0-9\\u00a1-\\uffff])?\\.)+(?:[a-z0-9\\u00a1-\\uffff-]{2,63})\\b";
};

export const getNonStrictInternationalizedDomainRegExp = (): RegExp => {
  const nonStrictInternationalizedDomain =
    getNonStrictInternationalizedDomainRegExpString();
  return new RegExp(nonStrictInternationalizedDomain, "gi");
};

const _getDomainRegExpString = (): string => {
  const tld = getTLDRegExpString();
  return `(([a-z0-9]{1,63}|xn--)((?!.{0,63}--)[a-z0-9-]{0,63}[a-z0-9])?\\.)+(${tld})\\b`;
};

const getDomainRegExpString = memoize(_getDomainRegExpString);

export const getDomainRegExp = (): RegExp => {
  const domain = getDomainRegExpString();
  return new RegExp(domain, "gi");
};

const getNonStrictDomainRegExpString = (): string => {
  return "(([a-z0-9]{1,63}|xn--)((?!.{0,63}--)[a-z0-9-]{0,63}[a-z0-9])?\\.)+(?:[a-z-]{2,})";
};

export const getNonStrictDomainRegExp = (): RegExp => {
  const nonStrictDomain = getNonStrictDomainRegExpString();
  return new RegExp(nonStrictDomain, "gi");
};

const localPart = "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+";

export const getEmailRegExp = (): RegExp => {
  const domain = getDomainRegExpString();
  return new RegExp(`${localPart}@${domain}`, "gi");
};

export const getNonStrictEmailRegExp = (): RegExp => {
  const nonStrictDomain = getNonStrictDomainRegExpString();
  return new RegExp(`${localPart}@${nonStrictDomain}`, "gi");
};

export const getInternationalizedEmailRegExp = (): RegExp => {
  const internationalizedDomain = getInternationalizedDomainRegExpString();
  return new RegExp(`${localPart}@${internationalizedDomain}`, "gi");
};

export const getNonStrictInternationalizedEmailRegExp = (): RegExp => {
  const nonStrictInternationalizedDomain =
    getNonStrictInternationalizedDomainRegExpString();
  return new RegExp(`${localPart}@${nonStrictInternationalizedDomain}`, "gi");
};

export const getIPv4RegExpString = (): string => {
  return "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}";
};

export const getIPv4RegExp = (): RegExp => {
  const ipv4 = getIPv4RegExpString();
  return new RegExp(ipv4, "gi");
};

const _getIPv6RegExpString = (): string => {
  const ipv4 = getIPv4RegExpString();
  const v6seg = "[a-fA-F\\d]{1,4}";
  const ipv6 = `
(
(?:${v6seg}:){7}(?:${v6seg}|:)|                                // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:${v6seg}:){6}(?:${ipv4}|:${v6seg}|:)|                         // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:${v6seg}:){5}(?::${ipv4}|(:${v6seg}){1,2}|:)|                 // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:${v6seg}:){4}(?:(:${v6seg}){0,1}:${ipv4}|(:${v6seg}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:${v6seg}:){3}(?:(:${v6seg}){0,2}:${ipv4}|(:${v6seg}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:${v6seg}:){2}(?:(:${v6seg}){0,3}:${ipv4}|(:${v6seg}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:${v6seg}:){1}(?:(:${v6seg}){0,4}:${ipv4}|(:${v6seg}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::((?::${v6seg}){0,5}:${ipv4}|(?::${v6seg}){1,7}|:))           // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(%[0-9a-zA-Z]{1,})?                                           // %eth0            %1
`
    .replace(/\s*\/\/.*$/gm, "")
    .replace(/\n/g, "")
    .trim();
  return ipv6;
};

const getIPv6RegExpString = memoize(_getIPv6RegExpString);

export const getIPv6RegExp = (): RegExp => {
  const ipv6 = getIPv6RegExpString();
  return new RegExp(ipv6, "gi");
};

const protocol = "(?:(?:https?)://)";
const auth = "(?:\\S+(?::\\S*)?@)?";
const port = "(?::\\d{2,5})?";
const path = '(?:[/?#][^\\s"]*)?';

export const getURLRegExp = (): RegExp => {
  const domain = getDomainRegExpString();
  const ipv4 = getIPv4RegExpString();
  const url = `(?:${protocol})${auth}(?:${domain}|localhost|${ipv4})${port}${path}`;
  return new RegExp(url, "gi");
};

export const getNonStrictURLRegExp = (): RegExp => {
  const nonStrictDomain = getNonStrictDomainRegExpString();
  const ipv4 = getIPv4RegExpString();
  const nonStrictURL = `(?:${protocol})${auth}(?:${nonStrictDomain}|localhost|${ipv4})${port}${path}`;
  return new RegExp(nonStrictURL, "gi");
};

export const getInternationalizedURLRegExp = (): RegExp => {
  const internationalizedDomain = getInternationalizedDomainRegExpString();
  const ipv4 = getIPv4RegExpString();
  const internationalizedURL = `(?:${protocol})${auth}(?:${internationalizedDomain}|localhost|${ipv4})${port}${path}`;
  return new RegExp(internationalizedURL, "gi");
};

export const getNonStrictInternationalizedURLRegExp = (): RegExp => {
  const nonStrictInternationalizedDomain =
    getNonStrictInternationalizedDomainRegExpString();
  const ipv4 = getIPv4RegExpString();
  const nonStrictInternationalizedURL = `(?:${protocol})${auth}(?:${nonStrictInternationalizedDomain}|localhost|${ipv4})${port}${path}`;
  return new RegExp(nonStrictInternationalizedURL, "gi");
};

export const getCVERegExp = (): RegExp => {
  return /(CVE-(19|20)\d{2}-\d{4,7})/gi;
};

export const getBTCRegExp = (): RegExp => {
  return /\b[13][a-km-zA-HJ-NP-Z0-9]{26,33}\b/g;
};

export const getXMRRegExp = (): RegExp => {
  return /\b4[0-9AB][1-9A-HJ-NP-Za-km-z]{93}\b/g;
};

export const getGAPubIDRegExp = (): RegExp => {
  return /pub-\d{16}/gi;
};

export const getGATrackIDRegExp = (): RegExp => {
  return /UA-\d{4,9}(-\d{1,2})?/gi;
};

export const getMACAddressRegExp = (): RegExp => {
  return /\b(?:[A-Fa-f0-9]{2}([-:]))(?:[A-Fa-f0-9]{2}\1){4}[A-Fa-f0-9]{2}\b/g;
};

export const getETHRegExp = (): RegExp => {
  return /\b0x[a-fA-F0-9]{40}\b/g;
};
