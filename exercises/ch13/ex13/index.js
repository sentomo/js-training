import * as fs from 'fs/promises';
import * as path from 'path';

export async function* walk(rootPath) {
  try {
    const entries = await fs.readdir(rootPath, { withFileTypes: true }); // withFileTypes オプションを true に設定して呼び出すと、結果の配列は文字列や <Buffer> ではなく <fs.Dirent> オブジェクト(ファイル名やサブディレクトリ)になる

    for (const entry of entries) {
      const fullPath = path.join(rootPath, entry.name);
      const isDirectory = entry.isDirectory();

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
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') {
      // ディレクトリが存在しない場合やディレクトリ以外が渡された時は何も返さずに終了
      return;
    } else {
      // その他のエラーは再スロー
      throw error;
    }
  }
}
