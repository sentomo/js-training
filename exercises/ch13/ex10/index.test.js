import * as fsPromises from 'node:fs/promises';
import { join } from 'node:path';
import { fetchSumOfFileSizes } from './index.js'; 

const testDir = 'testDir';  // テスト用ディレクトリのパス

describe('ファイルサイズ取得関数のテスト', () => {

  beforeAll(() => {
    // テスト用のディレクトリとファイルを作成
    return fsPromises.mkdir(testDir)
      .then(() => fsPromises.writeFile(join(testDir, 'file1.txt'), 'Hello'))
      .then(() => fsPromises.writeFile(join(testDir, 'file2.txt'), 'World'))
      .then(() => fsPromises.writeFile(join(testDir, 'file3.txt'), '!'));
  });

  afterAll(() => {
    // テスト用のディレクトリとファイルを削除
    return fsPromises.rm(testDir, { recursive: true, force: true });
  });

  it('fetchSumOfFileSizes関数でディレクトリ内の全ファイルのサイズの合計を取得できる', async () => {
    const totalSize = await fetchSumOfFileSizes(testDir);
    expect(totalSize).toBe(11);  // 'file1.txt', 'file2.txt', 'file3.txt' の合計サイズは 5 + 5 + 1 = 11バイト
  });

  it('fetchSumOfFileSizes関数で空のディレクトリからサイズ0が返される', async () => {
    const emptyDir = join(testDir, 'empty2');
    await fsPromises.mkdir(emptyDir);
    const totalSize = await fetchSumOfFileSizes(emptyDir);
    expect(totalSize).toBe(0);
  });

  it('fetchSumOfFileSizes関数で存在しないディレクトリを渡した場合にエラーが発生する', async () => {
    const nonExistentDir = 'nonExistentDir';
    await expect(fetchSumOfFileSizes(nonExistentDir)).rejects.toThrow();
  });
});