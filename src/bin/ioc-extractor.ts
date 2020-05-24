#!/usr/bin/env node
import * as getStdin from "get-stdin";

import { getIOC, getSTIX2 } from "../";

function exportAsSTIX2(): boolean {
  if (process.argv.length !== 3) {
    return false;
  }

  const argv = process.argv[2];
  return argv === "--stix2";
}

getStdin().then((str) => {
  const ioc = exportAsSTIX2() ? getSTIX2(str) : getIOC(str);
  console.log(JSON.stringify(ioc));
});
