#!/usr/bin/env node
import { program } from "commander";
import * as getStdin from "get-stdin";

import { extractIOC, extractIOCAsync } from "../";
import { convertToSTIX2 } from "../stix2/stix2";

interface Options {
  stix2?: boolean;
  threads?: boolean;
  disableIdn?: boolean;
  disableStrictTld?: boolean;
}

(async (): Promise<void> => {
  const str = await getStdin();

  program
    .option("-s2, --stix2", "output in STIX2 format", false)
    .option("-t, --threads", "use threads", false)
    .option("--disable-idn", "disable IDN extraction", false)
    .option("--disable-strict-tld", "disable strict TLD validation", false);
  program.parse();

  const options = <Options>program;
  const threads = options.threads !== undefined ? options.threads : false;
  const stix2 = options.stix2 !== undefined ? options.stix2 : false;

  const disalbeIDN =
    options.disableIdn !== undefined ? options.disableIdn : false;
  const enableIDN = !disalbeIDN;

  const disableStrictTLD =
    options.disableStrictTld !== undefined ? options.disableStrictTld : false;
  const strictTLD = !disableStrictTLD;

  const ioc = threads
    ? await extractIOCAsync(str, enableIDN, strictTLD)
    : extractIOC(str, enableIDN, strictTLD);

  if (stix2) {
    const stix2Obj = convertToSTIX2(ioc);
    console.log(JSON.stringify(stix2Obj));
  } else {
    console.log(JSON.stringify(ioc));
  }
})();
