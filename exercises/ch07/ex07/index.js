export function bubbleSort(
  array,
  compare = (lhs, rhs) => (lhs < rhs ? -1 : (lhs > rhs ? 1 : 0))
) {
  let n = array.length;
  let swapped = true;

  while (swapped) {
    swapped = false;
    for (let i = 1; i < n; i++) {
      if (compare(array[i - 1], array[i]) > 0) { // compare(array[i - 1], array[i])の時、array[i - 1]の方が大きい時は1が返る
        [array[i - 1], array[i]] = [array[i], array[i - 1]]; // 隣同士の交換
        swapped = true;
      }
    }
    n--; // ループで最後の要素が正しい位置にあるため
  }
  
  return array;
}