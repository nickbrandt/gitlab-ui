const { toRem, nthGridSize, minWidthBreakpoint } = require('./utils');

// const states = ['hover', 'active', 'visited', 'focus'];

const breakpoints = {
  sm: minWidthBreakpoint(toRem(576)),
  md: minWidthBreakpoint(toRem(768)),
  lg: minWidthBreakpoint(toRem(992)),
  xl: minWidthBreakpoint(toRem(1200)),
};

const spacing = {
  '1': toRem(nthGridSize(0.25)),
  '2': toRem(nthGridSize(0.5)),
  '3': toRem(nthGridSize(1)),
  '4': toRem(nthGridSize(1.5)),
  '5': toRem(nthGridSize(2)),
  '6': toRem(nthGridSize(3)),
  '7': toRem(nthGridSize(4)),
  '8': toRem(nthGridSize(5)),
  '9': toRem(nthGridSize(6)),
  '10': toRem(nthGridSize(7)),
  '11': toRem(nthGridSize(8)),
  '12': toRem(nthGridSize(9)),
  '13': toRem(nthGridSize(10)),
  '14': toRem(nthGridSize(12)),
  '15': toRem(nthGridSize(15)),
  '20': toRem(nthGridSize(20)),
};

const utilities = {
  m: {
    properties: ['margin'],
    values: spacing,
    breakpoints,
  },
  mx: {
    properties: ['margin-left', 'margin-right'],
    values: spacing,
    breakpoints,
  },
  p: {
    properties: ['padding'],
    values: spacing,
    breakpoints,
  },
  px: {
    properties: ['padding-left', 'padding-right'],
    values: spacing,
    breakpoints,
  },
};

module.exports = {
  prefix: 'gl',
  allowList: [

  ],
  utilities,
};