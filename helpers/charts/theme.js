import { hexToRgba } from '../utils';

export const colorPalette = ['#1f78d1', '#1aaa55', '#fc9403', '#6666c4'];
export const colors = {
  'gl-text-color': '#2e2e2e',
  'gl-text-color-tertiary': '#919191',
  'gl-text-color-quaternary': '#d6d6d6',
  'gl-gray-100': '#dddddd',
  'gl-gray-200': '#cccccc',
  'gl-gray-600': '#919191',
  'gl-gray-700': '#707070',
  'white-normal': '#f0f0f0',
  'gray-100': '#f2f2f2',
  'gray-200': '#dfdfdf',
  'gray-400': '#bababa',
  'red-500': '#db3b21',
};

export default {
  grid: {
    top: 24,
    bottom: 72,
    left: 70,
    right: 24,
  },
  color: colorPalette,
  backgroundColor: 'transparent',
  textStyle: {
    color: colors['gl-text-color'],
  },
  axisPointer: {
    show: true,
    lineStyle: {
      color: colors['gl-text-color-tertiary'],
    },
    label: {
      show: false,
    },
  },
  markLine: {
    silent: true,
    symbol: 'none',
    label: {
      show: false,
    },
    lineStyle: {
      color: colors['red-500'],
      width: 1,
      type: 'dashed',
    },
  },
  markArea: {
    silent: true,
    itemStyle: {
      color: hexToRgba(colors['red-500'], 0.1),
    },
  },
  dataZoom: {
    borderColor: 'transparent',
    dataBackground: {
      lineStyle: {
        color: colors['gray-100'],
        opacity: 1,
      },
      areaStyle: {
        color: colors['gray-100'],
        opacity: 1,
      },
    },
    fillerColor: hexToRgba(colors['gl-gray-200'], 0.2),
    handleColor: colors['gray-400'],
    handleSize: '50%',
    labelFormatter: () => null,
    textStyle: {
      color: colors['gl-gray-600'],
    },
  },
  markPoint: {
    label: {
      normal: {
        textStyle: {
          color: colors['white-normal'],
        },
      },
      emphasis: {
        textStyle: {
          color: colors['white-normal'],
        },
      },
    },
  },
  line: {
    itemStyle: {
      normal: {
        borderWidth: 1,
      },
    },
    lineStyle: {
      normal: {
        width: 2,
      },
    },
    symbolSize: '6',
    symbol: 'circle',
    smooth: false,
  },
  radar: {
    itemStyle: {
      normal: {
        borderWidth: 1,
      },
    },
    lineStyle: {
      normal: {
        width: 2,
      },
    },
    symbolSize: '6',
    symbol: 'circle',
    smooth: false,
  },
  bar: {
    itemStyle: {
      normal: {
        barBorderWidth: 1,
        barBorderColor: colors['gl-gray-200'],
      },
      emphasis: {
        barBorderWidth: 1,
        barBorderColor: colors['gl-gray-200'],
      },
    },
  },
  pie: {
    itemStyle: {
      normal: {
        borderWidth: 1,
        borderColor: colors['gl-gray-200'],
      },
      emphasis: {
        borderWidth: 1,
        borderColor: colors['gl-gray-200'],
      },
    },
  },
  scatter: {
    itemStyle: {
      normal: {
        borderWidth: 1,
        borderColor: colors['gl-gray-200'],
      },
      emphasis: {
        borderWidth: 1,
        borderColor: colors['gl-gray-200'],
      },
    },
  },
  boxplot: {
    itemStyle: {
      normal: {
        borderWidth: 1,
        borderColor: colors['gl-gray-200'],
      },
      emphasis: {
        borderWidth: 1,
        borderColor: colors['gl-gray-200'],
      },
    },
  },
  parallel: {
    itemStyle: {
      normal: {
        borderWidth: 1,
        borderColor: colors['gl-gray-200'],
      },
      emphasis: {
        borderWidth: 1,
        borderColor: colors['gl-gray-200'],
      },
    },
  },
  sankey: {
    itemStyle: {
      normal: {
        borderWidth: 1,
        borderColor: colors['gl-gray-200'],
      },
      emphasis: {
        borderWidth: 1,
        borderColor: colors['gl-gray-200'],
      },
    },
  },
  funnel: {
    itemStyle: {
      normal: {
        borderWidth: 1,
        borderColor: colors['gl-gray-200'],
      },
      emphasis: {
        borderWidth: 1,
        borderColor: colors['gl-gray-200'],
      },
    },
  },
  gauge: {
    itemStyle: {
      normal: {
        borderWidth: 1,
        borderColor: colors['gl-gray-200'],
      },
      emphasis: {
        borderWidth: 1,
        borderColor: colors['gl-gray-200'],
      },
    },
  },
  candlestick: {
    itemStyle: {
      normal: {
        color: colorPalette[0],
        color0: colorPalette[2],
        borderColor: colorPalette[0],
        borderColor0: colorPalette[2],
        borderWidth: 1,
      },
    },
  },
  graph: {
    itemStyle: {
      normal: {
        borderWidth: 1,
        borderColor: colors['gl-gray-200'],
      },
    },
    lineStyle: {
      normal: {
        width: 1,
        color: colors['gl-text-color-quaternary'],
      },
    },
    symbolSize: 6,
    symbol: 'circle',
    smooth: false,
    color: colorPalette,
    label: {
      normal: {
        textStyle: {
          color: colors['white-normal'],
        },
      },
    },
  },
  map: {
    itemStyle: {
      normal: {
        areaColor: colors['gl-gray-100'],
        borderColor: colors['gl-gray-600'],
        borderWidth: 0.5,
      },
      emphasis: {
        areaColor: colorPalette[0],
        borderColor: colors['gl-gray-100'],
        borderWidth: 1,
      },
    },
    label: {
      normal: {
        textStyle: {
          color: colors['gl-gray-700'],
        },
      },
      emphasis: {
        textStyle: {
          color: colorPalette[2],
        },
      },
    },
  },
  geo: {
    itemStyle: {
      normal: {
        areaColor: colors['gl-gray-100'],
        borderColor: colors['gl-gray-600'],
        borderWidth: 0.5,
      },
      emphasis: {
        areaColor: colorPalette[0],
        borderColor: colors['gl-gray-100'],
        borderWidth: 1,
      },
    },
    label: {
      normal: {
        textStyle: {
          color: colors['gl-gray-700'],
        },
      },
      emphasis: {
        textStyle: {
          color: colorPalette[2],
        },
      },
    },
  },
  categoryAxis: {
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
      alignWithLabel: true,
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: colors['gl-gray-600'],
      },
    },
    nameTextStyle: {
      fontStyle: 'bold',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: [colors['gray-200']],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [hexToRgba(colors['white-normal'], 0.3), hexToRgba(colors['gl-gray-200'], 0.3)],
      },
    },
  },
  valueAxis: {
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
      alignWithLabel: true,
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: colors['gl-gray-600'],
      },
    },
    nameTextStyle: {
      fontStyle: 'bold',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: [colors['gray-200']],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [hexToRgba(colors['white-normal'], 0.3), hexToRgba(colors['gl-gray-200'], 0.3)],
      },
    },
  },
  logAxis: {
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
      alignWithLabel: true,
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: colors['gl-gray-600'],
      },
    },
    nameTextStyle: {
      fontStyle: 'bold',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: [colors['gray-200']],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [hexToRgba(colors['white-normal'], 0.3), hexToRgba(colors['gl-gray-200'], 0.3)],
      },
    },
  },
  timeAxis: {
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
      alignWithLabel: true,
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: colors['gl-gray-600'],
      },
    },
    nameTextStyle: {
      fontStyle: 'bold',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: [colors['gray-200']],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [hexToRgba(colors['white-normal'], 0.3), hexToRgba(colors['gl-gray-200'], 0.3)],
      },
    },
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: colors['gl-gray-600'],
      },
      emphasis: {
        borderColor: colors['gl-text-color'],
      },
    },
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: colors['gl-gray-200'],
        width: 1,
      },
      crossStyle: {
        color: colors['gl-gray-200'],
        width: 1,
      },
    },
  },
  timeline: {
    lineStyle: {
      color: colorPalette[0],
      width: 1,
    },
    itemStyle: {
      normal: {
        color: colorPalette[0],
        borderWidth: 1,
      },
      emphasis: {
        color: colorPalette[0],
      },
    },
    controlStyle: {
      normal: {
        color: colorPalette[0],
        borderColor: colorPalette[0],
        borderWidth: 0.5,
      },
      emphasis: {
        color: colorPalette[0],
        borderColor: colorPalette[0],
        borderWidth: 0.5,
      },
    },
    checkpointStyle: {
      color: colorPalette[0],
      borderColor: colorPalette[0],
    },
    label: {
      normal: {
        textStyle: {
          color: colorPalette[0],
        },
      },
      emphasis: {
        textStyle: {
          color: colorPalette[0],
        },
      },
    },
  },
  visualMap: {
    color: colorPalette,
  },
};
