import has from 'lodash/has';

// eslint-disable-next-line import/prefer-default-export
export const tokensValidator = tokens => tokens.every(token => has(token, 'id'));
