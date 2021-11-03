import { Options } from "..";

export function normalizeOptions(options: Options): Options {
  const strictTLD = options.strictTLD !== undefined ? options.strictTLD : true;
  const enableIDN = options.enableIDN !== undefined ? options.enableIDN : true;
  return { strictTLD, enableIDN };
}
