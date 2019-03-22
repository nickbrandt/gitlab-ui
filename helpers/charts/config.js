import merge from 'lodash/merge';

export const defaultAreaOpacity = 0.2;
export const defaultFontSize = 12;
export const defaultHeight = 400;
export const validRenderers = ['canvas', 'svg'];

export const axes = {
  name: 'Value',
  type: 'value',
  nameLocation: 'center',
};

export const xAxis = merge({}, axes, {
  boundaryGap: false,
  splitLine: {
    show: false,
  },
});

export const yAxis = merge({}, axes, {
  nameGap: 50,
});

export const grid = {
  top: 16,
  bottom: 44,
  left: 64,
  right: 32,
};

export const getDataZoomConfig = () => ({
  grid: {
    bottom: 81,
  },
  xAxis: {
    nameGap: 67,
  },
  dataZoom: {
    type: 'slider',
    bottom: 22,
  },
});

/**
 * Meant to be used with Lodash mergeWith
 * Returning undefined will prompt the default merge strategy
 * This function concatenates arrays and uses default merge for everything else
 */
export function additiveArrayMerge(objValue, srcValue) {
  return Array.isArray(objValue) ? objValue.concat(srcValue) : undefined;
}

export function getThresholdConfig(thresholds) {
  const keys = Object.keys(thresholds);
  if (!keys.length) {
    return {};
  }

  const lineData = [];
  const areaData = [];
  keys.forEach(key => {
    const alert = thresholds[key];
    const { threshold } = alert;

    switch (alert.operator) {
      case '>':
      case '&gt;':
        areaData.push([{ xAxis: 'min', yAxis: threshold }, { xAxis: 'max', yAxis: Infinity }]);
        break;

      case '<':
      case '&lt;':
        areaData.push([
          { xAxis: 'min', yAxis: Number.NEGATIVE_INFINITY },
          { xAxis: 'max', yAxis: threshold },
        ]);
        break;

      default:
        break;
    }

    lineData.push([{ xAxis: 'min', yAxis: threshold }, { xAxis: 'max', yAxis: threshold }]);
  });

  return {
    markLine: {
      data: lineData,
    },
    markArea: {
      data: areaData,
      zlevel: -1,
    },
  };
}

export default {
  grid,
  xAxis,
  yAxis,
};
