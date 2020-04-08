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
 * Returns a function that checks wether its argument is an integer greater than gt
 * @param {Number} gt number to be compared against
 */
export const isIntGreaterThan = gt => number => Number.isInteger(number) && number > gt;

/**
 * Convert number to engineering format, using SI suffix
 * @param {Number} num
 * @return {String} number, possibly with a suffix
 */
export const engineeringNotation = (num) => {
  const formatter = new Intl.NumberFormat(undefined, {
    notation: 'compact',
    compactDisplay: 'short',
  });

  return formatter.format(num);
};
