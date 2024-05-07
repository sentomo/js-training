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

// withを使わない場合
console.time("NoWith");
for (let i = 0; i < 1000000; i++) {
  const sum = sampleObj.a + sampleObj.b + sampleObj.c + sampleObj.d + sampleObj.e + sampleObj.f + sampleObj.g + sampleObj.h + sampleObj.i + sampleObj.j;
}
console.timeEnd("NoWith"); // "Without: <時間>ms"