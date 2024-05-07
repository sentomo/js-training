import { getFibonacciWhile, getFibonacciDoWhile, getFibonacciFor } from "./index.js";

const expected = [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

describe("getFibonacci test", () => {
  it("while文を使用した関数のテスト", () => {  
    expect(getFibonacciWhile(10)).toStrictEqual(expected);
    expect(getFibonacciWhile(10).length).toBe(expected.length);
  });
  
  it("do/while文を使用した関数のテスト", () => {  
    expect(getFibonacciDoWhile(10)).toStrictEqual(expected);
    expect(getFibonacciDoWhile(10).length).toBe(expected.length);

  });

  it("for文を使用した関数のテスト", () => {  
    expect(getFibonacciFor(10)).toStrictEqual(expected);
    expect(getFibonacciFor(10).length).toBe(expected.length);

  });
});

// 配列の中身があっているかを確認したい時は、、toBe()ではなく、toStrictEqual()を使う。
// 参考：https://qiita.com/TMDM/items/8c6a006d0c82aa8ba5e4#tostrictequal%E3%82%92%E4%BD%BF%E3%81%86%E3%82%B1%E3%83%BC%E3%82%B9