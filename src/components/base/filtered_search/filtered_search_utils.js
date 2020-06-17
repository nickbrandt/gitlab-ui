export const TERM_TOKEN_TYPE = 'filtered-search-term';

export function isEmptyTerm(token) {
  return token.type === TERM_TOKEN_TYPE && token.value.data.trim() === '';
}

export function normalizeTokens(tokens) {
  const result = [];
  tokens.forEach(token => {
    if (isEmptyTerm(token)) {
      return;
    }

    if (token.type !== TERM_TOKEN_TYPE) {
      result.push({ ...token });
    } else if (result.length > 0 && typeof result[result.length - 1] === 'string') {
      result[result.length - 1] += ` ${token.value.data}`;
    } else {
      result.push(token.value.data);
    }
  });
  return result;
}

function assertValidTokens(tokens) {
  if (!Array.isArray(tokens) && !typeof tokens === 'string') {
    throw new TypeError('Either string or array of tokens is expected');
  }
}

export function needDenormalization(tokens) {
  if (typeof tokens === 'string') {
    return true;
  }

  assertValidTokens(tokens);

  return tokens.some(t => typeof t === 'string');
}

export function denormalizeTokens(inputTokens) {
  assertValidTokens(inputTokens);

  const tokens = Array.isArray(inputTokens) ? inputTokens : [inputTokens];

  const result = [];
  tokens.forEach(t => {
    if (typeof t === 'string') {
      const stringTokens = t.split(' ').filter(Boolean);
      stringTokens.forEach(strToken =>
        result.push({ type: TERM_TOKEN_TYPE, value: { data: strToken } })
      );
    } else {
      result.push(t);
    }
  });
  return result;
}

export function splitOnQuotes(str) {
  const queue = str.split(' ');
  const result = [];
  let waitingForMatchingQuote = false;
  let quoteContent = '';

  while (queue.length) {
    const part = queue.shift();
    const quoteIndex = part.indexOf('"');
    if (quoteIndex === -1) {
      if (waitingForMatchingQuote) {
        quoteContent += ` ${part}`;
      } else {
        result.push(part);
      }
    } else {
      const [firstPart, secondPart] = part.split('"', 2);

      if (waitingForMatchingQuote) {
        waitingForMatchingQuote = false;
        quoteContent += ` ${firstPart}"`;
        result.push(quoteContent);
        quoteContent = '';
        if (secondPart.length) {
          queue.unshift(secondPart);
        }
      } else {
        waitingForMatchingQuote = true;
        if (firstPart.length) {
          result.push(firstPart);
        }
        quoteContent = `"${secondPart}`;
      }
    }
  }
  return result;
}
