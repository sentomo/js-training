describe("string test", () => {

  it("returns 2 when length of 💯 given", () => {
    expect("💯".length).toBe(2);
  });
  
  it("returns true when ('\uD83D\uDCAF' === '💯') given", () => {
    expect("\uD83D\uDCAF" === "💯").toBe(true);
  });

  it("returns true when ('\u{0001F4AF}' === '💯') given", () => {
    expect("\u{0001F4AF}" === "💯").toBe(true);
  });
});