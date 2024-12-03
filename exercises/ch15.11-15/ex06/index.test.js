import { expect, test } from "@playwright/test";

test.describe('ToDoアプリのテスト', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('新しいタスクを追加できること', async ({ page }) => {
    // 入力フィールドにタスクを入力し、フォームを送信
    const taskText = '新しいタスク';
    await page.fill('#new-todo', taskText);
    await page.click('#new-todo-form button');

    // 入力したタスクがリストに追加されていることを確認
    const task = await page.locator('#todo-list li:has-text("新しいタスク")');
    await expect(task).toBeVisible();
  });

  test('タスクを完了としてマークできること', async ({ page }) => {
    // 既存のタスクを完了としてマークする
    const taskText = 'タスク完了テスト';
    await page.fill('#new-todo', taskText);
    await page.click('#new-todo-form button');

    const checkbox = await page.locator('#todo-list li:has-text("タスク完了テスト") input[type="checkbox"]');
    await checkbox.check(); // チェックボックスをチェックする

    // タスクが打ち消し線で表示されることを確認
    const label = await page.locator('#todo-list li:has-text("タスク完了テスト") label');
    await expect(label).toHaveCSS('text-decoration-line', 'line-through');
  });

  test('タスクを削除できること', async ({ page }) => {
    // 新しいタスクを追加し、削除ボタンで削除する
    const taskText = '削除テスト';
    await page.fill('#new-todo', taskText);
    await page.click('#new-todo-form button');

    const task = await page.locator('#todo-list li:has-text("削除テスト")');
    await task.locator('button').click(); // 削除ボタンをクリック

    // タスクがリストから削除されたことを確認
    await expect(task).not.toBeVisible();
  });

  test('ページをリロードしてもタスクが維持されること (sessionStorage の確認)', async ({ page }) => {
    const taskText = 'セッションストレージテスト';
    await page.fill('#new-todo', taskText);
    await page.click('#new-todo-form button');

    // ページをリロード
    await page.reload();

    // リロード後にタスクが表示されていることを確認
    const task = await page.locator('#todo-list li:has-text("セッションストレージテスト")');
    await expect(task).toBeVisible();
  });
});