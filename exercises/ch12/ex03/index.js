// export function* counter() {
//   let count = 1;
//   while (true) {
//     try {
//       yield count++;
//     } catch (error) {
//       count = 0;
//     }
//   }
// }

export function* counter() {
  let count = 0;
  while (true) {
    try {
      yield count++;
    } catch (error) {
      count = 0;
      yield count; //ここでyieldしないといけなかった
    }
  }
}