let symbol1 = Symbol("property");
let symbol2 = Symbol("property");
let o = {symbol1:1, symbol2:2};
console.log(o[symbol1]);
console.log(o[symbol2]);
console.log(symbol1);
console.log(symbol2);

let symbolFor1 = Symbol.for("property2");
let symbolFor2 = Symbol.for("property2");
let o2 = {symbolFor1:1, symbolFor2:2};
console.log(o2[symbolFor1]);
console.log(o2[symbolFor2]);
console.log(symbolFor1);
console.log(symbolFor2);