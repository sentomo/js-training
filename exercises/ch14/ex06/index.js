export function createMethodCallLogger(target) {
  const history = [];

  const handler = {
    get(obj, prop) {
      // プロパティが関数の場合、ラップして履歴を記録
      const original = obj[prop];
      if (typeof original === 'function') {
        return (...args) => {
          const timestamp = new Date();
          history.push({
            time: timestamp,
            method: prop,
            params: args,
          });
          return original.apply(obj, args); // 元の関数を呼び出す
        };
      }
      return original; // 関数でない場合はそのまま返す
    },
  };

  const proxy = new Proxy(target, handler);

  return { proxy, history };
}

