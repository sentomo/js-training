export function cache(f) {
  const cacheMap = new WeakMap();

  return function(obj) {
    if (typeof obj !== 'object') {
      throw new Error("Invalid value used as weak map key");
    }

    if (cacheMap.has(obj)) {
      return cacheMap.get(obj);
    } else {
      const result = f(obj);
      cacheMap.set(obj, result);
      return result;
    }
  };
}

// 時間のかかる処理の例
export function slowFn(obj) {
  // 例として、計算をシミュレーションするための遅延
  let sum = 0;
  for (let i = 0; i < 1e7; i++) {
    sum += i;
  }
  return sum + JSON.stringify(obj);
}

// キャッシュ機能を持った関数の生成
const cachedSlowFn = cache(slowFn);