import merge from 'lodash/merge';
import { getDataZoomConfig, getThresholdConfig } from '../../../utils/charts/config';
import { defaultDataZoomConfig } from './data';

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
        [{ xAxis: 'min', yAxis: threshold }, { xAxis: 'max', yAxis: threshold }],
      ];
      const expectedAreaData = [
        [{ xAxis: 'min', yAxis: Number.NEGATIVE_INFINITY }, { xAxis: 'max', yAxis: threshold }],
      ];

      const { markLine, markArea } = getThresholdConfig(thresholds);

      expect(markLine.data).toEqual(expectedLineData);
      expect(markArea.data).toEqual(expectedAreaData);
    });

    it('draws line only for = threshold', () => {
      const threshold = 7;
      const thresholds = makeThreshold(threshold, '=');
      const expectedLineData = [
        [{ xAxis: 'min', yAxis: threshold }, { xAxis: 'max', yAxis: threshold }],
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
        [{ xAxis: 'min', yAxis: threshold }, { xAxis: 'max', yAxis: threshold }],
      ];
      const expectedAreaData = [
        [{ xAxis: 'min', yAxis: threshold }, { xAxis: 'max', yAxis: Infinity }],
      ];

      const { markLine, markArea } = getThresholdConfig(thresholds);

      expect(markLine.data).toEqual(expectedLineData);
      expect(markArea.data).toEqual(expectedAreaData);
    });
  });

  describe('getDataZoomConfig', () => {
    it('creates a basic dataZoomConfig', () => {
      const actual = getDataZoomConfig();
      const expected = defaultDataZoomConfig;

      expect(actual).toEqual(expected);
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
        },
      ];
      const expected = merge(defaultDataZoomConfig, {
        dataZoom: dataZoomWithFilter,
      });

      expect(actual).toEqual(expected);
    });
  });
});
