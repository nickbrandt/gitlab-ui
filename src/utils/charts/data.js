import { blue500 } from '../../../scss_to_js/scss_variables'; // eslint-disable-line import/no-unresolved

export const defaultDataZoomConfig = {
  dataZoom: [
    {
      bottom: 22,
      filterMode: 'none',
      minSpan: 0.01,
      type: 'slider',
    },
    {
      type: 'inside',
      filterMode: 'none',
      minSpan: 0.01,
      disabled: true,
    },
  ],
  grid: {
    bottom: 81,
  },
  xAxis: {
    nameGap: 67,
  },
};

export const defaultChartOptions = {
  grid: {
    top: 16,
    bottom: 44,
    left: 64,
    right: 32,
  },
  xAxis: {
    name: 'Value',
    type: 'value',
    nameLocation: 'center',
    boundaryGap: false,
    splitLine: {
      show: false,
    },
    axisPointer: {
      show: true,
      label: {},
    },
  },
  yAxis: {
    name: 'Value',
    type: 'value',
    nameLocation: 'center',
    nameGap: 50,
    axisLabel: {},
    axisTick: {
      show: false,
    },
  },
  legend: {
    show: false,
  },
};

/**
 * This is currently used in area.stories.js and line.stories.js
 */
export const mockAnnotationsSeries = {
  series: [
    {
      type: 'scatter',
      name: 'annotations',
      data: [],
      markLine: {
        lineStyle: {
          color: blue500,
        },
        data: [
          { xAxis: '2018-01-25T01:00:00.000Z' },
          { xAxis: '2018-01-25T10:00:00.000Z' },
          { xAxis: '2018-02-06T08:00:00.000Z' },
        ],
      },
      markPoint: {
        symbol: 'path://m5 229 5 8h-10z',
        symbolSize: '8',
        symbolOffset: [0, ' 60%'],
        data: [
          {
            name: 'annotations',
            xAxis: '2018-01-25T01:00:00.000Z',
            yAxis: 0,
            tooltipData: { content: 'Scranton strangler was caught.' },
          },
          {
            name: 'annotations',
            xAxis: '2018-01-25T10:00:00.000Z',
            yAxis: 0,
            tooltipData: { content: 'Tobys green car is missing.' },
          },
          {
            name: 'annotations',
            xAxis: '2018-02-06T08:00:00.000Z',
            yAxis: 0,
            tooltipData: { content: 'It was actually Toby!' },
          },
        ],
      },
    },
  ],
};

/**
 * This is currently used in area.stories.js and line.stories.js
 */
export const mockAnnotationsConfigs = {
  annotations: [
    {
      min: '2018-01-25T01:00:00.000Z',
      max: '2018-01-25T01:00:00.000Z',
      tooltipData: { content: 'Scranton strangler was caught.' },
    },
    {
      min: '2018-01-25T10:00:00.000Z',
      max: '2018-01-25T10:00:00.000Z',
      tooltipData: { content: 'Tobys green car is missing.' },
    },
    {
      min: '2018-02-06T08:00:00.000Z',
      max: '2018-02-06T08:00:00.000Z',
      tooltipData: { content: 'It was actually Toby!' },
    },
  ],
};

export default {};
