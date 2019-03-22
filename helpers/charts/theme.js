import { hexToRgba } from '../utils';

export const themeName = 'gitlab';

export const colors = {
  glTextColor: '#2e2e2e',
  glTextColorTertiary: '#919191',
  glGray200: '#cccccc',
  glGray600: '#919191',
  whiteNormal: '#f0f0f0',
  gray100: '#f2f2f2',
  gray200: '#dfdfdf',
  gray400: '#bababa',
  blue500: '#1f78d1',
  green500: '#1aaa55',
  indigo500: '#6666c4',
  orange500: '#fc9403',
  red500: '#db3b21',
};
export const colorPalette = [colors.blue500, colors.green500, colors.orange500, colors.indigo500];
export const colorFromPalette = index => colorPalette[index % colorPalette.length];

const axes = {
  axisLabel: {
    margin: 8,
    show: true,
    textStyle: {
      color: colors.glGray600,
    },
  },
  axisLine: {
    show: false,
  },
  axisPointer: {
    lineStyle: {
      color: colors.glTextColorTertiary,
    },
    label: {
      show: false,
    },
  },
  axisTick: {
    show: false,
    alignWithLabel: true,
  },
  nameGap: 30,
  nameTextStyle: {
    fontStyle: 'bold',
  },
  splitLine: {
    lineStyle: {
      color: [colors.gray200],
    },
  },
  splitArea: {
    show: false,
    areaStyle: {
      color: [hexToRgba(colors.whiteNormal, 0.3), hexToRgba(colors.glGray200, 0.3)],
    },
  },
};

export default {
  color: colorPalette,
  backgroundColor: 'transparent',
  textStyle: {
    color: colors.glTextColor,
  },
  markLine: {
    silent: true,
    symbol: 'none',
    label: {
      show: false,
    },
    lineStyle: {
      color: colors.red500,
      width: 1,
      type: 'dashed',
    },
  },
  markArea: {
    silent: true,
    itemStyle: {
      color: hexToRgba(colors.red500, 0.1),
    },
  },
  dataZoom: {
    borderColor: 'transparent',
    filterMode: 'none',
    dataBackground: {
      lineStyle: {
        color: colors.gray100,
        opacity: 1,
      },
      areaStyle: {
        color: colors.gray100,
        opacity: 1,
      },
    },
    fillerColor: hexToRgba(colors.glGray200, 0.2),
    handleColor: colors.gray400,
    handleSize: '50%',
    labelFormatter: () => null,
    textStyle: {
      color: colors.glGray600,
    },
  },
  markPoint: {
    label: {
      normal: {
        textStyle: {
          color: colors.whiteNormal,
        },
      },
      emphasis: {
        textStyle: {
          color: colors.whiteNormal,
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
    showSymbol: false,
    smooth: false,
  },
  categoryAxis: axes,
  valueAxis: axes,
  logAxis: axes,
  timeAxis: axes,
};
