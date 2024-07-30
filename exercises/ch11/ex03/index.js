export function littleEndianToBigEndian(uint32Array) {
  const buffer = new ArrayBuffer(uint32Array.length * 4); // 32ビット(4バイト)単位で扱うため4倍にする
  const view = new DataView(buffer);

  for (let i = 0; i < uint32Array.length; i++) {
    view.setUint32(i * 4, uint32Array[i], true); // リトルエンディアン(第3引数がtrue)でセット
  }

  const result = new Uint32Array(buffer); // 引数のuint32Arrayと同じ長さのメモリを新しく確保
  for (let i = 0; i < result.length; i++) {
    result[i] = view.getUint32(i * 4, false); // ビッグエンディアン(第2引数がfalse)で取得
  }

  return result;
}

export function bigEndianToLittleEndian(uint32Array) {
  const buffer = new ArrayBuffer(uint32Array.length * 4);
  const view = new DataView(buffer);

  for (let i = 0; i < uint32Array.length; i++) {
    view.setUint32(i * 4, uint32Array[i], false); // ビッグエンディアン(第3引数がfalse)でセット
  }

  const result = new Uint32Array(buffer);
  for (let i = 0; i < result.length; i++) {
    result[i] = view.getUint32(i * 4, true); // リトルエンディアン(第2引数がtrue)で取得
  }

  return result;
}
