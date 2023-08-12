import {
  isASN,
  isBTC,
  isCVE,
  isDomain,
  isEmail,
  isETH,
  isGAPubID,
  isGATrackID,
  isIPv4,
  isIPv6,
  isMacAddress,
  isMD5,
  isSHA1,
  isSHA256,
  isSHA512,
  isSSDEEP,
  isURL,
  isXMR,
} from "@/aux/validators";

describe("isMD5", () => {
  it.each([
    ["874058e8d8582bf85c115ce319c5b0af", true],
    ["874058e8d8582bf85c115ce319c5b0a", false],
  ])("checks whether a given value is MD5 or not", (string, expected) => {
    expect(isMD5(string)).toBe(expected);
  });
});

describe("isSHA1", () => {
  it("checks whether a given value is SHA256 or not", () => {
    expect(isSHA1("a89ca560e2f0f3b081a3e7d0d91a2bcd4e2bdadb")).toBe(true);
  });
});

describe("isSHA256", () => {
  it("checks whether a given value is SHA1 or not", () => {
    expect(
      isSHA256(
        "9002a1d301adf6e0426af36a40c3c1b33db7891f3f7d93f1cf6e73fdbce0da1b",
      ),
    ).toBe(true);
  });
});

describe("isSHA512", () => {
  it("checks whether a given value is SHA512 or not", () => {
    expect(
      isSHA512(
        "5c815af2e56a9bcfa0751dc097321de9fbb074603d2dd12c00a4ea45ebc819310b9bc871872b27b20366b71e78f520b908f1ea4bd6458cedb748e5ea8a510f51",
      ),
    ).toBe(true);
  });
});

describe("isSSDEEP", () => {
  it("checks whether a given value is SSDEEP or not", () => {
    expect(
      isSSDEEP(
        "1536:gQA4ws6RTPdn1Jl19DzTIKu6VnGUNs+9Kf8r3Vf/WcnfYhLrJBew:uiEo/",
      ),
    ).toBe(true);
  });
});

describe("isASN", () => {
  it("checks whether a given value is ANS or not", () => {
    expect(isASN("ASN13335")).toBe(true);
  });
});

describe("isDomain", () => {
  it.each([
    ["example.com", true, true],
    ["example.com", false, true],
    ["example.xn--zfr164b", true, true],
    ["example.xn--zfr164b", false, true],
    ["EXAMPLE.com", true, true],
    ["EXAMPLE.com", false, true],
    ["xn--example-6q4fyliikhk162btq3b2zd4y2o.jp", true, true],
    ["xn--example-6q4fyliikhk162btq3b2zd4y2o.jp", false, true],
    ["あ.com", true, true],
    ["あ.com", false, false],
    [".com", true, false],
    [".com", false, false],
  ])(
    "checks whether a given value is a domain or not",
    (string, enableIDN, expected) => {
      expect(isDomain(string, { enableIDN })).toBe(expected);
    },
  );

  it("checks a length of a domain", () => {
    // Labels must be 63 characters or less.
    expect(isDomain(`${"a".repeat(63)}.com`)).toBe(true);
    // do not check the length strictly
    expect(isDomain(`${"a".repeat(256)}.com`)).toBe(false);
  });
});

describe("isIPv4", () => {
  it("checks whether a given value is IPv4 or not", () => {
    expect(isIPv4("8.8.8.8")).toBe(true);
  });
});

describe("isIPv6", () => {
  it("checks whether a given value is IPv6 or not", () => {
    expect(isIPv6("fe80::d544:e71:3c17:7710%11")).toBe(true);
  });
});

describe("isEmail", () => {
  it("checks whether a given value is Email or not", () => {
    expect(isEmail("test@test.com")).toBe(true);
    expect(isEmail("foo-bar@test.com")).toBe(true);
    expect(isEmail("foo.bar@test.com")).toBe(true);
    expect(isEmail("foo#bar@test.com")).toBe(true);
  });
});

describe("isURL", () => {
  it.each([
    ["https://www.example.com/foo/bar?baz=1", true],
    ["https://111.111.111.111/foo/bar?baz=1", true],
  ])("checks whether a given value is URL or not", (string, expected) => {
    expect(isURL(string)).toBe(expected);
  });
});

describe("isCVE", () => {
  it.each([
    ["CVE-1800-0000", false],
    ["CVE-2016-0000", true],
    ["CVE-2100-0000", false],
    ["CVE-2016-00000", true],
    ["CVE-20100-0000", false],
  ])("checks whether a given value is CVE or not", (string, expected) => {
    expect(isCVE(string)).toBe(expected);
  });
});

describe("isBTC", () => {
  it("checks whether a given value is BTC or not", () => {
    expect(isBTC("1J6PYEzr4CUoGbnXrELyHszoTSz3wCsCaj")).toBe(true);
  });
});

describe("isXMR", () => {
  it("checks whether a given value is XMR or not", () => {
    expect(
      isXMR(
        "48Fki6gnEN1QaiWNcsm8dVfX2JMg8xmjiQvuKpcdUD9rQH8WU4AXj9HKAF5AdnhKPSPLzTV7CX1Ks25BWrDeLnHuEFmhRxV",
      ),
    ).toBe(true);
  });
});

describe("isGATrackID", () => {
  it.each([
    ["UA-26296840-4", true],
    ["UA-26296840", true],
  ])("checks whether a given value is GATrackID or not", (string, expected) => {
    expect(isGATrackID(string)).toBe(expected);
  });
});

describe("isGAPubID", () => {
  it("checks whether a given value is GAPubID or not", () => {
    expect(isGAPubID("pub-9107453047749393")).toBe(true);
  });
});

describe("isMacAddress", () => {
  it("checks whether a given value is mac address or not", () => {
    expect(isMacAddress("01-23-45-67-89-ab")).toBe(true);
  });
});

describe("isETH", () => {
  it("checks whether a given value is an ETH address or not", () => {
    expect(isETH("0x4966db520b0680fc19df5d7774ca96f42e6abd4f")).toBe(true);
  });
});
