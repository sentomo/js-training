import { equalArrays } from "./index.js";

describe("equalArrays", () => {

    it("同じ配列を参照しているのでtrueになる", () => {
      let a = ["a", "b", "c"];
      let b = a;
      b[3] = "0";
      expect(equalArrays(a, b)).toBe(true);
    });
    
});