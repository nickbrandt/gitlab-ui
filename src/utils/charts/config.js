import merge from 'lodash/merge';
import castArray from 'lodash/castArray';
import isArray from 'lodash/isArray';
import Breakpoints from '../breakpoints';
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

/**
 * All default dataZoom configs will have slider & inside
 * (for reference, see https://gitlab.com/gitlab-org/gitlab-ui/issues/240)
 * Inside is disabled for larger viewports (lg and xl)
 * and is specifically to enable touch zoom for mobile devices
 * @param {Object} options
 */
export const getDataZoomConfig = ({ filterMode = 'none' } = {}) => {
  const disabledBreakpoints = ['lg', 'xl'];
  const disabled = disabledBreakpoints.includes(Breakpoints.getBreakpointSize());
  const minSpan = filterMode === 'none' ? 0.01 : null;

  return {
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
        minSpan,
      },
      {
        type: 'inside',
        filterMode,
        minSpan,
        disabled,
      },
    ],
  };
};

// All chart options can be merged but series
// needs to be concatenated.
// Series can be an object for single series or
// an array of objects.
export const mergeSeriesToOptions = (options, series = []) => {
  const { series: optSeries = [] } = options;
  return {
    ...options,
    series: [...castArray(series), ...castArray(optSeries)],
  };
};

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
          acc.areas.push([
            { xAxis: 'min', yAxis: threshold },
            { xAxis: 'max', yAxis: Infinity },
          ]);
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

      acc.lines.push([
        { xAxis: 'min', yAxis: threshold },
        { xAxis: 'max', yAxis: threshold },
      ]);

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
/**
 * The method works well if tooltip content should be against y-axis values.
 * However, for bar charts, the tooltip should be against x-axis values.
 * This method should be updated to work with all types of visualizations.
 * https://gitlab.com/gitlab-org/gitlab-ui/-/issues/674
 *
 * @param {Object} params series data
 * @param {String} yAxisTitle y-axis title
 * @returns {Object} tooltip title and content
 */
export const getDefaultTooltipContent = (params, yAxisTitle = null) => {
  const seriesDataLength = params.seriesData.length;
  const { xLabels, tooltipContent } = params.seriesData.reduce(
    (acc, chartItem) => {
      const [title, value] = chartItem.value || [];
      // Let's use the y axis title as series name when only one series exists
      // This way, TooltipDefaultFormat will display the y axis title as label
      const seriesName = seriesDataLength === 1 && yAxisTitle ? yAxisTitle : chartItem.seriesName;
      const color = seriesDataLength === 1 ? '' : chartItem.color;
      acc.tooltipContent[seriesName] = {
        value,
        color,
      };
      if (!acc.xLabels.includes(title)) {
        acc.xLabels.push(title);
      }
      return acc;
    },
    {
      xLabels: [],
      tooltipContent: {},
    }
  );

  return { xLabels, tooltipContent };
};

export default {
  grid,
  xAxis,
  yAxis,
};
