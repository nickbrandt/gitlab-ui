import { hexToRgba } from '../utils';
import {
  blue200,
  blue400,
  blue500,
  blue600,
  blue800,
  gray100,
  gray200,
  gray300,
  gray600,
  gray700,
  gray900,
  green500,
  themeIndigo500,
  orange500,
  red500,
  whiteNormal,
} from '../../scss_to_js/scss_variables'; // eslint-disable-line import/no-unresolved

export const themeName = 'gitlab';

export const heatmapHues = [gray100, blue200, blue400, blue600, blue800];
export const colorPalette = [blue500, green500, orange500, themeIndigo500];
export const colorFromPalette = index => colorPalette[index % colorPalette.length];

const axes = {
  axisLabel: {
    margin: 8,
    show: true,
    color: gray600,
    textStyle: {
      color: gray600,
    },
  },
  axisLine: {
    show: false,
  },
  axisPointer: {
    lineStyle: {
      color: gray600,
    },
    label: {
      show: false,
    },
  },
  axisTick: {
    show: true,
    alignWithLabel: true,
    lineStyle: {
      color: gray200,
    },
  },
  nameGap: 30,
  nameTextStyle: {
    fontStyle: 'bold',
  },
  splitLine: {
    lineStyle: {
      color: [gray200],
    },
  },
  splitArea: {
    show: false,
    areaStyle: {
      color: [hexToRgba(whiteNormal, 0.3), hexToRgba(gray300, 0.3)],
    },
  },
};

export default {
  color: colorPalette,
  backgroundColor: 'transparent',
  textStyle: {
    color: gray900,
  },
  markLine: {
    silent: true,
    symbol: 'none',
    label: {
      show: false,
    },
    lineStyle: {
      color: red500,
      width: 1,
      type: 'dashed',
    },
  },
  markArea: {
    silent: true,
    itemStyle: {
      color: hexToRgba(red500, 0.1),
    },
  },
  dataZoom: {
    borderColor: 'transparent',
    filterMode: 'none',
    dataBackground: {
      lineStyle: {
        color: gray100,
        opacity: 1,
      },
      areaStyle: {
        color: gray100,
        opacity: 1,
      },
    },
    fillerColor: hexToRgba(gray300, 0.2),
    handleColor: gray700,
    handleSize: '50%',
    labelFormatter: () => null,
    textStyle: {
      color: gray600,
    },
  },
  toolbox: {
    top: '-5',
    left: 'center',
    itemSize: 14,
    iconStyle: {
      color: gray200,
      borderWidth: 0,
      emphasis: {
        borderWidth: 0,
        color: gray700,
      },
    },
    itemGap: 8,
    feature: {
      dataZoom: {
        title: {
          zoom: 'Click to zoom in on a portion of the graph',
          back: 'Remove selection',
        },
      },
      restore: {
        title: 'Remove all selections and return chart to default state',
      },
      saveAsImage: {
        title: 'Save chart as an image',
        name: 'graph',
      },
    },
  },
  markPoint: {
    label: {
      normal: {
        textStyle: {
          color: whiteNormal,
        },
      },
      emphasis: {
        textStyle: {
          color: whiteNormal,
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
