import { shallowMount } from '@vue/test-utils';

import Chart from '../chart/chart.vue';
import ChartLegend from '../legend/legend.vue';
import {
  mockDefaultStackedLineData,
  mockDefaultStackedBarData,
  mockSecondaryData,
} from '../../../utils/charts/mock_data';
import StackedColumnChart from './stacked_column.vue';

import { LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE } from '~/utils/charts/constants';

let mockChartInstance;

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
}));

const defaultChartProps = {
  seriesNames: [],
  bars: mockDefaultStackedBarData,
  groupBy: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  xAxisType: 'category',
  xAxisTitle: 'January - December 2018',
  yAxisTitle: 'Commits',
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

  it('should correctly render the chart', () => {
    const chart = findChart();

    expect(chart.props('options')).toMatchSnapshot();
  });

  describe('with line data provided', () => {
    beforeEach(() => {
      createShallowWrapper({
        bars: [],
        lines: mockDefaultStackedLineData,
      });
    });
    it('should correctly render the chart', () => {
      expect(findChart().props('options')).toMatchSnapshot();
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

  describe('with secondary axis data provided', () => {
    const secondaryDataTitle = 'test secondary';

    beforeEach(() => {
      createShallowWrapper({
        ...defaultChartProps,
        secondaryData: mockSecondaryData,
        secondaryDataTitle,
      });
    });
    it('should correctly render the chart', () => {
      const chart = findChart();

      expect(chart.props('options')).toMatchSnapshot();
    });

    it('should set the secondary Y axis name', () => {
      const chart = findChart();

      expect(chart.props('options').yAxis[1].name).toEqual(secondaryDataTitle);
    });
  });
});
