import { convertNewlines } from "./index.js";

describe("convertNewlines", () => {

    it("LF -> CR+LF", () => {
      expect(convertNewlines('Hello\nWorld')).toBe('Hello\r\nWorld');
    });
    
    it("CR+LF -> LF", () => {
      expect(convertNewlines('Hello\r\nWorld')).toBe('Hello\nWorld');
    });
});