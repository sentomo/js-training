// 開いているページのタイトルとURLをMarkdown形式に文字列を整形してクリップボードにコピーするBookmarklet
javascript:(function() {
  // ページのタイトルとURLを取得
  const title = document.title;
  const url = window.location.href;

  // Markdown形式に整形
  const markdown = `[${title}](${url})`;

  // クリップボードにコピー
  navigator.clipboard.writeText(markdown)
    .then(() => {
      alert('Markdown形式でコピーしました: ' + markdown);
    })
    .catch(err => {
      console.error('クリップボードへのコピーに失敗しました: ', err);
    });
})();
