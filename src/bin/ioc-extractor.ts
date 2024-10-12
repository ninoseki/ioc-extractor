#!/usr/bin/env node
import { program } from "commander";
import getStdin from "get-stdin";

import { extractIOC, Options } from "../index";

(async (): Promise<void> => {
  const input = (await getStdin()).trim();

  program
    .option("--no-strict", "Disable strict option")
    .option("--no-refang", "Disable refang option")
    .option("--no-sort", "Disable sort option")
    .option("-p, --punycode", "Enable punycode option");
  program.parse();

  const options = <Options>program.opts();
  const ioc = extractIOC(input, options);

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(ioc));
})();
