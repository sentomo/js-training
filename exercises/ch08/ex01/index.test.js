import { printAndReturnArray, square, getCurrentTimeObject } from "./index.js";
import { jest } from '@jest/globals';


// console.logをモックする
global.console = {
  log: jest.fn(),
};

describe('printAndReturnArray test', () => {
  beforeEach(() => {
    console.log.mockClear(); // 各テスト前にconsole.logモックをクリアする
  });

  test('nが数値ではない場合はundefinedを返す', () => {
    expect(printAndReturnArray('1', 'A')).toBeUndefined();
  });

  test('nが1より小さい場合はundefinedを返す', () => {
    expect(printAndReturnArray(0, 'A')).toBeUndefined();
  });

  test('cが英数字でない場合はundefinedを返す', () => {
    expect(printAndReturnArray(1, '@')).toBeUndefined();
  });

  test('nが3でcが英数字の場合はmockを3回呼んで配列を返す', () => {
    const result = printAndReturnArray(3, '1A');
    expect(result).toEqual(['1A', '1A', '1A']);
    expect(console.log).toHaveBeenCalledTimes(3);
    expect(console.log).toHaveBeenCalledWith('1A');
  });

  test('nが0の場合はundefinedを返す', () => {
    const result = printAndReturnArray(0, 'A');
    expect(result).toBeUndefined();
    expect(console.log).not.toHaveBeenCalled();
  });

  test('nが1でcが数字の場合はmockを1回呼んで配列を返す', () => {
    const result = printAndReturnArray(1, '1');
    expect(result).toEqual(['1']);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('1');
  });

  test('nが1でcが小文字のアルファベットの場合はmockを1回呼んで配列を返す', () => {
    const result = printAndReturnArray(1, 'a');
    expect(result).toEqual(['a']);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('a');
  });
});

describe('square test', () => {
  test('正の数の二乗を計算する', () => {
    expect(square(2)).toBe(4);
    expect(square(5)).toBe(25);
    expect(square(10)).toBe(100);
  });

  test('負の数の二乗を計算する', () => {
    expect(square(-2)).toBe(4);
    expect(square(-5)).toBe(25);
    expect(square(-10)).toBe(100);
  });

  test('0の二乗を計算する', () => {
    expect(square(0)).toBe(0);
  });

  test('小数の二乗を計算する', () => {
    expect(square(0.5)).toBe(0.25);
    expect(square(-0.5)).toBe(0.25);
  });

  test('Infinityの二乗を計算する', () => {
    expect(square(Infinity)).toBe(Infinity);
    expect(square(-Infinity)).toBe(Infinity);
  });

  test('NaNの二乗を計算する', () => {
    expect(square(NaN)).toBeNaN();
  });
});

describe('getCurrentTimeObject test', () => {
  test('オブジェクトを返す', () => {
    const result = getCurrentTimeObject();
    expect(result).toBeInstanceOf(Object);
  });

  test('オブジェクトにnowプロパティが存在する', () => {
    const result = getCurrentTimeObject();
    expect(result).toHaveProperty('now');
  });

  test('nowプロパティがDateオブジェクトである', () => {
    const result = getCurrentTimeObject();
    expect(result.now).toBeInstanceOf(Date);
  });

  test('nowプロパティが現在時刻に近い値である', () => {
    const result = getCurrentTimeObject();
    const now = new Date();
    const timeDifference = Math.abs(now.getTime() - result.now.getTime());
    expect(timeDifference).toBeLessThan(1000); // 1秒以内の差であれば現在時刻と見なす
  });
});