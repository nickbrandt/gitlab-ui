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

export default {};
