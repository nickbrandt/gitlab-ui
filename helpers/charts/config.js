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

export const lineStyle = {
  width: 2,
};

export const symbolSize = 6;

export const getDataZoomConfig = ({ filterMode = 'none' } = {}) => ({
  grid: {
    bottom: 81,
  },
  xAxis: {
    nameGap: 67,
  },
  dataZoom: {
    type: 'slider',
    bottom: 22,
    filterMode,
  },
});

export const dataZoomAdjustments = dataZoom => {
  const useSlider = !!dataZoom;

  return useSlider ? getDataZoomConfig({ filterMode: 'weakFilter' }) : {};
};

/**
 * Meant to be used with Lodash mergeWith
 * Returning undefined will prompt the default merge strategy
 * This function concatenates arrays and uses default merge for everything else
 */
export function additiveArrayMerge(objValue, srcValue) {
  return Array.isArray(objValue) ? objValue.concat(srcValue) : undefined;
}

export function getThresholdConfig(thresholds) {
  if (!thresholds.length) {
    return {};
  }

  const data = thresholds.reduce(
    (acc, alert) => {
      const { threshold } = alert;

      switch (alert.operator) {
        case '>':
        case '&gt;':
          acc.areas.push([{ xAxis: 'min', yAxis: threshold }, { xAxis: 'max', yAxis: Infinity }]);
          break;

        case '<':
        case '&lt;':
          acc.areas.push([
            { xAxis: 'min', yAxis: Number.NEGATIVE_INFINITY },
            { xAxis: 'max', yAxis: threshold },
          ]);
          break;

        default:
          break;
      }

      acc.lines.push([{ xAxis: 'min', yAxis: threshold }, { xAxis: 'max', yAxis: threshold }]);

      return acc;
    },
    { lines: [], areas: [] }
  );

  return {
    markLine: {
      data: data.lines,
    },
    markArea: {
      data: data.areas,
      zlevel: -1,
    },
  };
}

export default {
  grid,
  xAxis,
  yAxis,
};
