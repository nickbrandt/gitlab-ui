import times from 'lodash/times';
import { colorFromDefaultPalette } from './theme';

import {
  marqueeSelectionSvgPath,
  redoSvgPath,
  clearAllSvgPath,
  downloadSvgPath,
} from '../svgs/svg_paths';

export const toolbox = {
  feature: {
    dataZoom: {
      icon: {
        zoom: marqueeSelectionSvgPath,
        back: redoSvgPath,
      },
    },
    restore: {
      icon: clearAllSvgPath,
    },
    saveAsImage: {
      icon: downloadSvgPath,
    },
  },
};

/**
 * Generates series data for usage in chart examples
 *
 * @param {Number} amount number of generated series
 * @returns {Array} generated series data
 */
export const generateSeriesData = amount => {
  const defaultData = [820, 932, 960, 1150, 1290, 1330, 1390];

  return times(amount, index => ({
    color: colorFromDefaultPalette(index),
    data: defaultData.map(value => value * index),
    name: `Series ${index + 1}`,
  }));
};
