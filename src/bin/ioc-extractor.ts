#!/usr/bin/env node
import { program } from "commander";
import getStdin from "get-stdin";

import { extractIOC, Options } from "../index";

(async (): Promise<void> => {
  const input = (await getStdin()).trim();

  program
    .option("-ns, --no-strict", "Disable strict option")
    .option("-nr, --no-refang", "Disable refang option")
    .option("-p, --punycode", "Enable punycode option");
  program.parse();

  const options = <Options>program.opts();
  const ioc = extractIOC(input, options);

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(ioc));
})();
