import {
  asnRegex,
  btcRegex,
  cveRegex,
  domainRegex,
  emailRegex,
  gaPubIDRegex,
  gaTrackIDRegex,
  ipv4Regex,
  ipv6Regex,
  isASN,
  isBTC,
  isCVE,
  isDomain,
  isEmail,
  isGAPubID,
  isGATrackID,
  isIPv4,
  isIPv6,
  isMD5,
  isSHA1,
  isSHA256,
  isSHA512,
  isSSDEEP,
  isURL,
  isXMR,
  macAddressRegex,
  md5Regex,
  sha1Regex,
  sha256Regex,
  sha512Regex,
  ssdeepRegex,
  urlRegex,
  xmrRegex,
  isMacAddress,
} from "../aux/regexs";

describe("isMD5", () => {
  it("checks whther a given value is MD5 or not", () => {
    expect(isMD5("874058e8d8582bf85c115ce319c5b0af")).toBe(true);
    expect(isMD5("874058e8d8582bf85c115ce319c5b0a")).toBe(false);
  });
});

describe("isSHA1", () => {
  it("checks whther a given value is SHA256 or not", () => {
    expect(isSHA1("a89ca560e2f0f3b081a3e7d0d91a2bcd4e2bdadb")).toBe(true);
  });
});

describe("isSHA256", () => {
  it("checks whther a given value is SHA1 or not", () => {
    expect(
      isSHA256(
        "9002a1d301adf6e0426af36a40c3c1b33db7891f3f7d93f1cf6e73fdbce0da1b"
      )
    ).toBe(true);
  });
});

describe("isSHA512", () => {
  it("checks whther a given value is SHA512 or not", () => {
    expect(
      isSHA512(
        "5c815af2e56a9bcfa0751dc097321de9fbb074603d2dd12c00a4ea45ebc819310b9bc871872b27b20366b71e78f520b908f1ea4bd6458cedb748e5ea8a510f51"
      )
    ).toBe(true);
  });
});

describe("isSSDEEP", () => {
  it("checks whther a given value is SSDEEP or not", () => {
    expect(
      isSSDEEP(
        "1536:gQA4ws6RTPdn1Jl19DzTIKu6VnGUNs+9Kf8r3Vf/WcnfYhLrJBew:uiEo/"
      )
    ).toBe(true);
  });
});

describe("isASN", () => {
  it("checks whther a given value is ANS or not", () => {
    expect(isASN("ASN13335")).toBe(true);
  });
});

describe("isDomain", () => {
  it("checks whther a given value is Domain or not", () => {
    expect(isDomain("example.com")).toBe(true);
  });
});

describe("isIPv4", () => {
  it("checks whther a given value is IPv4 or not", () => {
    expect(isIPv4("8.8.8.8")).toBe(true);
  });
});

describe("isIPv6", () => {
  it("checks whther a given value is IPv6 or not", () => {
    expect(isIPv6("fe80::d544:e71:3c17:7710%11")).toBe(true);
  });
});

describe("isEmail", () => {
  it("checks whther a given value is Email or not", () => {
    expect(isEmail("test@test.com")).toBe(true);
  });
});

describe("isURL", () => {
  it("checks whther a given value is URL or not", () => {
    expect(isURL("https://www.example.com/foo/bar?baz=1")).toBe(true);
    expect(isURL("https://111.111.111.111/foo/bar?baz=1")).toBe(true);
  });
});

describe("isCVE", () => {
  it("checks whther a given value is CVE or not", () => {
    expect(isCVE("CVE-1800-0000")).toBe(false);
    expect(isCVE("CVE-2016-0000")).toBe(true);
    expect(isCVE("CVE-2100-0000")).toBe(false);
    expect(isCVE("CVE-2016-00000")).toBe(true);
    expect(isCVE("CVE-20100-0000")).toBe(false);
  });
});

describe("isBTC", () => {
  it("checks whther a given value is BTC or not", () => {
    expect(isBTC("1J6PYEzr4CUoGbnXrELyHszoTSz3wCsCaj")).toBe(true);
  });
});

describe("isXMR", () => {
  it("checks whther a given value is XMR or not", () => {
    expect(
      isXMR(
        "48Fki6gnEN1QaiWNcsm8dVfX2JMg8xmjiQvuKpcdUD9rQH8WU4AXj9HKAF5AdnhKPSPLzTV7CX1Ks25BWrDeLnHuEFmhRxV"
      )
    ).toBe(true);
  });
});

describe("isGATrackID", () => {
  it("checks whther a given value is GATrackID or not", () => {
    expect(isGATrackID("UA-26296840-4")).toBe(true);
    expect(isGATrackID("UA-26296840")).toBe(true);
  });
});

describe("isGAPubID", () => {
  it("checks whther a given value is GAPubID or not", () => {
    expect(isGAPubID("pub-9107453047749393")).toBe(true);
  });
});

describe("isMacAddress", () => {
  it("checks whther a given value is mac address or not", () => {
    expect(isMacAddress("01-23-45-67-89-ab")).toBe(true);
  });
});

describe("hashRegexs", () => {
  it("should match with all md5 values in the input", () => {
    const input =
      "ad535056bf6318d5faf47d3abcc2b902\nhoge\na9c08de3a3c0cf353422f0f69f0e4e26";
    const matches = input.match(md5Regex)!;
    expect(matches.length).toBe(2);
    expect(matches[0]).toBe("ad535056bf6318d5faf47d3abcc2b902");
  });

  it("should match with all sha1 values in the input", () => {
    const input =
      "a89ca560e2f0f3b081a3e7d0d91a2bcd4e2bdadb\n1a229aee30e0a4472772a2a96bc1dc75c8cd8568";
    const matches = input.match(sha1Regex)!;
    expect(matches.length).toBe(2);
    expect(matches[0]).toBe("a89ca560e2f0f3b081a3e7d0d91a2bcd4e2bdadb");
  });

  it("should match with all sha256 values in the input", () => {
    const input =
      "9002a1d301adf6e0426af36a40c3c1b33db7891f3f7d93f1cf6e73fdbce0da1b\nbb89bfc8144ef401b671d4f9f34b296055e30bfd5c400fbef794f5c28b84ad0d";
    const matches = input.match(sha256Regex)!;
    expect(matches.length).toBe(2);
    expect(matches[0]).toBe(
      "9002a1d301adf6e0426af36a40c3c1b33db7891f3f7d93f1cf6e73fdbce0da1b"
    );
  });

  it("should match with all sha512 values in the input", () => {
    const input =
      "5c815af2e56a9bcfa0751dc097321de9fbb074603d2dd12c00a4ea45ebc819310b9bc871872b27b20366b71e78f520b908f1ea4bd6458cedb748e5ea8a510f51\nf4d8b2044fbe715ccf04fbcfe3e04824a883236285bbcaec816ed520a1ae49ea0bdc3b8352e48c496b0910267e0037a0ca7c47a9f91f7f1b4f8e8eb4b6769717";
    const matches = input.match(sha512Regex)!;
    expect(matches.length).toBe(2);
    expect(matches[0]).toBe(
      "5c815af2e56a9bcfa0751dc097321de9fbb074603d2dd12c00a4ea45ebc819310b9bc871872b27b20366b71e78f520b908f1ea4bd6458cedb748e5ea8a510f51"
    );
  });

  it("should match with all ssdeep values in the input", () => {
    const input =
      "1536:gQA4ws6RTPdn1Jl19DzTIKu6VnGUNs+9Kf8r3Vf/WcnfYhLrJBew:uiEo/\n3:AXGBicFlgVNhBGcL6wCrFQEv:AXGHsNhxLsr2C";
    const matches = input.match(ssdeepRegex)!;
    expect(matches.length).toBe(2);
    expect(matches[0]).toBe(
      "1536:gQA4ws6RTPdn1Jl19DzTIKu6VnGUNs+9Kf8r3Vf/WcnfYhLrJBew:uiEo/"
    );
  });
});

describe("networkRegexes", () => {
  it("should match with all asn values", () => {
    const input = "ASN13335 AS13334";
    const matches = input.match(asnRegex)!;
    expect(matches.length).toBe(2);
    expect(matches[0]).toBe("ASN13335");
    expect(matches[1]).toBe("AS13334");
  });

  it("should match with all domain values", () => {
    const input = "test.co.jp\ngitlab.com\ntest.exe\ndev.test.co.jp";
    const matches = input.match(domainRegex)!;
    expect(matches.length).toBe(3);
    expect(matches[0]).toBe("test.co.jp");
    expect(matches[1]).toBe("gitlab.com");
    expect(matches[2]).toBe("dev.test.co.jp");
  });

  it("should match with all email values", () => {
    const input = "test@test.co.jp\ntest@test.com\nhoge@hoge";
    const matches = input.match(emailRegex)!;
    expect(matches.length).toBe(2);
    expect(matches[0]).toBe("test@test.co.jp");
  });

  it("should match with all ipv4 values", () => {
    const input = "8.8.8.8\n127.0.0.1";
    const matches = input.match(ipv4Regex)!;
    expect(matches.length).toBe(2);
    expect(matches[0]).toBe("8.8.8.8");
  });

  it("should match with all ipv6 values", () => {
    const input =
      " 2001:0db8:85a3:0000:0000:8a2e:0370:7334\n fe80::d544:e71:3c17:7710%11";
    const matches = input.match(ipv6Regex)!;
    expect(matches.length).toBe(2);
    expect(matches[0]).toBe("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
  });

  it("should match with all url values", () => {
    const input =
      "https://test.co.jp\nhttps://google.com\nhttps://111.111.111.111/test.jsp\nwww.example.com";
    const matches = input.match(urlRegex)!;
    expect(matches.length).toBe(3);
    expect(matches[0]).toBe("https://test.co.jp");
  });
});

describe("utilityRegexs", () => {
  it("should match with all CVE values in the input", () => {
    const input = "foo bar CVE-2000-0001 baz";
    const matches = input.match(cveRegex)!;
    expect(matches.length).toBe(1);
    expect(matches[0]).toBe("CVE-2000-0001");
  });
});

describe("cryptocurrenciesRegexs", () => {
  it("should match with all BTC addresses in the input", () => {
    const input =
      "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa 3Gj9sY6PaBHdk44jktV7AXrktjMcDqnwV8 49VLRG6oXpBEHACpoTpNh23Y3fGxStciKq";
    const matches = input.match(btcRegex)!;
    expect(matches.length).toBe(2);
    expect(matches[0]).toBe("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
  });
  it("should match with all XMR addresses in the input", () => {
    const input =
      "42CujFXn1HHiwrGW3Wuh8TASmo94dv3J8DZneS5NqBhaJVNi4qK32Zj3rgcDWsrxznP1qtjJFBKtHQCcbSCY996wMHHfvhw\n42UE32EZxHAWejXi3nQ3wpYGncQnbCw6LCMh8PkcFTn6XzQUUDco2pGSpR6AJHFK1jL8tYNYJnbg2DoKxVikYvC2DamnGBJ";
    const matches = input.match(xmrRegex)!;
    expect(matches.length).toBe(2);
    expect(matches[0]).toBe(
      "42CujFXn1HHiwrGW3Wuh8TASmo94dv3J8DZneS5NqBhaJVNi4qK32Zj3rgcDWsrxznP1qtjJFBKtHQCcbSCY996wMHHfvhw"
    );
  });
});

describe("trackerRegex", () => {
  it("should match with all Google Analytics Code values in the input", () => {
    const input = "foo bar UA-26296840-4 baz UA-1111111";
    const matches = input.match(gaTrackIDRegex)!;
    expect(matches.length).toBe(2);
    expect(matches[0]).toBe("UA-26296840-4");
    expect(matches[1]).toBe("UA-1111111");
  });
  it("should match with all Google Adsense Publisher ID values in the input", () => {
    const input = "foo bar pub-9107453047749393 baz pub-2324633754279327";
    const matches = input.match(gaPubIDRegex)!;
    expect(matches.length).toBe(2);
    expect(matches[0]).toBe("pub-9107453047749393");
    expect(matches[1]).toBe("pub-2324633754279327");
  });
});

describe("macAddressRegex", () => {
  it("should match with mac addresses in the input", () => {
    const input = "01:23:45:67:89:ab";
    const matches = input.match(macAddressRegex)!;
    expect(matches.length).toBe(1);
    expect(matches[0]).toBe(input);
  });
});
