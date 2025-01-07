import fs from 'fs';
import iconv from 'iconv-lite';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fs.readFile(path.resolve(__dirname,"hello.txt"), (err, data) => {
  if (err) {
    console.error('ファイル読み込みエラー:', err);
    return;
  }

  // iconv-lite を使って Shift_JIS を UTF-8 に変換
  const text = iconv.decode(data, 'Shift_JIS');

  console.log(text);
});
