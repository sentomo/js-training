// ネストされた書き込み不可のオブジェクトを返す関数
export function nestedUnwritableObj() {
  const nestedObj = {
    c: {
      d: {
        e: 3
      }
    }
  };
  Object.freeze(nestedObj.c.d); // e以下のプロパティを凍結
  Object.freeze(nestedObj.c);   // d以下のプロパティを凍結
  Object.freeze(nestedObj);     // 最上位のプロパティを凍結
  return nestedObj;
}

// 書き込み不可、再定義不可のオブジェクトを返す関数
export function unwritableAndUnconfigurableObj() {
  const obj = {};
  Object.defineProperty(obj, 'a', {
    value: 1,
    writable: false,
    configurable: false,
    enumerable: true // toStrictEqual()でプロパティをテスト対象にするためには enumerable: true に設定する必要がある
  });
  return obj;
}

// 書き込み可能、再定義不可のオブジェクトを返す関数→sealを使って、オブジェクト封印+プロパティ削除を禁止することもできる
export function writableAndUnconfigurableObj() {
  const obj = {};
  Object.defineProperty(obj, 'b', {
    value: 2,
    writable: true,
    configurable: false, // 不要？
    enumerable: true
  });
  return obj;
}


