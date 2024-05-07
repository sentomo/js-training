import { isWeekendIfElse, isWeekendSwitch } from "./index.js";

const testCases = [
  ["土", true], 
  ["日", true], 
  ["水", false]
];

describe("if-else function test", () => {
    test.each(testCases)(
      "given %p as arguments, returns %p",
      (arg, expectedResult) => {
        const result = isWeekendIfElse(arg);
        expect(result).toEqual(expectedResult);
      }
    );
});

describe("switch function test", () => {
  test.each(testCases)(
    "given %p as arguments, returns %p",
    (arg, expectedResult) => {
      const result = isWeekendSwitch(arg);
      expect(result).toEqual(expectedResult);
    }
  );
});