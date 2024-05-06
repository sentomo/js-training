import { ComplexNumber, add, sub, mul, div } from "./index.js";

const addTestCases = [
  [new ComplexNumber(3, 4), new ComplexNumber(1, 2), new ComplexNumber(4, 6)], 
  [new ComplexNumber(-3, -4), new ComplexNumber(-1, -2), new ComplexNumber(-4, -6)], 
  [new ComplexNumber(-3, -4), new ComplexNumber(1, 2), new ComplexNumber(-2, -2)], 
  [new ComplexNumber(3, -4), new ComplexNumber(1, -2), new ComplexNumber(4, -6)], 
  [new ComplexNumber(-3, 4), new ComplexNumber(-1, 2), new ComplexNumber(-4, 6)], 
  [new ComplexNumber(-3, 4), new ComplexNumber(1, -2), new ComplexNumber(-2, 2)], 
  [new ComplexNumber(3, -4), new ComplexNumber(-1, 2), new ComplexNumber(2, -2)], 
  [new ComplexNumber(0, 0), new ComplexNumber(0, 0), new ComplexNumber(0, 0)]
];

describe("add test", () => {
    test.each(addTestCases)(
      "given %p and %p as arguments, returns %p",
      (firstArg, secondArg, expectedResult) => {
        const result = add(firstArg, secondArg);
        expect(result).toEqual(expectedResult);
      }
    );
});

const subTestCases = [
  [new ComplexNumber(3, 4), new ComplexNumber(1, 2), new ComplexNumber(2, 2)], 
  [new ComplexNumber(-3, -4), new ComplexNumber(-1, -2), new ComplexNumber(-2, -2)], 
  [new ComplexNumber(-3, -4), new ComplexNumber(1, 2), new ComplexNumber(-4, -6)], 
  [new ComplexNumber(3, -4), new ComplexNumber(1, -2), new ComplexNumber(2, -2)], 
  [new ComplexNumber(-3, 4), new ComplexNumber(-1, 2), new ComplexNumber(-2, 2)], 
  [new ComplexNumber(-3, 4), new ComplexNumber(1, -2), new ComplexNumber(-4, 6)], 
  [new ComplexNumber(3, -4), new ComplexNumber(-1, 2), new ComplexNumber(4, -6)], 
  [new ComplexNumber(0, 0), new ComplexNumber(0, 0), new ComplexNumber(0, 0)]
];

describe("sub test", () => {
  test.each(subTestCases)(
    "given %p and %p as arguments, returns %p",
    (firstArg, secondArg, expectedResult) => {
      const result = sub(firstArg, secondArg);
      expect(result).toEqual(expectedResult);
    }
  );
});

const mulTestCases = [
  [new ComplexNumber(3, 4), new ComplexNumber(1, 2), new ComplexNumber(-5, 10)], 
  [new ComplexNumber(-3, -4), new ComplexNumber(-1, -2), new ComplexNumber(-5, 10)], 
  [new ComplexNumber(-3, -4), new ComplexNumber(1, 2), new ComplexNumber(5, -10)], 
  [new ComplexNumber(3, -4), new ComplexNumber(1, -2), new ComplexNumber(-5, -10)], 
  [new ComplexNumber(-3, 4), new ComplexNumber(-1, 2), new ComplexNumber(-5, -10)], 
  [new ComplexNumber(-3, 4), new ComplexNumber(1, -2), new ComplexNumber(5, 10)], 
  [new ComplexNumber(3, -4), new ComplexNumber(-1, 2), new ComplexNumber(5, 10)], 
  [new ComplexNumber(0, 0), new ComplexNumber(0, 0), new ComplexNumber(0, 0)]
];

describe("mul test", () => {
  test.each(mulTestCases)(
    "given %p and %p as arguments, returns %p",
    (firstArg, secondArg, expectedResult) => {
      const result = mul(firstArg, secondArg);
      expect(result).toEqual(expectedResult);
    }
  );
});

const divTestCases = [
  [new ComplexNumber(3, 4), new ComplexNumber(1, 2), new ComplexNumber(2.2, -0.4)], 
  [new ComplexNumber(-3, -4), new ComplexNumber(-1, -2), new ComplexNumber(2.2, -0.4)], 
  [new ComplexNumber(-3, -4), new ComplexNumber(1, 2), new ComplexNumber(-2.2, 0.4)], 
  [new ComplexNumber(3, -4), new ComplexNumber(1, -2), new ComplexNumber(2.2, 0.4)], 
  [new ComplexNumber(-3, 4), new ComplexNumber(-1, 2), new ComplexNumber(2.2, 0.4)], 
  [new ComplexNumber(-3, 4), new ComplexNumber(1, -2), new ComplexNumber(-2.2, -0.4)], 
  [new ComplexNumber(3, -4), new ComplexNumber(-1, 2), new ComplexNumber(-2.2, -0.4)], 
  [new ComplexNumber(0, 0), new ComplexNumber(0, 0), new ComplexNumber(NaN, NaN)]
];

describe("mul test", () => {
  test.each(divTestCases)(
    "given %p and %p as arguments, returns %p",
    (firstArg, secondArg, expectedResult) => {
      const result = div(firstArg, secondArg);
      expect(result).toEqual(expectedResult);
    }
  );
});