let obj = { 0: "zero", y: "a" };
Object.defineProperty(obj, "eProperty", {
  value: "emurableStr",
  enumerable: true,
});

let childObj = Object.create(obj);
childObj = { 6: "minus 6", y2: "a", 0: "-5", y: "b" };

Object.defineProperty(childObj, "eProperty", {
  value: "notEmurableStr",
  enumerable: false,
});

for (let property in childObj) {
  console.log(property);
}

/* 結果
0
6
y2
y
*/

// プロパティ名が数値で値が小さいものから順に列挙。次にプロパティ名が文字列でchildObjに追加された順に列挙。
// ePropertyが出力されなかったのは、独自プロパティが列挙不可でプロトタイプチェーンを辿って同名プロパティがあっても列挙されないため。
