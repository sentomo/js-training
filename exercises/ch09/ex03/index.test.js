import { C1, C2 } from "./index.js";

describe("class C1 test", () => {
  it("xをプライベートフィールドにした時", () => {
    const c1 = new C1();
    expect(c1.x).toBe(42);

    // 直接値の変更はできないことを確認
    expect(() => {
      c1.x = 100;
    }).toThrow(TypeError);

    expect(c1.x).toBe(42); // 値が変更されていないことを確認
  });
});

describe("class C2 test", () => {
  it("クロージャを使った時", () => {
    const c2 = new C2();
    expect(c2.x).toBe(42);

    // 直接値の変更はできないことを確認
    expect(() => {
      c2.x = 100;
    }).toThrow(TypeError);
    
    expect(c2.x).toBe(42); // 値が変更されていないことを確認
  });
});
