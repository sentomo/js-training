export function filterEvenProperties(obj) {
  const newObj = {};

  for (const key in obj) {
    // toStringなど、継承されたプロパティを除外する Cf:https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
    if (obj.hasOwnProperty(key)) {
      // プロパティの値が偶数なら、新しいオブジェクトに追加
      if (typeof obj[key] === "number" && obj[key] % 2 === 0) {
        newObj[key] = obj[key];
      }
    }
  }

  return newObj;
}

const input = { a: 1, b: 2, c: 3, d: 4, e: 5 };
const output = filterEvenProperties(input);
console.log(output); // { b: 2, d: 4 }
