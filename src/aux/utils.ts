import type { Options } from "../types";

export function normalizeOptions(options: Options): Options {
  const strictTLD = options.strictTLD !== undefined ? options.strictTLD : true;
  const enableIDN = options.enableIDN !== undefined ? options.enableIDN : true;
  const enableRefang =
    options.enableRefang !== undefined ? options.enableRefang : true;
  return { strictTLD, enableIDN, enableRefang };
}
