import { createMethodCallLogger } from './index.js';

describe("createMethodCallLogger", () => {
  it("メソッド呼び出しを履歴に記録する", () => {
    const { proxy, history } = createMethodCallLogger({
      greet(name) {
        return `Hello, ${name}!`;
      },
      sum(a, b) {
        return a + b;
      },
    });

    // メソッドを呼び出す
    proxy.greet("Bob");
    proxy.sum(2, 3);
    
    // 履歴の確認
    expect(history.length).toBe(2);
    expect(history[0]).toEqual({
      time: expect.any(Date), // expect.any(constructor) 任意のDateオブジェクトであること
      method: "greet",
      params: ["Bob"],
    });
    expect(history[1]).toEqual({
      time: expect.any(Date),
      method: "sum",
      params: [2, 3],
    });
  });

  it("メソッドを呼び出さない場合、履歴は空である", () => {
    const { proxy, history } = createMethodCallLogger({});

    // 履歴の確認
    expect(history.length).toBe(0);
  });

  it("プロパティにアクセスしても履歴は記録されない", () => {
    const { proxy, history } = createMethodCallLogger({
      name: "Alice",
    });

    // プロパティにアクセス
    const name = proxy.name;

    // 履歴の確認
    expect(history.length).toBe(0);
  });
});
