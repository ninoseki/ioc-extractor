import { expect } from "chai";
import "mocha";
import { fileRegexs, hashRegexs, isFile, isHash, isNetwork, isUtilityItem, networkRegexs, utilityRegexs, isCryptocurrency, cryptocurrencyRegexs, isTracker, trackerRegexs } from "../aux/regexs";

describe("isHash", () => {
  it("should detect hash values in the input", () => {
    expect(isHash("874058e8d8582bf85c115ce319c5b0af")).to.equal(true);
    expect(isHash("874058e8d8582bf85c115ce319c5b0a")).to.equal(false);
  });
});

describe("isNetwork", () => {
  it("should detect network values in the input", () => {
    expect(isNetwork("8.8.8.8")).to.equal(true);
    expect(isNetwork("300.300.300.300")).to.equal(false);
    expect(isNetwork("fe80::d544:e71:3c17:7710%11")).to.equal(true);
    expect(isNetwork("test@test.com")).to.equal(true);
    expect(isNetwork("example.com")).to.equal(true);
    expect(isNetwork("https://www.example.com/foo/bar?baz=1")).to.equal(true);
    expect(isNetwork("https://111.111.111.111/foo/bar?baz=1")).to.equal(true);
  });
});

describe("isFile", () => {
  it("should detect file values in the input", () => {
    expect(isFile("test.doc")).to.equal(true);
    expect(isFile("test.dl")).to.equal(false);
    expect(isFile("test.dll")).to.equal(true);
    expect(isFile("test.jpg")).to.equal(true);
    expect(isFile("example.pumpkin")).to.equal(false);
  });
});

describe("isUtilityItem", () => {
  it("should detect utility(cve) values in the input", () => {
    expect(isUtilityItem("CVE-1800-0000")).to.equal(false);
    expect(isUtilityItem("CVE-2016-0000")).to.equal(true);
    expect(isUtilityItem("CVE-2100-0000")).to.equal(false);
    expect(isUtilityItem("CVE-2016-00000")).to.equal(true);
    expect(isUtilityItem("CVE-20100-0000")).to.equal(false);
  });
});

describe("isCryptocurrency", () => {
  it("should detect BTC addresses in the input", () => {
    expect(isCryptocurrency("1J6PYEzr4CUoGbnXrELyHszoTSz3wCsCaj")).to.equal(true)
  });
  it("should detect XMR addresses in the input", () => {
    expect(isCryptocurrency("48Fki6gnEN1QaiWNcsm8dVfX2JMg8xmjiQvuKpcdUD9rQH8WU4AXj9HKAF5AdnhKPSPLzTV7CX1Ks25BWrDeLnHuEFmhRxV")).to.equal(true)
  });
});

describe("isTracker", () => {
  it("should detect GA tracker ID in the input", () => {
    expect(isTracker("UA-26296840-4")).to.equal(true)
  });
});

describe("hashRegexs", () => {
  it("should match with all md5 values in the input", () => {
    const input = "ad535056bf6318d5faf47d3abcc2b902\nhoge\na9c08de3a3c0cf353422f0f69f0e4e26";
    const matches = input.match(hashRegexs.md5)!;
    expect(matches.length).to.equal(2);
    expect(matches[0]).to.equal("ad535056bf6318d5faf47d3abcc2b902");
  });

  it("should match with all sha1 values in the input", () => {
    const input = "a89ca560e2f0f3b081a3e7d0d91a2bcd4e2bdadb\n1a229aee30e0a4472772a2a96bc1dc75c8cd8568";
    const matches = input.match(hashRegexs.sha1)!;
    expect(matches.length).to.equal(2);
    expect(matches[0]).to.equal("a89ca560e2f0f3b081a3e7d0d91a2bcd4e2bdadb");
  });

  it("should match with all sha256 values in the input", () => {
    const input = "9002a1d301adf6e0426af36a40c3c1b33db7891f3f7d93f1cf6e73fdbce0da1b\nbb89bfc8144ef401b671d4f9f34b296055e30bfd5c400fbef794f5c28b84ad0d";
    const matches = input.match(hashRegexs.sha256)!;
    expect(matches.length).to.equal(2);
    expect(matches[0]).to.equal("9002a1d301adf6e0426af36a40c3c1b33db7891f3f7d93f1cf6e73fdbce0da1b");
  });

  it("should match with all sha512 values in the input", () => {
    const input = "5c815af2e56a9bcfa0751dc097321de9fbb074603d2dd12c00a4ea45ebc819310b9bc871872b27b20366b71e78f520b908f1ea4bd6458cedb748e5ea8a510f51\nf4d8b2044fbe715ccf04fbcfe3e04824a883236285bbcaec816ed520a1ae49ea0bdc3b8352e48c496b0910267e0037a0ca7c47a9f91f7f1b4f8e8eb4b6769717";
    const matches = input.match(hashRegexs.sha512)!;
    expect(matches.length).to.equal(2);
    expect(matches[0]).to.equal("5c815af2e56a9bcfa0751dc097321de9fbb074603d2dd12c00a4ea45ebc819310b9bc871872b27b20366b71e78f520b908f1ea4bd6458cedb748e5ea8a510f51");
  });

  it("should match with all ssdeep values in the input", () => {
    const input = "1536:gQA4ws6RTPdn1Jl19DzTIKu6VnGUNs+9Kf8r3Vf/WcnfYhLrJBew:uiEo/\n3:AXGBicFlgVNhBGcL6wCrFQEv:AXGHsNhxLsr2C";
    const matches = input.match(hashRegexs.ssdeep)!;
    expect(matches.length).to.equal(2);
    expect(matches[0]).to.equal("1536:gQA4ws6RTPdn1Jl19DzTIKu6VnGUNs+9Kf8r3Vf/WcnfYhLrJBew:uiEo/");
  });
});

describe("networkRegexes", () => {
  it("should match with all domain values", () => {
    const input = "test.co.jp\ngitlab.com\ntest.exe\ndev.test.co.jp";
    const matches = input.match(networkRegexs.domain)!;
    expect(matches.length).to.equal(3);
    expect(matches[0]).to.equal("test.co.jp");
    expect(matches[1]).to.equal("gitlab.com");
    expect(matches[2]).to.equal("dev.test.co.jp");
  });

  it("should match with all email values", () => {
    const input = "test@test.co.jp\ntest@test.com\nhoge@hoge";
    const matches = input.match(networkRegexs.email)!;
    expect(matches.length).to.equal(2);
    expect(matches[0]).to.equal("test@test.co.jp");
  });

  it("should match with all ipv4 values", () => {
    const input = "8.8.8.8\n127.0.0.1";
    const matches = input.match(networkRegexs.ipv4)!;
    expect(matches.length).to.equal(2);
    expect(matches[0]).to.equal("8.8.8.8");
  });

  it("should match with all ipv6 values", () => {
    const input = " 2001:0db8:85a3:0000:0000:8a2e:0370:7334\n fe80::d544:e71:3c17:7710%11";
    const matches = input.match(networkRegexs.ipv6)!;
    expect(matches.length).to.equal(2);
    expect(matches[0]).to.equal("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
  });

  it("should match with all url values", () => {
    const input = "https://test.co.jp\nhttps://google.com\nhttps://111.111.111.111/test.jsp\nwww.example.com";
    const matches = input.match(networkRegexs.url)!;
    expect(matches.length).to.equal(3);
    expect(matches[0]).to.equal("https://test.co.jp");
  });
});

describe("fileRegexs", () => {
  it("should match with all doc values in the input", () => {
    const input = "test.doc\ntest.pptx";
    const matches = input.match(fileRegexs.doc)!;
    expect(matches.length).to.equal(2);
    expect(matches[0]).to.equal("test.doc");
  });

  it("should match with all exe values in the input", () => {
    const input = "test.exe\ntest.jar";
    const matches = input.match(fileRegexs.exe)!;
    expect(matches.length).to.equal(2);
    expect(matches[0]).to.equal("test.exe");
  });

  it("should match with all flash values in the input", () => {
    const input = "test.flv\ntest.swf";
    const matches = input.match(fileRegexs.flash)!;
    expect(matches.length).to.equal(2);
    expect(matches[0]).to.equal("test.flv");
  });

  it("should match with all img values in the input", () => {
    const input = "test.jpeg\ntest.png";
    const matches = input.match(fileRegexs.img)!;
    expect(matches.length).to.equal(2);
    expect(matches[0]).to.equal("test.jpeg");
  });

  it("should match with all mac values in the input", () => {
    const input = "test.app\ntest.pkg";
    const matches = input.match(fileRegexs.mac)!;
    expect(matches.length).to.equal(2);
    expect(matches[0]).to.equal("test.app");
  });

  it("should match with all web values in the input", () => {
    const input = "test.html\ntest.jsp";
    const matches = input.match(fileRegexs.web)!;
    expect(matches.length).to.equal(2);
    expect(matches[0]).to.equal("test.html");
  });

  it("should match with all zip values in the input", () => {
    const input = "test.zip\ntest.rar";
    const matches = input.match(fileRegexs.zip)!;
    expect(matches.length).to.equal(2);
    expect(matches[0]).to.equal("test.zip");
  });
});

describe("utilityRegexs", () => {
  it("should match with all CVE values in the input", () => {
    const input = "foo bar CVE-2000-0001 baz";
    const matches = input.match(utilityRegexs.cve)!;
    expect(matches.length).to.equal(1);
    expect(matches[0]).to.equal("CVE-2000-0001");
  });
});

describe("cryptocurrenciesRegexs", () => {
  it("should match with all BTC addresses in the input", () => {
    const input = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa 3Gj9sY6PaBHdk44jktV7AXrktjMcDqnwV8 49VLRG6oXpBEHACpoTpNh23Y3fGxStciKq";
    const matches = input.match(cryptocurrencyRegexs.btc)!;
    expect(matches.length).to.equal(2);
    expect(matches[0]).to.equal("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
  });
  it("should match with all XMR addresses in the input", () => {
    const input = "42CujFXn1HHiwrGW3Wuh8TASmo94dv3J8DZneS5NqBhaJVNi4qK32Zj3rgcDWsrxznP1qtjJFBKtHQCcbSCY996wMHHfvhw\n42UE32EZxHAWejXi3nQ3wpYGncQnbCw6LCMh8PkcFTn6XzQUUDco2pGSpR6AJHFK1jL8tYNYJnbg2DoKxVikYvC2DamnGBJ";
    const matches = input.match(cryptocurrencyRegexs.xmr)!;
    expect(matches.length).to.equal(2);
    expect(matches[0]).to.equal("42CujFXn1HHiwrGW3Wuh8TASmo94dv3J8DZneS5NqBhaJVNi4qK32Zj3rgcDWsrxznP1qtjJFBKtHQCcbSCY996wMHHfvhw");
  });
});

describe("trackerRegex", () => {
  it("should match with all tracker values in the input", () => {
    const input = "foo bar UA-26296840-4 baz UA-1111111-1";
    const matches = input.match(trackerRegexs.ga)!;
    expect(matches.length).to.equal(2);
    expect(matches[0]).to.equal("UA-26296840-4");
    expect(matches[1]).to.equal("UA-1111111-1");
  });
});
