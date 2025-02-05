import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('アプリが正しくレンダリングされる', () => {
  render(<App />);
  const heading = screen.getByText(/Add/i);
  expect(heading).toBeInTheDocument();
});

test('新しいToDoを追加できる', () => {
  render(<App />);

  // 入力フィールドと追加ボタンを取得
  const input = screen.getByPlaceholderText(/What needs to be done?/i);
  const addButton = screen.getByText(/Add/i);

  // タスクを入力して追加ボタンをクリック
  fireEvent.change(input, { target: { value: 'テストタスク' } });
  fireEvent.click(addButton);

  // タスクがリストに表示されているか確認
  const todoItem = screen.getByText('テストタスク');
  expect(todoItem).toBeInTheDocument();
});

test('ToDoを削除できる', () => {
  render(<App />);

  const input = screen.getByPlaceholderText(/What needs to be done?/i);
  const addButton = screen.getByText(/Add/i);

  // タスクを追加
  fireEvent.change(input, { target: { value: '削除するタスク' } });
  fireEvent.click(addButton);

  // 削除ボタンをクリック
  const deleteButton = screen.getByText(/❌/i);
  fireEvent.click(deleteButton);

  // タスクが削除されたことを確認
  expect(screen.queryByText('削除するタスク')).not.toBeInTheDocument();
});

test('ToDoの完了状態を変更できる', () => {
  render(<App />);

  const input = screen.getByPlaceholderText(/What needs to be done?/i);
  const addButton = screen.getByText(/Add/i);

  // タスクを追加
  fireEvent.change(input, { target: { value: '完了テスト' } });
  fireEvent.click(addButton);

  // チェックボックスを取得してクリック
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  // チェックが入ったか確認
  expect(checkbox).toBeChecked();
});
