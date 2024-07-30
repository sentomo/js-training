import { cache, slowFn } from './index.js';

describe('cache function', () => {
  it('同じ入力オブジェクトに対してキャッシュされた結果を返す', () => {
    const cachedSlowFn = cache(slowFn);
    const obj = { key: 'value' };

    const result1 = cachedSlowFn(obj);
    const result2 = cachedSlowFn(obj);

    expect(result1).toBe(result2);
  });

  it('異なる入力オブジェクトに対して異なる結果を返す', () => {
    const cachedSlowFn = cache(slowFn);
    const obj1 = { key: 'value1' };
    const obj2 = { key: 'value2' };

    const result1 = cachedSlowFn(obj1);
    const result2 = cachedSlowFn(obj2);

    expect(result1).not.toBe(result2);
  });

  it('計算結果がキャッシュされている', () => {
    const cachedSlowFn = cache(slowFn);
    const obj = { key: 'value' };

    const result = cachedSlowFn(obj);

    // slowFnの結果を手動で計算
    let expectedSum = 0;
    for (let i = 0; i < 1e7; i++) {
      expectedSum += i;
    }
    const expectedResult = expectedSum + JSON.stringify(obj);

    expect(result).toBe(expectedResult);
  });

  it('同じ引数で繰り返し呼び出された場合、同じ結果を返す', () => {
    const cachedSlowFn = cache(slowFn);

    const obj1 = { key: 'value1' };
    const obj2 = { key: 'value2' };

    const result1 = cachedSlowFn(obj1);
    const result2 = cachedSlowFn(obj2);
    const result3 = cachedSlowFn(obj1);
    const result4 = cachedSlowFn(obj2);

    expect(result1).toBe(result3);
    expect(result2).toBe(result4);
  });

  it('nullまたはundefinedの入力に対してエラーをスローする', () => {
    const cachedSlowFn = cache(slowFn);

    expect(() => cachedSlowFn(null)).toThrow("Invalid value used as weak map key");
    expect(() => cachedSlowFn(undefined)).toThrow("Invalid value used as weak map key");
  });
});
