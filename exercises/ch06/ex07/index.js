export function assign(target, ...sources) {
  for (let source of sources) {
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        // 独自プロパティかどうか(Symbolも含む)
        target[key] = source[key];
      }
    }
  }
  return target;
}
