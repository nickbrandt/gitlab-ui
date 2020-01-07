import merge from 'lodash/merge';
import Breakpoints from '../../../src/utils/breakpoints';
import {
  getDataZoomConfig,
  getThresholdConfig,
  mergeSeriesToOptions,
} from '../../../src/utils/charts/config';
import { defaultDataZoomConfig, defaultChartOptions } from './data';

describe('chart config helpers', () => {
  describe('getThresholdConfig', () => {
    const makeThreshold = (threshold, operator) => [
      {
        threshold,
        operator,
      },
    ];

    it('returns empty object for no thresholds', () => {
      expect(getThresholdConfig([])).toEqual({});
    });

    it('draws area below line for < threshold', () => {
      const threshold = 3;
      const thresholds = makeThreshold(threshold, '<');
      const expectedLineData = [
        [
          { xAxis: 'min', yAxis: threshold },
          { xAxis: 'max', yAxis: threshold },
        ],
      ];
      const expectedAreaData = [
        [
          { xAxis: 'min', yAxis: Number.NEGATIVE_INFINITY },
          { xAxis: 'max', yAxis: threshold },
        ],
      ];

      const { markLine, markArea } = getThresholdConfig(thresholds);

      expect(markLine.data).toEqual(expectedLineData);
      expect(markArea.data).toEqual(expectedAreaData);
    });

    it('draws line only for = threshold', () => {
      const threshold = 7;
      const thresholds = makeThreshold(threshold, '=');
      const expectedLineData = [
        [
          { xAxis: 'min', yAxis: threshold },
          { xAxis: 'max', yAxis: threshold },
        ],
      ];
      const expectedAreaData = [];

      const { markLine, markArea } = getThresholdConfig(thresholds);

      expect(markLine.data).toEqual(expectedLineData);
      expect(markArea.data).toEqual(expectedAreaData);
    });

    it('draws area above line for > threshold', () => {
      const threshold = 9000;
      const thresholds = makeThreshold(threshold, '>');
      const expectedLineData = [
        [
          { xAxis: 'min', yAxis: threshold },
          { xAxis: 'max', yAxis: threshold },
        ],
      ];
      const expectedAreaData = [
        [
          { xAxis: 'min', yAxis: threshold },
          { xAxis: 'max', yAxis: Infinity },
        ],
      ];

      const { markLine, markArea } = getThresholdConfig(thresholds);

      expect(markLine.data).toEqual(expectedLineData);
      expect(markArea.data).toEqual(expectedAreaData);
    });
  });

  describe('getDataZoomConfig', () => {
    describe('on large viewports (lg, xl)', () => {
      it('creates a basic dataZoomConfig with inside scrolling being disabled', () => {
        const actual = getDataZoomConfig();
        const expected = defaultDataZoomConfig;

        expect(actual).toEqual(expected);
      });
    });

    describe('on small viewports', () => {
      it('creates a basic dataZoomConfig with inside scrolling being enabled', () => {
        jest.spyOn(Breakpoints, 'getBreakpointSize').mockImplementationOnce(() => 'sm');
        const actual = getDataZoomConfig();
        const dataZoomWithInsideEnabled = [
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
            disabled: false,
          },
        ];
        const expected = merge(defaultDataZoomConfig, {
          dataZoom: dataZoomWithInsideEnabled,
        });

        expect(actual).toEqual(expected);
      });
    });

    it('allows the filterMode to be set', () => {
      const actual = getDataZoomConfig({ filterMode: 'filter' });
      // After https://gitlab.com/gitlab-org/gitlab-ui/issues/240
      // all default dataZoom configs will have slider & inside.
      // inside is specifically to enable touch zoom for mobile devices
      const dataZoomWithFilter = [
        {
          type: 'slider',
          filterMode: 'filter',
          minSpan: null,
        },
        {
          type: 'inside',
          filterMode: 'filter',
          minSpan: null,
          disabled: true,
        },
      ];
      const expected = merge(defaultDataZoomConfig, {
        dataZoom: dataZoomWithFilter,
      });

      expect(actual).toEqual(expected);
    });
  });

  describe('mergeSeriesToOptions', () => {
    const series = {
      areaStyle: {
        opacity: 0.2,
        color: '#1f78d1',
      },
      showSymbol: false,
      lineStyle: {
        color: '#1f78d1',
      },
      itemStyle: {
        color: '#1f78d1',
      },
      symbol: 'circle',
      type: 'line',
      width: 2,
      name: 'Values',
      data: [
        [0, 5],
        [4, 3],
        [8, 10],
      ],
    };

    it('create chart options with invalid series props', () => {
      const chartOptionsOutput = {
        ...defaultChartOptions,
        series: [],
      };
      expect(mergeSeriesToOptions(defaultChartOptions)).toEqual(chartOptionsOutput);
      expect(mergeSeriesToOptions(defaultChartOptions, [])).toEqual(chartOptionsOutput);
    });

    it('creates chart options with single series object passed as data prop', () => {
      // data for chart can also be passed as a data prop which is transformed to series
      const chartOptions = mergeSeriesToOptions({
        ...defaultChartOptions,
        series,
      });

      expect(chartOptions.series).toBeInstanceOf(Array);
      expect(chartOptions.series.length).toBe(1);
    });

    it('creates chart options with single series array passed as data prop', () => {
      const chartOptions = mergeSeriesToOptions({
        ...defaultChartOptions,
        series: [series],
      });

      expect(chartOptions.series).toBeInstanceOf(Array);
      expect(chartOptions.series.length).toBe(1);
    });

    it('creates chart options with multiple series array passed as data prop', () => {
      const chartOptions = mergeSeriesToOptions({
        ...defaultChartOptions,
        series: [series, series],
      });

      expect(chartOptions.series).toBeInstanceOf(Array);
      expect(chartOptions.series.length).toBe(2);
    });

    it('creates chart options with single series object passed as series prop', () => {
      const chartOptions = mergeSeriesToOptions(defaultChartOptions, series);

      expect(chartOptions.series).toBeInstanceOf(Array);
      expect(chartOptions.series.length).toBe(1);
    });

    it('creates chart options with single series array passed as series prop', () => {
      const chartOptions = mergeSeriesToOptions(defaultChartOptions, [series]);

      expect(chartOptions.series).toBeInstanceOf(Array);
      expect(chartOptions.series.length).toBe(1);
    });

    it('creates chart options with multiple series array passed as series prop', () => {
      const chartOptions = mergeSeriesToOptions(defaultChartOptions, [series, series]);

      expect(chartOptions.series).toBeInstanceOf(Array);
      expect(chartOptions.series.length).toBe(2);
    });
  });
});
