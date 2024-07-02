import { any, catching } from "./index.js";

describe('any test', () => {
  const isNonZero = any(
      (n) => n > 0,
      (n) => n < 0
  );

  it('正の数を渡すと true を返す', () => {
      expect(isNonZero(42)).toBe(true);
  });

  it('負の数を渡すと true を返す', () => {
      expect(isNonZero(-0.5)).toBe(true);
  });

  it('ゼロを渡すと false を返す', () => {
      expect(isNonZero(0)).toBe(false);
  });

  it('数値でない入力を渡すと false を返す', () => {
      expect(isNonZero('abc')).toBe(false);
  });
});

describe('catching test', () => {
  const safeJsonParse = catching(JSON.parse, (e) => {
      return { error: e.toString() };
  });

  it('正しいJSON文字列を渡すとパース結果を返す', () => {
      expect(safeJsonParse('{"a": 1}')).toEqual({ a: 1 });
  });

  it('不正なJSON文字列を渡すとエラーオブジェクトを返す', () => {
      expect(safeJsonParse('{Invalid Json}')).toEqual({
          error: 'SyntaxError: Unexpected token I in JSON at position 1'
      });
  });

  it('空文字列を渡すとエラーオブジェクトを返す', () => {
      expect(safeJsonParse('')).toEqual({
          error: 'SyntaxError: Unexpected end of JSON input'
      });
  });
});