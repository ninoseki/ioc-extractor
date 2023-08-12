#!/usr/bin/env node
import { program } from "commander";
import getStdin from "get-stdin";

import { extractIOC } from "../index";

interface Options {
  threads?: boolean;
  disableIdn?: boolean;
  disableStrictTld?: boolean;
  disableRefang?: boolean;
}

(async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  const str = await getStdin();

  program
    .option("--disable-idn", "disable IDN extraction", false)
    .option("--disable-strict-tld", "disable strict TLD validation", false)
    .option("--disable-refang", "disable refang", false);
  program.parse();

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const options = <Options>program.opts();

  const disableIDN =
    options.disableIdn !== undefined ? options.disableIdn : false;
  const enableIDN = !disableIDN;

  const disableStrictTLD =
    options.disableStrictTld !== undefined ? options.disableStrictTld : false;
  const strictTLD = !disableStrictTLD;

  const disableRefang =
    options.disableRefang !== undefined ? options.disableRefang : false;
  const enableRefang = !disableRefang;

  const ioc = extractIOC(str, { enableIDN, strictTLD, enableRefang });

  console.log(JSON.stringify(ioc));
})();
