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
