import { jest } from '@jest/globals';
import { retryWithExponentialBackoff } from './index.js';

describe('指数バックオフのテスト', () => {
  it('funcが初回で成功した場合、retryWithExponentialBackoffはtrueを返す', async () => {
    const func = jest.fn().mockResolvedValueOnce(true);
    await expect(retryWithExponentialBackoff(func, 3)).resolves.toBe(true);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('funcが失敗し、最大リトライ回数内で成功した場合、retryWithExponentialBackoffはtrueを返す', async () => {
    const func = jest.fn()
      .mockResolvedValueOnce(false)  // 1回目の呼び出し: 失敗
      .mockResolvedValueOnce(true);  // 2回目の呼び出し: 成功

    await expect(retryWithExponentialBackoff(func, 3)).resolves.toBe(true);
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('funcが最大リトライ回数まで失敗し続けた場合、retryWithExponentialBackoffはfalseを返す', async () => {
    const func = jest.fn()
      .mockResolvedValueOnce(false)  // 1回目の呼び出し: 失敗
      .mockResolvedValueOnce(false)  // 2回目の呼び出し: 失敗
      .mockResolvedValueOnce(false)  // 3回目の呼び出し: 失敗
      .mockResolvedValueOnce(false);  // 4回目の呼び出し: 失敗

    await expect(retryWithExponentialBackoff(func, 3)).rejects.toBe(false);
    expect(func).toHaveBeenCalledTimes(4); // 初回 + リトライ回数(3)
  }, 16000); // 第3引数にタイムアウトの秒数を設定できる。デフォルトは5秒。 Cf: https://jestjs.io/docs/api#testname-fn-timeout

  it('funcが失敗し、リトライの間に適切な待機時間が挿入される', async () => {
    const func = jest.fn()
      .mockResolvedValueOnce(false)  // 1回目の呼び出し: 失敗
      .mockResolvedValueOnce(false)  // 2回目の呼び出し: 失敗
      .mockResolvedValueOnce(true);  // 3回目の呼び出し: 成功

    const startTime = Date.now();
    await expect(retryWithExponentialBackoff(func, 3)).resolves.toBe(true);
    const endTime = Date.now();

    // リトライの間に適切な待機時間があることを確認
    expect(endTime - startTime).toBeGreaterThanOrEqual(3000); // 1秒 + 2秒 = 3秒以上
    expect(func).toHaveBeenCalledTimes(3);
  });
});
