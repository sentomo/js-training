// 日本語文字列の配列を受け取り、文字列中の大文字・小文字("つ"と"っ"等)、濁点・半濁点("は"と"ば"と"ば"等)の違いを無視してソートする
export function sortJapanese(array) {
  const collator = new Intl.Collator('ja', { sensitivity: 'base' }); // base：大文字・小文字、濁点・半濁点の違いを無視
  return array.slice().sort(collator.compare);
}

// Date オブジェクトを受け取り、令和6年4月2日 のように (和暦)y年m月d日 のフォーマットで日付の文字列を返す
export function toJapaneseDateString(date) {
  // オプションで和暦カレンダーとフォーマットを指定
  const options = {
    year: 'numeric',   // 和暦年
    month: 'long',     // 月（漢字の名前で表示）
    day: 'numeric'     // 日
  };

  // Intl.DateTimeFormat を使用して和暦形式の日付をフォーマット
  const formatter = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', options);
  return formatter.format(date);
}

// 参考：[JavaScriptが令和に対応。Intl\.DateTimeFormatで日付を和暦\(元号\)表記に変換する \#Chrome \- Qiita](https://qiita.com/shisama/items/cb0abb5435fac82e87d6)
