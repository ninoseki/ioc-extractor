import { dedup, refang, sortByValue } from "@/aux/auxiliary";

describe("refang", () => {
  it("should replace ' . '  by .", () => {
    const input = "example . com";
    expect(refang(input)).toBe("example.com");
  });

  it("should replace [.] by .", () => {
    const input = "example[.]com";
    expect(refang(input)).toBe("example.com");
  });

  it("should replace (.) by .", () => {
    const input = "example(.)com";
    expect(refang(input)).toBe("example.com");
  });

  it("should replace {.} by .", () => {
    const input = "example{.}com";
    expect(refang(input)).toBe("example.com");
  });

  it("should replace mixied brackets by .", () => {
    const input = "test(.}test{.)example[.)com";
    expect(refang(input)).toBe("test.test.example.com");
  });

  it("should replace mixied partial brackets by .", () => {
    const input = "1.)1[.1.)1";
    expect(refang(input)).toBe("1.1.1.1");
  });

  it("should replace (dot) by .", () => {
    const input = "1.1.1(dot)1";
    expect(refang(input)).toBe("1.1.1.1");
  });

  it("should replace [dot] by .", () => {
    const input = "example[dot]com";
    expect(refang(input)).toBe("example.com");
  });

  it("should replace {dot} by .", () => {
    const input = "example{dot}com";
    expect(refang(input)).toBe("example.com");
  });

  it.each([
    ["hxxps://google.com", "https://google.com"],
    ["hxxp://neverssl.com", "http://neverssl.com"],
    ["hxxps://google[.)com", "https://google.com"],
    ["hxxpfoo", "hxxpfoo"],
  ])("should replace hxxp:// by http://", (string, expected) => {
    expect(refang(string)).toBe(expected);
  });

  it.each([
    ["h**ps://google.com", "https://google.com"],
    ["h**p://neverssl.com", "http://neverssl.com"],
    ["h**ps://google[.)com", "https://google.com"],
    ["h**pfoo", "h**pfoo"],
  ])("should replace h**p:// by http://", (string, expected) => {
    expect(refang(string)).toBe(expected);
  });

  it("should replace [:] by :", () => {
    const input = "http[:]//example.com";
    expect(refang(input)).toBe("http://example.com");
  });

  it("should replace . by .", () => {
    const input = "http://example.com";
    expect(refang(input)).toBe("http://example.com");
  });

  it("should replace [/] by /", () => {
    const input = "http://example.com[/]test";
    expect(refang(input)).toBe("http://example.com/test");
  });

  it("should replace [at] by @", () => {
    const input = "test[at]example.com";
    expect(refang(input)).toBe("test@example.com");
  });

  it("should replace [@] by @", () => {
    const input = "test[@]example.com";
    expect(refang(input)).toBe("test@example.com");
  });

  it("should replace (@) by @", () => {
    const input = "test(@)example.com";
    expect(refang(input)).toBe("test@example.com");
  });

  it("should replace {@} by @", () => {
    const input = "test{@}example.com";
    expect(refang(input)).toBe("test@example.com");
  });

  it("should be deal with a mixed casec", () => {
    const input = "hxxps[:]//test.example[.)com[/]path";
    expect(refang(input)).toBe("https://test.example.com/path");
  });

  it.each([
    ["[at](at)[at]", "@@@"],
    ["[/][/]", "//"],
    ["[:][:]", "::"],
  ])("should repalace all occurrences", (string, expected) => {
    expect(refang(string)).toBe(expected);
  });
});

describe("dedup", () => {
  it("should filter to unique ones", () => {
    const input = ["1.1.1.1", "1.1.1.1", "github.com", "github.com"];
    expect(dedup(input)).toEqual(["1.1.1.1", "github.com"]);
  });
});

describe("sortByValue", () => {
  it("should filter to unique ones", () => {
    const input = ["March", "Jan", "Jun", "Feb", "Dec", "Apr"];
    expect(sortByValue(input)).toEqual([
      "Apr",
      "Dec",
      "Feb",
      "Jan",
      "Jun",
      "March",
    ]);
  });
});
