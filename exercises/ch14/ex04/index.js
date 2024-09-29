export class Hiragana {
  constructor(char) {
    if (!/^[\u3040-\u309F]$/.test(char)) {
      throw new Error("ひらがな1文字のみ指定してください。");
    }
    this.char = char;
    this.codeUnit = char.charCodeAt(0); // UTF-16 コード単位を取得
  }

  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return this.codeUnit; // 数字が期待される場合、UTF-16 コード単位を返す
    } else if (hint === "string") {
      return this.char; // 文字列が期待される場合、ひらがなを返す
    }
    return this.char; // デフォルトではひらがなを返す
  }
}
