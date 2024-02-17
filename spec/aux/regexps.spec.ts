import {
  asnRegex,
  btcRegex,
  cveRegExp,
  ethRegex,
  gaPubIDRegex,
  gaTrackIDRegex,
  macAddressRegex,
  md5Regex,
  sha1Regex,
  sha256Regex,
  sha512Regex,
  ssdeepRegex,
  xmrRegex,
} from "@/aux/regexes";

describe("md5Regex", () => {
  it("should match with all MD5 values in the input", () => {
    const input =
      "ad535056bf6318d5faf47d3abcc2b902\nhoge\na9c08de3a3c0cf353422f0f69f0e4e26";
    const matches = input.match(md5Regex);
    expect(matches).toEqual([
      "ad535056bf6318d5faf47d3abcc2b902",
      "a9c08de3a3c0cf353422f0f69f0e4e26",
    ]);
  });
});

describe("sha1Regex", () => {
  it("should match with all SHA1 values in the input", () => {
    const input =
      "a89ca560e2f0f3b081a3e7d0d91a2bcd4e2bdadb\n1a229aee30e0a4472772a2a96bc1dc75c8cd8568";
    const matches = input.match(sha1Regex);
    expect(matches).toEqual([
      "a89ca560e2f0f3b081a3e7d0d91a2bcd4e2bdadb",
      "1a229aee30e0a4472772a2a96bc1dc75c8cd8568",
    ]);
  });
});

describe("sha256Regex", () => {
  it("should match with all SHA256 values in the input", () => {
    const input =
      "9002a1d301adf6e0426af36a40c3c1b33db7891f3f7d93f1cf6e73fdbce0da1b\nbb89bfc8144ef401b671d4f9f34b296055e30bfd5c400fbef794f5c28b84ad0d";
    const matches = input.match(sha256Regex);
    expect(matches).toEqual([
      "9002a1d301adf6e0426af36a40c3c1b33db7891f3f7d93f1cf6e73fdbce0da1b",
      "bb89bfc8144ef401b671d4f9f34b296055e30bfd5c400fbef794f5c28b84ad0d",
    ]);
  });
});

describe("sha512Regex", () => {
  it("should match with all SHA512 values in the input", () => {
    const input =
      "5c815af2e56a9bcfa0751dc097321de9fbb074603d2dd12c00a4ea45ebc819310b9bc871872b27b20366b71e78f520b908f1ea4bd6458cedb748e5ea8a510f51\nf4d8b2044fbe715ccf04fbcfe3e04824a883236285bbcaec816ed520a1ae49ea0bdc3b8352e48c496b0910267e0037a0ca7c47a9f91f7f1b4f8e8eb4b6769717";
    const matches = input.match(sha512Regex);
    expect(matches).toEqual([
      "5c815af2e56a9bcfa0751dc097321de9fbb074603d2dd12c00a4ea45ebc819310b9bc871872b27b20366b71e78f520b908f1ea4bd6458cedb748e5ea8a510f51",
      "f4d8b2044fbe715ccf04fbcfe3e04824a883236285bbcaec816ed520a1ae49ea0bdc3b8352e48c496b0910267e0037a0ca7c47a9f91f7f1b4f8e8eb4b6769717",
    ]);
  });
});

describe("ssdeepRegex", () => {
  it("should match with all SSDEEP values in the input", () => {
    const input =
      "1536:gQA4ws6RTPdn1Jl19DzTIKu6VnGUNs+9Kf8r3Vf/WcnfYhLrJBew:uiEo/\n3:AXGBicFlgVNhBGcL6wCrFQEv:AXGHsNhxLsr2C";
    const matches = input.match(ssdeepRegex);
    expect(matches).toEqual([
      "1536:gQA4ws6RTPdn1Jl19DzTIKu6VnGUNs+9Kf8r3Vf/WcnfYhLrJBew:uiEo/",
      "3:AXGBicFlgVNhBGcL6wCrFQEv:AXGHsNhxLsr2C",
    ]);
  });
});

describe("asnRegex", () => {
  it("should match with all ASN values", () => {
    const input = "ASN13335 AS13334";
    const matches = input.match(asnRegex);
    expect(matches).toEqual(["ASN13335", "AS13334"]);
  });
});

describe("cveRegExp", () => {
  it("should match with all CVE values in the input", () => {
    const input = "foo bar CVE-2000-0001 baz";
    const matches = input.match(cveRegExp);
    expect(matches).toEqual(["CVE-2000-0001"]);
  });
});

describe("btcRegex", () => {
  it("should match with all BTC addresses in the input", () => {
    const input =
      "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa 3Gj9sY6PaBHdk44jktV7AXrktjMcDqnwV8 49VLRG6oXpBEHACpoTpNh23Y3fGxStciKq";
    const matches = input.match(btcRegex);
    expect(matches).toEqual([
      "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      "3Gj9sY6PaBHdk44jktV7AXrktjMcDqnwV8",
    ]);
  });
});

describe("xmrRegex", () => {
  it("should match with all XMR addresses in the input", () => {
    const input =
      "42CujFXn1HHiwrGW3Wuh8TASmo94dv3J8DZneS5NqBhaJVNi4qK32Zj3rgcDWsrxznP1qtjJFBKtHQCcbSCY996wMHHfvhw\n42UE32EZxHAWejXi3nQ3wpYGncQnbCw6LCMh8PkcFTn6XzQUUDco2pGSpR6AJHFK1jL8tYNYJnbg2DoKxVikYvC2DamnGBJ";
    const matches = input.match(xmrRegex);
    expect(matches).toEqual([
      "42CujFXn1HHiwrGW3Wuh8TASmo94dv3J8DZneS5NqBhaJVNi4qK32Zj3rgcDWsrxznP1qtjJFBKtHQCcbSCY996wMHHfvhw",
      "42UE32EZxHAWejXi3nQ3wpYGncQnbCw6LCMh8PkcFTn6XzQUUDco2pGSpR6AJHFK1jL8tYNYJnbg2DoKxVikYvC2DamnGBJ",
    ]);
  });
});

describe("ethRegex", () => {
  it("should match with an ETH address in the input", () => {
    const input = "0x4966db520b0680fc19df5d7774ca96f42e6abd4f";
    const matches = input.match(ethRegex);
    expect(matches).toEqual([input]);
  });
});

describe("gaTrackIDRegex", () => {
  it("should match with all Google Analytics Code values in the input", () => {
    const input = "foo bar UA-26296840-4 baz UA-1111111";
    const matches = input.match(gaTrackIDRegex);
    expect(matches).toEqual(["UA-26296840-4", "UA-1111111"]);
  });
});

describe("gaPubIDRegex", () => {
  it("should match with all Google Adsense Publisher ID values in the input", () => {
    const input = "foo bar pub-9107453047749393 baz pub-2324633754279327";
    const matches = input.match(gaPubIDRegex);
    expect(matches).toEqual(["pub-9107453047749393", "pub-2324633754279327"]);
  });
});

describe("macAddressRegex", () => {
  it("should match with MAC addresses in the input", () => {
    const input = "01:23:45:67:89:ab";
    const matches = input.match(macAddressRegex);
    expect(matches).toEqual([input]);
  });
});
