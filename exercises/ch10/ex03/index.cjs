const { add, Calculator } = require('./mathUtils.cjs');

// 関数の使用例
const sum = add(5, 7);
console.log(`Sum: ${sum}`); // Sum: 12

// クラスの使用例
const calc = new Calculator();
calc.add(10).subtract(3).multiply(4).divide(2);
console.log(`Result: ${calc.getResult()}`); // Result: 14
