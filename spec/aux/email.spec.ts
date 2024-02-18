import { emailRegex } from "@/aux/email";

describe("emailRegex", () => {
  it("should match with all email values", () => {
    const input = "test@test.co.jp\ntest@test.com\nhoge@hoge";
    const matches = input.match(emailRegex());
    expect(matches).toEqual(["test@test.co.jp", "test@test.com"]);
  });
});
