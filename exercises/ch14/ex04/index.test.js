import { Hiragana } from "./index.js";

describe("Hiragana", () => {
  test("ひらがな1文字とそのUTF-16コード単位を持つ", () => {
    const hira = new Hiragana("あ");
    expect(hira.char).toBe("あ");
    expect(hira.codeUnit).toBe(0x3042); // UTF-16 コード単位
  });

  test("文字列が期待される場合、ひらがなを返す", () => {
    const hira = new Hiragana("い");
    expect(`${hira}`).toBe("い");
  });

  test("数字が期待される場合、UTF-16コード単位を返す", () => {
    const hira = new Hiragana("う");
    expect(+hira).toBe(0x3046); // "う" の UTF-16 コード単位は 12358
  });

  test("比較演算子で50音順にソートできる", () => {
    const list = [
      new Hiragana("え"),
      new Hiragana("い"),
      new Hiragana("お"),
      new Hiragana("あ"),
      new Hiragana("う"),
    ];

    const sorted = list.sort((a, b) => a > b ? 1 : -1).map(h => `${h}`);
    expect(sorted).toStrictEqual(["あ", "い", "う", "え", "お"]);
  });

  test("不正な文字が渡された場合エラーを投げる", () => {
    expect(() => new Hiragana("カ")).toThrow("ひらがな1文字のみ指定してください。");
    expect(() => new Hiragana("A")).toThrow("ひらがな1文字のみ指定してください。");
  });
});
