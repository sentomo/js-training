export function sequenceToObject(...values) {
  // 値の個数が偶数でない場合は例外を発生させる
  if (values.length % 2 !== 0) {
      throw new Error("The total number of values must be even.");
  }

  const result = {};
  for (let i = 0; i < values.length; i += 2) {
      const key = values[i];
      const value = values[i + 1];

      // 奇数番目の値が string でない場合は例外を発生させる
      if (typeof key !== "string") {
          throw new Error("Every odd index value must be a string.");
      }

      result[key] = value;
  }

  return result;
}