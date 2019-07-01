import merge from 'lodash/merge';
import isArray from 'lodash/isArray';
import { engineeringNotation } from '../number_utils';

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
  axisLabel: {
    formatter: num => engineeringNotation(num, 2),
  },
});

export const grid = {
  top: 16,
  bottom: 44,
  left: 64,
  right: 32,
};

export const lineStyle = {
  symbol: 'circle',
  type: 'line',
  width: 2,
};

export const symbolSize = 6;

// After https://gitlab.com/gitlab-org/gitlab-ui/issues/240
// all default dataZoom configs will have slider & inside.
// inside is specifically to enable touch zoom for mobile devices
export const getDataZoomConfig = ({ filterMode = 'none' } = {}) => ({
  grid: {
    bottom: 81,
  },
  xAxis: {
    nameGap: 67,
  },
  dataZoom: [
    {
      type: 'slider',
      bottom: 22,
      filterMode,
      minSpan: filterMode === 'none' ? 0.01 : null,
    },
    {
      type: 'inside',
      filterMode,
      minSpan: filterMode === 'none' ? 0.01 : null,
    },
  ],
});

export const dataZoomAdjustments = dataZoom => {
  // handle cases where dataZoom is array and object.
  const useSlider = dataZoom && isArray(dataZoom) ? dataZoom.length : Boolean(dataZoom);

  return useSlider ? getDataZoomConfig({ filterMode: 'weakFilter' }) : [];
};

export const getToolboxConfig = ({
  restoreIconPath = '',
  saveImageIconPath = '',
  zoomIconPath = '',
  backIconPath = '',
} = {}) => {
  const toolboxConfig = {
    toolbox: {
      feature: {},
    },
  };

  if (restoreIconPath.length) {
    toolboxConfig.toolbox.feature.restore = {
      icon: restoreIconPath,
    };
  }

  if (saveImageIconPath.length) {
    toolboxConfig.toolbox.feature.saveAsImage = {
      icon: restoreIconPath,
    };
  }

  if (zoomIconPath.length && backIconPath.length) {
    toolboxConfig.toolbox.feature.dataZoom = {
      icon: {
        zoom: zoomIconPath,
        back: backIconPath,
      },
    };
  }

  return toolboxConfig;
};

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
