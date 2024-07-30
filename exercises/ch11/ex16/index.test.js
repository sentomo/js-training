import { retryWithExponentialBackoff } from "./index.js";

describe("retryWithExponentialBackoff", () => {
  it("関数が最初の呼び出しで成功した場合、即座に成功をコールバックする", (done) => {
    let callCount = 0;
    const func = async () => {
      callCount++;
      return true; // 成功
    };
    const callback = (result) => {
      expect(result).toBe(true);
      expect(callCount).toBe(1); // 最初の呼び出しで成功するため
      done();
    };

    retryWithExponentialBackoff(func, 3, callback);
  });

  it("関数が指定回数リトライ後に成功した場合、最終的な結果をコールバックする", (done) => {
    let callCount = 0;
    const func = async () => {
      callCount++;
      return callCount >= 2; // 2回目の呼び出しで成功
    };
    const callback = (result) => {
      expect(result).toBe(true);
      expect(callCount).toBe(2); // 2回リトライして成功するため
      done();
    };

    retryWithExponentialBackoff(func, 3, callback);
  });

  // WIP
  it("関数が指定回数リトライ後に失敗した場合、失敗をコールバックする", (done) => {
    let callCount = 0;
    const func = async () => {
      callCount++;
      return false; // 常に失敗する
    };
    const callback = (result) => {
      expect(result).toBe(false);
      expect(callCount).toBe(4); // maxRetry回リトライしても失敗するため
      done();
    };

    retryWithExponentialBackoff(func, 3, callback);
  });

  // WIP
  it("関数が最初から失敗し、指定回数のリトライを行う場合、適切にリトライする", (done) => {
    let callCount = 0;
    const func = async () => {
      callCount++;
      return false; // 常に失敗する
    };
    const callback = (result) => {
      expect(result).toBe(false);
      expect(callCount).toBe(4); // 3回リトライし、最終的に失敗するため
      done();
    };

    retryWithExponentialBackoff(func, 3, callback);
  });
});