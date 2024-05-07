import { filterEvenProperties } from "./index.js";

describe("filterEvenProperties test", () => {
  it("値が偶数のプロパティを含むオブジェクトを渡した時、偶数のプロパティだけを持つオブジェクトが返る", () => {  
    const obj = { a : 1, b : 2, c : 3, d : NaN, e : false, f : undefined };
    const expected = { b : 2 };
    expect(filterEvenProperties(obj)).toStrictEqual(expected);
  });

  it("値が偶数のプロパティだけを持つオブジェクトを渡した時、偶数のプロパティだけを持つオブジェクトが返る", () => {  
    const obj = { a : 0, b : 2, c : 24};
    const expected = { a : 0, b : 2, c : 24};
    expect(filterEvenProperties(obj)).toStrictEqual(expected);
  });

  it("値が偶数のプロパティを含まないオブジェクトを渡した時、空のオブジェクトが返る", () => {  
    const obj = { a : 1, c : 3, d : NaN, e : false, f : undefined };
    const expected = {};
    expect(filterEvenProperties(obj)).toStrictEqual(expected);

  });
  
  it("空のオブジェクトを渡した時、空のオブジェクトが返る", () => {  
    const obj = {};
    const expected = {};
    expect(filterEvenProperties(obj)).toStrictEqual(expected);

  });
});

// オブジェクトの中身があっているかを確認したい時は、、toBe()ではなく、toStrictEqual()を使う。
// 参考：https://qiita.com/TMDM/items/8c6a006d0c82aa8ba5e4#tostrictequal%E3%82%92%E4%BD%BF%E3%81%86%E3%82%B1%E3%83%BC%E3%82%B9