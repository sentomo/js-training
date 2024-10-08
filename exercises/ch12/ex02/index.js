/*
function* fibonacciSequence() {
    let x = 0, y = 1;
    for(;;) {
yield y;
[x, y] = [y, x+y]; // 分割代入を行っている。 }
}
*/

export function fibonacciSequence() {
  let x = 0, y = 1;
  return {
    [Symbol.iterator]() { return this; },

    next() {
        const value = y;
        [x, y] = [y, x + y]; // 分割代入を行っている。
        return { value: value, done: false }; // done: falseを返すことでイテレータが終了しない
    }
  };
}