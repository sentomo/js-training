export function modifyUrl({ base, addQuery = [], path = '' }) {
  try {
    // ベースのURLを解析する
    const url = new URL(base);

    // パスを設定する
    if (path) {
      if (path.startsWith('.')) {
        url.pathname = path.slice(1);
      }
      else {
        url.pathname = path;
      }
    }

    // クエリを追加する
    if (addQuery.length > 0) {
      for (const [key, value] of addQuery) {
        url.searchParams.append(key, value);
      }
    }
    return url.toString();
    
  } catch (e) {
    throw new Error("Invalid URL format");
  }
}