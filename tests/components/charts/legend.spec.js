import { shallowMount } from '@vue/test-utils';
import Chart from '../../../src/components/charts/chart/chart.vue';
import Legend from '../../../src/components/charts/legend/legend.vue';
import { GlChartSeriesLabel } from '../../../charts';

jest.mock('echarts', () => ({
  getInstanceByDom: jest.fn(instance => instance),
  init: jest.fn(() => ({
    dispatchAction: jest.fn(),
    resize: jest.fn(),
    setOption: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
  })),
  registerTheme: jest.fn(),
}));

const seriesInfo = [
  {
    type: 'solid',
    name: 'Example Title',
    color: 'red',
    data: [1, 2, 3, 4, 5],
  },
];

describe('chart legend component', () => {
  let chartWrapper;
  let legendWrapper;
  let chart;

  const chartArgs = [
    Chart,
    {
      propsData: { options: {} },
      listeners: {
        created: chartInstance => {
          chart = chartInstance;
          chart.getDom = () => chartInstance;
        },
      },
    },
  ];

  beforeEach(() => {
    chartWrapper = shallowMount(...chartArgs);
    // Runs after mounting the chart so that it has an up to date reference
    const legendArgs = [Legend, { propsData: { chart, seriesInfo } }];
    legendWrapper = shallowMount(...legendArgs);
  });

  afterEach(() => {
    chartWrapper.destroy();
    legendWrapper.destroy();
  });

  it('renders the legend with no errors', () => {
    expect(legendWrapper.exists()).toBe(true);
  });

  it('displays a legend series labels', () => {
    expect(legendWrapper.findAll(GlChartSeriesLabel).length).toBe(1);
  });

  it('allows user to override max value label text using props', () => {
    legendWrapper.setProps({ maxText: 'maxText' });
    expect(legendWrapper.text()).toMatch('maxText');
  });

  it('allows user to override average value label text using props', () => {
    legendWrapper.setProps({ averageText: 'averageText' });
    expect(legendWrapper.text()).toMatch('averageText');
  });

  it('displays "Avg" for the average value label by default', () => {
    expect(legendWrapper.props().averageText).toMatch('Avg');
  });

  it('displays "Max" for the max value label by default', () => {
    expect(legendWrapper.props().maxText).toMatch('Max');
  });

  describe('when clicking on a series label', () => {
    it('dispatches a `highlight` action on the chart', () => {
      legendWrapper.find(GlChartSeriesLabel).trigger('click');
      expect(chart.dispatchAction).toHaveBeenCalled();
    });
  });
});
