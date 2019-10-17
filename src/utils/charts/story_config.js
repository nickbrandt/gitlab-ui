/* eslint-disable import/prefer-default-export */
import { getSvgEchartsPath } from '../svg_utils';

export const toolbox = {
  feature: {
    dataZoom: {
      icon: {
        zoom: getSvgEchartsPath('marquee-selection'),
        back: getSvgEchartsPath('redo'),
      },
    },
    restore: {
      icon: getSvgEchartsPath('clear-all'),
    },
    saveAsImage: {
      icon: getSvgEchartsPath('download'),
    },
  },
};
