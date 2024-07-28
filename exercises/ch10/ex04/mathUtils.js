// 任意の関数: 2つの数値の和を計算する関数
export function add(a, b) {
  return a + b;
}

// 任意のクラス: 簡単な計算機クラス
export default class Calculator {
  constructor() {
    this.result = 0;
  }

  add(a) {
    this.result += a;
    return this;
  }

  subtract(a) {
    this.result -= a;
    return this;
  }

  multiply(a) {
    this.result *= a;
    return this;
  }

  divide(a) {
    if (a !== 0) {
      this.result /= a;
    } else {
      throw new Error('Division by zero');
    }
    return this;
  }

  getResult() {
    return this.result;
  }

  reset() {
    this.result = 0;
    return this;
  }
}