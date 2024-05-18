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
  const regex = `((${idnPrefix}${zeroOrMoreLabel}|${oneOrMoreLabel})((?!.{0,63}--)${zeroOrMoreLabelWithHyphen}[${labelLetters}])?\\.)+(${tld})\\b`;
  return new RegExp(regex, "gi");
}
