import { addNumber, calc } from "./index.js";

const sum = addNumber(5, 4);
console.log(`Result: ${sum}`); // Result: 9

const calculator = new calc();
calculator.add(5).subtract(1).multiply(4).divide(2);
console.log(`Result: ${calculator.getResult()}`); // Result: 8
