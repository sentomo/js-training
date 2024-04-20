class Example {
  constructor(value) {
    this.value = value;
  }
  valueOf() {
    return this.value;
  }

  toString() {
    let str = "";
    str = this.value;
    return str;
  }
}

let obj = new Example(4);
console.log(obj.valueOf);
console.log(obj.toString);