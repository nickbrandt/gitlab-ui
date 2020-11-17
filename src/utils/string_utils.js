/**
 * Split the given string after each occurrence of each of the given symbols.
 *
 * Symbols are strings, and can be of length one or more. Zero-length symbols
 * are ignored.
 *
 * Unlike with `String::split`, the symbol is left in results, with
 * the split occurring _after_ the symbol.
 *
 * For example:
 *
 *     splitAfterSymbols(['/'], 'a/b/c')    // ['a/', 'b/', 'c']
 *     splitAfterSymbols(['foo'], 'foobar') // ['foo', 'bar']
 *
 * @param {string[]} symbols The symbols to split the string by.
 * @param {string} string The string to split.
 * @returns {string[]} The resulting strings.
 */
export const splitAfterSymbols = (symbols, string) => {
  const textParts = [];
  let textPartStartIndex = 0;

  if (string.length === 0) {
    textParts.push(string);
    return textParts;
  }

  for (let i = 0; i < string.length; ) {
    let symbolFound = false;

    for (let j = 0; j < symbols.length; j += 1) {
      const symbol = symbols[j];

      if (!symbol) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const symbolIndex = string.indexOf(symbol, i);

      if (symbolIndex === i) {
        symbolFound = true;
        const textPartEndIndex = i + symbol.length;
        const textPart = string.slice(textPartStartIndex, textPartEndIndex);
        textParts.push(textPart);
        textPartStartIndex = textPartEndIndex;
        i = textPartStartIndex;
        break;
      }
    }

    if (!symbolFound) {
      i += 1;
    }
  }

  const final = string.slice(textPartStartIndex);
  if (final) {
    textParts.push(final);
  }

  return textParts;
};
