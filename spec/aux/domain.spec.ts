import { domainRegex } from "@/aux/domain";

describe("network RegExps", () => {
  it("should match with all domain values", () => {
    const input =
      "test.co.jp\ngitlab.com\ntest.exe\ndev.test.co.jp www.ne-foo.com";
    const matches = input.match(domainRegex());
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
    const matches = input.match(domainRegex());
    expect(matches).toEqual([
      "c.jp",
      "www.foo.bar",
      "www.foo.bar",
      "www.foo.bar",
    ]);
  });
});
