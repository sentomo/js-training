export function restrict(target, template) {
  for(let key in target) {
    const templateOriginalProperties = Object.keys(template);
    if(!(key in template)) {
      delete target[key];
    } else if(key in template && !(templateOriginalProperties.includes(key))) {
      delete target[key];
    }
  }
  console.log(JSON.stringify(target));
  return target;
}

export function substract(target, ...sources) {
  for(let source of sources) {
    const sourceOriginalProperties = Object.keys(source);
    for(let key in target) {
      if(sourceOriginalProperties.includes(key)) {
        delete target[key];
      } 
    }
  }
  return target;
}