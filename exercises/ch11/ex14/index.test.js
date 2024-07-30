import { sortJapanese, toJapaneseDateString } from './index.js';

// 日本語の配列をソートする関数のテスト
describe("sortJapanese関数のテスト", () => {
  it("日本語の文字列を正しくソートする", () => {
    const input = ['さ', 'あ', 'た', 'す', 'い'];
    const expected = ['あ', 'い', 'さ', 'す', 'た'];
    expect(sortJapanese(input)).toStrictEqual(expected);
  });

  it("濁点と半濁点を無視してソートする", () => {
    const input = ['ば', 'は', 'ぱ', 'が', 'か'];
    const expected = ['が', 'か', 'ば', 'は', 'ぱ'];
    expect(sortJapanese(input)).toStrictEqual(expected);
  });

  it("大文字小文字の違いを無視してソートする", () => {
    const input = ['て', 'っ', 'つ'];
    const expected = ['っ', 'つ', 'て'];
    expect(sortJapanese(input)).toStrictEqual(expected);
  });
});

// 和暦日付形式のテスト
describe("toJapaneseDateString関数のテスト", () => {
  it("令和の形式で日付を正しくフォーマットする", () => {
    const date = new Date(Date.UTC(2024, 3, 2)); // 2024年4月2日
    const expected = '令和6年4月2日';
    expect(toJapaneseDateString(date)).toBe(expected);
  });

  it("他の日付も正しくフォーマットする", () => {
    const date = new Date(Date.UTC(2025, 11, 31)); // 2025年12月31日
    const expected = '令和7年12月31日';
    expect(toJapaneseDateString(date)).toBe(expected);
  });

  it("日付の異なるフォーマットも正しく処理する", () => {
    const date = new Date(Date.UTC(2021, 0, 1)); // 2021年1月1日
    const expected = '令和3年1月1日';
    expect(toJapaneseDateString(date)).toBe(expected);
  });
});
