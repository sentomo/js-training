import { getAllUniqueAndInheritedProperties } from "./index.js";

describe("getAllUniqueAndInheritedProperties test", () => {
  it("すべての独自プロパティ（列挙不可、プロパティ名が Symbolのものを含む）および列挙可能な継承プロパティのプロパティ名の配列が返る", () => {
    const parent = { inheritedProperty: 1 };
    const obj = Object.create(parent);
    Object.defineProperty(obj, "notEmurableProperty", {
      value: 42,
      enumerable: false,
    });
    let symbolName = Symbol("symbolProperty");
    obj[symbolName] = "symbolPropertyStr";

    const result = getAllUniqueAndInheritedProperties(obj);
    const expected = [
      "notEmurableProperty",
      Symbol("symbolProperty"), //resultで定義したオブジェクトを直接指定した方が良い
      "inheritedProperty",
    ];
    expect(JSON.stringify(result)).toStrictEqual(JSON.stringify(expected)); //  Symbolは一意のものを返す　JSON.stringifyではなく、toStrictEqualでそのままobjの機構同士を比較
  });

  it("空オブジェクトを渡した時、プロパティの配列のlengthは0が返る", () => {
    const obj = {};
    const result = getAllUniqueAndInheritedProperties(obj);

    expect(result.length).toBe(0);
  });
});
