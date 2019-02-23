import merge from 'lodash/merge';

export const axes = {
  name: 'Value',
  type: 'value',
  nameLocation: 'center',
};

export const xAxis = merge({}, axes, {
  boundaryGap: false,
  nameTextStyle: {
    padding: [16, 0, 0, 0],
  },
  splitLine: {
    show: false,
  },
});

export const yAxis = merge({}, axes, {
  nameTextStyle: {
    padding: [0, 0, 32, 0],
  },
});

export const legend = {
  icon: 'path://M0,0H16V4H0Z',
  show: true,
  align: 'left',
  bottom: 0,
  left: 65,
  textStyle: {
    fontWeight: 'bold',
  },
};

/**
 * Meant to be used with Lodash mergeWith
 * Returning undefined will prompt the default merge strategy
 * This function concatenates arrays and uses default merge for everything else
 */
export function additiveArrayMerge(objValue, srcValue) {
  return Array.isArray(objValue) ? objValue.concat(srcValue) : undefined;
}

export const getDataZoomConfig = (startValue = null) => ({
  type: 'slider',
  startValue,
});

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
  xAxis,
  yAxis,
  legend,
};
