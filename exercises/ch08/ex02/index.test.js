import { powerRecursive, powerLoop } from './index.js';

describe('powerRecursive test', () => {
  it('指数が0の時、1を返す', () => {
    const base = 5;
    const exponent = 0;
    const result = powerRecursive(base, exponent);
    expect(result).toBe(1);
  });

  it('指数が1の時、基底の値を返す', () => {
    const base = 5;
    const exponent = 1;
    const result = powerRecursive(base, exponent);
    expect(result).toBe(base);
  });

  it('指数が偶数の時', () => {
    const base = 3;
    const exponent = 6;
    const result = powerRecursive(base, exponent);
    expect(result).toBe(Math.pow(base, exponent));
  });

  it('指数が奇数の時', () => {
    const base = 2;
    const exponent = 7;
    const result = powerRecursive(base, exponent);
    expect(result).toBe(Math.pow(base, exponent));
  });

  it('基底が負の整数の時', () => {
    const base = -3;
    const exponent = 4;
    const result = powerRecursive(base, exponent);
    expect(result).toBe(Math.pow(base, exponent));
  });

  it('指数が負の整数の時', () => {
    const base = 3;
    const exponent = -2;
    const result = powerRecursive(base, exponent);
    expect(result).toBe(Math.pow(base, exponent));
  });
});

describe('powerLoop test', () => {
  it('指数が0の時、1を返す', () => {
    const base = 5;
    const exponent = 0;
    const result = powerLoop(base, exponent);
    expect(result).toBe(1);
  });

  it('指数が1の時、基底の値を返す', () => {
    const base = 5;
    const exponent = 1;
    const result = powerLoop(base, exponent);
    expect(result).toBe(base);
  });

  it('指数が偶数の時', () => {
    const base = 3;
    const exponent = 6;
    const result = powerLoop(base, exponent);
    expect(result).toBe(Math.pow(base, exponent));
  });

  it('指数が奇数の時', () => {
    const base = 2;
    const exponent = 7;
    const result = powerLoop(base, exponent);
    expect(result).toBe(Math.pow(base, exponent));
  });

  it('基底が負の整数の時', () => {
    const base = -3;
    const exponent = 4;
    const result = powerLoop(base, exponent);
    expect(result).toBe(Math.pow(base, exponent));
  });

  it('指数が負の整数の時', () => {
    const base = 3;
    const exponent = -2;
    const result = powerLoop(base, exponent);
    expect(result).toBe(Math.pow(base, exponent));
  });
});
