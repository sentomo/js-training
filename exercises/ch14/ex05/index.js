export function typeOfTemplateLiteral(strings, ...values) { // 第一引数は文字列を持つ配列、第二引数は補間値
  return strings.reduce((result, str, index) => {
    const valueType = typeof values[index - 1]; // 前の値の型を取得
    return result + str + (index > 0 ? valueType : ''); // 型名を展開
  });
}