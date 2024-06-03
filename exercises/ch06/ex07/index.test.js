import { assign } from "./index.js";

describe("assign test", () => {
  it("assign()とObject.assign()が等価であること", () => {
    const symbolName = Symbol("symbolProperty");
    const targetObj = { x: 2, y: 3, symbolName: "symbolPropertyStr" };
    const sourceObj = { a: 1, x: 20, z: "z", symbolName: "symbolStr2" };
    const sourceObj2 = { a: 10, x: 20, z: "za", symbolName: "symbolStr3" };

    const result1 = assign(targetObj, sourceObj, sourceObj2);
    const result2 = Object.assign(targetObj, sourceObj, sourceObj2);

    expect(JSON.stringify(result1)).toStrictEqual(JSON.stringify(result2)); // {"x":20, "y":3, "symbolName":"symbolStr3", "a":10, "z":"za"}
  });

  it("列挙不可な独自プロパティを含むオブジェクトを渡した時、返り値の配列に列挙不可な独自プロパティが含まれていないこと", () => {
    let targetObj = { x: 1 };
    let sourceObj = {};
    Object.defineProperty(sourceObj, "notEmurableProperty", {
      value: 42,
      enumerable: false,
    });

    const result = assign(targetObj, sourceObj);

    expect("notEmurableProperty" in result).toBe(false);
    expect(Object.keys(result).length).toBe(1);
  });

  it("継承プロパティを含むオブジェクトを渡した時、返り値の配列に継承プロパティが含まれていないこと", () => {
    const parentObj = { inheritedProperty: 1 };
    const childObj = Object.create(parentObj);
    const targetObj = { x: 3 };

    const result = assign(targetObj, childObj);

    expect("inheritedProperty" in result).toBe(false);
    expect(Object.keys(result).length).toBe(1);
  });
});
