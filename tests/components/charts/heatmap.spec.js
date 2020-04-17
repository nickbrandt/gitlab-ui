import { shallowMount } from '@vue/test-utils';

import HeatMapChart from '../../../src/components/charts/heatmap/heatmap.vue';
import Chart from '../../../src/components/charts/chart/chart.vue';
import ChartTooltip from '../../../src/components/charts/tooltip/tooltip.vue';
import { TOOLTIP_LEFT_OFFSET } from '../../../src/utils/charts/constants';

let mockChartInstance;

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
}));

describe('heatmap component', () => {
  let wrapper;
  let options;

  const findChart = () => wrapper.find(Chart);
  const findChartTooltip = () => wrapper.find(ChartTooltip);
  const getOptions = () => findChart().props('options');

  const emitChartCreated = () => findChart().vm.$emit('created', mockChartInstance);

  beforeEach(() => {
    options = {
      series: [],
    };

    mockChartInstance = {
      getDom: () => {
        return {
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        };
      },
      convertToPixel: jest.fn(),
      getOption: () => {
        return options;
      },
    };

    wrapper = shallowMount(HeatMapChart, { propsData: { options, dataSeries: [] } });
    emitChartCreated();

    return wrapper.vm.$nextTick();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('emits `created`, with the chart instance', () => {
    expect(wrapper.emitted('created').length).toBe(1);
    expect(wrapper.emitted('created')[0][0]).toBe(mockChartInstance);
  });

  describe('tooltip position', () => {
    it('is initialized', () => {
      expect(findChartTooltip().props('left')).toBe('0');
      expect(findChartTooltip().props('top')).toBe('0');
    });

    it('is reset when the xAxis formatter is triggered', () => {
      const seriesId = 'Series Name0';
      const value = ['2020-02-10T06:45:26.879Z', 0.002671530922619002];
      const pixel = [66, 99];

      const params = {
        seriesData: [{ seriesId, value }],
      };

      mockChartInstance.convertToPixel.mockReturnValueOnce(pixel);

      getOptions().xAxis.axisPointer.label.formatter(params);

      return wrapper.vm.$nextTick(() => {
        expect(mockChartInstance.convertToPixel).toHaveBeenCalledWith({ seriesId }, value);

        expect(findChartTooltip().props('left')).toBe(`${pixel[0] + TOOLTIP_LEFT_OFFSET}px`);
        expect(findChartTooltip().props('top')).toBe(`${pixel[1]}px`);
      });
    });
  });
});
