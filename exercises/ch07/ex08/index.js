export function reverse(str) {
  const segments = [];
  const segmenter = new Intl.Segmenter("jp", { granularities: "grapheme" }); // granularitiesの訳は粒度、graphemeの訳は書記素。書記言語において意味上の区別を可能にする最小の図形単位。
  const iterator = segmenter.segment(str); // Intl.Segmenterオブジェクトで設定したロケールと粒度に従って文字列を分割し、Segmentsオブジェクトを返す
  
  for (const segment of iterator) {
    segments.unshift(segment.segment); // 1 segmentの中身はこうなっている { segment: "家", index: 0, input: "家族 👨‍👨‍👧‍👧" }
  }
  
  return segments.join("");
}