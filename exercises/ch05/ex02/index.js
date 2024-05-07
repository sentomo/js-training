// if-else
export function escapeStringIfElse(input) {
  let result = '';

  for (let char of input) {
    if (char === '\\') {
      result += '\\\\';
    } else if (char === '\0') {
      result += '\\0';
    } else if (char === '\b') {
      result += '\\b';
    } else if (char === '\t') {
      result += '\\t';
    } else if (char === '\n') {
      result += '\\n';
    } else if (char === '\v') {
      result += '\\v';
    } else if (char === '\f') {
      result += '\\f';
    } else if (char === '\r') {
      result += '\\r';
    } else if (char === '"') {
      result += '\\"';
    } else if (char === "'") {
      result += "\\'";
    } else {
      result += char;
    }
  }

  return result;
}

// switch
export function escapeStringSwitch(input) {
  let result = '';

  for (let char of input) {
    switch (char) {
      case '\\':
        result += '\\\\';
        break;
      case '\0':
        result += '\\0';
        break;
      case '\b':
        result += '\\b';
        break;
      case '\t':
        result += '\\t';
        break;
      case '\n':
        result += '\\n';
        break;
      case '\v':
        result += '\\v';
        break;
      case '\f':
        result += '\\f';
        break;
      case '\r':
        result += '\\r';
        break;
      case '"':
        result += '\\"';
        break;
      case "'":
        result += "\\'";
        break;
      default:
        result += char;
        break;
    }
  }

  return result;
}

let OriginalString = "This is a test\n with a backslash \\, a quote \", an apostorophy \',  a NUL \0, a backspace \b, a vertical tab \v, a change page \f and a return \r";
console.log("Original: " + OriginalString);
console.log(escapeStringIfElse(OriginalString));
console.log(escapeStringSwitch(OriginalString));