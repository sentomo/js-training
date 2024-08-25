import * as fs from 'fs';
import * as path from 'path';

export function* walk(rootPath) {
  try{
  const entries = fs.readdirSync(rootPath, { withFileTypes: true }); // withFileTypes オプションを true に設定して呼び出すと、結果の配列は文字列や <Buffer> ではなく <fs.Dirent> オブジェクト(ファイル名やサブディレクトリ)になる

  for (const entry of entries) {
    const fullPath = path.join(rootPath, entry.name);
    const isDirectory = entry.isDirectory(); // Cf: https://nodejs.org/api/fs.html#direntisdirectory

    // ファイル/ディレクトリの情報を yield する
    yield {
      path: fullPath,
      isDirectory: isDirectory
    };

    // ディレクトリであれば再帰的に探索する
    if (isDirectory) {
      yield* walk(fullPath);
    }
  }
 } catch(error) {
  if (error.code === 'ENOENT' || error.code === 'ENOTDIR') {
    // ディレクトリが存在しない場合やディレクトリ以外が渡された時は何も返さずに終了
    return;
  } else {
    // その他のエラーは再スロー
    throw error;
  }
 }
}

// ブロックデバイス：データのまとまりごとに処理をするデバイスのこと。バッファを使用、ランダムアクセス可 Cf: https://qiita.com/KenjiOtsuka/items/8f9ee4bc41bf676d64d9
