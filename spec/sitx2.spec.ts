import { extractIOC } from "@/index";
import { convertToPattern, convertToSTIX2, isHash } from "@/stix2/stix2";

describe("isHash", () => {
  it("return false", () => {
    expect(isHash("domain-name")).toBe(false);
  });

  it("return true", () => {
    expect(isHash("sha256")).toBe(true);
  });
});

describe("convertToPattern", () => {
  it("return stix pattern", () => {
    expect(convertToPattern("domain-name", "example.com")).toBe(
      "[domain-name:value = 'example.com']"
    );
    expect(convertToPattern("md5", "f6f8179ac71eaabff12b8c024342109b")).toBe(
      "[file:hashes.md5 = 'f6f8179ac71eaabff12b8c024342109b']"
    );
  });
});

describe("convertSTIX2", () => {
  it("return STIX2 object", () => {
    const ioc = extractIOC("1.1.1.1 example.com");
    const stix2 = convertToSTIX2(ioc);
    expect(stix2.objects.length).toBe(2);

    const first = stix2.objects[0];
    expect(first.pattern).toBe("[ipv4-addr:value = '1.1.1.1']");

    const last = stix2.objects[1];
    expect(last.pattern).toBe("[domain-name:value = 'example.com']");
  });
});
