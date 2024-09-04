import * as fsPromises from 'node:fs/promises';
import { join } from 'node:path';

export async function fetchSumOfFileSizes(path) {
  try {
    // ディレクトリ内のファイル一覧を取得
    const files = await fsPromises.readdir(path);
    
    // 各ファイルのサイズを取得する Promise の配列を作成
    const statPromises = files.map(file => 
      fsPromises.stat(join(path, file)).then(stats => stats.size)
    );
    
    // すべてのファイルサイズ取得 Promise を並行して実行し、結果を待つ
    const sizes = await Promise.all(statPromises);
    
    // ファイルサイズの合計を計算して返す
    return sizes.reduce((total, size) => total + size, 0);
  } catch (error) {
    // エラーハンドリング
    console.error('Error fetching file sizes:', error);
    throw error; // 必要に応じて再スローする
  }
}