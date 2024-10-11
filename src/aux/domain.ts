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

export function domainRegex(
  options: StrictOptions = {
    strict: true,
  },
): RegExp {
  const tld = options.strict ? strictTld : nonStrictTld;
  const regex =
    `(?=[${labelLetters}.\\-]{1,252}\\.(${tld})\\b)` +
    `((${idnPrefix}${zeroOrMoreLabel}|${oneOrMoreLabel})((?!.{0,63}--)${zeroOrMoreLabelWithHyphen}[${labelLetters}])?\\.)+(${tld})\\b`;
  return new RegExp(regex, "gi");
}
