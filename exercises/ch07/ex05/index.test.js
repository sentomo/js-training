import { pop, push, shift, unshift, sort } from "./index.js";

test("pop", () => {
  const seq = [1, 2, 3, 4, 5];
  const expected = [1, 2, 3, 4];
  expect(pop(seq)).toStrictEqual(expected);
  
  const afterSeq = seq; 
  expect(afterSeq).toStrictEqual(seq);
});

test("push", () => {
  const seq = [1, 2, 3, 4, 5];
  const expected = [1, 2, 3, 4, 5, 6];
  expect(push(seq, 6)).toStrictEqual(expected);
  
  const afterSeq = seq; 
  expect(afterSeq).toStrictEqual(seq);
});

test("shift", () => {
  const seq = [1, 2, 3, 4, 5];
  const expected = [2, 3, 4, 5];
  expect(shift(seq)).toStrictEqual(expected);
  
  const afterSeq = seq; 
  expect(afterSeq).toStrictEqual(seq);
});

test("unshift", () => {
  const seq = [1, 2, 3, 4, 5];
  const expected = [0, 1, 2, 3, 4, 5];
  expect(unshift(seq, 0)).toStrictEqual(expected);
  
  const afterSeq = seq; 
  expect(afterSeq).toStrictEqual(seq);
});

test("sort", () => {
  const seq = [1, 2, 3, 4, 5];
  const expected = [5, 4, 3, 2, 1];
  expect(sort(seq, (a, b) => b - a)).toStrictEqual(expected);
  
  const afterSeq = seq; 
  expect(afterSeq).toStrictEqual(seq);
});
