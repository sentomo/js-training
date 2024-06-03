export function getAllUniqueAndInheritedProperties(obj) {
  const uniqueProperties = Object.getOwnPropertyNames(obj); // 独自プロパティで列挙不可も含む
  const symbolProperties = Object.getOwnPropertySymbols(obj); // 独自プロパティでSymbolのもの

  // 継承プロパティで列挙可のもの
  let prototype = Object.getPrototypeOf(obj);
  let inheritedProperties = [];
  while (prototype !== null) {
    if (Object.keys(prototype).length > 0) {
      // プロパティがない場合はundefindになってしまうため
      inheritedProperties = inheritedProperties.concat(Object.keys(prototype));
    }
    prototype = Object.getPrototypeOf(prototype);
  }

  return uniqueProperties.concat(symbolProperties).concat(inheritedProperties);
}
