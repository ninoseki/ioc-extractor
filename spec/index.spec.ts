import * as fs from "fs";
import * as path from "path";

import { extractIOC } from "@/index";

describe("IOCExtractor", () => {
  describe("simple input", () => {
    it("should extract IOCs from the input", () => {
      const input =
        "1.1.1[.]1 2.2.2 . 2 google(.)com テスト.example.com https://www.google[.]com http://テスト.example.com f6f8179ac71eaabff12b8c024342109b 275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f UA-26296840-4 test@テスト.example.com example.nope";
      const ioc = extractIOC(input);

      expect(ioc.md5s).toEqual(["f6f8179ac71eaabff12b8c024342109b"]);
      expect(ioc.sha256s).toEqual([
        "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f",
      ]);
      expect(ioc.domains).toEqual([
        "google.com",
        "www.google.com",
        "テスト.example.com",
      ]);
      expect(ioc.ipv4s).toEqual(["1.1.1.1", "2.2.2.2"]);
      expect(ioc.urls).toEqual([
        "http://テスト.example.com",
        "https://www.google.com",
      ]);
      expect(ioc.cves.length).toEqual(0);
      expect(ioc.gaTrackIDs).toEqual(["UA-26296840-4"]);
      expect(ioc.emails).toEqual(["test@テスト.example.com"]);
    });
  });

  describe("simple input with disabled IDN extraction", () => {
    it("should extract IOCs from the input", () => {
      const input =
        "example.com test@example.com http://example.com example.nope test@example.nope http://example.nope テスト.nope test@テスト.nope http://テスト.nope";
      const ioc = extractIOC(input, { enableIDN: false });

      expect(ioc.domains).toEqual(["example.com"]);
      expect(ioc.urls).toEqual(["http://example.com"]);
      expect(ioc.emails).toEqual(["test@example.com"]);
    });
  });

  describe("simple input with non-strict TLD validation", () => {
    it("should extract IOCs from the input", () => {
      const input =
        "example.com test@example.com http://example.com example.nope test@example.nope http://example.nope テスト.nope test@テスト.nope http://テスト.nope";
      const ioc = extractIOC(input, { enableIDN: true, strictTLD: false });

      expect(ioc.domains).toEqual([
        "example.com",
        "example.nope",
        "テスト.nope",
      ]);
      expect(ioc.urls).toEqual([
        "http://example.com",
        "http://example.nope",
        "http://テスト.nope",
      ]);
      expect(ioc.emails).toEqual([
        "test@example.com",
        "test@example.nope",
        "test@テスト.nope",
      ]);
    });
  });

  describe("simple input with non-strict TLD validation & disabled IDN extraction", () => {
    it("should extract IOCs from the input", () => {
      const input =
        "example.com test@example.com http://example.com example.nope test@example.nope http://example.nope テスト.nope test@テスト.nope http://テスト.nope";
      const ioc = extractIOC(input, { enableIDN: false, strictTLD: false });

      expect(ioc.domains).toEqual(["example.com", "example.nope"]);
      expect(ioc.urls).toEqual(["http://example.com", "http://example.nope"]);
      expect(ioc.emails).toEqual(["test@example.com", "test@example.nope"]);
    });
  });

  describe("simple input with disabled refang option", () => {
    it("should extract IOCs from the input", () => {
      const input = "example[.]com 1.1.1.1";
      const ioc = extractIOC(input, { enableRefang: false });

      expect(ioc.domains.length).toEqual(0);
      expect(ioc.ipv4s).toEqual(["1.1.1.1"]);
    });
  });

  describe("complex input", () => {
    it("should extract IOCs from the input", () => {
      const input: string = fs
        .readFileSync(path.resolve(__dirname, "./fixtures/input.txt"))
        .toString();
      const ioc = extractIOC(input);

      expect(ioc.md5s).toEqual(["68b329da9893e34099c7d8ad5cb9c940"]);
      expect(ioc.sha1s).toEqual(["adc83b19e793491b1c6ea0fd8b46cd9f32e592fc"]);
      expect(ioc.sha256s).toEqual([
        "01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b",
      ]);
      expect(ioc.sha512s).toEqual([
        "be688838ca8686e5c90689bf2ab585cef1137c999b48c70b92f67a5c34dc15697b5d11c982ed6d71be1e1e7f7b4e0733884aa97c3f7a339a8ed03577cf74be09",
      ]);

      expect(ioc.asns).toEqual(["AS3462", "ASN15169"]);
      expect(ioc.ipv4s).toEqual([
        "123.123.123.123",
        "192.168.0.1",
        "192.188.0.1",
      ]);
      expect(ioc.ipv6s).toEqual(["fdc4:2581:575b:5a72:0000:0000:0000:0001"]);
      expect(ioc.domains).toEqual([
        "ex4mple.com",
        "exa-mple.com",
        "example.com",
        "short.is",
      ]);
      expect(ioc.urls).toEqual([
        "http://123.123.123.123/test",
        "http://192.168.0.1",
        "http://192.168.0.1:80/path",
        "http://ex4mple.com",
        "http://exa-mple.com",
        "http://example.com",
        "http://example.com/",
        "http://example.com/test",
        "http://example.com:80/path",
      ]);
      expect(ioc.btcs).toEqual([
        "1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v",
        "1J6PYEzr4CUoGbnXrELyHszoTSz3wCsCaj",
      ]);
      expect(ioc.xmrs).toEqual([
        "46bxDoy3pszR42Ds5FeygfWdbMfH7qB5hZHqEPnX6EgVhksrbzJtQYQeETZtniMfWk4Bt7TXmgybpZYRu2fTdppoAf9x7Yd",
        "49urk473npMgWFFBBk2xLMjEqTgg1PHMzg1MjDWBST5AMEEyh58TjCvLEf58uu5kruPWu5pA1RBPKX3quEQpHKoGQ1zbTGe",
      ]);
      expect(ioc.eths).toEqual(["0x32Be343B94f860124dC4fEe278FDCBD38C102D88"]);
    });
  });
});
