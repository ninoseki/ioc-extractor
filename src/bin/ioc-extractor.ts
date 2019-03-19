#!/usr/bin/env node
import * as getStdin from "get-stdin";
import { getIOC } from "../";

getStdin().then(str => {
  const ioc = getIOC(str);
  console.log(JSON.stringify(ioc));
});
