import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { walk } from './index.js';

describe('walk generator', () => {
  const testDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)),'testDir'); // 絶対パスを取得

  beforeAll(() => {
    // テスト用のディレクトリ構造を作成
    fs.mkdirSync(testDir);
    fs.mkdirSync(path.join(testDir, 'subDir1'));
    fs.mkdirSync(path.join(testDir, 'subDir2'));

    let fd;　// ファイルディスクリプタ

    // テスト用のファイルを作成
    for (let i = 1; i <= 3 ; i++) {
      if(i === 1) {
        fd = fs.openSync(path.join(testDir, `file${i}.txt`), 'w');
      }
      else {
        fd = fs.openSync(path.join(testDir, `subDir${i-1}`, `file${i}.txt`), 'w');
      }

      fs.writeSync(fd, `File ${i} contents`);
      fs.closeSync(fd);
    }
  });

  afterAll(() => {
    // テスト用のディレクトリ構造を削除
    fs.unlinkSync(path.join(testDir, 'file1.txt'));
    fs.unlinkSync(path.join(testDir, 'subDir1', 'file2.txt'));
    fs.unlinkSync(path.join(testDir, 'subDir2', 'file3.txt'));
    fs.rmdirSync(path.join(testDir, 'subDir1'));
    fs.rmdirSync(path.join(testDir, 'subDir2'));
    fs.rmdirSync(testDir);
  });

  it('ディレクトリを再帰的に走査し、正しいパスとディレクトリフラグを生成する', () => {
    const expectedResults = [
      { path: path.join(testDir, 'file1.txt'), isDirectory: false },
      { path: path.join(testDir, 'subDir1'), isDirectory: true },
      { path: path.join(testDir, 'subDir1', 'file2.txt'), isDirectory: false },
      { path: path.join(testDir, 'subDir2'), isDirectory: true },
      { path: path.join(testDir, 'subDir2', 'file3.txt'), isDirectory: false },
    ];

    const result = [...walk(testDir)];
    expect(result).toEqual(expectedResults);
  });

  it('存在しないディレクトリを渡した時に、何も返さない', () => {
    const emptyDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)),'emptyDir');
    const result = [...walk(emptyDir)];
    expect(result).toEqual([]);
  });

  it('ファイルを渡した時に、何も返さない', () => {
    const filePath = path.join(testDir, 'file1.txt');
    const result = [...walk(filePath)];
    expect(result).toEqual([]);
  });
});
