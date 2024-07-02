export function any(...funcs) {
  return function(...args) {
    for (let func of funcs) {
      if (func(...args)) {
        return true;
      }
    }
    return false;
  };
}

export function catching(tryFunc, catchFunc) {
  return function(...args) {
    try {
      return tryFunc(...args);
    } catch (e) {
      return catchFunc(e);
    }
  };
}