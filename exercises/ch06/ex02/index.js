let obj = { custom: "value" };
let inheritedObj = Object.create(obj);
console.log(Object.getPrototypeOf(inheritedObj)); // {"custom": "value"}
