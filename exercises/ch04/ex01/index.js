// 虚数：二乗するとマイナスになるような数。imaginaryの頭文字iで表す。
// 実数：有理数(整数、有限小数、循環小数)と無理数(循環しない無限小数)を合わせたもの。
// 複素数：実数と虚数を組み合わせたもの。2つの実数 a, b と虚数単位 i = √−1 を用いて z = a + bi と表すことのできる数のこと。
// 複素数の四則演算：https://study-search.jp/columns/1413
// 複素数の割り算：分母の共役複素数を分母・分子に掛けて分母の実数化を行う。
// 共役複素数：複素数a=a+biに対して「a-bi」となる複素数のこと。iの前の符号が異なるものを指す。

export　class ComplexNumber {
  constructor(real, imaginary) {
      this.real = real;
      this.imaginary = imaginary;
  }
}

export function add(x, y) {
      return new ComplexNumber(x.real + y.real, x.imaginary + y.imaginary);
}

export function sub(x, y) {
      return new ComplexNumber(x.real - y.real, x.imaginary - y.imaginary);
  }

export function mul(x, y) {
    const newReal = x.real * y.real - x.imaginary * y.imaginary;
    const newImaginary = x.real * y.imaginary + x.imaginary * y.real;
    return new ComplexNumber(newReal, newImaginary);
}

export function div(x, y) {
      const denominator = y.real * y.real + y.imaginary * y.imaginary;
      console.log("denominator:" + denominator);
      const newReal = (x.real * y.real + x.imaginary * y.imaginary) / denominator;
      const newImaginary = (x.imaginary * y.real - x.real * y.imaginary) / denominator;
      return new ComplexNumber(newReal, newImaginary);
}


const z1 = new ComplexNumber(3, 4);
const z2 = new ComplexNumber(1, 2);

const sum = add(z1, z2);
const difference = sub(z1, z2);
const product = mul(z1, z2);
const quotient = div(z1, z2);

console.log("Sum:", sum.real, "+", sum.imaginary, "i");
console.log("Difference:", difference.real, "+", difference.imaginary, "i");
console.log("Product:", product.real, "+", product.imaginary, "i");
console.log("Quotient:", quotient.real, "+", quotient.imaginary, "i");


console.log(div(new ComplexNumber(3, 4), new ComplexNumber(1, 2))); 
console.log(div(new ComplexNumber(-3, -4), new ComplexNumber(-1, -2)));
console.log(div(new ComplexNumber(-3, -4), new ComplexNumber(1, 2)));
console.log(div(new ComplexNumber(3, -4), new ComplexNumber(1, -2)));
console.log(div(new ComplexNumber(-3, 4), new ComplexNumber(-1, 2)));
console.log(div(new ComplexNumber(-3, 4), new ComplexNumber(1, -2)));
console.log(div(new ComplexNumber(3, -4), new ComplexNumber(-1, 2)));
console.log(div(new ComplexNumber(0, 0), new ComplexNumber(0, 0)));
