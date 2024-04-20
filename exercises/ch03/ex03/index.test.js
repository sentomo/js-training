import { checkEquivalent } from "./index.js";

describe("checkEquivalent", () => {

    it("returns true when (0.3 - 0.2, 0.1) given", () => {
      expect(checkEquivalent(0.3 - 0.2, 0.1)).toBe(true);
    });
    
    it("returns true when (0.2 - 0.1, 0.1) given", () => {
      expect(checkEquivalent(0.2 - 0.1, 0.1)).toBe(true);
    });
});