import { StrictOptions } from "@/types";

import { domainRegex } from "./domain";

export function emailRegex(
  options: StrictOptions = {
    strict: true,
  },
): RegExp {
  const domainPart = domainRegex(options).source;
  const localPart = "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+";
  const regex = `${localPart}@${domainPart}`;
  return new RegExp(regex, "ig");
}
