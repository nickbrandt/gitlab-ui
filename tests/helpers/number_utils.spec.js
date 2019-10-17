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

  describe('engineeringNotation', () => {
    it('returns number and suffix as a string', () => {
      expect(numberUtils.engineeringNotation(1000)).toBe('1k');
    });

    it('keeps negative numbers negative', () => {
      expect(numberUtils.engineeringNotation(-1000)).toBe('-1k');
    });

    it('returns number without suffix', () => {
      expect(numberUtils.engineeringNotation(100)).toBe('100');
    });

    it('returns small number and suffix as a string', () => {
      expect(numberUtils.engineeringNotation(0.001, 2)).toBe('1m');
    });

    it('shows correct powers for hundreds of powers', () => {
      expect(numberUtils.engineeringNotation(200000)).toBe('200k');
    });

    it('rounds up big numbers correctly', () => {
      expect(numberUtils.engineeringNotation(9999999)).toBe('10M');
    });

    it('rounds down big numbers correctly', () => {
      expect(numberUtils.engineeringNotation(101111)).toBe('101k');
    });

    it('rounds up small numbers correctly', () => {
      expect(numberUtils.engineeringNotation(0.00099)).toBe('990μ');
    });

    it('rounds down small numbers correctly', () => {
      expect(numberUtils.engineeringNotation(0.009101)).toBe('9.1m');
    });

    it('returns same value for NaN', () => {
      expect(numberUtils.engineeringNotation(NaN)).toBe('NaN');
      expect(numberUtils.engineeringNotation('words')).toBe('words');
    });

    it('returns Infinity for Infinity', () => {
      expect(numberUtils.engineeringNotation(Infinity)).toBe('Infinity');
      expect(numberUtils.engineeringNotation(-Infinity)).toBe('-Infinity');
    });

    it('correctly truncates floats', () => {
      expect(numberUtils.engineeringNotation(0.0000007)).toBe('700n');
    });

    it('correctly rounds floats', () => {
      expect(numberUtils.engineeringNotation(0.0000007549)).toBe('755n');
    });

    it('correctly rounds low-precision floats', () => {
      expect(numberUtils.engineeringNotation(0.0000007549, 0)).toBe('800n');
    });
  });
});
