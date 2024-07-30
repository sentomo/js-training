import { getDaysInMonth, countWeekdays, getDayOfWeek, getFirstDayOfLastMonth } from "./index.js";

describe('Date Utility Functions', () => {
  it('特定の年と月の月の日数を返す', () => {
    expect(getDaysInMonth(2024, 2)).toBe(29); // 2024年2月（閏年）
    expect(getDaysInMonth(2024, 4)).toBe(30); // 2024年4月
    expect(getDaysInMonth(2024, 12)).toBe(31); // 2024年12月
    expect(getDaysInMonth(2024, 1)).toBe(31);  // 2024年1月
  });

  it('期間内の土日以外の日数を返す', () => {
    expect(countWeekdays('2024-07-01', '2024-07-07')).toBe(5); // 2024年7月1日から7日間の平日数
    expect(countWeekdays('2024-01-01', '2024-01-31')).toBe(23); // 2024年1月の平日数
    expect(countWeekdays('2024-07-01', '2024-07-01')).toBe(1); // 2024年7月1日（平日）
  });

  it('ロケールの形式で曜日を返す', () => {
    expect(getDayOfWeek('2024-07-01', 'en-US')).toBe('Monday'); // 2024年7月1日（英語）
    expect(getDayOfWeek('2024-07-01', 'ja-JP')).toBe('月曜日'); // 2024年7月1日（日本語）
  });

  it('ローカルタイムゾーンにおいて先月1日の0時0分0秒のDateオブジェクトを返す', () => {
    const now = new Date();
    const firstDayLastMonth = getFirstDayOfLastMonth();
    expect(firstDayLastMonth.getFullYear()).toBe(now.getFullYear());
    expect(firstDayLastMonth.getMonth()).toBe(now.getMonth() - 1);
    expect(firstDayLastMonth.getDate()).toBe(1);
    expect(firstDayLastMonth.getHours()).toBe(0);
    expect(firstDayLastMonth.getMinutes()).toBe(0);
    expect(firstDayLastMonth.getSeconds()).toBe(0);
  });
});
