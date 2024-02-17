#!/usr/bin/env node
import { program } from "commander";
import getStdin from "get-stdin";

import { extractIOC, Options } from "../index";

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

  const ioc = extractIOC(str, options);

  console.log(JSON.stringify(ioc));
})();
