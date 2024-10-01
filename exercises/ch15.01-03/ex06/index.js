document.addEventListener("DOMContentLoaded", () => {
  const infoTable = document.getElementById('pc-info');

  function formatDate(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 月は0始まりなので +1
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    return `${year}年${month}月${day}日${hours}時${minutes}分${seconds}秒`;
  }

  // 使用例
  const formattedDate = formatDate(Date.now());
  
  // navigator オブジェクトから取得可能な情報
  const pcInfo = {
      'ご登録日': formattedDate,
      'ユーザーエージェント': navigator.userAgent,
      'プラットフォーム': navigator.platform,
      '言語': navigator.language,
      'オンライン状態': navigator.onLine ? 'オンライン' : 'オフライン',
      'Cookie有効': navigator.cookieEnabled ? '有効' : '無効',
      'ブラウザ言語設定': navigator.languages ? navigator.languages.join(', ') : '不明',
      'ハードウェア・メモリ': navigator.deviceMemory ? navigator.deviceMemory + ' GB' : '不明',
      'CPUスレッド数': navigator.hardwareConcurrency ? navigator.hardwareConcurrency : '不明',
  };

  // 表に情報を追加
  for (const [key, value] of Object.entries(pcInfo)) {
      const row = document.createElement('tr');
      const keyCell = document.createElement('td');
      const valueCell = document.createElement('td');

      keyCell.textContent = key;
      valueCell.textContent = value;

      row.appendChild(keyCell);
      row.appendChild(valueCell);
      infoTable.appendChild(row);
  }
});
