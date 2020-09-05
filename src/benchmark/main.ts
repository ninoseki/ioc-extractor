/* eslint-disable @typescript-eslint/no-floating-promises */
import benny from "benny";

import { refang } from "../aux/auxiliary";

const input = "1.1.1[.]1 2.2.2 . 2 google(.)com https://www.google[.]com";

benny.suite(
  "Refang",

  benny.add("refang", () => {
    refang(input);
  }),

  benny.cycle(),
  benny.complete(),
  benny.save({ file: "refang", format: "chart.html" })
);
