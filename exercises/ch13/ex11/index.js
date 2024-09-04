export function retryWithExponentialBackoff(func, maxRetry) {
  let retryCount = 0;

  // リトライ処理を定義する関数
  function retry() {
    return func()
      .then(result => {
        if (result === true) { // 成功した場合、Promiseを解決する
          return true;
        } else if (retryCount < maxRetry) { // 失敗した場合、リトライする
          retryCount++;
          const delay = Math.pow(2, retryCount - 1) * 1000; // 指数バックオフ時間計算

          // 待機してから再試行
          return new Promise(resolve => setTimeout(resolve, delay))
            .then(retry);
        } else { // 最大リトライ回数に達した場合、Promiseを拒否する
          return Promise.reject(false);
        }
      })
      .catch(() => {
        // func が失敗した場合もリトライする
        if (retryCount < maxRetry) {
          retryCount++;
          const delay = Math.pow(2, retryCount - 1) * 1000; // 指数バックオフ時間計算

          // 待機してから再試行
          return new Promise(resolve => setTimeout(resolve, delay))
            .then(retry);
        } else {
          // 最大リトライ回数に達した場合、Promiseを拒否する
          return Promise.reject(false);
        }
      });
  }

  // 初回の試行を開始し、結果に応じてPromiseを返す
  return retry()
    .then(() => true) // 成功した場合はtrueを返す
    .catch(() => Promise.reject(false)); // 失敗した場合はrejectとしてfalseを返す
}
