export async function retryWithExponentialBackoff(func, maxRetry, callback) {
  let retryCount = 0;

  async function attempt() {
    try {
      const result = await func(); // 非同期関数を待機して結果を取得

      if (result === true) {
        callback(true); // 成功時にコールバックを呼び出す
      } else if (retryCount < maxRetry) {
        retryCount++;
        const delay = Math.pow(2, retryCount) * 1000; // 指数バックオフ時間計算

        setTimeout(attempt, delay); // 遅延して再試行
      } else {
        callback(false); // 最大リトライ回数に達したら失敗をコールバック
      }
    } catch (error) {
      // エラーが発生した場合もリトライする
      if (retryCount < maxRetry) {
        retryCount++;
        const delay = Math.pow(2, retryCount) * 1000; // 指数バックオフ時間計算
        setTimeout(attempt, delay); // 遅延して再試行
      } else {
        callback(false); // 最大リトライ回数に達したら失敗をコールバック
      }
    }
  }

  attempt();
}
