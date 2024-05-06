// 以下、予想
// typeof undefined →"undefined"
// typeof null →"null"→正しくは"object"
// typeof {} →"object"
// typeof NaN →"number"
// typeof 数値 →"number"
// typeof 関数 →"function"→正しくは関数の返り値の型が返ってきた

console.log("typeof undefined: " + typeof undefined); // typeof undefined: undefined
console.log("typeof null: " + typeof null); // typeof null: object
console.log("typeof {}: " + typeof {}); // typeof {}: object
console.log("typeof NaN: " + typeof NaN); // typeof NaN: number
console.log("typeof 100: " + typeof 100); // typeof NaN: number
function x (value) { let result = ""; return result += value;}
console.log("typeof x('test'): " + typeof x('test')); // typeof x('test'): string
function y (value) { let result = 0; return result += value;}
console.log("typeof y(): " + typeof y()); // typeof y(): number
