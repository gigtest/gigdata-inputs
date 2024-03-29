function maskit(value, mask, masked = true, tokens) {
  if (!mask) {
    return value;
  }

  value = value || "";
  mask = mask || "";
  let iMask = 0;
  let iValue = 0;
  let output = "";
  while (iMask < mask.length && iValue < value.length) {
    let cMask = mask[iMask];
    let masker = tokens[cMask];
    let cValue = value[iValue];
    if (masker && !masker.escape) {
      if (masker.pattern.test(cValue)) {
        output += masker.transform ? masker.transform(cValue) : cValue;
        iMask++;
      }
      iValue++;
    } else {
      if (masker && masker.escape) {
        iMask++; // take the next mask char and treat it as char
        cMask = mask[iMask];
      }
      if (masked) output += cMask;
      if (cValue === cMask) iValue++; // user typed the same char
      iMask++;
    }
  }

  // fix mask that ends with a char: (#)
  let restOutput = "";
  while (iMask < mask.length && masked) {
    let cMask = mask[iMask];
    if (tokens[cMask]) {
      restOutput = "";
      break;
    }
    restOutput += cMask;
    iMask++;
  }

  return output + restOutput;
}

const maskTokens = {
  // любая цифра
  "#": {pattern: /\d/},
  // любая цифра или буква
  X: {pattern: /[0-9a-zA-Z]/},
  // любая буква
  S: {pattern: /[a-zA-Z]/},
  A: {pattern: /[a-zA-Z]/, transform: (v) => v.toLocaleUpperCase()},
  a: {pattern: /[a-zA-Z]/, transform: (v) => v.toLocaleLowerCase()},
  "*": {pattern: /./},
  "!": {escape: true},
};


export {
  maskit,
  maskTokens,
}
