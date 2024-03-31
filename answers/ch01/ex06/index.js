export function fib(x) {
  // if (x <= 1) {
  //   return x;
  // }
  // else {
  //   return fib(x - 1) + fib(x - 2);
  // }
  // 再帰関数を使う方法だと、テストが完了しない

  if(typeof x !== "number") return;

  if (x <= 1) {
    return x;
  }

  let fibList = [0, 1];
    for (let i = 2; i <= x; ++i) {
        let nextFib = fibList[i - 1] + fibList[i - 2];
        fibList.push(nextFib);
    }
  return fibList[x];
}