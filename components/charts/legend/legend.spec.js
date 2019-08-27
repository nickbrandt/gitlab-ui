import { shallowMount } from '@vue/test-utils';
import Chart from '../chart/chart.vue';
import Legend from './legend.vue';
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

  describe('when clicking on a series label', () => {
    it('dispatches a `highlight` action on the chart', () => {
      legendWrapper.find(GlChartSeriesLabel).trigger('click');
      expect(chart.dispatchAction).toHaveBeenCalled();
    });
  });
});
