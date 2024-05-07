const sampleObj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10
};

// withを使った場合
console.time("With");
for (let i = 0; i < 1000000; i++) {
  // prettier-ignore
  with (sampleObj) {
    const sum = a + b + c + d + e + f + g + h + i + j;
  }
}
console.timeEnd("With"); // "With: <時間>ms"