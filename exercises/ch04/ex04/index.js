export function bitCount(n) {
  n = n - ((n >> 1) & 0x55555555); // 2ビットごとのグループでビット数を計算
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333);　// 4ビットごとのグループでビット数を計算
  return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24; // 8ビットごとのグループでビット数を計算した後に24ビット右にシフト
}

console.log(bitCount(0b111)); // 3
console.log(bitCount(0b1111111111111111111111111111111)); // 31
console.log(bitCount(0b101)); // 2

// 参考：https://qiita.com/radian-jp/items/fca624ffb04553c44de7