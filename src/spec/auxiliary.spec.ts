import { dedup, refang, sortByValue } from "../aux/auxiliary";

describe("refang", () => {
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

  it("should replace hxxp:// by http://", () => {
    const input =
      "hxxps://google.com\nhxxp://neverssl.com\nhxxps://google[.)com";
    expect(refang(input)).toBe(
      "https://google.com\nhttp://neverssl.com\nhttps://google.com"
    );

    const input2 = "hxxpfoo";
    expect(refang(input2)).toBe("hxxpfoo");
  });

  it("should replace h**p:// by http://", () => {
    const input =
      "h**ps://google.com\nhxxp://neverssl.com\nhxxps://google[.)com";
    expect(refang(input)).toBe(
      "https://google.com\nhttp://neverssl.com\nhttps://google.com"
    );

    const input2 = "h**pfoo";
    expect(refang(input2)).toBe("h**pfoo");
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
