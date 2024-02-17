import {
  idnLabelLetters,
  idnOneOrMoreLabel,
  idnPrefix,
  idnZeroOrMoreLabelWithHyphen,
  nonStrictTld,
  strictTld,
} from "./regexes";

type Options = Partial<{
  strict: boolean;
  localhost: boolean;
}>;

export function domainRegex(
  options: Options = {
    strict: true,
  },
): RegExp {
  const tld = options.strict ? strictTld : nonStrictTld;
  const regex = `((${idnOneOrMoreLabel}|${idnPrefix})((?!.{0,63}--)${idnZeroOrMoreLabelWithHyphen}[${idnLabelLetters}])?\\.)+(${tld})\\b`;
  return new RegExp(regex, "ig");
}
