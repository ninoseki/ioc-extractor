import { v4 as uuidv4 } from "uuid";

import type { IOC } from "../index";

export interface Indicator {
  type: string;
  id: string;
  created: string;
  modified: string;
  labels: string[];
  pattern: string;
  valid_from: string;
}

type SPEC_VERSION = "2.0";
type SPEC_TYPE = "bundle";

export interface STIX2 {
  spec_version: SPEC_VERSION;
  type: SPEC_TYPE;
  objects: Indicator[];
}

type PATTERN_TYPE =
  | "ipv4-addr"
  | "ipv6-addr"
  | "domain-name"
  | "url"
  | "email-addr"
  | "md5"
  | "sha1"
  | "sha256"
  | "sha512";

export function isHash(patternType: PATTERN_TYPE): boolean {
  return ["md5", "sha1", "sha256", "sha512"].includes(patternType);
}

export function convertToPattern(
  patternType: PATTERN_TYPE,
  value: string
): string {
  if (isHash(patternType)) {
    return `[file:hashes.${patternType} = '${value}']`;
  }

  return `[${patternType}:value = '${value}']`;
}

export function convertToObject(
  patternType: PATTERN_TYPE,
  value: string,
  timestamp: string
): Indicator {
  const type = "indicator";
  const id = `${type}--${uuidv4()}`;
  const labels = ["malicious-activity"];
  const pattern = convertToPattern(patternType, value);

  const indicator: Indicator = {
    type: type,
    id: id,
    created: timestamp,
    modified: timestamp,
    labels: labels,
    pattern: pattern,
    valid_from: timestamp,
  };
  return indicator;
}

export function convertToSTIX2(ioc: IOC): STIX2 {
  const timestamp = new Date(Date.now()).toISOString();
  let objects: Indicator[] = [];
  objects = objects.concat(
    ioc.ipv4s.map((i) => convertToObject("ipv4-addr", i, timestamp))
  );
  objects = objects.concat(
    ioc.ipv6s.map((i) => convertToObject("ipv6-addr", i, timestamp))
  );
  objects = objects.concat(
    ioc.domains.map((i) => convertToObject("domain-name", i, timestamp))
  );
  objects = objects.concat(
    ioc.urls.map((i) => convertToObject("url", i, timestamp))
  );
  objects = objects.concat(
    ioc.emails.map((i) => convertToObject("email-addr", i, timestamp))
  );
  objects = objects.concat(
    ioc.md5s.map((i) => convertToObject("md5", i, timestamp))
  );
  objects = objects.concat(
    ioc.sha1s.map((i) => convertToObject("sha1", i, timestamp))
  );
  objects = objects.concat(
    ioc.sha256s.map((i) => convertToObject("sha256", i, timestamp))
  );
  objects = objects.concat(
    ioc.sha512s.map((i) => convertToObject("sha512", i, timestamp))
  );

  return { spec_version: "2.0", type: "bundle", objects: objects };
}
