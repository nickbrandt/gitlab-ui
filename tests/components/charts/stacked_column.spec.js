import { shallowMount } from '@vue/test-utils';

import StackedColumnChart from '../../../src/components/charts/stacked_column/stacked_column.vue';
import Chart from '../../../src/components/charts/chart/chart.vue';
import ChartLegend from '../../../src/components/charts/legend/legend.vue';

import { LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE } from '../../../src/utils/charts/constants';

let mockChartInstance;

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
}));

const defaultChartProps = {
  data: [
    [58, 49, 38, 23, 27, 68, 38, 35, 7, 64, 65, 31],
    [8, 6, 34, 19, 9, 7, 17, 25, 14, 7, 10, 32],
    [67, 60, 66, 32, 61, 54, 13, 50, 16, 11, 47, 28],
    [8, 9, 5, 40, 13, 19, 58, 21, 47, 59, 23, 46],
  ],
  groupBy: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  xAxisType: 'category',
  xAxisTitle: 'January - December 2018',
  yAxisTitle: 'Commits',
  seriesNames: ['Fun 1', 'Fun 2', 'Fun 3', 'Fun 4'],
};

describe('stacked column chart component', () => {
  let wrapper;
  let options;

  const findChart = () => wrapper.find(Chart);
  const findLegend = () => wrapper.find(ChartLegend);

  const emitChartCreated = () => findChart().vm.$emit('created', mockChartInstance);

  const createShallowWrapper = (props = {}) => {
    wrapper = shallowMount(StackedColumnChart, { propsData: { ...defaultChartProps, ...props } });
    emitChartCreated();
  };

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
      on: jest.fn(),
      off: jest.fn(),
      convertToPixel: jest.fn(),
      getOption: () => {
        return options;
      },
    };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('emits `created`, with the chart instance', () => {
    createShallowWrapper();

    return wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('created').length).toBe(1);
      expect(wrapper.emitted('created')[0][0]).toBe(mockChartInstance);
    });
  });

  describe('legend', () => {
    it('is inline by default', () => {
      createShallowWrapper();

      return wrapper.vm.$nextTick(() => {
        expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_INLINE);
      });
    });

    it('is inline if correct prop value is set', () => {
      createShallowWrapper({ legendLayout: LEGEND_LAYOUT_INLINE });

      return wrapper.vm.$nextTick(() => {
        expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_INLINE);
      });
    });

    it('is tabular if correct prop value is set', () => {
      createShallowWrapper({ legendLayout: LEGEND_LAYOUT_TABLE });

      return wrapper.vm.$nextTick(() => {
        expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_TABLE);
      });
    });
  });
});
