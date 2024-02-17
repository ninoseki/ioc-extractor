import { domainRegex } from "./domain";

type Options = Partial<{
  strict: boolean;
}>;

export function emailRegex(
  options: Options = {
    strict: true,
  },
): RegExp {
  const domainPart = domainRegex(options).source;
  const localPart = "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+";
  const regex = `${localPart}@${domainPart}`;
  return new RegExp(regex, "ig");
}
