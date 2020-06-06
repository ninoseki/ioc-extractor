#!/usr/bin/env node
import * as getStdin from "get-stdin";

import { extractIOC, extractSTIX2 } from "../";

function exportAsSTIX2(): boolean {
  if (process.argv.length !== 3) {
    return false;
  }

  const argv = process.argv[2];
  return argv === "--stix2";
}

(async (): Promise<void> => {
  const str = await getStdin();
  const ioc = exportAsSTIX2() ? extractSTIX2(str) : extractIOC(str);
  console.log(JSON.stringify(ioc));
})();
