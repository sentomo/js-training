import { escapeStringIfElse, escapeStringSwitch } from "./index.js";

describe("escapeSequence", () => {
  let original = "This is a test\n with a backslash \\, a quote \", an apostorophy \', a NUL \0, a backspace \b, a vertical tab \v, a change page \f and a return \r";
  let expected = 'This is a test\\n with a backslash \\\\, a quote \\", an apostorophy ' + "\\', a NUL \\0, a backspace \\b, a vertical tab \\v, a change page \\f and a return \\r";

    it("if-elseで分岐するバージョンのテスト", () => {  
      expect(escapeStringIfElse(original)).toBe(expected);
    });
    
    it("switchで分岐するバージョンのテスト", () => {  
      expect(escapeStringSwitch(original)).toBe(expected);
    });
});