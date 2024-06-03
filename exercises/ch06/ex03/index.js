let o = {};
o.x = 1;
let p = Object.create(o);
p.y = 2;
let q = Object.create(p);
q.z = 3;
let f = q.toString();
q.x + q.y;

console.log(o.isPrototypeOf(p)); // true
console.log(o.isPrototypeOf(q)); // true

console.log(p.isPrototypeOf(q)); // true

// Object
let object = {};
console.log(Object.prototype.isPrototypeOf(object)); // true objectのプロトタイプチェーンにObjectが含まれる
console.log(Object.isPrototypeOf(object)); // false {}はプロパティを持たないオブジェクトなので、objectにObjectは含まれないということ…？？

// Array
let array = new Array();
console.log(Array.prototype.isPrototypeOf(array)); // true

// Date
let date = new Date();
console.log(Date.prototype.isPrototypeOf(date)); // true

// Map
let map = new Map();
console.log(Map.prototype.isPrototypeOf(map)); // true
