import { shallowMount } from '@vue/test-utils';
import Chart from '../chart/chart.vue';
import {
  mockDefaultLineData,
  mockDefaultBarData,
  mockSecondaryData,
} from '../../../utils/charts/mock_data';
import ColumnChart from './column.vue';

describe('column chart component', () => {
  const defaultChartProps = {
    xAxisTitle: 'x axis',
    yAxisTitle: 'y axis',
    xAxisType: 'category',
    bars: mockDefaultBarData,
  };
  let wrapper;

  const TooltipStub = {
    name: 'chart-tooltip',
    template: '<div />',
  };

  const chartItemClickedSpy = jest.fn();
  const findChart = () => wrapper.find(Chart);

  const factory = (props = defaultChartProps) => {
    wrapper = shallowMount(ColumnChart, {
      propsData: { ...props },
      stubs: {
        chart: true,
        'chart-tooltip': TooltipStub,
      },
      listeners: {
        chartItemClicked: chartItemClickedSpy,
      },
    });
    const chart = {
      getDom: jest.fn(() => ({
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    };
    wrapper.setData({ chart });
  };

  beforeEach(() => {
    factory();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('emits "created" when onCreated is called', () => {
    wrapper.vm.onCreated(wrapper.vm.chart);

    expect(wrapper.emitted('created')).toBeTruthy();
  });

  it('calls event listener when "chartItemClicked" is emitted on the Chart component', () => {
    findChart().vm.$emit('chartItemClicked');

    expect(chartItemClickedSpy).toHaveBeenCalled();
  });

  it('should correctly render the chart', () => {
    const chart = findChart();

    expect(chart.props('options')).toMatchSnapshot();
  });
  describe('with line data provided', () => {
    beforeEach(() => {
      factory({
        ...defaultChartProps,
        bars: [],
        lines: mockDefaultLineData,
      });
    });
    it('should correctly render the chart', () => {
      expect(findChart().props('options')).toMatchSnapshot();
    });
  });

  describe('with secondary axis data provided', () => {
    const secondaryDataTitle = 'Column test secondary';

    beforeEach(() => {
      factory({
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
