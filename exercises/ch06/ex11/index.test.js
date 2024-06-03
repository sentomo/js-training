import { obj } from "./index.js";

describe("accessor　property test", () => {
  it("x, yのセッターメソッドとゲッターメソッドのテスト", () => {
    expect(obj.x).toBe(1);
    expect(obj.y).toBe(1);
    
    obj.x = 3;
    obj.y = 4;
    expect(obj.x).toBe(3);
    expect(obj.y).toBe(4);
  });

  it("x, yのセッターメソッドに数値以外を渡した時、エラーが発生する", () => {
    expect(() => {
      obj.x = "Test";
    }).toThrow("x is not a number");

    expect(() => {
      obj.y = NaN;
    }).toThrow("y is not a number");


  });

  it("設定されたx,yの値ごとに正しい極座標rの値が返る", () => {
    obj.x = 3;
    obj.y = 4;
    expect(obj.r()).toBe(5);
    
    obj.x = 1;
    obj.y = 1;
    expect(obj.r()).toBe(Math.SQRT2);

    obj.x = 0;
    obj.y = 0;
    expect(obj.r()).toBe(0);
  });

  it("設定されたx,yの値ごとに正しいthetaの値が返る", () => {
    obj.x = 15;
    obj.y = 90;
    expect(obj.theta()).toBe(1.4056476493802699);
    
    obj.x = 90;
    obj.y = 15;
    expect(obj.theta()).toBe(0.16514867741462683);

    obj.x = 0;
    obj.y = 0;
    expect(obj.theta()).toBe(0);
  });

});
