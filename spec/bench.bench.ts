import { bench, describe } from "vitest";

import { extractIOC } from "@/index";

const MIXED_INPUT =
  "1.1.1[.]1 2.2.2 . 2 google(.)com テスト.example.com https://www.google[.]com http://テスト.example.com f6f8179ac71eaabff12b8c024342109b 275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f UA-26296840-4 test@テスト.example.com example.nope CVE-2021-44228 AS13335 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa 0x4966db520b0680fc19df5d7774ca96f42e6abd4f";

describe("extractIOC", () => {
  bench("strict mode", () => {
    extractIOC(MIXED_INPUT, { strict: true });
  });

  bench("non-strict mode", () => {
    extractIOC(MIXED_INPUT, { strict: false });
  });
});
