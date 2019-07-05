import { shallowMount } from '@vue/test-utils';
import ColumnChart from '../../../components/charts/column/column.vue';
import Chart from '../../../components/charts/chart/chart.vue';

describe('column chart component', () => {
  const defaultChartProps = {
    xAxisTitle: 'x axis',
    yAxisTitle: 'y axis',
    xAxisType: 'category',
    data: {
      Full: [
        ['Mon', 1220],
        ['Tue', 932],
        ['Wed', 901],
        ['Thu', 934],
        ['Fri', 1290],
        ['Sat', 1330],
        ['Sun', 1320],
      ],
    },
  };
  let wrapper;

  const TooltipStub = {
    name: 'chart-tooltip',
    template: '<div />',
  };

  const chartItemClickedSpy = jest.fn();

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
    wrapper.find(Chart).vm.$emit('chartItemClicked');

    expect(chartItemClickedSpy).toHaveBeenCalled();
  });
});
