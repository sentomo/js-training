import { add, default as Calculator } from './mathUtils.js'; //名前変更を伴うインポート
export { add as addNumber, default as calc } from './mathUtils.js'; //再エクスポート

// 関数の使用例
const sum = add(5, 7);
console.log(`Sum: ${sum}`); // Sum: 12

// クラスの使用例
const calculator = new Calculator();
calculator.add(10).subtract(3).multiply(4).divide(2);
console.log(`Result: ${calculator.getResult()}`); // Result: 14