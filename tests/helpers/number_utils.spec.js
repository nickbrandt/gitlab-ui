import * as numberUtils from '../../utils/number_utils';

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

  describe('isIntGreaterThan (0)', () => {
    const isIntGreaterThanZero = numberUtils.isIntGreaterThan(0);

    it('returns true if passed number is an integer greater than 0', () => {
      expect(isIntGreaterThanZero(1)).toBe(true);
    });

    it('returns false if passed number is an integer but is not greater than 0', () => {
      expect(isIntGreaterThanZero(0)).toBe(false);
    });

    it('returns false if passed number is not an integer', () => {
      expect(isIntGreaterThanZero(2.5)).toBe(false);
      expect(isIntGreaterThanZero('1')).toBe(false);
      expect(isIntGreaterThanZero(NaN)).toBe(false);
      expect(isIntGreaterThanZero(Infinity)).toBe(false);
    });
  });
});
