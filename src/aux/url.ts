import { domainRegex } from "./domain";
import { ipRegex } from "./ip";

type Options = Partial<{
  strict: boolean;
  localhost: boolean;
  parens: boolean;
  apostrophes: boolean;
  trailingPeriod: boolean;
  ipv4: boolean;
  ipv6: boolean;
}>;

export function urlRegex(
  options: Options = {
    strict: true,
    parens: false,
    apostrophes: false,
    trailingPeriod: false,
    ipv4: true,
    ipv6: true,
  },
): RegExp {
  const domainPart = domainRegex(options).source;

  let disallowedChars = '\\s"';
  if (!options.parens) {
    disallowedChars += "\\)";
  }
  if (!options.apostrophes) {
    disallowedChars += "'";
  }
  const path = options.trailingPeriod
    ? `(?:[/?#][^${disallowedChars}]*)?`
    : `(?:(?:[/?#][^${disallowedChars}]*[^${disallowedChars}.?!])|[/])?`;

  const protocol = "(?:(?:https?)://)";
  const auth = "(?:\\S+(?::\\S*)?@)?";
  const port = "(?::\\d{2,5})?";

  const regex = `(?:${protocol})${auth}(?:${domainPart}|localhost|${ipRegex.v4().source})${port}${path}`;

  return new RegExp(regex, "ig");
}
