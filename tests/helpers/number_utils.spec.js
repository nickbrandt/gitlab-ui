import * as numberUtils from '../../helpers/number_utils';

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
});
