import fs from 'fs';

export async function checkEntry(path) {
  try {
    const stats = await fs.promises.lstat(path); // lstatを使用してシンボリックリンクを判定
    if (stats.isSymbolicLink()) {
      return 'symbolicLink';
    } else if (stats.isFile()) {
      return 'file';
    } else if (stats.isDirectory()) {
      return 'directory';
    } else {
      return 'unknown';
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
