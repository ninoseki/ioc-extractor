import { LRUCache } from "lru-cache";

import { StrictOptions } from "@/types";

import {
  idnPrefix,
  labelLetters,
  nonStrictTld,
  oneOrMoreLabel,
  strictTld,
  zeroOrMoreLabel,
  zeroOrMoreLabelWithHyphen,
} from "./regexes";

const domainRegexCache = new LRUCache<boolean, RegExp>({ max: 2 });

function buildDomainRegex(strict: boolean): RegExp {
  const tld = strict ? strictTld : nonStrictTld;
  const regex =
    `(?=[${labelLetters}.\\-]{1,252}\\.(${tld})\\b)` +
    `((${idnPrefix}${zeroOrMoreLabel}|${oneOrMoreLabel})((?!.{0,63}--)${zeroOrMoreLabelWithHyphen}[${labelLetters}])?\\.)+(${tld})\\b`;
  const result = new RegExp(regex, "gi");
  domainRegexCache.set(strict, result);
  return result;
}

export function domainRegex(
  options: StrictOptions = {
    strict: true,
  },
): RegExp {
  const strict = options.strict ?? true;
  return domainRegexCache.get(strict) ?? buildDomainRegex(strict);
}
