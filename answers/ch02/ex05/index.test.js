import { promisify } from "util";
import { exec } from "child_process";

describe("charfreq", () => {
  it("セミコロン削除前と結果が同じであること", async () => {
    const stdout = await promisify(exec)(
      "cat answers/ch02/ex05/rashomon.txt | node answers/ch02/ex05/index.js",
      );
    const expectedStdout = await promisify(exec)(
      "cat answers/ch01/ex08/rashomon.txt | node answers/ch01/ex08/index.js",
    );
    expect(stdout.toString()).toBe(expectedStdout.toString());
  });
});
