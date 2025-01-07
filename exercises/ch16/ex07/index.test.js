import fs from 'fs/promises';
import path from 'path';
import { checkEntry } from './index.js';

describe('checkEntry関数のテスト', () => {
  const testDir = path.resolve('./test-dir');
  const testFile = path.resolve('./test-dir/test-file.txt');
  const testSymlink = path.resolve('./test-dir/test-symlink');

  beforeAll(async () => {
    // テスト用ディレクトリとファイル、シンボリックリンクを作成
    try {
      await fs.mkdir(testDir, { recursive: true });
      await fs.writeFile(testFile, 'Hello, World!');
      await fs.symlink(testFile, testSymlink);
    } catch (err) {
      console.error('セットアップ中にエラーが発生しました:', err);
    }
  });

  afterAll(async () => {
    // テスト用ファイルやディレクトリを削除
    try {
      await fs.unlink(testSymlink);
      await fs.unlink(testFile);
      await fs.rmdir(testDir);
    } catch (err) {
      console.error('クリーンアップ中にエラーが発生しました:', err);
    }
  });

  test('ファイルの場合に "file" を返す', async () => {
    const result = await checkEntry(testFile);
    expect(result).toBe('file');
  });

  test('ディレクトリの場合に "directory" を返す', async () => {
    const result = await checkEntry(testDir);
    expect(result).toBe('directory');
  });

  test('シンボリックリンクの場合に "symbolicLink" を返す', async () => {
    // シンボリックリンクが存在することを確認
    await fs.stat(testSymlink);
    const result = await checkEntry(testSymlink);
    expect(result).toBe('symbolicLink');
  });

  test('存在しないパスの場合にエラーをスローする', async () => {
    await expect(checkEntry('./non-existent')).rejects.toThrow();
  });
});
