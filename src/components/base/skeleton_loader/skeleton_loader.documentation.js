import * as description from './skeleton_loader.md';
import examples from './examples';

export default {
  followsDesignSystem: false,
  description,
  examples,
  propsInfo: {
    width: {
      additionalInfo: 'It will be set in the viewbox attr in the <svg />',
    },
    height: {
      additionalInfo: 'It will be set in the viewbox attr in the <svg />',
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
  },
};
