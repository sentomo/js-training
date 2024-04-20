export function checkEquivalent(x, y) {
  const diff = x - y;
  return diff < 1e-10;
}