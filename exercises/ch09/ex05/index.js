export function instanceOf(object, constructor) {
  if (object == null) {
    return false;
  }
  let proto = Object.getPrototypeOf(object);
  while (proto !== null) {
    if (proto.constructor === constructor) { // prototypeを見ないとだめ。if (proto === constructor.prototype)
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
