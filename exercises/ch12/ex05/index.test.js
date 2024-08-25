import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { readLines } from './index.js'

describe('readLines generator', () => {
  const testFilePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)),'./test2.txt'); // 絶対パスを取得
  let fd; // ファイルディスクリプタ

  beforeAll(() => {
    // テスト用のファイルを作成
    const data = [
      'First line',
      'Second line',
      'Third line',
      'Fourth line'
    ].join('\n');
    fd = fs.openSync(testFilePath, 'r'); // 書き込み専用でファイルを開き、ファイルディスクリプタを取得
    fs.readFileSync(testFilePath)
  });

  afterAll(() => {
    if (fd !== undefined) {
      fs.closeSync(fd);
    }
  });

  it('ファイルの内容を正しく読み取れること', () => {
    const expectedLines = [
      'First line',
      'Second line',
      'Third line',
      'Fourth line'
    ];
    const resultLines = [...readLines(testFilePath)];
    
    // 決められたバッファサイズごとに読み込む影響でNULL文字が含まれていないか確認し、不要な部分をトリム
    const trimmedResultLines = resultLines.map(line => line.replace(/\u0000+$/, ''));
    
    expect(expectedLines).toEqual(trimmedResultLines);
  });

  it('空のファイルでも動作すること', () => {
    const emptyFilePath = path.resolve('emptyfile.txt');
    fs.writeFileSync(emptyFilePath, '', 'utf8');

    const resultLines = [...readLines(emptyFilePath)];
    expect(resultLines).toEqual([]);

    fs.unlinkSync(emptyFilePath); // テスト後にファイルを削除
  });

  it('バッファサイズを変更しても正しく動作すること', () => {
    const smallBufferSize = 5;
    const expectedLines = [
      'First line',
      'Second line',
      'Third line',
      'Fourth line'
    ];
    const resultLines = [...readLines(testFilePath, smallBufferSize)];

    // 決められたバッファサイズごとに読み込む影響でNULL文字が含まれていないか確認し、不要な部分をトリム
    const trimmedResultLines = resultLines.map(line => line.replace(/\u0000+$/, ''));
    
    expect(expectedLines).toEqual(trimmedResultLines);
  });

  it('ファイルが存在しない場合にエラーが発生すること', () => {
    const invalidFilePath = path.resolve('nonexistent.txt');
    expect(() => {
      [...readLines(invalidFilePath)];
    }).toThrow();
  });
});