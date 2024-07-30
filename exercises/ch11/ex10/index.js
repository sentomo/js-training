// 特定の年と月(1-12)を数値の引数で受け取り、その月の日数を返す関数
export function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

// 期間の開始日と終了日を'YYYY-MM-DD'形式の日付で二つ引数で受け取り、その期間(開始日と終了日を含む)の土日以外の日数を返す関数
export function countWeekdays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let count = 0;

  while (start <= end) {
    const dayOfWeek = start.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // 0: 日曜日, 6: 土曜日
      count++;
    }
    start.setDate(start.getDate() + 1);
  }

  return count;
}

// 'YYYY-MM-DD'形式の日付とロケールを引数で受け取り、その日の曜日をロケールの形式の文字列で返す関数
export function getDayOfWeek(dateStr, locale) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: 'long' });
}

//  ローカルのタイムゾーンにおいて先月 1 日 0 時 0 分 0 秒の Date オブジェクトを返す関数。ただし getMonth、setMonth は利用してはいけない。
export function getFirstDayOfLastMonth() {
  const now = new Date();
  const currentYear = now.getUTCFullYear();
  const currentMonth = now.getUTCMonth();  // 現在のUTC標準の月

  // 現在の月の1日0時0分0秒のタイムスタンプを取得
  const currentMonthStart = new Date(currentYear, currentMonth, 1); // Mon Jul 01 2024 00:00:00 GMT+0900 (日本標準時)
  console.log(`currentMonthStart: ${currentMonthStart}`)
  
  // 1日減算して先月の最終日を取得
  const lastMonthEnd = new Date(currentMonthStart.getTime() - 24 * 60 * 60 * 1000); // Sun Jun 30 2024 00:00:00 GMT+0900 (日本標準時)

  // 先月の1日0時0分0秒に設定
  const lastMonthStart = new Date(lastMonthEnd.getTime() - (lastMonthEnd.getDate() - 1 ) * 24 * 60 * 60 * 1000); // 先月の最終日が30日の場合、30日から29日(ミリ秒)をマイナスする

  return lastMonthStart;
}