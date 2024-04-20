import { equalArrays } from "./index.js";

describe("equalArrays", () => {

    it("同じ配列を参照しているのでtrueになる", () => {
      let a = ["a", "b", "c"];
      let b = a;
      b[3] = "0";
      expect(equalArrays(a, b)).toBe(true);
    });

    it("異なる値を渡しているが、配列ではない値の要素を参照しようとした時に両方ともundefinedになるのでtrueになる", () => {
      expect(equalArrays(1, 500)).toBe(true);
    });
    
});