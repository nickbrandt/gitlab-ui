/* eslint-disable import/prefer-default-export */
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
