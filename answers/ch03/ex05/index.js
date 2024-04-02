export function convertNewlines(inputString) {
  let convertNewlinesStr = "";
  if (inputString.includes("\r\n")) {
    // CR+LF -> LF
    convertNewlinesStr = inputString.replace(/\r\n/g, '\n');
  } else {
    // LF -> CR+LF
    convertNewlinesStr = inputString.replace(/\n/g, '\r\n');
  }
  return convertNewlinesStr;
}