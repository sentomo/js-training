import { sequenceToObject } from './index.js';

describe('sequenceToObject test', () => {
  it('有効な入力で正しいオブジェクトを返す', () => {
    expect(sequenceToObject("x", 10, "y", 20, "z", 30)).toEqual({x: 10, y: 20, z: 30});
  });

  it('スプレッド演算子を正しく処理する', () => {
      const array = ["a", 1, "b", 2, "c", 3];
      expect(sequenceToObject(...array)).toEqual({a: 1, b: 2, c: 3});
  });

  it('引数の数が奇数の場合にエラーをスローする', () => {
      expect(() => sequenceToObject("a", 1, "b")).toThrow("The total number of values must be even.");
  });

  it('奇数番目の値が文字列でない場合にエラーをスローする', () => {
      expect(() => sequenceToObject(1, "a", "b", 2)).toThrow("Every odd index value must be a string.");
  });

  it('引数がない場合に空のオブジェクトを返す', () => {
      expect(sequenceToObject()).toEqual({});
  });
});