/* eslint-disable */
// for (let i = 0; i < 10; i++) {
//   (function () {
//     let i = 100;
//   })();
//   console.log(i);
// }
// console.log(i);

// for (var i = 0; i < 10; i++) {
//   (function () {
//     var i = 100;
//   })();
//   console.log(i);
// }
// console.log(i);

for (i = 0; i < 10; i++) {
  (function () {
    i = 100;
  })();
  console.log(i);
}
console.log(i);