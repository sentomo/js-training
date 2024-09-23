import * as fsPromises from 'node:fs/promises';
import { join } from 'node:path';

export function fetchFirstFileSize(path) {
  return fsPromises.readdir(path)
    .then(files => {
      if (files.length === 0) {
        return null;  // ディレクトリが空の場合は null を返す
      }
      return fsPromises.stat(join(path, files[0])).then(stats => stats ? stats.size : null); // とした方がスッキリするかも
    })
    // .then(stats => stats ? stats.size : null);
}

export function fetchSumOfFileSizes(path) {
  return fsPromises.readdir(path)
    .then(files => {
      const statPromises = files.map(file => {
        return fsPromises.stat(join(path, file)).then(stats => stats.size);
      });
      return Promise.all(statPromises); // 非同期の stat 呼び出しを並列に実行
    })
    .then(sizes => sizes.reduce((total, size) => total + size, 0));
}