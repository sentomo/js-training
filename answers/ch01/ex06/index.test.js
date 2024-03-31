import { fib } from "./index.js";

describe("math", () => {
  describe("fib", () => {
    it("returns same value when 0 given", () => {
      expect(fib(0)).toBe(0);
    });

    it("returns same value when 1 given", () => {
      expect(fib(1)).toBe(1);
    });

    it("returns same value when negative value given", () => {
      expect(fib(-1)).toBe(-1);
    });

    it("returns 2111485077978050 when 75 given", () => {
      expect(fib(75)).toBe(2111485077978050);
    });

    it("returns undefined when string given", () => {
      expect(fib("abc")).toBe(undefined);
    });

    it("returns undefined when boolean given", () => {
      expect(fib(true)).toBe(undefined);
    });
  });
});