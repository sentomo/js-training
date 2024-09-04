import * as fsPromises from 'node:fs/promises';
import { join } from 'node:path';

export async function fetchFirstFileSize(path) {
  try {
    const files = await fsPromises.readdir(path);
    if (files.length === 0) {
      return null;  // ディレクトリが空の場合は null を返す
    }
    const stats = await fsPromises.stat(join(path, files[0]));
    return stats.size;
  } catch (err) {
    // エラー処理を追加する場合はここで行う
    throw err;
  }
}

export async function fetchSumOfFileSizes(path) {
  try {
    const files = await fsPromises.readdir(path);
    const statPromises = files.map(file => 
      fsPromises.stat(join(path, file)).then(stats => stats.size)
    );
    const sizes = await Promise.all(statPromises); // 非同期の stat 呼び出しを並列に実行
    return sizes.reduce((total, size) => total + size, 0);
  } catch (err) {
    // エラー処理を追加する場合はここで行う
    throw err;
  }
}