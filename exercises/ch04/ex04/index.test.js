import { bitCount } from "./index.js";

describe("bitCount", () => {

    it("0b111の時、3を返す", () => {  
      expect(bitCount(0b111)).toBe(3);
    });
    
    it("0b1111111111111111111111111111111の時、31を返す", () => {  
      expect(bitCount(0b1111111111111111111111111111111)).toBe(31);
    });

    it("0b1の時、1を返す", () => {  
      expect(bitCount(0b1)).toBe(1);
    });

    it("0x0時、0を返す", () => {  
      expect(bitCount(0b0)).toBe(0);
    });
});