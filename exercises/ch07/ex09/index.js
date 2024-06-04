console.log("𠮷野家"[0]); // �。文字化けした
console.log(`"𠮷野家".length: ${"𠮷野家".length}`); // 4。array.lengthだとUTF-16での分割になる。

for(let i = 0; i < "𠮷野家".length; i++) {
  console.log(`"𠮷野家".codePointAt(${i}): ${"𠮷野家".codePointAt(i)}`); // codePointAtのインデックスはUTF-16コード単位
}
/*
"𠮷野家".codePointAt(0): 134071 // Unicodeで𠮷
"𠮷野家".codePointAt(1): 57271 // Unicodeで下位サロゲート
"𠮷野家".codePointAt(2): 37326 // Unicodeで野
"𠮷野家".codePointAt(3): 23478 // Unicodeで家
*/

for (let c of "𠮷野家") console.log(c); // コードポイント単位で繰り返される。参考：https://tanishiking24.hatenablog.com/entry/2017/05/29/100000
/*
𠮷
野
家
*/

// ========================================================================================================================================
console.log("👨‍👨‍👧‍👧"[0]); // �。文字化けした
console.log(`"👨‍👨‍👧‍👧".length: ${"👨‍👨‍👧‍👧".length}`); // 11。array.lengthだとUTF-16での分割になる。

for(let i = 0; i < "👨‍👨‍👧‍👧".length; i++) {
  console.log(`"👨‍👨‍👧‍👧".codePointAt(${i}): ${"👨‍👨‍👧‍👧".codePointAt(i)}`); // codePointAtのインデックスはUTF-16コード単位
}
/*
"👨‍👨‍👧‍👧".codePointAt(0): 128104 // Unicodeで👨‍
"👨‍👨‍👧‍👧".codePointAt(1): 56424　// Unicodeで下位サロゲート
"👨‍👨‍👧‍👧".codePointAt(2): 8205　// Unicodeでゼロ幅接合子
"👨‍👨‍👧‍👧".codePointAt(3): 128104 // Unicodeで👨
"👨‍👨‍👧‍👧".codePointAt(4): 56424　// Unicodeで下位サロゲート
"👨‍👨‍👧‍👧".codePointAt(5): 8205　// Unicodeでゼロ幅接合子
"👨‍👨‍👧‍👧".codePointAt(6): 128103 // Unicodeで👧
"👨‍👨‍👧‍👧".codePointAt(7): 56423　// Unicodeで下位サロゲート
"👨‍👨‍👧‍👧".codePointAt(8): 8205　// Unicodeでゼロ幅接合子
"👨‍👨‍👧‍👧".codePointAt(9): 128103 // Unicodeで👧
"👨‍👨‍👧‍👧".codePointAt(10): 56423　// Unicodeで下位サロゲート
*/

for (let c of "👨‍👨‍👧‍👧") console.log(c); // コードポイント単位で繰り返される。参考：https://tanishiking24.hatenablog.com/entry/2017/05/29/100000
/*
👨

👨

👧

👧
*/

console.log(`"👨‍👨‍👧‍👧"[0]: ${"👨‍👨‍👧‍👧"[0]}`); // �。文字化けした
console.log(`"👨‍👨‍👧‍👧"[1]: ${"👨‍👨‍👧‍👧"[1]}`); // �。文字化けした
console.log(`"👨‍👨‍👧‍👧"[2]: ${"👨‍👨‍👧‍👧"[2]}:`); // �。文字化けした
console.log(`"👨‍👨‍👧‍👧"[3]: ${"👨‍👨‍👧‍👧"[3]}`); // �。文字化けした
console.log(`"👨‍👨‍👧‍👧"[4]: ${"👨‍👨‍👧‍👧"[4]}`); // �。文字化けした
console.log(`"👨‍👨‍👧‍👧"[5]: ${"👨‍👨‍👧‍👧"[5]}:`); // �。文字化けした
console.log(`"👨‍👨‍👧‍👧"[6]: ${"👨‍👨‍👧‍👧"[6]}`); // �。文字化けした
console.log(`"👨‍👨‍👧‍👧"[7]: ${"👨‍👨‍👧‍👧"[7]}`); // �。文字化けした
console.log(`"👨‍👨‍👧‍👧"[8]: ${"👨‍👨‍👧‍👧"[8]}:`); // �。文字化けした
console.log(`"👨‍👨‍👧‍👧"[9]: ${"👨‍👨‍👧‍👧"[9]}`); // �。文字化けした
console.log(`"👨‍👨‍👧‍👧"[10]: ${"👨‍👨‍👧‍👧"[10]}`); // �。文字化けした