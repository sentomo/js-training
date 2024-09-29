import { typeOfTemplateLiteral } from './index.js';

describe("typeOfTemplateLiteral", () => {
  it("文字列を渡した場合", () => {
    expect(typeOfTemplateLiteral`${"A"}`).toBe("string");
  });

  it("オブジェクトを渡した場合", () => {
    expect(typeOfTemplateLiteral`${{ x: 1 }}`).toBe("object");
  });

  it("数値を渡した場合", () => {
    expect(typeOfTemplateLiteral`${42}`).toBe("number");
  });

  it("配列を渡した場合", () => {
    expect(typeOfTemplateLiteral`${[1, 2, 3]}`).toBe("object");
  });

  it("関数を渡した場合", () => {
    expect(typeOfTemplateLiteral`${() => {}}`).toBe("function");
  });

  it("nullを渡した場合", () => {
    expect(typeOfTemplateLiteral`${null}`).toBe("object");
  });

  it("undefinedを渡した場合", () => {
    expect(typeOfTemplateLiteral`${undefined}`).toBe("undefined");
  });
});
