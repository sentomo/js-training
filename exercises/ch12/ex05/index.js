import * as fs from 'fs';

export function* readLines(filepath) {
  const bufferSize = 256;
  const fd = fs.openSync(filepath, 'r'); //読み込み専用で開く Cf: https://nodejs.org/api/fs.html#file-system-flags
  const buffer = Buffer.alloc(bufferSize);
  let leftover = '';

  try {
    let bytesRead;
    while ((bytesRead = fs.readSync(fd, buffer, 0, bufferSize, null)) > 0) {
      leftover += buffer.toString(); // 一定バッファサイズごとに読み込んだbuffer情報を文字列として取得
      let lines = leftover.split('\n');
      leftover = lines.pop(); // 最後の未完全な行(配列の最後の要素)を削除して、leftover変数として削除した値を保持しておく

      for (const line of lines) {
        yield line;
      }
    }

    if (leftover) {
        yield leftover; // 残った部分を最後に返す
    }
  } catch (e) {
    console.log("Caught an exception:", e.message);
  } finally {
    fs.closeSync(fd);
  }
}