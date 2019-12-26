export const TERM_TOKEN_TYPE = 'filtered-search-term';

export function isEmptyTerm(token) {
  return token.type === TERM_TOKEN_TYPE && token.value.trim() === '';
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
      result[result.length - 1] += ` ${token.value}`;
    } else {
      result.push(token.value);
    }
  });
  return result;
}

export function needDenormalization(tokens) {
  return tokens.some(t => typeof t === 'string');
}

export function denormalizeTokens(tokens) {
  const result = [];
  tokens.forEach(t => {
    if (typeof t === 'string') {
      const stringTokens = t.split(' ').filter(Boolean);
      stringTokens.forEach(strToken => result.push({ type: TERM_TOKEN_TYPE, value: strToken }));
    } else {
      result.push(t);
    }
  });
  return result;
}
