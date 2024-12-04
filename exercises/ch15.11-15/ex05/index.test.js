import { expect, test } from "@playwright/test";

test.describe('ToDoアプリのテスト', () => {
  test('ページをリロードしても新しいタスクが維持されることを確認する', async ({ page }) => {
    // 開始時にタスクを追加
    await page.goto('http://localhost:3000');
    await page.fill('#new-todo', 'Task 1');
    await page.click('#new-todo-form button');

    // タスクが追加されたことを確認
    const taskItem = await page.locator('#todo-list li').first();
    await expect(taskItem).toHaveText('Task 1❌');

    // ページをリロードしてタスクが維持されることを確認
    await page.reload();
    await expect(taskItem).toHaveText('Task 1❌');
  });

  test('複数のタブ間でタスクの変更が同期されることを確認する', async ({ browser }) => {
    // 最初のタブでアプリを開く
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    await page1.goto('http://localhost:3000');

    // 2番目のタブを開く
    const page2 = await context1.newPage(); //最初のタブと同じコンテキストでタブを開くことでindexedDBが共有される
    await page2.goto('http://localhost:3000');

    // 最初のタブでタスクを追加
    await page1.fill('#new-todo', 'Task 2');
    await page1.click('#new-todo-form button');

    // タスクが2番目のタブにも反映されることを確認
    const taskItemPage2 = await page2.locator('#todo-list li').first();
    await expect(taskItemPage2).toHaveText('Task 2❌');

    // タスクを2番目のタブで確認し、削除する
    await page2.locator('#todo-list li button').click();

    // 最初のタブにもタスク削除が反映されることを確認
    const taskItemPage1 = await page1.locator('#todo-list li').first();
    await expect(taskItemPage1).toHaveCount(0);

    // タブを閉じる
    await context1.close();
  });
});