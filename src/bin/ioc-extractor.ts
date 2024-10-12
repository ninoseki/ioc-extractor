#!/usr/bin/env node
import { program } from "commander";
import getStdin from "get-stdin";

import { IOCKey, Options } from "@/types";

import { extractIOC, partialExtractIOC } from "../index";

type OnlyOptions = Options & Partial<{ only: IOCKey[] }>;

(async (): Promise<void> => {
  const input = (await getStdin()).trim();

  program
    .option("--no-strict", "Disable strict option")
    .option("--no-refang", "Disable refang option")
    .option("--no-sort", "Disable sort option")
    .option("-p, --punycode", "Enable punycode option")
    .option("-o, --only <types...>", "Show only specific IoC types");
  program.parse();

  const options = <OnlyOptions>program.opts();

  const ioc = options.only
    ? partialExtractIOC(input, options.only, options)
    : extractIOC(input, options);

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(ioc));
})();
