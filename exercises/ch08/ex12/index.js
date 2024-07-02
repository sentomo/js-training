export function f(body) {
  // $1, $2, ...$10が含まれていない場合はbodyをそのまま返す関数をreturnする
  if (!/\$\d+/.test(body)) {
    return new Function(`return ${body}`);
  }
    
  // 引数名を10個生成
  let argNamesArr = [];
  for (let i = 1; i < 11; i++) {
    argNamesArr.push(`\$${i}`);
  }
  const argNamesStr = argNamesArr.join(', ');

  // 新しい関数を作成
  if (/return/.test(body) || /\n/.test(body)) { 
    return new Function(argNamesStr, body);
  } else {
    return new Function(argNamesStr, `return ${body}`);
  }
}