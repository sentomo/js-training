import { TypeMap } from "./index.js";

class Foo {}
const typeMap = new TypeMap();

describe('TypeMapで正しく値をsetもしくはgetできる', () => {

  it('String', () => {
    typeMap.set(String, "string");
    expect(typeMap.get(String)).toBe("string");
  });

  it('Number', () => {
    typeMap.set(Number, 123);
    expect(typeMap.get(Number)).toBe(123);
  });

  it('Boolean', () => {
    typeMap.set(Boolean, true);
    expect(typeMap.get(Boolean)).toBe(true);
  });

  it('BigInt', () => {
    typeMap.set(BigInt, 123n);
    expect(typeMap.get(BigInt)).toBe(123n);
  });

  it('Symbol', () => {
    const sym = Symbol("symbol");
    typeMap.set(Symbol, sym);
    expect(typeMap.get(Symbol)).toBe(sym);
  });

  it('Object', () => {
    const obj = { key: "value" };
    typeMap.set(Object, obj);
    expect(typeMap.get(Object)).toBe(obj);
  });

  it('Custom Class', () => {
    const foo = new Foo();
    typeMap.set(Foo, foo);
    expect(typeMap.get(Foo)).toBe(foo);
  });

  it('Date', () => {
    const date = new Date();
    typeMap.set(Date, date);
    expect(typeMap.get(Date)).toBe(date);
  });
});

describe('TypeMapで誤った型に対して操作した場合、エラーを投げる。', () => {
  it('key: not constructor function, value: Number', () => {
    expect(() => {
      typeMap.set(1234, 123);
    }).toThrow("Key must be a constructor function");
  });

  it('key: String, value: Number', () => {
    expect(() => {
      typeMap.set(String, 123);
    }).toThrow("Value must be an instance of the key's type");
  });

  it('key: Number, value: String', () => {
    expect(() => {
      typeMap.set(Number, "string");
    }).toThrow("Value must be an instance of the key's type");
  });

  it('key: Boolean, value: Number', () => {
    expect(() => {
      typeMap.set(Boolean, 123);
    }).toThrow("Value must be an instance of the key's type");
  });

  it('key: BigInt, value: Number', () => {
    expect(() => {
      typeMap.set(BigInt, 123);
    }).toThrow("Value must be an instance of the key's type");
  });

  it('key: Symbol, value: Number', () => {
    expect(() => {
      typeMap.set(Symbol, 123);
    }).toThrow("Value must be an instance of the key's type");
  });

  
  it('key: Foo, value: Object', () => {
    expect(() => {
      typeMap.set(Foo, {});
    }).toThrow("Value must be an instance of the key's type");
  });
      
  it('key: Object, value: String', () => {
    expect(() => {
      typeMap.set(Object, "string");
    }).toThrow("Value must be an instance of the key's type");
  });

  it('key: Date, value: String', () => {
    expect(() => {
      typeMap.set(Date, "not a date");
    }).toThrow("Value must be an instance of the key's type");
  });
});