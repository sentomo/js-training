let obj = {};

Object.defineProperty(obj, "writableProperty", {
  value: 42,
  writable: true,
});

Object.defineProperty(obj, "notWritableProperty", {
  value: 3,
  writable: false,
});

Object.defineProperty(obj, "enumerableProperty", {
  value: "emurableStr",
  enumerable: true,
});

Object.defineProperty(obj, "notEnumerableProperty", {
  value: "emurableStr",
  enumerable: false,
});

Object.defineProperty(obj, "configurableProperty", {
  value: "configurableStr",
  configurable: true,
});

Object.defineProperty(obj, "notConfigurableProperty", {
  value: "configurableStr",
  configurable: false,
});

// プロパティの変更
obj.writableProperty = 50;
console.log(obj.writableProperty); // 50
// obj.notWritableProperty = 50;
console.log(obj.notWritableProperty); // 3 書き換えられていない

// プロパティの削除
console.log(delete obj.configurableProperty); // true configurableがtrueなので削除できる
// console.log(delete obj.notConfigurableProperty); // false configurableがfalseなので削除できない

// hasOwnProperty
console.log("===== hasOwnProperty =====");
console.log(obj.hasOwnProperty("writableProperty")); // true writablePropertyはobjの独自プロパティ
console.log(obj.hasOwnProperty("notWritableProperty")); // true notWritablePropertyはobjの独自プロパティ
console.log(obj.hasOwnProperty("enumerableProperty")); // true enumerablePropertyはobjの独自プロパティ
console.log(obj.hasOwnProperty("notEnumerableProperty")); // true notEnumerablePropertyはobjの独自プロパティ
console.log(obj.hasOwnProperty("configurableProperty")); // false enumerablePropertyはobjの独自プロパティだけどfalseになる、なぜ？ playcodeで実行するとtrueになる
console.log(obj.hasOwnProperty("notConfigurableProperty")); // true notConfigurablePropertyはobjの独自プロパティ

// propertyIsEnumerable
console.log("===== propertyIsEnumerable =====");
console.log(obj.propertyIsEnumerable("writableProperty")); // false enumerableの規定値がfalseのため
console.log(obj.propertyIsEnumerable("notWritableProperty")); // false enumerableの規定値がfalseのため
console.log(obj.propertyIsEnumerable("enumerableProperty")); // true enumerableがtrueのため
console.log(obj.propertyIsEnumerable("notEnumerableProperty")); // false enumerableがfalseのため
console.log(obj.propertyIsEnumerable("configurableProperty")); // false enumerableの規定値がfalseのため
console.log(obj.propertyIsEnumerable("notConfigurableProperty")); // false enumerableの規定値がfalseのため
