import { primes } from "./index.js";

describe('primes generator', () => {
  let primeGenerator;

  beforeEach(() => {
    primeGenerator = primes();
  });

  it('初期値を確認', () => {
    expect(primeGenerator.next().value).toBe(2);
  });

  it('最初の10個の素数を正しく生成できる', () => {
    const expectedPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
    const generatedPrimes = [];
    for (let i = 0; i < 10; i++) {
      generatedPrimes.push(primeGenerator.next().value);
    }
    expect(generatedPrimes).toEqual(expectedPrimes);
  });

  it('28番目の素数が正しい', () => {
    let prime;
    for (let i = 0; i < 28; i++) {
      prime = primeGenerator.next().value;
    }
    expect(prime).toBe(107);
  });

  it('無限ループであることを確認', () => {
    for (let i = 0; i < 1000; i++) {
      const result = primeGenerator.next();
      expect(result.done).toBe(false);
      expect(typeof result.value).toBe('number');
      expect(result.value).toBeGreaterThan(0);
    }
  });
});