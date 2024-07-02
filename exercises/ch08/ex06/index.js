// 出題の関数
const m = function (arg) {
  console.log(arg[1]); // undefinedになる
};
m("a", "b");

// 修正した関数
const m = function (...arg) {
  console.log(arg[1]); // "b"
};
m("a", "b");

// アロー関数で書き直す
const m = (...arg) => console.log(arg[1]); // ...argはパラメータが複数含まれる可能性があるため()は省略できない？
m("a", "b");
