import { littleEndianToBigEndian, bigEndianToLittleEndian } from "./index.js";

describe('リトルエンディアンからビッグエンディアンへの変換', () => {
  it('単一の要素を変換する', () => {
    const input = new Uint32Array([0x12345678]);
    const expected = new Uint32Array([0x78563412]);
    expect(littleEndianToBigEndian(input)).toEqual(expected);
  });

  it('複数の要素を変換する', () => {
    const input = new Uint32Array([0x12345678, 0xabcdef01]);
    const expected = new Uint32Array([0x78563412, 0x01efcdab]);
    expect(littleEndianToBigEndian(input)).toEqual(expected);
  });

  it('空の配列を変換する', () => {
    const input = new Uint32Array([]);
    const expected = new Uint32Array([]);
    expect(littleEndianToBigEndian(input)).toEqual(expected);
  });
});

describe('ビッグエンディアンからリトルエンディアンへの変換', () => {
  it('単一の要素を変換する', () => {
    const input = new Uint32Array([0x78563412]);
    const expected = new Uint32Array([0x12345678]);
    expect(bigEndianToLittleEndian(input)).toEqual(expected);
  });

  it('複数の要素を変換する', () => {
    const input = new Uint32Array([0x78563412, 0x01efcdab]);
    const expected = new Uint32Array([0x12345678, 0xabcdef01]);
    expect(bigEndianToLittleEndian(input)).toEqual(expected);
  });

  it('空の配列を変換する', () => {
    const input = new Uint32Array([]);
    const expected = new Uint32Array([]);
    expect(bigEndianToLittleEndian(input)).toEqual(expected);
  });
});