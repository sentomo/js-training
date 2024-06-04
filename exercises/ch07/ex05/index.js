export function pop(arr) {
  return arr.slice(0, -1); // 元の配列の最後の要素を取り除いた新しい配列を作成する
}

export function push(arr, element) {
  return arr.concat(element); // 元の配列に新しい要素を追加した新しい配列を作成する
}

export function shift(arr) {
  return arr.slice(1); // 元の配列の1番目から最後までの要素を格納した新しい配列を作成する
}

export function unshift(arr, element) {
  return [element].concat(arr); // 元の配列の先頭に新しい要素を追加した新しい配列を作成する
}

export function sort(arr, compareFunction) {
  const newArr = arr.slice(); // 引数なしのsliceは、元の配列のコピーを作成する
  return newArr.sort(compareFunction);
}
