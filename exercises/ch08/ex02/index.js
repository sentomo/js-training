// 再帰
export const powerRecursive = (base, exponent) => {
  if (exponent === 0) return 1;
  if (exponent === 1) return base;

  // 分割統治法
  if (exponent > 0) {
    if (exponent % 2 === 0) {
        const halfPower = powerRecursive(base, exponent / 2); // 指数が2で割り切れる場合は指数を半分にして計算して再帰の深さを減らす。
        return halfPower * halfPower;
    } else {
        return base * powerRecursive(base, exponent - 1); // (base^exponent) == base * (base^(exponent-1))
    }
  } else{ // 負の指数の場合
    exponent = Math.abs(exponent); // 絶対値を取得
    if (exponent % 2 === 0) {
      const halfPower = powerRecursive(base, exponent / 2);
      return 1 / (halfPower * halfPower); // 逆数を返す
    } else {
        return 1 / (base * powerRecursive(base, -exponent - 1)); // 逆数を返す
    }
  }
};

// ループ
export const powerLoop = (base, exponent) => {
  let result = 1;
  let currentBase = base;
  let currentExponent = Math.abs(exponent);

  // 繰り返し二乗法
  while (currentExponent > 0) {
      if (currentExponent % 2 === 1) {
          result *= currentBase;
      }
      currentBase *= currentBase;
      currentExponent = Math.floor(currentExponent / 2);  // Math.floor()関数は与えられた数値以下の最大の整数を返す。指数を2で割ってループの回数を減らす。
  }

  if (exponent < 0) {
    return 1 / result; // 負の指数の場合は結果の逆数を返す
  } else {
      return result;
  }
};

// 参考：https://qiita.com/drken/items/872ebc3a2b5caaa4a0d0