/**
 * Adds two numbers together
 * @param {Number} a
 * @param {Number} b
 */
export const addition = (a, b) => a + b;

/**
 * Returns the sum of all arguments
 * @param  {...Number} numbers
 */
export const sum = (...numbers) => numbers.reduce(addition);

/**
 * Returns the average of all arguments
 * @param  {...Number} numbers
 */
export const average = (...numbers) => sum(...numbers) / numbers.length;

/**
 * Convert number to engineering format, using SI suffix
 * @param {Number} num
 * @param {Number} precision
 * @return {String} number, possibly with a suffix
 */
export const engineeringNotation = (num, precision = 2) => {
  const invalidValues = [NaN, Infinity, -Infinity];
  if (invalidValues.includes(Number(num)) || invalidValues.includes(Number(precision))) {
    return num.toString();
  }

  const allYourBase = {
    '-24': 'y',
    '-21': 'z',
    '-18': 'a',
    '-15': 'f',
    '-12': 'p',
    '-9': 'n',
    '-6': 'μ',
    '-3': 'm',
    '0': '',
    '3': 'k',
    '6': 'M',
    '9': 'G',
    '12': 'T',
    '15': 'P',
    '18': 'E',
    '21': 'Z',
    '24': 'Y',
  };

  const exponentialNotation = num.toExponential(precision);

  const power = exponentialNotation.split('e').map(Number)[1] || 0;

  if (power < -24 || power > 24) {
    return exponentialNotation;
  }

  const scaledPower = 3 * Math.floor(power / 3);
  const scaledMantissa = (exponentialNotation / 10 ** scaledPower)
    // strip trailing decimals from floating point rounding errors
    .toFixed(precision)
    // strip trailing 0s after a decimal point
    .replace(/\.([1-9]*)0+$/, (_, fractionalDigits) => {
      if (fractionalDigits) {
        return `.${fractionalDigits}`;
      }
      return '';
    });

  return `${scaledMantissa}${allYourBase[scaledPower]}`;
};
