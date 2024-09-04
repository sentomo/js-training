import * as fsPromises from 'node:fs/promises';
import { join } from 'node:path';
import { fetchFirstFileSize, fetchSumOfFileSizes } from './index.js'; 

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

  it('fetchFirstFileSize関数で最初のファイルのサイズを取得できる', () => {
    return fetchFirstFileSize(testDir)
      .then(size => {
        expect(size).toBe(5);  // 'file1.txt' のサイズは5バイト
      });
  });

  it('fetchSumOfFileSizes関数でディレクトリ内の全ファイルのサイズの合計を取得できる', () => {
    return fetchSumOfFileSizes(testDir)
      .then(totalSize => {
        expect(totalSize).toBe(11);  // 'file1.txt', 'file2.txt', 'file3.txt' の合計サイズは 5 + 5 + 1 = 11バイト
      });
  });

  it('fetchFirstFileSize関数で空のディレクトリからnullが返される', () => {
    const emptyDir = join(testDir, 'empty1');
    return fsPromises.mkdir(emptyDir)
      .then(() => fetchFirstFileSize(emptyDir))
      .then(size => {
        expect(size).toBeNull();
        return fsPromises.rmdir(emptyDir);
      });
  });

  it('fetchSumOfFileSizes関数で空のディレクトリからサイズ0が返される', () => {
    const emptyDir = join(testDir, 'empty2');
    return fsPromises.mkdir(emptyDir)
      .then(() => fetchSumOfFileSizes(emptyDir))
      .then(totalSize => {
        expect(totalSize).toBe(0);
        return fsPromises.rmdir(emptyDir);
      });
  });

  it('fetchFirstFileSize関数で存在しないディレクトリを渡した場合にエラーが発生する', () => {
    const nonExistentDir = 'nonExistentDir';
    return expect(fetchFirstFileSize(nonExistentDir)).rejects.toThrow();
  });

  it('fetchSumOfFileSizes関数で存在しないディレクトリを渡した場合にエラーが発生する', () => {
    const nonExistentDir = 'nonExistentDir';
    return expect(fetchSumOfFileSizes(nonExistentDir)).rejects.toThrow();
  });
});