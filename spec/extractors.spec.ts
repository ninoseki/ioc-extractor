import {
  extractASN,
  extractBTC,
  extractCVE,
  extractDomain,
  extractEmail,
  extractETH,
  extractGAPubID,
  extractGATrackID,
  extractIPv4,
  extractIPv6,
  extractMacAddress,
  extractMD5,
  extractSHA1,
  extractSHA256,
  extractSHA512,
  extractSSDEEP,
  extractURL,
  extractXMR,
} from "@/aux/extractor";

describe("extractMD5", () => {
  const value = "874058e8d8582bf85c115ce319c5b0af";
  it("extract a value", () => {
    expect(extractMD5(value)).toBe(value);
    expect(extractMD5("")).toBe(null);
  });
});

describe("extractSHA1", () => {
  const value = "a89ca560e2f0f3b081a3e7d0d91a2bcd4e2bdadb";
  it("extract a value", () => {
    expect(extractSHA1(value)).toBe(value);
    expect(extractSHA1("")).toBe(null);
  });
});

describe("extractSHA256", () => {
  const value =
    "9002a1d301adf6e0426af36a40c3c1b33db7891f3f7d93f1cf6e73fdbce0da1b";
  it("extract a value", () => {
    expect(extractSHA256(value)).toBe(value);
    expect(extractSHA256("")).toBe(null);
  });
});

describe("extractSHA512", () => {
  const value =
    "5c815af2e56a9bcfa0751dc097321de9fbb074603d2dd12c00a4ea45ebc819310b9bc871872b27b20366b71e78f520b908f1ea4bd6458cedb748e5ea8a510f51";
  it("extract a value", () => {
    expect(extractSHA512(value)).toBe(value);
    expect(extractSHA512("")).toBe(null);
  });
});

describe("extractSSDEEP", () => {
  const value =
    "1536:gQA4ws6RTPdn1Jl19DzTIKu6VnGUNs+9Kf8r3Vf/WcnfYhLrJBew:uiEo/";
  it("extract a value", () => {
    expect(extractSSDEEP(value)).toBe(value);
    expect(extractSSDEEP("")).toBe(null);
  });
});

describe("extractASN", () => {
  const value = "ASN1111";
  it("extract a value", () => {
    expect(extractASN(value)).toBe(value);
    expect(extractASN("")).toBe(null);
  });
});

describe("extractDomain", () => {
  const value = "example.com";
  it("extract a value", () => {
    expect(extractDomain(value)).toBe(value);
    expect(extractDomain(value.replace(".", "[.]"))).toBe(null);
    expect(extractDomain("")).toBe(null);
  });
});

describe("extractIPv4", () => {
  const value = "1.1.1.1";
  it("extract a value", () => {
    expect(extractIPv4(value)).toBe(value);
    expect(extractIPv4(value.replace(".", "[.]"))).toBe(null);
    expect(extractIPv4("")).toBe(null);
  });
});

describe("extractIPv6", () => {
  const value = "fe80::d544:e71:3c17:7710";
  it("extract a value", () => {
    expect(extractIPv6(value)).toBe(value);
    expect(extractIPv6("")).toBe(null);
  });
});

describe("extractEmail", () => {
  const value = "test@texample.com";
  it("extract a value", () => {
    expect(extractEmail(value)).toBe(value);
    expect(extractEmail(value.replace(".", "[.]"))).toBe(null);
    expect(extractEmail("")).toBe(null);
  });
});

describe("extractURL", () => {
  const value = "http://example.com";
  it("extract a value", () => {
    expect(extractURL(value)).toBe(value);
    expect(extractURL(value.replace(".", "[.]"))).toBe(null);
    expect(extractURL("")).toBe(null);
  });
});

describe("extractCVE", () => {
  const value = "CVE-2010-0000";
  it("extract a value", () => {
    expect(extractCVE(value)).toBe(value);
    expect(extractCVE("")).toBe(null);
  });
});

describe("extractBTC", () => {
  const value = "1J6PYEzr4CUoGbnXrELyHszoTSz3wCsCaj";
  it("extract a value", () => {
    expect(extractBTC(value)).toBe(value);
    expect(extractBTC("")).toBe(null);
  });
});

describe("extractXMR", () => {
  const value =
    "48Fki6gnEN1QaiWNcsm8dVfX2JMg8xmjiQvuKpcdUD9rQH8WU4AXj9HKAF5AdnhKPSPLzTV7CX1Ks25BWrDeLnHuEFmhRxV";
  it("extract a value", () => {
    expect(extractXMR(value)).toBe(value);
    expect(extractXMR("")).toBe(null);
  });
});

describe("extractGAPubID", () => {
  const value = "pub-9107453047749393";
  it("extract a value", () => {
    expect(extractGAPubID(value)).toBe(value);
    expect(extractGAPubID("")).toBe(null);
  });
});

describe("extractGATrackIDs", () => {
  const value = "UA-26296840-4";
  it("extract a value", () => {
    expect(extractGATrackID(value)).toBe(value);
    expect(extractGATrackID("")).toBe(null);
  });
});

describe("extractMacAddress", () => {
  const value = "01-23-45-67-89-ab";
  it("extract a value", () => {
    expect(extractMacAddress(value)).toBe(value);
    expect(extractMacAddress("")).toBe(null);
  });
});

describe("extractETH", () => {
  const value = "0x4966db520b0680fc19df5d7774ca96f42e6abd4f";
  it("extract a value", () => {
    expect(extractETH(value)).toBe(value);
    expect(extractETH("")).toBe(null);
  });
});
