import { parseJsonString } from "./index.js";

describe("parseJsonString test", () => {
  it("文字列がJSONとしてパースできる場合、{success: true, data: <パースしたデータ>}が返る", () => {  
    const obj = '{"name": "Alice", "age": 30}';
    const expected = JSON.parse(JSON.stringify({ success: true, data: { name: 'Alice', age: 30 } }));
    expect(parseJsonString(obj)).toStrictEqual(expected);
  });

  it("文字列がJSONとしてパースできない場合、{success: false, error: <エラー内容>}が返る", () => {  
    const obj = '{"name": "Alice", "age": }';
    const expected = JSON.parse(JSON.stringify({success: false, error: "error message"}));
    expect(parseJsonString(obj).success).toBe(false);
    expect(typeof parseJsonString(obj).error).toBe("string");
  });
});

// オブジェクトの中身があっているかを確認したい時は、、toBe()ではなく、toStrictEqual()を使う。
// 参考：https://qiita.com/TMDM/items/8c6a006d0c82aa8ba5e4#tostrictequal%E3%82%92%E4%BD%BF%E3%81%86%E3%82%B1%E3%83%BC%E3%82%B9
