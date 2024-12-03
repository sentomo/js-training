import { expect, test } from "@playwright/test";

test.describe('ToDoアプリのテスト', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('新しいToDoを追加してlocalStorageに保存されることを確認する', async ({ page }) => {
    const todoInput = await page.locator('#new-todo');
    const todoList = await page.locator('#todo-list');

    await todoInput.fill('Test ToDo');
    await page.keyboard.press('Enter');

    // ToDoがリストに追加されたか確認
    await expect(todoList).toHaveText(/Test ToDo/);

    // localStorageに保存されているか確認
    const tasks = await page.evaluate(() => JSON.parse(localStorage.getItem('todo-app-tasks')));
    expect(tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Test ToDo', status: 'active' })
      ])
    );
  });

  test('複数タブ間でタスクが同期されることを確認する', async ({ context }) => {
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    await page1.goto('http://localhost:3000');
    await page2.goto('http://localhost:3000');

    const todoInput1 = page1.locator('#new-todo');
    const todoList2 = page2.locator('#todo-list');

    await todoInput1.fill('Test Sync ToDo');
    await page1.keyboard.press('Enter');

    // 他のタブで同期されているか確認
    await expect(todoList2).toHaveText(/Test Sync ToDo/);
  });

  test('localStorageが利用できない場合でも適切に動作することを確認する', async ({ page }) => {
    // localStorageをモックして無効化
    await page.evaluate(() => {
      Storage.prototype.setItem = () => {
        throw new Error('localStorage is unavailable');
      };
    });

    const todoInput = page.locator('#new-todo');
    const todoList = page.locator('#todo-list');

    await todoInput.fill('Test Without localStorage');
    await page.keyboard.press('Enter');

    // ToDoがリストに追加されたか確認
    await expect(todoList).toHaveText(/Test Without localStorage/);

    // localStorageに保存されないが、アプリがクラッシュしないことを確認
    const tasks = await page.evaluate(() => localStorage.getItem('todo-app-tasks'));
    expect(tasks).toBeNull();
  });
});