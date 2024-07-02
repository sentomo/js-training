import { TypedMap } from './index.js'; // 実際のファイルパスに合わせてください

describe('TypedMapクラスのテスト', () => {
  it('正しい型のエントリが追加できる', () => {
    const typedMap = new TypedMap('string', 'number');
    typedMap.set('key1', 1);
    expect(typedMap.map.get('key1')).toBe(1);
  });

  it('間違った型のキーを追加しようとするとエラーをスローする', () => {
    const typedMap = new TypedMap('string', 'number');
    expect(() => {
      typedMap.set(1, 1);
    }).toThrow(TypeError);
  });

  it('間違った型の値を追加しようとするとエラーをスローする', () => {
    const typedMap = new TypedMap('string', 'number');
    expect(() => {
      typedMap.set('key1', 'value');
    }).toThrow(TypeError);
  });

  it('コンストラクタで初期化する時に型が間違っているとエラーをスローする', () => {
    expect(() => {
      new TypedMap('string', 'number', [['key1', 1], [2, 'value']]);
    }).toThrow(TypeError);
  });

  it('コンストラクタで初期化する時に正しい型のエントリが追加できる', () => {
    const typedMap = new TypedMap('string', 'number', [['key1', 1], ['key2', 2]]);
    expect(typedMap.map.get('key1')).toBe(1);
    expect(typedMap.map.get('key2')).toBe(2);
  });
});
