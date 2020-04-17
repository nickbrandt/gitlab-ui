import * as numberUtils from '../../src/utils/number_utils';

describe('number utils', () => {
  describe('addition', () => {
    it('adds two numbers together', () => {
      expect(numberUtils.addition(3, 6)).toBe(9);
    });
  });

  describe('sum', () => {
    it('returns the sum of all arguments', () => {
      expect(numberUtils.sum(3, 6, 7, 8, 9, 10)).toBe(43);
    });
  });

  describe('average', () => {
    it('returns the average of all arguments', () => {
      expect(numberUtils.average(4, 6, 9, 12)).toBe(7.75);
    });
  });

  describe('engineeringNotation', () => {
    it.each`
      input                | output
      ${[1000]}            | ${'1k'}
      ${[-1000]}           | ${'-1k'}
      ${[100]}             | ${'100'}
      ${[0.001]}           | ${'1m'}
      ${[200000]}          | ${'200k'}
      ${[9999999]}         | ${'10M'}
      ${[101111]}          | ${'101k'}
      ${[0.00099]}         | ${'990μ'}
      ${[0.009101]}        | ${'9.1m'}
      ${[0.0000007]}       | ${'700n'}
      ${[0.0000007549]}    | ${'755n'}
      ${[0.0000007549, 0]} | ${'800n'}
      ${[0.0000007549, 4]} | ${'754.9n'}
      ${['1,000.00']}      | ${'NaN'}
      ${['a string']}      | ${'NaN'}
      ${[NaN]}             | ${'NaN'}
      ${[Infinity]}        | ${'Infinity'}
      ${[-Infinity]}       | ${'-Infinity'}
    `('with args $input, returns $output', ({ input, output }) => {
      expect(numberUtils.engineeringNotation(...input)).toBe(output);
    });
  });
});
