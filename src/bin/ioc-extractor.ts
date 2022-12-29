#!/usr/bin/env node
import { program } from "commander";
import getStdin from "get-stdin";

import { extractIOC } from "../index.js";
import { convertToSTIX2 } from "../stix2/stix2.js";

interface Options {
  stix2?: boolean;
  threads?: boolean;
  disableIdn?: boolean;
  disableStrictTld?: boolean;
  disableRefang?: boolean;
}

(async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  const str = await getStdin();

  program
    .option("-s2, --stix2", "output in STIX2 format", false)
    .option("--disable-idn", "disable IDN extraction", false)
    .option("--disable-strict-tld", "disable strict TLD validation", false)
    .option("--disable-refang", "disable refang", false);
  program.parse();

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const options = <Options>program.opts();
  const stix2 = options.stix2 !== undefined ? options.stix2 : false;

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

  if (stix2) {
    const stix2Obj = convertToSTIX2(ioc);
    console.log(JSON.stringify(stix2Obj));
  } else {
    console.log(JSON.stringify(ioc));
  }
})();
