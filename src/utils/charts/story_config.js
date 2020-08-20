import times from 'lodash/times';
import { colorFromDefaultPalette } from './theme';
import { SERIES_NAME_SHORT, SERIES_NAME_LONG, SERIES_NAME_LONG_WITHOUT_SPACES } from './constants';

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
 * @param {String} nameType type of names - how long they should be
 * @returns {Array} generated series data
 */
export const generateSeriesData = (amount = 10, nameType = 'short') => {
  const defaultData = [820, 932, 960, 1150, 1290, 1330, 1390];
  let name;

  if (nameType === 'short' || !nameType) {
    name = SERIES_NAME_SHORT;
  } else if (nameType === 'long') {
    name = SERIES_NAME_LONG;
  } else if (nameType === 'long-no-spaces') {
    name = SERIES_NAME_LONG_WITHOUT_SPACES;
  }

  return times(amount, index => ({
    color: colorFromDefaultPalette(index),
    data: defaultData.map(value => value * index),
    name: `${name}${index + 1}`,
  }));
};
