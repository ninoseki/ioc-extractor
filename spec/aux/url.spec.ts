import { urlRegex } from "@/aux/url";

describe("urlRegex", () => {
  it("should match with all URL values", () => {
    const input =
      "https://test-1.co.jp\nhttps://お名前.com\nhttps://google.com\nhttps://111.111.111.111/test.jsp\nwww.example.com";
    const matches = input.match(urlRegex());
    expect(matches).toEqual([
      "https://test-1.co.jp",
      "https://google.com",
      "https://111.111.111.111/test.jsp",
    ]);
  });

  it("should match with all URL values (edge cases ver.)", () => {
    const input =
      "https://localhost.domain.com:443 https://1.1.1.domain.com:443 https://1.1.1.1.domain.com:443";
    const matches = input.match(urlRegex());
    expect(matches).toEqual([
      "https://localhost.domain.com:443",
      "https://1.1.1.domain.com:443",
      "https://1.1.1.1.domain.com:443",
    ]);
  });
});
