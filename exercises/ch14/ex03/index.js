export class IgnoreAccentPattern {
  constructor(pattern) {
    // パターンが文字列か正規表現かを確認
    if (typeof pattern === 'string') {
      this.pattern = new RegExp(pattern, 'g');
    } else {
      this.pattern = new RegExp(pattern.source, pattern.flags);
    }
  }

  [Symbol.search](str) {
    // 入力文字列をNFDで正規化し、ダイアクリティカルマークを削除
    const normalizedStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // 検索パターンもNFDで正規化し、ダイアクリティカルマークを削除
    const normalizedPattern = this.pattern.source.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // normalizedStrに対して検索を実行し、マッチした場合はそのインデックスを返し、nullの場合は-1を返す
    return new RegExp(normalizedPattern).exec(normalizedStr)?.index ?? -1;
  }

  [Symbol.match](str) {
    // 入力文字列をNFDで正規化し、ダイアクリティカルマークを削除
    const normalizedStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedPattern = this.pattern.source
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    // パターンに g フラグがあるかをチェック
    const regex = new RegExp(normalizedPattern, this.pattern.flags);
    if (regex.global) {
      // 複数マッチに対応するため、すべてのマッチを取得
      const matches = [...normalizedStr.matchAll(regex)];
      return matches.length > 0
        ? matches.map((m) => normalizedStr.slice(m.index, m.index + m[0].length).normalize('NFC')) // マッチ箇所をNFCで戻す
        : null;
    } else {
      // 最初のマッチを処理
      const match = regex.exec(normalizedStr);
      if (match) {
        // 元の文字列でマッチ箇所を抽出し、NFCで戻す
        return [normalizedStr.slice(match.index, match.index + match[0].length).normalize('NFC')];
      }
      return null;
    }
  }
}
