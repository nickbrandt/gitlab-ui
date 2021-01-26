import { splitAfterSymbols } from './string_utils';

describe('string utils', () => {
  describe('splitAfterSymbols', () => {
    it.each`
      string          | symbols                                 | result
      ${''}           | ${[]}                                   | ${['']}
      ${''}           | ${['']}                                 | ${['']}
      ${''}           | ${['/']}                                | ${['']}
      ${'/'}          | ${['/']}                                | ${['/']}
      ${'//'}         | ${['/']}                                | ${['/', '/']}
      ${'foo'}        | ${[]}                                   | ${['foo']}
      ${'foo'}        | ${['/']}                                | ${['foo']}
      ${'foo'}        | ${['']}                                 | ${['foo']}
      ${'a/b'}        | ${['/']}                                | ${['a/', 'b']}
      ${'a/b/c'}      | ${['/']}                                | ${['a/', 'b/', 'c']}
      ${'a/b-c'}      | ${['/', '-']}                           | ${['a/', 'b-', 'c']}
      ${'a/b-c'}      | ${['-', '/']}                           | ${['a/', 'b-', 'c']}
      ${'/-/-/'}      | ${['/', '-']}                           | ${['/', '-', '/', '-', '/']}
      ${`"'<>&/\\`}   | ${[`"`, `'`, `<`, `>`, `&`, `/`, `\\`]} | ${`"'<>&/\\`.split('')}
      ${'some words'} | ${['om', 'ord']}                        | ${['som', 'e word', 's']}
      ${'some words'} | ${['o', 'om']}                          | ${['so', 'me wo', 'rds']}
      ${'some words'} | ${['om', 'o']}                          | ${['som', 'e wo', 'rds']}
    `('given "$string" and $symbols returns $result', ({ string, symbols, result }) => {
      const actual = splitAfterSymbols(symbols, string);
      expect(actual).toEqual(result);
      expect(actual.join('')).toEqual(string);
    });
  });
});
