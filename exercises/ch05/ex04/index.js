// while
export function getFibonacciWhile(count) {
  let result = [];
  let a = 1, b = 1;

  while (result.length < count) {
    result.push(a); // 次の数を追加
    [a, b] = [b, a + b]; // a, b を更新
  }

  return result;
}

// do-while
export function getFibonacciDoWhile(count) {
  let result = [];
  let a = 1, b = 1;

  do {
    result.push(a); // 次の数を追加
    [a, b] = [b, a + b]; // a, b を更新
  } while (result.length < count);

  return result;
}

// for
export function getFibonacciFor(count) {
  let result = [];
  let a = 1, b = 1;

  for (let i = 0; i < count; i++) {
    result.push(a); // 次の数を追加
    [a, b] = [b, a + b]; // a, b を更新
  }

  return result;
}
