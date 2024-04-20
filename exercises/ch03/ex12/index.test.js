import { equals } from "./index.js";

describe("equals", () => {

    it("2つのオブジェクトのプロパティ名と値が同じ時、trueを返す", () => {
      let obj1 = {x:1, y:2};
      let obj2 = {x:1, y:2};
      
      expect(equals(obj1, obj2)).toBe(true);
    });
    
    it("2つのオブジェクトのプロパティ名と値が異なる時、falseを返す", () => {
      let obj1 = {x:1, y:2};
      let obj2 = {x:1, y:3};
      
      expect(equals(obj1, obj2)).toBe(false);
    });
});