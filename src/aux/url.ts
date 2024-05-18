import { StrictOptions } from "@/types";

import { domainRegex } from "./domain";
import { ipRegex } from "./ip";

export function urlRegex(
  options: StrictOptions = {
    strict: true,
  },
): RegExp {
  const domainPart = domainRegex(options).source;

  const path = '(?:[/?#][^\\s"]*)?';
  const protocol = "(?:(?:https?)://)";
  const auth = "(?:\\S+(?::\\S*)?@)?";
  const port = "(?::\\d{2,5})?";

  const regex = `(?:${protocol})${auth}(?:${domainPart}|localhost|${ipRegex.v4().source})${port}${path}`;

  return new RegExp(regex, "gi");
}
