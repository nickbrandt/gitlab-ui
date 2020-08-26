import * as description from './skeleton_loader.md';
import examples from './examples';

export default {
  followsDesignSystem: true,
  description,
  examples,
  propsInfo: {
    width: {
      additionalInfo:
        'It will be set in the viewbox attr in the <svg />. Defaults to 400 when skeleton is passed via the slot. Defaults to 235 when default skeleton is used',
    },
    height: {
      additionalInfo:
        'It will be set in the viewbox attr in the <svg />. Defaults to 130 when skeleton is passed via the slot. Defaults to the combined height of the lines when default skeleton is used',
    },
    uniqueKey: {
      additionalInfo: 'Defaults to unique id',
    },
    preserveAspectRatio: {
      additionalInfo: 'Aspect ratio option of <svg/>',
    },
    baseUrl: {
      additionalInfo: `Required if you're using <base url="/" /> in your <head />. Defaults to an empty string. This prop is common used as: <gl-skeleton-loader :base-url="$route.fullPath" /> which will fill the SVG attribute with the relative path.`,
    },
    lines: {
      additionalInfo: 'Number of lines to show when using the default skeleton',
    },
    equalWidthLines: {
      additionalInfo: 'If the default skeleton lines should all be the same width',
    },
  },
};
