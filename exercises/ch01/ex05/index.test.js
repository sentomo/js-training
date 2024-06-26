import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  // 以下に sum, factorial のテストを記載せよ
  describe("sum", () => {
    it("returns 0 when an empty array given", () => {
      let array = [];
      expect(sum(array)).toBe(0);
    });

    it("returns 15 when the array given", () => {
      let array = [1,2,3,4,5];
      expect(sum(array)).toBe(15);
    });
  });

  describe("factorial", () => {
    it("returns 1 when 0 given", () => {
      let n = 0;
      expect(factorial(n)).toBe(1);
    });

    it("returns 1 when 1 given", () => {
      let n = 1;
      expect(factorial(n)).toBe(1);
    });

    it("returns 2 when 2 given", () => {
      let n = 2;
      expect(factorial(n)).toBe(2);
    });

    it("returns 120 when 5 given", () => {
      let n = 5;
      expect(factorial(n)).toBe(120);
    });
  });
});
