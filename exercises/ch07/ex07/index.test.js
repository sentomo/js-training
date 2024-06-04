import { bubbleSort } from "./index.js";

describe("bubbleSort test", () => {
  it("要素が数字の配列のソート", () => {
    const array = [100, 2, 30, 400, 5];
    const expected = [2, 5, 30, 100, 400];
    expect(JSON.stringify(bubbleSort(array))).toBe(JSON.stringify(expected));
  });

  it("要素が英語の配列のソート", () => {
    const array = ["Mango", "Banana", "Grape", "Apple", "Orange"];
    const expected = ["Apple", "Banana", "Grape", "Mango", "Orange"];
    expect(JSON.stringify(bubbleSort(array))).toBe(JSON.stringify(expected));
  });

  it("要素が数字と英語の配列のソート", () => {
    const array = ["Mango", "20", "Banana", "5", "Grape", "0", "Apple", "100", "Orange"];
    const expected = ["0", "100", "20", "5", "Apple", "Banana", "Grape", "Mango", "Orange"];
    expect(JSON.stringify(bubbleSort(array))).toBe(JSON.stringify(expected));
  });
});