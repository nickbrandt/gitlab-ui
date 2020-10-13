import { shallowMount } from '@vue/test-utils';
import ColumnChart from './column.vue';
import Chart from '../chart/chart.vue';
import {
  mockDefaultLineData,
  mockDefaultBarData,
  mockRawBarData,
} from '../../../utils/charts/mock_data';

describe('column chart component', () => {
  const defaultChartProps = {
    xAxisTitle: 'x axis',
    yAxisTitle: 'y axis',
    xAxisType: 'category',
    bars: mockDefaultBarData,
    data: {},
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

  describe('with a `data` prop provided', () => {
    beforeEach(() => {
      factory({
        ...defaultChartProps,
        bars: [],
        data: { 'Data object': mockRawBarData },
      });
    });
    it('should correctly render the chart', () => {
      expect(findChart().props('options')).toMatchSnapshot();
    });
  });
});
