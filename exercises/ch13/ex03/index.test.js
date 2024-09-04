import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import { readdir, stat } from './index.js';

describe('ファイルシステム関数のテスト', () => {
  const testDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)),'testDir'); // 絶対パスを取得

  beforeAll(async () => {
    // テスト用のディレクトリ構造を作成
    fs.mkdirSync(testDir);

    let fd; // ファイルディスクリプタ

    // テスト用のファイルを作成
    for (let i = 1; i <= 3 ; i++) {
      fd = fs.openSync(path.join(testDir, `file${i}.txt`), 'w');
      fs.writeSync(fd, `File ${i} contents`);
      fs.closeSync(fd);
    }
  });

  afterAll(async () => {
    // テスト用のディレクトリ構造を削除
    fs.unlinkSync(path.join(testDir, 'file1.txt'));
    fs.unlinkSync(path.join(testDir, 'file2.txt'));
    fs.unlinkSync(path.join(testDir, 'file3.txt'));
    fs.rmdirSync(testDir);
  });

  it('readdir関数でディレクトリの内容を読み取れる', () => {
    const result = ['file1.txt', 'file2.txt', 'file3.txt'];
    return expect(readdir(testDir)).resolves.toEqual(result);
  });

  it('存在しないディレクトリを指定するとreaddir関数がエラーをスローする', () => {
    return expect(readdir('./non-existent-directory')).rejects.toThrow();
  });

  it('stat関数でファイルの情報を取得できる', () => {
    const filepath = path.join(testDir, 'file1.txt');
    return stat(filepath).then((stats) => {
      expect(stats.isFile()).toEqual(true);
    });
  });

  it('存在しないファイルを指定するとstat関数がエラーをスローする', () => {
    return expect(stat('./non-existent-file.txt')).rejects.toThrow();
  });

});

// 参考：Promiseのテストの書き方 https://jestjs.io/ja/docs/asynchronous#promises