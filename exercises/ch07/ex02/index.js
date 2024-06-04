function fizzbuzz(n) {
  let array = new Array(n).fill(0);// 配列を0で初期化、疎な配列だとmapで指定した関数が呼び出されないため
  array.forEach((_, i) => { // 第一引数の要素は使わないため、アンダースコアを渡す(Cf: https://ja.stackoverflow.com/questions/65430/%E3%82%A2%E3%83%B3%E3%83%80%E3%83%BC%E3%83%90%E3%83%BC%E3%81%AE%E3%81%BF%E3%81%AE%E5%A4%89%E6%95%B0%E3%81%AE%E6%84%8F%E5%91%B3)
    array[i] = i + 1;
  });

  array.map(i => 
    (i % 3 === 0 ? "Fizz" : "") + (i % 5 === 0 ? "Buzz" : "") || i
  ).forEach(result => console.log(result));
}

function sumOfSquaredDifference(f, g) {
  return f.forEach((result, value, i) => { result += (f[i] - g[i]) ** 2; }, 0); // result:累積結果、value:fの要素、i:インデックス
}

function sumOfEvensIsLargerThan42(array) {
  return array.filter(x => x % 2 === 0).reduce((sum, x) => sum + x, 0) > 42;
}