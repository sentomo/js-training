export function* primes() {
  let numbers = naturalNumbers(); // 2から始まる自然数のジェネレータ

  while (true) {
    let prime = numbers.next().value; // 次の素数を取得(初回は2を取得)
    yield prime;

    // 素数の倍数を除外するフィルタを適用して次のイテレータを作成
    numbers = filter(numbers, n => n % prime !== 0);
  }
}

function filter(iterable, predicate) {
  let iterator = iterable[Symbol.iterator]();
  return {    // このオブジェクトはイテレータであり、反復可能でもある。
    [Symbol.iterator]() { return this; },
    next() {
      for(;;) {
          let v = iterator.next();
          if (v.done || predicate(v.value)) {
              return v;
          }
      }
    }
  };
}

// 2以上の整数列を返すジェネレータ
function* naturalNumbers(start = 2) {
  let n = start;
  while (true) {
    yield n++;
  }
}