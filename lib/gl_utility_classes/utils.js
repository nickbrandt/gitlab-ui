const { FONT_BASE, GRID_SIZE } = require('./constants');

const toRem = (n, fontBase = FONT_BASE) => `${n / fontBase}rem`;
const nthGridSize = n => GRID_SIZE * n;
const minWidthBreakpoint = n => `(min-width: ${n})`;

module.exports = { toRem, nthGridSize, minWidthBreakpoint };