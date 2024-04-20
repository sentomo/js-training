test("テスト名を適切につけてなさい", () => {
  let points = [{x:1, y:2}, {x:3, y:4}];
  let [{x:x1, y:y1}, {x:x2, y:y2}] = points;
  expect(x1).toBe(1);
  expect(y1).toBe(2);
  expect(x2).toBe(3);
  expect(y2).toBe(4);
});

// 参考：https://typescriptbook.jp/reference/values-types-variables/object/destructuring-assignment-from-objects#%E3%83%87%E3%83%95%E3%82%A9%E3%83%AB%E3%83%88%E5%80%A4%E3%81%A8%E5%A4%89%E6%95%B0%E5%90%8D%E3%81%AE%E6%8C%87%E5%AE%9A