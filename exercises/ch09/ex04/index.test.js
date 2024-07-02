import { WarriorClass, MagicWarriorClass, Warrior, MagicWarrior } from "./index.js";

describe("クラスを使った場合のテスト", () => {
  it("戦士クラスのattackメソッドが正しく動作する", () => {
    const warrior = new WarriorClass(10);
    expect(warrior.attack()).toBe(20); // 10 * 2 = 20
  });

  it("魔法戦士クラスのattackメソッドが正しく動作する", () => {
    const magicWarrior = new MagicWarriorClass(10, 5);
    expect(magicWarrior.attack()).toBe(25); // (10 * 2) + 5 = 25
  });
});

describe("プロトタイプを使った場合のテスト", () => {
  it("戦士プロトタイプのattackメソッドが正しく動作する", () => {
    const warrior = new Warrior(10);
    expect(warrior.attack()).toBe(20); // 10 * 2 = 20
  });

  it("魔法戦士プロトタイプのattackメソッドが正しく動作する", () => {
    const magicWarrior = new MagicWarrior(10, 5);
    expect(magicWarrior.attack()).toBe(25); // (10 * 2) + 5 = 25
  });
});
