export function sum(array) {
  if(!Array.isArray(array)) return 0;
  return array.reduce((acc, curr) => acc + curr, 0);
}

export function join(array, separator = ',') {
  return array.reduce((acc, curr, index) => acc + (index ? separator : "") + (curr ?? ""), "");
}

export function reverse(array) {
  return array.reduce((acc, curr) => [curr, ...acc], []);
}

export function every(array, predicate) {
  return array.reduce((acc, curr, index, arr) => {
    return acc && predicate(curr, index, arr);
  }, true);
}

export function some(array, predicate) {
  return array.reduce((acc, curr, index, arr) => {
    return acc || predicate(curr, index, arr);
  }, false);
}