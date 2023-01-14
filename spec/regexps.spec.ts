/* eslint-disable @typescript-eslint/prefer-regexp-exec, jest/no-conditional-expect */
import {
  asnRegExp,
  btcRegExp,
  cveRegExp,
  domainRegExp,
  emailRegExp,
  ethRegExp,
  gaPubIDRegExp,
  gaTrackIDRegExp,
  internationalizedURLRegExp,
  ipv4RegExp,
  ipv6RegExp,
  macAddressRegExp,
  md5RegExp,
  sha1RegExp,
  sha256RegExp,
  sha512RegExp,
  ssdeepRegExp,
  urlRegExp,
  xmrRegExp,
} from "@/aux/regexps";

describe("hash RegExps", () => {
  it("should match with all md5 values in the input", () => {
    const input =
      "ad535056bf6318d5faf47d3abcc2b902\nhoge\na9c08de3a3c0cf353422f0f69f0e4e26";
    const matches = input.match(md5RegExp);
    expect(matches).toEqual([
      "ad535056bf6318d5faf47d3abcc2b902",
      "a9c08de3a3c0cf353422f0f69f0e4e26",
    ]);
  });

  it("should match with all sha1 values in the input", () => {
    const input =
      "a89ca560e2f0f3b081a3e7d0d91a2bcd4e2bdadb\n1a229aee30e0a4472772a2a96bc1dc75c8cd8568";
    const matches = input.match(sha1RegExp);
    expect(matches).toEqual([
      "a89ca560e2f0f3b081a3e7d0d91a2bcd4e2bdadb",
      "1a229aee30e0a4472772a2a96bc1dc75c8cd8568",
    ]);
  });

  it("should match with all sha256 values in the input", () => {
    const input =
      "9002a1d301adf6e0426af36a40c3c1b33db7891f3f7d93f1cf6e73fdbce0da1b\nbb89bfc8144ef401b671d4f9f34b296055e30bfd5c400fbef794f5c28b84ad0d";
    const matches = input.match(sha256RegExp);
    expect(matches).toEqual([
      "9002a1d301adf6e0426af36a40c3c1b33db7891f3f7d93f1cf6e73fdbce0da1b",
      "bb89bfc8144ef401b671d4f9f34b296055e30bfd5c400fbef794f5c28b84ad0d",
    ]);
  });

  it("should match with all sha512 values in the input", () => {
    const input =
      "5c815af2e56a9bcfa0751dc097321de9fbb074603d2dd12c00a4ea45ebc819310b9bc871872b27b20366b71e78f520b908f1ea4bd6458cedb748e5ea8a510f51\nf4d8b2044fbe715ccf04fbcfe3e04824a883236285bbcaec816ed520a1ae49ea0bdc3b8352e48c496b0910267e0037a0ca7c47a9f91f7f1b4f8e8eb4b6769717";
    const matches = input.match(sha512RegExp);
    expect(matches).toEqual([
      "5c815af2e56a9bcfa0751dc097321de9fbb074603d2dd12c00a4ea45ebc819310b9bc871872b27b20366b71e78f520b908f1ea4bd6458cedb748e5ea8a510f51",
      "f4d8b2044fbe715ccf04fbcfe3e04824a883236285bbcaec816ed520a1ae49ea0bdc3b8352e48c496b0910267e0037a0ca7c47a9f91f7f1b4f8e8eb4b6769717",
    ]);
  });

  it("should match with all ssdeep values in the input", () => {
    const input =
      "1536:gQA4ws6RTPdn1Jl19DzTIKu6VnGUNs+9Kf8r3Vf/WcnfYhLrJBew:uiEo/\n3:AXGBicFlgVNhBGcL6wCrFQEv:AXGHsNhxLsr2C";
    const matches = input.match(ssdeepRegExp);
    expect(matches).toEqual([
      "1536:gQA4ws6RTPdn1Jl19DzTIKu6VnGUNs+9Kf8r3Vf/WcnfYhLrJBew:uiEo/",
      "3:AXGBicFlgVNhBGcL6wCrFQEv:AXGHsNhxLsr2C",
    ]);
  });
});

describe("network RegExps", () => {
  it("should match with all asn values", () => {
    const input = "ASN13335 AS13334";
    const matches = input.match(asnRegExp);
    expect(matches).toEqual(["ASN13335", "AS13334"]);
  });

  it("should match with all domain values", () => {
    const input =
      "test.co.jp\ngitlab.com\ntest.exe\ndev.test.co.jp www.ne-foo.com";
    const matches = input.match(domainRegExp);
    expect(matches).toEqual([
      "test.co.jp",
      "gitlab.com",
      "dev.test.co.jp",
      "www.ne-foo.com",
    ]);
  });

  it("should not match with invalid domain values", () => {
    const domains = [
      "error.invalid",
      "-error-.invalid",
      "a.b-.de",
      "a.b--c.jp",
      "--.jp",
      "a--.jp",
      "-.co",
      "_.co",
      "a.b-.co",
      "a.b_.co",
      ".www.foo.bar",
      "www.foo.bar.",
      ".www.foo.bar.",
    ];
    const input = domains.join(" ");
    const matches = input.match(domainRegExp);
    expect(matches).toEqual([
      "c.jp",
      "www.foo.bar",
      "www.foo.bar",
      "www.foo.bar",
    ]);
  });

  it("should match with all email values", () => {
    const input = "test@test.co.jp\ntest@test.com\nhoge@hoge";
    const matches = input.match(emailRegExp);
    expect(matches).toEqual(["test@test.co.jp", "test@test.com"]);
  });

  it("should match with all ipv4 values", () => {
    const input = "8.8.8.8\n127.0.0.1";
    const matches = input.match(ipv4RegExp);
    expect(matches).toEqual(["8.8.8.8", "127.0.0.1"]);
  });

  it("should match with all ipv6 values", () => {
    const input =
      " 2001:0db8:85a3:0000:0000:8a2e:0370:7334\n fe80::d544:e71:3c17:7710%11";
    const matches = input.match(ipv6RegExp);
    expect(matches).toEqual([
      "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
      "fe80::d544:e71:3c17:7710%11",
    ]);
  });

  it("should match with all url values", () => {
    const input =
      "https://test-1.co.jp\nhttps://お名前.com\nhttps://google.com\nhttps://111.111.111.111/test.jsp\nwww.example.com";
    const matches = input.match(internationalizedURLRegExp);
    expect(matches).toEqual([
      "https://test-1.co.jp",
      "https://お名前.com",
      "https://google.com",
      "https://111.111.111.111/test.jsp",
    ]);
  });

  it("should match with all url values (edge cases ver.)", () => {
    const input =
      "https://localhost.domain.com:443 https://1.1.1.domain.com:443 https://1.1.1.1.domain.com:443";
    const matches = input.match(urlRegExp);
    expect(matches).toEqual([
      "https://localhost.domain.com:443",
      "https://1.1.1.domain.com:443",
      "https://1.1.1.1.domain.com:443",
    ]);
  });
});

describe("utility RegExps", () => {
  it("should match with all CVE values in the input", () => {
    const input = "foo bar CVE-2000-0001 baz";
    const matches = input.match(cveRegExp);
    expect(matches).toEqual(["CVE-2000-0001"]);
  });
});

describe("Crypto RegExps", () => {
  it("should match with all BTC addresses in the input", () => {
    const input =
      "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa 3Gj9sY6PaBHdk44jktV7AXrktjMcDqnwV8 49VLRG6oXpBEHACpoTpNh23Y3fGxStciKq";
    const matches = input.match(btcRegExp);
    expect(matches).toEqual([
      "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      "3Gj9sY6PaBHdk44jktV7AXrktjMcDqnwV8",
    ]);
  });

  it("should match with all XMR addresses in the input", () => {
    const input =
      "42CujFXn1HHiwrGW3Wuh8TASmo94dv3J8DZneS5NqBhaJVNi4qK32Zj3rgcDWsrxznP1qtjJFBKtHQCcbSCY996wMHHfvhw\n42UE32EZxHAWejXi3nQ3wpYGncQnbCw6LCMh8PkcFTn6XzQUUDco2pGSpR6AJHFK1jL8tYNYJnbg2DoKxVikYvC2DamnGBJ";
    const matches = input.match(xmrRegExp);
    expect(matches).toEqual([
      "42CujFXn1HHiwrGW3Wuh8TASmo94dv3J8DZneS5NqBhaJVNi4qK32Zj3rgcDWsrxznP1qtjJFBKtHQCcbSCY996wMHHfvhw",
      "42UE32EZxHAWejXi3nQ3wpYGncQnbCw6LCMh8PkcFTn6XzQUUDco2pGSpR6AJHFK1jL8tYNYJnbg2DoKxVikYvC2DamnGBJ",
    ]);
  });

  describe("ETH RegExp", () => {
    it("should match with an ETH address in the input", () => {
      const input = "0x4966db520b0680fc19df5d7774ca96f42e6abd4f";
      const matches = input.match(ethRegExp);
      expect(matches).toEqual([input]);
    });
  });
});

describe("tracker RegExps", () => {
  it("should match with all Google Analytics Code values in the input", () => {
    const input = "foo bar UA-26296840-4 baz UA-1111111";
    const matches = input.match(gaTrackIDRegExp);
    expect(matches).toEqual(["UA-26296840-4", "UA-1111111"]);
  });

  it("should match with all Google Adsense Publisher ID values in the input", () => {
    const input = "foo bar pub-9107453047749393 baz pub-2324633754279327";
    const matches = input.match(gaPubIDRegExp);
    expect(matches).toEqual(["pub-9107453047749393", "pub-2324633754279327"]);
  });
});

describe("mac RegExps", () => {
  it("should match with mac addresses in the input", () => {
    const input = "01:23:45:67:89:ab";
    const matches = input.match(macAddressRegExp);
    expect(matches).toEqual([input]);
  });
});
